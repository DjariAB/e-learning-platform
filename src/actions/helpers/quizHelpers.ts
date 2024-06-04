"use server";

import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import {
  courseTable,
  enrolledCoursesTable,
  lessonTable,
  questionTable,
} from "@/server/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

type ActionResult = {
  message: string | null;
  status: "Failed" | "Success" | null;
};

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
export async function NextLessonAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const courseIdx = formData.get("lessonIndex")?.toString();
  const scoreStr = formData.get("score")?.toString();
  const courseId = formData.get("courseId")?.toString();
  const { user } = await validateRequest();

  if (!courseIdx || !courseId || scoreStr === undefined)
    return {
      message: "Seems like this course info is missing , please try again",
      status: "Failed",
    };
  if (!user)
    return {
      message: "this operation is forbined if you are not logged in ",
      status: "Failed",
    };

  const lessonIndex = Number(courseIdx);
  const score = Number(scoreStr);
  const coursesEnrolment = await db
    .select()
    .from(enrolledCoursesTable)
    .where(
      and(
        eq(enrolledCoursesTable.courseId, courseId),
        eq(enrolledCoursesTable.userId, user.id),
      ),
    )
    .leftJoin(courseTable, eq(courseTable.id, enrolledCoursesTable.courseId));

  const enrolledCourse = coursesEnrolment[0];
  if (!coursesEnrolment || !enrolledCourse || !enrolledCourse.courses)
    return {
      message: "No such course exists or is enrolled, please try again",
      status: "Failed",
    };

  if (
    enrolledCourse.enrolled_Courses.currentLessonIndex ===
    enrolledCourse.courses.lessonsNum
  ) {
    console.log("you should be inside ");
    redirect(`/courses/${courseId}`);
  }

  console.log("you  are in the second part ");

  const nextlesson = await db
    .select()
    .from(lessonTable)
    .where(gt(lessonTable.index, lessonIndex))
    .orderBy(lessonTable.index);
  try {
    await db
      .update(enrolledCoursesTable)
      .set({
        currentLessonIndex: nextlesson[0]?.index,
        currentLessonId: nextlesson[0]?.id,
        score: enrolledCourse.enrolled_Courses.score + score,
      })
      .where(
        and(
          eq(
            enrolledCoursesTable.userId,
            enrolledCourse.enrolled_Courses.userId,
          ),
          eq(enrolledCoursesTable.courseId, enrolledCourse.courses.id),
        ),
      );
  } catch (err) {
    return {
      message: "Error in the server, please try again",
      status: "Failed",
    };
  }

  redirect(`/courses/${courseId}/${nextlesson[0]?.id}`);

  return { message: null, status: "Success" };
}
