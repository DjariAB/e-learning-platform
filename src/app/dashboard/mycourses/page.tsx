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
    .where(eq(courseTable.educatorId, user.id))
    .orderBy(courseTable.createdAt);

  const mostRecentCourse = courses[0];
  return (
    <>
      <div className="px-5">
        <>
          <h1 className="py-5 text-4xl font-bold">Your most recent course</h1>
          {mostRecentCourse ? (
            <MentorCourseCard
              educatorName={
                mostRecentCourse.educatorId
                  ? mostRecentCourse.educatorId
                  : "unknown "
              }
              title={mostRecentCourse.title}
              imageUrl={mostRecentCourse.imageUrl}
              level={mostRecentCourse.level}
              courseId={mostRecentCourse.id}
              key={mostRecentCourse.id}
            />
          ) : null}
        </>
        <h1 className="py-5 text-4xl font-bold">All of your Courses</h1>
        <div className="grid grid-cols-3 gap-y-5 px-10">
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
