"use client";
import { useChat } from "ai/react";
import { Brain, User2 } from "lucide-react";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { marked } from "marked";
import { NextLesson } from "@/app/courses/[courseId]/[lessonId]/quiz/components/quiz";

export default function RecapComp({
  UserMistakes,
  courseId,
  lessonIndex,
  lessonId,
  score,
}: {
  lessonIndex: number;
  courseId: string;
  score: number;
  lessonId: string;
  UserMistakes: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
  }[];
}) {
  const inputref = useRef<HTMLInputElement | null>(null);

  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      onFinish: () => {
        if (inputref.current) inputref.current?.scrollIntoView();
      },
    });

  // const [isChatting, setIsChatting] = useState(false);
  const [UserMistakesButtons, setUserMistakesButtons] = useState(UserMistakes);
  return (
    <div className=" flex h-fit min-h-80 flex-col  items-center pt-4 sm:w-10/12">
      <div className="w-fit px-5 py-3">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="flex items-center gap-4 pb-4">
              <div className="border-black-200 h-fit self-start rounded-xl border p-1.5">
                {message.role === "user" ? <User2 /> : <Brain />}{" "}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: marked(message.content) }}
              />{" "}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto w-11/12 space-y-4">
        <div className="flex w-full flex-wrap gap-2">
          {UserMistakesButtons.map((inputItem, i) => (
            <button
              className="h-fit w-fit cursor-pointer rounded-xl border px-4 py-2 text-base leading-6 hover:bg-gray-50"
              key={inputItem.question}
              onClick={() => {
                setInput(`Question: ${inputItem.question}
          user Answer: ${inputItem.userAnswer}
          Correct Answer: ${inputItem.correctAnswer}`);
                setTimeout(() => {
                  setUserMistakesButtons(
                    UserMistakesButtons.filter((value) => value !== inputItem),
                  );
                }, 0);
              }}
              type="submit"
            >
              {i + 1}. {inputItem.question}
            </button>
          ))}
        </div>

        <Input
          name="prompt"
          ref={inputref}
          className="w-full border-black"
          value={input}
          placeholder="ََAsk your questions here"
          onChange={handleInputChange}
          id="input"
        />
      </form>
      {!UserMistakesButtons.length && messages.length ? (
        <div className="pt-4">
          <NextLesson
            courseId={courseId}
            lessonIndex={lessonIndex}
            score={score}
            lessonId={lessonId}
          />
        </div>
      ) : null}
    </div>
  );
}
