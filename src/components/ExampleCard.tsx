import type { IExample } from "@/types";
import TerminalSimulator from "./TerminalSimulator";
import { generateTerminalScript } from "@/utils/terminalScripts";

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
  const terminalScript = generateTerminalScript(example.command);

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
            className={`px-3 py-1.5 rounded text-xs font-medium uppercase font-mono transition-all duration-155 border cursor-pointer select-none active:scale-95 shrink-0 ${
              isCopied
                ? isAntigravity
                  ? "border-cyan-500/40 bg-cyan-500/5 text-cyan-400"
                  : "border-blue-500/40 bg-blue-500/5 text-blue-400"
                : "border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-300"
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

        {/* Permanent Terminal Simulator */}
        <div className="mt-1 space-y-1.5">
          <div className="text-[11px] text-zinc-500 font-semibold font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            GIẢ LẬP KẾT QUẢ CHẠY:
          </div>
          <TerminalSimulator script={terminalScript} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 p-3.5 flex flex-col gap-3 text-sm rounded-md transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="font-medium text-zinc-200">{example.title}</div>
          {example.description && (
            <div className="text-zinc-500 text-xs font-normal leading-relaxed">
              {example.description}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          {/* Copy Button with command */}
          <div
            onClick={onCopy}
            className={`w-full md:w-auto font-mono bg-zinc-950 border px-3 py-1.5 text-zinc-300 rounded font-medium flex items-center justify-between gap-3 cursor-pointer active:scale-95 transition-all text-xs ${
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
            <code className="font-mono text-zinc-300 truncate max-w-[200px] md:max-w-[320px]">
              {example.command}
            </code>
            <span className="text-[10px] text-zinc-550 uppercase select-none font-medium shrink-0 ml-2">
              {isCopied ? "Copied" : "Copy"}
            </span>
          </div>
        </div>
      </div>

      {/* Permanent Terminal Simulator */}
      <div className="mt-1 space-y-1.5">
        <div className="text-[11px] text-zinc-500 font-semibold font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          GIẢ LẬP KẾT QUẢ CHẠY:
        </div>
        <TerminalSimulator script={terminalScript} />
      </div>
    </div>
  );
}

