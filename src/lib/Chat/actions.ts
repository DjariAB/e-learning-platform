// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage } from '@/components/stocks'

import { nanoid } from '@/lib/utils'
// import { Chat } from '../types'
// import { SelectSeats } from '@/components/flights/select-seats'
// import { ListFlights } from '@/components/flights/list-flights'
import { PurchaseTickets } from '@/components/flights/purchase-ticket'
// import { CheckIcon, SpinnerIcon } from '@/components/ui/icons'
import { experimental_streamText } from 'ai'
import { google } from 'ai/google'
// import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { SpinnerMessage } from '@/components/ai/message'
import { Loader2 } from 'lucide-react'

// const genAI = new GoogleGenerativeAI(
//   process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
// )

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`
      }
    ]
  })

  const history = aiState.get().messages.map(message => ({
    role: message.role,
    content: message.content
  }))
  
  // console.log(history)
  const textStream = createStreamableValue('')
  const spinnerStream = createStreamableUI();
  const messageStream = createStreamableUI(null)
  const uiStream = createStreamableUI()

  ;(async () => {
    try {
      const result = await experimental_streamText({
        model: google.generativeAI('models/gemini-1.0-pro-001'),
        temperature: 0,
        tools: {
          reactquiz: {
            description:
              'make a small quizz about some content (provided by the user) make your question a bit hard and the answers long ',
            parameters: z.object({
              question: z
                .string()
                .describe(
                  'the question u are asking the user about his topic '
                ),
              firstAnswer: z.string().describe('answer number one '),
              secondAnswer: z.string().describe('answer number two '),
              thirdAnswer: z.string().describe('answer number three'),
              correctAnswer: z.string().describe('fourth answer  ')
            })
          },
          speakaboutMessi: {
            description: 'speak about the legend messi',
            parameters: z.object({
              goldenBalls: z.string().describe('messi number of golden balls ')
            })
          }
        },
        system: `\
      You are a friendly assistant that helps the user with booking flights to destinations that are based on a list of books. You can you give travel recommendations based on the books, and will continue to help the user book a flight to their destination.
  
      The date today is 'd LLLL, yyyy')}. 
      The user's current location is San Francisco, CA, so the departure city will be San Francisco and airport will be San Francisco International Airport (SFO). The user would like to book the flight out on May 12, 2024.

      List United Airlines flights only.
      
      Here's the flow: 
        1. List holiday destinations based on a collection of books.
        2. List flights to destination.
        3. Choose a flight.
        4. Choose a seat.
        5. Choose hotel
        6. Purchase booking.
        7. Show boarding pass.
      `,
        messages: [...history]
      })

      let textContent = ''
      spinnerStream.done(null)

      for await (const delta of result.fullStream) {
        const { type } = delta

        if (type === 'text-delta') {
          const { textDelta } = delta

          textContent += textDelta
          // messageStream.update(<BotMessage content={textContent} />)

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent
              }
            ]
          })
        } else if (type === 'tool-call') {
          const { toolName, args } = delta

          if (toolName === 'speakaboutMessi') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',

                  display: {
                    name: 'messi the goat',
                    props: {
                      goldenBalls: args.goldenBalls
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
               <div> </div>
              </BotCard>
            )
          } else if (toolName === 'reactquiz') {
            const { correctAnswer, firstAnswer, secondAnswer, thirdAnswer } =
              args
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',

                  display: {
                    name: 'messi the goat',
                    props: {
                      goldenBalls: args.goldenBalls
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
                <div>
                  {args.question}
                  <ul>
                    <li> {firstAnswer}</li>
                    <li> {correctAnswer}</li>
                    <li> {secondAnswer}</li>
                    <li> {thirdAnswer}</li>
                  </ul>
                  <Button>submit for basset </Button>
                </div>
              </BotCard>
            )
          }
        }
      }

      uiStream.done()
      textStream.done()
      messageStream.done()
    } catch (e) {
      console.error(e)

      const error = new Error(
        'The AI got rate limited, please try again later.'
      )
      uiStream.error(error)
      textStream.error(error)
      messageStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id?: string
  name?: string
  display?: {
    name: string
    props: Record<string, any>
  }
}

export type AIState = {
  chatId: string
  interactions?: string[]
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
  spinner?: React.ReactNode
  attachments?: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] }
})