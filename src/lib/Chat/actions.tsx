/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue,
  render,
} from "ai/rsc";

import { BotCard, BotMessage } from "@/components/ai/message";

import { SpinnerMessage } from "@/components/ai/message";
// import { Chat } from '../types'
// import { SelectSeats } from '@/components/flights/select-seats'
// import { ListFlights } from '@/components/flights/list-flights'
// import { CheckIcon, SpinnerIcon } from '@/components/ui/icons'
import { experimental_streamText } from "ai";
import { google } from "ai/google";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { generateId } from "lucia";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
);
async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: generateId(7),
        role: "user",
        content: `${aiState.get().interactions.join("\n\n")}\n\n${content}`,
      },
    ],
  });

  const history = aiState.get().messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  // console.log(history)

  const textStream = createStreamableValue("");
  const spinnerStream = createStreamableUI(<SpinnerMessage />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  const ui = render({
    model: "models/gemini-1.0-pro-001",
    temperature: 0,
    tools: {
      reactquiz: {
        description:
          "make a small quizz about some content (provided by the user) make your question a bit hard and the answers long ",
        parameters: z.object({
          question: z
            .string()
            .describe("the question u are asking the user about his topic "),
          firstAnswer: z.string().describe("answer number one "),
          secondAnswer: z.string().describe("answer number two "),
          thirdAnswer: z.string().describe("answer number three"),
          correctAnswer: z.string().describe("fourth answer  "),
        }),
      },
      speakaboutMessi: {
        description: "speak about the legend messi",
        parameters: z.object({
          goldenBalls: z.string().describe("messi number of golden balls "),
        }),
      },
    },
    system: `\
You are a friendly assistant that helps the user with booking flights to destinations that are based on a list of books. You can you give travel recommendations based on the books, and will continue to help the user book a flight to their destination.


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
    messages: [...history],
  })(async () => {
    try {
      const result = await experimental_streamText({
        model: google.generativeAI("models/gemini-1.0-pro-001"),
        temperature: 0,
        tools: {
          reactquiz: {
            description:
              "make a small quizz about some content (provided by the user) make your question a bit hard and the answers long ",
            parameters: z.object({
              question: z
                .string()
                .describe(
                  "the question u are asking the user about his topic ",
                ),
              firstAnswer: z.string().describe("answer number one "),
              secondAnswer: z.string().describe("answer number two "),
              thirdAnswer: z.string().describe("answer number three"),
              correctAnswer: z.string().describe("fourth answer  "),
            }),
          },
          speakaboutMessi: {
            description: "speak about the legend messi",
            parameters: z.object({
              goldenBalls: z.string().describe("messi number of golden balls "),
            }),
          },
        },
        system: `\
      You are a friendly assistant that helps the user with booking flights to destinations that are based on a list of books. You can you give travel recommendations based on the books, and will continue to help the user book a flight to their destination.
  
      
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
        messages: [...history],
      });

      let textContent = "";
      spinnerStream.done(null);

      for await (const delta of result.fullStream) {
        const { type } = delta;

        if (type === "text-delta") {
          const { textDelta } = delta;

          textContent += textDelta;
          messageStream.update(<BotMessage content={textContent} />);

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: generateId(7),
                role: "assistant",
                content: textContent,
              },
            ],
          });
        } else if (type === "tool-call") {
          const { toolName, args } = delta;

          if (toolName === "speakaboutMessi") {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: generateId(7),
                  role: "assistant",

                  display: {
                    name: "messi the goat",
                    props: {
                      goldenBalls: args.goldenBalls,
                    },
                  },
                },
              ],
            });

            uiStream.update(
              <BotCard>
                <div>{args.goldenBalls}</div>
              </BotCard>,
            );
          } else if (toolName === "reactquiz") {
            const { correctAnswer, firstAnswer, secondAnswer, thirdAnswer } =
              args;
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: generateId(7),
                  role: "assistant",

                  display: {
                    name: "messi the goat",
                    props: {
                      goldenBalls: args.goldenBalls,
                    },
                  },
                },
              ],
            });

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
              </BotCard>,
            );
          }
        }
      }

      uiStream.done();
      textStream.done();
      messageStream.done();
    } catch (e) {
      console.error(e);

      const error = new Error(
        "The AI got rate limited, please try again later.",
      );
      uiStream.error(error);
      textStream.error(error);
      messageStream.error(error);
      aiState.done();
    }
  })();

  return {
    id: generateId(7),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value,
  };
}

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id?: string;
  name?: string;
  display?: {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Record<string, any>;
  };
};

export type AIState = {
  chatId: string;
  interactions?: string[];
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
  spinner?: React.ReactNode;
  attachments?: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: generateId(7), interactions: [], messages: [] },
});

// export const getUIStateFromAIState = (aiState: Chat) => {
//   return aiState.messages
//     .filter(message => message.role !== 'system')
//     .map((message, index) => ({
//       id: `${aiState.chatId}-${index}`,
//       display:
//         message.role === 'assistant' ? (
//           message.display?.name === 'speakaboutMessi' ? (
//             <BotCard>
//               <ListFlights summary={message.display.props.summary} />
//             </BotCard>
//           ) : message.display?.name === 'reactquiz' ? (
//             <BotCard>
//               <SelectSeats summary={message.display.props.summary} />
//             </BotCard>
//           ) : (
//             <BotMessage content={message.content} />
//           )
//         ) : message.role === 'user' ? (
//           <UserMessage showAvatar>{message.content}</UserMessage>
//         ) : (
//           <BotMessage content={message.content} />
//         )
//     }))
// }

// export async function requestCode() {
//   'use server'

//   const aiState = getMutableAIState()

//   aiState.done({
//     ...aiState.get(),
//     messages: [
//       ...aiState.get().messages,
//       {
//         role: 'assistant',
//         content:
//           "A code has been sent to user's phone. They should enter it in the user interface to continue."
//       }
//     ]
//   })

//   const ui = createStreamableUI(
//     <div className="animate-spin">
//       <SpinnerIcon />
//     </div>
//   )

//   ;(async () => {
//     await sleep(2000)
//     ui.done()
//   })()

//   return {
//     status: 'requires_code',
//     display: ui.value
//   }
// }

// export async function validateCode() {
//   'use server'

//   const aiState = getMutableAIState()

//   const status = createStreamableValue('in_progress')
//   const ui = createStreamableUI(
//     <div className="flex flex-col items-center justify-center gap-3 p-6 text-zinc-500">
//       <div className="animate-spin">
//         <SpinnerIcon />
//       </div>
//       <div className="text-sm text-zinc-500">
//         Please wait while we fulfill your order.
//       </div>
//     </div>
//   )

//   ;(async () => {
//     await sleep(2000)

//     ui.done(
//       <div className="flex flex-col items-center text-center justify-center gap-3 p-4 text-emerald-700">
//         <CheckIcon />
//         <div>Payment Succeeded</div>
//         <div className="text-sm text-zinc-600">
//           Thanks for your purchase! You will receive an email confirmation
//           shortly.
//         </div>
//       </div>
//     )

//     aiState.done({
//       ...aiState.get(),
//       messages: [
//         ...aiState.get().messages.slice(0, -1),
//         {
//           role: 'assistant',
//           content: 'The purchase has completed successfully.'
//         }
//       ]
//     })

//     status.done('completed')
//   })()

//   return {
//     status: status.value,
//     display: ui.value
//   }
// }
