import { logoutAction } from "@/actions/auth";
import { DeleteCourse } from "@/actions/helpers/courseHelpers";
import { CourseCard } from "@/components/courseCard";
import HeroSec from "@/components/heroSection";
import { Button } from "@/components/ui/button";
import { Seed } from "@/lib/seed";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import {
  courseTable,
  enrolledCoursesTable,
  userTable,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Courses = async () => {
  const { user } = await validateRequest();

  if (!user) redirect("/login");
  const enrolledcourses = await db
    .select()
    .from(enrolledCoursesTable)
    .where(eq(enrolledCoursesTable.userId, user.id))
    .rightJoin(courseTable, eq(enrolledCoursesTable.courseId, courseTable.id))
    .leftJoin(userTable, eq(userTable.id, courseTable.educatorId));

  const courses = await db
    .select()
    .from(courseTable)
    .leftJoin(userTable, eq(courseTable.educatorId, userTable.id));

  return (
    <div className="px-3 pt-16">
      <HeroSec />

      <div className="pt-4">
        <h1>enrolled</h1>
        <div className="flex  gap-3 overflow-x-auto ">
          {enrolledcourses.length ? (
            enrolledcourses.map((enrolled) => (
              <CourseCard
                educatorName={
                  enrolled.user ? enrolled.user.userName : "unknown"
                }
                title={enrolled.courses.title}
                imageUrl={enrolled.courses.imageUrl}
                level={enrolled.courses.level}
                progress={enrolled.enrolled_Courses?.progress ?? 0}
                courseId={enrolled.courses.id}
                key={enrolled.courses.id}
              />
            ))
          ) : (
            <p>no enrolled courses found</p>
          )}
        </div>
      </div>
      <h1>new courses</h1>
      <div className="flex  gap-3 overflow-x-auto">
        {courses.map((course) => (
          <CourseCard
            educatorName={course.user ? course.user.userName : "unknown "}
            title={course.courses.title}
            imageUrl={course.courses.imageUrl}
            level={course.courses.level}
            courseId={course.courses.id}
            key={course.courses.id}
          />
        ))}
      </div>
      <div className=" flex flex-col gap-3">
        <form action={Seed}>
          <Button className="bg-[#072E6A]" type="submit">
            {" "}
            add courses
          </Button>
        </form>
        <form action={DeleteCourse}>
          <Button variant="destructive" type="submit">
            {" "}
            remove all courses
          </Button>
        </form>
        <form action={logoutAction}>
          <Button type="submit">logout</Button>
        </form>
      </div>
    </div>
  );
};

export default Courses;
