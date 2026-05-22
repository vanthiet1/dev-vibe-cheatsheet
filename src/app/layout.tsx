import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-BPRDQR0BPS";

  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var ua = navigator.userAgent || '';
                var isBot = /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|lighthouse|lighthouse-speed/i.test(ua);
                if (isBot) return;

                // Chặn chuột phải ngay lập tức trước khi paint DOM
                document.addEventListener('contextmenu', function(e) {
                  e.preventDefault();
                }, false);

                // Chặn phím Inspect phím tắt xem nguồn ngay lập tức
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'F12' || e.keyCode === 123) {
                    e.preventDefault();
                    return false;
                  }
                  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                    e.preventDefault();
                    return false;
                  }
                  if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
                    e.preventDefault();
                    return false;
                  }
                  if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
                    e.preventDefault();
                    return false;
                  }
                }, false);
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
