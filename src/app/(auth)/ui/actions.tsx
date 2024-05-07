"use server";

// import { Weather } from '@ai-studio/components/weather'
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableUI } from "ai/rsc";
import { type ReactNode } from "react";
import { z } from "zod";

import { StreamableUI } from "@/components/streamableUi";
import { Input } from "@/components/ui/input";

export interface Message {
  role: "user" | "assistant";
  content: string;
  display?: ReactNode; // [!code highlight]
}

export async function continueConversationTest(question: string) {
  const stream = createStreamableUI(); // [!code highlight]
  // const res = await fetch(
  //   "https://uploadthing-prod.s3.us-west-2.amazonaws.com/7e8cd3f4-7f86-4194-ada6-6228b43a21c5-pkoo3l.md",
  // );

  // const data = await res.text();

  const { text, toolResults } = await generateText({
    model: google("models/gemini-pro"),
    system:
      "You are a friendly quizz generator you are given a subject by the user and you give him a question with answsers about that subject ",
    prompt: `generate a quizz about this ${question} `,
    tools: {
      generateQuiz: {
        description: "generate a quiz about something",
        parameters: z.object({
          question: z
            .string()
            .describe(
              "ask the user a question about the subject he chose make it hard",
            ),
          wronganswer: z.string().describe("Choice number one (wrong answer)"),
          choice2: z.string().describe("Choice number four (wrong answer)"),
          choice3: z.string().describe("Choice number three (wrong answer)"),
          correctAnswer: z
            .string()
            .describe("choice number four (The correct answer)"),
        }),
        execute: async ({
          question,
          wronganswer,
          correctAnswer,
          choice2,
          choice3,
        }) => {
          const que = question as string;
          const wrong = wronganswer as string;
          const wrong2 = choice2 as string;
          const wrong3 = choice3 as string;
          const correct = correctAnswer as string;
          stream.done(<Input value={correct} />); // [!code highlight]
          return `${question}`; // [!code highlight]
        },
      },
    },
  });

  return {
    role: "assistant" as const,
    content: text || toolResults.map((toolResult) => toolResult.result).join(),
    display: stream.value, // [!code highlight]
  };
}
