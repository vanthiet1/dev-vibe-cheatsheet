import { getFrameworkSection, getLanguageSection, getDatabaseSection, getStylingSection } from "./templates/core-tech";
import { getWorkflowTemplate } from "./templates/workflows";
import { getSkillTemplate } from "./templates/skills";
import { getAgentTemplate } from "./templates/agents";
import { getRulesTemplate } from "./templates/rules";

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
      language,
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

    const content = getSkillTemplate(processedSlug, formattedSlug, languageLabel, language, metadata, isVi);
    return { content, filename };
  }

  // 3. Route to Agents
  if (activeFileCheck.startsWith("agents/")) {
    const content = getAgentTemplate(activeFileCheck, isVi);
    return { content, filename };
  }

  // 4. Default: Route to Rules & General Configs (.antigravityrules, .editorconfig, settings.json, GEMINI.md, etc.)
  const frameworkSection = getFrameworkSection(framework, isVi);
  const languageSection = getLanguageSection(language, isVi);
  const databaseSection = getDatabaseSection(database, isVi);
  const stylingSection = getStylingSection(styling, isVi);

  const compilerCommand = 
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build";

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
    language,
    ide,
    compilerCommand,
    testCommand,
    isVi,
    filename,
    activeFileCheck,
  });

  return { content, filename };
}
