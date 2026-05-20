export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-3">
          {/* Copyright */}
          <p className="text-sm text-zinc-500 font-mono tracking-wide">
            &copy; {currentYear}{" "}
            <span className="text-zinc-300 font-semibold">Dev-Vibe-CheatSheet</span>{" "}
            by{" "}
            <a
              href="https://github.com/vanthiet1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
              aria-label="Visit @vanthiet GitHub profile"
            >
              @vanthiet
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
