import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { marked } from "marked";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  // ArrowRightEndOnRectangleIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default async function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const res = await fetch(
    "https://uploadthing-prod.s3.us-west-2.amazonaws.com/37537334-7e0c-447f-8810-1433ce5343af-2bb5.md",
  );
  const data = await res.text();
  return (
    <div className="pt-10">
      {/* <NavBar /> */}
      <div className="px-32">
        <div className="flex w-fit items-center gap-20  py-12">
          <img
            src="https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png"
            alt="Course image"
            className="size-[180px] rounded-2xl object-cover"
          />
          <div className="flex flex-col gap-6 ">
            <h1 className="text-4xl font-bold">REACT state hook</h1>
            <Link href={""} className="text-3xl font-normal text-[#717171]">
              Introduction to REACT JS
            </Link>
            <div className="flex items-center gap-10">
              <Progress value={60} />
              <p className="text-2xl font-medium">60%</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-3/4  py-8 text-2xl">
            <h1 className="text-3xl font-medium">Intorduction</h1>
            <p className="p-4 font-light text-[#797979] ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Mollitia, quod placeat. Officia libero voluptate animi ratione,
              nesciunt repellendus delectus facere cupiditate deleniti magni ab,
              eos nobis ipsa, eveniet sint atque! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptate fugit quibusdam ab maxime
              magnam velit quidem ut et, labore expedita quo, rem voluptatibus?
              Aliquam minima incidunt porro quaerat dolores ex! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Dolore officia magni
              ducimus esse deleniti ipsam. Quaerat nisi, mollitia quia ab quo
              molestias rem modi recusandae in delectus! Totam, temporibus
              incidunt?
            </p>

            <div dangerouslySetInnerHTML={{ __html: marked(data) }} />

            <div className="flex flex-col gap-8">
              <hr />
              <div className="flex justify-between px-6">
                <Button
                  variant={"outline"}
                  className="w-40 items-center gap-2 rounded-md border-[#072e6a] px-2 text-xl font-normal text-[#072e6a]"
                >
                  <ArrowLeftCircleIcon className="size-5" />
                  Previous
                </Button>
                <Button className="w-52 items-center gap-2 rounded-md bg-[#072e6a] px-2 text-xl font-normal hover:bg-[#072f6acc]">
                  <FlagIcon className="size-5 rounded-full bg-white px-1 text-[#072e6a]" />
                  Take Your Quiz
                </Button>
                <Button
                  // disabled={true}
                  variant={"outline"}
                  className="w-40 items-center gap-2 rounded-md text-xl font-normal"
                >
                  Next
                  <ArrowRightCircleIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
          <div>Scroll tracker</div>
        </div>
      </div>
    </div>
  );
}
