import fs from "fs";
import path from "path";
import https from "https";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";

interface InitOptions {
  tech?: string[];
  skills?: string[];
  ide?: string;
}

// Helper to fetch content from raw GitHub URL
function fetchRawContent(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url} (Status Code: ${res.statusCode})`));
        return;
      }
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

// Available technologies
const AVAILABLE_TECHS = [
  { title: "Next.js / React", value: "nextjs" },
  { title: "TypeScript", value: "typescript" },
  { title: "Node.js Best Practices", value: "nodejs" },
  { title: "Python Patterns", value: "python" },
  { title: "Rust Specialist", value: "rust" },
  { title: "C# (.NET Core)", value: "csharp" },
];

// Available modular skills
const AVAILABLE_SKILLS = [
  { title: "Pragmatic Clean Code (clean-code)", value: "clean-code" },
  { title: "Database Architecture (database-design)", value: "database-design" },
  { title: "Premium UI/UX Design (frontend-design)", value: "frontend-design" },
  { title: "OWASP Security Scanner (vulnerability-scanner)", value: "vulnerability-scanner" },
  { title: "Advanced Testing Pyramid (testing-patterns)", value: "testing-patterns" },
  { title: "Tailwind CSS v4 Patterns (tailwind-patterns)", value: "tailwind-patterns" },
  { title: "Next.js App Router Specialist (nextjs-react-expert)", value: "nextjs-react-expert" },
  { title: "Core Web Vitals Profiler (performance-profiling)", value: "performance-profiling" },
  { title: "Systematic Debugger (systematic-debugging)", value: "systematic-debugging" },
];

export async function initCommand(options: InitOptions) {
  console.log(chalk.bold.cyan("\n🔌 Khởi tạo Quy chuẩn Dev-Vibe Agent Initializer\n"));

  let { ide, tech, skills } = options;

  // 1. Prompt for IDE if not provided
  if (!ide) {
    const response = await prompts({
      type: "select",
      name: "ide",
      message: "Chọn cấu hình IDE đích của bạn:",
      choices: [
        { title: "Cursor (.cursorrules)", value: "cursor" },
        { title: "Windsurf (.windsurfrules)", value: "windsurf" },
        { title: "Antigravity IDE (.antigravityrules)", value: "antigravity" },
        { title: "Antigravity CLI (.gemini/antigravity-cli/)", value: "antigravity-cli" },
        { title: "VS Code (.vscode/settings.json)", value: "vscode" },
      ],
    });
    ide = response.ide;
    if (!ide) {
      console.log(chalk.yellow("👋 Đã hủy khởi tạo."));
      return;
    }
  }

  // 2. Prompt for Technologies if not provided
  if (!tech || tech.length === 0) {
    const response = await prompts({
      type: "multiselect",
      name: "tech",
      message: "Chọn ngôn ngữ / công nghệ dự án của bạn (phím Space để chọn):",
      choices: AVAILABLE_TECHS,
      hint: "- Space để chọn, Enter để tiếp tục",
    });
    tech = response.tech;
    if (!tech) {
      console.log(chalk.yellow("👋 Đã hủy khởi tạo."));
      return;
    }
  }

  // 3. Prompt for Skills if not provided
  if (!skills || skills.length === 0) {
    const response = await prompts({
      type: "multiselect",
      name: "skills",
      message: "Chọn các Agent Skills quy chuẩn muốn áp dụng:",
      choices: AVAILABLE_SKILLS,
      hint: "- Space để chọn, Enter để tiếp tục",
    });
    skills = response.skills;
    if (!skills) {
      console.log(chalk.yellow("👋 Đã hủy khởi tạo."));
      return;
    }
  }

  console.log("");
  const spinner = ora(chalk.blue("Đang tải tệp mẫu và cấu hình quy chuẩn từ GitHub...")).start();

  try {
    const isCliMode = ide === "antigravity-cli";
    const baseRepoUrl = "https://raw.githubusercontent.com/vanthiet1/dev-vibe-cheatsheet/main";
    const targetDir = process.cwd();

    // Determine paths for skills and agents
    const skillsDir = isCliMode
      ? path.join(targetDir, ".gemini", "antigravity-cli", "plugins", "my-plugin", "skills")
      : path.join(targetDir, ".agent", "skills");

    const agentsDir = isCliMode
      ? path.join(targetDir, ".gemini", "antigravity-cli", "plugins", "my-plugin", "agents")
      : path.join(targetDir, ".agent", "agents");

    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
    }

    // Download each selected skill file
    for (const skill of skills) {
      spinner.text = chalk.blue(`Đang tải skill quy chuẩn: ${chalk.bold(skill)}...`);
      const skillUrl = `${baseRepoUrl}/.agent/skills/${skill}/SKILL.md`;
      
      try {
        const fileContent = await fetchRawContent(skillUrl);
        const destinationFolder = path.join(skillsDir, skill);
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }
        
        fs.writeFileSync(path.join(destinationFolder, "SKILL.md"), fileContent, "utf8");
      } catch (err: any) {
        spinner.warn(chalk.yellow(`Không thể tải mẫu cho skill: ${skill}. Bỏ qua.`));
      }
    }

    // Download Agents if Antigravity CLI
    if (isCliMode) {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      
      const defaultAgents = ["debugger", "orchestrator"];
      for (const agent of defaultAgents) {
        spinner.text = chalk.blue(`Đang tải agent quy chuẩn: ${chalk.bold(agent)}...`);
        const agentUrl = `${baseRepoUrl}/.agent/agents/${agent}.md`;
        try {
          const fileContent = await fetchRawContent(agentUrl);
          fs.writeFileSync(path.join(agentsDir, `${agent}.md`), fileContent, "utf8");
        } catch (err) {
          // ignore or fallback
        }
      }
    }

    if (isCliMode) {
      spinner.text = chalk.blue("Đang thiết lập cấu hình Antigravity CLI rules...");
      
      const geminiDir = path.join(targetDir, ".gemini", "antigravity-cli");
      const rulesDir = path.join(geminiDir, "rules");
      const myPluginDir = path.join(geminiDir, "plugins", "my-plugin");

      if (!fs.existsSync(rulesDir)) fs.mkdirSync(rulesDir, { recursive: true });
      if (!fs.existsSync(myPluginDir)) fs.mkdirSync(myPluginDir, { recursive: true });

      // JSON files
      const settingsJson = {
        enableTerminalSandbox: true,
        permissions: {
          allow: [
            "command(git)",
            "command(npm test)",
            "command(npx tsc)"
          ],
          deny: [
            "command(rm -rf)",
            "command(del /s)",
            "command(format)"
          ]
        }
      };

      const importManifestJson = {
        plugins: {
          "antigravity-clean-code": {
            version: "1.0.0",
            enabled: true,
            importedAt: new Date().toISOString()
          }
        },
        settingsLoaded: true,
        lastSyncTimestamp: Date.now()
      };

      const pluginJson = {
        name: "antigravity-clean-code",
        version: "1.0.0",
        description: "Essential plugin extending coding capability for Next.js and TypeScript",
        entryPoint: "index.js",
        required: true
      };

      const mcpConfigJson = {
        mcpServers: {
          "vulnerability-scanner": {
            command: "python",
            args: [".agent/skills/vulnerability-scanner/scripts/security_scan.py"],
            env: {},
            disabled: false
          }
        }
      };

      const hooksJson = {
        onAgentActivate: [
          "run_command(npx eslint .)"
        ],
        beforeFileSave: [
          "run_command(npx tsc --noEmit)"
        ]
      };

      fs.writeFileSync(path.join(geminiDir, "settings.json"), JSON.stringify(settingsJson, null, 2), "utf8");
      fs.writeFileSync(path.join(geminiDir, "import_manifest.json"), JSON.stringify(importManifestJson, null, 2), "utf8");
      fs.writeFileSync(path.join(myPluginDir, "plugin.json"), JSON.stringify(pluginJson, null, 2), "utf8");
      fs.writeFileSync(path.join(myPluginDir, "mcp_config.json"), JSON.stringify(mcpConfigJson, null, 2), "utf8");
      fs.writeFileSync(path.join(myPluginDir, "hooks.json"), JSON.stringify(hooksJson, null, 2), "utf8");

      // Rules files
      const cleanCodeRules = `# Clean Code Rules — Antigravity CLI\n- Khai báo biến rõ ràng, tự giải thích nghĩa.\n- Giữ hàm ngắn gọn nguyên tử (max 25 dòng).\n- Áp dụng cấu trúc phẳng, tránh lồng nested code.`;
      const performanceRules = `# Performance Rules — Antigravity CLI\n- Tránh re-render không kiểm soát.\n- Tránh waterfalls trong truy vấn cơ sở dữ liệu và API.`;
      
      fs.writeFileSync(path.join(rulesDir, "clean-code.rules"), cleanCodeRules, "utf8");
      fs.writeFileSync(path.join(rulesDir, "performance.rules"), performanceRules, "utf8");

      if (tech.includes("typescript")) {
        fs.writeFileSync(
          path.join(rulesDir, "typescript.rules"),
          `# TypeScript Rules — Antigravity CLI\n- Sử dụng strict mode.\n- Tuyệt đối cấm từ khóa 'any'.`,
          "utf8"
        );
      }
      if (tech.includes("nextjs")) {
        fs.writeFileSync(
          path.join(rulesDir, "nextjs.rules"),
          `# Next.js Rules — Antigravity CLI\n- Sử dụng React Server Components cho nạp dữ liệu.\n- Tối ưu SEO và an toàn hydration.`,
          "utf8"
        );
      }
      if (tech.includes("postgres")) {
        fs.writeFileSync(
          path.join(rulesDir, "postgres-db.rules"),
          `# PostgreSQL Rules — Antigravity CLI\n- Chỉ mục index đầy đủ khóa ngoại.\n- Tránh table scans.`,
          "utf8"
        );
      }
    } else {
      // Write IDE Rules File
      spinner.text = chalk.blue("Đang thiết lập cấu hình IDE rules chính...");
      let rulesFilename = ".antigravityrules";
      if (ide === "cursor") rulesFilename = ".cursorrules";
      else if (ide === "windsurf") rulesFilename = ".windsurfrules";
      else if (ide === "vscode") rulesFilename = ".vscode/settings.json";

      const techString = tech.map((t) => `- ${t.toUpperCase()}`).join("\n");
      const skillListString = skills.map((s) => `- ${s}`).join("\n");

      const rulesContent = `# Cấu hình Quy chuẩn Dev-Vibe — Antigravity Agent Configuration
# Trình chỉnh sửa IDE: ${ide.toUpperCase()}

# 🔌 Hệ thống Kỹ năng Agent Skills Tự động (Modular Agent Skills)
# Bạn được nạp các module kỹ năng chuyên sâu tại thư mục \`.agent/skills/\`.
# TRƯỚC KHI thực hiện bất kỳ lệnh lập trình hoặc chỉnh sửa file nào, bạn BẮT BUỘC phải đọc tệp \`SKILL.md\` tương ứng trong \`.agent/skills/\` để tuân thủ thiết kế và tiêu chuẩn chất lượng.

## 📁 Danh sách Skills đã nạp trong dự án:
${skillListString}

## 🚀 Công nghệ & Ngôn ngữ của dự án:
${techString}

## 💡 Hướng dẫn Nguyên lý cốt lõi (Universal Guidelines):
1. **Tinh giản & Tối giản (Keep it Simple):** Ưu tiên giải pháp tối giản hoạt động được ngay. Không over-engineering hoặc viết các cấu trúc phức tạp khi chưa cần thiết.
2. **Quy chuẩn tên gọi:** CamelCase cho biến địa phương, PascalCase cho hàm và lớp.
3. **Phân rã Hàm nhỏ (Atomic Methods):** Một hàm hoặc phương thức không được dài quá 25 dòng code. Nếu quá, hãy phân tách ra các hàm con nguyên tử độc lập.
4. **Không viết Comment thừa:** Code tự giải thích qua cách đặt tên biến và cấu trúc hàm rõ ràng.
5. **Chất lượng kiểm thử:** Áp dụng mô hình AAA (Arrange-Act-Assert) để xây dựng test suite rõ ràng.
`;

      if (ide === "vscode") {
        const vscodeDir = path.join(targetDir, ".vscode");
        if (!fs.existsSync(vscodeDir)) {
          fs.mkdirSync(vscodeDir, { recursive: true });
        }
        const vscodeSettingsPath = path.join(targetDir, ".vscode", "settings.json");
        
        let existingSettings: any = {};
        if (fs.existsSync(vscodeSettingsPath)) {
          try {
            existingSettings = JSON.parse(fs.readFileSync(vscodeSettingsPath, "utf8"));
          } catch (_) {}
        }
        
        existingSettings["antigravity.enabled"] = true;
        existingSettings["antigravity.skillsPath"] = ".agent/skills";
        existingSettings["antigravity.rules"] = {
          ide,
          technologies: tech,
          skills,
        };
        
        fs.writeFileSync(vscodeSettingsPath, JSON.stringify(existingSettings, null, 2), "utf8");
      } else {
        fs.writeFileSync(path.join(targetDir, rulesFilename), rulesContent, "utf8");
      }

      // NOW: Generate the complete workspace tree for standard IDE mode
      const agentDir = path.join(targetDir, ".agent");
      const rulesFolder = path.join(agentDir, "rules");
      const workflowsFolder = path.join(agentDir, "workflows");

      if (!fs.existsSync(rulesFolder)) fs.mkdirSync(rulesFolder, { recursive: true });
      if (!fs.existsSync(agentsDir)) fs.mkdirSync(agentsDir, { recursive: true });
      if (!fs.existsSync(workflowsFolder)) fs.mkdirSync(workflowsFolder, { recursive: true });

      // 1. Write config-overview.md
      const configOverviewContent = `# Cấu hình Antigravity IDE (.agent/)
Chào mừng bạn đến với trình cấu hình nâng cao dành cho Google Antigravity IDE.

Thư mục \`.agent/\` đặt tại gốc dự án là nơi lưu trữ toàn bộ chỉ thị, kỹ năng và quy trình hoạt động để huấn luyện AI coding assistant hiểu sâu sắc về codebase của bạn.

## 📁 Sơ đồ cấu trúc thư mục tối ưu:
- **Rules (\`.agent/rules/\`):** Nơi chứa quy chuẩn hành vi cốt lõi \`GEMINI.md\`.
- **Skills (\`.agent/skills/\`):** Các mô-đun kỹ năng phân rã thông minh (\`SKILL.md\`) giúp AI hoạt động chuẩn xác theo từng công nghệ mà không làm tràn bộ nhớ token.
- **Agents (\`.agent/agents/\`):** Định nghĩa vai trò các tác nhân AI chuyên biệt (Subagents) như Debugger, Orchestrator, Database Architect...
- **Workflows (\`.agent/workflows/\`):** Kịch bản tự động hóa các tác vụ lặp đi lặp lại như chạy test, xác minh code, điều phối tác nhân.
`;
      fs.writeFileSync(path.join(agentDir, "config-overview.md"), configOverviewContent, "utf8");

      // 2. Download Rules/GEMINI.md
      spinner.text = chalk.blue("Đang tải quy chuẩn cốt lõi GEMINI.md...");
      try {
        const geminiContent = await fetchRawContent(`${baseRepoUrl}/.agent/rules/GEMINI.md`);
        fs.writeFileSync(path.join(rulesFolder, "GEMINI.md"), geminiContent, "utf8");
      } catch (err) {
        fs.writeFileSync(path.join(rulesFolder, "GEMINI.md"), rulesContent, "utf8");
      }

      // 3. Download default and dynamic stack-specific Agents
      const targetAgents = ["debugger", "orchestrator"];
      if (tech.includes("typescript") || tech.includes("nextjs")) {
        targetAgents.push("frontend-specialist");
      }
      if (tech.includes("postgres") || tech.includes("mongodb")) {
        targetAgents.push("database-architect");
      }

      for (const agent of targetAgents) {
        spinner.text = chalk.blue(`Đang tải agent chuyên trách: ${chalk.bold(agent)}...`);
        try {
          const agentContent = await fetchRawContent(`${baseRepoUrl}/.agent/agents/${agent}.md`);
          fs.writeFileSync(path.join(agentsDir, `${agent}.md`), agentContent, "utf8");
        } catch (err) {
          // ignore or fallback
        }
      }

      // 4. Download standard Workflows
      const workflows = ["debug", "test", "verify", "coordinate"];
      for (const workflow of workflows) {
        spinner.text = chalk.blue(`Đang tải workflow tự động: ${chalk.bold(workflow)}...`);
        try {
          const workflowContent = await fetchRawContent(`${baseRepoUrl}/.agent/workflows/${workflow}.md`);
          fs.writeFileSync(path.join(workflowsFolder, `${workflow}.md`), workflowContent, "utf8");
        } catch (err) {
          // ignore or fallback
        }
      }
    }

    spinner.succeed(chalk.bold.green("Đã hoàn thành thiết lập Quy chuẩn Dev-Vibe thành công! 🎉"));
    
    console.log(chalk.cyan("\n📂 Thư mục dự án của bạn đã được cập nhật:"));
    if (isCliMode) {
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/settings.json`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/import_manifest.json`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/plugins/my-plugin/plugin.json`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/plugins/my-plugin/mcp_config.json`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/plugins/my-plugin/hooks.json`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/rules/`));
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/plugins/my-plugin/skills/`));
      skills.forEach((s) => {
        console.log(chalk.gray(`  └── .gemini/antigravity-cli/plugins/my-plugin/skills/${s}/SKILL.md`));
      });
      console.log(chalk.gray(`- [Tạo mới] .gemini/antigravity-cli/plugins/my-plugin/agents/`));
    } else {
      let rulesFilename = ".antigravityrules";
      if (ide === "cursor") rulesFilename = ".cursorrules";
      else if (ide === "windsurf") rulesFilename = ".windsurfrules";
      else if (ide === "vscode") rulesFilename = ".vscode/settings.json";

      console.log(chalk.gray(`- [Tạo mới] ${rulesFilename}`));
      console.log(chalk.gray(`- [Tạo mới] .agent/config-overview.md`));
      console.log(chalk.gray(`- [Tạo mới] .agent/rules/GEMINI.md`));
      console.log(chalk.gray(`- [Tạo mới] .agent/skills/`));
      skills.forEach((s) => {
        console.log(chalk.gray(`  └── .agent/skills/${s}/SKILL.md`));
      });
      console.log(chalk.gray(`- [Tạo mới] .agent/agents/ (debugger, orchestrator, v.v...)`));
      console.log(chalk.gray(`- [Tạo mới] .agent/workflows/ (debug, test, verify, coordinate)`));
    }

    console.log(chalk.bold.yellow("\n💡 Gợi ý tiếp theo:"));
    console.log(chalk.white(`1. Mở IDE của bạn và kích hoạt Agent AI.`));
    if (isCliMode) {
      console.log(chalk.white(`2. Các plugin, rules và hooks của Antigravity CLI đã sẵn sàng trong thư mục \`.gemini/antigravity-cli/\`!`));
    } else {
      console.log(chalk.white(`2. AI sẽ tự động đọc quy chuẩn từ thư mục \`.agent/\` (Rules, Skills, Agents, Workflows) để lập trình đúng ý bạn nhất!\n`));
    }

  } catch (error: any) {
    spinner.fail(chalk.bold.red("Khởi tạo thất bại!"));
    throw error;
  }
}
