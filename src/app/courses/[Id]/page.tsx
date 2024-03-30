import CourseLevel from "@/components/courselevel";
import MainNavBar from "@/components/mainNavbar";
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";

export default async function CoursePage({
  params,
}: {
  params: { Id: string };
}) {
  const courses = await db.select().from(courseTable);
  const course = courses[0];

  return (
    <div className="bg-blue-800">
      <MainNavBar />

      <div className="flex items-center gap-20 px-24 py-16">
        <img
          src="https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png"
          alt="Course image"
          className="size-96 rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-4xl font-medium">Course title</h1>
          <p className="text-2xl font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            accusamus labore quo natus, ipsa sint at perspiciatis tempore
            impedit, assumenda nisi. Dolor, harum atque facere eaque maiores
            esse
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
  );
}
