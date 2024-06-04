import { DeleteCourse } from "@/actions/helpers/courseHelpers";
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
  courseTable,
  lessonTable,
  userTable,
} from "@/server/db/schema";
import { count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseCategory from "@/components/courseCategory";

export default async function MentorCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courses = await db
    .select()
    .from(courseTable)
    .leftJoin(userTable, eq(userTable.id, courseTable.educatorId))
    .where(eq(courseTable.id, params.courseId));
  const course = courses[0];
  if (!course) redirect("/courses");
  // const numOfLessons = await db
  //   .select({ count: count(lessonTable.id) })
  //   .from(courseTable)
  //   .leftJoin(chapterTable, eq(courseTable.id, chapterTable.courseId))
  //   .leftJoin(lessonTable, eq(chapterTable.id, lessonTable.chapterId))
  //   .where(eq(courseTable.id, params.courseId));

  const chapters = await db
    .select()
    .from(chapterTable)
    .where(eq(chapterTable.courseId, params.courseId))
    .orderBy(chapterTable.index);

  // const bindedChapteraciton = chapteraciton.bind(null, params.courseId);

  return (
    <>
      <div className={` pt-10 `}>
        <div className="flex items-center gap-10 px-12  ">
          <img
            src={
              course.courses.imageUrl ??
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt="Course image"
            className="size-[280px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-4 text-black">
            <h1 className="text-4xl font-medium">{course?.courses.title}</h1>
            <p className="text-3xl font-thin">
              {course.courses.briefDescription}
            </p>
            <div className=" flex gap-6 ">
              <CourseLevel
                level={course.courses.level}
                className="text-black"
              />
              <CourseCategory
                category={course.courses.category}
                className="text-black"
              />
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
              <div className="flex gap-2">
                <Link href={`/dashboard/mycourses/${params.courseId}/edit`}>
                  <Button className="rounded-md px-5">Edit Course</Button>
                </Link>
                <form action={DeleteCourse}>
                  <Input type="hidden" value={params.courseId} name="id" />
                  <Button
                    variant={"outline"}
                    className="rounded-md border-red-500 px-10 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-4/5 px-24 py-6 text-2xl">
          <h1 className="text-3xl font-medium">Description </h1>
          <p className="p-4 text-xl font-light">
            {course.courses.mainDescription}
          </p>

          <br />

          <div>
            <h1 className=" pb-2 font-bold">Chapters</h1>
            <div className="p-4 pl-8 pr-24">
              <Accordion type="single" collapsible className="w-full">
                {chapters.map((chapter) => (
                  <CHapterAccordionItem chapter={chapter} key={chapter.id} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type CHapterAccordionItemPorps = {
  chapter: {
    id: string;
    name: string;
  };
};
async function CHapterAccordionItem({ chapter }: CHapterAccordionItemPorps) {
  const lessons = await db
    .select()
    .from(lessonTable)
    .where(eq(lessonTable.chapterId, chapter.id));

  return (
    <AccordionItem key={chapter.id} value={chapter.id}>
      <AccordionTrigger>{chapter.name}</AccordionTrigger>

      {lessons.map((lesson) => (
        <AccordionContent className="pl-6" key={lesson.id}>
          {lesson.title}
        </AccordionContent>
      ))}
    </AccordionItem>
  );
}

// async function chapteraciton(courseId: string) {
//   "use server";

//   const id = generateId(7);
//   await db
//     .insert(chapterTable)
//     .values({ courseId: courseId, name: "first chapter", id });
//   const path = `/courses/${courseId}`;
//   revalidatePath(path);
// }

// async function lessonAction() {
//   "use server";

//   const id = generateId(7);
//   await db
//     .insert(lessonTable)
//     .values({ chapterId: "u6eprc7", title: "first lesson", id });
// }
