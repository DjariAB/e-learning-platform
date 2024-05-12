"use client";

import {
  AcademicCapIcon,
  PlusCircleIcon,
  PresentationChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AddCourseDialog } from "./addCourseDialog";

const SideBar = () => {
  const pathName = usePathname();
  const Paths = [
    {
      name: "Overview",
      url: "/dashboard",
      icon: <Squares2X2Icon className="size-7  stroke-[1.5px]" />,
      isActive: pathName === "/dashboard",
    },
    {
      name: "Stats",
      url: "/dashboard/stats",
      icon: <PresentationChartBarIcon className="size-7  stroke-[1.5px]" />,
      isActive: pathName === "/dashboard/stats",
    },
    {
      name: "My Courses",
      url: "/dashboard/mycourses",
      icon: <AcademicCapIcon className="size-7  stroke-[1.5px]" />,
      isActive: pathName === "/dashboard/mycourses",
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col bg-background px-2 pt-2 sm:flex">
      <nav className="flex flex-col items-stretch gap-4 px-2 sm:py-4">
        <Link className="mb-8 self-center" href="/">
          <img
            className="w-40 "
            src="/SVGs/logo_text.svg"
            alt="Platform logo"
          />
        </Link>
        {Paths.map((path) => (
          <Link key={path.url} href={path.url}>
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl bg-white p-3 text-xl font-normal transition duration-150 ease-in hover:bg-gray-200 ",
                path.isActive
                  ? " bg-black text-white transition duration-300 ease-in hover:bg-black"
                  : "",
              )}
            >
              {path.icon}
              <p className="text-lg "> {path.name} </p>
            </div>
          </Link>
        ))}
        <AddCourseDialog>
          <div className="flex items-center gap-3 rounded-xl bg-white p-3 text-lg  font-normal  transition duration-150 ease-in hover:bg-gray-200 ">
            <PlusCircleIcon className="size-7" />
            <p className="text-center"> New course</p>
          </div>
        </AddCourseDialog>
      </nav>
    </aside>
  );
};

export default SideBar;
