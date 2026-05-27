"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../app/favicon.ico";
import {
  HeartIcon,
  CloseIcon,
  CopyIcon,
  CheckIcon,
  DatabaseIcon,
  TerminalIcon,
  SparklesIcon,
} from "@/components/icons";


interface HeaderProps {
  seeding?: boolean;
  onRunSeeding?: () => void;
}

export default function Header({ seeding = false, onRunSeeding }: HeaderProps) {
  const pathname = usePathname();
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const accountNumber = "1026696842";
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const closedTimeStr = localStorage.getItem("dev-vibe-banner-v1.1.3-closed-time");
      
      // If closed using the old permanent flag, clear it so they see it now as requested
      const isClosedOld = localStorage.getItem("dev-vibe-banner-v1.1.3-closed");
      if (isClosedOld) {
        localStorage.removeItem("dev-vibe-banner-v1.1.3-closed");
        Promise.resolve().then(() => {
          setShowBanner(true);
        });
        return;
      }

      if (closedTimeStr) {
        const closedTime = parseInt(closedTimeStr, 10);
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - closedTime > oneWeek) {
          // 1 week has passed, show again
          localStorage.removeItem("dev-vibe-banner-v1.1.3-closed-time");
          Promise.resolve().then(() => {
            setShowBanner(true);
          });
        }
      } else {
        Promise.resolve().then(() => {
          setShowBanner(true);
        });
      }
    }
  }, []);

  const handleCloseBanner = () => {
    localStorage.setItem("dev-vibe-banner-v1.1.3-closed-time", Date.now().toString());
    setShowBanner(false);
  };

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
      {showBanner && (
        <div className="bg-gradient-to-r from-violet-950/90 via-[#1b0c33]/95 to-zinc-950 border-b border-violet-900/30 text-zinc-200 relative overflow-hidden py-2 px-4 select-none backdrop-blur animate-fade-in z-50">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left pr-8">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <span className="inline-flex items-center gap-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shrink-0">
                <SparklesIcon className="text-xs shrink-0" /> Update v1.1.3
              </span>
              <p className="text-[11px] text-zinc-300 leading-relaxed font-semibold">
                Đã ra mắt bản cập nhật <strong className="text-zinc-50 font-bold">Rules Compiler v1.1.3</strong>! Hỗ trợ Multiple Selection và mở rộng Tech Stack đa dạng: ReactJS, Spring Boot, Laravel, Mobile Frameworks (React Native, Flutter, Swift, Kotlin).
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseBanner}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/30 p-1 rounded-md transition-all cursor-pointer"
            title="Đóng thông báo"
          >
            <CloseIcon className="text-xs shrink-0" />
          </button>
        </div>
      )}
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
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-medium rounded bg-zinc-800 text-zinc-400 border border-zinc-700/30 select-none tracking-normal">
                  v1.1.3
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
