interface LoadingStateProps {
  hasCategories: boolean;
  onResetFilters: () => void;
}

export function LoadingSpinner() {
  return (
    <div className="border border-zinc-800/80 bg-zinc-900/20 p-16 text-center flex flex-col items-center justify-center gap-3 rounded-md">
      <svg
        className="animate-spin h-5 w-5 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="text-xs text-zinc-500">
        Đang tải danh sách câu lệnh...
      </span>
    </div>
  );
}

export function EmptyState({
  onResetFilters,
}: Omit<LoadingStateProps, 'hasCategories'>) {
  return (
    <div className="border border-zinc-800 bg-zinc-900/20 p-12 text-center rounded-md">
      <p className="text-sm text-zinc-400 mb-4">
        Không tìm thấy câu lệnh nào khớp với bộ lọc hiện tại.
      </p>
      <button
        onClick={onResetFilters}
        className="px-3.5 py-1.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all rounded-md text-xs cursor-pointer active:scale-95"
      >
        Đặt lại bộ lọc
      </button>
    </div>
  );
}
