/* eslint-disable @next/next/no-img-element */
import CourseLevel from "@/components/courselevel";
import MainNavBar from "@/components/mainNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import styles from "@/styles/main.module.css";
import { eq } from "drizzle-orm";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courses = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.id, params.courseId));
  const course = courses[0];

  const chapters = await db
    .select()
    .from(chapterTable)
    .where(eq(chapterTable.courseId, params.courseId));

  return (
    <>
      <div className={` bg-cover ${styles.background}`}>
        <MainNavBar />

        <div className="flex items-center gap-20 px-32 py-16 ">
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png"
            alt="Course image"
            className="size-[380px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-6 text-white">
            <h1 className="text-5xl font-medium">Introduction to REACT JS</h1>
            <p className="text-3xl font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, accusamus labore quo natus, ipsa sint at perspiciatis
              tempore impedit, assumenda nisi. Dolor, harum atque facere eaque
              maiores esse
            </p>
            <div>
              <CourseLevel
                level={course!.level.toString()}
                additionalStyle="text-black"
              />
            </div>
            <div className="flex items-center gap-5">
              <img
                src="https://i.pinimg.com/736x/f1/50/2c/f1502cf311fc2652aba302f0513a2490.jpg"
                className="size-10 rounded-full object-cover"
                alt="educator's avatar"
              />
              <p>Educator name</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4 px-24 pb-6 pt-8 text-4xl">
          <h1 className="font-bold">Description</h1>
          <p className="p-8 text-2xl font-extralight ">
            Our &quot;React for Beginners&quot; course is your gateway to
            mastering the fundamentals of React development. This course is
            designed for absolute beginners, taking you through essential
            concepts like components, state management, and routing, all the way
            to building real-world applications. With hands-on projects and
            practical exercises, you&apos;ll gain the skills and confidence to
            start your journey as a React developer. Join us and unlock the
            power of React!
          </p>

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
        <div>Scroll tracker</div>
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
        <AccordionContent key={lesson.id}>{lesson.title}</AccordionContent>
      ))}
    </AccordionItem>
  );
}
