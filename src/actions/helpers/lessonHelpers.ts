"use server";

import { db } from "@/server/db";
import { courseTable, lessonTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

export async function addLessonAction(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<lessonActionResult> {
  const title = formData.get("title")?.toString();
  const chapterId = formData.get("chapterId")?.toString();
  const courseId = formData.get("courseId")?.toString();

  if (!title) {
    return { error: "please provide a title", type: "failed" };
  }
  if (!chapterId || !courseId) {
    return { error: "chapter or courseId Id missing", type: "failed" };
  }

  try {
    const courses = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.id, courseId));
    const course = courses[0];
    if (!course) throw new Error("no course ");
    const id = generateId(7);
    await db.insert(lessonTable).values({
      title,
      chapterId,
      id,
      courseId: course.id,
      index: course.lessonsNum + 1,
    });
    await db
      .update(courseTable)
      .set({ lessonsNum: course.lessonsNum + 1 })
      .where(eq(courseTable.id, courseId));
  } catch (err) {
    console.log("there was an error adding a chapter please try again ", err);
    return { error: "error in the server please try again", type: "failed" };
  }

  revalidatePath(`/dashboard/mycourses/${courseId}/edit`);
  return { error: "Lesson Added Successfully", type: "success" };
}
export async function updateLessonAction(
  _: unknown,
  formData: FormData,
): Promise<lessonActionResult> {
  const title = formData.get("title")?.toString();
  const courseId = formData.get("courseId")?.toString();
  const id = formData.get("id")?.toString();

  if (!title) {
    return { error: "name can't be empty", type: "failed" };
  }

  if (!id) {
    return { error: "there is no chapter", type: "failed" };
  }

  try {
    await db.update(lessonTable).set({ title }).where(eq(lessonTable.id, id));
  } catch (err) {
    console.log("there was an error updating a chapter please try again ", err);
    return { error: "Error in the server please try again", type: "failed" };
  }

  revalidatePath(`/dashboard/mycourses/${courseId}/edit`);

  return { error: "Lesson Updated Successfully", type: "success" };
}
export async function deleteLessonAction(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<lessonActionResult> {
  const id = formData.get("id")?.toString();
  const courseId = formData.get("courseId")?.toString();

  if (!id) return { error: "no such lesson in the db", type: "failed" };
  try {
    await db.delete(lessonTable).where(eq(lessonTable.id, id));
  } catch (err) {
    return {
      error: "Failed to delete the lesson please try again",
      type: "failed",
    };
  }

  revalidatePath(`/dashboard/mycourses/${courseId}/edit`);
  return { error: "", type: "success" };
}

export type lessonActionResult<> = {
  error: string;
  type: inputType | null;
};
type inputType = "failed" | "success";
