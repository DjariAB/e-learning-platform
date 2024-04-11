"use server";
import { type ActionResult } from "@/lib/Form";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { enrolledCoursesTable, lessonTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enroll(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) redirect("/login");

  const courseId = formData.get("courseId")?.toString();
  if (!courseId) return { error: "please provide a courseId" };
  const isEnrolled = await db
    .select()
    .from(enrolledCoursesTable)
    .where(
      and(
        eq(enrolledCoursesTable.userId, user.id),
        eq(enrolledCoursesTable.courseId, courseId),
      ),
    );

  if (isEnrolled[0]?.courseId) return { error: "coures is already enrolled" };

  try {
    // const currentLesson=await db.select().from(lessonTable).where(eq(lessonTable.))
    await db.insert(enrolledCoursesTable).values({ courseId, userId: user.id });
    revalidatePath("/courses");
    return { error: null };
  } catch (err) {
    return { error: "failed enrolling the course" };
  }
}
