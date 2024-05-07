"use client";

import { useState } from "react";
import { continueConversationTest, Message } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Anek_Latin } from "next/font/google";
import { Button } from "@/components/ui/button";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
function Home() {
  return (
    <div className={`text flex justify-center pt-6 ${anekLatin.className}`}>
      <Card className="w-1/2 rounded-xl">
        <CardHeader className="">
          <CardTitle className=" text-center text-xl">
            what’s a state hook?
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-5 px-10  pr-14 pt-8 text-lg tracking-wider text-[#1E1E1E]">
          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              1
            </div>
            <div className="flex grow flex-col gap-4  ">
              <input
                name="one"
                type="text"
                value={
                  "A state hook in React.js enables functional components to manage local state."
                }
              />
              <div className="pr-5">
                <Separator />
              </div>
            </div>
          </div>

          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              2
            </div>
            <div className="flex grow flex-col gap-4 ">
              <input
                name="one"
                type="text"
                value={
                  "Introduced in React 16.8, it facilitates state management akin to class components."
                }
              />
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
              <input
                name="one"
                type="text"
                value={
                  "State hooks, like useState(), preserve state between re-renders in functional components."
                }
              />
              <div className="pr-5">
                <Separator />
              </div>
            </div>
          </div>
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
                value={
                  "They foster modularity by encapsulating state within functional components."
                }
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
    </div>
  );
}

export default function Test() {
  const [conversation, setConversation] = useState<Message>();
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div>
        {/* {conversation.map((message, index) => ( */}
        {conversation && (
          <div>
            {conversation.role}: {conversation.content}
            {conversation.display}
          </div>
        )}
        {/* ))} */}
      </div>

      <div>
        <div>
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </div>
        <button
          onClick={async () => {
            const message = await continueConversationTest(input);

            setConversation(message);
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
