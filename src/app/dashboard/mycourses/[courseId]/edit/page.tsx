import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { InferSelectModel, eq } from "drizzle-orm";
import EditCourseForm, {
  EditCourseContentForm,
} from "./components/editCourseForm";
type lessonType = InferSelectModel<typeof lessonTable>;
async function EditCoursePage({ params }: { params: { courseId: string } }) {
  const isEditingInfo = true;
  const toEditCourse = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, params.courseId));

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
      {isEditingInfo ? (
        <EditCourseForm course={toEditCourse[0]} />
      ) : (
        // <EditCourseContentForm courseContent={toEditCourse[0]} />
        <EditCourseContentForm />
      )}
    </>
  );
}
export default EditCoursePage;
