import { cn } from "../lib/utils";
import {
  ChatEmptyState,
  ChatInput,
  ChatScrollArea,
} from "../shared/shared-chat";
import { AgentChatMessage } from "./agent-chat-message";
import type { AgentChatProps, ChatMessage } from "./types";
import { useAgentChat } from "./use-agent-chat";

/** Agent chat UI: message list + input, wired to POST /invocations SSE streaming. */
export function AgentChat({
  invokeUrl = "/invocations",
  placeholder = "Type a message...",
  emptyMessage = "Send a message to start.",
  className,
}: AgentChatProps) {
  const { displayMessages, loading, sendMessage, isStreamingText } =
    useAgentChat({ invokeUrl });

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      <ChatScrollArea
        scrollDeps={[displayMessages.length, isStreamingText]}
        className="p-4"
      >
        <div className="flex flex-col gap-4">
          {displayMessages.length === 0 ? (
            <div className="flex-1 min-h-[12rem] flex">
              <ChatEmptyState message={emptyMessage} />
            </div>
          ) : (
            displayMessages.map((msg, i) => (
              <MessageItem
                key={`msg-${i}-${msg.role}`}
                message={msg}
                isLast={i === displayMessages.length - 1}
                isStreaming={isStreamingText}
              />
            ))
          )}
        </div>
      </ChatScrollArea>

      <ChatInput
        onSend={sendMessage}
        disabled={loading}
        placeholder={placeholder}
      />
    </div>
  );
}

function MessageItem({
  message,
  isLast,
  isStreaming,
}: {
  message: ChatMessage;
  isLast: boolean;
  isStreaming: boolean;
}) {
  return (
    <AgentChatMessage
      message={message}
      isLast={isLast}
      isStreaming={isStreaming}
    />
  );
}
