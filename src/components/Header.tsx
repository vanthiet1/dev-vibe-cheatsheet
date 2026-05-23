"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../app/favicon.ico";

// Custom Premium Icons
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
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
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
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
        d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L18 14l-6.857 2.286L9 23l-2.286-6.857L0 14l6.857-2.286L9 5z"
      />
    </svg>
  );
}

interface HeaderProps {
  seeding?: boolean;
  onRunSeeding?: () => void;
}

export default function Header({ seeding = false, onRunSeeding }: HeaderProps) {
  const pathname = usePathname();
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountNumber = "1026696842";
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const local =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "[::1]";
      Promise.resolve().then(() => {
        setIsLocal(local);
      });
    }
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDonateOpen(false);
      }
    };
    if (isDonateOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDonateOpen]);

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40 px-3 md:px-6 py-2.5">
        <div className="max-w-8xl mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 select-none hover:opacity-90 transition-opacity">
              <Image
                src={logo}
                alt="Logo"
                width={32}
                height={32}
                className="object-contain rounded-full border border-zinc-800/80 p-0.5 bg-zinc-900 shrink-0"
              />
              <h1 className="hidden sm:flex text-zinc-50 font-bold text-sm tracking-tight items-center gap-2">
                <span className="hidden md:inline bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent uppercase">
                  DEV-VIBE-CHEATSHEET
                </span>
                <span className="md:hidden bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent uppercase">
                  DEV-VIBE
                </span>
              </h1>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 p-0.5 bg-zinc-900/60 border border-zinc-800/60 rounded-xl text-xs backdrop-blur shadow-inner shrink-0">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  pathname === "/"
                    ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent"
                }`}
              >
                <TerminalIcon className={`text-sm shrink-0 ${pathname === "/" ? "text-blue-400" : "text-zinc-500"}`} />
                <span className="hidden sm:inline">Cheatsheet</span>
                <span className="sm:hidden">Cheat</span>
              </Link>
              <Link
                href="/ai-config"
                className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  pathname === "/ai-config"
                    ? "bg-gradient-to-r from-violet-500/10 to-violet-600/10 text-violet-400 border border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.08)]"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent"
                }`}
              >
                <SparklesIcon className={`text-sm shrink-0 ${pathname === "/ai-config" ? "text-violet-400" : "text-zinc-500"}`} />
                <span className="hidden sm:inline">Cấu hình Agent Antigravity</span>
                <span className="sm:hidden">Cấu hình Agent</span>
              </Link>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            {/* Database Seed Button */}
            {isLocal && onRunSeeding && (
              <button
                onClick={onRunSeeding}
                disabled={seeding}
                className="px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300 disabled:opacity-50 transition-all duration-150 cursor-pointer flex items-center gap-1.5 active:scale-95 select-none shrink-0"
                title="Seed hoặc đặt lại dữ liệu cơ sở dữ liệu mẫu"
              >
                {seeding ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    <span className="hidden sm:inline">Seeding...</span>
                  </>
                ) : (
                  <>
                    <DatabaseIcon className="text-zinc-450 text-sm sm:text-xs shrink-0" />
                    <span className="hidden sm:inline">Đặt lại Database</span>
                  </>
                )}
              </button>
            )}

            {/* Premium Glowing Donate Button */}
            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-2.5 sm:px-4 py-1.5 rounded-md text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 hover:-translate-y-0.5 select-none shrink-0"
              title="Ủng hộ tác giả"
            >
              <HeartIcon className="text-sm text-red-100 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Ủng hộ tác giả</span>
            </button>
          </div>
        </div>
      </header>

      {/* Donate Glassmorphic Modal overlay */}
      {isDonateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in px-4">
          {/* Click outside container to close modal */}
          <div
            className="absolute inset-0 cursor-default"
            onClick={() => setIsDonateOpen(false)}
          />

          {/* Modal box */}
          <div className="relative bg-zinc-950/95 border border-zinc-800/80 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.85)] max-w-[450px] w-full overflow-hidden animate-scale-up z-10 flex flex-col">
            {/* Top decorative gradient bar */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600" />

            {/* Modal Header */}
            <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/10">
              <h3 className="text-zinc-100 font-bold text-sm tracking-wider flex items-center gap-2">
                <HeartIcon className="text-emerald-500 animate-pulse text-base" />
                ỦNG HỘ TÁC GIẢ (DONATE)
              </h3>
              <button
                onClick={() => setIsDonateOpen(false)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded-md cursor-pointer hover:bg-zinc-900/50"
              >
                <CloseIcon className="text-base" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col items-center gap-4 text-center">
              <p className="text-[12px] text-zinc-400 leading-relaxed max-w-[360px]">
                Sự đóng góp của bạn là nguồn động viên cực kỳ to lớn để mình
                tiếp tục duy trì dự án, cập nhật thêm nhiều phím tắt và cải tiến
              </p>

              {/* QR Code Presentation Frame */}
              <div className="w-[280px] h-[400px] rounded-xl border border-zinc-800/80 bg-zinc-900/10 shadow-inner flex items-center justify-center transition-all duration-300 hover:scale-[1.015] relative group/qr overflow-hidden">
                <Image
                  src="/bank.jpg"
                  alt="Bank QR Code"
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-300"
                  priority
                />
              </div>

              {/* Bank Transfer Details Box */}
              <div className="w-full bg-zinc-900/40 border border-zinc-900 rounded-lg p-3.5 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Ngân hàng:</span>
                  <span className="font-semibold text-zinc-200">
                    Vietcombank
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Chủ tài khoản:</span>
                  <span className="font-semibold text-zinc-200 uppercase tracking-wide">
                    NGUYEN VAN THIET
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-900 pt-2 text-zinc-400">
                  <span>Số tài khoản:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-emerald-400 text-sm tracking-wider select-all">
                      {accountNumber}
                    </span>
                    <button
                      onClick={handleCopyAccount}
                      className="text-zinc-500 hover:text-emerald-400 hover:bg-zinc-850 p-1 rounded transition-all cursor-pointer"
                      title="Sao chép số tài khoản"
                    >
                      {copied ? (
                        <CheckIcon className="text-emerald-500" />
                      ) : (
                        <CopyIcon className="text-xs" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Decorative Note */}
            <div className="px-5 py-3 border-t border-zinc-900 bg-zinc-900/20 text-center">
              <span className="text-[10px] text-zinc-550 select-none">
                Chân thành cảm ơn sự đồng hành và hỗ trợ của bạn! ❤️
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
