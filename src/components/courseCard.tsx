/* eslint-disable @next/next/no-img-element */
import { Progress } from "@/components/ui/progress";
import { Anek_Latin } from "next/font/google";
import CourseLevel from "./courselevel";
import Link from "next/link";

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
}: {
  title: string;
  educatorName: string;
  level: string;
  imageUrl: string;
  courseId: string;
}) => {
  return (
    <Link href={`/courses/${courseId}`}>
      <div
        className={`${anekLatin.className}  flex h-[385px] min-w-[350px] max-w-[350px]  flex-col gap-3 rounded-[35px] bg-white p-4 transition duration-150 ease-in  hover:-translate-y-2 hover:translate-x-2 hover:drop-shadow-card`}
      >
        <div className="relative h-[260px] w-[100%]">
          <img
            src={imageUrl}
            alt="Course image"
            className="size-auto h-full  rounded-[20px] object-cover"
          />
          <CourseLevel
            level={level}
            className="absolute bottom-4 left-3"
          />
        </div>
        <div className="font-m flex flex-col gap-2 font-medium">
          <p className="text-2xl/6"> {title} </p>

          <div className="flex justify-between">
            <p className="font-normal">{educatorName}</p>
            {/* <p>20%</p> */}
          </div>
          {/* <Progress value={20} /> */}
        </div>
      </div>
    </Link>
  );
};

export const EnrolledCourseCard = ({
  title,
  educatorName,
  level,
  imageUrl,
  progress,
  courseId,
}: {
  title: string;
  educatorName: string;
  level: string;
  imageUrl: string;
  progress: number;
  courseId: string;
}) => {
  return (
    <Link href={`/courses/${courseId}`}>
      <div
        className={`${anekLatin.className}  flex h-[385px] min-w-[350px] max-w-[350px]  flex-col gap-3 rounded-[35px] bg-white p-4 transition duration-150 ease-in  hover:-translate-y-2 hover:translate-x-2 hover:drop-shadow-card`}
      >
        <div className="relative h-[260px] w-[100%]">
          <img
            src={imageUrl}
            alt="Course image"
            className="size-auto h-full  rounded-[20px] object-cover"
          />
          <CourseLevel
            level={level}
            className="absolute bottom-4 left-3"
          />
        </div>
        <div className="font-m flex flex-col gap-2 font-medium">
          <p className="text-2xl/6"> {title} </p>

          <div className="flex justify-between">
            <p className="font-normal">{educatorName}</p>
            <p> {progress} %</p>
          </div>
          <Progress value={progress} />
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
          <CourseLevel
            level={level}
            className="absolute bottom-4 left-3"
          />
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