import type { ICommand, ICategory } from "@/types";
import { isAntigravityCategory } from "@/utils/categoryHelpers";
import CommandCodeBlock from "./CommandCodeBlock";
import ExampleCard from "./ExampleCard";

interface CommandDetailProps {
  command: ICommand;
  category: ICategory | undefined;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
  onBack?: () => void;
}

export default function CommandDetail({
  command,
  category,
  copiedId,
  onCopy,
  onBack,
}: CommandDetailProps) {
  const isAntigravity = category ? isAntigravityCategory(category) : false;
  const isCopied = copiedId === command._id;

  return (
    <section className="space-y-4">
      {/* Section Title & Mobile Back button */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2 px-1">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-300 hover:text-zinc-50 transition-all cursor-pointer select-none active:scale-95"
              aria-label="Go back to list"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Quay lại</span>
            </button>
          )}
          <h2
            className={`text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 ${isAntigravity ? "text-cyan-400" : "text-blue-500"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAntigravity ? "bg-cyan-400" : "bg-blue-500"}`}
            />
            <span>{category?.name || "Chi tiết lệnh"}</span>
          </h2>
        </div>
      </div>

      {/* Main Detail Command Card */}
      <article
        className={`bg-zinc-900/30 border transition-all duration-200 p-6 flex flex-col gap-4 rounded-md group relative animate-fade-in ${
          isAntigravity
            ? "border-cyan-900/30 hover:border-cyan-800/50"
            : "border-zinc-800/80 hover:border-zinc-800"
        }`}
      >
        {/* Top bar: Tags and Platform tags */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {command.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium font-mono ${isAntigravity ? "text-cyan-500/80" : "text-zinc-400"}`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {command.platforms.map((plat) => (
              <span
                key={plat}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase border ${
                  plat === "PowerShell"
                    ? "bg-blue-950/30 text-blue-400 border-blue-900/40"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800"
                }`}
              >
                {plat}
              </span>
            ))}
          </div>
        </div>

        {/* Header title */}
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-150">
            {command.title}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {command.description}
          </p>
        </div>

        {/* Main Interactive Command Codeblock */}
        <CommandCodeBlock
          command={command.command}
          isCopied={isCopied}
          isAntigravity={isAntigravity}
          onCopy={() => onCopy(command._id, command.command)}
        />

        {/* Command parameter explanation list */}
        {command.explanations && command.explanations.length > 0 && (
          <div className="mt-1 bg-zinc-950/20 border border-zinc-900 px-4 py-3 text-sm space-y-2 rounded-md">
            <div className="text-[11px] text-zinc-450 uppercase tracking-wider font-semibold border-b border-zinc-900 pb-1.5">
              Giải thích tham số
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pt-0.5">
              {command.explanations.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 items-start leading-relaxed text-sm"
                >
                  <code className="text-zinc-300 font-medium shrink-0 font-mono bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded text-xs">
                    {exp.param}
                  </code>
                  <span className="text-zinc-400">— {exp.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples section */}
        {command.examples && command.examples.length > 0 && (
          <div className="space-y-2 mt-1">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              Ví dụ thực tế
            </div>
            {command.examples.map((ex, idx) => {
              const exCopyId = `${command._id}-ex-${idx}`;
              return (
                <ExampleCard
                  key={idx}
                  example={ex}
                  isCopied={copiedId === exCopyId}
                  isAntigravity={isAntigravity}
                  onCopy={() => onCopy(exCopyId, ex.command)}
                />
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}
