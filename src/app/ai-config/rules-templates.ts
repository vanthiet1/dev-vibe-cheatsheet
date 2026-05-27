import { getFrameworkSection, getLanguageSection, getDatabaseSection, getStylingSection } from "./templates/core-tech";
import { getWorkflowTemplate } from "./templates/workflows";
import { getSkillTemplate } from "./templates/skills";
import { getAgentTemplate } from "./templates/agents";
import { getRulesTemplate } from "./templates/rules";

export interface RuleGeneratorParams {
  ide: string;
  framework: string;
  language: string | string[];
  database: string;
  styling: string;
  testing: string;
  activeFile: string;
  contentLanguage: "en" | "vi";
}

export function generateRulesContent(params: RuleGeneratorParams): { content: string; filename: string } {
  const { ide, framework, language, database, styling, testing, activeFile, contentLanguage } = params;

  const langs = Array.isArray(language) ? language : [language];

  // Labels for display
  const frameworkLabel = 
    framework === "nextjs-app" ? "Next.js (App Router)" :
    framework === "react-vite" ? "React (Vite)" :
    framework === "springboot" ? "Spring Boot (Java API)" :
    framework === "laravel" ? "Laravel (PHP MVC)" : "Node.js (Backend API)";

  const languageLabel = langs.map(lang => 
    lang === "typescript" ? "TypeScript (Strict)" :
    lang === "javascript" ? "JavaScript (ES6+)" :
    lang === "python" ? "Python (PEP 8)" :
    lang === "go" ? "Go (Idiomatic)" :
    lang === "rust" ? "Rust (Safe Core)" :
    lang === "react" ? "ReactJS (Hooks)" :
    lang === "java" ? "Java (OOP)" :
    lang === "php" ? "PHP (Modern)" :
    lang === "react-native" ? "React Native (Native/JS)" :
    lang === "flutter" ? "Flutter (Dart/Widgets)" :
    lang === "swift" ? "Swift (iOS)" :
    lang === "kotlin" ? "Kotlin (Android)" : "C# (.NET Core)"
  ).join(" & ");

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

  const isVi = contentLanguage === "vi";
  const filename = activeFile.split("/").pop() || activeFile;

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

  // 1. Route to Workflows
  if (activeFileCheck.startsWith("workflows/")) {
    const content = getWorkflowTemplate(
      activeFileCheck,
      frameworkLabel,
      languageLabel,
      testingLabel,
      langs[0] || "typescript",
      testing,
      isVi
    );
    return { content, filename };
  }

  // 2. Route to Skills
  if (activeFileCheck.startsWith("skills/")) {
    const skillSlug = activeFileCheck.replace("skills/", "").replace("/SKILL.md", "");
    
    // Fallback overrides for custom original paths
    let processedSlug = skillSlug;
    if (skillSlug === "database-optimization") {
      processedSlug = "clean-architecture"; // Maps custom db-optimization fallback if needed, else keeps slug
    } else if (skillSlug === "testing-patterns") {
      processedSlug = "git-workflows";
    } else if (skillSlug === "vulnerability-scanner") {
      processedSlug = "security-scanner";
    }

    const formattedSlug = processedSlug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const metadata = `---
name: ${processedSlug}-skill
description: Comprehensive expert guidelines for ${formattedSlug} optimized for ${languageLabel}.
when_to_use: "Load when designing, auditing, or refactoring codebase segments touching ${formattedSlug}."
allowed-tools: Read, Write, Grep
effort: medium
---

# Modular Skill Specification - ${formattedSlug} (skills/${processedSlug}/SKILL.md)
# IDE Target: ${ideLabel}
# Language: ${languageLabel}

`;

    const content = getSkillTemplate(processedSlug, formattedSlug, languageLabel, langs[0] || "typescript", metadata, isVi);
    return { content, filename };
  }

  // 3. Route to Agents
  if (activeFileCheck.startsWith("agents/")) {
    const content = getAgentTemplate(activeFileCheck, isVi);
    return { content, filename };
  }

  // 4. Default: Route to Rules & General Configs (.antigravityrules, .editorconfig, settings.json, GEMINI.md, etc.)
  const frameworkSection = getFrameworkSection(framework, isVi);
  const languageSection = langs.map(lang => getLanguageSection(lang, isVi)).join("\n\n");
  const databaseSection = getDatabaseSection(database, isVi);
  const stylingSection = getStylingSection(styling, isVi);

  const compilerCommand = langs.map(lang =>
    lang === "typescript" ? "npx tsc --noEmit" :
    lang === "python" ? "python -m mypy ." :
    lang === "go" ? "go vet ./..." :
    lang === "rust" ? "cargo check" :
    lang === "java" ? "mvn clean compile" :
    lang === "php" ? "composer check-style" :
    lang === "react-native" ? "npx react-native start" :
    lang === "flutter" ? "flutter analyze" :
    lang === "swift" ? "swift build" :
    lang === "kotlin" ? "./gradlew assemble" : "dotnet build"
  ).join(" | ");

  const testCommand = 
    testing === "jest" ? "npm run test" : "npx playwright test";

  const content = getRulesTemplate({
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
    language: langs[0] || "typescript",
    ide,
    compilerCommand,
    testCommand,
    isVi,
    filename,
    activeFileCheck,
  });

  return { content, filename };
}
