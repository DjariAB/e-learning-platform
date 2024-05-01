import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { cn } from "@/lib/utils";
import { StreamableValue } from "ai/rsc";
import { Loader2 } from "lucide-react";
import { MemoizedReactMarkdown } from "../markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow-sm">
        <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
      </div>
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow-sm">
        <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className ?? "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <div></div>
                // <CodeBlock
                //   key={Math.random()}
                //   language={(match && match[1]) ?? ""}
                //   value={String(children).replace(/\n$/, "")}
                //   {...props}
                // />
              );
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow-sm",
          !showAvatar && "invisible",
        )}
      >
        <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}
