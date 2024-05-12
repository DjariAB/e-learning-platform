import { MentorCourseCard } from "@/components/courseCard";
import { Button } from "@/components/ui/button";
import { Seed } from "@/lib/seed";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { courseTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

async function MentorCoursesPage({ params }: { params: { courseId: string } }) {
  const { user } = await validateRequest();

  if (!user) redirect("/login/mentor");

  const courses = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.educatorId, user.id));
  return (
    <>
      <div className="px-3 pt-16">
        <div className="pt-4">
          <h1>enrolled</h1>
        </div>
        <h1>new courses</h1>
        <div className="flex  gap-3 overflow-x-auto">
          {courses.map((course) => (
            <MentorCourseCard
              educatorName={course.educatorId ? course.educatorId : "unknown "}
              title={course.title}
              imageUrl={course.imageUrl}
              level={course.level}
              courseId={course.id}
              key={course.id}
            />
          ))}
        </div>

        <form action={Seed}>
          <Button className="bg-[#072E6A]" type="submit">
            {" "}
            add courses
          </Button>
        </form>
      </div>
    </>
  );
}

export default MentorCoursesPage;
