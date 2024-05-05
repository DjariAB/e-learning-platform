'use server'

import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: google('models/gemini-pro'),
    prompt: question
  })
  const validJSON = text.replace(/(\w+)\s*:/g, '"$1":');
  // Parse the JSON string into an object
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const obj: {
    Question: string;
    Choice_1: string;
    Choice_2: string;
    Choice_3: string;
    Choice_4: string;
    Correct_index: number;
  } = JSON.parse(validJSON);

  console.log(obj)

  return { text, finishReason, usage }
}