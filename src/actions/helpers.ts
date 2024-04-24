"use server";
import { type ActionResult } from "@/lib/Form";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { courseTable, enrolledCoursesTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
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
  const level = formData.get("level")?.toString();

  const error: errorType = {};
  const type: inputReturnTYpe = {};

  if (!title) {
    error.title = "Please provide a Title";
    type.title = true;
  }
  if (!level) {
    error.level = "Please Select a level";
    type.level = true;
  }
  if (!category) {
    error.category = "Please Select a category";
    type.category = true;
  }

  if (error || !title || !category || !level) return { error, type };

  const id = generateId(7);
  const course = await db.insert(courseTable).values({
    level,
    title,
    educatorId: user.id,
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1358/0*Wkrz5TuOxQs9tXri.png",
    id,
  });
  if (!course)
    return {
      error: { failed: "failed to create the course please try again" },
      type: { failed: true },
    };

  redirect(`/dashboard/${id}`);
}

type addCourseActionResult<> = {
  error: errorType | null;
  type: inputReturnTYpe | null;
};

type inputType = "title" | "Description" | "category" | "level" | "failed";
type errorType = { [key in keyof inputReturnTYpe]: string };
type inputReturnTYpe = Partial<Record<inputType, boolean>>;
