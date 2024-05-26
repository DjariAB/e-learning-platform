"use server";

import { db } from "@/server/db";
import { questionTable } from "@/server/db/schema";
import { generateId } from "lucia";

type ActionResult = { message: string | null; status: "Failed" | "Success"|null };

export async function quizAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const question = formData.get("question")?.toString();
  const choice1 = formData.get("choice1")?.toString();
  const choice2 = formData.get("choice2")?.toString();
  const choice3 = formData.get("choice3")?.toString();
  const lessonId = formData.get("lessonId")?.toString();
  const correctAnswer = formData.get("correctAnswer")?.toString();

  if (!question)
    return {
      message: "Seems like the question is missing, please try again",
      status: "Failed",
    };
  if (!choice2)
    return {
      message: "Seems like one of the answers is missing, please try again",
      status: "Failed",
    };
  if (!choice1)
    return {
      message: "Seems like one of the answers is missing, please try again",
      status: "Failed",
    };
  if (!choice3)
    return {
      message: "Seems like one of the answers is missing, please try again",
      status: "Failed",
    };
  if (!correctAnswer)
    return {
      message: "Seems like one of the answers is missing, please try again",
      status: "Failed",
    };
  if (!lessonId)
    return {
      message: "Seems like the lesson id is missing, please try again",
      status: "Failed",
    };

  const id = generateId(7);
  try {
    await db.insert(questionTable).values({
      id,
      question,
      choice1,
      choice2,
      choice3,
      correctAnswer,
      lessonId,
    });
    return { message: "quiz Published successfully", status: "Success" };
  } catch (err) {
    console.log("there was an error pushing to the db please try again ", err);
    return {
      message: "a problem adding your quizz please try again",
      status: "Failed",
    };
  }
}
