import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type lessonTable } from "@/server/db/schema";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { type InferSelectModel } from "drizzle-orm";
import Link from "next/link";
type lessonType = InferSelectModel<typeof lessonTable>;
export default function ContinueComp({
  lesson,
  chapter,
  course,
  courseId,
  progress,
}: {
  lesson: lessonType;
  chapter: string;
  course: string;
  courseId : string;
  progress: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border">
      <div className="flex w-full items-center justify-between p-3 pb-0">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{lesson.title}</h3>
          <p className="text-sm font-light text-gray-500">{chapter} </p>
        </div>
        <Link href={`/courses/${courseId}/${lesson.id}`}><Button className="flex gap-2 space-x-2 rounded-sm bg-mainblue px-4 py-4 font-normal hover:bg-blue-900 ">
          Go to{" "}
          <ArrowTopRightOnSquareIcon className="size-4" strokeWidth={"2px"} />
        </Button></Link>
        
      </div>
      <hr className="w-full" />
      <div className="flex w-full items-center justify-between p-3 pt-0">
        <div className="flex w-1/2 flex-col-reverse">
          <h3 className="text-lg font-medium">{course}</h3>
          <p className="text-sm font-light text-gray-500">Course</p>
        </div>
        <div className="flex w-1/2 flex-col">
          <h3 className="w-fit self-end pr-2 text-left text-lg font-semibold">
            {progress}%
          </h3>
          <Progress value={progress} />
        </div>
      </div>
    </div>
  );
}
