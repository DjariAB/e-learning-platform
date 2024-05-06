import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StatCard from "../dashboard/components/statCard";
import styles from "@/styles/main.module.css";
import { EnrolledCourseCard } from "@/components/courseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ContinueComp from "./components/continueComp";
import { DataTable } from "../dashboard/components/data-table";
import { columns } from "../dashboard/components/columns";
import { getData } from "../dashboard/page";
import BarChartStat from "../dashboard/components/barChart";

export default async function Page() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pl-4 text-3xl font-medium">Learning Center</h2>
      <div className={`grid  grid-cols-5 grid-rows-1 gap-4 `}>
        <div
          className={`col-span-2 space-y-2 p-6 ${styles.gradientBg} rounded-xl bg-cover text-white`}
        >
          <h1 className="text-3xl font-bold">Welcome back, Messi</h1>
          <p className="text-3xl font-thin">
            Welcome to your Learning Center! Let&apos;s <br /> learn together
          </p>
        </div>
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
        <StatCard
          className="col-span-1"
          title="Completed courses"
          stat="2"
          description="Out of 5 enrolled courses"
        />
      </div>
      <h3 className="text-3xl font-medium ">Enrolled courses</h3>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 lg:h-[310px]">
        <Carousel className="">
          <CarouselContent className="gap-1 pl-2">
            <CarouselItem className="basis-auto pl-3">
              <EnrolledCourseCard
                progress={75}
                courseId=""
                educatorName="REACT dev"
                imageUrl="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
                level="Beginner"
                title="REACT course : complete mastery"
              />
            </CarouselItem>
            <CarouselItem className="basis-auto pl-3">
              <EnrolledCourseCard
                progress={75}
                courseId=""
                educatorName="REACT dev"
                imageUrl="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
                level="Beginner"
                title="REACT course : complete mastery"
              />
            </CarouselItem>
            <CarouselItem className="basis-auto pl-3">
              <EnrolledCourseCard
                progress={75}
                courseId=""
                educatorName="REACT dev"
                imageUrl="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
                level="Beginner"
                title="REACT course : complete mastery"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Card className="space-y-2 rounded-xl py-3">
          <CardTitle className="">Continue your journey</CardTitle>
          <CardContent>
            <ScrollArea className="h-60 w-full ">
              <div className="space-y-4">
                <ContinueComp />
                <ContinueComp />
                <ContinueComp />
              </div>

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-3xl font-medium ">Other</h3>

      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-1 overflow-x-scroll md:overflow-hidden">
          <CardHeader className="">
            <CardTitle>Students LeaderBoard</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
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
