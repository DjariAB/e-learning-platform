import { enroll } from "@/actions/helpers/courseHelpers";
import CourseLevel from "@/components/courselevel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/server/db";
import {
  chapterTable,
  commentsTable,
  courseTable,
  enrolledCoursesTable,
  lessonTable,
  userTable,
} from "@/server/db/schema";
import styles from "@/styles/main.module.css";
import { Form } from "@/lib/Form";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, asc, eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CourseCategory from "@/components/courseCategory";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courses = await db
    .select()
    .from(courseTable)
    .leftJoin(userTable, eq(userTable.id, courseTable.educatorId))
    .where(eq(courseTable.id, params.courseId));
  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.courseId, params.courseId));

  const course = courses[0];
  if (!course) redirect("/courses");

  const { user } = await validateRequest();

  const chapters = await db
    .select()
    .from(chapterTable)
    .where(eq(chapterTable.courseId, params.courseId))
    .orderBy(asc(chapterTable.index));
  const isEnrolled = await db
    .select({
      lessonTitle: lessonTable.title,
      index: lessonTable.index,
      currentLesson: enrolledCoursesTable.currentLessonId,
    })
    .from(enrolledCoursesTable)
    .leftJoin(
      lessonTable,
      eq(lessonTable.id, enrolledCoursesTable.currentLessonId),
    )
    .where(
      and(
        eq(enrolledCoursesTable.userId, user!.id),
        eq(enrolledCoursesTable.courseId, params.courseId),
      ),
    );

  const bindedCommentsaciton = commentsAction.bind(null, params.courseId);

  return (
    <>
      <div className={`z-50 bg-cover pt-10 ${styles.background}`}>
        <div className="flex items-center gap-16 px-28 py-12 ">
          <img
            src={
              course.courses.imageUrl ??
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt="Course image"
            className="size-[280px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-4 text-white">
            <h1 className="text-4xl font-semibold">{course?.courses.title}</h1>
            <p className="text-3xl font-extralight py-2">
              {course.courses.briefDescription}
            </p>
            <div className="flex  gap-6">
              <CourseLevel
                level={course.courses.level.toString()}
                className="font-medium text-black"
              />
              <CourseCategory category={course.courses.category} />
            </div>
            <div className="flex justify-between pr-10">
              <div className="flex items-center gap-2">
                <img
                  src={
                    course.user?.imageUrl ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSykf1DK2I0-lBz5TsSPm9_OQ-fc5YxO4aISQ&s"
                  }
                  className="size-10 rounded-full object-cover"
                  alt="educator's avatar"
                />
                <p>{course.user?.userName}</p>
              </div>
              {isEnrolled.length && isEnrolled[0] ? (
                <Link
                  href={`/courses/${params.courseId}/${isEnrolled[0].currentLesson}`}
                  className="rounded-lg bg-white px-7 py-3.5 font-bold text-[#072e6a] hover:bg-[#ffffffcf]"
                >
                  Continue Learning{" "}
                </Link>
              ) : (
                <Form action={enroll}>
                  <input
                    type="hidden"
                    value={params.courseId}
                    name="courseId"
                  />
                  <Button
                    type="submit"
                    className="bg-white px-7 py-5 font-bold text-[#072e6a] hover:bg-[#ffffffcf]"
                  >
                    Enroll{" "}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4 px-24 py-6 text-2xl">
          <h1 className="text-3xl font-medium">Description </h1>
          <p className="text p-4 font-light">
            {course.courses.mainDescription}
          </p>

          <br />

          <div>
            <h1 className=" pb-2 font-bold">Chapters</h1>
            <div className="p-4 pl-8 pr-24">
              <Accordion type="single" collapsible className="w-full">
                {chapters.map((chapter) => (
                  <CHapterAccordionItem
                    chapter={chapter}
                    key={chapter.id}
                    courseId={params.courseId}
                  />
                ))}
              </Accordion>
            </div>
          </div>

          <div>
            <form className="flex gap-3 pt-4 " action={bindedCommentsaciton}>
              <Input type="text" name="body" className="shrink" />
              <button
                type="submit"
                className="w-52 rounded-md bg-black px-2 py-2 text-white"
              >
                {" "}
                add a comment{" "}
              </button>
            </form>
            <ul className="space-y-3 p-4">
              {comments.length ? (
                comments.map((comment) => (
                  <li key={comment.id}>{comment.body}</li>
                ))
              ) : (
                <p>there are no comments for now </p>
              )}
            </ul>
          </div>
        </div>
        <div>Scroll tracker</div>
      </div>
    </>
  );
}

type CHapterAccordionItemPorps = {
  id: string;
  name: string;
  courseId: string;
};

async function CHapterAccordionItem({
  chapter,
  courseId,
}: {
  chapter: CHapterAccordionItemPorps;
  courseId: string;
}) {
  const lessons = await db
    .select()
    .from(lessonTable)
    .where(eq(lessonTable.chapterId, chapter.id));

  return (
    <AccordionItem key={chapter.id} value={chapter.id}>
      <AccordionTrigger>{chapter.name}</AccordionTrigger>

      {lessons.map((lesson) => (
        <AccordionContent key={lesson.id}>
          <Link href={`/courses/${courseId}/${lesson.id}`}>{lesson.title}</Link>
        </AccordionContent>
      ))}
    </AccordionItem>
  );
}

async function commentsAction(courseId: string, formData: FormData) {
  "use server";

  const { user } = await validateRequest();
  const body = formData.get("body")?.toString();
  if (!user || !body) return;
  const id = generateId(7);
  await db.insert(commentsTable).values({
    courseId,
    body,
    id,
    userId: user.id,
    userName: user.userName,
  });
  const path = `/courses/${courseId}`;
  revalidatePath(path);
}
