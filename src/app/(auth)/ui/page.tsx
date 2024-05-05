"use client";

import { useState } from "react";
import { Message, continueConversation } from "./action";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
            {message.display}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
          onClick={async () => {
            const { messages } = await continueConversation([
              ...conversation,
              { role: "user", content: input },
            ]);

            setConversation(messages);
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
