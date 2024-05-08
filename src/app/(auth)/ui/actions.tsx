"use server";

// import { Weather } from '@ai-studio/components/weather'
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableUI } from "ai/rsc";
import { type ReactNode } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          stream.done(
            <StreamableUI
              correctAnswer={correct}
              question={que}
              wronganswer={wrong}
              wronganswer2={wrong2}
              wronganswer3={wrong3}
            />,
          ); // [!code highlight]
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
    <Card className="w-fit rounded-xl">
      <CardHeader className="">
        <CardTitle className="  text-xl">{question}</CardTitle>
      </CardHeader>
      <br />
      <CardContent className="flex flex-col  px-3  text-lg tracking-wider text-[#1E1E1E]">
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            1
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            2
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer2} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            3
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer3} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            4
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={correctAnswer} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
