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
  } else if (activeFileCheck.startsWith("skills/")) {
    // Dynamic Skill Files Content Router
    const skillSlug = activeFileCheck.replace("skills/", "").replace("/SKILL.md", "");
    if (isVi) {
      content = `# Kỹ năng Agent nâng cao (SKILL.md)
Phân mục kỹ năng: \`${skillSlug}\`

Bản tài liệu này hướng dẫn chi tiết cho AI Agent áp dụng tốt nhất các mẫu thiết kế và nguyên lý lập trình tối ưu liên quan trực tiếp đến \`${skillSlug}\` trong không gian làm việc của bạn.

## 🚀 Các yêu cầu bắt buộc:
1. Đảm bảo cấu trúc code mạch lạc, tự giải thích và tái sử dụng tối đa.
2. Không over-engineer, tối giản hóa logic để đạt hiệu quả cao nhất.
3. Luôn kiểm tra hiệu năng, truy vấn dữ liệu và bundle size trước khi kết thúc.
`;
    } else {
      content = `# Advanced Agent Skill Specification (SKILL.md)
Skill module category: \`${skillSlug}\`

This documentation serves as a tailored instruction set guiding the AI Agent on how to best apply core development patterns, performance enhancements, and structure configurations for \`${skillSlug}\` in this repository.

## 🚀 Key Mandates:
1. Guarantee highly modular, clean, and self-documenting code layouts.
2. Ban unnecessary abstractions and prioritize MVP structures.
3. Validate performance, execution plans, and bundle sizes prior to task completion.
`;
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
