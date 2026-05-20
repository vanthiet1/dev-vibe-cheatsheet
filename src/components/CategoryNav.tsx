import type { ICategory, ICommand } from "@/types";
import { getCategoryIcon } from "@/utils/categoryHelpers";

interface CategoryGroupProps {
  label: string;
  labelIcon: React.ReactNode;
  borderColor: string;
  categories: ICategory[];
  commandsByCategory: Record<string, ICommand[]>;
  expandedCategories: Record<string, boolean>;
  activeCommandId: string | undefined;
  isAntigravity?: boolean;
  onToggleCategory: (categoryId: string) => void;
  onSelectCommand: (commandId: string) => void;
}

function CategoryIcon({ slug, color }: { slug: string; color?: string }) {
  const icon = getCategoryIcon(slug, color);
  return (
    <svg
      className={icon.className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={icon.color}
      strokeWidth={2.2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icon.d} />
      {icon.d2 && (
        <path strokeLinecap="round" strokeLinejoin="round" d={icon.d2} />
      )}
    </svg>
  );
}

function CategoryGroup({
  label,
  labelIcon,
  borderColor,
  categories,
  commandsByCategory,
  expandedCategories,
  activeCommandId,
  isAntigravity = false,
  onToggleCategory,
  onSelectCommand,
}: CategoryGroupProps) {
  return (
    <div className="space-y-1.5">
      <div
        className={`px-2 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-l ${borderColor} ml-1 flex items-center gap-2`}
      >
        {labelIcon}
        <span>{label}</span>
      </div>
      <div className="space-y-1 pl-1">
        {categories.map((cat) => {
          const catCommands = commandsByCategory[cat._id] || [];
          if (catCommands.length === 0) return null;
          const isExpanded = !!expandedCategories[cat._id];

          return (
            <div key={cat._id} className="space-y-0.5">
              <button
                onClick={() => onToggleCategory(cat._id)}
                className="w-full text-left px-2 py-1.5 text-[13px] rounded transition-all duration-200 font-medium flex items-center justify-between cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2 truncate">
                  <CategoryIcon slug={cat.slug} color={cat.color} />
                  <span className="truncate">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-800/80">
                    {catCommands.length}
                  </span>
                  <svg
                    className={`h-2.5 w-2.5 text-zinc-500 transition-transform duration-150 ${
                      isExpanded ? "rotate-90 text-zinc-300" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
              {isExpanded && (
                <div className="space-y-0.5 ml-1 pb-1 transition-all duration-150 pl-1.5 border-l border-zinc-900">
                  {catCommands.map((cmd) => {
                    const isSelected = activeCommandId === cmd._id;
                    const selectedClass = isAntigravity
                      ? "text-cyan-400 bg-cyan-950/15 border-l-2 border-cyan-500 font-medium"
                      : "text-blue-400 bg-blue-950/15 border-l-2 border-blue-500 font-medium";

                    return (
                      <button
                        key={cmd._id}
                        onClick={() => onSelectCommand(cmd._id)}
                        className={`w-full text-left text-xs rounded transition-all duration-150 py-1.5 px-2.5 flex items-start gap-1.5 cursor-pointer font-mono ${
                          isSelected
                            ? selectedClass
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/25 border-l border-zinc-800"
                        }`}
                      >
                        <span className="text-zinc-700 select-none">
                          &gt;
                        </span>
                        <span className="truncate" title={cmd.command}>
                          {cmd.command}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main CategoryNav ───────────────────────────────────────────────────────

interface CategoryNavProps {
  selectedGroup: string;
  gitCategories: ICategory[];
  terminalCategories: ICategory[];
  antigravityCategories: ICategory[];
  commandsByCategory: Record<string, ICommand[]>;
  expandedCategories: Record<string, boolean>;
  activeCommandId: string | undefined;
  hasActiveFilters: boolean;
  onToggleCategory: (categoryId: string) => void;
  onSelectCommand: (commandId: string) => void;
  onResetFilters: () => void;
}

export default function CategoryNav({
  selectedGroup,
  gitCategories,
  terminalCategories,
  antigravityCategories,
  commandsByCategory,
  expandedCategories,
  activeCommandId,
  hasActiveFilters,
  onToggleCategory,
  onSelectCommand,
  onResetFilters,
}: CategoryNavProps) {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
        I - Danh mục &amp; Lệnh
      </h3>
      <nav className="space-y-4" aria-label="Command categories">
        {/* Git Accordion Group */}
        {(selectedGroup === "all" || selectedGroup === "git") && (
          <CategoryGroup
            label="Git & GitHub"
            labelIcon={
              <svg
                className="h-4 w-4 shrink-0 text-[#F05032]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.38 11.41L12.59 1.62c-.78-.78-2.05-.78-2.83 0L7.75 3.63l3.29 3.29c.8-.26 1.71-.06 2.33.56.62.62.82 1.53.56 2.33l3.29 3.29c.8-.26 1.71-.06 2.33.56.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.62-.62-.82-1.53-.56-2.33l-3.29-3.29c-.26.26-.61.43-.99.49l-.01.01c-.13 3.19-.13 3.19-.07 3.3l3.28 3.28c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83l-3.28-3.28c-.06-.11-.06-.11-.06-3.32-.38-.06-.73-.23-.99-.49-.62-.62-.82-1.53-.56-2.33L6.96 6.84 1.62 12.18c-.78.78-.78 2.05 0 2.83l9.79 9.79c.78.78 2.05.78 2.83 0l9.79-9.79c.79-.79.79-2.05.35-2.6z" />
              </svg>
            }
            borderColor="border-blue-500/50"
            categories={gitCategories}
            commandsByCategory={commandsByCategory}
            expandedCategories={expandedCategories}
            activeCommandId={activeCommandId}
            onToggleCategory={onToggleCategory}
            onSelectCommand={onSelectCommand}
          />
        )}

        {/* Terminal/CMD Accordion Group */}
        {(selectedGroup === "all" || selectedGroup === "terminal") && (
          <div className="pt-2 border-t border-zinc-900/60">
            <CategoryGroup
              label="Terminal & CMD"
              labelIcon={
                <svg
                  className="h-4 w-4 shrink-0 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              borderColor="border-emerald-500/50"
              categories={terminalCategories}
              commandsByCategory={commandsByCategory}
              expandedCategories={expandedCategories}
              activeCommandId={activeCommandId}
              onToggleCategory={onToggleCategory}
              onSelectCommand={onSelectCommand}
            />
          </div>
        )}

        {/* Antigravity Accordion Group */}
        {(selectedGroup === "all" || selectedGroup === "antigravity") && (
          <div className="pt-2 border-t border-zinc-900/60">
            <CategoryGroup
              label="Antigravity"
              labelIcon={
                <svg
                  className="h-4 w-4 shrink-0 text-cyan-400 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3L2 12h10L8 21l14-9H12l4-9z"
                  />
                </svg>
              }
              borderColor="border-cyan-500/50"
              categories={antigravityCategories}
              commandsByCategory={commandsByCategory}
              expandedCategories={expandedCategories}
              activeCommandId={activeCommandId}
              isAntigravity
              onToggleCategory={onToggleCategory}
              onSelectCommand={onSelectCommand}
            />
          </div>
        )}
      </nav>

      {/* Quick Helper Panel */}
      <div className="border-t border-zinc-800/80 pt-6 px-2 text-sm text-zinc-500 leading-relaxed space-y-2.5 hidden lg:block">
        <p>Click vào dòng lệnh hoặc ví dụ để sao chép nhanh vào Clipboard.</p>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="w-full text-center py-1.5 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-md transition-colors text-sm font-medium cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
