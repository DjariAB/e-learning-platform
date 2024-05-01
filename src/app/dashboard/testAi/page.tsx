/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AI } from "@/lib/Chat/actions";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { generateId } from "lucia";

type UIState = {
  id: string;
  display: React.ReactNode;
  spinner?: React.ReactNode;
  attachments?: React.ReactNode;
}[];
const TestAIPage = () => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState();
  const { submitUserMessage } = useActions();

  const Messages: UIState = messages;
  return (
    <AI>
      <div>
        {Messages.length ?? (
          <div className="relative mx-auto grid max-w-2xl auto-rows-max gap-8 px-4">
            {Messages.map((message) => (
              <div key={message.id}>
                {message.spinner}
                {message.display}
                {message.attachments}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={async () => {
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: generateId(7),
                display: <div>{"testing your react app "} </div>,
              },
            ]);

            try {
              const responseMessage = await submitUserMessage(
                "make a small quizz about react usestate",
              );

              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ]);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          CLick me{" "}
        </button>
      </div>
    </AI>
  );
};

export default TestAIPage;
