import { logoutAction } from "@/actions/auth";
import CourseCard from "@/components/courseCard";
import HeroSec from "@/components/heroSection";
import MainNavBar from "@/components/mainNavbar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const Courses = async () => {
  const courses = await db.select().from(courseTable);
  return (
    <>
      <MainNavBar />
      <HeroSec />

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
          add your first course
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
      level: "beginner",
      title: "first course",
      educatorId: user.id,
      imageUrl: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
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
