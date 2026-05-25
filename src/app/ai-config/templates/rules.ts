interface RulesTemplateParams {
  ideLabel: string;
  frameworkLabel: string;
  languageLabel: string;
  dbLabel: string;
  stylingLabel: string;
  testingLabel: string;
  frameworkSection: string;
  languageSection: string;
  databaseSection: string;
  stylingSection: string;
  language: string;
  ide: string;
  compilerCommand: string;
  testCommand: string;
  isVi: boolean;
  filename: string;
  activeFileCheck: string;
}

export function getRulesTemplate(params: RulesTemplateParams): string {
  const {
    ideLabel,
    frameworkLabel,
    languageLabel,
    dbLabel,
    stylingLabel,
    testingLabel,
    frameworkSection,
    languageSection,
    databaseSection,
    stylingSection,
    language,
    ide,
    compilerCommand,
    testCommand,
    isVi,
    filename,
    activeFileCheck,
  } = params;

  if (activeFileCheck === ".antigravityrules") {
    if (isVi) {
      return `# Hướng dẫn ${ideLabel} (.antigravityrules)
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
      return `# ${ideLabel} Guidelines (.antigravityrules)
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
  }

  if (activeFileCheck === ".editorconfig") {
    return `# EditorConfig root setting
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
  }

  if (activeFileCheck === "settings.json") {
    return `{
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
  }

  if (activeFileCheck === "import_manifest.json") {
    return `{
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
  }

  if (activeFileCheck === "plugin.json") {
    return `{
  "name": "antigravity-clean-code",
  "version": "1.0.0",
  "description": "Essential plugin extending coding capability for Next.js and TypeScript",
  "entryPoint": "index.js",
  "required": true
}`;
  }

  if (activeFileCheck === "mcp_config.json") {
    return `{
  "mcpServers": {
    "vulnerability-scanner": {
      "command": "python",
      "args": [".agent/skills/vulnerability-scanner/scripts/security_scan.py"],
      "env": {},
      "disabled": false
    }
  }
}`;
  }

  if (activeFileCheck === "hooks.json") {
    return `{
  "onAgentActivate": [
    "run_command(npx eslint .)"
  ],
  "beforeFileSave": [
    "run_command(npx tsc --noEmit)"
  ]
}`;
  }

  if (activeFileCheck === "plugins/structure") {
    if (isVi) {
      return `# Cấu trúc Thư mục Plugins Antigravity CLI

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
      return `# Antigravity CLI Plugins Directory Structure

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
  }

  if (activeFileCheck === "rules/clean-code.rules") {
    if (isVi) {
      return `# Quy tắc Prompt Viết Mã Sạch (.rules)
Đường dẫn: \`plugins/my-plugin/rules/clean-code.rules\`

- Luôn viết code tường minh, dễ đọc và tự giải thích.
- Giới hạn độ dài hàm dưới 25 dòng code.
- Không sử dụng các từ viết tắt tối nghĩa hoặc biến vô nghĩa.
`;
    } else {
      return `# Clean Code Rules Specification (.rules)
File path: \`plugins/my-plugin/rules/clean-code.rules\`

- Enforce highly clean, readable, and self-documenting code.
- Restrict function blocks to a maximum of 25 lines.
- Ban obfuscated shorthand variable names and lazy comments.
`;
    }
  }

  if (activeFileCheck === "rules/performance.rules") {
    if (isVi) {
      return `# Quy tắc Prompt Tối ưu Hiệu năng (.rules)
Đường dẫn: \`plugins/my-plugin/rules/performance.rules\`

- Tránh re-render không đáng có bằng cách tối ưu useMemo và useCallback.
- Thực thi song song các câu lệnh bất đồng bộ độc lập (Promise.all).
- Tối ưu hóa chỉ mục cơ sở dữ liệu để ngăn chặn quét toàn bảng.
`;
    } else {
      return `# Performance Rules Specification (.rules)
File path: \`plugins/my-plugin/rules/performance.rules\`

- Prevent wasteful re-renders using optimized useMemo and useCallback bindings.
- Enforce parallel execution of independent async operations (Promise.all).
- Optimize index layouts to eliminate full table sweeps.
`;
    }
  }

  if (activeFileCheck === "config-overview.md") {
    if (isVi) {
      return `# Cấu hình Antigravity IDE (.agent/)
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
      return `# Antigravity IDE Configuration (.agent/)
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
  }

  if (activeFileCheck.startsWith("rules/") && activeFileCheck !== "rules/GEMINI.md") {
    // Dynamic Rules Files Content Router
    const ruleSlug = activeFileCheck.replace("rules/", "");
    if (isVi) {
      return `# Bộ quy chuẩn chỉ thị Prompt chuyên sâu (.rules)
Phân khu quy chuẩn: \`${ruleSlug}\`

Bộ quy tắc này được kích hoạt tự động để điều phối hành vi viết code của AI đối với các công nghệ liên quan tới \`${ruleSlug}\`.

## 🛡️ Nguyên tắc hoạt động:
1. Cấm tuyệt đối việc sử dụng code không an sau hoặc không định kiểu rõ ràng.
2. Bắt buộc kiểm soát lỗi chặt chẽ ở mọi cấp độ (Error Boundary, Try/Catch, Schema validation).
3. Đảm bảo hiệu năng xử lý ở mức tối đa.
`;
    } else {
      return `# Targeted Prompt Rules Specification (.rules)
Target Rule Domain: \`${ruleSlug}\`

These rules are loaded automatically to steer the AI coding engine behaviors for assets relating to \`${ruleSlug}\`.

## 🛡️ Key Directives:
1. Strictly ban typeless variables or unsafe library implementations.
2. Mandate highly resilient exception handling at all architecture layers (Error boundaries, try-catch, schemas).
3. Maximize compilation speeds and run-time optimization constraints.
`;
    }
  }

  // DEFAULT (GEMINI.md)
  if (isVi) {
    return `# GEMINI.md - DEV-VIBE-CHEATSHEET

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
    return `# GEMINI.md - DEV-VIBE-CHEATSHEET

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
