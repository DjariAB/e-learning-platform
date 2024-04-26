import { logoutAction } from "@/actions/auth";
import { CourseCard, EnrolledCourseCard } from "@/components/courseCard";
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
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Courses = async () => {
  const { user } = await validateRequest();

  if (!user) redirect("/login");
  const enrolledcourses = await db
    .select()
    .from(enrolledCoursesTable)
    .where(eq(enrolledCoursesTable.userId, user.id))
    .rightJoin(courseTable, eq(enrolledCoursesTable.courseId, courseTable.id))
    .leftJoin(userTable, eq(enrolledCoursesTable.userId, userTable.id));

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
              <EnrolledCourseCard
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
        <form action={deleteCourse}>
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

async function AddCourse() {
  "use server";
  const { user } = await validateRequest();
  if (user) {
    const id = generateId(7);
    await db.insert(courseTable).values({
      id,
      level: "intermediate",
      title: "nextjs course",
      educatorId: user.id,
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:1358/0*Wkrz5TuOxQs9tXri.png",
    });
    revalidatePath("/courses");
  }
}
async function deleteCourse() {
  "use server";
  const { user } = await validateRequest();
  if (user) {
    try {
      await db.delete(courseTable).where(eq(courseTable.educatorId, user.id));
      revalidatePath("/courses");
    } catch (error) {
      console.log("there is an erorr in here ", error);
    }
  }
}
