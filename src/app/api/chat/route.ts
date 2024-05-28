import {type CoreMessage, StreamingTextResponse, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-pro"),
    system:
      "You are a highly intelligent AI assistant designed to help users learn from their mistakes in a quiz. After a user completes a quiz, they will provide you with the questions they answered incorrectly along with their incorrect answers. Your task is to generate a brief and informative summary for each mistake, explaining the correct answer and the concept behind it. Make sure your explanations are clear, concise,  educational and doesn't exceed 5 lines",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
  // return result.toAIStreamResponse();
}
