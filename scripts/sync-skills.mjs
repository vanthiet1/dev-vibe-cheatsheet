import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsDir = path.join(__dirname, '..', '.agent', 'skills');
const templatesDir = path.join(__dirname, '..', 'src', 'app', 'ai-config', 'templates', 'skills');
const globalScriptsDir = path.join(__dirname, '..', '.agent', 'scripts');

if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

// Map mapping standard folder slugs to custom template file names (if different)
const CUSTOM_SLUG_MAP = {
  'vulnerability-scanner': 'security-scanner',
  'database-optimization': 'clean-architecture',
  'testing-patterns': 'git-workflows'
};

const PYTHON_SCRIPTS_MAP = {
  "api-patterns": ["scripts/api_validator.py"],
  "database-design": ["scripts/schema_validator.py"],
  "frontend-design": ["scripts/accessibility_checker.py", "scripts/ux_audit.py"],
  "geo-fundamentals": ["scripts/geo_checker.py"],
  "i18n-localization": ["scripts/i18n_checker.py"],
  "lint-and-validate": ["scripts/lint_runner.py", "scripts/type_coverage.py"],
  "mobile-design": ["scripts/mobile_audit.py"],
  "nextjs-react-expert": ["scripts/convert_rules.py", "scripts/react_performance_checker.py"],
  "performance-profiling": ["scripts/lighthouse_audit.py"],
  "seo-fundamentals": ["scripts/seo_checker.py"],
  "testing-patterns": ["scripts/test_runner.py"],
  "vulnerability-scanner": ["scripts/security_scan.py"],
  "webapp-testing": ["scripts/playwright_runner.py"],
};

function toCamelCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toFormattedLabel(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 1. Scan .agent/skills/ for all folders
const folders = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

const allRegisteredSkills = [];
const scriptsRegistry = {};

// Scan global .agent/scripts/ for python files and add to scripts registry
if (fs.existsSync(globalScriptsDir)) {
  const globalFiles = fs.readdirSync(globalScriptsDir).filter(f => f.endsWith('.py'));
  globalFiles.forEach(file => {
    const filePath = path.join(globalScriptsDir, file);
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    scriptsRegistry[`.agent/scripts/${file}`] = sourceCode;
    scriptsRegistry[`scripts/${file}`] = sourceCode;
    scriptsRegistry[file] = sourceCode; // raw filename fallback
  });
  console.log(`Scanned ${globalFiles.length} global scripts from .agent/scripts/`);
}

folders.forEach(folder => {
  const customName = CUSTOM_SLUG_MAP[folder] || folder;
  const tsFileName = `${customName}.ts`;
  const tsFilePath = path.join(templatesDir, tsFileName);

  allRegisteredSkills.push({
    folder,
    slug: customName,
    camelName: toCamelCase(customName)
  });

  // Collect Python scripts for registry
  const pyScripts = PYTHON_SCRIPTS_MAP[folder];
  if (pyScripts) {
    pyScripts.forEach(script => {
      const scriptPath = path.join(skillsDir, folder, script);
      if (fs.existsSync(scriptPath)) {
        const sourceCode = fs.readFileSync(scriptPath, 'utf8');
        // Map both original folder slug and custom template slug for safety!
        scriptsRegistry[`${folder}/${script}`] = sourceCode;
        scriptsRegistry[`skills/${folder}/${script}`] = sourceCode;
        scriptsRegistry[`.agent/skills/${folder}/${script}`] = sourceCode;
        if (customName !== folder) {
          scriptsRegistry[`${customName}/${script}`] = sourceCode;
          scriptsRegistry[`skills/${customName}/${script}`] = sourceCode;
          scriptsRegistry[`.agent/skills/${customName}/${script}`] = sourceCode;
        }
      }
    });
  }

  // Skip generating if it already exists (we keep existing handwritten templates!)
  if (fs.existsSync(tsFilePath)) {
    console.log(`Skipping existing template: ${tsFileName}`);
    return;
  }

  console.log(`Generating template for skill: ${folder} -> ${tsFileName}`);

  // Read actual SKILL.md
  const skillMdPath = path.join(skillsDir, folder, 'SKILL.md');
  let mdContent = '';
  if (fs.existsSync(skillMdPath)) {
    mdContent = fs.readFileSync(skillMdPath, 'utf8');
    // Remove frontmatter yaml if present
    if (mdContent.startsWith('---')) {
      const parts = mdContent.split('---');
      if (parts.length >= 3) {
        mdContent = parts.slice(2).join('---').trim();
      }
    }
  } else {
    mdContent = `# Skill Specification: ${toFormattedLabel(customName)}\n\nGuidelines for ${toFormattedLabel(customName)}.`;
  }

  // Check if there are python scripts to append to the static template SKILL.md
  if (pyScripts) {
    let scriptSection = '\n\n## CLI Automation Script & MCP Integration\nThis skill includes automated checker scripts:\n';
    pyScripts.forEach(script => {
      const scriptPath = path.join(skillsDir, folder, script);
      if (fs.existsSync(scriptPath)) {
        const sourceCode = fs.readFileSync(scriptPath, 'utf8');
        scriptSection += `\n- **File Path**: \`.agent/skills/${folder}/${script}\`\n`;
        scriptSection += `- **Execution Command**: \`python .agent/skills/${folder}/${script} <project_path>\`\n`;
        scriptSection += `- **Actual Script Source Code**:\n\`\`\`python\n${sourceCode}\n\`\`\`\n`;
      }
    });
    mdContent += scriptSection;
  }

  // Escape backticks and template string characters
  const escapedContent = mdContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');

  const tsContent = `export function get${toCamelCase(customName)}Template(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  // Static compilation fallback
  return metadata + \`${escapedContent}\`;
}
`;

  fs.writeFileSync(tsFilePath, tsContent, 'utf8');
});

// 2. Regenerate src/app/ai-config/templates/skills/index.ts
console.log('Regenerating index.ts...');

// Sort alphabetically by slug
allRegisteredSkills.sort((a, b) => a.slug.localeCompare(b.slug));

// Deduplicate registrations by slug
const uniqueSkills = [];
const seenSlugs = new Set();
allRegisteredSkills.forEach(s => {
  if (!seenSlugs.has(s.slug)) {
    seenSlugs.add(s.slug);
    uniqueSkills.push(s);
  }
});

const fallbackVi = `# Kỹ năng Agent Chuyên nghiệp (\${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- Xây dựng kiến trúc mô-đun hóa, đảm bảo tính dễ đọc, bảo trì và mở rộng cao đối với \${formattedSlug}.
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
  \\\`\\\`\\\`
  ├── src/
  │   ├── core/         # Logic nghiệp vụ lõi
  │   ├── adapters/     # Bộ kết nối ngoài
  │   └── config/       # Cấu hình môi trường
  └── ...
  \\\`\\\`\\\`

## 7. Mẫu Code Ví tế chuẩn Production
\\\`\\\`\\\`\${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
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
\\\`\\\`\\\`

## 8. Quy trình Kiểm thử & Mocking
- Viết unit tests kiểm chứng hành vi của các module logic biệt lập bằng Vitest/Playwright.
- Mock đầy đủ các kết nối hoặc dịch vụ bên thứ ba để đảm bảo tốc độ chạy test suite dưới 1 giây.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Đảm bảo bọc các logic nghiệp vụ nhạy cảm trong khối try-catch an toàn.
- Ghi nhận thông tin lỗi chi tiết, không làm rò rỉ thông tin nhạy cảm của hệ thống ra bên ngoài.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra chất lượng và chất lượng mã nguồn tự động thông qua dòng lệnh:
  \\\`\\\`\\\`bash
  npm run test && npm run lint
  \\\`\\\`\\\`
- Đồng bộ hóa các quy trình xác minh này trực tiếp vào hệ thống kiểm thử tự động CI/CD.`;

const fallbackEn = `# Professional Agent Skill Specification (\&{formattedSlug})

## 1. Core Design Principles
- Guarantee clean, modular, and extensible software structures optimized for \${formattedSlug}.
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
  \\\`\\\`\\\`
  ├── src/
  │   ├── core/         # Core business domain
  │   ├── adapters/     # Boundary gateways
  │   └── config/       # Environment setups
  └── ...
  \\\`\\\`\\\`

## 7. Production-Ready Code Example
\\\`\\\`\\\`\${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
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
\\\`\\\`\\\`

## 8. Testing & Mocking Strategy
- Construct atomic unit tests validating code logic branches under testing frameworks.
- Abstract external infrastructure dependencies behind mock interfaces.

## 9. Robust Exception Handling & Debug Flow
- Trap errors gracefully using clean Try-Catch blocks.
- Maintain comprehensive logging setups without disclosing sensitive server keys.

## 10. CLI & CI/CD Automation Flow
- Formulate static syntax checks and test suite validation commands:
  \\\`\\\`\\\`bash
  npm run test && npm run lint
  \\\`\\\`\\\`
- Enforce automated quality control tests on server commits.`;

// Build final index.ts content
let finalIndex = '';
uniqueSkills.forEach(s => {
  finalIndex += `import { get${s.camelName}Template } from "./${s.slug}";\n`;
});

finalIndex += `
export function getSkillTemplate(
  skillSlug: string,
  formattedSlug: string,
  languageLabel: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  switch (skillSlug) {
`;

uniqueSkills.forEach(s => {
  finalIndex += `    case "${s.slug}":\n`;
  if (s.slug === 'clean-code') {
    finalIndex += `      return getCleanCodeTemplate(formattedSlug, languageLabel, language, metadata);\n`;
  } else if (s.slug === 'powershell-windows' || s.slug === 'git-workflows') {
    finalIndex += `      return get${s.camelName}Template(formattedSlug, languageLabel, isVi);\n`;
  } else {
    finalIndex += `      return get${s.camelName}Template(formattedSlug, language, metadata, isVi);\n`;
  }
});

finalIndex += `    default:
      if (isVi) {
        return metadata + \`${fallbackVi}\`;
      } else {
        return metadata + \`${fallbackEn}\`;
      }
  }
}
`;

fs.writeFileSync(path.join(templatesDir, 'index.ts'), finalIndex, 'utf8');

// 3. Write src/app/ai-config/templates/skills/scripts-registry.ts
console.log('Writing scripts-registry.ts...');
let registryContent = `// Auto-generated scripts registry for static template fallback\n`;
registryContent += `export const SCRIPTS_REGISTRY: Record<string, string> = {\n`;

Object.keys(scriptsRegistry).forEach(key => {
  const escapedCode = scriptsRegistry[key]
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
  registryContent += `  "${key}": \`${escapedCode}\`,\n`;
});

registryContent += `};\n`;

fs.writeFileSync(path.join(templatesDir, 'scripts-registry.ts'), registryContent, 'utf8');

console.log('Finished compiling templates and registry!');
