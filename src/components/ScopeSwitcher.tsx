import type { ScopeGroup } from "@/types";

interface ScopeSwitcherProps {
  selectedGroup: ScopeGroup;
  onGroupChange: (group: ScopeGroup) => void;
}

const SCOPE_TABS: {
  key: ScopeGroup;
  label: string;
  icon: React.ReactNode;
  activeClass: string;
  inactiveHover: string;
}[] = [
  {
    key: "all",
    label: "Tất cả",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    activeClass: "bg-zinc-800 text-zinc-50 border-zinc-700 shadow-md shadow-zinc-900/50",
    inactiveHover: "hover:bg-zinc-900/60 hover:text-zinc-300",
  },
  {
    key: "git",
    label: "Git",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.38 11.41L12.59 1.62c-.78-.78-2.05-.78-2.83 0L7.75 3.63l3.29 3.29c.8-.26 1.71-.06 2.33.56.62.62.82 1.53.56 2.33l3.29 3.29c.8-.26 1.71-.06 2.33.56.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.62-.62-.82-1.53-.56-2.33l-3.29-3.29c-.26.26-.61.43-.99.49l-.01.01c-.13 3.19-.13 3.19-.07 3.3l3.28 3.28c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83l-3.28-3.28c-.06-.11-.06-.11-.06-3.32-.38-.06-.73-.23-.99-.49-.62-.62-.82-1.53-.56-2.33L6.96 6.84 1.62 12.18c-.78.78-.78 2.05 0 2.83l9.79 9.79c.78.78 2.05.78 2.83 0l9.79-9.79c.79-.79.79-2.05.35-2.6z" />
      </svg>
    ),
    activeClass: "bg-orange-950/40 text-orange-300 border-orange-700/60 shadow-md shadow-orange-950/30",
    inactiveHover: "hover:bg-orange-950/15 hover:text-orange-400/80",
  },
  {
    key: "terminal",
    label: "Terminal",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    activeClass: "bg-emerald-950/40 text-emerald-300 border-emerald-700/60 shadow-md shadow-emerald-950/30",
    inactiveHover: "hover:bg-emerald-950/15 hover:text-emerald-400/80",
  },
  {
    key: "antigravity",
    label: "Antigravity",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    activeClass: "bg-cyan-950/40 text-cyan-300 border-cyan-700/60 shadow-md shadow-cyan-950/30",
    inactiveHover: "hover:bg-cyan-950/15 hover:text-cyan-400/80",
  },
];

export default function ScopeSwitcher({
  selectedGroup,
  onGroupChange,
}: ScopeSwitcherProps) {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
        🔌 Scope / Công cụ
      </h3>
      <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-zinc-950 border border-zinc-800/60 rounded-lg">
        {SCOPE_TABS.map((tab) => {
          const isActive = selectedGroup === tab.key;
          
          // Determine brand colors based on active state
          let currentIconColor = "";
          if (tab.key === "all") {
            currentIconColor = isActive ? "text-zinc-50" : "text-zinc-500 group-hover:text-zinc-300";
          } else if (tab.key === "git") {
            currentIconColor = isActive ? "text-[#F05032]" : "text-[#F05032]/60 group-hover:text-[#F05032]";
          } else if (tab.key === "terminal") {
            currentIconColor = isActive ? "text-emerald-400" : "text-emerald-500/60 group-hover:text-emerald-400";
          } else if (tab.key === "antigravity") {
            currentIconColor = isActive ? "text-cyan-400" : "text-cyan-500/60 group-hover:text-cyan-400";
          }

          return (
            <button
              key={tab.key}
              onClick={() => onGroupChange(tab.key)}
              aria-pressed={isActive}
              className={`relative py-2 px-2.5 text-[11px] sm:text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border group ${
                isActive
                  ? `${tab.activeClass} font-bold`
                  : `border-transparent text-zinc-500 ${tab.inactiveHover}`
              }`}
            >
              <span className={`${currentIconColor} flex items-center shrink-0 transition-colors duration-150`}>
                {tab.icon}
              </span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
