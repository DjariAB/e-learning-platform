/* eslint-disable @next/next/no-img-element */
"use client";
import { Progress } from "@/components/ui/progress";
import { Anek_Latin } from "next/font/google";
import CourseLevel from "./courselevel";
import Link from "next/link";
import { useState } from "react";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-anek-latin",
});

export const CourseCard = ({
  title,
  educatorName,
  level,
  imageUrl,
  courseId,
  progress,
}: {
  title: string;
  educatorName: string;
  level: string;
  imageUrl: string;
  courseId: string;
  progress?: number;
}) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <Link href={`/courses/${courseId}`}>
      <div
        onMouseOver={() => setisHovered(true)}
        onMouseOut={() => setisHovered(false)}
        className={`${anekLatin.className} flex flex-col overflow-hidden rounded-2xl border bg-white transition duration-150 ease-in hover:border-black lg:h-[310px] lg:w-[290px]`}
      >
        <div className="relative h-[250px] w-[100%] overflow-hidden">
          <img
            src={imageUrl}
            alt="Course image"
            className={`ease absolute z-0 size-auto h-full object-cover transition duration-300 ${isHovered ? "scale-110" : ""}`}
          />
          {isHovered ? (
            <>
              <div className="absolute z-30 h-full w-full bg-black opacity-40 "></div>
              <div className="absolute inset-0 z-40 flex items-center justify-center text-2xl font-medium text-white opacity-100">
                <p>Continue</p>
              </div>
            </>
          ) : null}
        </div>
        <div className="font-m flex flex-col gap-1.5 px-4 pb-4 pt-2 font-medium">
          <p className="text-xl font-medium leading-5"> {title} </p>

          <div className="flex justify-between">
            <p className="font-normal text-gray-600">{educatorName}</p>
            <p className="font-medium"> {progress} %</p>
          </div>
          {progress ? <Progress value={progress} className="h-2.5" /> : null}
        </div>
      </div>
    </Link>
  );
};


export const MentorCourseCard = ({
  title,
  educatorName,
  level,
  imageUrl,
  courseId,
}: {
  title: string;
  educatorName: string;
  level: string;
  imageUrl: string;
  courseId: string;
}) => {
  return (
    <Link href={`/dashboard/mycourses/${courseId}`}>
      <div
        className={`${anekLatin.className}  flex h-[385px] min-w-[350px] max-w-[350px]  flex-col gap-3 rounded-[35px] bg-white p-4 transition duration-150 ease-in  hover:-translate-y-2 hover:translate-x-2 hover:drop-shadow-card`}
      >
        <div className="relative h-[260px] w-[100%]">
          <img
            src={imageUrl}
            alt="Course image"
            className="size-auto h-full  rounded-[20px] object-cover"
          />
          <CourseLevel level={level} className="absolute bottom-4 left-3" />
        </div>
        <div className="font-m flex flex-col gap-2 font-medium">
          <p className="text-2xl/6"> {title} </p>

          <div className="flex justify-between">
            <p className="font-normal">{educatorName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
