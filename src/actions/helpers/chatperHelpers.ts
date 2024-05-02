"use server";

import { db } from "@/server/db";
import { chapterTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

export async function addChapterAction(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<chapterActionResult> {
  const name = formData.get("name")?.toString();
  const courseId = formData.get("courseId")?.toString();

  if (!name) {
    return { error: "please provide a name", type: "failed" };
  }
  if (!courseId) {
    return { error: "course Id missing", type: "failed" };
  }

  try {
    const id = generateId(7);
    await db.insert(chapterTable).values({ name, courseId, id });
  } catch (err) {
    console.log("there was an error adding a chapter please try again ", err);
    return { error: "error in the server please try again", type: "failed" };
  }

  revalidatePath(`/dashboard/mycourses/${courseId}/edit`);
  return { error: "Chapter Added Successfully", type: "success" };
}
export async function updateChapterAction(
  _: unknown,
  formData: FormData,
): Promise<chapterActionResult> {
  const name = formData.get("name")?.toString();
  const id = formData.get("id")?.toString();
  const courseId = formData.get("courseId")?.toString();

  console.log("you are here before testing");
  if (!name) {
    return { error: "name can't be empty", type: "failed" };
  }
  if (!id) {
    return { error: "there is no such chapter", type: "failed" };
  }

  console.log("you are here after testing ");

  try {
    await db.update(chapterTable).set({ name }).where(eq(chapterTable.id, id));
  } catch (err) {
    return {
      error: "Failed to update the chapter please try again",
      type: "failed",
    };
  }

  revalidatePath(`/dashboard/mycourses/${courseId}/edit`);

  return { error: "Chapter Updated Successfully", type: "success" };
}

export type chapterActionResult<> = {
  error: string ;
  type: inputType | null;
};
type inputType = "failed" | "success";
