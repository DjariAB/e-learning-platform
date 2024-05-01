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
): Promise<CourseActionResult> {
  const { user } = await validateRequest();

  if (!user) redirect("/login/mentor");

  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const level = formData.get("level")?.toString();
  const briefDescription = formData.get("Description")?.toString();

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
  if (!title || !category || !level || !briefDescription)
    return { error, type };

  const id = generateId(7);
  const course = await db.insert(courseTable).values({
    level,
    title,
    educatorId: user.id,
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1358/0*Wkrz5TuOxQs9tXri.png",
    id,
    category,
    briefDescription: briefDescription,
    mainDescription: "",
    courseGoals: "",
  });
  if (!course)
    return {
      error: { failed: "failed to create the course please try again" },
      type: { failed: true },
    };

  redirect(`/dashboard/mycourses/${id}/edit`);
}
export async function editCourseInfo(
  _: unknown,
  formData: FormData,
  //  courseId: string
): Promise<editCourseActionResult> {
  const { user } = await validateRequest();

  if (!user) redirect("/login/mentor");
  const courseId = formData.get("courseId")?.toString();

  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const level = formData.get("level")?.toString();
  const briefDescription = formData.get("Description")?.toString();
  const mainDescription = formData.get("mainDescription")?.toString();
  const courseGoals = formData.get("courseGoals")?.toString();

  const error: editErrorType = {};
  const type: editInputReturnTYpe = {};
  if (!courseId) {
    return redirect("/dashboard/mycourses");
  }
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
  if (!briefDescription) {
    error.Description = "Please provide a brief description";
    type.Description = true;
  }
  if (!mainDescription) {
    error.mainDescription = "Please provide a main description";
    type.mainDescription = true;
  }
  if (!courseGoals) {
    error.courseGoals = "Please add course goals";
    type.courseGoals = true;
  }
  if (
    !title ||
    !category ||
    !level ||
    !briefDescription ||
    !mainDescription ||
    !courseGoals
  )
    return { error, type };

  try {
    await db
      .update(courseTable)
      .set({
        level,
        title,
        briefDescription,
        mainDescription,
        courseGoals,
        category,
      })
      .where(eq(courseTable.id, courseId));
  } catch (err) {
    return {
      error: { failed: "failed to create the course please try again" },
      type: { failed: true },
    };
  }
  return {
    error: { success: "Changes have been added successfully" },
    type: { success: true },
  };
}

type CourseActionResult<> = {
  error: errorType | null;
  type: inputReturnTYpe | null;
};
export type editCourseActionResult<> = {
  error: editErrorType | null;
  type: editInputReturnTYpe | null;
};
type inputType =
  | "title"
  | "Description"
  | "category"
  | "level"
  | "failed"
  | "success";
export type editInputType = inputType | "mainDescription" | "courseGoals";
type errorType = { [key in keyof inputReturnTYpe]: string };
type editErrorType = { [key in keyof editInputReturnTYpe]: string };
type inputReturnTYpe = Partial<Record<inputType, boolean>>;
type editInputReturnTYpe = Partial<Record<editInputType, boolean>>;
