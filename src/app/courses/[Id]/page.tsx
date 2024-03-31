import CourseLevel from "@/components/courselevel";
import MainNavBar from "@/components/mainNavbar";
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";
import styles from "@/styles/main.module.css";

export default async function CoursePage() {
  const courses = await db.select().from(courseTable);
  const course = courses[0];

  return (
    <>
      <div
        className={`bg-backgroundImage-course-hero bg-cover ${styles.background}`}
      >
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
        <div className="w-3/4 px-24 py-10 text-4xl">
          <h1 className="font-medium">Description</h1>
          <p className="text p-8 font-light">
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
        </div>
        <div>Scroll tracker</div>
      </div>
    </>
  );
}
