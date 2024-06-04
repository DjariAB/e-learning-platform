import { cn } from "@/lib/utils";
import { BarChart } from "lucide-react";
// import Image from "next/image";
// import {} from "@heroicons/react";

function CourseLevel({
  level,
  className,
}: {
  level: string;
  className: string;
}) {
  const levelColor =
    level === "Advanced"
      ? "text-red-600"
      : level === "Beginner"
        ? "text-green-600"
        : "text-orange-500";
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 ",
        className,
      )}
    >
      <BarChart className={`${levelColor} h-5 w-5`} />

      {/* <SignalHigh  /> */}
      <p className="font-normal ">{level} </p>
    </div>
  );
}
export default CourseLevel;
