"use server";

import { db } from "@/server/db";
import { lessonTable } from "@/server/db/schema";
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
  if (!chapterId) {
    return { error: "chapter Id missing", type: "failed" };
  }

  try {
    const id = generateId(7);
    await db.insert(lessonTable).values({ title, chapterId, id });
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

  console.log("you are here before testing");
  if (!title) {
    return { error: "name can't be empty", type: "failed" };
  }

  if (!id) {
    return { error: "there is no chapter", type: "failed" };
  }

  console.log("you are here after testing ");

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
  error: string ;
  type: inputType | null;
};
type inputType = "failed" | "success";
