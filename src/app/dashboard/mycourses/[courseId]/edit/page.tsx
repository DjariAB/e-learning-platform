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
    .where(eq(chapterTable.courseId, params.courseId))
    .orderBy(chapterTable.index);

  let courseLessons: lessonType[] = [];

  for (const chap of courseChapters) {
    const chapLessons = await db
      .select()
      .from(lessonTable)
      .where(eq(lessonTable.chapterId, chap.id));
    courseLessons = courseLessons.concat(chapLessons);
    courseLessons.sort((l1, l2) => l1.index - l2.index);
    if (!toEditCourse || !toEditCourse[0]) return <div>Course not found</div>;

    return (
      <>
        <EditWrapper
          course={toEditCourse[0]}
          courseChapters={courseChapters}
          courseLessons={courseLessons}
        />
      </>
    );
  }
}
export default EditCoursePage;
