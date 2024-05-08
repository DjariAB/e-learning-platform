"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function getAnswer(question: string) {
  const res = await fetch(
    "https://uploadthing-prod.s3.us-west-2.amazonaws.com/7e8cd3f4-7f86-4194-ada6-6228b43a21c5-pkoo3l.md",
  );

  const data = await res.text();
  const { text, finishReason, usage } = await generateText({
    system:
      'You are a friendly quizz generator you are given a subject or content  by the user  generate a single quiz about the content provided that follows the following structure in the shape of an object {Question : "your question here" Choice_1 : "your first choice" Choice_2 : "your second choice" Choice_3 : "your third choice" Choice_4 : "your fourth choice" Correct_index : "index of the correct choice"}',

    model: google("models/gemini-pro"),
    prompt: `${question} ${data}`,
  });
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

  console.log(obj);

  return { obj, finishReason, usage };
}
