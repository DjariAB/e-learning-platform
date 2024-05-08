"use client";

import { useState } from "react";
import { continueConversationTest, type Message } from "../../../lib/ai/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Anek_Latin } from "next/font/google";
import { Button } from "@/components/ui/button";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
export default function Home() {
  return (
    <div className={`text flex justify-center pt-6 ${anekLatin.className}`}>
      <Card className="w-fit rounded-xl">
        <CardHeader className="">
          <CardTitle className="  text-xl">
            What is the first argument of the `useState` hook?
          </CardTitle>
        </CardHeader>
        <br />
        <CardContent className="flex flex-col gap-5 px-3  text-lg tracking-wider text-[#1E1E1E]">
          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              1
            </div>
            <div className="flex grow flex-col gap-2  ">
              <input
                name="one"
                type="text"
                value={"The state updater function"}
              />
              <div className="pr-5">
                {/* <hr className="border border-border " /> */}
              </div>
            </div>
          </div>
          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              2
            </div>
            <div className="flex grow flex-col gap-2  ">
              <input name="one" type="text" value={"The initial state"} />
              <div className="pr-5">
                {/* <br className="border border-border " /> */}
              </div>
            </div>
          </div>
          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              3
            </div>
            <div className="flex grow flex-col gap-2  ">
              <input name="one" type="text" value={"The initial state"} />
              <div className="pr-5">
                {/* <br className="border border-border " /> */}
              </div>
            </div>
          </div>
          <div className="flex gap-3  ">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-900">
              {" "}
              4
            </div>
            <div className="flex grow flex-col gap-2  ">
              <input name="one" type="text" value={"The initial state"} />
              <div className="pr-5">
                {/* <br className="border border-border " /> */}
              </div>
            </div>
          </div>

          <div className="flex justify-center px-10">
            <Button className="rounded-lg bg-blue-900 ">submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Test() {
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
