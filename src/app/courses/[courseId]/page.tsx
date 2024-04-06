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

        <div className="flex items-center gap-16 px-32 py-12 ">
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png"
            alt="Course image"
            className="size-[280px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-4 text-white">
            <h1 className="text-3xl font-medium">Introduction to REACT JS</h1>
            <p className="text-2xl font-light">
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
        <div className="w-3/4 px-24 py-6 text-2xl">
          <h1 className="text-3xl font-medium">Description</h1>
          <p className="text p-4 font-light">
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
