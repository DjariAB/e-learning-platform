import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { columns, type Student } from "./components/columns";
import { DataTable } from "./components/data-table";
import Link from "next/link";
import CourseRow from "./components/courseRow";
import StatContainer from "./components/statConainter";

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
      rank: "#1",
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
      rank: "#2",
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
      rank: "#3",
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
      rank: "#4",
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
      rank: "#5",
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
      rank: "#6",
      score: 22,
    },
  ];
}

export default async function Page() {
  const data = await getData();
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2 " x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>
                <Link href={""} className="flex h-10 items-center gap-3 ">
                  <p className="leading-7">My courses</p>{" "}
                  <ChevronRight className="size-4" />
                </Link>
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
                  <p className="leading-7">My Stats</p>{" "}
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

        <Card x-chunk="dashboard-05-chunk-3" className="overflow-x-scroll">
          <CardHeader className="px-7">
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
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order Oe31b70H
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$299.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$25.00</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>$329.00</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@acme.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">+1 234 567 890</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
