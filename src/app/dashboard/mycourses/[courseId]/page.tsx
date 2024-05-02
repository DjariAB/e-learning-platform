/* eslint-disable @next/next/no-img-element */
import { DeleteCourse, enroll } from "@/actions/helpers/courseHelpers";
import CourseLevel from "@/components/courselevel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { validateRequest } from "@/server/auth";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function MentorCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courses = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, params.courseId));
  const course = courses[0];
  if (!course) redirect("/courses");
  const { user } = await validateRequest();

  const chapters = await db
    .select()
    .from(chapterTable)
    .where(eq(chapterTable.courseId, params.courseId))
    .orderBy(chapterTable.index);

  const bindedChapteraciton = chapteraciton.bind(null, params.courseId);

  return (
    <>
      <div className={` pt-10 `}>
        <div className="flex items-center gap-16 px-12  ">
          <img
            src={
              course.imageUrl
                ? course.imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt="Course image"
            className="size-[280px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-4 text-black">
            <h1 className="text-3xl font-medium">{course?.title}</h1>
            <p className="text-2xl font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, accusamus labore quo natus, ipsa sint at perspiciatis
              tempore impedit, assumenda nisi. Dolor, harum atque facere eaque
              maiores esse
            </p>
            <div>
              <CourseLevel
                level={course.level.toString()}
                additionalStyle="text-black"
              />
            </div>
            <div className="flex justify-between pr-10">
              <div className="flex items-center gap-5">
                <img
                  src="https://i.pinimg.com/736x/f1/50/2c/f1502cf311fc2652aba302f0513a2490.jpg"
                  className="size-10 rounded-full object-cover"
                  alt="educator's avatar"
                />
                <p>Educator name</p>
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia,
            quod placeat. Officia libero voluptate animi ratione, nesciunt
            repellendus delectus facere cupiditate deleniti magni ab, eos nobis
            ipsa, eveniet sint atque! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Voluptate fugit quibusdam ab maxime magnam velit
            quidem ut et, labore expedita quo, rem voluptatibus? Aliquam minima
            incidunt porro quaerat dolores ex! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Dolore officia magni ducimus esse
            deleniti ipsam. Quaerat nisi, mollitia quia ab quo molestias rem
            modi recusandae in delectus! Totam, temporibus incidunt?
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
        <AccordionContent key={lesson.id}>{lesson.id}</AccordionContent>
      ))}
    </AccordionItem>
  );
}

async function chapteraciton(courseId: string) {
  "use server";

  const id = generateId(7);
  await db
    .insert(chapterTable)
    .values({ courseId: courseId, name: "first chapter", id });
  const path = `/courses/${courseId}`;
  revalidatePath(path);
}

async function lessonAction() {
  "use server";

  const id = generateId(7);
  await db
    .insert(lessonTable)
    .values({ chapterId: "u6eprc7", title: "first lesson", id });
}
