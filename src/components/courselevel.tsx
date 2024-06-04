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
    level === "advanced"
      ? "text-red-600"
      : level === "beginner"
        ? "text-green-600"
        : "text-orange-500";
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1.5 rounded-full bg-white px-3 ",
        className,
      )}
    >
      {/* <Image
        src="/SVGs/Level_icon.svg"
        className="h-3 w-3"
        width={8}
        height={8}
        alt="level icon"
      /> */}

      <BarChart className={`${levelColor} h-5 w-5`} />

      {/* <SignalHigh  /> */}
      <p className="font-semibold ">{level} </p>
    </div>
  );
}
export default CourseLevel;
