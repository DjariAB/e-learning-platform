import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns, type Student } from "./components/columns";
import { DataTable } from "./components/data-table";
import Link from "next/link";
import CourseRow from "./components/courseRow";
import StatContainer from "./components/statConainter";
import CircularProgress from "@/components/ui/circularProgressBar";
import { AddCourseDialog } from "@/components/addCourseDialog";
// import CircularProgress from "@/components/ui/circularProgressBar";

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      student: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/f/ff/Timoth%C3%A9e_Chalamet_as_Paul_Atreides_%28Dune_2021%29.jpg",
        studentName: "paul atreides",
      },
      course: "Freemen Survival Skills",
      progress: "test",
      rank: "# 1",
      score: 22,
    },
    {
      id: "728ed52f",
      student: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Zendaya_as_Chani_%28Dune_2021%29.jpg/220px-Zendaya_as_Chani_%28Dune_2021%29.jpg",
        studentName: "Chani",
      },
      course: "Freemen Survival Skills",
      progress: "test",
      rank: "# 2",
      score: 22,
    },
    {
      id: "728ed52f",
      student: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/c/c2/Jason_Momoa_Duncan_Idaho.png",
        studentName: "Duncan Idaho",
      },
      course: "Duncan Idaho",
      progress: "test",
      rank: "# 3",
      score: 22,
    },
    {
      id: "728ed52f",
      student: {
        imgUrl:
          "https://i.kym-cdn.com/entries/icons/facebook/000/048/705/stilgar_dune.jpg",
        studentName: "Stilgar",
      },
      course: "Freemen Survival Skills",
      progress: "test",
      rank: "# 4",
      score: 22,
    },
    {
      id: "728ed52f",
      student: {
        imgUrl:
          "https://imgix.bustle.com/uploads/image/2023/6/8/f70f1e10-8726-4643-b80f-a826c0bb60c4-dune-part-two-lady-jessica.jpg",
        studentName: "Lady jessica",
      },
      course: "Freemen Survival Skills",
      progress: "test",
      rank: "# 5",
      score: 22,
    },
    {
      id: "728ed52f",
      student: {
        imgUrl: "https://i.redd.it/16gvesb43bj71.jpg",
        studentName: "Gurney Halleck",
      },
      course: "Freemen Survival Skills",
      progress: "test",
      rank: "# 6",
      score: 22,
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="grid flex-1 items-start gap-4 p-4  sm:px-6 sm:py-0 md:gap-6 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="pb-4 sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <Link href={""} className="flex h-10 items-center gap-3 ">
                  <p className="text-xl leading-7">My courses</p>{" "}
                  <ChevronRight className="size-4" />
                </Link>{" "}
                <AddCourseDialog />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 p-0">
              <CourseRow
                courseImage="https://legendary-digital-network-assets.s3.amazonaws.com/wp-content/uploads/2024/02/29104928/Dune-Part-Two-Paul-Atreides.jpg"
                courseRating="4.8"
                courseTag="Fighting"
                courseTitle="Duke Fighting Fundelmentals"
              />
              <CourseRow
                courseImage="https://static.qobuz.com/images/covers/9a/8k/mrvlalpv78k9a_600.jpg"
                courseRating="4.3"
                courseTag="Survival"
                courseTitle="Fremen Survival Skills"
              />
              <CourseRow
                courseImage="https://cdn.vox-cdn.com/thumbor/PYx2QFLAW6XH4IBidJELZVyY880=/0x0:2880x1181/1200x800/filters:focal(1363x174:1823x634)/cdn.vox-cdn.com/uploads/chorus_image/image/70029000/Screen_Shot_2021_10_21_at_7.25.53_PM.0.png"
                courseRating="4.6"
                courseTag="Politics"
                courseTitle="Bene Gesserit Rituals"
              />
            </CardContent>
          </Card>
          <Card className="h-72 sm:col-span-2" x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardTitle>
                <Link href={""} className="flex h-10 items-center gap-3 ">
                  <p className="text-xl leading-7">My Stats</p>{" "}
                  <ChevronRight className="size-4" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center space-y-1 py-3">
                <h3>Your rank</h3>
                <StatContainer statTitle="Overall Course Rating" value="2#" />
              </div>
              <div className=" flex justify-center gap-6 py-2 pt-4">
                <StatContainer statTitle="Created Courses" value="4" />
                <StatContainer statTitle="Enrolled Students" value="3500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card
          x-chunk="dashboard-05-chunk-3"
          className="overflow-x-scroll md:overflow-hidden"
        >
          <CardHeader className="">
            <CardTitle>Your Students LeaderBoard</CardTitle>
            {/* <CardDescription>
                      Recent orders from your store.
                    </CardDescription> */}
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardTitle>
              <Link href={""} className="flex h-10 items-center gap-3 ">
                <p className="text-xl leading-7">Most Recent Course</p>{" "}
                <ChevronRight className="size-4" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-lg">
              <Link href="">
                <img
                  src="/images/dune2-Poster.jpg"
                  className="h-52 w-full overflow-hidden  object-cover transition-transform duration-300 ease-in hover:scale-110"
                  alt=""
                />
              </Link>
            </div>
            <h2 className="pt-2 text-xl">
              Universal War From Nothing to Emperor
            </h2>

            <div className="flex flex-col items-center justify-center gap-4 space-y-1 py-3">
              <StatContainer
                statTitle="Overall Rating (3M reviews)"
                value="4.2"
              />
              <StatContainer statTitle="Enrolled Students" value="30B" />
              <StatContainer statTitle="Students Points" value="1.43T" />
              <CircularProgress
                percentage={65}
                statTitle="Overall Completion"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
