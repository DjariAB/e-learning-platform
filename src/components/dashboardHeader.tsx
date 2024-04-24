import { Package2, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import UserButton from "./userButton";
import {
  AcademicCapIcon,
  PresentationChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const DashboardHeader = () => {
  const Paths = [
    {
      name: "Overview",
      url: "/dashboard",
      icon: <Squares2X2Icon className="size-7" />,
    },
    {
      name: "Stats",
      url: "/dashboard/stats",
      icon: <PresentationChartBarIcon className="size-7" />,
    },
    {
      name: "My Courses",
      url: "/dashboard/courses",
      icon: <AcademicCapIcon className="size-7" />,
    },
  ];
  return (
    <header className="sticky top-0 z-30 flex h-14 grow items-center justify-between gap-4 border-b bg-background px-8 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group mb-3 flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {Paths.map((path) => (
              <Link
                key={path.url}
                href={path.url}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {/* <Home className="h-5 w-5" /> */}
                {/* <Squares2X2Icon className="size-6  stroke-[1.5px]" /> */}
                {path.icon}
                {path.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      {/* <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between"> */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList className="text-md">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recent Orders</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <div className="grow md:grow-0">
          <p className="text-xl font-normal">
            {weekdays[date.getDay()]}, {date.getDate()}{" "}
            {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </div> */}
      {/* <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <MentorAvatar
              name="The Emperor"
              email="emperorofuniverse@humanity.universe"
              image="/images/Dune-Part-Two-Emperor.jpg"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={logoutAction}>
                <button type="submit">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      {/* </div> */}
      <UserButton />
    </header>
  );
};

export default DashboardHeader;
