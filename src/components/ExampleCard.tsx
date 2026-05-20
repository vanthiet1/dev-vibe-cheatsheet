import type { IExample } from "@/types";

interface ExampleCardProps {
  example: IExample;
  isCopied: boolean;
  isAntigravity: boolean;
  onCopy: () => void;
}

export default function ExampleCard({
  example,
  isCopied,
  isAntigravity,
  onCopy,
}: ExampleCardProps) {
  const isMultiLine = example.command.includes("\n");

  if (isMultiLine) {
    return (
      <div className="bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 p-4 flex flex-col gap-3 text-sm rounded-md transition-all relative group">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="font-medium text-zinc-200">{example.title}</div>
            {example.description && (
              <div className="text-zinc-500 text-xs font-normal leading-relaxed">
                {example.description}
              </div>
            )}
          </div>
          <button
            onClick={onCopy}
            className={`px-3 py-1.5 rounded text-xs font-medium uppercase font-mono transition-all duration-150 shrink-0 border cursor-pointer ${
              isCopied
                ? isAntigravity
                  ? "border-cyan-500/40 bg-cyan-500/5 text-cyan-400"
                  : "border-blue-500/40 bg-blue-500/5 text-blue-400"
                : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
            }`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="relative rounded bg-zinc-950 p-4 border border-zinc-900 overflow-hidden">
          <pre className="overflow-x-auto text-xs font-mono text-zinc-300 whitespace-pre scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {example.command}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm rounded-md transition-all">
      <div className="space-y-1">
        <div className="font-medium text-zinc-200">{example.title}</div>
        {example.description && (
          <div className="text-zinc-500 text-xs font-normal leading-relaxed">
            {example.description}
          </div>
        )}
      </div>
      <div
        onClick={onCopy}
        className={`w-full md:w-auto font-mono bg-zinc-950 border px-3 py-1.5 text-zinc-300 rounded font-medium flex items-center justify-between gap-3 cursor-pointer shrink-0 active:scale-95 transition-all text-sm ${
          isCopied
            ? isAntigravity
              ? "border-cyan-500/40 bg-cyan-500/5 text-cyan-400"
              : "border-blue-500/40 bg-blue-500/5 text-blue-400"
            : "border-zinc-900 hover:border-zinc-800"
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onCopy();
          }
        }}
      >
        <code className="font-mono text-zinc-300">{example.command}</code>
        <span className="text-xs text-zinc-550 uppercase select-none font-medium">
          {isCopied ? "Copied" : "Copy"}
        </span>
      </div>
    </div>
  );
}
