"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom Icon Components for visual premium look
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Simple Copy Icon
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

// Simple Download Icon
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

// Lightning icon for premium AI vibe
function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// File Explorer Database Map definition
const filesByTab = {
  rules: [
    { path: ".antigravityrules", label: ".antigravityrules" },
    { path: ".editorconfig", label: ".editorconfig" }
  ],
  skills: [
    { path: "skills/clean-code/SKILL.md", label: "clean-code/SKILL.md" },
    { path: "skills/database-optimization/SKILL.md", label: "database-optimization/SKILL.md" },
    { path: "skills/testing-patterns/SKILL.md", label: "testing-patterns/SKILL.md" },
    { path: "skills/security-scanner/SKILL.md", label: "security-scanner/SKILL.md" }
  ],
  workflows: [
    { path: "workflows/debug.md", label: "debug.md" },
    { path: "workflows/test.md", label: "test.md" },
    { path: "workflows/verify.md", label: "verify.md" },
    { path: "workflows/coordinate.md", label: "coordinate.md" }
  ],
  gemini: [
    { path: "GEMINI.md", label: "GEMINI.md" }
  ]
};

export default function AiConfigPage() {
  // Option selectors state
  const [ide, setIde] = useState("antigravity-ide");
  const [framework, setFramework] = useState("nextjs-app");
  const [language, setLanguage] = useState("typescript");
  const [database, setDatabase] = useState("postgres");
  const [styling, setStyling] = useState("shadcn");
  const [testing, setTesting] = useState("jest");

  // Output format state: 'rules' | 'skills' | 'workflows' | 'gemini'
  const [outputTab, setOutputTab] = useState<"rules" | "skills" | "workflows" | "gemini">("rules");
  const [activeFile, setActiveFile] = useState(".antigravityrules");
  const [contentLanguage, setContentLanguage] = useState<"en" | "vi">("vi");
  const [copied, setCopied] = useState(false);

  // Tab change handler that automatically resets active file cleanly
  const handleTabChange = (tab: "rules" | "skills" | "workflows" | "gemini") => {
    setOutputTab(tab);
    setActiveFile(filesByTab[tab][0].path);
  };

  // Dynamic Content compiler
  const generatedData = useMemo(() => {
    // Labels for display
    const frameworkLabel = 
      framework === "nextjs-app" ? "Next.js (App Router)" :
      framework === "react-vite" ? "React (Vite)" : "Node.js (Backend API)";

    const languageLabel = 
      language === "typescript" ? "TypeScript (Strict)" :
      language === "javascript" ? "JavaScript (ES6+)" :
      language === "python" ? "Python (PEP 8)" :
      language === "go" ? "Go (Idiomatic)" :
      language === "rust" ? "Rust (Safe Core)" : "C# (.NET Core)";

    const dbLabel = 
      database === "postgres" ? "PostgreSQL" :
      database === "mongodb" ? "MongoDB" :
      database === "sqlite" ? "SQLite" :
      database === "mysql" ? "MySQL" : "Redis Cache";

    const stylingLabel = 
      styling === "tailwind-v4" ? "Tailwind CSS v4" :
      styling === "shadcn" ? "Shadcn UI" :
      styling === "antd" ? "Ant Design" : "Material UI (MUI)";

    const testingLabel = testing === "jest" ? "Jest / Vitest" : "Playwright E2E";

    const ideLabel = 
      ide === "antigravity-cli" ? "Antigravity CLI Agent" : "Antigravity IDE Config";

    // 1. Core Code Guidelines sections
    const isVi = contentLanguage === "vi";
    let frameworkSection = "";
    if (isVi) {
      if (framework === "nextjs-app") {
        frameworkSection = `- **Kiến trúc App Router trong Next.js:** Luôn ưu tiên Server Components để tải dữ liệu từ xa. Giữ cho các component phi trạng thái (stateless) nhiều nhất có thể.
- **Giảm thiểu Waterfalls:** Thực hiện các truy vấn cơ sở dữ liệu hoặc API song song bằng cách sử dụng Promise.all().
- **An toàn Hydration:** Tránh lỗi không khớp dữ liệu hiển thị (hydration mismatch). Không chèn các đoạn kiểm tra ngày/tháng hoặc window trong hàm render máy chủ đầu tiên.`;
      } else if (framework === "react-vite") {
        frameworkSection = `- **Mô hình Custom Hooks chức năng:** Dựa hoàn toàn vào các custom hooks chuẩn để xử lý side-effects. Giữ logic nghiệp vụ tách biệt hoàn toàn khỏi layout giao diện component.
- **Kiểm soát Render:** Bao bọc các tính toán nặng bên trong useMemo. Hạn chế tối đa việc re-render do thay đổi trạng thái context liên tục.`;
      } else {
        frameworkSection = `- **Xử lý I/O không chặn (Non-Blocking):** Viết các hàm controller xử lý bất đồng bộ async/await sạch sẽ. Phân tách rõ ràng file xử lý định tuyến (routing) và database.
- **Middleware Bảo mật:** Áp dụng rate-limiting, cấu hình an toàn CORS, và mã hóa các JSON headers bảo mật tại cổng API.`;
      }
    } else {
      if (framework === "nextjs-app") {
        frameworkSection = `- **Next.js App Router Architecture:** Always prefer Server Components for remote data fetching. Keep components stateless when possible.
- **Minimize Waterfalls:** Fetch database queries or API queries in parallel via Promise.all().
- **Hydration Safe:** Avoid hydration mismatches. Do not write date/window checks in initial server renders.`;
      } else if (framework === "react-vite") {
        frameworkSection = `- **Functional Hooks Pattern:** Rely exclusively on standard custom hooks for side effects. Keep business logic separate from component layouts.
- **Render Control:** Wrap heavy computations inside useMemo. Avoid excessive context state triggers.`;
      } else {
        frameworkSection = `- **Non-Blocking IO:** Write clean async/await controller actions. Keep routing handlers and database controller files separated.
- **Security Middleware:** Enforce rate-limiting, CORS protections, and secure JSON headers at API gates.`;
      }
    }

    let languageSection = "";
    if (isVi) {
      if (language === "typescript") {
        languageSection = `- **Kiểm tra kiểu dữ liệu nghiêm ngặt:** Cấm hoàn toàn từ khóa 'any'. Định nghĩa và export các cấu trúc interface/type rõ ràng và chuẩn xác.
- **Chữ ký hàm chuẩn chỉ:** Khai báo tường minh tất cả kiểu dữ liệu của tham số đầu vào và kiểu trả về của hàm.`;
      } else if (language === "javascript") {
        languageSection = `- **Cú pháp ES6 hiện đại:** Giải cấu trúc (destructure) thuộc tính đối tượng gọn gàng. Tránh lỗi hoisting do dùng từ khóa 'var'.
- **Phòng thủ an toàn:** Đảm bảo kiểm tra thuộc tính an toàn bằng optional chaining (?.) và nullish coalescing (??).`;
      } else if (language === "python") {
        languageSection = `- **Gợi ý kiểu (Type Hinting):** Khai báo rõ ràng kiểu dữ liệu cho biến và tham số. Trả về cấu trúc Union/Optional tường minh.
- **Tuân thủ PEP 8:** Đảm bảo khoảng cách chuẩn, sử dụng tên biến kiểu snake_case, và sắp xếp import gọn gàng.
- **Môi trường ảo:** Quản lý thư viện phụ thuộc nghiêm ngặt thông qua UV hoặc Poetry.`;
      } else if (language === "go") {
        languageSection = `- **Lập trình Go chuẩn mực:** Bắt buộc kiểm tra lỗi tường minh ngay sau mỗi tác vụ thực thi ('if err != nil'). Tuyệt đối không bỏ qua lỗi.
- **Mô hình đồng thời (Concurrency):** Sử dụng goroutines và channels an toàn. Hạn chế sử dụng khóa locks. Tối ưu hóa phân bổ struct.`;
      } else if (language === "rust") {
        languageSection = `- **An toàn quyền sở hữu (Ownership):** Tuân thủ nghiêm ngặt lifetime của biến và các giới hạn borrow checker. Tránh clone dữ liệu vô tội vạ.
- **Xử lý lỗi Monad:** Khớp mẫu và xử lý triệt để Option/Result. Không dùng hàm .unwrap() trong môi trường production.`;
      } else {
        languageSection = `- **Kích hoạt Nullable:** Bật chỉ thị '#nullable enable' trên toàn dự án để phòng tránh ngoại lệ tham chiếu null.
- **Tối ưu hóa LINQ:** Không chặn luồng đồng bộ bằng các tác vụ bất đồng bộ (không dùng .Result hoặc .Wait()). Tối ưu truy vấn dữ liệu với LINQ.
- **Tiêm phụ thuộc (Dependency Injection):** Áp dụng DI qua constructor một cách nhất quán trong toàn bộ kiến trúc ứng dụng.`;
      }
    } else {
      if (language === "typescript") {
        languageSection = `- **Strict Compiler Type Checks:** Banned 'any' keyword completely. Export precise, clean typescript interface/type structures.
- **Proper Signatures:** Explicitly declare all parameter types and function return signatures.`;
      } else if (language === "javascript") {
        languageSection = `- **Modern ES6 syntax:** Destructure object keys cleanly. Avoid classic 'var' hoisting bugs.
- **Defensive guards:** Ensure safe property checks using optional chaining (?.) and nullish coalescing (??).`;
      } else if (language === "python") {
        languageSection = `- **Type Hinting:** Annotate variable and parameter types explicitly. Return precise Union/Optional structures.
- **PEP 8 Compliance:** Strictly follow PEP 8 spacing, snake_case variable names, and clean import sorting.
- **Virtual Env:** Manage dependencies strictly via UV or Poetry.`;
      } else if (language === "go") {
        languageSection = `- **Idiomatic Go:** Enforce explicit error checking right after executions (\`if err != nil\`). Do not ignore errors.
- **Concurrent Patterns:** Safely use goroutines and channels. Avoid locks. Keep struct allocations optimized.`;
      } else if (language === "rust") {
        languageSection = `- **Ownership Safety:** Respect lifetime variables and strict borrow checking limits. Avoid unnecessary cloning.
- **Monad Errors:** Handle error states strictly using Option/Result matching. Keep unwrapping out of production source code.`;
      } else {
        languageSection = `- **Nullable Enablers:** Turn on \`#nullable enable\` globally. Prevent unexpected null reference exceptions.
- **LINQ optimization:** Avoid blocking async-over-sync tasks (no \`.Result\` or \`.Wait()\`). Optimize collections with LINQ.
- **Dependency Injection:** Enforce clear constructor dependency injection patterns throughout the application architecture.`;
      }
    }

    let databaseSection = "";
    if (isVi) {
      if (database === "postgres") {
        databaseSection = `- **Chỉ mục PostgreSQL:** Tạo chỉ mục chính xác cho mọi khóa ngoại phục vụ truy vấn. Tuyệt đối không quét toàn bảng (table scans).
- **Giao dịch an toàn:** Bao bọc các thay đổi dữ liệu nhiều bước trong Transaction. Giải phóng kết nối (connection pool) ngay sau khi xong.`;
      } else if (database === "mongodb") {
        databaseSection = `- **Thiết kế Schema tối giản:** Thiết kế các tài liệu Mongoose gọn gàng. Hạn chế lồng tài liệu quá sâu để tránh làm chậm pipeline tổng hợp.
- **Chống lỗi chèn tham số NoSQL:** Làm sạch và kiểm tra chặt chẽ các tham số từ client đầu vào.`;
      } else if (database === "sqlite") {
        databaseSection = `- **Chế độ đồng thời WAL:** Bật tính năng Write-Ahead Logging (WAL) để đảm bảo an toàn khi ghi đồng thời.
- **Ghi tuần tự an toàn:** Đảm bảo thực hiện tuần tự hóa các tác vụ ghi cơ sở dữ liệu để chống lỗi khóa DB hoàn toàn.`;
      } else if (database === "mysql") {
        databaseSection = `- **Công cụ InnoDB:** Đảm bảo tính toàn vẹn quan hệ chặt chẽ bằng khóa ngoại. Tối ưu hóa các mệnh đề JOIN an toàn.`;
      } else {
        databaseSection = `- **Không gian tên Key có cấu trúc:** Phân tách rõ ràng key bằng dấu hai chấm chuẩn: domain:id:field (ví dụ: user:1026:profile).
- **Thời hạn TTL bắt buộc:** Đặt thời gian sống (TTL) cụ thể cho mọi key để tránh rò rỉ bộ nhớ đệm RAM.`;
      }
    } else {
      if (database === "postgres") {
        databaseSection = `- **PostgreSQL Indexing:** Write precise indexes for every foreign key query. Never run massive table scans.
- **Clean Transactions:** Explicitly wrap multi-step entity changes inside transactional boundaries. Release connection pool clients cleanly.`;
      } else if (database === "mongodb") {
        databaseSection = `- **Document Schema Design:** Design lean, clean Mongoose documents. Avoid deep nesting to prevent slow aggregation query pipelines.
- **Anti-NoSQL Injections:** Sanitize raw client parameters to prevent query injection attacks.`;
      } else if (database === "sqlite") {
        databaseSection = `- **WAL Concurrency Mode:** Enforce Write-Ahead Logging (WAL) mode for simultaneous write safety.
- **Single-Thread Safety:** Ensure sequential database writers to completely prevent database locks.`;
      } else if (database === "mysql") {
        databaseSection = `- **InnoDB Engine:** Keep relational referential integrity tight using foreign keys. Optimize JOIN statements safely.`;
      } else {
        databaseSection = `- **Structured Key Namespaces:** Enforce key standard colon separation: \`domain:id:field\` (e.g. \`user:1026:profile\`).
- **TTL Enforcements:** Every cache key must have a precise, well-reasoned Time-to-Live (TTL) expiration set to prevent RAM bloat.`;
      }
    }

    let stylingSection = "";
    if (isVi) {
      if (styling === "tailwind-v4") {
        stylingSection = `- **Token CSS-First:** Định nghĩa và kế thừa các token thiết kế Tailwind CSS v4 ngay trong stylesheet chính của bạn.
- **Không dùng Inline Styles:** Tuyệt đối dùng các class Tailwind thay vì viết inline styles trực tiếp.`;
      } else if (styling === "shadcn") {
        stylingSection = `- **Thành phần Radix dễ tiếp cận:** Giữ các phần tử shadcn tùy biến cao, lắp ghép linh hoạt và tương thích tốt với trình đọc màn hình.
- **Hàm gộp cn() chuẩn:** Luôn bao bọc tất cả các style có điều kiện bên trong helper \`cn(...)\`.`;
      } else if (styling === "antd") {
        stylingSection = `- **Token thiết kế chuyên nghiệp:** Tùy biến màu sắc thương hiệu và layout đồng nhất thông qua ConfigProvider tokens.`;
      } else {
        stylingSection = `- **MUI Theme Đồng nhất:** Sử dụng cấu hình từ ThemeProvider. Tránh khai báo thủ công mã màu hoặc khoảng cách tùy tiện.`;
      }
    } else {
      if (styling === "tailwind-v4") {
        stylingSection = `- **CSS-First Tokens:** Apply Tailwind CSS v4 design tokens within your main stylesheet config.
- **No Inline Styles:** Use Tailwind classes rather than inline style objects. Keep styles clean and responsive.`;
      } else if (styling === "shadcn") {
        stylingSection = `- **Accessible Radix Primitives:** Keep shadcn elements customizable, composable, and accessible via screen readers.
- **Clean cn() Merging:** Wrap all conditional styles inside the utility helper \`cn(...)\`.`;
      } else if (styling === "antd") {
        stylingSection = `- **Corporate Design Tokens:** Adjust branding colors strictly using ConfigProvider tokens. Keep markup clean.`;
      } else {
        stylingSection = `- **MUI Theme Alignment:** Rely on ThemeProvider. Avoid hardcoded theme variables. Keep elements responsive.`;
      }
    }

    let content = "";
    let filename = activeFile.split("/").pop() || activeFile;

    // 2. Main File Generator router
    if (activeFile === ".antigravityrules") {
      if (isVi) {
        content = `# Hướng dẫn ${ideLabel} (.antigravityrules)
# Công nghệ: ${frameworkLabel} | ${languageLabel} | ${dbLabel} | ${stylingLabel}

Bạn đang hoạt động với vai trò là AI senior coding assistant cao cấp tích hợp trực tiếp trong không gian làm việc của ${ideLabel}. Bạn phải tuân thủ nghiêm ngặt các quy tắc sau:

## 1. Kiến trúc Mô-đun & Nguyên lý
- Giữ các hàm nhỏ, tập trung, đơn trách nhiệm và dễ tái sử dụng.
- Xây dựng phiên bản chạy được tối giản trước (MVP). Chỉ mở rộng thêm các tính năng sau khi đã chạy kiểm thử xác minh.
- Sử dụng tên biến và tên hàm rõ ràng, tự giải thích (self-documenting). Tránh bình luận giải giải thích dòng code hiển nhiên.

## 2. Quy chuẩn Framework (${frameworkLabel})
${frameworkSection}

## 3. Tiêu chuẩn Ngôn ngữ (${languageLabel})
${languageSection}

## 4. Quy tắc Cơ sở dữ liệu (${dbLabel})
${databaseSection}

## 5. Bố cục Giao diện & Styles (${stylingLabel})
${stylingSection}

## 6. Kiểm thử & Quản lý Chất lượng (${testingLabel})
- Tuân thủ quy chuẩn AAA (Arrange-Act-Assert) trong các file kiểm thử unit test.
- Chạy trình kiểm tra tĩnh và đảm bảo ứng dụng biên dịch thành công trước khi hoàn thành tác vụ.

${
  ide === "antigravity-cli"
    ? `## 7. Các câu lệnh riêng cho Antigravity CLI
- Thực hiện chạy trình kiểm tra tĩnh (static compilation check) nghiêm ngặt sau mỗi thay đổi mã nguồn.
- Sử dụng các script tự động để chứng minh tính đúng đắn qua kết quả thực thi thực tế.`
    : `## 7. Quy tắc tích hợp cho Antigravity IDE
- Tận dụng tối đa các panel trực quan và sơ đồ cây thư mục trong không gian làm việc.
- Đồng bộ hóa các thay đổi mã nguồn khớp với tiêu chuẩn của tệp .vscode/settings.json.`
}`;
      } else {
        content = `# ${ideLabel} Guidelines (.antigravityrules)
# Stack: ${frameworkLabel} | ${languageLabel} | ${dbLabel} | ${stylingLabel}

You are acting as the AI senior coding assistant integrated inside the ${ideLabel} workspace. You must strictly adhere to the following rules:

## 1. Modular Architecture & Principles
- Keep functions small, focused, single-responsibility, and reusable.
- Implement a minimal working version first. Build further iterations only after verification.
- Use clear, self-documenting variable and function names. Avoid redundant obvious comments.

## 2. Framework Guidelines (${frameworkLabel})
${frameworkSection}

## 3. Language Standards (${languageLabel})
${languageSection}

## 4. Database Rules (${dbLabel})
${databaseSection}

## 5. UI Layout & Styles (${stylingLabel})
${stylingSection}

## 6. Testing & Quality Control (${testingLabel})
- Follow the AAA (Arrange-Act-Assert) unit pattern in test files.
- Run typecheck lints and ensure the application compiles cleanly before declaring completion.

${
  ide === "antigravity-cli"
    ? `## 7. Antigravity CLI Specific Commands
- Run strict static compiler checks after every logical file mutation.
- Use automated verification scripts to ensure correctness through execution.`
    : `## 7. Antigravity IDE Integration Rules
- Leverage integrated visual panels and file trees.
- Align code changes with workspace settings.json standards.`
}`;
      }
    } else if (activeFile === ".editorconfig") {
      content = `# EditorConfig root setting
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{cs,py,go,rs}]
indent_style = space
indent_size = ${language === "python" || language === "csharp" ? "4" : "2"}
`;
    } else if (activeFile === "skills/clean-code/SKILL.md") {
      if (isVi) {
        content = `---
name: clean-code-skill
description: Quy chuẩn nghiêm ngặt để đảm bảo code dễ đọc, hàm ngắn gọn và tự giải thích trong ${languageLabel}.
when_to_use: "Luôn kích hoạt khi tạo mới hoặc chỉnh sửa bất kỳ tệp tin mã nguồn nào trong không gian làm việc."
allowed-tools: Read, Write, Grep
effort: low
---

# Đặc tả Kỹ năng Mô-đun - Viết Mã Sạch (skills/clean-code/SKILL.md)
# Đối tượng IDE: ${ideLabel}
# Ngôn ngữ: ${languageLabel}

Tài liệu này xác định các mô hình lập trình và kỳ vọng chất lượng mã nguồn đối với ngôn ngữ ${languageLabel}.

## 1. Quy ước đặt tên Biến & Phương thức
- Định dạng tên biến bắt buộc: ${
  language === "python" ? "snake_case (ví dụ: \`user_profile_id\`)" :
  language === "go" ? "camelCase (ví dụ: \`userProfileId\`) hoặc mô tả ngắn gọn" :
  language === "rust" ? "snake_case (ví dụ: \`user_profile_id\`)" :
  language === "csharp" ? "PascalCase cho phương thức (\`FetchUserData\`), camelCase cho biến cục bộ" :
  "camelCase (ví dụ: \`userProfileId\`)"
}
- Tuyệt đối không dùng các tiền tố lười biếng (như "temp" hoặc "data"). Hãy đặt tên mang tính mô tả cao.

## 2. Giữ hàm ngắn gọn và đơn nhiệm (Atomic)
- Một hàm hoặc phương thức không được vượt quá 25 dòng code.
- Nếu một hàm chứa quá nhiều điều kiện lồng nhau, hãy ngay lập tức tách nó thành một hook tiện ích hoặc phương thức private riêng.

## 3. Thích ứng theo Môi trường (${ideLabel})
- **Hành vi xử lý:** ${
  ide === "antigravity-cli"
    ? "Tự động bổ sung các comment ngắn gọn. Tuyệt đối không sinh mã thừa, tối ưu hóa các tệp tin lưu nháp trước khi lưu đè."
    : "Tương tác nhịp nhàng với các panel của IDE. Định nghĩa phím tắt kiểm tra lỗi nhanh trước khi lưu file thực tế."
}
`;
      } else {
        content = `---
name: clean-code-skill
description: Strict guidelines to enforce pristine readability, small methods, and self-documenting code in ${languageLabel}.
when_to_use: "Always on when creating or editing any source code file in this workspace."
allowed-tools: Read, Write, Grep
effort: low
---

# Modular Skill Specification - Clean Code (skills/clean-code/SKILL.md)
# IDE Target: ${ideLabel}
# Language: ${languageLabel}

This guideline defines the coding patterns and quality expectations for ${languageLabel}.

## 1. Variable & Method Naming Conventions
- Enforce strict variable names: ${
  language === "python" ? "snake_case (e.g. \`user_profile_id\`)" :
  language === "go" ? "camelCase (e.g. \`userProfileId\`) or short descriptors" :
  language === "rust" ? "snake_case (e.g. \`user_profile_id\`)" :
  language === "csharp" ? "PascalCase for methods (\`FetchUserData\`), camelCase for local variables" :
  "camelCase (e.g. \`userProfileId\`)"
}
- Do not use lazy prefixes (like "temp" or "data"). Be descriptive.

## 2. Keep Methods Tiny and Atomic
- A function or method should never exceed 25 lines of code.
- If a function contains nested conditions, immediately extract it into a separate utility hook or private method.

## 3. Paradigm Adaptations (${ideLabel})
- **Hành vi xử lý:** ${
  ide === "antigravity-cli"
    ? "Bổ sung các automated comments sạch. Tuyệt đối không sinh mã nguồn thừa thãi, tối ưu hóa các tệp tin lưu nháp trước khi lưu đè."
    : "Tương tác nhịp nhàng với IDE panels. Định nghĩa phím tắt kiểm tra lỗi nhanh trước khi lưu file thực tế."
}
`;
      }
    } else if (activeFile === "skills/database-optimization/SKILL.md") {
      if (isVi) {
        content = `---
name: database-optimization-skill
description: Các phương pháp tối ưu hóa truy vấn, transaction và chỉ mục cho ${dbLabel}.
when_to_use: "Sử dụng kỹ năng này bất cứ khi nào bạn viết câu truy vấn, tổng hợp dữ liệu hoặc quản lý kết nối đến ${dbLabel}."
allowed-tools: Read, Write, Grep, RunCommand
effort: medium
---

# Đặc tả Kỹ năng Mô-đun - Tối ưu Cơ sở Dữ liệu (skills/database-optimization/SKILL.md)
# Database: ${dbLabel}

Tài liệu này định nghĩa các mô hình truy vấn tối ưu nhất để tương tác sạch sẽ với ${dbLabel}.

## 1. Tối ưu hóa Kết nối
${
  database === "postgres" ? "- Duy trì một kết nối pool duy nhất được chia sẻ. Không bao giờ gọi \`pg.connect\` liên tục trong các vòng lặp." :
  database === "sqlite" ? "- Kích hoạt chế độ ghi đồng thời SQLite WAL. Tuyệt đối không ghi vào SQLite đồng thời từ các luồng khác nhau." :
  database === "mongodb" ? "- Đảm bảo các schema index được đăng ký chuẩn xác. Giới hạn số lượng tài liệu trả về chặt chẽ." :
  database === "mysql" ? "- Bắt buộc sử dụng công cụ InnoDB và thiết lập chỉ mục trên tất cả các khóa ngoại." :
  "- Thiết lập thời gian sống (TTL) rõ ràng cho dữ liệu để tránh rò rỉ RAM và tràn bộ nhớ đệm."
}

## 2. Ví dụ về Truy vấn Bất đồng bộ (${languageLabel})
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
${
  language === "typescript" || language === "javascript"
    ? `import { NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";

// Hàm xử lý lấy dữ liệu tối ưu hóa từ DB
export async function GET(request: Request) {
  try {
    const client = await getDbClient();
    const data = await client.query("SELECT id, name FROM items LIMIT 10");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`
    : language === "python"
    ? `import asyncio
from database import get_db_session

# Hàm bất đồng bộ lấy 10 bản ghi tối ưu
async def fetch_optimized_data():
    try:
        async with get_db_session() as session:
            result = await session.execute("SELECT id, name FROM items LIMIT 10")
            return {"success": True, "data": result.fetchall()}
    except Exception as e:
        return {"success": False, "error": str(e)}`
    : language === "go"
    ? `package database

import (
	"context"
	"database/sql"
	"time"
)

// FetchOptimizedData truy vấn dữ liệu nhanh trong 3 giây timeout
func FetchOptimizedData(ctx context.Context, db *sql.DB) ([]Item, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	rows, err := db.QueryContext(ctx, "SELECT id, name FROM items LIMIT 10")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return items, nil
}`
    : language === "rust"
    ? `use sqlx::{Pool, Postgres};

// Truy vấn lấy dữ liệu bất đồng bộ nhanh với SQLx
pub async fn fetch_data(pool: &Pool<Postgres>) -> Result<Vec<Item>, sqlx::Error> {
    let items = sqlx::query_as::<_, Item>("SELECT id, name FROM items LIMIT 10")
        .fetch_all(pool)
        .await?;
    Ok(items)
}`
    : `using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class DataService 
{
    private readonly ApplicationDbContext _context;
    public DataService(ApplicationDbContext context) => _context = context;

    // Lấy danh sách 10 bản ghi tối ưu không tracking
    public async Task<List<Item>> FetchOptimizedDataAsync()
    {
        return await _context.Items
            .AsNoTracking()
            .Take(10)
            .ToListAsync();
    }
}`
}
\`\`\`

## 3. Quy trình Kiểm thử & Xác thực Tối ưu
- **Phương thức thực thi:** ${
  ide === "antigravity-cli"
    ? "Chạy trực tiếp dòng lệnh: `npx antigravity run verify` để chạy các script tối ưu hóa kết nối tự động trong 100ms."
    : "Đồng bộ hóa phím tắt biên dịch IDE (như `CTRL+SHIFT+B` hoặc `CMD+SHIFT+B`) để kích hoạt quá trình phân tích lỗi trực quan."
}
`;
      } else {
        content = `---
name: database-optimization-skill
description: Best practices for optimizing ${dbLabel} queries, transactions, and indexing models.
when_to_use: "Use this skill whenever writing queries, aggregations, or managing active connections to ${dbLabel}."
allowed-tools: Read, Write, Grep, RunCommand
effort: medium
---

# Modular Skill Specification - DB Optimization (skills/database-optimization/SKILL.md)
# Database: ${dbLabel}

This file contains the architectural query patterns to interact cleanly with ${dbLabel}.

## 1. Connection Optimization
${
  database === "postgres" ? "- Maintain a shared single client pool. Never call \`pg.connect\` inside looping operations." :
  database === "sqlite" ? "- Keep SQLite WAL concurrency enabled. Never write to SQLite simultaneously from different threads." :
  database === "mongodb" ? "- Keep schema indexes registered properly. Limit query results strictly." :
  database === "mysql" ? "- Enforce strict InnoDB engines and indexes on all foreign keys." :
  "- Establish strict TTL constraints to prevent memory leak and RAM saturation."
}

## 2. Asynchronous Query Example (${languageLabel})
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
${
  language === "typescript" || language === "javascript"
    ? `import { NextResponse } from "next/server";
import { getDbClient } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const client = await getDbClient();
    const data = await client.query("SELECT id, name FROM items LIMIT 10");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`
    : language === "python"
    ? `import asyncio
from database import get_db_session

async def fetch_optimized_data():
    try:
        async with get_db_session() as session:
            result = await session.execute("SELECT id, name FROM items LIMIT 10")
            return {"success": True, "data": result.fetchall()}
    except Exception as e:
        return {"success": False, "error": str(e)}`
    : language === "go"
    ? `package database

import (
	"context"
	"database/sql"
	"time"
)

func FetchOptimizedData(ctx context.Context, db *sql.DB) ([]Item, error) {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	rows, err := db.QueryContext(ctx, "SELECT id, name FROM items LIMIT 10")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return items, nil
}`
    : language === "rust"
    ? `use sqlx::{Pool, Postgres};

pub async fn fetch_data(pool: &Pool<Postgres>) -> Result<Vec<Item>, sqlx::Error> {
    let items = sqlx::query_as::<_, Item>("SELECT id, name FROM items LIMIT 10")
        .fetch_all(pool)
        .await?;
    Ok(items)
}`
    : `using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class DataService 
{
    private readonly ApplicationDbContext _context;
    public DataService(ApplicationDbContext context) => _context = context;

    public async Task<List<Item>> FetchOptimizedDataAsync()
    {
        return await _context.Items
            .AsNoTracking()
            .Take(10)
            .ToListAsync();
    }
}`
}
\`\`\`

## 3. Verification Workflow Script
The agent can execute automated validations:
- **Execution Mode:** ${
  ide === "antigravity-cli"
    ? "Chạy trực tiếp dòng lệnh CLI: `npx antigravity run verify` để chạy các script tối ưu hóa kết nối tự động trong 100ms."
    : "Đồng bộ hóa phím tắt biên dịch IDE (như `CTRL+SHIFT+B` hoặc `CMD+SHIFT+B`) để kích hoạt quá trình phân tích lỗi trực quan."
}
`;
      }
    } else if (activeFile === "skills/testing-patterns/SKILL.md") {
      if (isVi) {
        content = `---
name: testing-patterns-skill
description: Các mô hình chuẩn để viết kiểm thử Unit và E2E đáng tin cậy bằng ${testingLabel}.
when_to_use: "Sử dụng khi viết test suite, cấu hình mock hoặc chạy các quy trình kiểm thử hồi quy."
allowed-tools: Read, Write, Grep, RunCommand
effort: low
---

# Đặc tả Kỹ năng Mô-đun - Quy chuẩn Kiểm thử (skills/testing-patterns/SKILL.md)
# Công cụ kiểm thử: ${testingLabel}

Tài liệu này bắt buộc thực thi quy trình viết test TDD khép kín và áp dụng mô hình AAA.

## 1. Mô hình AAA (Arrange-Act-Assert)
- **Arrange (Chuẩn bị):** Khởi tạo tất cả các biến đầu vào, cấu hình mock và trạng thái dữ liệu giả định một cách sạch sẽ.
- **Act (Thực thi):** Thực hiện gọi phương thức mục tiêu hoặc gửi API request cần kiểm thử.
- **Assert (Kiểm chứng):** Kiểm tra triệt để kiểu dữ liệu trả về, giá trị thuộc tính và số lần gọi mock để khẳng định kết quả đúng đắn.

## 2. Câu lệnh chạy kiểm thử tự động
- Chạy bộ kiểm thử trực tiếp trên terminal của bạn:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;
      } else {
        content = `---
name: testing-patterns-skill
description: Clean patterns for writing reliable Unit and E2E tests utilizing ${testingLabel}.
when_to_use: "Use when creating test suites, mock configurations, or regression testing blocks."
allowed-tools: Read, Write, Grep, RunCommand
effort: low
---

# Modular Skill Specification - Testing Patterns
# Testing Engine: ${testingLabel}

This guideline enforces strict TDD and AAA testing flows.

## 1. The AAA Pattern
- **Arrange:** Set up all input parameters, data states, and mocks cleanly.
- **Act:** Perform the target method execution or API hit.
- **Assert:** Validate all returned structures, database state, and mock counts strictly.

## 2. Dynamic Stack Testing Hook
- Run the test suite:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;
      }
    } else if (activeFile === "skills/security-scanner/SKILL.md") {
      if (isVi) {
        content = `---
name: security-scanner-skill
description: Quy tắc phòng chống lỗ hổng OWASP Top 10, lọc dữ liệu đầu vào và bảo vệ cổng API.
when_to_use: "Luôn kích hoạt khi viết các route server công khai, cấu hình header bảo mật hoặc xử lý form gửi lên."
allowed-tools: Read, Write, Grep
effort: low
---

# Đặc tả Kỹ năng Mô-đun - Rà soát Bảo mật (skills/security-scanner/SKILL.md)

Tài liệu này kiểm soát các chính sách bảo mật mạng cho ứng dụng của bạn.

## 1. Làm sạch dữ liệu đầu vào (Sanitization)
- Tuyệt đối không bao giờ tin cậy trực tiếp tham số gửi lên từ client.
- Luôn sử dụng kỹ thuật liên kết tham số (parameter binding) bản xứ của DB để phòng chống lỗ hổng chèn mã SQL Injection.
- Mã hóa hoặc loại bỏ thẻ script độc hại ở đầu ra để ngăn ngừa lỗ hổng XSS (Cross-Site Scripting).

## 2. Tiêu chuẩn bảo mật API cổng vào
- Đảm bảo giới hạn số lượng request tối đa trên giây (Rate-Limiting) để tránh tấn công DoS/DDoS.
- Cấu hình chuẩn các Header phản hồi bảo mật (CORS chặt chẽ, Content-Security-Policy an toàn).
`;
      } else {
        content = `---
name: security-scanner-skill
description: Guidelines to prevent OWASP Top 10 vulnerabilities, enforce input validation, and secure REST/GraphQL API controllers.
when_to_use: "Always on when developing internet-exposed server routes, headers, and queries."
allowed-tools: Read, Write, Grep
effort: low
---

# Modular Skill Specification - Security Scanning

This file governs security policies for the active stack.

## 1. Input Sanitization
- Never trust client inputs directly.
- Sanitize database queries and use parameter binding natively to prevent SQL Injection.
- Sanitize HTML outputs to protect against XSS injections.

## 2. API Security Standards
- Keep connection limits secured.
- Ensure strict HTTP response headers (CORS, Rate-Limiting, Content-Security-Policy).
`;
      }
    } else if (activeFile === "workflows/debug.md") {
      if (isVi) {
        content = `# Quy trình Gỡ lỗi Socratic (workflows/debug.md)
# Công nghệ: ${frameworkLabel} & ${languageLabel}

Quy trình này hướng dẫn Agent phân tích để xác định nguyên nhân gốc rễ (Root Cause) của lỗi hệ thống.

## 1. Bước 1: Phân tích & Thu thập chứng cứ
- Đọc kỹ log lỗi và toàn bộ thông tin stack trace.
- Sử dụng các công cụ rà soát biến số và kết nối cơ sở dữ liệu.
- Bắt buộc đưa ra ít nhất 2 giả thuyết nguyên nhân khả dĩ trước khi thay đổi bất kỳ file nguồn nào.

## 2. Bước 2: Khắc phục & Chạy vòng lặp kiểm tra
- Thực hiện một chỉnh sửa tối giản, tập trung chính xác vào điểm lỗi.
- Xác thực xem mã nguồn có biên dịch thành công hay không bằng câu lệnh:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`
`;
      } else {
        content = `# Socratic Debugging Workflow (workflows/debug.md)
# Stack: ${frameworkLabel} & ${languageLabel}

This file guides the agent through systematic root cause identification.

## 1. Analysis Phase
- Read error logs and full trace information.
- Inspect system states, variables, and database connections.
- Formulate at least 2 potential causes before changing any files.

## 2. Fixing & Verification Loop
- Apply a minimal pinpoint change.
- Verify the build compiles safely via:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`
`;
      }
    } else if (activeFile === "workflows/test.md") {
      if (isVi) {
        content = `# Quy trình Phát triển hướng Kiểm thử TDD (workflows/test.md)
# Framework áp dụng: ${testingLabel}

Quy trình này hướng dẫn chu trình TDD khép kín để phát triển tính năng an toàn.

## 1. Giai đoạn Đỏ (Red Phase)
- Viết một ca kiểm thử (unit test hoặc integration test) mô tả chính xác yêu cầu nghiệp vụ mới.
- Thực hiện chạy thử nghiệm để chứng minh bài test này biên dịch được nhưng sẽ thất bại (fail) như kỳ vọng.

## 2. Giai đoạn Xanh (Green Phase)
- Viết mã nguồn tối giản nhất có thể để vượt qua bài kiểm thử vừa viết.
- Xác thực xem tất cả các ca kiểm thử trong hệ thống đã chạy qua thành công (pass).

## 3. Giai đoạn Tái cấu trúc (Refactor Phase)
- Dọn dẹp mã nguồn, tối ưu cấu trúc file, loại bỏ thuật toán lặp hoặc style dư thừa.
- Chạy lại toàn bộ test suite để đảm bảo không xảy ra bất kỳ lỗi suy thoái (regression) nào.
`;
      } else {
        content = `# Test-Driven Development Workflow (workflows/test.md)
# Framework: ${testingLabel}

This file outlines the closed-loop TDD cycle.

## 1. Red Phase
- Write a failing unit or integration test defining the target feature requirement.
- Verify the test compiles and fails as expected.

## 2. Green Phase
- Write the minimal code required to satisfy the failing test.
- Verify the tests pass successfully.

## 3. Refactor Phase
- Clean up any messy styles, duplicated algorithms, or variables.
- Rerun tests to ensure no regressions occur.
`;
      }
    } else if (activeFile === "workflows/verify.md") {
      if (isVi) {
        content = `# Quy trình Xác thực tự động (workflows/verify.md)

Tài liệu này xác định các quy tắc tự động xác minh trước khi đóng gói hoặc triển khai mã nguồn.

## 1. Xác thực biên dịch (Build Verification)
- Chạy lệnh biên dịch tĩnh bắt buộc:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`

## 2. Xác thực bộ kiểm thử (Test Verification)
- Chạy kiểm thử tự động toàn diện:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;
      } else {
        content = `# Automated Verification Workflow (workflows/verify.md)

This file defines the pre-flight verification checks.

## 1. Build Verification
- Execute:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`

## 2. Test Verification
- Run tests:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;
      }
    } else if (activeFile === "workflows/coordinate.md") {
      if (isVi) {
        content = `# Quy trình Phân phối Đa Agent (workflows/coordinate.md)

Quy trình điều phối các tác vụ phức tạp giữa nhiều vai trò Agent độc lập.

## 1. Phân chia trách nhiệm rõ ràng (Separation of Concerns)
- Chia nhỏ các yêu cầu phát triển tính năng phức tạp thành các giai đoạn độc lập và tuần tự.
- Phân phối các nhiệm vụ nhỏ hơn cho các Agent chuyên môn (frontend, backend, security) xử lý.

## 2. Điểm kiểm soát an toàn tích hợp (Integration Checkpoints)
- Thực hiện biên dịch tĩnh tại mỗi bước bàn giao mã nguồn giữa các Agent.
- Chạy quét bảo mật tự động trước khi hợp nhất cập nhật lên nhánh chính.
`;
      } else {
        content = `# Multi-Agent Coordination Workflow (workflows/coordinate.md)

This file defines the orchestrator coordination patterns.

## 1. Separation of Concerns
- Divide complex feature requests into atomic, independent phases.
- Assign specific tasks to domain agents.

## 2. Safe Integration Checkpoints
- Run compiler type checks at each boundary integration.
- Run security scanners before deploying any updates.
`;
      }
    } else {
      // GEMINI.md
      const compilerCommand = 
        language === "typescript" ? "npx tsc --noEmit" :
        language === "python" ? "python -m mypy ." :
        language === "go" ? "go vet ./..." :
        language === "rust" ? "cargo check" : "dotnet build";

      const testCommand = 
        testing === "jest" ? "npm run test" : "npx playwright test";

      if (isVi) {
        content = `# GEMINI.md - AG Kit

> Tệp tin cấu hình hành vi của AI trong không gian làm việc này.

---

## QUAN TRỌNG: GIAO THỨC TẢI AGENT & SKILL (BẮT ĐẦU TẠI ĐÂY)

> **BẮT BUỘC:** Bạn PHẢI đọc tệp tin quy chuẩn của Agent tương ứng và các kỹ năng của nó TRƯỚC KHI tiến hành bất kỳ thay đổi mã nguồn nào. Đây là quy tắc ưu tiên cao nhất.

### 1. Cơ chế tải kỹ năng theo Mô-đun
Agent được kích hoạt → Kiểm tra thuộc tính frontmatter "skills:" → Đọc file SKILL.md (INDEX) → Chỉ đọc các phần cụ thể liên quan.
- **Đọc chọn lọc:** KHÔNG đọc toàn bộ file trong thư mục skill cùng lúc. Đọc \`SKILL.md\` trước, sau đó chỉ đọc các phần cụ thể khớp với yêu cầu của người dùng.
- **Thứ tự ưu tiên quy tắc:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md). Tất cả các quy tắc đều mang tính ràng buộc pháp lý.

### 2. Giao thức Bắt buộc thực thi
1. **Khi Agent được kích hoạt:** Đọc quy tắc → Kiểm tra Frontmatter → Nạp tệp tin SKILL.md → Áp dụng tất cả hướng dẫn.
2. **Nghiêm cấm:** Không bao giờ bỏ qua bước đọc luật của Agent hoặc kỹ năng đi kèm. Phương châm bắt buộc: "Đọc → Hiểu bản chất → Áp dụng thực tiễn".

---

## 📥 PHÂN LOẠI YÊU CẦU (BƯỚC 1)
Phân loại yêu cầu của người dùng trước khi sử dụng bất kỳ công cụ nào:
- **CÂU HỎI (QUESTION):** Giải thích, hướng dẫn → Trả lời bằng văn bản (Chỉ TIER 0).
- **RÀ SOÁT / KHẢO SÁT (SURVEY):** Liệt kê, phân tích cấu trúc → Chỉ lấy thông tin phiên làm việc, không chỉnh sửa file.
- **MÃ NGUỒN ĐƠN GIẢN (SIMPLE CODE):** Sửa lỗi nhỏ, chỉnh sửa đơn lẻ một tệp tin → Tiến hành chỉnh sửa inline trực tiếp.
- **MÃ NGUỒN PHỨC TẠP (COMPLEX CODE):** Xây dựng tính năng lớn, tái cấu trúc hệ thống → **Bắt buộc tạo file {task-slug}.md**.

---

## TIER 1: QUY CHUẨN MÃ NGUỒN (Khi viết Code)

### 🛠️ Quy tắc theo Công nghệ đã cấu hình
- **Framework:** ${frameworkLabel}
${frameworkSection}
- **Ngôn ngữ:** ${languageLabel}
${languageSection}
- **Cơ sở dữ liệu:** ${dbLabel}
${databaseSection}
- **Bố cục CSS:** ${stylingLabel}
${stylingSection}

### 🏁 Giao thức Kiểm tra cuối cùng (Final Checklist)
Khi người dùng yêu cầu kiểm tra cuối cùng hoặc bàn giao dự án:
- **Trình tự chạy xác minh ưu tiên:** 1. Bảo mật -> 2. Lint -> 3. Schema DB -> 4. Chạy kiểm thử -> 5. Đánh giá UX -> 6. SEO.
- **Biên dịch thử:**
  \`\`\`bash
  ${compilerCommand}
  \`\`\`
- **Chạy toàn bộ test:**
  \`\`\`bash
  ${testCommand}
  \`\`\`
`;
      } else {
        content = `# GEMINI.md - AG Kit

> This file defines how the AI behaves in this workspace.

---

## CRITICAL: AGENT & SKILL PROTOCOL (START HERE)

> **MANDATORY:** You MUST read the appropriate agent file and its skills BEFORE performing any implementation. This is the highest priority rule.

### 1. Modular Skill Loading Protocol

Agent activated → Check frontmatter "skills:" → Read SKILL.md (INDEX) → Read specific sections.

- **Selective Reading:** DO NOT read ALL files in a skill folder. Read \`SKILL.md\` first, then only read sections matching the user's request.
- **Rule Priority:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md). All rules are binding.

### 2. Enforcement Protocol

1. **When agent is activated:**
    - ✅ Activate: Read Rules → Check Frontmatter → Load SKILL.md → Apply All.
2. **Forbidden:** Never skip reading agent rules or skill instructions. "Read → Understand → Apply" is mandatory.

---

## 📥 REQUEST CLASSIFIER (STEP 1)

**Before ANY action, classify the request:**

| Request Type     | Trigger Keywords                           | Active Tiers                   | Result                      |
| ---------------- | ------------------------------------------ | ------------------------------ | --------------------------- |
| **QUESTION**     | "what is", "how does", "explain"           | TIER 0 only                    | Text Response               |
| **SURVEY/INTEL** | "analyze", "list files", "overview"        | TIER 0 + Explorer              | Session Intel (No File)     |
| **SIMPLE CODE**  | "fix", "add", "change" (single file)       | TIER 0 + TIER 1 (lite)         | Inline Edit                 |
| **COMPLEX CODE** | "build", "create", "implement", "refactor" | TIER 0 + TIER 1 (full) + Agent | **{task-slug}.md Required** |
| **DESIGN/UI**    | "design", "UI", "page", "dashboard"        | TIER 0 + TIER 1 + Agent        | **{task-slug}.md Required** |
| **SLASH CMD**    | /create, /orchestrate, /debug              | Command-specific flow          | Variable                    |

---

## 🤖 INTELLIGENT AGENT ROUTING (STEP 2 - AUTO)

**ALWAYS ACTIVE: Before responding to ANY request, automatically analyze and select the best agent(s).**

### Auto-Selection Protocol

1. **Analyze (Silent)**: Detect domains (Frontend, Backend, Security, etc.) from user request.
2. **Select Agent(s)**: Choose the most appropriate specialist(s).
3. **Inform User**: Concisely state which expertise is being applied.
4. **Apply**: Generate response using the selected agent's persona and rules.

### Response Format (MANDATORY)

When auto-applying an agent, inform the user:

\`\`\`markdown
🤖 **Applying knowledge of \`@[agent-name]\`...**

[Continue with specialized response]
\`\`\`

---

## TIER 0: UNIVERSAL RULES (Always Active)

### 🌐 Language Handling

When user's prompt is NOT in English:
1. **Internally translate** for better comprehension.
2. **Respond in user's language** - match their communication.
3. **Code comments/variables** remain in English.

### 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow \`@[skills/clean-code]\` rules. No exceptions.**
- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to 2025 standards (Core Web Vitals).
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

### 📁 File Dependency Awareness

**Before modifying ANY file:**
1. Check \`CODEBASE.md\` → File Dependencies.
2. Identify dependent files.
3. Update ALL affected files together.

---

## TIER 1: CODE RULES (When Writing Code)

### 📱 Project Type Routing

| Project Type | Primary Agent | Skills |
| --- | --- | --- |
| **WEB** (Next.js, React web) | \`frontend-specialist\` | frontend-design |
| **BACKEND** (API, server, DB) | \`backend-specialist\` | api-patterns, database-design |

### 🛠️ Technology-Specific Guidelines

- **Framework:** ${frameworkLabel}
${frameworkSection}
- **Language:** ${languageLabel}
${languageSection}
- **Database:** ${dbLabel}
${databaseSection}
- **UI Styling:** ${stylingLabel}
${stylingSection}

### 🛑 Socratic Gate

**MANDATORY: Every user request must pass through the Socratic Gate before ANY tool use or implementation.**

| Request Type | Strategy | Required Action |
| --- | --- | --- |
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions |
| **Code Edit / Bug Fix** | Context Check | Confirm understanding + ask impact questions |
| **Vague / Simple** | Clarification | Ask Purpose, Users, and Scope |
| **Full Orchestration** | Gatekeeper | **STOP** subagents until user confirms plan details |
| **Direct "Proceed"** | Validation | **STOP** → Even if answers are given, ask 2 "Edge Case" questions |

---

## TIER 2: DESIGN RULES (Reference)

- **Web UI/UX:** \`.agent/frontend-specialist.md\`
- **Design checklist:** No plain solid borders, use dynamic gradients, premium dark colors.

---

## 🏁 Final Checklist Protocol

**Trigger:** When the user says "son kontrolleri yap", "final checks", "çalıştır tất cả kiểm thử", or similar phrases.

### Priority Execution Order
1. **Security** → 2. **Lint** → 3. **Schema** → 4. **Tests** → 5. **UX** → 6. **Seo** → 7. **Lighthouse/E2E**

### Stack Verification Lints
- **Run compiler check:**
  \`\`\`bash
  ${compilerCommand}
  \`\`\`
- **Run automated tests:**
  \`\`\`bash
  ${testCommand}
  \`\`\`
`;
      }
    }

    return {
      content,
      filename
    };
  }, [ide, framework, language, database, styling, testing, activeFile, contentLanguage]);

  // Copy helper
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy rules: ", err);
    }
  };

  // Download helper
  const handleDownload = () => {
    const blob = new Blob([generatedData.content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = generatedData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-blue-500 selection:text-white flex flex-col">
      <Header />

      <main className="max-w-8xl mx-auto px-4 md:px-6 py-8 flex-grow w-full space-y-8">
        
        {/* Top Titles */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-900/30 bg-violet-950/15 text-violet-400 text-xs font-bold select-none mb-2">
            <LightningIcon className="text-sm animate-pulse" />
            <span>AI DEVELOPER ENGINE (PRO MAX)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-50 tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Cấu hình Agent & Rules
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Tạo cấu hình chỉ thị prompt (<code className="text-violet-400 bg-violet-950/20 px-1 py-0.5 rounded">.rules</code>), kỹ năng phân rã (<code className="text-violet-400 bg-violet-950/20 px-1 py-0.5 rounded">SKILL.md</code>) và bộ quy tắc ứng xử (<code className="text-violet-400 bg-violet-950/20 px-1 py-0.5 rounded">GEMINI.md</code>) chuẩn Google Antigravity.
          </p>
        </div>

        {/* Dynamic Controls & Presentation Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Options */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* IDE/Agent Selector */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                1. Trình biên dịch AI & IDE
              </h3>
              
              <div className="grid grid-cols-1 gap-2.5">
                {/* Antigravity IDE Select */}
                <button
                  onClick={() => setIde("antigravity-ide")}
                  className={`p-3.5 rounded-lg border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                    ide === "antigravity-ide"
                      ? "border-violet-600 bg-violet-950/15 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    ide === "antigravity-ide" ? "border-violet-500" : "border-zinc-600"
                  }`}>
                    {ide === "antigravity-ide" && <span className="w-2 h-2 rounded-full bg-violet-500" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      Antigravity IDE Config
                      <span className="text-[10px] bg-violet-500/20 text-violet-400 font-extrabold px-1.5 py-0.5 rounded uppercase">Mặc định</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      Đồng bộ hóa các file kỹ năng và quy chuẩn làm việc tích hợp sâu trong IDE.
                    </p>
                  </div>
                </button>

                {/* Antigravity CLI Select */}
                <button
                  onClick={() => setIde("antigravity-cli")}
                  className={`p-3.5 rounded-lg border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                    ide === "antigravity-cli"
                      ? "border-violet-600 bg-violet-950/15 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    ide === "antigravity-cli" ? "border-violet-500" : "border-zinc-600"
                  }`}>
                    {ide === "antigravity-cli" && <span className="w-2 h-2 rounded-full bg-violet-500" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      Antigravity CLI Agent
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      Thiết lập cấu hình chỉ thị prompt chuyên dụng cho bộ dòng lệnh Antigravity CLI.
                    </p>
                  </div>
                </button>

                {/* Claude Code Agent Select (Coming soon) */}
                <div className="p-3.5 rounded-lg border border-zinc-900/60 bg-zinc-950/20 opacity-50 relative flex items-start gap-3 select-none">
                  <div className="w-4 h-4 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                      Claude Code Agent
                      <span className="text-[9px] bg-zinc-800 text-zinc-400 font-bold px-1.5 py-0.5 rounded uppercase">Coming soon</span>
                    </h4>
                    <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">
                      Thiết lập file chỉ thị và quy tắc tối ưu hóa token cho Anthropic Claude Code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Tech Options */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                2. Tech Stack cấu hình dự án
              </h3>

              {/* Ngôn ngữ */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block">Ngôn ngữ Lập trình:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "typescript", label: "TypeScript" },
                    { key: "javascript", label: "JavaScript" },
                    { key: "python", label: "Python" },
                    { key: "go", label: "Go Lang" },
                    { key: "rust", label: "Rust" },
                    { key: "csharp", label: "C# (.NET)" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setLanguage(item.key)}
                      className={`py-2 px-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer text-center truncate ${
                        language === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block">Cơ sở dữ liệu (Database):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "postgres", label: "PostgreSQL" },
                    { key: "mongodb", label: "MongoDB" },
                    { key: "sqlite", label: "SQLite" },
                    { key: "mysql", label: "MySQL" },
                    { key: "redis", label: "Redis Cache" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setDatabase(item.key)}
                      className={`py-2 px-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer text-center truncate ${
                        database === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framework */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block">Framework chính:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "nextjs-app", label: "Next.js" },
                    { key: "react-vite", label: "React Vite" },
                    { key: "nodejs", label: "Node.js API" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setFramework(item.key)}
                      className={`py-2 px-1.5 rounded-md text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        framework === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* UI Library */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block">Thư viện UI Frontend:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "tailwind-v4", label: "Tailwind CSS v4" },
                    { key: "shadcn", label: "Shadcn UI" },
                    { key: "antd", label: "Ant Design" },
                    { key: "mui", label: "Material UI" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setStyling(item.key)}
                      className={`py-2 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        styling === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Testing */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block">Testing framework:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "jest", label: "Jest / Vitest" },
                    { key: "playwright", label: "Playwright E2E" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setTesting(item.key)}
                      className={`py-2 px-2.5 rounded-md text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        testing === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Presentation Screen */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Output File Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-900 rounded-lg text-xs self-start overflow-x-auto max-w-full">
              <button
                onClick={() => handleTabChange("rules")}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  outputTab === "rules"
                    ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    : "border-transparent text-zinc-450 hover:text-zinc-200 hover:bg-zinc-800/20"
                }`}
              >
                RULE.md / .rules
              </button>
              <button
                onClick={() => handleTabChange("skills")}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                  outputTab === "skills"
                    ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    : "border-transparent text-zinc-450 hover:text-zinc-200 hover:bg-zinc-800/20"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                SKILL.md (Module)
              </button>
              <button
                onClick={() => handleTabChange("workflows")}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                  outputTab === "workflows"
                    ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    : "border-transparent text-zinc-450 hover:text-zinc-200 hover:bg-zinc-800/20"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                WORKFLOW.md (Workflow)
              </button>
              <button
                onClick={() => handleTabChange("gemini")}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border ${
                  outputTab === "gemini"
                    ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    : "border-transparent text-zinc-450 hover:text-zinc-200 hover:bg-zinc-800/20"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shrink-0" />
                GEMINI.md (Behavior)
              </button>
            </div>

            {/* Header of code preview console */}
            <div className="bg-zinc-900 border border-zinc-800/80 rounded-t-xl px-4 py-3 flex justify-between items-center bg-zinc-900/20 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-zinc-450 ml-2 select-none">
                  {generatedData.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md p-0.5 mr-2">
                  <button
                    onClick={() => setContentLanguage("vi")}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      contentLanguage === "vi"
                        ? "bg-violet-950/50 text-violet-300 border border-violet-850/40"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    🇻🇳 VI
                  </button>
                  <button
                    onClick={() => setContentLanguage("en")}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      contentLanguage === "en"
                        ? "bg-violet-950/50 text-violet-300 border border-violet-850/40"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    🇺🇸 EN
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-150 flex items-center gap-1.5 ${
                    copied
                      ? "bg-emerald-950/50 border border-emerald-700/60 text-emerald-300"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-350 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100 active:scale-95"
                  }`}
                >
                  {copied ? <CheckIcon className="text-sm" /> : <CopyIcon className="text-sm" />}
                  <span>{copied ? "Đã sao chép!" : "Sao chép"}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-md text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950/30 cursor-pointer transition-all duration-150 flex items-center gap-1.5 active:scale-95"
                >
                  <DownloadIcon className="text-sm" />
                  <span>Tải file</span>
                </button>
              </div>
            </div>

            {/* Split-pane File Explorer Simulator container */}
            <div className="grid grid-cols-1 md:grid-cols-12 border border-zinc-900 rounded-b-xl overflow-hidden min-h-[500px] bg-zinc-950 shadow-2xl">
              
              {/* File Explorer Sidebar */}
              <div className="md:col-span-4 bg-zinc-950/40 border-r border-zinc-900 p-4 space-y-4 select-none shrink-0 overflow-y-auto max-h-[500px]">
                <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  FILE EXPLORER
                </div>
                
                <div className="space-y-1">
                  {filesByTab[outputTab].map((file) => {
                    const isActive = activeFile === file.path;
                    const pathSegments = file.path.split("/");
                    const displayName = pathSegments[pathSegments.length - 1];
                    const folderName = pathSegments.length > 1 ? pathSegments.slice(0, -1).join("/") + "/" : "";
                    
                    return (
                      <button
                        key={file.path}
                        onClick={() => setActiveFile(file.path)}
                        className={`w-full text-left p-2.5 rounded-md text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer border group ${
                          isActive
                            ? "bg-violet-950/15 text-violet-300 border-violet-850/30 shadow-[0_0_10px_rgba(139,92,246,0.05)]"
                            : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-xs group-hover:scale-110 transition-transform select-none">
                            {file.path.endsWith(".md") ? "📄" : "⚙️"}
                          </span>
                          <div className="truncate">
                            {folderName && <span className="text-zinc-650 text-[10px] block truncate leading-none mb-1 select-none">{folderName}</span>}
                            <span className="font-semibold block truncate leading-none">{displayName}</span>
                          </div>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Preview Pane */}
              <div className="md:col-span-8 bg-zinc-950 p-5 overflow-y-auto max-h-[500px] font-mono text-[11px] md:text-xs leading-relaxed text-zinc-300 shadow-inner select-text whitespace-pre-wrap flex-grow border-t md:border-t-0 border-zinc-900">
                {generatedData.content}
              </div>
              
            </div>

            {/* Step-by-step Directory installation walkthrough */}
            <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-extrabold text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                🚀 HƯỚNG DẪN MODULE CẤU TRÚC 3 BƯỚC:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                  <h4 className="font-bold text-zinc-200">Bước 1: Duyệt & Tải file</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Chọn các thông số Stack ở bảng bên trái. Chọn Tab cấu hình và nhấp vào các tệp tin trong **File Explorer** để xem trước, copy hoặc tải về.
                  </p>
                </div>
                
                <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                  <h4 className="font-bold text-zinc-200">Bước 2: Phân tách Thư mục</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Tạo folder riêng biệt cho Skill dưới đường dẫn: <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">.antigravity/skills/&#123;tên_skill&#125;/</code> và lưu file <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">SKILL.md</code> tương ứng vào đó.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                  <h4 className="font-bold text-zinc-200">Bước 3: AI tự động nhận diện</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    AI Agent sẽ quét và chỉ load duy nhất Kỹ năng cần thiết cho phân khu làm việc hiện tại, tiết kiệm 90% lượng token.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
