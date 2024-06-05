import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StatCard from "../dashboard/components/statCard";
import styles from "@/styles/main.module.css";
import { CourseCard, EnrolledCourseCard } from "@/components/courseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ContinueComp from "./components/continueComp";
import { DataTable } from "../dashboard/components/data-table";
import { columns } from "../dashboard/components/columns";
// import { getData } from "../dashboard/page";
import BarChartStat from "../dashboard/components/barChart";
import { db } from "@/server/db";
import {
  chapterTable,
  courseTable,
  enrolledCoursesTable,
  lessonTable,
  userTable,
} from "@/server/db/schema";
import { validateRequest } from "@/server/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  // placeholder data
  // const data = await getData();

  const totalEnrolledCourses = await db
    .select()
    .from(enrolledCoursesTable)
    .innerJoin(courseTable, eq(enrolledCoursesTable.courseId, courseTable.id))
    .leftJoin(userTable, eq(courseTable.educatorId, userTable.id))
    .innerJoin(
      lessonTable,
      eq(enrolledCoursesTable.currentLessonId, lessonTable.id),
    )
    .innerJoin(chapterTable, eq(lessonTable.chapterId, chapterTable.id))
    .where(eq(enrolledCoursesTable.userId, user.id));

  const completedCourses = totalEnrolledCourses.filter(
    (c) => c.lesson.index == c.courses?.lessonsNum,
  );

  const averageProgress = totalEnrolledCourses.reduce(
    (sum, currentValue) => sum + (currentValue.enrolled_Courses.progress ?? 0),
    0,
  );

  const enrollementData = await db.select().from(enrolledCoursesTable);

  const enrolledStudents = await db
    .selectDistinct({
      id: userTable.id,
      studentName: userTable.userName,
      imageUrl: userTable.imageUrl,
    })
    .from(enrolledCoursesTable)
    .innerJoin(userTable, eq(userTable.id, enrolledCoursesTable.userId));

  const studentScore = enrollementData
    .filter((e) => e.userId === user.id)
    .reduce((sum, currentValue) => sum + currentValue.score, 0);

  const unRankedLeaderBoardData = enrolledStudents.map((student) => {
    const score = enrollementData
      .filter((e) => e.userId === student.id)
      .reduce((sum, currentValue) => sum + currentValue.score, 0);
    return {
      id: student.id,
      student: {
        imgUrl: student.imageUrl,
        studentName: student.studentName,
      },
      course: "Freemen Survival Skills",
      progress: "test",
      score: score,
    };
  });
  const LeaderBoardData = unRankedLeaderBoardData
    .sort((a, b) => a.score - b.score)
    .map((e, index) => ({ ...e, rank: `${index + 1}#` }));
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pl-4 text-3xl font-medium">Learning Center</h2>
      <div className={`grid  grid-cols-5 grid-rows-1 gap-4 `}>
        <div
          className={`col-span-2 space-y-2 p-6 ${styles.gradientBg} rounded-xl bg-cover text-white`}
        >
          <h1 className="text-3xl font-bold">Welcome back, {user.userName}</h1>
          <p className="text-3xl font-thin">
            Welcome to your Learning Center! Let&apos;s <br /> learn together
          </p>
        </div>
        <StatCard
          className="col-span-1"
          title="Completed Courses"
          stat={completedCourses ? completedCourses.length : 0}
          description={`Out of ${totalEnrolledCourses.length} enrolled courses`}
        />
        <StatCard
          className="col-span-1"
          title="Total Score"
          stat={studentScore + " pts"}
          description="All courses points combined"
        />
        <StatCard
          className="col-span-1"
          title="Average Progress"
          stat={averageProgress + "%"}
          description="All courses included"
        />
      </div>
      <h3 className="text-3xl font-medium ">Enrolled courses</h3>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 lg:h-[310px]">
        <Carousel className="">
          <CarouselContent className="gap-1 pl-2">
            {totalEnrolledCourses.map((course) => (
              <CarouselItem
                key={course.enrolled_Courses.courseId}
                className="basis-auto pl-3"
              >
                <EnrolledCourseCard
                  progress={Math.floor(
                    ((course.lesson.index - 1) / course.courses.lessonsNum) *
                      100,
                  )}
                  category={course.courses.category}
                  courseId={course.enrolled_Courses.courseId}
                  educatorName={course.user ? course.user.userName : "unknown"}
                  imageUrl={course.courses?.imageUrl ?? ""}
                  level={course.courses?.level}
                  title={course.courses?.title ?? ""}
                />
              </CarouselItem>
            )) ?? <p>No Enrolled Courses Yet!</p>}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Card className="space-y-2 rounded-xl py-3">
          <CardTitle className="">Continue your journey</CardTitle>
          <CardContent>
            <ScrollArea className="h-60 w-full ">
              <div className="space-y-4">
                {totalEnrolledCourses.map((c) => (
                  <ContinueComp
                    key={c.lesson.id}
                    lesson={c.lesson}
                    course={c.courses?.title ?? ""}
                    courseId={c.courses?.id ?? ""}
                    chapter={c.chapter.name}
                    progress={c.enrolled_Courses.progress ?? 1}
                  />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-3xl font-medium ">Other</h3>

      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-1 overflow-x-scroll md:overflow-hidden">
          <CardHeader>
            <CardTitle>Students LeaderBoard</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={LeaderBoardData} />
          </CardContent>
        </Card>
        <BarChartStat
          title="Students Per Course"
          stat="35 K"
          description="The bar chart illustrates the distribution of your students across your courses"
          className="col-span-1"
        />
      </div>
    </div>
  );
}
