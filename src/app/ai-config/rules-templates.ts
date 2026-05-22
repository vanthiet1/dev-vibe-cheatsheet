export interface RuleGeneratorParams {
  ide: string;
  framework: string;
  language: string;
  database: string;
  styling: string;
  testing: string;
  activeFile: string;
  contentLanguage: "en" | "vi";
}

export function generateRulesContent(params: RuleGeneratorParams): { content: string; filename: string } {
  const { ide, framework, language, database, styling, testing, activeFile, contentLanguage } = params;

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

  let activeFileCheck = activeFile;
  if (activeFile.startsWith(".gemini/antigravity-cli/")) {
    activeFileCheck = activeFile.replace(".gemini/antigravity-cli/", "");
  }
  if (activeFileCheck.startsWith(".agent/")) {
    activeFileCheck = activeFileCheck.replace(".agent/", "");
  }
  if (activeFileCheck.startsWith("plugins/my-plugin/")) {
    activeFileCheck = activeFileCheck.replace("plugins/my-plugin/", "");
  }

  // 2. Main File Generator router
  if (activeFileCheck === ".antigravityrules") {
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
  } else if (activeFileCheck === ".editorconfig") {
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
  } else if (activeFileCheck === "skills/clean-code/SKILL.md") {
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
  } else if (activeFileCheck === "skills/database-optimization/SKILL.md") {
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
  } else if (activeFileCheck === "skills/testing-patterns/SKILL.md") {
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
  } else if (activeFileCheck === "skills/security-scanner/SKILL.md") {
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
  } else if (activeFileCheck === "workflows/debug.md") {
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
  } else if (activeFileCheck === "workflows/test.md") {
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
  } else if (activeFileCheck === "workflows/verify.md") {
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
  } else if (activeFileCheck === "workflows/coordinate.md") {
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
  } else if (activeFileCheck === "settings.json") {
    content = `{
  "enableTerminalSandbox": true,
  "permissions": {
    "allow": [
      "command(git)",
      "command(npm test)",
      "command(npx tsc)"
    ],
    "deny": [
      "command(rm -rf)",
      "command(del /s)",
      "command(format)"
    ]
  }
}`;
  } else if (activeFileCheck === "import_manifest.json") {
    content = `{
  "plugins": {
    "antigravity-clean-code": {
      "version": "1.0.0",
      "enabled": true,
      "importedAt": "2026-05-21T23:00:00Z"
    }
  },
  "settingsLoaded": true,
  "lastSyncTimestamp": 1779380400000
}`;
  } else if (activeFileCheck === "plugin.json") {
    content = `{
  "name": "antigravity-clean-code",
  "version": "1.0.0",
  "description": "Essential plugin extending coding capability for Next.js and TypeScript",
  "entryPoint": "index.js",
  "required": true
}`;
  } else if (activeFileCheck === "mcp_config.json") {
    content = `{
  "mcpServers": {
    "vulnerability-scanner": {
      "command": "python",
      "args": [".agent/skills/vulnerability-scanner/scripts/security_scan.py"],
      "env": {},
      "disabled": false
    }
  }
}`;
  } else if (activeFileCheck === "hooks.json") {
    content = `{
  "onAgentActivate": [
    "run_command(npx eslint .)"
  ],
  "beforeFileSave": [
    "run_command(npx tsc --noEmit)"
  ]
}`;
  } else if (activeFileCheck === "plugins/structure") {
    if (isVi) {
      content = `# Cấu trúc Thư mục Plugins Antigravity CLI

Thư mục lưu trữ cấu hình môi trường CLI cục bộ tại:
\`~/.gemini/antigravity-cli/\`

## Sơ đồ Cây thư mục:
├── plugins/
│   └── <plugin_name>/
│       ├── plugin.json         # File cấu hình Plugin đánh dấu (Bắt buộc)
│       ├── mcp_config.json     # Định nghĩa các dịch vụ MCP Server đi kèm
│       ├── hooks.json          # Tự động hóa sự kiện (Event Hooks)
│       ├── skills/             # Thư mục kỹ năng cục bộ (.md)
│       ├── agents/             # Thư mục Agent con bổ trợ (.md)
│       └── rules/              # Các quy tắc và tệp .rules bổ sung
└── import_manifest.json        # Danh sách theo dõi nạp plugin tự động

## Ý nghĩa & Định nghĩa chi tiết:
1. **plugin.json (Bắt buộc):** Chứa metadata của plugin (tên, phiên bản, tính năng kích hoạt). Nếu thiếu file này, CLI sẽ bỏ qua toàn bộ folder plugin.
2. **mcp_config.json:** Cung cấp thông tin kết nối các máy chủ Model Context Protocol (MCP) chuyên biệt để AI gọi các tool tùy biến.
3. **hooks.json:** Cấu hình tự động chạy lệnh khi có sự kiện (ví dụ: tự động lint khi lưu file, chạy typecheck trước khi commit).
4. **skills/ Thư mục kỹ năng:** Chứa các file \`SKILL.md\` định nghĩa tác vụ giúp AI giải quyết bài toán nghiệp vụ phức tạp.
5. **agents/ Thư mục Agent phụ:** Định nghĩa các agent chuyên trách (Socratic Debugger, UX Specialist) với vai trò cụ thể.
6. **rules/ Thư mục Rules:** Chứa các chỉ thị prompt bổ trợ riêng biệt cho plugin đó.
7. **import_manifest.json:** Tệp quản lý cấp cao nhất ghi nhận tất cả plugin đã được đăng ký và tải thành công.
`;
    } else {
      content = `# Antigravity CLI Plugins Directory Structure

Local CLI environment configurations storage located at:
\`~/.gemini/antigravity-cli/\`

## Directory Tree Map:
├── plugins/
│   └── <plugin_name>/
│       ├── plugin.json         # Required marker file
│       ├── mcp_config.json     # Optional MCP server definitions
│       ├── hooks.json          # Optional event hooks definition
│       ├── skills/             # Optional skills folder (.md)
│       ├── agents/             # Optional subagents folder (.md)
│       └── rules/              # Optional rules folder (.rules)
└── import_manifest.json        # Loaded plugins tracking manifest

## Detailed Definitions:
1. **plugin.json (Required):** Houses metadata of the plugin (name, version, options). If this file is missing, the CLI completely ignores the folder.
2. **mcp_config.json:** Defines connections to external Model Context Protocol (MCP) servers allowing the AI to use custom local tools.
3. **hooks.json:** Setup automation callbacks (e.g. running linter on file save, running typecheck before committing code).
4. **skills/ folder:** Contains modular \`SKILL.md\` guidelines explaining how to solve complex business domains.
5. **agents/ folder:** Houses subagent definition profiles (Socratic Debugger, Security Analyst) with targeted system prompts.
6. **rules/ folder:** Custom prompt guidelines and \`.rules\` files specific to this plugin.
7. **import_manifest.json:** High-level central registry tracking all registered and successfully loaded CLI plugins.
`;
    }
  } else if (activeFileCheck === "agents/debugger.md") {
    if (isVi) {
      content = `# Đặc tả Agent gỡ lỗi Socratic (Debugger Agent)
Tệp tin nằm tại: \`plugins/my-plugin/agents/debugger.md\`

## 1. Vai trò chính
- Đóng vai trò là Socratic Debugger chuyên sâu trên môi trường Antigravity CLI.
- Không vội vàng đưa ra code sửa lỗi. Đặt câu hỏi thăm dò nguyên nhân gốc rễ trước.

## 2. Quy trình gỡ lỗi 4 bước
- **Bước 1: Thu thập bằng chứng lỗi** (Logs, stacktrace, exception message).
- **Bước 2: Phân tích vùng ảnh hưởng** (Blast radius hypothesis).
- **Bước 3: Đề xuất giải pháp tối giản nhất** để kiểm chứng.
- **Bước 4: Chạy kiểm thử tự động** để xác nhận lỗi hoàn toàn được khắc phục.
`;
    } else {
      content = `# Socratic Debugger Agent Specification
File path: \`plugins/my-plugin/agents/debugger.md\`

## 1. Core Persona
- Serve as an expert Socratic Debugger integrated inside the Antigravity CLI environment.
- Do not rush to provide code fixes. Ask targeted questions to understand the root cause first.

## 2. Four-Phase Debugging
- **Phase 1: Gather error evidence** (logs, stacktrace, exception message).
- **Phase 2: Formulate blast radius hypothesis** before changing any code.
- **Phase 3: Propose the most minimal code fix possible** to verify the fix.
- **Phase 4: Execute compiler lints and test suites** to ensure successful resolution.
`;
    }
  } else if (activeFileCheck === "agents/orchestrator.md") {
    if (isVi) {
      content = `# Đặc tả Agent Điều phối (Orchestrator Agent)
Tệp tin nằm tại: \`plugins/my-plugin/agents/orchestrator.md\`

## 1. Trách nhiệm điều phối
- Phân tích các yêu cầu phức tạp từ người dùng CLI và chia nhỏ thành các tác vụ độc lập.
- Phân phối công việc và kiểm soát vòng đời thực thi của các agent chuyên trách.

## 2. Tiêu chuẩn bàn giao
- Yêu cầu kiểm tra biên dịch tĩnh (\`npx tsc --noEmit\`) sau mỗi tác vụ.
- Đảm bảo kiểm thử tự động vượt qua trước khi tích hợp code.
`;
    } else {
      content = `# Orchestrator Agent Specification
File path: \`plugins/my-plugin/agents/orchestrator.md\`

## 1. Core Responsibility
- Parse complex feature instructions inside the Antigravity CLI and divide them into independent sub-tasks.
- Coordinate execution lifecycles and verify integration of all domain specialist updates.

## 2. Integration Criteria
- Enforce static compilation checks (\`npx tsc --noEmit\`) at every task boundary.
- Ensure all automated unit tests pass cleanly before final deployment.
`;
    }
  } else if (activeFileCheck === "rules/clean-code.rules") {
    if (isVi) {
      content = `# Quy tắc Prompt Viết Mã Sạch (.rules)
Đường dẫn: \`plugins/my-plugin/rules/clean-code.rules\`

- Luôn viết code tường minh, dễ đọc và tự giải thích.
- Giới hạn độ dài hàm dưới 25 dòng code.
- Không sử dụng các từ viết tắt tối nghĩa hoặc biến vô nghĩa.
`;
    } else {
      content = `# Clean Code Rules Specification (.rules)
File path: \`plugins/my-plugin/rules/clean-code.rules\`

- Enforce highly clean, readable, and self-documenting code.
- Restrict function blocks to a maximum of 25 lines.
- Ban obfuscated shorthand variable names and lazy comments.
`;
    }
  } else if (activeFileCheck === "rules/performance.rules") {
    if (isVi) {
      content = `# Quy tắc Prompt Tối ưu Hiệu năng (.rules)
Đường dẫn: \`plugins/my-plugin/rules/performance.rules\`

- Tránh re-render không đáng có bằng cách tối ưu useMemo và useCallback.
- Thực thi song song các câu lệnh bất đồng bộ độc lập (Promise.all).
- Tối ưu hóa chỉ mục cơ sở dữ liệu để ngăn chặn quét toàn bảng.
`;
    } else {
      content = `# Performance Rules Specification (.rules)
File path: \`plugins/my-plugin/rules/performance.rules\`

- Prevent wasteful re-renders using optimized useMemo and useCallback bindings.
- Enforce parallel execution of independent async operations (Promise.all).
- Optimize index layouts to eliminate full table sweeps.
`;
    }
  } else if (activeFileCheck === "config-overview.md") {
    if (isVi) {
      content = `# Cấu hình Antigravity IDE (.agent/)
Chào mừng bạn đến với trình cấu hình nâng cao dành cho Google Antigravity IDE.

Thư mục \`.agent/\` đặt tại gốc dự án là nơi lưu trữ toàn bộ chỉ thị, kỹ năng và quy trình hoạt động để huấn luyện AI coding assistant hiểu sâu sắc về codebase của bạn.

## 📁 Sơ đồ cấu trúc thư mục tối ưu:
- **Rules (\`.agent/rules/\`):** Nơi chứa quy chuẩn hành vi cốt lõi \`GEMINI.md\`.
- **Skills (\`.agent/skills/\`):** Các mô-đun kỹ năng phân rã thông minh (\`SKILL.md\`) giúp AI hoạt động chuẩn xác theo từng công nghệ mà không làm tràn bộ nhớ token.
- **Agents (\`.agent/agents/\`):** Định nghĩa vai trò các tác nhân AI chuyên biệt (Subagents) như Debugger, Orchestrator, Database Architect...
- **Workflows (\`.agent/workflows/\`):** Kịch bản tự động hóa các tác vụ lặp đi lặp lại như chạy test, xác minh code, điều phối tác nhân.

Hãy chọn các tab tương ứng ở trên để xem chi tiết và tải xuống từng tệp cấu hình!
`;
    } else {
      content = `# Antigravity IDE Configuration (.agent/)
Welcome to the advanced configurator for Google Antigravity IDE.

The \`.agent/\` directory located at your workspace root is the dedicated storage layer housing all prompt directives, modular skills, and automation scripts instructing the AI coding assistant to operate with domain-expert knowledge of your repository.

## 📁 Recommended Directory Layout Structure:
- **Rules (\`.agent/rules/\`):** Houses core behavior directives such as \`GEMINI.md\`.
- **Skills (\`.agent/skills/\`):** Token-efficient standalone skill specifications (\`SKILL.md\`) guiding AI engines on specific frameworks and tools.
- **Agents (\`.agent/agents/\`):** Defines specialized autonomous agent personas (Subagents) like Debugger, Orchestrator, Database Architect...
- **Workflows (\`.agent/workflows/\`):** Custom workflows script layouts automating testing, verification, and multi-agent synergy.

Please select the respective tabs above to customize, preview, and download individual files!
`;
    }
  } else if (activeFileCheck.startsWith("skills/")) {
    // Dynamic Skill Files Content Router
    const skillSlug = activeFileCheck.replace("skills/", "").replace("/SKILL.md", "");
    
    // Capitalize Slug for Nice display
    const formattedSlug = skillSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    
    // Base frontmatter metadata
    const metadata = `---
name: ${skillSlug}-skill
description: Comprehensive expert guidelines for ${formattedSlug} optimized for ${languageLabel}.
when_to_use: "Load when designing, auditing, or refactoring codebase segments touching ${formattedSlug}."
allowed-tools: Read, Write, Grep
effort: medium
---

# Modular Skill Specification - ${formattedSlug} (skills/${skillSlug}/SKILL.md)
# IDE Target: ${ideLabel}
# Language: ${languageLabel}

`;

    if (isVi) {
      if (skillSlug === "clean-code") {
        content = metadata + `# Kỹ năng Viết Mã Sạch & Chuẩn hóa (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **SOLID & KISS:** Đảm bảo mọi lớp, mô-đun hoặc hàm chỉ có một trách nhiệm duy nhất (Single Responsibility Principle). Logic xử lý phải tối giản, dễ hiểu đối với các lập trình viên khác trong đội ngũ.
- **DRY (Don't Repeat Yourself):** Loại bỏ triệt để việc lặp lại mã nguồn bằng cách trừu tượng hóa các hàm dùng chung vào thư mục tiện ích.
- **Tự giải thích (Self-Documenting):** Code viết ra phải rõ ràng đến mức không cần hoặc chỉ cần rất ít dòng chú thích.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Tuân thủ quy tắc định kiểu của ${languageLabel}. Định cấu hình ESLint/Prettier đồng bộ.
- Khai báo kiểu dữ liệu tường minh, cấm hoàn toàn kiểu mập mờ hoặc 'any' trong mã nguồn.
- Sử dụng tên biến có nghĩa, tránh viết tắt tùy tiện hoặc đặt tên chung chung như 'data', 'temp', 'info'.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Viết các hàm controller xử lý bất đồng bộ async/await sạch sẽ, phòng tránh callback hell.
- Kiểm soát tiến trình song song an toàn bằng Promise.all() hoặc Task.WhenAll() để tăng tốc độ phản hồi.
- Luôn kiểm soát vòng đời luồng dữ liệu (Streams, Observables) và giải phóng tài nguyên.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tránh tính toán trùng lặp, lưu bộ nhớ đệm (caching) các tác vụ nặng hoặc truy vấn DB.
- Tránh re-render không đáng có bằng useMemo/useCallback hoặc tối ưu hóa cấp phát bộ nhớ.
- Giảm thiểu kích thước gói bundle (bundle size) bằng kỹ thuật tree-shaking và dynamic imports.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch và kiểm tra chặt chẽ mọi dữ liệu gửi từ phía Client trước khi xử lý sâu hơn.
- Ngăn chặn lỗi chèn mã độc HTML/JS bằng cách mã hóa các ký tự đặc biệt (Sanitization/Escaping).
- Sử dụng cơ chế truyền tham số an toàn (Parameterized queries) để phòng chống SQL Injection.

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức tệp cấu trúc rõ ràng theo cấu trúc phân rã chức năng (feature-based).
- Tách biệt rõ ràng phần giao diện hiển thị (Presentation Layer) và phần xử lý nghiệp vụ (Business Logic).
- Sơ đồ cây thư mục tiêu chuẩn khuyến nghị:
  \`\`\`
  ├── src/
  │   ├── components/       # Thành phần UI tái sử dụng
  │   ├── hooks/            # Custom React Hooks
  │   ├── services/         # Tương tác API/Cơ sở dữ liệu
  │   └── utils/            # Hàm tiện ích dùng chung
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Hàm xử lý nghiệp vụ chuẩn chỉ, tự giải thích và an toàn dữ liệu
export async function fetchUserDashboardData(userId: string) {
  if (!userId) {
    throw new Error("User ID is required for dashboard compilation");
  }
  
  try {
    // Chạy song song các truy vấn bất đồng bộ độc lập để loại bỏ waterfalls
    const [profile, preferences] = await Promise.all([
      db.getUserProfile(userId),
      db.getUserPreferences(userId)
    ]);
    
    return {
      success: true,
      data: {
        id: profile.id,
        fullName: \`\${profile.firstName} \${profile.lastName}\`,
        theme: preferences.theme || "dark",
        notificationsEnabled: preferences.notificationsEnabled ?? true
      }
    };
  } catch (error) {
    logger.error("Failed to compile dashboard data", { userId, error });
    throw new DomainException("Dashboard compiling failed, please retry later");
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Áp dụng mô hình chuẩn AAA (Arrange-Act-Assert) để xây dựng các test suites chất lượng.
- Mock đầy đủ các dịch vụ API bên ngoài và cơ sở dữ liệu để kiểm thử unit độc lập.
- Duy trì tỷ lệ bao phủ kiểm thử (Test Coverage) ở mức tối thiểu 80% đối với core logic.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Sử dụng cơ chế ném lỗi tùy chỉnh (Custom Exceptions) để biểu diễn các trạng thái lỗi nghiệp vụ rõ ràng.
- Đảm bảo bọc toàn bộ mã nguồn xử lý I/O hoặc API ngoài trong khối try-catch an toàn.
- Ghi nhật ký lỗi (Logging) chi tiết kèm theo thông tin ngữ cảnh để hỗ trợ phân tích nguyên nhân gốc rễ.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra định dạng và phân tích mã nguồn tĩnh cục bộ:
  \`\`\`bash
  npm run lint && npm run format
  \`\`\`
- Đồng bộ hóa các quy tắc kiểm tra này trực tiếp vào luồng GitHub Actions kiểm thử trước khi merge PR.`;
      } else if (skillSlug === "security-scanner") {
        content = metadata + `# Kỹ năng Rà soát Bảo mật chuyên sâu (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Phòng thủ chiều sâu (Defense in Depth):** Bảo mật ở mọi tầng kiến trúc ứng dụng, không chỉ dựa vào tường lửa hoặc gateway.
- **Quyền hạn tối thiểu (Least Privilege):** Cấp quyền tối thiểu cần thiết cho mọi tác nhân, API token và kết nối cơ sở dữ liệu.
- **Không bao giờ tin tưởng đầu vào (Zero Trust Input):** Coi tất cả dữ liệu bên ngoài gửi lên là không an toàn.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo kiểu dữ liệu chặt chẽ cho toàn bộ tham số API, loại bỏ hoàn toàn các cấu trúc mập mờ.
- Tránh các hàm nguy hiểm (như \`eval\`, \`exec\`, hoặc các hàm thực thi shell thô từ input của client).
- Sử dụng các thư viện bảo mật và kiểm tra phiên bản phụ thuộc thường xuyên để tránh lỗ hổng chuỗi cung ứng.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Bắt buộc kiểm tra quyền sở hữu (Authorization check) ngay lập tức khi bắt đầu luồng xử lý yêu cầu.
- Sử dụng các luồng xử lý không chặn (Non-blocking I/O) kết hợp timeouts nghiêm ngặt để tránh lỗi cạn kiệt tài nguyên.
- Không log các thông tin nhạy cảm (JWT, mật khẩu, thẻ tín dụng) trong quá trình xử lý bất đồng bộ.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Áp dụng Middleware giới hạn tần suất yêu cầu (Rate-limiting) để chống lại các cuộc tấn công DoS/DDoS.
- Thiết lập giới hạn kích thước Payload tối đa cho phép gửi lên máy chủ để tránh tràn bộ đệm RAM.
- Tối ưu hóa thuật toán băm (hashing computation) để tránh cạn kiệt CPU hệ thống khi xác thực hàng loạt.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Sử dụng các thư viện làm sạch dữ liệu (như DOMPurify, validator.js) để phòng chống lỗ hổng Cross-Site Scripting (XSS).
- Áp dụng Parameterized Queries (Ràng buộc tham số) trên tất cả các truy vấn DB để triệt tiêu hoàn toàn SQL Injection.
- Cấu hình an toàn CORS và thiết lập các Header bảo mật HTTP nghiêm ngặt (CSP, HSTS, X-Frame-Options).

## 6. Kiến trúc & Bố trí Thư mục
- Tách biệt rõ ràng luồng Authentication (Xác thực danh tính) và Authorization (Kiểm tra quyền hạn).
- Lưu trữ các middleware kiểm tra bảo mật trong thư mục riêng để dễ dàng áp dụng lên các route.
- Sơ đồ kiến trúc kiểm soát an toàn:
  \`\`\`
  ├── src/
  │   ├── middlewares/
  │   │   ├── auth.middleware.ts        # Xác thực Token JWT
  │   │   ├── rate-limit.middleware.ts  # Giới hạn Request
  │   │   └── security-headers.ts       # Cấu hình HTTP Headers
  \`\`\`

## 7. Mẫu Code Ví tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import dompurify from "isomorphic-dompurify";
import { authenticateUser } from "@/lib/auth";

// API Controller bảo mật cao chống XSS và SQL Injection
export async function securePostComment(req: Request) {
  // 1. Xác thực danh tính người dùng
  const user = await authenticateUser(req);
  if (!user) {
    return Response.json({ error: "Unauthorized access detected" }, { status: 401 });
  }

  try {
    const { rawComment } = await req.json();
    
    // 2. Làm sạch đầu vào nghiêm ngặt chống XSS
    const sanitizedComment = dompurify.sanitize(rawComment);
    if (!sanitizedComment || sanitizedComment.trim() === "") {
      return Response.json({ error: "Invalid comment payload content" }, { status: 400 });
    }

    // 3. Thực thi ghi DB sử dụng Parameterized Query an toàn
    const query = "INSERT INTO comments (user_id, content, created_at) VALUES ($1, $2, NOW()) RETURNING id";
    const result = await db.query(query, [user.id, sanitizedComment]);

    return Response.json({ success: true, commentId: result.rows[0].id });
  } catch (err) {
    return Response.json({ error: "Request validation failed" }, { status: 500 });
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết test suite giả lập các kịch bản tấn công bypass xác thực để đảm bảo API từ chối quyền truy cập đúng cách.
- Mock môi trường Identity Provider bên ngoài để kiểm thử luồng đăng nhập nhanh và độc lập.
- Thực hiện kiểm thử thâm nhập tĩnh tự động (static application security testing) trên môi trường kiểm thử.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Không bao giờ trả về stack trace lỗi hoặc thông tin chi tiết hệ thống bên trong (như chi tiết cấu hình DB) cho Client.
- Bọc toàn bộ logic trong khối try-catch, ghi log chi tiết mã lỗi lỗi và chuyển đổi thành thông điệp thân thiện với người dùng.
- Tự động ghi nhật ký các nỗ lực truy cập bất hợp pháp (Access Denied) vào hệ thống giám sát an ninh.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Quét lỗ hổng các thư viện phụ thuộc trực tiếp qua terminal:
  \`\`\`bash
  npm audit && npx snyk test
  \`\`\`
- Cấu hình chạy quét bảo mật tự động quét các secrets bị hardcode trong mã nguồn trước khi hợp nhất pull request.`;
      } else if (skillSlug === "seo-fundamentals") {
        content = metadata + `# Kỹ năng SEO & Tối ưu hóa Web (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Semantic HTML5:** Sử dụng đúng và chính xác các thẻ ngữ nghĩa HTML (header, nav, main, article, section, footer) để robot tìm kiếm hiểu rõ cấu trúc trang.
- **Tiêu đề phân cấp rõ ràng:** Đảm bảo mỗi trang chỉ có duy nhất một thẻ \`<h1>\` và các thẻ tiêu đề con (\`<h2>\`, \`<h3>\`) được tổ chức logic.
- **Mobile-First:** Tối ưu hóa hoàn hảo bố cục hiển thị trên thiết bị di động để tối đa hóa thứ hạng Google.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Đảm bảo toàn bộ các phần tử tương tác (links, buttons) có mô tả rõ ràng, không sử dụng text chung chung như "click here".
- Mọi hình ảnh bắt buộc phải có thuộc tính \`alt\` mô tả chi tiết nội dung bức ảnh phục vụ SEO hình ảnh và trình đọc màn hình.
- Định kiểu thẻ và meta tags động khớp với nội dung cụ thể của từng trang sản phẩm/dự án.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng mô hình render máy chủ (Server-Side Rendering - SSR) hoặc sinh trang tĩnh (SSG) đối với các trang công khai để bots crawl tức thì.
- Thực hiện nạp trước dữ liệu API bất đồng bộ ngay trên Server để trả về mã nguồn HTML hoàn chỉnh chứa đầy đủ từ khóa.
- Tránh sử dụng quá nhiều client-side fetch cho các nội dung văn bản cốt lõi cần tối ưu hóa tìm kiếm.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tối ưu hóa các chỉ số Core Web Vitals của Google bao gồm: LCP (tốc độ tải), FID (độ phản hồi), và CLS (độ ổn định giao diện).
- Áp dụng kỹ thuật tải lười (lazy loading) cho hình ảnh ở nửa dưới trang và ưu tiên nạp trước (preload) các tài nguyên thiết yếu.
- Nén hình ảnh sang định dạng hiện đại (WebP, AVIF) và tối thiểu dung lượng CSS/JS để giảm thời gian tải.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch toàn bộ các tham số URL nhận được từ Client để tránh tạo ra hàng loạt trang trùng lặp nội dung không mong muốn.
- Thiết lập thẻ canonical (\`<link rel="canonical" href="..." />\`) trên mỗi trang để gom nhóm các biến thể URL về trang chính.
- Sử dụng giao thức bảo mật HTTPS bắt buộc để đáp ứng tiêu chuẩn xếp hạng an toàn của Google.

## 6. Kiến trúc & Bố trí Thư mục
- Quản lý metadata động tập trung và cấu hình robots.txt, sitemap.xml động.
- Bố trí thư mục chứa assets tối ưu cho SEO:
  \`\`\`
  ├── public/
  │   ├── robots.txt        # Tệp chỉ thị cho Crawlers
  │   ├── sitemap.xml       # Bản đồ trang web tự động
  │   └── images/           # Hình ảnh được nén tối ưu
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
}

// Component SEO Meta và Schema JSON-LD chuẩn SEO chuyên nghiệp
export default function SEO({ title, description, canonicalUrl, imageUrl }: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "image": imageUrl || "https://example.com/default-share.jpg"
  };

  return (
    <Head>
      {/* 1. Thẻ Meta SEO cơ bản */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Thẻ Meta Open Graph (Facebook / Zalo share) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || "https://example.com/default-share.jpg"} />

      {/* 3. Thẻ Meta Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 4. Dữ liệu có cấu trúc JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết E2E tests bằng Playwright để kiểm chứng sự tồn tại và tính đúng đắn của các thẻ meta tag, title và alt image.
- Đảm bảo các link điều hướng hoạt động tốt và trả về mã trạng thái HTTP 200.
- Xác minh định dạng dữ liệu JSON-LD không chứa lỗi cú pháp.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Khi dữ liệu API của trang động bị lỗi, trả về trang 404 tùy chỉnh thân thiện thay vì hiển thị màn hình trắng hoặc lỗi thô.
- Cấu hình xử lý chuyển hướng 301 tự động cho các URL cũ để không bị mất điểm xếp hạng (SEO link juice).
- Theo dõi các lỗi crawl không tìm thấy trang qua Google Search Console thường xuyên.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra hiệu năng và SEO tự động cục bộ:
  \`\`\`bash
  npx lighthouse-ci collect --url=http://localhost:3000
  \`\`\`
- Thiết lập chỉ thị cảnh báo ngăn chặn triển khai deploy nếu điểm số SEO Lighthouse tụt dưới 90 điểm.`;
      } else if (skillSlug === "i18n-localization") {
        content = metadata + `# Kỹ năng Quốc tế hóa & Bản địa hóa (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Không hardcode chuỗi dịch:** Tuyệt đối không viết trực tiếp chuỗi ký tự hiển thị trong component. Mọi nội dung text phải được lấy thông qua key dịch.
- **Hỗ trợ RTL (Right-to-Left):** Thiết kế bố cục giao diện linh hoạt hỗ trợ cả ngôn ngữ viết từ phải qua trái.
- **Bản địa hóa định dạng:** Định dạng tiền tệ, ngày tháng, và con số phù hợp với từng quốc gia/ngôn ngữ mục tiêu.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo kiểu dữ liệu an toàn (Strict TypeScript types) cho các Translation Keys để tránh lỗi chính tả hoặc thiếu key dịch.
- Sử dụng các tham số truyền động (Dynamic Interpolation) cho chuỗi dịch có chứa biến số thay vì cộng chuỗi thủ công.
- Đặt tên key dịch theo cấu trúc phân cấp rõ ràng (ví dụ: \`dashboard.header.title\`).

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Áp dụng cơ chế nạp lười (Lazy loading locales) để chỉ tải tệp tin dịch của ngôn ngữ hiện tại, giảm thiểu dung lượng ban đầu.
- Xử lý bất đồng bộ quá trình chuyển đổi ngôn ngữ trên giao diện mà không yêu cầu tải lại trang.
- Lưu trữ ngôn ngữ đã chọn của người dùng vào LocalStorage hoặc Cookie và đồng bộ tự động lên Server.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tránh việc render lại toàn bộ ứng dụng khi người dùng thay đổi ngôn ngữ bằng cách tối ưu hóa React Context/State.
- Chia nhỏ tệp tin dịch thành nhiều mô-đun (ví dụ: common, auth, dashboard) và chỉ load các mô-đun cần thiết cho từng trang.
- Nén dung lượng các tệp JSON ngôn ngữ khi build production.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch chuỗi dịch khi hiển thị mã HTML động (qua khóa \`trans\` hoặc tương đương) để ngăn chặn tấn công XSS.
- Không bao giờ lưu trữ dữ liệu nhạy cảm hoặc bí mật hệ thống bên trong các tệp ngôn ngữ công khai.
- Kiểm tra tính hợp lệ của tham số ngôn ngữ truyền trên URL để tránh lỗi Path Traversal.

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức tệp dịch ngôn ngữ khoa học theo cấu trúc thư mục riêng biệt:
  \`\`\`
  ├── public/
  │   └── locales/
  │       ├── vi/
  │       │   └── common.json   # Chuỗi tiếng Việt
  │       └── en/
  │           └── common.json   # Chuỗi tiếng Anh
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import { useTranslation } from "react-i18next";

interface WelcomerProps {
  username: string;
  itemCount: number;
}

// Component Welcomer đa ngôn ngữ sử dụng Dynamic Interpolation và số nhiều (pluralization)
export default function UserWelcomer({ username, itemCount }: WelcomerProps) {
  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lng: "vi" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4 border border-zinc-800 rounded-lg space-y-4">
      {/* 1. Chuyển đổi ngôn ngữ động */}
      <div className="flex gap-2">
        <button onClick={() => changeLanguage("vi")} className="px-2 py-1 bg-zinc-900 rounded text-xs">🇻🇳 Tiếng Việt</button>
        <button onClick={() => changeLanguage("en")} className="px-2 py-1 bg-zinc-900 rounded text-xs">🇺🇸 English</button>
      </div>

      <div className="space-y-1">
        {/* 2. Dịch với tham số truyền vào động */}
        <h3 className="text-sm font-bold text-zinc-150">
          {t("welcome_message", { name: username })}
        </h3>
        
        {/* 3. Dịch xử lý số nhiều/số ít (Pluralization) */}
        <p className="text-xs text-zinc-400">
          {t("cart_summary", { count: itemCount })}
        </p>
      </div>
    </div>
  );
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết unit tests kiểm chứng hành vi thay đổi ngôn ngữ hoạt động chính xác.
- Mock thư viện i18n để trả về chính xác key dịch khi chạy test suite nhằm tránh phụ thuộc vào tệp JSON bên ngoài.
- Viết test rà soát lỗi chính tả hoặc thiếu key dịch giữa các quốc gia.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Xây dựng cơ chế Fallback dịch tự động: Khi thiếu chuỗi dịch ở tiếng Việt, hệ thống sẽ tự động hiển thị chuỗi tiếng Anh mặc định.
- Không để ứng dụng bị crash khi tệp tin JSON ngôn ngữ bị lỗi định dạng hoặc không thể tải từ CDN.
- Ghi log cảnh báo lên hệ thống giám sát khi phát hiện thiếu key dịch ở môi trường staging.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Sử dụng script quét tự động để tìm kiếm chuỗi text thô chưa được dịch trong codebase:
  \`\`\`bash
  npx i18next-parser-cli
  \`\`\`
- Chạy script kiểm tra sự đồng bộ cấu trúc các key dịch giữa tệp \`vi.json\` và \`en.json\` trong luồng CI/CD.`;
      } else if (skillSlug === "powershell-windows") {
        content = metadata + `# Kỹ năng Tự động hóa qua PowerShell Windows (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Verb-Noun Syntax:** Luôn tuân thủ quy chuẩn đặt tên lệnh chuẩn của Microsoft: Động từ - Danh từ (ví dụ: \`Get-Process\`, \`Get-Service\`).
- **Pipeline-First:** Tận dụng tối đa pipeline để truyền nhận dữ liệu dạng đối tượng (objects) thay vì phân tích chuỗi text thô.
- **Không phá hủy (Idempotency):** Đảm bảo script có thể chạy đi chạy lại nhiều lần một cách an toàn mà không làm hỏng cấu trúc hệ thống.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo tham số tường minh qua khối \`Param()\` và sử dụng thuộc tính định kiểu chặt chẽ (ví dụ: \`[string]\`, \`[int]\`).
- Sử dụng các chú thích trợ giúp chuẩn XML (Comment-Based Help) cho mọi hàm để người dùng dễ dàng xem hướng dẫn bằng lệnh \`Get-Help\`.
- Tránh viết tắt alias (như \`ls\`, \`dir\`, \`wget\`) trong script chính để đảm bảo tính dễ đọc và tương thích cao.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng PowerShell Jobs (\`Start-Job\`) hoặc các Runspaces bất đồng bộ cho các tác vụ tốn thời gian để tránh treo terminal.
- Quản lý luồng xuất dữ liệu (Pipeline streams) rõ ràng: phân tách Output, Error, Warning, và Verbose streams.
- Luôn kiểm soát việc đóng các luồng dữ liệu (Streams, File Readers) và session sau khi thực thi xong.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Lọc dữ liệu sớm nhất có thể ngay tại nguồn (ví dụ: dùng bộ lọc trong \`Get-Content\` thay vì truyền toàn bộ qua pipeline rồi mới lọc).
- Sử dụng cấu trúc mảng \`[System.Collections.Generic.List[T]]\` thay vì cộng mảng thủ công \`+=\` để tối ưu hóa bộ nhớ RAM.
- Giới hạn kích thước dữ liệu tải về khi gọi các API hệ thống bằng các tham số phân trang.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thiết lập Execution Policy an toàn (\`Set-ExecutionPolicy RemoteSigned\`) và ký số script trước khi phân phối trong doanh nghiệp.
- Không bao giờ hardcode mật khẩu, token bí mật dưới dạng văn bản thô. Bắt buộc dùng \`SecureString\` hoặc lưu trữ qua Azure Key Vault.
- Làm sạch và kiểm tra chặt chẽ các tham số truyền từ bên ngoài để phòng tránh lỗ hổng chèn lệnh độc hại (Script Injection).

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức script theo mô hình Module PowerShell chuẩn chỉ để dễ dàng đóng gói, tái sử dụng và chia sẻ:
  \`\`\`
  ├── MyModule/
  │   ├── MyModule.psd1     # Tệp tin Manifest chứa Metadata
  │   ├── MyModule.psm1     # Tệp tin Script chứa Code chính
  │   └── Private/          # Các hàm phụ trợ nội bộ
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`powershell
#<
.SYNOPSIS
    Script PowerShell tự động hóa sao lưu thư mục dự án và kiểm tra sức khỏe hệ thống.
.DESCRIPTION
    Script này thực hiện nén dữ liệu dự án, kiểm tra dung lượng ổ đĩa khả dụng và xuất báo cáo trạng thái.
.PARAMETER SourcePath
    Đường dẫn thư mục nguồn cần sao lưu.
.PARAMETER DestinationPath
    Đường dẫn thư mục lưu trữ file backup (.zip).
#>
Param (
    [Parameter(Mandatory=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$SourcePath,

    [Parameter(Mandatory=$true)]
    [string]$DestinationPath
)

$ErrorActionPreference = "Stop"

Try {
    Write-Verbose "Starting health check: Inspecting disk space..."
    $Drive = Get-PSDrive -Name ($DestinationPath.Split(":")[0])
    $FreeSpaceGB = [Math]::Round($Drive.Free / 1GB, 2)

    if ($FreeSpaceGB -lt 5) {
        Write-Warning "Low disk space alert! Only $FreeSpaceGB GB remaining on target drive."
    }

    # Tạo thư mục đích nếu chưa tồn tại
    if (-not (Test-Path $DestinationPath)) {
        New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
    }

    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $ZipFile = Join-Path $DestinationPath "Backup_$Timestamp.zip"

    Write-Host "Compressing directory $SourcePath to $ZipFile..." -ForegroundColor Cyan
    Compress-Archive -Path $SourcePath -DestinationPath $ZipFile -Force

    Write-Host "Backup completed successfully!" -ForegroundColor Green
    return [PSCustomObject]@{
        Success = $true
        ArchiveFile = $ZipFile
        FreeSpaceGB = $FreeSpaceGB
    }
} Catch {
    Write-Error "Backup processing failed: $_"
    return [PSCustomObject]@{
        Success = $false
        Error = $_.Exception.Message
    }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết test suites kiểm thử tự động cho PowerShell script bằng Pester framework (\`*.Tests.ps1\`).
- Mock các lệnh tương tác hệ thống phức tạp (như \`Restart-Computer\` hoặc \`Remove-Item\`) để đảm bảo an toàn khi chạy thử nghiệm.
- Kiểm tra tính đúng đắn của cấu trúc dữ liệu trả về sau khi thực thi hàm.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Sử dụng khối Try/Catch bắt buộc để bọc mọi tác vụ tương tác hệ thống nhạy cảm (Disk, Registry, Network).
- Cấu hình biến đặc biệt \`$ErrorActionPreference = "Stop"\` ở đầu script để biến các lỗi non-terminating thành terminating exceptions dễ kiểm soát.
- Xuất chi tiết thông tin lỗi thông qua biến toàn cục \`$Error[0]\` và ghi nhật ký lỗi vào Event Viewer của Windows.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy phân tích cú pháp tĩnh và kiểm tra chất lượng script PowerShell bằng PSScriptAnalyzer qua CLI:
  \`\`\`powershell
  Invoke-ScriptAnalyzer -Path .\MyScript.ps1
  \`\`\`
- Tích hợp kiểm thử tự động qua GitHub Actions bằng Windows Runner để tự động xác minh script trước khi phân phối.`;
      } else if (skillSlug === "git-workflows") {
        content = metadata + `# Kỹ năng Git Workflow & Quản lý Nhánh (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Trunk-Based / Git Flow:** Áp dụng chiến lược phân nhánh rõ ràng. Phát triển tính năng mới trên nhánh feature, chỉ merge vào main khi qua kiểm thử.
- **Conventional Commits:** Định dạng tiêu chuẩn cho mọi thông điệp commit (ví dụ: \`feat: add auth\`, \`fix: resolve memory leak\`).
- **Lịch sử Git sạch đẹp:** Khuyến khích rebase hoặc squash commits trước khi merge để giữ lịch sử git rõ ràng.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Tên nhánh chuẩn chỉnh: \`feature/name\`, \`bugfix/name\`, \`hotfix/name\`.
- Đảm bảo file \`.gitignore\` được định nghĩa chính xác cho ${languageLabel}, loại bỏ file tạm, tệp bảo mật \`.env\`.
- Sử dụng Conventional Commits giúp việc sinh tự động changelog hiệu quả.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Đồng bộ hóa các luồng công việc từ local lên remote repository an toàn qua push/pull.
- Thực thi quy trình kiểm tra bất đồng bộ thông qua Pull Request, khóa merge trực tiếp cho đến khi CI pass.
- Phân biệt rõ rệt việc rebase (đồng bộ tuyến tính) và merge (lưu lại điểm tích hợp).

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Sử dụng Git LFS (Large File Storage) để quản lý các tệp nhị phân lớn, tránh làm phình dung lượng repository.
- Dọn dẹp cục bộ định kỳ bằng các lệnh pruning các nhánh tracking rác để giải phóng tài nguyên.
- Hạn chế clone toàn bộ lịch sử bằng tính năng shallow clone (\`--depth 1\`) trong CI/CD.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Tuyệt đối nghiêm cấm commit mật khẩu, khóa SSH, API Keys, tệp cấu hình chứa thông tin nhạy cảm.
- Tự động quét và phát hiện secrets trước khi commit bằng Husky kết hợp GitLeaks hooks.
- Ký commits bằng mã khóa GPG để chứng thực danh tính lập trình viên đóng góp mã nguồn.

## 6. Kiến trúc & Bố trí Thư mục
- Đặt các cấu hình tự động hóa và hooks trong thư mục chuyên biệt:
  \`\`\`
  ├── .github/
  │   └── workflows/
  │       └── ci.yml        # Kịch bản CI tự động hóa
  ├── .husky/               # Cấu hình Git Hooks
  └── .gitignore            # Danh sách loại trừ Git
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`bash
#!/bin/sh
# File hook pre-commit (.husky/pre-commit) tự động kiểm tra định dạng và linter trước khi cho phép commit
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit quality gates..."

# 1. Chạy static type check và linter
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint checking failed. Commit aborted."
  exit 1
fi

# 2. Chạy test suite nhanh
npm run test:related
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ All quality gates passed! Commit proceeding..."
exit 0
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết kịch bản tự động hóa luồng PR kiểm thử chất lượng code (GitHub Actions runner).
- Tích hợp kiểm tra chất lượng code qua SonarCloud / CodeCov sau mỗi lần merge PR.
- Mock môi trường staging cục bộ để kiểm tra các hook hoạt động trước khi deploy.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Giải quyết xung đột merge (Merge Conflicts) một cách hệ thống bằng các công cụ so sánh trực quan tiêu chuẩn.
- Sử dụng \`git reflog\` và các thao tác reset an toàn để khôi phục các commit nhánh vô tình bị xóa.
- Sử dụng \`git rebase --abort\` để hủy bỏ an toàn các tiến trình rebase thất bại mà không làm mất công sức viết mã cục bộ.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Bắt buộc xác thực pre-commit bằng các công cụ như Husky để rà soát mã nguồn tại máy cục bộ.
- Xây dựng luồng xác thực tự động bằng GitHub Actions chạy các trình kiểm tra cú pháp và bộ kiểm thử khi đẩy mã.
- Thiết lập quy tắc bảo vệ nhánh để ngăn chặn đẩy mã trực tiếp lên nhánh production và yêu cầu các bản dựng phải thành công.`;
      } else if (skillSlug === "performance-profiling") {
        content = metadata + `# Kỹ năng Đo lường & Tối ưu Hiệu năng (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Định lượng trước khi tối ưu:** Dựa vào các dữ liệu đo lường thực tế thay vì suy đoán cảm tính của lập trình viên.
- **Tập trung tối ưu trọng điểm:** Chỉ tối ưu hóa ở các luồng xử lý chính (hot code paths) mang lại hiệu quả cải thiện lớn nhất.
- **Tiết kiệm tài nguyên:** Giảm thiểu tối đa số chu kỳ xử lý của CPU và tối ưu hóa dung lượng bộ nhớ RAM tiêu thụ.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Định kiểu dữ liệu rõ ràng cho các cấu trúc benchmark và hàm đo lường để đảm bảo an toàn kiểu dữ liệu.
- Tránh sử dụng các lớp trừu tượng nặng nề trong các vòng lặp đòi hỏi tốc độ xử lý cao.
- Quy chuẩn hóa các công cụ đo lường bằng cách sử dụng các API gốc có độ chính xác cao (native high-precision APIs).

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng các mẫu lập trình bất đồng bộ không chặn (non-blocking async) để giữ cho luồng thực thi luôn trôi chảy.
- Phân tích và triệt tiêu hiện tượng nghẽn cổ chai bất đồng bộ (async waterfalls) trong các tác vụ mạng tuần tự.
- Sử dụng bộ đệm luồng dữ liệu (streaming memory buffers) để xử lý dữ liệu lớn thay vì nạp toàn bộ vào RAM.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Đo lường và đánh giá thời gian thực thi của các khối mã nguồn một cách hệ thống bằng các điểm đánh dấu Performance API chính xác.
- Hạn chế các vòng lặp kết xuất (rendering loops) bằng cách sử dụng bộ nhớ đệm memoizer và các trung tâm quản lý trạng thái phân tách.
- Áp dụng kỹ thuật tải trước tài nguyên (asset preload) và gợi ý nạp trước (resource prefetch) cho các đường dẫn tải dữ liệu quan trọng.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch các cấu trúc dữ liệu truyền vào các hàm đo lường để bảo vệ nhật ký ghi chép (profiling logs) khỏi các cuộc tấn công tiêm mã độc.
- Phòng chống rò rỉ bộ nhớ bằng cách hủy đăng ký các bộ lắng nghe sự kiện nhàn rỗi (idle event handlers) và xóa các phạm vi rác.
- Sử dụng các thư viện bảo mật đã được tối ưu hóa và kiểm định hiệu năng để đáp ứng các tiêu chuẩn khắt khe của hệ thống.

## 6. Kiến trúc & Bố trí Thư mục
- Tự tổ chức các tập module phân tích hiệu năng và đo lường thời gian chạy trong thư mục riêng:
  \`\`\`
  └── src/
      └── utils/
          ├── benchmark.ts      # Tiện ích đo lường hiệu năng
          └── memory-dump.ts    # Tiện ích theo dõi RAM
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Hàm đo lường hiệu năng chuyên sâu sử dụng Performance API chuẩn Production
export async function profileExecutionTime<T>(taskName: string, action: () => Promise<T>): Promise<T> {
  const startMark = \`\${taskName}-start\`;
  const endMark = \`\${taskName}-end\`;
  
  if (typeof window !== "undefined" && window.performance) {
    window.performance.mark(startMark);
  }
  const startTime = Date.now();

  try {
    return await action();
  } finally {
    const duration = Date.now() - startTime;
    if (typeof window !== "undefined" && window.performance) {
      window.performance.mark(endMark);
      window.performance.measure(taskName, startMark, endMark);
      const measure = window.performance.getEntriesByName(taskName)[0];
      console.log(\`[PROFILER] \${taskName} executed in \${measure.duration.toFixed(2)}ms (High-Res)\`);
      window.performance.clearMarks(startMark);
      window.performance.clearMarks(endMark);
      window.performance.clearMeasures(taskName);
    } else {
      console.log(\`[PROFILER] \${taskName} executed in \${duration}ms\`);
    }
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết các bộ kiểm thử tải nặng (Load Testing) giả lập hàng ngàn yêu cầu đồng thời bằng các công cụ như k6 hoặc autocannon.
- Tự động hóa các bộ đo lường hiệu năng để phát hiện và cảnh báo kịp thời về sự suy thoái tốc độ (performance regression).
- Giả lập (mock) các kết nối cơ sở dữ liệu chậm để kiểm chứng khả năng phản hồi của giao diện dưới độ trễ mạng cao.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Xử lý các lỗi cạn kiệt bộ nhớ RAM (Out Of Memory - OOM) một cách an sau, tự động giải phóng các kết nối rác ngay lập tức.
- Xuất và phân tích biểu đồ ngọn lửa CPU (CPU flame graphs) để xác định chính xác các điểm nghẽn thực thi sâu.
- Theo dõi và kiểm tra việc phân bổ bộ nhớ Heap Dump thông qua công cụ Chrome DevTools để khắc phục triệt để rò rỉ RAM.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Thực hiện chạy phân tích kích thước gói ứng dụng khi build dự án:
  \`\`\`bash
  npm run build -- --report  # Hoặc dùng công cụ trực quan hóa gói bundle
  \`\`\`
- Tích hợp kiểm thử hiệu năng tự động vào GitHub Actions, cảnh báo lập tức nếu thời gian build tăng quá 20%.`;

      } else if (skillSlug === "clean-architecture") {
        content = metadata + `# Kỹ năng Kiến trúc Sạch - Clean Architecture (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Dependency Rule:** Mã nguồn đi từ ngoài vào trong. Lõi nghiệp vụ (Domain) hoàn toàn độc lập, không phụ thuộc vào framework, database, hay UI.
- **Tách biệt nghiệp vụ (Separation of Concerns):** Phân chia ứng dụng thành các lớp riêng biệt có ranh giới rõ ràng.
- **Kiến trúc cắm (Plugin Architecture):** Các thành phần hạ tầng (Database, UI, CDN) có thể dễ dàng thay đổi mà không ảnh hưởng tới lõi nghiệp vụ.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo và sử dụng Interfaces/Contracts cho mọi cổng giao tiếp ngoài (Repository interfaces, Gateway contracts).
- Sử dụng Data Transfer Objects (DTO) để chuyển nhận dữ liệu giữa các lớp một cách an toàn và tường minh.
- Cấm hoàn toàn việc import trực tiếp thư viện hoặc DB clients vào trong các Use Case hay Entities.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Quy trình luân chuyển dữ liệu: Controller nhận request -> DTO -> UseCase xử lý -> Repository lưu trữ -> DTO trả về Controller.
- Sử dụng cơ chế async/await đồng bộ các hoạt động I/O qua các Use Case.
- Áp dụng các Mapper để chuyển đổi cấu trúc Model DB sang Domain Entity độc lập.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tách biệt hoàn toàn tầng ghi (Command) và tầng đọc dữ liệu (Query) qua mô hình CQRS để tối ưu hóa hiệu năng truy vấn DB.
- Trừu tượng hóa lớp cache (Caching layer) ở tầng hạ tầng để tăng tốc phản hồi mà không làm bẩn logic nghiệp vụ.
- Thiết lập lazy loading cho các thực thể quan hệ dữ liệu lớn chỉ khi có yêu cầu.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thực hiện kiểm tra tính toàn vẹn và phân quyền dữ liệu ngay tại ranh giới của tầng Use Case để đảm bảo an toàn tối đa.
- Không để lộ các thông tin Entity chi tiết của DB trực tiếp ra Client, chỉ truyền dữ liệu qua các lớp DTO.
- Dependency Inversion ngăn chặn các thư viện độc hại bên ngoài ảnh hưởng vào nghiệp vụ cốt lõi.

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức thư mục dự án theo cấu trúc Clean Architecture tiêu chuẩn phân lớp khoa học:
  \`\`\`
  ├── src/
  │   ├── domain/           # Thực thể (Entities) & Nghiệp vụ cốt lõi
  │   ├── use-cases/        # Quy trình xử lý nghiệp vụ (Use Cases)
  │   ├── infrastructure/   # Hạ tầng (Database, WebServer, API Client)
  │   └── presentation/     # Giao diện hiển thị (Controllers, Views)
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// 1. Domain Interface (Contract)
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// 2. Use Case (Business Logic độc lập hoàn toàn với Framework/DB)
export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, email: string): Promise<boolean> {
    const existingUser = await this.userRepo.findById(userId);
    if (existingUser) {
      throw new Error("User already exists inside the system");
    }

    const newUser = new User(userId, email);
    await this.userRepo.save(newUser);
    return true;
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết Unit Tests kiểm thử hoàn chỉnh Use Cases mà không cần kết nối DB thực tế nhờ việc Mock Repository interfaces dễ dàng.
- Tốc độ chạy test suites lõi cực kỳ nhanh (dưới 1 giây) nhờ ranh giới độc lập hoàn hảo.
- Xác định và kiểm chứng tất cả các ca kiểm thử biên của nghiệp vụ.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Định nghĩa các lỗi nghiệp vụ riêng biệt (Domain Exceptions) và xử lý chuyển đổi thành lỗi HTTP thân thiện ở tầng presentation.
- Sử dụng kiến trúc Error Boundaries hoặc Global Error Handler ở tầng ngoài cùng để bắt toàn bộ các exception chưa được kiểm soát.
- Đảm bảo tính toàn vẹn dữ liệu (Transactions) khi Use Case gọi nhiều repository ghi dữ liệu.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Xây dựng CLI Scaffolding script giúp sinh nhanh cấu trúc file Clean Architecture chuẩn chỉ:
  \`\`\`bash
  npm run generate -- --type=usecase --name=RegisterUser
  \`\`\`
- Chạy kiểm tra quy tắc phụ thuộc (Dependency checking) tự động qua CI/CD để ngăn việc import sai lớp từ ngoài vào trong.`;
      } else {
        // Fallback for other skills in Vietnamese
        content = metadata + `# Kỹ năng Agent Chuyên nghiệp (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- Xây dựng kiến trúc mô-đun hóa, đảm bảo tính dễ đọc, bảo trì và mở rộng cao đối với ${formattedSlug}.
- Áp dụng các mẫu thiết kế tối ưu nhất phù hợp với môi trường dự án.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Định kiểu dữ liệu chặt chẽ cho toàn bộ cấu trúc biến và chữ ký hàm để loại bỏ lỗi runtime không đáng có.
- Tuân thủ quy chuẩn định dạng code chuẩn của cộng đồng phát triển.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Xử lý bất đồng bộ không chặn luồng chính, kiểm soát tài nguyên hệ thống an toàn.
- Quản lý luồng dữ liệu vào ra nhất quán, tránh lỗi rò rỉ dữ liệu hoặc deadlock.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Đo lường và tối ưu hóa thời gian chạy, bộ nhớ RAM tiêu thụ của các thuật toán lõi.
- Thiết lập bộ nhớ đệm thông minh đối với các truy vấn hoặc tính toán lặp đi lặp lại.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thực hiện cơ chế lọc dữ liệu đầu vào nghiêm ngặt trước khi xử lý sâu hơn hoặc ghi cơ sở dữ liệu.
- Phòng chống các lỗ hổng bảo mật phổ biến bằng cách mã hóa dữ liệu đầu ra an toàn.

## 6. Kiến trúc & Bố trí Thư mục
- Sắp xếp và tổ chức tệp tin dự án khoa học theo mô hình Clean Layout phổ biến.
- Sơ đồ cấu trúc cây thư mục khuyến nghị:
  \`\`\`
  ├── src/
  │   ├── core/         # Logic nghiệp vụ lõi
  │   ├── adapters/     # Bộ kết nối ngoài
  │   └── config/       # Cấu hình môi trường
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Đoạn code mẫu chuẩn hóa, an toàn dữ liệu và tối ưu hiệu năng
export async function executeModuleTask(payload: any) {
  if (!payload) {
    throw new Error("Payload is required for action execution");
  }
  
  try {
    const result = await coreService.process(payload);
    return { success: true, result };
  } catch (error) {
    console.error("Task failed to execute", error);
    return { success: false, message: error.message };
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết unit tests kiểm chứng hành vi của các module logic biệt lập bằng Vitest/Playwright.
- Mock đầy đủ các kết nối hoặc dịch vụ bên thứ ba để đảm bảo tốc độ chạy test suite dưới 1 giây.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Đảm bảo bọc các logic nghiệp vụ nhạy cảm trong khối try-catch an toàn.
- Ghi nhận thông tin lỗi chi tiết, không làm rò rỉ thông tin nhạy cảm của hệ thống ra bên ngoài.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra chất lượng và chất lượng mã nguồn tự động thông qua dòng lệnh:
  \`\`\`bash
  npm run test && npm run lint
  \`\`\`
- Đồng bộ hóa các quy trình xác minh này trực tiếp vào hệ thống kiểm thử tự động CI/CD.`;
      }
    } else {
      // ENGLISH TEXTS
      if (skillSlug === "clean-code") {
        content = metadata + `# Clean Code & Standardization Guidelines (${formattedSlug})

## 1. Core Design Principles
- **SOLID & KISS:** Ensure every class, module, or function has a single, well-defined responsibility (Single Responsibility Principle). Keep implementation logic simple, direct, and obvious to other team members.
- **DRY (Don't Repeat Yourself):** Eliminate repetitive code blocks completely by abstracting shared behaviors into standardized utility modules.
- **Self-Documenting:** Code should be clean and readable to the point where comments are rarely required.

## 2. Syntax & Typing Standards
- Strictly adhere to community syntax styles for ${languageLabel}. Configure linters accordingly.
- Explicitly declare all data types, completely banning untyped or loose variables from production code.
- Enforce meaningful variable naming patterns, banning lazy abbreviations or generic names like 'data', 'temp'.

## 3. Async & Data Flow Management
- Structure clean asynchronous routines using async/await, keeping nested callbacks out of your logic.
- Execute independent asynchronous queries in parallel using Promise.all() to eliminate system waterfalls.
- Always monitor event listeners and active data streams to release resources.

## 4. Deep Performance Optimization
- Prevent repetitive compute tasks by caching expensive logic computations or relational DB queries.
- Prevent wasteful client-side rendering loops using useMemo/useCallback or memory optimization structures.
- Restrict bundle sizes using efficient tree-shaking patterns and lazy imports.

## 5. Security & Input Sanitization
- Strictly sanitize and validate all client-supplied inputs before passing them down to service layers.
- Prevent script injections by properly encoding and escaping output characters.
- Rely on native parameterized database queries to completely neutralize SQL Injection threats.

## 6. Layout Architecture & Folder Structure
- Group assets logically using feature-based structural layout conventions.
- Keep interface display layers (Presentation) completely separated from business logic handlers.
- Standard recommended workspace directory map:
  \`\`\`
  ├── src/
  │   ├── components/       # Reusable UI elements
  │   ├── hooks/            # Custom Hooks
  │   ├── services/         # API/Database interactions
  │   └── utils/            # Shared utility functions
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// High-fidelity production-ready business logic method
export async function fetchUserDashboardData(userId: string) {
  if (!userId) {
    throw new Error("User ID is required for dashboard compilation");
  }
  
  try {
    // Execute independent async operations in parallel to prevent waterfalls
    const [profile, preferences] = await Promise.all([
      db.getUserProfile(userId),
      db.getUserPreferences(userId)
    ]);
    
    return {
      success: true,
      data: {
        id: profile.id,
        fullName: \`\${profile.firstName} \${profile.lastName}\`,
        theme: preferences.theme || "dark",
        notificationsEnabled: preferences.notificationsEnabled ?? true
      }
    };
  } catch (error) {
    logger.error("Failed to compile dashboard data", { userId, error });
    throw new DomainException("Dashboard compiling failed, please retry later");
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Enforce standard Arrange-Act-Assert (AAA) structures inside your unit test files.
- Mock external network requests and database drivers cleanly to isolate target test logic.
- Guarantee at least 80% test coverage for core business domain logic layers.

## 9. Robust Exception Handling & Debug Flow
- Rely on custom, explicit business domain exceptions to represent logical failures gracefully.
- Safely wrap all external I/O operations and API requests inside try-catch-finally boundaries.
- Log error states with detailed diagnostic context to support rapid root cause analysis.

## 10. CLI & CI/CD Automation Flow
- Perform static formatting and code quality checks locally using CLI commands:
  \`\`\`bash
  npm run lint && npm run format
  \`\`\`
- Integrate these lint gates directly into your CI/CD repository workflows prior to merging PR branches.`;
      } else if (skillSlug === "security-scanner") {
        content = metadata + `# Security Auditing & Scanner Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Defense in Depth:** Implement security controls at every layer of the application architecture, never relying on a single gate.
- **Least Privilege:** Constrain permissions strictly, granting only the absolute minimum access required for API tokens and database connections.
- **Zero Trust Input:** Treat all data originating from external client clients as potentially malicious.

## 2. Syntax & Typing Standards
- Enforce strict schemas and data shapes on all public endpoints, rejecting untyped parameter shapes.
- Ban insecure built-in system execution calls (such as \`eval\` or raw shell executors).
- Track and audit third-party library versions regularly to prevent supply chain vulnerabilities.

## 3. Async & Data Flow Management
- Authenticate and authorize incoming requests immediately at the very beginning of the controller lifecycle.
- Implement strict async processing timeouts to prevent malicious resource exhaustion (DoS).
- Mask and filter out sensitive variables (passwords, JWTs, keys) before logging server events.

## 4. Deep Performance Optimization
- Apply robust rate-limiting middleware to guard endpoints against brute-force and DDoS attempts.
- Enforce strict limits on maximum HTTP payload request body sizes to protect system RAM limits.
- Optimize cryptographic routines (such as password hashing) to prevent CPU resource starvation under load.

## 5. Security & Input Sanitization
- Rely on vetted sanitization engines (e.g. DOMPurify, validator.js) to neutralize Cross-Site Scripting (XSS) payloads.
- Use parameterized queries across all database drivers to completely eradicate SQL Injection risks.
- Enforce strict CORS configurations and secure HTTP headers (CSP, HSTS, X-Frame-Options).

## 6. Layout Architecture & Folder Structure
- Maintain clear boundaries between Authentication (identity verification) and Authorization (privilege checks).
- Organize security middleware hooks in a dedicated module directory for straightforward application.
- Security architecture module layout map:
  \`\`\`
  ├── src/
  │   ├── middlewares/
  │   │   ├── auth.middleware.ts        # JWT validation hooks
  │   │   ├── rate-limit.middleware.ts  # Rate limiters
  │   │   └── security-headers.ts       # Secure HTTP headers config
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import dompurify from "isomorphic-dompurify";
import { authenticateUser } from "@/lib/auth";

// Secure API endpoint controller neutralizing XSS and SQL injection threats
export async function securePostComment(req: Request) {
  // 1. Authenticate user session
  const user = await authenticateUser(req);
  if (!user) {
    return Response.json({ error: "Unauthorized access detected" }, { status: 401 });
  }

  try {
    const { rawComment } = await req.json();
    
    // 2. Strict client payload sanitization to block XSS
    const sanitizedComment = dompurify.sanitize(rawComment);
    if (!sanitizedComment || sanitizedComment.trim() === "") {
      return Response.json({ error: "Invalid comment payload content" }, { status: 400 });
    }

    // 3. Secure database insert using Parameterized Query binding
    const query = "INSERT INTO comments (user_id, content, created_at) VALUES ($1, $2, NOW()) RETURNING id";
    const result = await db.query(query, [user.id, sanitizedComment]);

    return Response.json({ success: true, commentId: result.rows[0].id });
  } catch (err) {
    return Response.json({ error: "Request validation failed" }, { status: 500 });
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Compose specialized E2E boundary tests simulating authentication bypass payloads to ensure APIs reject them.
- Mock dynamic external OAuth providers to allow rapid, localized identity testing cycles.
- Integrate automated static application security testing (SAST) engines in test workflows.

## 9. Robust Exception Handling & Debug Flow
- Never leak structural stack traces, raw error codes, or database schemas in public HTTP responses.
- Catch unexpected failures gracefully, logging diagnostic details internally while presenting a clean error fallback.
- Auto-trigger high-priority alerts to security logs on multiple successive unauthorized access attempts.

## 10. CLI & CI/CD Automation Flow
- Perform automated dependency audit scanning on local terminals:
  \`\`\`bash
  npm audit && npx snyk test
  \`\`\`
- Block merges on CI/CD pipelines if critical vulnerability checks fail or hardcoded secrets are discovered in git commits.`;
      } else if (skillSlug === "seo-fundamentals") {
        content = metadata + `# SEO Fundamentals & Web Optimization (${formattedSlug})

## 1. Core Design Principles
- **Semantic HTML5:** Rely on semantic markup tags (header, nav, main, article, section, footer) to construct clear page outlines.
- **Single Heading Hierarchy:** Restrict layout to exactly one \`<h1>\` tag per page, indexing subheadings (\`<h2>\`, \`<h3>\`) systematically.
- **Mobile-First Responsiveness:** Craft responsive layouts conforming to modern mobile-first constraints to score higher on mobile indexing.

## 2. Syntax & Typing Standards
- Ensure all interactive links and buttons have clear descriptive titles, avoiding non-descript phrases like "click here".
- Enforce strict \`alt\` tags on all visual assets to satisfy screen reader accessibility and image search indexing.
- Generate page titles and dynamic meta descriptions matching the specific context of individual page models.

## 3. Async & Data Flow Management
- Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for public paths to deliver instant crawler visibility.
- Fetch necessary page payloads on the server prior to returning HTML, ensuring immediate keywords availability.
- Limit heavy client-side Javascript fetching for core text-based layouts targeting high search visibility.

## 4. Deep Performance Optimization
- Optimize Google Core Web Vitals targets: LCP (loading speed), FID (interaction latency), and CLS (visual layout shifts).
- Lazily load off-screen graphics, reserving rapid preloading triggers for top-of-fold visual elements.
- Compress graphics using modern file formats (AVIF, WebP) and minimize asset files (CSS/JS).

## 5. Security & Input Sanitization
- Sanitize active query parameters on server endpoints to avoid duplicate indexing of dynamic variants.
- Attach canonical markers (\`<link rel="canonical" href="..." />\`) to instruct search spiders on main authoritative URLs.
- Force secure HTTPS connections globally to satisfy Google security ranking algorithms.

## 6. Layout Architecture & Folder Structure
- Maintain configurations for dynamic metadata builders, sitemap generators, and robots.txt rules:
  \`\`\`
  ├── public/
  │   ├── robots.txt        # Crawler directions file
  │   ├── sitemap.xml       # Automated XML sitemap
  │   └── images/           # Compressed responsive graphics
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
}

// Composable high-fidelity SEO Metatag and Schema JSON-LD component
export default function SEO({ title, description, canonicalUrl, imageUrl }: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "image": imageUrl || "https://example.com/default-share.jpg"
  };

  return (
    <Head>
      {/* 1. Standard Search Engine Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Open Graph Protocol (Social Platforms) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || "https://example.com/default-share.jpg"} />

      {/* 3. Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 4. Structured Data Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
\`\`\`

## 8. Testing & Mocking Strategy
- Compose E2E testing workflows using Playwright to assert that title strings, SEO meta descriptions, and image alt attributes exist.
- Verify redirect paths return valid HTTP redirect codes under mock server runs.
- Validate structural JSON-LD blobs against search engine compiler specifications.

## 9. Robust Exception Handling & Debug Flow
- Deliver customized, elegant 404 response pages when server API loaders fail on dynamic paths.
- Setup automatic 301 redirects for modified URL configurations to preserve existing search rankings.
- Track crawl exceptions and invalid URLs systematically via tools like Search Console.

## 10. CLI & CI/CD Automation Flow
- Execute local performance and SEO index audits automatically in local shell runs:
  \`\`\`bash
  npx lighthouse-ci collect --url=http://localhost:3000
  \`\`\`
- Prevent release deployment merges if automated SEO Lighthouse metrics drop below defined quality baselines (90+).`;
      } else if (skillSlug === "i18n-localization") {
        content = metadata + `# Internationalization & Localization Guidelines (${formattedSlug})

## 1. Core Design Principles
- **No Hardcoded Strings:** Completely ban text literals inside UI components, loading all interface assets through locale files.
- **RTL (Right-to-Left) Adaptability:** Guarantee layouts support bidirectional writing directions smoothly where necessary.
- **Culture-Aware Data Formats:** Localize currencies, clock formats, and floating numeric scales dynamically according to target regions.

## 2. Syntax & Typing Standards
- Enforce rigid TypeScript definitions on locale translation key structures to eliminate typos or missing translations.
- Rely on programmatic string interpolation parameters for dynamic text outputs, avoiding manual string concatenation.
- Organize translation keys using standard domain separation namespaces (e.g. \`auth.login.submit\`).

## 3. Async & Data Flow Management
- Implement dynamic chunked chunk loading (Lazy loaded locales) to load only active translation sheets, minimizing startup overhead.
- Handle active language changes instantly on the client UI without requiring full window page reloads.
- Remember client language settings via cookies/headers, automatically syncing preferences with backend endpoints.

## 4. Deep Performance Optimization
- Minimize global application re-renders during language updates by containing localization contexts within lightweight state stores.
- Divide translation keys into granular namespaces, retrieving only page-specific translation chunks as needed.
- Gzip and compress static translation assets when compiling code for production releases.

## 5. Security & Input Sanitization
- Strictly sanitize translated content blocks displaying raw HTML to secure applications from injected scripting.
- Ban proprietary API keys, internal credentials, or private routing urls from static localization sheets.
- Validate locale URL parameters on the server to block localized path traversal threats.

## 6. Layout Architecture & Folder Structure
- Maintain locale files cleanly in separate localization folders:
  \`\`\`
  ├── public/
  │   └── locales/
  │       ├── vi/
  │       │   └── common.json   # Vietnamese strings
  │       └── en/
  │           └── common.json   # English strings
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import { useTranslation } from "react-i18next";

interface WelcomerProps {
  username: string;
  itemCount: number;
}

// Multi-language component handling string interpolation and plural forms dynamically
export default function UserWelcomer({ username, itemCount }: WelcomerProps) {
  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lng: "vi" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4 border border-zinc-800 rounded-lg space-y-4">
      {/* 1. Language switcher buttons */}
      <div className="flex gap-2">
        <button onClick={() => changeLanguage("vi")} className="px-2 py-1 bg-zinc-900 rounded text-xs">🇻🇳 Tiếng Việt</button>
        <button onClick={() => changeLanguage("en")} className="px-2 py-1 bg-zinc-900 rounded text-xs">🇺🇸 English</button>
      </div>

      <div className="space-y-1">
        {/* 2. String interpolation */}
        <h3 className="text-sm font-bold text-zinc-150">
          {t("welcome_message", { name: username })}
        </h3>
        
        {/* 3. Automatic pluralization */}
        <p className="text-xs text-zinc-400">
          {t("cart_summary", { count: itemCount })}
        </p>
      </div>
    </div>
  );
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct dedicated localized unit assertions validating i18n triggers switch regions successfully.
- Mock translation providers to assert on bare keys instead of static assets to decoupling UI testing suites.
- Automate checking processes scanning for missing locale equivalents on non-primary language templates.

## 9. Robust Exception Handling & Debug Flow
- Establish automatic fallbacks, routing queries to default English translations if specialized localized phrases are missing.
- Prevent application failure if localized translation sheets fail to retrieve or contain formatting defects.
- Trigger warnings to build monitors when unmapped language keys are requested during execution.

## 10. CLI & CI/CD Automation Flow
- Perform automated codebase scanning looking for unmapped inline strings:
  \`\`\`bash
  npx i18next-parser-cli
  \`\`\`
- Enforce strict keys parity checking scripts in CI pipelines prior to merge permissions.`;
      } else if (skillSlug === "powershell-windows") {
        content = metadata + `# PowerShell Windows Automation Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Verb-Noun Syntax:** Strictly follow standard Microsoft cmdlet naming patterns: Verb-Noun (e.g. \`Get-Process\`, \`New-Item\`).
- **Pipeline-First:** Prioritize sending rich object pipelines between cmdlets rather than printing raw text blocks.
- **Idempotency:** Write automated scripts to run repeatedly without causing side effects or system degradation.

## 2. Syntax & Typing Standards
- Enforce parameters definitions inside standard \`Param()\` blocks, typing inputs strictly (e.g. \`[string]\`, \`[int]\`).
- Embed XML Comment-Based Help patterns above every function to natively support \`Get-Help\` commands.
- Ban shorthand command aliases (like \`ls\`, \`dir\`, \`wget\`) inside production files to maintain readability.

## 3. Async & Data Flow Management
- Leverage PowerShell Jobs (\`Start-Job\`) or asynchronous Runspaces for time-consuming background operations.
- Separate pipeline streams cleanly, isolating standard Output, Error, Warning, and Verbose pipes.
- Close connection pools, system handles, and active sessions securely inside finally blocks.

## 4. Deep Performance Optimization
- Filter early in pipeline pipelines, constraining resources at sources (e.g., using cmdlet filters rather than filtering downstream).
- Rely on modern collection types \`[System.Collections.Generic.List[T]]\` instead of array reassignment (\`+=\`) to conserve memory.
- Enforce page restrictions when retrieving datasets from remote enterprise directory domains.

## 5. Security & Input Sanitization
- Secure script operations via RemoteSigned script Execution Policies, digitally signing script files for enterprise deployments.
- Ban hardcoded system passwords, storing credentials as encrypted \`SecureString\` variables or using vaults.
- Sanitize arguments strictly to block malicious command injections in command contexts.

## 6. Layout Architecture & Folder Structure
- Maintain clean modular file structures, partitioning configurations using standard manifests:
  \`\`\`
  ├── MyModule/
  │   ├── MyModule.psd1     # Module manifest metadata
  │   ├── MyModule.psm1     # Module primary execution logic
  │   └── Private/          # Subroutine scripts folder
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`powershell
#<
.SYNOPSIS
    High-fidelity PowerShell script for directory backup and Windows health auditing.
.DESCRIPTION
    Performs compressed backups, checks target drive storage limits, and prints results.
.PARAMETER SourcePath
    Absolute path to directory being backed up.
.PARAMETER DestinationPath
    Directory output path storing the compressed backup (.zip).
#>
Param (
    [Parameter(Mandatory=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$SourcePath,

    [Parameter(Mandatory=$true)]
    [string]$DestinationPath
)

$ErrorActionPreference = "Stop"

Try {
    Write-Verbose "Starting health check: Inspecting disk space..."
    $Drive = Get-PSDrive -Name ($DestinationPath.Split(":")[0])
    $FreeSpaceGB = [Math]::Round($Drive.Free / 1GB, 2)

    if ($FreeSpaceGB -lt 5) {
        Write-Warning "Low disk space alert! Only $FreeSpaceGB GB remaining on target drive."
    }

    # Ensure target output directory exists
    if (-not (Test-Path $DestinationPath)) {
        New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
    }

    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $ZipFile = Join-Path $DestinationPath "Backup_$Timestamp.zip"

    Write-Host "Compressing directory $SourcePath to $ZipFile..." -ForegroundColor Cyan
    Compress-Archive -Path $SourcePath -DestinationPath $ZipFile -Force

    Write-Host "Backup completed successfully!" -ForegroundColor Green
    return [PSCustomObject]@{
        Success = $true
        ArchiveFile = $ZipFile
        FreeSpaceGB = $FreeSpaceGB
    }
} Catch {
    Write-Error "Backup processing failed: $_"
    return [PSCustomObject]@{
        Success = $false
        Error = $_.Exception.Message
    }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct testing scripts utilizing the standard Pester framework (\`*.Tests.ps1\`).
- Mock active operating system actions (such as \`Restart-Computer\` or file modifications) to run tests safely.
- Verify pipeline object structures and returned attributes under mock test runs.

## 9. Robust Exception Handling & Debug Flow
- Embed structural Try-Catch blocks around system I/O, registry modifications, or network socket triggers.
- Enforce \`$ErrorActionPreference = "Stop"\` globally to instantly escalate system failures to catch blocks.
- Output detailed exception diagnostic reports utilizing \`$Error[0]\` to local Windows Event Logs.

## 10. CLI & CI/CD Automation Flow
- Analyze script quality and static syntax styles using PSScriptAnalyzer via CLI runs:
  \`\`\`powershell
  Invoke-ScriptAnalyzer -Path .\MyScript.ps1
  \`\`\`
- Trigger automated script checking tests on target commits inside Windows runners in pipelines.`;
      } else if (skillSlug === "git-workflows") {
        content = metadata + `# Git Workflow & Branch Management Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Trunk-Based / Git Flow:** Enforce clean branching models, developing on isolated feature branches and only merging once verified.
- **Conventional Commits:** Standardize commit messages semantic structures (e.g. \`feat: add auth\`, \`fix: resolve memory leak\`).
- **Pristine History:** Encourage squash merges or rebase workflows to maintain a flat, linear git history tree.

## 2. Syntax & Typing Standards
- Enforce strict branch naming conventions: \`feature/name\`, \`bugfix/name\`, \`hotfix/name\`.
- Keep the \`.gitignore\` configuration accurate for ${languageLabel}, banning local temp assets or secrets \`.env\` files.
- Leverage Conventional Commits specifications to automate software changelog compiler engines.

## 3. Async & Data Flow Management
- Sync repository files safely via secure upstream push and pull streams.
- Control active integration workflows on PR boundaries, locking merges until automated testing flows pass.
- Maintain clear boundaries between fast-forward rebase updates and merge integration nodes.

## 4. Deep Performance Optimization
- Track heavy static binaries safely via Git LFS (Large File Storage) configurations to prevent clone lag.
- Run local git garbage collection prune routines to sweep dead reference logs periodically.
- Configure thin shallow checkouts (\`--depth 1\`) on remote build pipelines to optimize CI runtimes.

## 5. Security & Input Sanitization
- Strictly forbid check-ins containing local secrets, private keys, API endpoints, or database settings.
- Implement Husky pre-commit hooks combined with GitLeaks engines to intercept leaks proactively.
- Sign commit assertions using valid private GPG keys to authenticate author identities.

## 6. Layout Architecture & Folder Structure
- Host repository workflow pipelines in standard module locations:
  \`\`\`
  ├── .github/
  │   └── workflows/
  │       └── ci.yml        # CI build workflows
  ├── .husky/               # Pre-commit trigger hooks
  └── .gitignore            # Git exclusion manifest
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`bash
#!/bin/sh
# Husky pre-commit hook validation script ensuring lints and tests pass before commit proceeding
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit quality gates..."

# 1. Static typing and formatting analysis check
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint checking failed. Commit aborted."
  exit 1
fi

# 2. Run related unit test targets
npm run test:related
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ All quality gates passed! Commit proceeding..."
exit 0
\`\`\`

## 8. Testing & Mocking Strategy
- Construct pipeline integration assertions checking PR branch compilation quality.
- Feed automated test indicators to repository status reports using coverage hooks (e.g. CodeCov).
- Validate git hook triggers locally in local sandbox workspaces before pushing active configs.

## 9. Robust Exception Handling & Debug Flow
- Direct branch merge conflicts carefully via high-fidelity visual tools, banning blind resolution commits.
- Leverage \`git revert\` to undo problematic main branch changes instead of force-pushing rewritten histories.
- Trace missing or orphaned commits safely using git's reference log utility \`git reflog\`.

## 10. CLI & CI/CD Automation Flow
- Perform branch cleaning automation queries in local shells:
  \`\`\`bash
  git fetch -p && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d
  \`\`\`
- Keep commit-msg hooks aligned withConventional Commits patterns to block non-conforming messages.`;
      } else if (skillSlug === "performance-profiling") {
        content = metadata + `# Performance Profiling & Optimization Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Performance Budgets:** Establish strict, measurable load limits (e.g. total compiled package < 200KB).
- **Profile First:** Only perform targeted optimization work after gathering profiling traces identifying distinct bottlenecks.
- **Keep Main Thread Free:** Restrict expensive operations from running on the primary user interaction stream.

## 2. Syntax & Typing Standards
- Prioritize high-performance data structures (e.g. Set/Map lookups instead of long Array sweeps for large sets).
- Ban massive loop object reallocations, recycling memory structures via object pooling models.
- Rely on strict declarations to assist runtime engine optimizations (JIT compilers).

## 3. Async & Data Flow Management
- Offload non-UI data processing computations to isolated Web Workers to keep rendering speeds responsive.
- Run concurrent I/O fetches in parallel using Promise.all to bypass structural request bottlenecks.
- Steam, paginate, or lazily chunk heavy dynamic datasets during data transfer cycles.

## 4. Deep Performance Optimization
- Benchmark block runtimes systematically utilizing exact Performance API markers.
- Restrict rendering loops using caching memoizers and decoupled application state hubs.
- Employ asset preload and resource prefetch cues for essential load paths.

## 5. Security & Input Sanitization
- Sanitize data structures passed to benchmarking functions to protect profiling logs from injection tricks.
- Guard systems against memory leaks by detaching idle event handlers and clearing garbage scopes.
- Rely on optimized, benchmarked security engines that satisfy strict performance constraints.

## 6. Layout Architecture & Folder Structure
- Maintain performance tracking modules in dedicated workspace locations:
  \`\`\`
  ├── src/
  │   ├── utils/
  │   │   ├── benchmark.ts      # Runtime benchmarking helper
  │   │   └── memory-dump.ts    # Heap dump analyzer helper
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// High-fidelity performance benchmarking utility wrapper using standard Performance API
export async function profileExecutionTime<T>(taskName: string, action: () => Promise<T>): Promise<T> {
  const startMark = \`\${taskName}-start\`;
  const endMark = \`\${taskName}-end\`;
  
  if (typeof window !== "undefined" && window.performance) {
    window.performance.mark(startMark);
  }
  const startTime = Date.now();

  try {
    return await action();
  } finally {
    const duration = Date.now() - startTime;
    if (typeof window !== "undefined" && window.performance) {
      window.performance.mark(endMark);
      window.performance.measure(taskName, startMark, endMark);
      const measure = window.performance.getEntriesByName(taskName)[0];
      console.log(\`[PROFILER] \${taskName} executed in \${measure.duration.toFixed(2)}ms (High-Res)\`);
      window.performance.clearMarks(startMark);
      window.performance.clearMarks(endMark);
      window.performance.clearMeasures(taskName);
    } else {
      console.log(\`[PROFILER] \${taskName} executed in \${duration}ms\`);
    }
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct high-volume load test files using developer tools like k6 or autocannon.
- Automate benchmarking suites to catch and trigger warnings on software performance regression.
- Mock slow database connections to test interface responsiveness under high network latencies.

## 9. Robust Exception Handling & Debug Flow
- Trap Out Of Memory (OOM) failures safely, cleaning up loose connections or memory pools immediately.
- Export and trace visual CPU flame graphs to isolate deep execution bottlenecks.
- Inspect active Heap allocations via Chrome DevTools profiles to resolve memory issues.

## 10. CLI & CI/CD Automation Flow
- Perform package analysis scans on production builds to check sizes:
  \`\`\`bash
  npm run build -- --report  # Or use bundle visualizers
  \`\`\`
- Setup warnings on CI build pipelines if total compiled asset size grows beyond defined budgets.`;
      } else if (skillSlug === "clean-architecture") {
        content = metadata + `# Clean Architecture & Decoupled Domain Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Dependency Rule:** All source dependencies flow inward. The core Domain logic must remain pristine, completely decoupled from databases, UI, and external frameworks.
- **Separation of Concerns:** Partition features into discrete layers with highly explicit boundary controls.
- **Plug-and-Play Adaptability:** Infrastructure components (e.g. database engines, API libraries) should act as replaceable plugins.

## 2. Syntax & Typing Standards
- Enforce explicit contracts and interfaces for every external driver gateway (e.g. Repository patterns).
- Use strict Data Transfer Objects (DTOs) to safely marshal parameters across boundaries.
- Strictly ban direct imports of framework utilities or database clients inside core Domain entities or Use Cases.

## 3. Async & Data Flow Management
- Route actions systematically: Controller receives parameters -> DTO -> UseCase runs logic -> Repository writes -> DTO returns.
- Employ clean async/await signatures to carry domain actions through boundary adapters.
- Use mapping functions to transform raw database layouts into clean Domain Entities.

## 4. Deep Performance Optimization
- Separate data query models from write models using CQRS patterns to unlock performance gains.
- Abstract expensive database fetch routines behind caching proxies at the infrastructure boundary.
- Employ lazy-loading patterns for massive relational structures to keep load-times optimized.

## 5. Security & Input Sanitization
- Enforce parameters validation and privilege checks right at the entrance of Use Cases to block unauthorized inputs.
- Keep structural database entities isolated, never exposing raw schema models directly to public REST/GraphQL clients.
- Leverage Dependency Inversion to shield core business domains from vendor library updates.

## 6. Layout Architecture & Folder Structure
- Maintain strict folder organization mirroring Clean Architecture divisions:
  \`\`\`
  ├── src/
  │   ├── domain/           # Core Entities & rules
  │   ├── use-cases/        # Business logic routines
  │   ├── infrastructure/   # DB drivers, server, API adaptors
  │   └── presentation/     # Controllers, views, styling
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// 1. Decoupled Repository Interface Contract
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// 2. Pure Domain Use Case independent of infrastructure and frameworks
export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, email: string): Promise<boolean> {
    const existingUser = await this.userRepo.findById(userId);
    if (existingUser) {
      throw new Error("User already exists inside the system");
    }

    const newUser = new User(userId, email);
    await this.userRepo.save(newUser);
    return true;
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Compose pure, robust Use Case unit tests, mocking database gateways without spinning up live instances.
- Maintain rapid test execution runtimes (under 1 second) by isolating business logic from filesystem or database delays.
- Assert on negative edge-cases and domain boundary errors to guarantee robustness.

## 9. Robust Exception Handling & Debug Flow
- Design specialized Domain Exceptions representing business rule failures, converting them at presentation boundaries.
- Utilize global exception handlers at presentation layers to intercept unexpected system failures cleanly.
- Ensure state integrity through transactional boundaries when Use Cases invoke multiple repository mutations.

## 10. CLI & CI/CD Automation Flow
- Build scaffolding templates to generate structured Clean Architecture code files:
  \`\`\`bash
  npm run generate -- --type=usecase --name=RegisterUser
  \`\`\`
- Integrate dependency check utilities (like dependency-cruiser) in CI pipelines to block illegal imports flowing from inner to outer layers.`;
      } else {
        // Fallback for other skills in English
        content = metadata + `# Professional Agent Skill Specification (${formattedSlug})

## 1. Core Design Principles
- Guarantee clean, modular, and extensible software structures optimized for ${formattedSlug}.
- Leverage industry-standard design patterns to construct maintainable layers.

## 2. Syntax & Typing Standards
- Enforce strict typing on all method signatures and variables to avoid runtime exceptions.
- Adhere to community-vetted style guides and standard formatting templates.

## 3. Async & Data Flow Management
- Perform asynchronous and non-blocking actions efficiently to keep memory consumption low.
- Design clean data pipelines, blocking deadlocks and memory corruption.

## 4. Deep Performance Optimization
- Benchmark core algorithms and memory consumption patterns continuously.
- Abstract expensive operations behind cached service interfaces to eliminate overhead.

## 5. Security & Input Sanitization
- Strictly sanitize all client-supplied parameters prior to persistence or execution.
- Prevent security threats by output-encoding strings globally.

## 6. Layout Architecture & Folder Structure
- Maintain clean, decoupled file distributions following architectural guidelines:
  \`\`\`
  ├── src/
  │   ├── core/         # Core business domain
  │   ├── adapters/     # Boundary gateways
  │   └── config/       # Environment setups
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// High-fidelity production-ready boilerplate code
export async function executeModuleTask(payload: any) {
  if (!payload) {
    throw new Error("Payload is required for action execution");
  }
  
  try {
    const result = await coreService.process(payload);
    return { success: true, result };
  } catch (error) {
    console.error("Task failed to execute", error);
    return { success: false, message: error.message };
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct atomic unit tests validating core logic branches under testing frameworks.
- Abstract external infrastructure dependencies behind mock interfaces.

## 9. Robust Exception Handling & Debug Flow
- Trap errors gracefully using clean Try-Catch blocks.
- Maintain comprehensive logging setups without disclosing sensitive server keys.

## 10. CLI & CI/CD Automation Flow
- Formulate static syntax checks and test suite validation commands:
  \`\`\`bash
  npm run test && npm run lint
  \`\`\`
- Enforce automated quality control tests on server commits.`;
      }
    }
  } else if (activeFileCheck.startsWith("agents/")) {
    // Dynamic Agent Files Content Router
    const agentSlug = activeFileCheck.replace("agents/", "");
    if (isVi) {
      content = `# Chỉ thị Subagent Chuyên biệt (Agent Specification)
Vai trò Agent: \`${agentSlug}\`

Bạn là một tác nhân AI (Subagent) chuyên trách cao cấp sở hữu kiến thức chuyên sâu về \`${agentSlug}\`.

## 🎯 Nhiệm vụ chính:
1. Giải quyết triệt để các vấn đề phức tạp, cấu trúc mã nguồn liên quan đến vai trò được giao.
2. Viết mã nguồn ngắn gọn, tối ưu, dễ bảo trì và mở rộng.
3. Phối hợp nhịp nhàng với Orchestrator để hoàn thành tiến độ dự án.
`;
    } else {
      content = `# Specialized Subagent Specification (Agent)
Agent Specialist Role: \`${agentSlug}\`

You are an autonomous high-performance AI Subagent possessing domain-expert knowledge and specialized patterns for \`${agentSlug}\`.

## 🎯 Core Objectives:
1. Decisively resolve complex architecture layout challenges relating to your specialist role.
2. Produce short, readable, highly reusable, and performant code layers.
3. Maintain perfect synergy with the main Orchestrator to ensure smooth progression.
`;
    }
  } else if (activeFileCheck.startsWith("rules/") && activeFileCheck !== "rules/GEMINI.md") {
    // Dynamic Rules Files Content Router
    const ruleSlug = activeFileCheck.replace("rules/", "");
    if (isVi) {
      content = `# Bộ quy chuẩn chỉ thị Prompt chuyên sâu (.rules)
Phân khu quy chuẩn: \`${ruleSlug}\`

Bộ quy tắc này được kích hoạt tự động để điều phối hành vi viết code của AI đối với các công nghệ liên quan tới \`${ruleSlug}\`.

## 🛡️ Nguyên tắc hoạt động:
1. Cấm tuyệt đối việc sử dụng code không an toàn hoặc không định kiểu rõ ràng.
2. Bắt buộc kiểm soát lỗi chặt chẽ ở mọi cấp độ (Error Boundary, Try/Catch, Schema validation).
3. Đảm bảo hiệu năng xử lý ở mức tối đa.
`;
    } else {
      content = `# Targeted Prompt Rules Specification (.rules)
Target Rule Domain: \`${ruleSlug}\`

These rules are loaded automatically to steer the AI coding engine behaviors for assets relating to \`${ruleSlug}\`.

## 🛡️ Key Directives:
1. Strictly ban typeless variables or unsafe library implementations.
2. Mandate highly resilient exception handling at all architecture layers (Error boundaries, try-catch, schemas).
3. Maximize compilation speeds and run-time optimization constraints.
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

> Tệp tin cấu hình hành vi của AI trong không gian làm việc này. Bắt buộc lưu tệp tin này dưới đường dẫn: \`rules/GEMINI.md\`

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

> This file defines how the AI behaves in this workspace. Mandatory path to save: \`rules/GEMINI.md\`

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

> 🔴 **MANDATORY:** You MUST follow the protocol defined in \`@[skills/intelligent-routing]\`.

---

## TIER 0: UNIVERSAL RULES (Always Active)

### 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

### 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow \`@[skills/clean-code]\` rules. No exceptions.**

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to 2025 standards (Core Web Vitals).
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

### 📁 File Dependency Awareness

**Before modifying ANY file:**

1. Check \`CODEBASE.md\` → File Dependencies
2. Identify dependent files
3. Update ALL affected files together

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
}
