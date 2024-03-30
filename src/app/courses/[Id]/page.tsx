import CourseLevel from "@/components/courselevel";
import MainNavBar from "@/components/mainNavbar"
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";

export default async function CoursePage({ params }: { params: { Id: string } }) {
  const courses = await db.select().from(courseTable);
  const course = courses[0];

  return (
    <div >
      <MainNavBar />
      
      <div>
        <img src="" alt="" />
        <div><h1>Course title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, accusamus labore quo natus, ipsa sint at perspiciatis
              tempore impedit, assumenda nisi. Dolor, harum atque facere eaque
              maiores esse rem vero!
            </p>
            <div>
              <CourseLevel
                level={course!.level.toString()}
                additionalStyle="text-black"
              /></div>
      </div>
    </div>
    </div>
  );
}
