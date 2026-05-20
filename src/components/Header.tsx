import Image from "next/image";
interface HeaderProps {
  seeding: boolean;
  onRunSeeding: () => void;
}

export default function Header({ seeding, onRunSeeding }: HeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40 px-6 py-3.5">
      <div className="max-w-8xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-zinc-50 before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4 before:from-blue-500 before:via-cyan-500 before:to-blue-600 before:opacity-15 before:mix-blend-hard-light font-semibold text-base tracking-tight flex items-center gap-2">
            <Image
              src="/logo_web.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain rounded-full"
            />
            DEV-VIBE-CHEATSHEET
          </h1>
          <span className="text-xs uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-medium">
            v1.0.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRunSeeding}
            disabled={seeding}
            className={`text-sm font-medium px-3 py-1.5 border rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95 ${
              seeding
                ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-50 hover:border-zinc-700"
            }`}
          >
            {seeding ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5"
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
                <span>Seeding DB...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"
                  />
                </svg>
                <span>Re-seed Database</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
