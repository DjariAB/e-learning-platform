import { cn } from "@/lib/utils";
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

function CourseCategory({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex w-full items-center gap-1.5 text-white  ", className)}
    >
      {category === "Desktop development" ? (
        <ComputerDesktopIcon className=" size-5" />
      ) : category === "Mobile development" ? (
        <DevicePhoneMobileIcon className=" size-5" />
      ) : (
        <GlobeAltIcon className=" size-5" />
      )}
      <p className=" w-full break-keep">{category} </p>
    </div>
  );
}
export default CourseCategory;
