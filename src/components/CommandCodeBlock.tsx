import { CheckIcon, CopyIcon } from "@/components/icons";

interface CommandCodeBlockProps {
  command: string;
  isCopied: boolean;
  isAntigravity: boolean;
  onCopy: () => void;
}

export default function CommandCodeBlock({
  command,
  isCopied,
  isAntigravity,
  onCopy,
}: CommandCodeBlockProps) {
  const iconClass = `h-4 w-4 transition-transform duration-150 ${
    isCopied
      ? isAntigravity
        ? "text-cyan-500 scale-105"
        : "text-blue-500 scale-105"
      : "text-zinc-500 group-hover/code:text-zinc-400"
  }`;

  return (
    <div
      onClick={onCopy}
      className={`group/code relative cursor-pointer p-3.5 font-mono text-sm border rounded-md transition-all duration-200 overflow-x-auto ${
        isCopied
          ? isAntigravity
            ? "border-cyan-500/40 bg-cyan-500/5"
            : "border-blue-500/40 bg-blue-500/5"
          : "border-zinc-800 bg-zinc-900"
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Copy command: ${command}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCopy();
        }
      }}
    >
      <div className="flex items-center justify-between gap-4 select-all">
        <code
          className={`font-medium break-all font-mono ${isAntigravity ? "text-cyan-400" : "text-blue-400"}`}
        >
          {command}
        </code>
        <div className="flex items-center gap-2 select-none shrink-0">
          {isCopied ? (
            <span
              className={`font-medium text-xs tracking-wider uppercase animate-pulse ${isAntigravity ? "text-cyan-400" : "text-blue-500"}`}
            >
              COPIED!
            </span>
          ) : (
            <span className="text-zinc-550 group-hover/code:text-zinc-400 transition-colors text-xs uppercase font-medium">
              [click copy]
            </span>
          )}
          {isCopied ? (
            <CheckIcon className={iconClass} />
          ) : (
            <CopyIcon className={iconClass} />
          )}
        </div>
      </div>
    </div>
  );
}

