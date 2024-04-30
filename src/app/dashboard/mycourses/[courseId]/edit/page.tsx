import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { type InferSelectModel, eq } from "drizzle-orm";
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
    .where(eq(chapterTable.courseId, params.courseId));

  let courseLessons: lessonType[] = [];

  for (const chap of courseChapters) {
    const chapLessons = await db
      .select()
      .from(lessonTable)
      .where(eq(lessonTable.chapterId, chap.id));
    courseLessons = courseLessons.concat(chapLessons);

    if (!toEditCourse || !toEditCourse[0]) return <div>Course not found</div>;
    // const courseChapters = await db
    //   .select()
    //   .from(chapterTable)
    //   .where(eq(chapterTable.courseId, params.courseId))
    //   .orderBy(chapterTable.createdAt);

    // let lessons;
    // for (const chapter of courseChapters) {
    //   const chapterLessons = db
    //     .select()
    //     .from(lessonTable)
    //     .where(eq(lessonTable.chapterId, chapter.id));
    //   lessons = [...lessons , chapterLessons];
    // }

    return (
      <>
        <EditWrapper course={toEditCourse[0]} courseChapters = {courseChapters} courseLessons = {courseLessons}/>
      </>
    );
  }
}
export default EditCoursePage;
