"use client";

import { getAnswer } from "@/app/actions";
import { useState } from "react";

const test =
  ' generate a single quiz about the content provided below that follows the following structure in the shape of an object Question : "your question here" Choice_1 : "your first choice" Choice_2 : "your second choice" Choice_3 : "your third choice" Choice_4 : "your fourth choice" Correct_index : "index of the correct choice"';

type test = {
  Question: string;
  Choice_1: string;
  Choice_2: string;
  Choice_3: string;
  Choice_4: string;
  Correct_index: number;
};
export default function Home() {
  const [generation, setGeneration] = useState<test | null>();
  const [value, setValue] = useState<string>("");
  //   const jsonStr = generation.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');

  // Parse the JSON string into an object
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={async () => {
          const { obj } = await getAnswer(`${test} content ${value}`);
          setGeneration(obj);
        }}
      >
        Answer
      </button>
      {/* <div>{generation}</div> */}

      <div> {generation?.Question} </div>
      <ol>
        <li>{generation?.Choice_2} </li>
        <li>{generation?.Choice_1} </li>
        <li>{generation?.Choice_3} </li>
        <li>{generation?.Choice_4} </li>
      </ol>
    </div>
  );
}
