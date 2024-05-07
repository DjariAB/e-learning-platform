"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export function StreamableUI({
  correctAnswer,
  question,
  wronganswer,
  // wronganswer2,
  // wronganswer3,
}: {
  question: string;
  wronganswer: string;
  // wronganswer2: string;
  // wronganswer3: string;
  correctAnswer: string;
}) {
  return (
    <Card className="w-1/2 rounded-xl">
      <CardHeader className="">
        <CardTitle className=" text-center text-xl">{question}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-5 px-10  pr-14 pt-8 text-lg tracking-wider text-[#1E1E1E]">
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            1
          </div>
          <div className="flex grow flex-col gap-4  ">
            <input name="one" type="text" value={wronganswer} />
            <div className="pr-5">
              <Separator />
            </div>
          </div>
        </div>

        {/* <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            2
          </div>
          <div className="flex grow flex-col gap-4 ">
            <input name="one" type="text" value={wronganswer2} />
            <div className="pr-5">
              <Separator />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            3
          </div>
          <div className="flex grow flex-col gap-4 ">
            <input name="one" type="text" value={wronganswer3} />
            <div className="pr-5">
              <Separator />
            </div>
          </div>
        </div> */}
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            4
          </div>
          <div className="flex grow flex-col gap-4 ">
            <input
              className="px-1"
              name="one"
              type="text"
              value={correctAnswer}
            />
            <div className="pr-5">
              <Separator />
            </div>
            {/* <Separator /> */}
          </div>
        </div>
        <div className="flex items-center justify-center pb-4  ">
          <Button className="rounded-md bg-blue-900 ">Check answer</Button>
        </div>
      </CardContent>
    </Card>
  );
}
