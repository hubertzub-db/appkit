import { type DependencyList, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { ScrollArea } from "../../ui/scroll-area";
import { scrollToBottom } from "./utils";

export interface ChatScrollAreaProps {
  /** Dependencies that trigger scroll-to-bottom (e.g. message count, streaming state). */
  scrollDeps: DependencyList;
  /** Additional CSS class for the scroll area. */
  className?: string;
  children: React.ReactNode;
}

/** Scrollable area that scrolls to bottom when scrollDeps change. Uses ScrollArea so the viewport is the scroll target. */
export function ChatScrollArea({
  scrollDeps,
  className,
  children,
}: ChatScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    scrollToBottom(viewport ?? null);
    // biome-ignore lint/correctness/useExhaustiveDependencies: intentional triggers for auto-scroll
  }, scrollDeps);

  return (
    <div
      ref={scrollRef}
      className={cn("flex-1 min-h-0 flex flex-col", className)}
    >
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </div>
  );
}
