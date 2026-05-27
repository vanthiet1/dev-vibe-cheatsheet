import React from "react";

// Brand SVG icons for Tech Stack buttons
export const TECH_ICONS: Record<string, React.ReactNode> = {
  // Languages
  typescript: <i className="devicon-typescript-plain colored text-sm shrink-0" />,
  javascript: <i className="devicon-javascript-plain colored text-sm shrink-0" />,
  python: <i className="devicon-python-plain colored text-sm shrink-0" />,
  go: <i className="devicon-go-plain colored text-sm shrink-0" />,
  rust: <i className="devicon-rust-plain text-[#e05a47] text-sm shrink-0" style={{ color: "#e05a47" }} />,
  csharp: <i className="devicon-csharp-plain colored text-sm shrink-0" />,
  react: <i className="devicon-react-original colored text-sm shrink-0" />,
  java: <i className="devicon-java-plain colored text-sm shrink-0" />,
  php: <i className="devicon-php-plain colored text-sm shrink-0" />,
  "react-native": <i className="devicon-react-original colored text-sm shrink-0 animate-[spin_8s_linear_infinite]" />,
  flutter: <i className="devicon-flutter-plain colored text-sm shrink-0" />,
  swift: <i className="devicon-swift-plain colored text-sm shrink-0" />,
  kotlin: <i className="devicon-kotlin-plain colored text-sm shrink-0" />,
  // Databases
  postgres: <i className="devicon-postgresql-plain colored text-sm shrink-0" />,
  mongodb: <i className="devicon-mongodb-plain colored text-sm shrink-0" />,
  sqlite: <i className="devicon-sqlite-plain colored text-sm shrink-0" />,
  mysql: <i className="devicon-mysql-plain colored text-sm shrink-0" />,
  redis: <i className="devicon-redis-plain colored text-sm shrink-0" />,
  // Frameworks
  "nextjs-app": <i className="devicon-nextjs-plain text-sm shrink-0" />,
  "react-vite": <i className="devicon-vitejs-plain colored text-sm shrink-0" />,
  nodejs: <i className="devicon-nodejs-plain colored text-sm shrink-0" />,
  springboot: <i className="devicon-spring-plain colored text-sm shrink-0" />,
  laravel: <i className="devicon-laravel-plain colored text-sm shrink-0" />,
  // UI Libraries
  "tailwind-v4": <i className="devicon-tailwindcss-plain colored text-sm shrink-0" />,
  shadcn: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="black" />
      <path d="m15 6-6 6M20 6l-10 10M17 16l-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  antd: <i className="devicon-antdesign-plain colored text-sm shrink-0" />,
  mui: <i className="devicon-materialui-plain colored text-sm shrink-0" />,
  // Testing
  jest: <i className="devicon-jest-plain colored text-sm shrink-0" />,
  playwright: <i className="devicon-playwright-plain colored text-sm shrink-0" />,
};
