"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export function StreamableUI({
  correctAnswer,
  question,
  wronganswer,
  wronganswer2,
  wronganswer3,
}: {
  question: string;
  wronganswer: string;
  wronganswer2: string;
  wronganswer3: string;
  correctAnswer: string;
}) {
  return (
    <Card className="w-fit rounded-xl">
      <CardHeader className="">
        <CardTitle className="  text-xl">{question}</CardTitle>
      </CardHeader>
      <br />
      <CardContent className="flex flex-col  px-3  text-lg tracking-wider text-[#1E1E1E]">
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            1
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            2
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer2} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            3
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={wronganswer3} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
        <div className="flex gap-3  ">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
            {" "}
            4
          </div>
          <div className="flex grow flex-col gap-2  ">
            <input name="one" type="text" value={correctAnswer} />
            <div className="pr-5">
              <br className="border border-border " />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
