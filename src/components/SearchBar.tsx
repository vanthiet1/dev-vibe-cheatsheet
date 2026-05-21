interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="relative mb-8 bg-zinc-900/40 border border-zinc-800/80 focus-within:border-blue-500 focus-within:bg-zinc-950 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200 rounded-md">
      <input
        id="search-commands"
        type="text"
        placeholder="Tìm kiếm lệnh, công dụng, cờ (e.g. proxy, config, user.name, Get-NetTCPConnection)..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full pl-16 pr-4 py-3.5 bg-transparent border-0 outline-none text-zinc-100 placeholder-zinc-500 text-base leading-relaxed"
        aria-label="Search commands"
      />
      {searchQuery && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors text-xs cursor-pointer"
          aria-label="Clear search"
        >
          [clear]
        </button>
      )}
    </div>
  );
}
