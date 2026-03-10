import { type DependencyList, type RefObject, useEffect } from "react";
import { scrollToBottom } from "./utils";

/** Scrolls the given element to the bottom when deps change. Use when the ref points at the scrollable element (e.g. overflow div). */
export function useScrollToBottom(
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList,
): void {
  useEffect(() => {
    scrollToBottom(ref.current);
    // biome-ignore lint/correctness/useExhaustiveDependencies: dynamic list
  }, deps);
}
