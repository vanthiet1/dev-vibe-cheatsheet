"use client";

import { useState, useEffect, useRef } from "react";

function RedoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

interface TerminalSimulatorProps {
  script: string[];
}

export default function TerminalSimulator({ script }: TerminalSimulatorProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal content
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, typedCommand]);

  const startAnimation = () => {
    setLines([]);
    setCurrentLineIndex(0);
    setTypedCommand("");
    setIsFinished(false);
    setIsTyping(false);
  };

  // Run the animation loop
  useEffect(() => {
    if (script.length === 0 || isFinished) return;

    const currentItem = script[currentLineIndex];

    if (!currentItem) {
      setIsFinished(true);
      return;
    }

    if (currentItem.startsWith("$ ")) {
      // It's a command input, play typing animation
      setIsTyping(true);
      const commandText = currentItem.substring(2);
      let charIndex = 0;
      setTypedCommand("");

      const typingTimer = setInterval(() => {
        const currentChar = commandText[charIndex];
        setTypedCommand((prev) => prev + currentChar);
        charIndex++;

        if (charIndex >= commandText.length) {
          clearInterval(typingTimer);
          setIsTyping(false);
          // Add the completed command line to output list
          setLines((prev) => [...prev, `$ ${commandText}`]);
          setTypedCommand("");
          // Move to next line after a small pause
          setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
          }, 600);
        }
      }, 50); // Speed of typing

      return () => clearInterval(typingTimer);
    } else {
      // It's command output, print it immediately or line-by-line
      const delay = currentItem.includes("Waiting") || currentItem.includes("loading") ? 1200 : 350;
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, currentItem]);
        setCurrentLineIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, script, isFinished]);

  // Infinite looping effect
  useEffect(() => {
    if (!isFinished) return;

    const timer = setTimeout(() => {
      startAnimation();
    }, 3500); // 3.5 seconds delay before looping

    return () => clearTimeout(timer);
  }, [isFinished]);

  // Run on mount
  useEffect(() => {
    startAnimation();
  }, [script]);

  const getLineColorClass = (line: string) => {
    if (line.startsWith("$ ")) return "text-zinc-100 font-semibold";
    const lower = line.toLowerCase();
    if (lower.includes("success") || lower.includes("succeeded") || lower.includes("done") || line.includes("✓")) {
      return "text-emerald-400";
    }
    if (lower.includes("error") || lower.includes("failed") || line.includes("✗")) {
      return "text-red-400 font-medium";
    }
    if (lower.includes("warning") || lower.includes("warn") || line.includes("⚠")) {
      return "text-amber-400";
    }
    if (lower.includes("info") || lower.includes("running") || lower.includes("loading") || line.includes("ℹ")) {
      return "text-cyan-400";
    }
    return "text-zinc-400";
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl font-mono text-sm relative group flex flex-col max-h-[200px]">
      {/* Top Window Bar */}
      <div className="bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[11px] text-zinc-500 font-medium select-none">antigravity@terminal:~</span>
        <button
          onClick={startAnimation}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5 rounded cursor-pointer"
          title="Chạy lại animation"
        >
          <RedoIcon className="text-xs" />
        </button>
      </div>

      {/* Terminal View Output */}
      <div
        ref={containerRef}
        className="p-3.5 overflow-y-auto overflow-x-hidden flex-1 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent text-[12.5px] leading-relaxed"
      >
        {lines.map((line, idx) => (
          <div key={idx} className={`${getLineColorClass(line)} whitespace-pre-wrap break-words`}>
            {line}
          </div>
        ))}

        {/* Cursor / Typing command indicator */}
        {isTyping && (
          <div className="text-zinc-100 font-semibold flex items-center whitespace-pre-wrap break-words">
            <span>$ {typedCommand}</span>
            <span className="w-1.5 h-3.5 bg-zinc-400 ml-0.5 animate-pulse" />
          </div>
        )}

        {/* Finished / Idle indicator */}
        {isFinished && (
          <div className="text-zinc-500 flex items-center gap-1.5 pt-1.5 border-t border-zinc-900/50 mt-1.5 text-[11px]">
            <span className="w-1.2 h-1.2 rounded-full bg-emerald-500" />
            <span>Đã hoàn thành phiên làm việc.</span>
            <button
              onClick={startAnimation}
              className="text-blue-500 hover:text-blue-400 ml-2 cursor-pointer font-medium hover:underline flex items-center gap-0.5"
            >
              <RedoIcon className="text-[9px]" /> Chạy lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
