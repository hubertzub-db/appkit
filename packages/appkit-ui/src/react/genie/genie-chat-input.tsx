import type { ChatInputProps } from "../shared/shared-chat";
import { ChatInput } from "../shared/shared-chat";

export type GenieChatInputProps = ChatInputProps;

/** Auto-expanding textarea input with a send button for chat messages. Submits on Enter (Shift+Enter for newline). */
export function GenieChatInput(props: GenieChatInputProps) {
  return <ChatInput {...props} />;
}
