import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import EditCourseForm from "./components/editCourseForm";
import { redirect } from "next/navigation";

async function EditCoursePage({ params }: { params: { courseId: string } }) {
  const toEditCourse = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, params.courseId));

  if (!toEditCourse || !toEditCourse[0]) return <div>Course not found</div>;

  return (
    <>
      <EditCourseForm course={toEditCourse[0]} />
    </>
  );
}
export default EditCoursePage;
