"use server";

// import { Weather } from '@ai-studio/components/weather'
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableUI } from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
  display?: ReactNode; // [!code highlight]
}

export async function continueConversation(history: Message[]) {
  const stream = createStreamableUI(); // [!code highlight]

  const res = await fetch(
    "https://uploadthing-prod.s3.us-west-2.amazonaws.com/7e8cd3f4-7f86-4194-ada6-6228b43a21c5-pkoo3l.md",
  );

  const data = await res.text();
  const { text, toolResults } = await generateText({
    model: google("models/gemini-pro"),
    system:
      "You are a friendly quizz generator you are given a subject by the user and you give him a question with answsers about that subject ",
    messages: history,
    prompt: `generate a quizz about this: ${data}`,
    tools: {
      generateQuiz: {
        description: "quizz about a subject",
        parameters: z.object({
          question: z
            .string()
            .describe(`ask the user a question about the subject provided`),
          wronganswer: z.string().describe("The wrong answer"),
          correctAnswer: z.string().describe("The correct answer"),
        }),
        execute: async ({ question, wronganswer, correctAnswer }) => {
          const que = question as string;
          const wrong = wronganswer as string;
          const correct = correctAnswer as string;

          console.log(wrong, correct);
          stream.update(
            <Test correctAnswer={correct} question={que} wronganswer={wrong} />,
          ); // [!code highlight]
          return `Here's is the question ${question}!`; // [!code highlight]
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content:
          text || toolResults.map((toolResult) => toolResult.result).join(),
        display: stream.value, // [!code highlight]
      },
    ],
  };
}

async function Test({
  correctAnswer,
  question,
  wronganswer,
}: {
  question: string;
  wronganswer: string;
  correctAnswer: string;
}) {
  return (
    <div>
      <h1>{question}</h1>
      <h1>{wronganswer}</h1>
      <h1>{correctAnswer}</h1>
    </div>
  );
}
