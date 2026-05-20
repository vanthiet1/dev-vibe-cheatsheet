import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dev-CheatSheet — CLI Command Reference for Developers",
    template: "%s | Dev-CheatSheet",
  },
  description:
    "Tra cứu nhanh lệnh Git, PowerShell, CMD và Antigravity CLI. Cheatsheet dành cho lập trình viên với ví dụ thực tế, giải thích tham số và hỗ trợ copy nhanh.",
  keywords: [
    "git cheatsheet",
    "powershell commands",
    "cmd commands",
    "developer tools",
    "cli reference",
    "git commands",
    "terminal cheatsheet",
    "antigravity cli",
    "dev-vibe-cheatsheet",
  ],
  authors: [
    {
      name: "vanthiet",
      url: "https://github.com/vanthiet1",
    },
  ],
  creator: "vanthiet",
  openGraph: {
    title: "Dev-CheatSheet — CLI Command Reference for Developers",
    description:
      "Tra cứu nhanh lệnh Git, PowerShell, CMD. Cheatsheet dành cho lập trình viên với ví dụ thực tế.",
    siteName: "Dev-CheatSheet",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
