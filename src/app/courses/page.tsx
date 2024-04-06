import { logoutAction } from "@/actions/auth";
import CourseCard from "@/components/courseCard";
import HeroSec from "@/components/heroSection";
import MainNavBar from "@/components/mainNavbar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { courseTable, enrolledCoursesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

const Courses = async () => {
  const { user } = await validateRequest();

  if (!user) redirect("/login");
  const enrolledcourses = await db
    .select()
    .from(enrolledCoursesTable)
    .where(eq(enrolledCoursesTable.userId, user.id))
    .rightJoin(courseTable, eq(enrolledCoursesTable.courseId, courseTable.id));

  const courses = await db.select().from(courseTable);

  return (
    <>
      <MainNavBar />
      <HeroSec />

      <div>
        <h1>enrolled</h1>
        <div className="flex  gap-3 overflow-x-scroll">
          {enrolledcourses.length ? (
            enrolledcourses.map((enrolled) => (
              <Link
                href={`/courses/${enrolled.courses.id}`}
                key={enrolled.courses.id}
              >
                <CourseCard
                  educatorName={enrolled.courses.educatorId}
                  title={enrolled.courses.title}
                  imageUrl={enrolled.courses.imageUrl}
                  level={enrolled.courses.level}
                />
              </Link>
            ))
          ) : (
            <p>no enrolled courses found</p>
          )}
        </div>
      </div>
      <h1>new courses</h1>
      <div className="flex  gap-3 overflow-x-scroll">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <CourseCard
              educatorName={course.educatorId}
              title={course.title}
              imageUrl={course.imageUrl}
              level={course.level}
            />
          </Link>
        ))}
      </div>

      <form action={AddCourse}>
        <Button className="bg-[#072E6A]" type="submit">
          {" "}
          add a course
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
    </>
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
    await db.delete(courseTable).where(eq(courseTable.educatorId, user.id));
    revalidatePath("/courses");
  }
}
