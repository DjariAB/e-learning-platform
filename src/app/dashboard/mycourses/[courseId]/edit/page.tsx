import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { type InferSelectModel, eq, and, exists } from "drizzle-orm";
import EditWrapper from "./components/editWrapper";

type lessonType = InferSelectModel<typeof lessonTable>;
async function EditCoursePage({ params }: { params: { courseId: string } }) {
  const toEditCourse = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, params.courseId));

  const courseChapters = await db
    .select()
    .from(chapterTable)
    .where(eq(chapterTable.courseId, params.courseId))
    .orderBy(chapterTable.index);

  const chapterExists = db
    .select()
    .from(chapterTable)
    .where(
      and(
        eq(chapterTable.courseId, params.courseId),
        eq(chapterTable.id, lessonTable.chapterId),
      ),
    );

  const lessons = await db
    .select()
    .from(lessonTable)
    .where(exists(chapterExists));

  if (!toEditCourse || !toEditCourse[0]) return <div>Course not found</div>;

  console.log("you are here ");
  return (
    <>
      <EditWrapper
        course={toEditCourse[0]}
        courseChapters={courseChapters}
        courseLessons={lessons}
      />
    </>
  );
}
export default EditCoursePage;
