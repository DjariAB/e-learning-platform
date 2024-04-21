"use server";
import { type ActionResult } from "@/lib/Form";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { courseTable, enrolledCoursesTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
import { LucideEllipsisVertical } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Pathway_Extreme } from "next/font/google";
import { redirect } from "next/navigation";

export async function enroll(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) redirect("/login");

  const courseId = formData.get("courseId")?.toString();
  if (!courseId) return { error: "please provide a courseId", type: null };
  const isEnrolled = await db
    .select()
    .from(enrolledCoursesTable)
    .where(
      and(
        eq(enrolledCoursesTable.userId, user.id),
        eq(enrolledCoursesTable.courseId, courseId),
      ),
    );

  if (isEnrolled[0]?.courseId)
    return { error: "coures is already enrolled", type: null };

  try {
    // const currentLesson=await db.select().from(lessonTable).where(eq(lessonTable.))
    await db.insert(enrolledCoursesTable).values({ courseId, userId: user.id });
    revalidatePath("/courses");
    return { error: null, type: null };
  } catch (err) {
    return { error: "failed enrolling the course", type: null };
  }
}

export async function addCourse(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<addCourseActionResult> {
  const { user } = await validateRequest();

  if (!user) redirect("/login/mentor");

  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const level = formData.get("level")?.toString() as levelenum;
  type levelenum = "beginner" | "intermediate" | "advanced" | undefined;

  if (!title) return { error: "please provide a Title", type: "title" };
  if (!category) return { error: "please select a category", type: "category" };
  if (!level) return { error: "please select a level", type: "level" };

  // const currentLesson=await db.select().from(lessonTable).where(eq(lessonTable.))

  const id = generateId(7);
  const course = await db.insert(courseTable).values({
    level: level,
    title,
    educatorId: user.id,
    imageUrl: "",
    id,
  });
  if (!course)
    return {
      error: "failed to create the course please try again",
      type: "failed",
    };

  redirect(`/dashboard/${id}`);
}

type addCourseActionResult = {
  error: string | null;
  type: "title" | "Description" | "category" | "level" | "failed" | null;
};
