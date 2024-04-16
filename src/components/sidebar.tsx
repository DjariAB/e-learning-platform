import {
  AcademicCapIcon,
  PlusCircleIcon,
  PresentationChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col bg-background px-2 pt-2 sm:flex">
      <nav className="flex flex-col items-stretch gap-4 px-2 sm:py-4">
        <Link className="self-center" href="/">
          <img
            className="w-40 "
            src="/SVGs/logo text.svg"
            alt="Platform logo"
          />
        </Link>
        <Link href="">
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-3 text-xl font-normal transition duration-300 ease-in hover:bg-gray-200 ">
            <Squares2X2Icon className="size-7  stroke-[1.5px]" />

            <p className="text-lg font-normal">Overview</p>
          </div>
        </Link>
        <Link href="">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 text-xl font-normal transition duration-300 ease-in hover:bg-gray-200 ">
            <PresentationChartBarIcon className="size-7  stroke-[1.5px]" />{" "}
            <p className="text-lg font-normal">Stats</p>
          </div>
        </Link>
        <Link href="">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 text-xl font-normal transition duration-300 ease-in hover:bg-gray-200 ">
            <AcademicCapIcon className="size-7  stroke-[1.5px]" />{" "}
            <p className="text-lg font-normal">My Courses</p>
          </div>
        </Link>
        <Link href="">
          <div className="flex items-center gap-3 rounded-2xl bg-black p-3 text-xl font-normal text-white transition duration-300 ease-in hover:bg-gray-800 ">
            <PlusCircleIcon className="size-7  stroke-[1.5px] text-white" />
            <p className="text-lg font-normal">New Course</p>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
