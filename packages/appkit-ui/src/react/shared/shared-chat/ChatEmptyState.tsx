import type { ReactNode } from "react";

export interface ChatEmptyStateProps {
  /** Message shown when there are no messages. */
  message: string;
  /** Optional replacement content (e.g. custom empty UI). */
  children?: ReactNode;
}

/** Centered empty state for chat. Renders message or children. */
export function ChatEmptyState({ message, children }: ChatEmptyStateProps) {
  if (children !== undefined) {
    return <>{children}</>;
  }
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm py-12">
      {message}
    </div>
  );
}
