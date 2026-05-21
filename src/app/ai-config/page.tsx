"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateRulesContent } from "./rules-templates";

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

// Hierarchical visual directory tree interface
interface TreeNode {
  name: string;
  path?: string;
  isFolder: boolean;
  children: TreeNode[];
}

// Visual Directory Tree builder
const buildTree = (files: { path: string; label: string }[]): TreeNode[] => {
  const root: TreeNode[] = [];
  
  files.forEach(file => {
    const parts = file.path.split('/');
    let currentLevel = root;
    
    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      let existing = currentLevel.find(node => node.name === part && node.isFolder === !isLast);
      
      if (!existing) {
        existing = {
          name: part,
          isFolder: !isLast,
          path: isLast ? file.path : undefined,
          children: []
        };
        currentLevel.push(existing);
      }
      
      if (!isLast && existing.children) {
        currentLevel = existing.children;
      }
    });
  });
  
  return root;
};

export default function AiConfigPage() {
  // Option selectors state
  const [ide, setIde] = useState("antigravity-ide");
  const [framework, setFramework] = useState("nextjs-app");
  const [language, setLanguage] = useState("typescript");
  const [database, setDatabase] = useState("postgres");
  const [styling, setStyling] = useState("shadcn");
  const [testing, setTesting] = useState("jest");

  // Output format state: 'rules' | 'cli' | 'skills' | 'workflows' | 'agents'
  const [outputTab, setOutputTab] = useState<"rules" | "cli" | "skills" | "workflows" | "agents">("rules");
  const [activeFile, setActiveFile] = useState(".agent/rules/GEMINI.md");
  const [contentLanguage, setContentLanguage] = useState<"en" | "vi">("vi");
  const [copied, setCopied] = useState(false);

  // File Explorer Database Map definition (Dynamic based on selected Tech Stack)
  const filesByTab = useMemo(() => {
    const isCli = ide === "antigravity-cli";
    
    const dynamicSkills: { path: string; label: string }[] = [];
    const dynamicAgents: { path: string; label: string }[] = [];
    const dynamicRules: { path: string; label: string }[] = [];
    
    const prefix = isCli ? ".gemini/antigravity-cli/" : ".agent/";
    const pluginPrefix = isCli ? "plugins/my-plugin/" : "";

    // Base Skills (always present)
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/clean-code/SKILL.md`, label: "clean-code/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/security-scanner/SKILL.md`, label: "security-scanner/SKILL.md" });

    // Dynamic Stack Skills
    if (language === "typescript") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/typescript-best-practices/SKILL.md`, label: "typescript-best-practices/SKILL.md" });
    } else if (language === "python") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/python-patterns/SKILL.md`, label: "python-patterns/SKILL.md" });
    } else if (language === "go") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/go-standards/SKILL.md`, label: "go-standards/SKILL.md" });
    } else if (language === "rust") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/rust-performance/SKILL.md`, label: "rust-performance/SKILL.md" });
    } else if (language === "csharp") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/csharp-net-practices/SKILL.md`, label: "csharp-net-practices/SKILL.md" });
    }

    if (database === "postgres") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/postgres-optimization/SKILL.md`, label: "postgres-optimization/SKILL.md" });
    } else if (database === "mongodb") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/mongodb-indexing/SKILL.md`, label: "mongodb-indexing/SKILL.md" });
    } else if (database === "sqlite") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/sqlite-embedded-db/SKILL.md`, label: "sqlite-embedded-db/SKILL.md" });
    } else if (database === "redis") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/redis-caching-patterns/SKILL.md`, label: "redis-caching-patterns/SKILL.md" });
    }

    if (styling === "tailwind-v4") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/tailwind-patterns/SKILL.md`, label: "tailwind-patterns/SKILL.md" });
    } else if (styling === "shadcn") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/shadcn-ui-components/SKILL.md`, label: "shadcn-ui-components/SKILL.md" });
    }

    if (testing === "jest") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/jest-unit-tests/SKILL.md`, label: "jest-unit-tests/SKILL.md" });
    } else if (testing === "playwright") {
      dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/playwright-e2e/SKILL.md`, label: "playwright-e2e/SKILL.md" });
    }

    // Base Agents (always present)
    dynamicAgents.push({ path: `${prefix}${pluginPrefix}agents/debugger.md`, label: "debugger.md" });
    dynamicAgents.push({ path: `${prefix}${pluginPrefix}agents/orchestrator.md`, label: "orchestrator.md" });

    // Dynamic Stack Agents
    if (framework === "nextjs-app") {
      dynamicAgents.push({ path: `${prefix}${pluginPrefix}agents/nextjs-specialist.md`, label: "nextjs-specialist.md" });
    }
    if (database === "postgres" || database === "mongodb") {
      dynamicAgents.push({ path: `${prefix}${pluginPrefix}agents/database-architect.md`, label: "database-architect.md" });
    }
    if (styling === "shadcn" || styling === "tailwind-v4") {
      dynamicAgents.push({ path: `${prefix}${pluginPrefix}agents/ui-designer.md`, label: "ui-designer.md" });
    }

    // Base Rules & Stack Rules
    if (isCli) {
      dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/clean-code.rules`, label: "clean-code.rules" });
      dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/performance.rules`, label: "performance.rules" });

      if (language === "typescript") {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/typescript.rules`, label: "typescript.rules" });
      }
      if (framework === "nextjs-app") {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/nextjs.rules`, label: "nextjs.rules" });
      }
      if (database === "postgres") {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/postgres-db.rules`, label: "postgres-db.rules" });
      }
    } else {
      dynamicRules.push({ path: ".agent/rules/GEMINI.md", label: "rules/GEMINI.md" });
    }

    if (isCli) {
      return {
        rules: dynamicRules,
        cli: [
          { path: ".gemini/antigravity-cli/settings.json", label: "settings.json" },
          { path: ".gemini/antigravity-cli/import_manifest.json", label: "import_manifest.json" },
          { path: ".gemini/antigravity-cli/plugins/my-plugin/plugin.json", label: "plugin.json" },
          { path: ".gemini/antigravity-cli/plugins/my-plugin/mcp_config.json", label: "mcp_config.json" },
          { path: ".gemini/antigravity-cli/plugins/my-plugin/hooks.json", label: "hooks.json" },
          { path: ".gemini/antigravity-cli/plugins/structure", label: "Plugins Tree Map" }
        ],
        skills: dynamicSkills,
        agents: dynamicAgents,
        workflows: [] // Not used in CLI
      };
    }

    return {
      rules: dynamicRules,
      cli: [], // Not used in IDE
      skills: dynamicSkills,
      agents: dynamicAgents,
      workflows: [
        { path: ".agent/workflows/debug.md", label: "debug.md" },
        { path: ".agent/workflows/test.md", label: "test.md" },
        { path: ".agent/workflows/verify.md", label: "verify.md" },
        { path: ".agent/workflows/coordinate.md", label: "coordinate.md" }
      ]
    };
  }, [ide, language, database, framework, styling, testing]);

  // IDE/CLI Change Helper to switch states cleanly without breaking selection
  const handleIdeChange = (newIde: string) => {
    setIde(newIde);
    if (newIde === "antigravity-cli") {
      setOutputTab("cli");
      setActiveFile(".gemini/antigravity-cli/settings.json");
    } else {
      setOutputTab("rules");
      setActiveFile(".agent/rules/GEMINI.md");
    }
  };

  // Tab change handler that automatically resets active file cleanly
  const handleTabChange = (tab: "rules" | "cli" | "skills" | "workflows" | "agents") => {
    setOutputTab(tab);
    if (filesByTab[tab] && filesByTab[tab].length > 0) {
      setActiveFile(filesByTab[tab][0].path);
    }
  };

  // Build current directory tree
  const treeNodes = useMemo(() => {
    if (ide === "antigravity-ide" && outputTab === "rules") {
      // Gather ALL file paths from all tabs in IDE mode to build the complete folder tree skeleton!
      const allFiles = [
        ...filesByTab.rules,
        ...filesByTab.skills,
        ...filesByTab.agents,
        ...filesByTab.workflows
      ];
      return buildTree(allFiles);
    }
    return buildTree(filesByTab[outputTab] || []);
  }, [filesByTab, outputTab, ide]);

  // Dynamic Content compiler
  const generatedData = useMemo(() => {
    return generateRulesContent({
      ide,
      framework,
      language,
      database,
      styling,
      testing,
      activeFile,
      contentLanguage
    });
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

  // Recursive Tree visual renderer with vertical guides and foldersOnly option
  const renderTreeNodes = (nodes: TreeNode[], depth = 0, foldersOnly = false) => {
    return nodes.map((node) => {
      if (node.isFolder) {
        return (
          <div key={node.name} className="space-y-0.5">
            <div 
              style={{ paddingLeft: `${depth * 14}px` }} 
              className="flex items-center gap-1.5 py-1 text-[11px] font-mono text-zinc-500 font-bold select-none"
            >
              <span>📂</span>
              <span className="text-zinc-400 font-mono tracking-wide">{node.name}/</span>
            </div>
            <div className="relative border-l border-zinc-800/80 ml-[6px] space-y-0.5">
              {renderTreeNodes(node.children, depth + 1, foldersOnly)}
            </div>
          </div>
        );
      }
      
      if (foldersOnly) return null; // Skip rendering file nodes completely!
      
      const isActive = activeFile === node.path;
      return (
        <button
          key={node.path}
          onClick={() => node.path && setActiveFile(node.path)}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
          className={`w-full text-left py-1.5 pr-2 rounded text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer border group ${
            isActive
              ? "bg-violet-950/15 text-violet-300 border-violet-850/30 shadow-[0_0_10px_rgba(139,92,246,0.05)]"
              : "text-zinc-450 hover:bg-zinc-900/30 hover:text-zinc-200 border-transparent"
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-xs group-hover:scale-110 transition-transform select-none shrink-0">
              {node.path?.endsWith(".md") || node.path?.includes("structure") ? "📄" : "⚙️"}
            </span>
            <span className="font-semibold truncate">{node.name}</span>
          </div>
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 ml-1.5" />}
        </button>
      );
    });
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
                  onClick={() => handleIdeChange("antigravity-ide")}
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
                  onClick={() => handleIdeChange("antigravity-cli")}
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
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
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
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
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
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
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
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
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
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
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
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-900 rounded-lg text-xs self-start overflow-x-auto max-w-full animate-fade-in">
              
              {/* IDE Mode Tabs */}
              {ide === "antigravity-ide" && (
                <>
                  <button
                    onClick={() => handleTabChange("rules")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "rules"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    IDE Config
                  </button>
                  
                  <button
                    onClick={() => handleTabChange("skills")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "skills"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Skills
                  </button>

                  <button
                    onClick={() => handleTabChange("agents")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "agents"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Agents
                  </button>

                  <button
                    onClick={() => handleTabChange("workflows")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "workflows"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Workflows
                  </button>
                </>
              )}

              {/* CLI Mode Tabs */}
              {ide === "antigravity-cli" && (
                <>
                  <button
                    onClick={() => handleTabChange("cli")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "cli"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    CLI Config
                  </button>

                  <button
                    onClick={() => handleTabChange("skills")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "skills"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Skills
                  </button>

                  <button
                    onClick={() => handleTabChange("agents")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "agents"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Agents
                  </button>

                  <button
                    onClick={() => handleTabChange("rules")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      outputTab === "rules"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    Rules
                  </button>
                </>
              )}
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
                      : "bg-zinc-950 border border-zinc-800 text-zinc-355 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100 active:scale-95"
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
              
              {/* File Explorer Sidebar: Visual Nested Tree Directory Structure */}
              <div className="md:col-span-4 bg-zinc-950/40 border-r border-zinc-900 p-4 space-y-4 select-none shrink-0 overflow-y-auto max-h-[500px]">
                <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  WORKSPACE TREE
                </div>
                
                <div className="space-y-1 pl-1">
                  {treeNodes && treeNodes.length > 0 ? (
                    renderTreeNodes(treeNodes, 0, ide === "antigravity-ide" && outputTab === "rules")
                  ) : (
                    <span className="text-[10px] text-zinc-600 italic">No files available</span>
                  )}
                </div>
              </div>

              {/* Code Preview Pane */}
              <div className="md:col-span-8 bg-zinc-950 p-5 overflow-y-auto max-h-[500px] font-mono text-[11px] md:text-xs leading-relaxed text-zinc-300 shadow-inner select-text whitespace-pre-wrap flex-grow border-t md:border-t-0 border-zinc-900">
                {generatedData.content}
              </div>
              
            </div>

            {/* Step-by-step Directory installation walkthrough (Dynamic based on IDE vs CLI) */}
            <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-5 space-y-4 animate-fade-in">
              <h3 className="text-xs font-extrabold text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                🚀 HƯỚNG DẪN MODULE CẤU TRÚC 3 BƯỚC:
              </h3>
              
              {ide === "antigravity-cli" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 1: Khởi tạo thư mục gốc</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Bắt buộc tạo thư mục cấu hình toàn cục <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">~/.gemini/antigravity-cli/</code> trên máy tính trước tiên.
                    </p>
                  </div>
                  
                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 2: Tổ chức thư mục con</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Tạo tiếp thư mục plugin <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded">plugins/my-plugin/</code> và các folder con tương ứng: <code className="text-zinc-400 font-mono">skills/</code>, <code className="text-zinc-400 font-mono">agents/</code>, <code className="text-zinc-400 font-mono">rules/</code>.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 3: Lưu và kích hoạt</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Lưu tệp tin cấu hình (`plugin.json`, các file `.rules` và `.md` chỉ thị...) vào đúng vị trí cây thư mục của bạn để CLI tự động nhận dạng.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 1: Tạo thư mục .agent/</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Tạo thư mục tên là <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">.agent/</code> trực tiếp tại thư mục gốc dự án của bạn làm phân khu làm việc của Agent.
                    </p>
                  </div>
                  
                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 2: Lưu rules & GEMINI.md</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Tạo tiếp thư mục <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">.agent/rules/</code> và lưu file quy tắc <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">GEMINI.md</code> vào đó (<code className="text-violet-400">.agent/rules/GEMINI.md</code>).
                    </p>
                  </div>

                  <div className="space-y-1.5 border-l-2 border-violet-600/40 pl-3">
                    <h4 className="font-bold text-zinc-200">Bước 3: Phân chia Kỹ năng & Tác nhân</h4>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Đặt các tệp kỹ năng của bạn vào folder riêng lẻ <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">.agent/skills/&#123;tên_skill&#125;/SKILL.md</code> để AI Agent tải thông tin thông minh, tiết kiệm tối đa lượng token.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
