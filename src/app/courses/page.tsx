import { CourseCard, EnrolledCourseCard } from "@/components/courseCard";
import HeroSec from "@/components/heroSection";
import MainNavBar from "@/components/mainNavbar";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import {
  courseTable,
  enrolledCoursesTable,
  lessonTable,
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
    .leftJoin(userTable, eq(userTable.id, courseTable.educatorId))
    .innerJoin(
      lessonTable,
      eq(lessonTable.id, enrolledCoursesTable.currentLessonId),
    );

  const courses = await db
    .select()
    .from(courseTable)
    .leftJoin(userTable, eq(courseTable.educatorId, userTable.id));

  return (
    <div className="flex flex-col gap-4 px-3 pb-6 ">
      <MainNavBar userName={user.userName} />
      <div className="px-4">
        <HeroSec />
      </div>
      <h3 className="py-4 text-3xl font-medium ">Enrolled courses</h3>

      <div className="flex  gap-3 overflow-x-auto ">
        {enrolledcourses.length ? (
          enrolledcourses.map((enrolled) => (
            <EnrolledCourseCard
              educatorName={enrolled.user ? enrolled.user.userName : "unknown"}
              title={enrolled.courses.title}
              imageUrl={enrolled.courses.imageUrl}
              category={enrolled.courses.category}
              level={enrolled.courses.level}
              progress={Math.floor(
                ((enrolled.lesson.index - 1) / enrolled.courses.lessonsNum) *
                  100,
              )}
              courseId={enrolled.courses.id}
              key={enrolled.courses.id}
            />
          ))
        ) : (
          <p>no enrolled courses found</p>
        )}
      </div>
      <h3 className="py-4 text-3xl font-medium ">New courses</h3>

      <div className="grid grid-cols-4 gap-y-4 overflow-x-auto px-5">
        {courses.map((course) => (
          <CourseCard
            educatorName={course.user ? course.user.userName : "unknown "}
            title={course.courses.title}
            imageUrl={course.courses.imageUrl}
            category={course.courses.category}
            level={course.courses.level}
            courseId={course.courses.id}
            key={course.courses.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
