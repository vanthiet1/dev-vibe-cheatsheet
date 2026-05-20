interface ActiveFiltersProps {
  selectedGroup: string;
  selectedPlatform: string | null;
  searchQuery: string;
  onResetFilters: () => void;
}

export default function ActiveFilters({
  selectedGroup,
  selectedPlatform,
  searchQuery,
  onResetFilters,
}: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-800 px-4 py-2.5 rounded-md text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-zinc-400">Kết quả lọc:</span>
        {selectedGroup !== "all" && (
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium">
            scope:
            {selectedGroup === "git"
              ? "Git"
              : selectedGroup === "terminal"
                ? "CMD/Terminal"
                : "Antigravity"}
          </span>
        )}
        {selectedPlatform && (
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium">
            platform:{selectedPlatform}
          </span>
        )}
        {searchQuery && (
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium italic">
            &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
      <button
        onClick={onResetFilters}
        className="text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
      >
        Xóa bộ lọc [x]
      </button>
    </div>
  );
}
