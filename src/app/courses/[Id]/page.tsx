import CourseLevel from "@/components/courselevel";
import MainNavBar from "@/components/mainNavbar";
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";

export default async function CoursePage() {
  const courses = await db.select().from(courseTable);
  const course = courses[0];

  return (
    <>
      <div className="h-[65vh] bg-[url('/SVGs/course-hero-background.jpg')] bg-cover bg-center text-white">
        <MainNavBar />
        <div className="flex items-center gap-16 px-20">
          <div
          // className={`bg-[url('${course?.imageUrl}')] size-96 rounded-2xl bg-cover`}
          ></div>
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png"
            alt="Course image "
            className="aspect-square size-[50%] overflow-hidden rounded-2xl"
          />
          <div>
            <h1>Course title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, accusamus labore quo natus, ipsa sint at perspiciatis
              tempore impedit, assumenda nisi. Dolor, harum atque facere eaque
              maiores esse rem vero!
            </p>
            <div>
              <CourseLevel
                level={course?.level.toString()}
                additionalStyle="text-black"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
