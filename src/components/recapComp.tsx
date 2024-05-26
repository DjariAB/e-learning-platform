"use client";

import { useChat } from "ai/react";
import { Brain, User2 } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export default function RecapComp({ question }: { question?: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  console.log(messages);
  return (
    <div className=" flex h-[500px] flex-col items-center  pt-4 sm:w-10/12 ">
      <ScrollArea className="w-11/12 overflow-scroll px-2">
        <div className="flex gap-4 pb-4">
          <div className="border-black-200 h-fit rounded-xl border p-1.5">
            <User2 />
          </div>
          Absolutely! Here&apos;s a prompt you can use for your AI model to
          generate quizzes with explanations for wrong answers:
        </div>
        <div className="flex gap-4 pb-4">
          <div className="border-black-200 h-fit rounded-xl border p-1.5">
            <Brain />
          </div>
          You are a large language model trained to create informative quizzes
          and provide feedback to users. Given a question, multiple answer
          choices (including a correct answer and distractors), and the
          difficulty level, you can explain why a chosen wrong answer is
          incorrect and why the correct answer is true.
        </div>
        <div className="flex gap-4 pb-4">
          <div className="border-black-200 h-fit rounded-xl border p-1.5">
            <Brain className="" />
          </div>
          You are a large language model trained to create informative quizzes
          and provide feedback to users. Given a question, multiple answer
          choices (including a correct answer and distractors), and the
          difficulty level, you can explain why a chosen wrong answer is
          incorrect and why the correct answer is true.
        </div>
        {messages.map((message) => (
          <div key={message.id}>
            <div className="flex gap-4 pb-4">
              <div className="border-black-200 h-fit rounded-xl border p-1.5">
                {message.role === "user" ? <User2 /> : <Brain />}{" "}
              </div>
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="mt-auto w-11/12 ">
        <Input
          name="prompt"
          className="w-full border-black"
          value={input}
          placeholder="Message our AI here"
          onChange={handleInputChange}
          id="input"
        />
      </form>
    </div>
  );
}
