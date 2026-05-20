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
          <svg
            className={`h-4 w-4 transition-transform duration-150 ${
              isCopied
                ? isAntigravity
                  ? "text-cyan-500 scale-105"
                  : "text-blue-500 scale-105"
                : "text-zinc-500 group-hover/code:text-zinc-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isCopied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
