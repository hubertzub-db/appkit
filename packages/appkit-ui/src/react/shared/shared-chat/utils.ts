/** Scroll an element to the bottom. Use for chat message lists (e.g. ScrollArea viewport or overflow div). */
export function scrollToBottom(element: HTMLElement | null): void {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

/** Pretty-print JSON string for display; returns original string on parse error. */
export function tryFormatJson(s: string): string {
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch {
    return s;
  }
}
