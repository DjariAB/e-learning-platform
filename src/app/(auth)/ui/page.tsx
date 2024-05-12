"use client";

import { useState } from "react";
import {
  continueConversationTest,
  type Message,
} from "../../../lib/ai/actions";

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
