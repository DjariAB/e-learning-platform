import { CoreMessage, StreamingTextResponse, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-pro"),
    system: "You are a large language model trained to provide feedback to users. Given a question, you provide an answer with a small explanation to it.",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
  // return result.toAIStreamResponse();
}
