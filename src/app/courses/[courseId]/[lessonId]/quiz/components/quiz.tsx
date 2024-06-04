"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import RecapComp from "@/components/recapComp";
import { type quizType } from "../page";
import { InferSelectModel } from "drizzle-orm";
import { enrolledCoursesTable } from "@/server/db/schema";
import { useFormState } from "react-dom";
import { NextLessonAction } from "@/actions/helpers/quizHelpers";
import { SubmitButton } from "@/lib/Form";
type QuizProps = {
  quizData: quizType;
  currentCourse: InferSelectModel<typeof enrolledCoursesTable>;
};

function Quiz({ quizData, currentCourse }: QuizProps) {
  const [questionIndex, setQuestionIndex] = useState(quizData.length - 1);
  const [score, setScore] = useState(0);
  const [UserMistakes, setUserMistakes] = useState<
    {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    }[]
  >([]);

  const [isRecap, setIsRecap] = useState(false);

  const current = quizData[questionIndex] ?? {
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    correct: "",
  };
  const choices = Object.values(current).map((ss, index) => ({
    id: index,
    value: ss,
  }));

  choices.shift();
  const [selectedChoice, setselectedChoice] = useState<number | null>(null);

  const [isChecked, setChecked] = useState(false);

  const onSelectChoice = (index: number) => {
    if (!isChecked) {
      if (selectedChoice === index) setselectedChoice(null);
      else setselectedChoice(index);
    }
  };
  const check = () => {
    if (selectedChoice !== null) {
      setChecked(true);
      if (quizData[questionIndex]!.correct !== choices[selectedChoice]?.value) {
        setUserMistakes([
          ...UserMistakes,
          {
            question: quizData[questionIndex]!.question,
            correctAnswer: quizData[questionIndex]!.correct,
            userAnswer: choices[selectedChoice]!.value,
          },
        ]);
      }

      quizData[questionIndex]!.correct === choices[selectedChoice]?.value
        ? setScore(score + 20)
        : null;
    }
  };
  const next = () => {
    setChecked(false);
    setselectedChoice(null);
    setQuestionIndex(questionIndex + 1);
    console.log("length" + UserMistakes.length);
    console.log(UserMistakes);
  };
  return (
    <div className="flex h-screen flex-col items-center gap-3 sm:m-auto">
      <div className="grid w-screen items-center p-6 sm:grid-cols-3">
        <Image
          src="/SVGs/logo_text.svg"
          width={150}
          height={35}
          alt="platform logo"
        />
        <div className="flex flex-grow justify-center">
          <Progress
            value={(questionIndex * 100) / quizData.length}
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

        <Card className="w-full justify-self-center rounded-xl ">
          <CardHeader className="">
            <CardTitle className="text-center text-2xl font-medium">
              {questionIndex < quizData.length
                ? quizData[questionIndex]?.question
                : questionIndex > quizData.length && UserMistakes.length !== 0
                  ? "here's a quiz recap"
                  : score < 40
                    ? "Seems like you need to revise the lesson and retry"
                    : score <= 80
                      ? "Good job son"
                        ? score === 100
                        : "Can't be better!"
                      : null}
            </CardTitle>
          </CardHeader>
          <hr className="pb-5" />
          <CardContent className="flex flex-col items-center gap-5 px-3 pb-7 text-lg tracking-wider text-[#1E1E1E]">
            {questionIndex < quizData.length ? (
              <>
                <div className="flex w-full flex-col items-center text-center">
                  {choices.map((ch, index) => (
                    <div key={ch.id} className="w-full">
                      <ChoiceComp
                        disabled={isChecked}
                        value={ch.value}
                        index={index}
                        state={
                          (index === selectedChoice &&
                            quizData[questionIndex]!.correct === ch.value &&
                            isChecked) ||
                          (quizData[questionIndex]!.correct === ch.value &&
                            isChecked)
                            ? "correct"
                            : index === selectedChoice &&
                                isChecked &&
                                quizData[questionIndex]!.correct !== ch.value
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
                    </div>
                  ))}
                </div>
                <Button
                  className="w-fit self-center rounded-sm bg-mainblue px-6 py-6 font-normal hover:bg-blue-900 "
                  disabled={selectedChoice === null}
                  onClick={() => {
                    isChecked ? next() : check();
                  }}
                >
                  {isChecked ? <p>Next</p> : <p>Check</p>}
                </Button>
              </>
            ) : (
              <>
                {isRecap ? (
                  <RecapComp
                    UserMistakes={UserMistakes}
                    courseId={currentCourse.courseId}
                    lessonIndex={currentCourse.currentLessonIndex}
                  />
                ) : UserMistakes.length === 0 ? (
                  <>
                    <ResultComp
                      score={score}
                      possibleScore={quizData.length * 20}
                    />
                    <NextLesson
                      score={score}
                      courseId={currentCourse.courseId}
                      lessonIndex={currentCourse.currentLessonIndex}
                    />
                  </>
                ) : (
                  <>
                    <ResultComp
                      score={score}
                      possibleScore={quizData.length * 20}
                    />
                    <Button
                      className="w-fit self-center rounded-sm bg-mainblue px-6 py-6 font-normal hover:bg-blue-900"
                      onClick={() => setIsRecap(true)}
                    >
                      Recap with AI
                    </Button>
                  </>
                )}
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

  return (
    <>
      <div
        className={`flex w-full items-center gap-5 rounded-md px-4 py-2 transition duration-200 ease-in ${!style && !disabled ? `hover:bg-gray-100` : ""} ${style} ${disabled ? "cursor-default" : "cursor-pointer"}`}
        onClick={() => onSelectChoice(index)}
      >
        <div
          className={`flex size-10 items-center justify-center rounded-full text-inherit ${style ? "bg-white" : "bg-blue-100"} text-lg font-semibold`}
        >
          {" "}
          {index + 1}
        </div>
        <p className="text-center text-xl ">{value}</p>
        <p className="grow text-right font-semibold ">
          {state === "correct" ? "correct" : state === "false" ? "false" : ""}
        </p>
      </div>
    </>
  );
}

function ResultComp({
  score,
  possibleScore,
}: {
  score: number;
  possibleScore: number;
}) {
  return (
    <>
      <img
        src={
          score === possibleScore
            ? "https://media1.tenor.com/m/H1-R8Mum3nwAAAAC/perfection-perfect.gif"
            : score >= (possibleScore * 2) / 3
              ? "https://media1.tenor.com/m/V1oCWmxLZYcAAAAd/internin-job.gif"
              : "https://media1.tenor.com/m/bUOrNPAXcMEAAAAd/the-office-michael-scott.gif"
        }
        alt="gif"
        className="h-72 w-auto"
      />
      <div className="h-8 text-center text-2xl font-medium">
        You&apos;ve Scored : {score} pts
      </div>
    </>
  );
}

export function NextLesson({
  courseId,
  lessonIndex,
  score,
}: {
  lessonIndex: number;
  courseId: string;
  score: number;
}) {
  const [formState, formAction] = useFormState(NextLessonAction, {
    message: null,
    status: null,
  });
  return (
    <form action={formAction}>
      <input name="courseId" value={courseId} type="hidden" />
      <input name="score" value={score} type="hidden" />
      <input name="lessonIndex" value={lessonIndex} type="hidden" />
      <SubmitButton className="w-fit self-center rounded-sm bg-mainblue px-6 py-6 font-normal hover:bg-blue-900 ">
        Continue
      </SubmitButton>
      {formState.message}
    </form>
  );
}
export default Quiz;
