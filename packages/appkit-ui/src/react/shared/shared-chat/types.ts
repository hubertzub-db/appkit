export interface ChatInputProps {
  /** Callback fired when the user submits a message */
  onSend: (content: string) => void;
  /** Disable the input and send button */
  disabled?: boolean;
  /** Placeholder text shown in the textarea */
  placeholder?: string;
  /** Additional CSS class for the container */
  className?: string;
  /** Max height in pixels for the auto-expanding textarea. Default: 200 */
  maxHeight?: number;
}
