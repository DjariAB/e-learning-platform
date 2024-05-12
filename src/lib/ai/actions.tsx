"use server";

// import { Weather } from '@ai-studio/components/weather'
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableUI } from "ai/rsc";
import { type ReactNode } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { questionTable } from "@/server/db/schema";
import { generateId } from "lucia";

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
          // const id = generateId(7);
          // await db
          //   .insert(questionTable)
          //   .values({
          //     question: que,
          //     choice1: wrong,
          //     choice2: wrong2,
          //     choice3: wrong3,
          //     correctAnswer: correct,
          //     id
          //   });
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
    <form action={quizAction}>
      <Card className="w-full rounded-xl">
        <CardHeader className="">
          <CardTitle className="  pb-4 text-xl">{question} </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 text-lg tracking-wider text-[#1E1E1E]">
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
          <div className="flex justify-center px-10">
            <Button type="submit" className="rounded-lg bg-blue-900 ">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

async function quizAction(formData: FormData) {
  "use server";
  const question = formData.get("question")?.toString();
  const choice1 = formData.get("choice1")?.toString();
  const choice2 = formData.get("choice2")?.toString();
  const choice3 = formData.get("choice3")?.toString();
  const correctAnswer = formData.get("correctAnswer")?.toString();

  if (!question) return;
  if (!choice2) return;
  if (!choice1) return;
  if (!choice3) return;
  if (!correctAnswer) return;

  const id = generateId(7);
  try {
    await db
      .insert(questionTable)
      .values({ id, question, choice1, choice2, choice3, correctAnswer });
    console.log("success");
  } catch (err) {
    console.log("there was an error pushing to the db please try again ", err);
  }
}
