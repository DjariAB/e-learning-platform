"use client";
import { useChat } from "ai/react";
import { Brain, User2 } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { marked } from "marked";

export default function RecapComp({
  chatInput,
}: {
  chatInput: {
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

  const [isChatting, setIsChatting] = useState(false);
  const [chatInputButtons, setchatInputButtons] = useState(chatInput);
  return (
    <div className=" flex h-fit flex-col items-center  pt-4 sm:w-10/12 ">
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
          {chatInputButtons.map((inputItem, i) => (
            <button
              className="h-fit w-fit cursor-pointer rounded-xl border px-4 py-2 text-base leading-6 hover:bg-gray-50"
              key={inputItem.question}
              onClick={() => {
                setInput(`Question: ${inputItem.question}
          user Answer: ${inputItem.userAnswer}
          Correct Answer: ${inputItem.correctAnswer}`);
                setTimeout(() => {
                  setchatInputButtons(
                    chatInputButtons.filter((value) => value !== inputItem),
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
    </div>
  );
}
