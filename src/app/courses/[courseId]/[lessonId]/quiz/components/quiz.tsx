"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { type quizType } from "../page";
import { Progress } from "@/components/ui/progress";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
function Quiz({ quizData }: { quizData: quizType }) {
  const [questionIndex, setQuestionIndex] = useState(5);
  const [score, setScore] = useState(0);
  const choices: string[] = [];
  if (questionIndex < 5) {
    choices.push(quizData[questionIndex]!.choice1);
    choices.push(quizData[questionIndex]!.choice2);
    choices.push(quizData[questionIndex]!.choice3);
    if (quizData[questionIndex]!.choice4) {
      choices.push(quizData[questionIndex].choice4);
    }
  }

  const [selectedChoice, setselectedChoice] = useState(-1);

  const [isChecked, setChecked] = useState(false);

  const onSelectChoice = (index: number) => {
    if (!isChecked) {
      if (selectedChoice === index) setselectedChoice(-1);
      else setselectedChoice(index);
    }
  };
  const check = () => {
    setChecked(true);

    choices[quizData[questionIndex]!.correct - 1] === choices[selectedChoice]
      ? setScore(score + 20)
      : null;
  };
  const next = () => {
    setChecked(false);
    setselectedChoice(-1);
    setQuestionIndex(questionIndex + 1);
  };
  console.log(selectedChoice);

  return (
    <div className="m-auto flex h-screen flex-col items-center gap-3">
      <div className="grid w-screen grid-cols-3 items-center p-6">
        <Image
          src="/SVGs/logo_text.svg"
          width={150}
          height={35}
          alt="platform logo"
        />
        <div className="flex flex-grow justify-center">
          <Progress
            value={(questionIndex * 100) / 5}
            className="h-3.5 w-96 text-center"
          />
        </div>
        <XMarkIcon className="size-8 justify-self-end" strokeWidth={1} />
      </div>
      <div className="flex w-3/4 flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-medium">Lesson Quiz</h1>
          <p className="text-lg font-light text-gray-400">
            Test your knowledge and see what you&apos;ve just learned
          </p>
        </div>

        <Card className="w-full justify-self-center rounded-xl">
          <CardHeader className="">
            <CardTitle className="text-center text-2xl font-medium">
              {questionIndex < 5
                ? quizData[questionIndex]?.question
                : score < 40
                  ? "Seems like you need to revise the lesson and retry"
                  : score < 80
                    ? "Good job son"
                    : "Can't be better!"}
            </CardTitle>
          </CardHeader>
          <hr className="pb-5" />
          <CardContent className="flex flex-col items-center gap-5 px-3 pb-7 text-lg tracking-wider text-[#1E1E1E]">
            {questionIndex < 5 ? (
              <>
                <div className="flex flex-col items-center text-center">
                  {choices.map((ch, index) => (
                    <>
                      <ChoiceComp
                        key={index}
                        disabled={isChecked}
                        value={ch}
                        index={index}
                        state={
                          index === selectedChoice &&
                          choices[quizData[questionIndex]!.correct - 1] ===
                            ch &&
                          isChecked
                            ? "correct"
                            : index === selectedChoice &&
                                isChecked &&
                                choices[
                                  quizData[questionIndex]!.correct - 1
                                ] !== ch
                              ? "false"
                              : index === selectedChoice
                                ? "selected"
                                : undefined
                        }
                        onSelectChoice={() => onSelectChoice(index)}
                      />
                      <div className="justify-self-centert w-11/12">
                        <hr />
                      </div>
                    </>
                  ))}
                </div>

                <div className="h-8 text-center text-2xl font-medium">
                  {isChecked ? (
                    choices[quizData[questionIndex]!.correct - 1] ===
                    choices[selectedChoice] ? (
                      <p className="text-green-500">Correct</p>
                    ) : (
                      <p className="text-red-500">false</p>
                    )
                  ) : (
                    <p>Score: {score} pts</p>
                  )}
                </div>
                <Button
                  className="w-fit self-center rounded-sm bg-mainblue px-6 py-6 font-normal hover:bg-blue-900 "
                  disabled={selectedChoice === -1}
                  onClick={() => {
                    isChecked ? next() : check();
                  }}
                >
                  {isChecked ? <p>Next</p> : <p>Check</p>}
                </Button>
              </>
            ) : (
              <>
                {/* <iframe src="https://giphy.com/embed/mGK1g88HZRa2FlKGbz" width="480" height="400" frameBorder="0" className="" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Friends-episode-1-season-9-friends-tv-mGK1g88HZRa2FlKGbz">via GIPHY</a></p>                */}
                <img
                  src="https://media1.tenor.com/m/V1oCWmxLZYcAAAAd/internin-job.gif"
                  alt="gif"
                  className="size-72"
                />
                <div className="h-8 text-center text-2xl font-medium">
                  You&apos;ve Scored : {score} pts
                </div>
                <Button className="w-fit self-center rounded-sm bg-mainblue px-6 py-6 font-normal hover:bg-blue-900 ">
                  Continue
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function ChoiceComp({
  disabled,
  value,
  index,
  state,
  onSelectChoice,
}: {
  disabled: boolean;
  value: string;
  state: "selected" | "false" | "correct" | undefined;
  index: number;
  onSelectChoice: (selected: number) => void;
}) {
  let style: string | undefined;
  state === "selected"
    ? (style = "bg-[#eef3fa] font-medium  text-mainblue")
    : state === "correct"
      ? (style = "bg-green-200 font-medium  text-green-900")
      : state === "false"
        ? (style = "bg-red-200 font-medium  text-red-900")
        : "";
  console.log(state);

  return (
    <>
      <div
        className={`flex w-full gap-5 rounded-full px-4 py-2 transition duration-200 ease-in ${!style && !disabled ? `hover:bg-gray-100` : ""} ${style} ${disabled ? "cursor-default" : "cursor-pointer"}`}
        onClick={() => onSelectChoice(index)}
      >
        <div
          className={`flex size-10 items-center justify-center rounded-full text-inherit ${style ? "bg-white" : "bg-blue-100"} text-lg font-semibold`}
        >
          {" "}
          {index + 1}
        </div>
        <div className="flex items-center text-center text-xl ">
          <p>{value}</p>
        </div>
      </div>
    </>
  );
}

export default Quiz;
