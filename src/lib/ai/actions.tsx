"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableUI } from "ai/rsc";
import { type ReactNode } from "react";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
  display?: ReactNode; // [!code highlight]
}

export async function continueConversationTest(
  question: string,
  difficulty: string,
) {
  const stream = createStreamableUI(); // [!code highlight]
  // const res = await fetch(
  //   "https://uploadthing-prod.s3.us-west-2.amazonaws.com/7e8cd3f4-7f86-4194-ada6-6228b43a21c5-pkoo3l.md",
  // );

  // const data = await res.text();

  const { text, toolResults } = await generateText({
    model: google("models/gemini-pro"),
    system:
      "You are a large language model trained to create informative and engaging quizzes on a wide range of topics. Given a specific topic and desired difficulty level, you can generate a set of questions that assess a user's knowledge and understanding. and u can help with mistakes made by the user and explain the correct answer",
    prompt: `generate a quiz about ${question} with this difficulty ${difficulty} `,
    tools: {
      generateQuiz: {
        description: "generate a quiz about something",
        parameters: z.object({
          question: z
            .string()
            .describe(
              `Ask the user a question about the subject they chose (make it ${difficulty} difficulty)`,
            ),
          wronganswer: z
            .string()
            .describe("A plausible but incorrect answer choice (distractor)"),
          choice2: z
            .string()
            .describe(
              "Another plausible but incorrect answer choice (distractor)",
            ),
          choice3: z
            .string()
            .describe(
              "Yet another plausible but incorrect answer choice (distractor)",
            ),
          correctAnswer: z
            .string()
            .describe("The answer that best fits the question (Correct)"),
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
          stream.done(
            <StreamableUI
              correctAnswer={correct}
              question={que}
              wronganswer={wrong}
              wronganswer2={wrong2}
              wronganswer3={wrong3}
            />,
          );
          return que; // [!code highlight]
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

export async function StreamableUI({
  correctAnswer,
  question,
  wronganswer,
  wronganswer2,
  wronganswer3,
}: {
  question: string;
  wronganswer: string;
  wronganswer2: string;
  wronganswer3: string;
  correctAnswer: string;
}) {
  return (
    <div className="flex flex-col gap-6 text-lg tracking-wider text-[#1E1E1E]">
      <input type="hidden" name="question" value={question} />
      <input name="choice1" type="hidden" value={wronganswer} />
      <input name="choice2" type="hidden" value={wronganswer2} />
      <input name="choice3" type="hidden" value={wronganswer3} />
      <input name="correctAnswer" type="hidden" value={correctAnswer} />

      <div className="item-center flex gap-5 ">
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            1
          </div>
        </div>
        <p className="flex grow flex-col gap-2  ">{wronganswer}</p>
      </div>
      <div className="item-center flex gap-5 ">
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            2
          </div>
        </div>
        <p className="flex grow flex-col gap-2  ">{wronganswer2}</p>
      </div>
      <div className="item-center flex gap-5 ">
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            3
          </div>
        </div>
        <p className="flex grow flex-col gap-2">{wronganswer3}</p>
      </div>
      <div className="item-center flex gap-5 ">
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-full bg-green-200 text-lg font-semibold text-blue-900">
            {" "}
            4
          </div>
        </div>
        <p className="gap- flex grow flex-col">{correctAnswer}</p>
      </div>
    </div>
  );
}
