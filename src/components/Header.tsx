import Image from "next/image";
import logo from "../app/favicon.ico";

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
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain rounded-full"
            />
            DEV-VIBE-CHEATSHEET
          </h1>
        </div>
      </div>
    </header>
  );
}
