"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateRulesContent } from "./rules-templates";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  LightningIcon,
  GearIcon,
  ShieldIcon,
  SparklesIcon,
  RobotIcon,
  WorkflowIcon,
  TerminalIcon,
} from "@/components/icons";


import { TECH_ICONS } from "./constants/tech-icons";
import { GEMINI_RULES_CONTENT } from "./constants/gemini-rules";
import TerminalCmdSimulator from "./components/TerminalCmdSimulator";
import VsCodeSimulator, { TreeNode, buildTree } from "./components/VsCodeSimulator";

export default function AiConfigPage() {
  // Option selectors state
  const [ide, setIde] = useState("antigravity-ide");
  const [framework, setFramework] = useState("nextjs-app");
  const [languages, setLanguages] = useState<string[]>(["typescript"]);
  const [database, setDatabase] = useState("postgres");
  const [styling, setStyling] = useState("shadcn");
  const [testing, setTesting] = useState("jest");

  const handleToggleLanguage = (key: string) => {
    if (languages.includes(key)) {
      if (languages.length > 1) {
        setLanguages(languages.filter(l => l !== key));
      }
    } else {
      setLanguages([...languages, key]);
    }
  };

  // Output format state: 'config' | 'rules' | 'cli' | 'skills' | 'workflows' | 'agents'
  const [outputTab, setOutputTab] = useState<"config" | "rules" | "cli" | "skills" | "workflows" | "agents">("config");
  const [activeFile, setActiveFile] = useState(".agent/config-overview.md");
  const [contentLanguage, setContentLanguage] = useState<"en" | "vi">("vi");
  const [copied, setCopied] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);

  // Dynamic CLI initialisation command generation based on selections
  const cliCommand = useMemo(() => {
    return `npx @vanthiet/dev-vibe@latest`;
  }, []);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 2000);
  };

  // Scroll variables for Workspace Tree sidebar
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const checkScroll = () => {
    const el = treeContainerRef.current;
    if (el) {
      const canScroll = el.scrollHeight > el.clientHeight;
      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 15;
      setShowScrollArrow(canScroll && !isAtBottom);
    }
  };

  const handleScrollDown = () => {
    const el = treeContainerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollTop + 80,
        behavior: "smooth"
      });
    }
  };

  // Check scroll state when tree structure changes or tab changes
  useEffect(() => {
    const el = treeContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    // Set a slight delay to allow rendering pipeline to lay out elements
    const timer = setTimeout(checkScroll, 150);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [outputTab, ide, languages, database, framework, styling, testing]);

  // File Explorer Database Map definition (Dynamic based on selected Tech Stack)
  const filesByTab = useMemo(() => {
    const isCli = ide === "antigravity-cli";
    
    const dynamicSkills: { path: string; label: string }[] = [];
    const dynamicAgents: { path: string; label: string }[] = [];
    const dynamicRules: { path: string; label: string }[] = [];
    
    const prefix = isCli ? ".gemini/antigravity-cli/" : ".agent/";
    const pluginPrefix = isCli ? "plugins/my-plugin/" : "";

    // All 45 Skills list from .agent/skills
    const allSkillsList = [
      "api-patterns",
      "app-builder",
      "architecture",
      "bash-linux",
      "batch-operations",
      "behavioral-modes",
      "brainstorming",
      "clean-code",
      "code-review-checklist",
      "code-review-graph",
      "context-compression",
      "coordinator-mode",
      "database-design",
      "deployment-procedures",
      "documentation-templates",
      "frontend-design",
      "game-development",
      "geo-fundamentals",
      "i18n-localization",
      "intelligent-routing",
      "lint-and-validate",
      "mcp-builder",
      "memory-system",
      "mobile-design",
      "nextjs-react-expert",
      "nodejs-best-practices",
      "parallel-agents",
      "performance-profiling",
      "plan-writing",
      "powershell-windows",
      "python-patterns",
      "red-team-tactics",
      "rust-pro",
      "seo-fundamentals",
      "server-management",
      "simplify-code",
      "skillify",
      "systematic-debugging",
      "tailwind-patterns",
      "tdd-workflow",
      "testing-patterns",
      "verify-changes",
      "vulnerability-scanner",
      "web-design-guidelines",
      "webapp-testing"
    ];

    allSkillsList.forEach((skill) => {
      dynamicSkills.push({
        path: `${prefix}${pluginPrefix}skills/${skill}/SKILL.md`,
        label: `${skill}/SKILL.md`
      });
    });

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

      languages.forEach(lang => {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/${lang}.rules`, label: `${lang}.rules` });
      });

      if (framework === "nextjs-app") {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/nextjs.rules`, label: "nextjs.rules" });
      }
      if (database === "postgres") {
        dynamicRules.push({ path: `${prefix}${pluginPrefix}rules/postgres-db.rules`, label: "postgres-db.rules" });
      }
    } else {
      dynamicRules.push({ path: ".agent/rules/GEMINI.md", label: "rules/GEMINI.md" });
    }

    const dynamicWorkflows = [
      { path: `${prefix}workflows/feat.md`, label: "feat.md" },
      { path: `${prefix}workflows/refactor.md`, label: "refactor.md" },
      { path: `${prefix}workflows/plan.md`, label: "plan.md" },
      { path: `${prefix}workflows/debug.md`, label: "debug.md" },
      { path: `${prefix}workflows/test.md`, label: "test.md" },
      { path: `${prefix}workflows/verify.md`, label: "verify.md" },
      { path: `${prefix}workflows/ui-ux.md`, label: "ui-ux.md" }
    ];

    if (isCli) {
      return {
        config: [],
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
        workflows: dynamicWorkflows
      };
    }

    return {
      config: [
        { path: ".agent/config-overview.md", label: "config-overview.md" }
      ],
      rules: dynamicRules,
      cli: [], // Not used in IDE
      skills: dynamicSkills,
      agents: dynamicAgents,
      workflows: dynamicWorkflows
    };
  }, [ide, languages, database, framework, styling, testing]);

  // IDE/CLI Change Helper to switch states cleanly without breaking selection
  const handleIdeChange = (newIde: string) => {
    setIde(newIde);
    if (newIde === "antigravity-cli") {
      setOutputTab("cli");
      setActiveFile(".gemini/antigravity-cli/settings.json");
    } else {
      setOutputTab("config");
      setActiveFile(".agent/config-overview.md");
    }
  };

  // Tab change handler that automatically resets active file cleanly
  const handleTabChange = (tab: "config" | "rules" | "cli" | "skills" | "workflows" | "agents") => {
    setOutputTab(tab);
    if (filesByTab[tab] && filesByTab[tab].length > 0) {
      setActiveFile(filesByTab[tab][0].path);
    }
  };

  // Build current directory tree
  const treeNodes = useMemo(() => {
    if (ide === "antigravity-ide" && outputTab === "config") {
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
      language: languages,
      database,
      styling,
      testing,
      activeFile,
      contentLanguage
    });
  }, [ide, framework, languages, database, styling, testing, activeFile, contentLanguage]);

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

        {/* Panoramic Grid Container (ratio 3:9 splits spacing beautifully) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel Options (Shrunk to lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* IDE/Agent Selector */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4 space-y-4">
              <h3 className="text-[11px] font-extrabold text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                1. Hệ điều hành AI
              </h3>
              
              <div className="flex flex-col gap-2">
                {/* Antigravity IDE Select */}
                <button
                  onClick={() => handleIdeChange("antigravity-ide")}
                  className={`p-3 rounded-lg border text-left transition-all duration-205 cursor-pointer flex flex-col gap-1 ${
                    ide === "antigravity-ide"
                      ? "border-violet-600 bg-violet-950/15 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100">Antigravity IDE</span>
                    {ide === "antigravity-ide" && <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                  </div>
                  <p className="text-[10px] text-zinc-450 leading-relaxed">
                    Quy chuẩn kỹ năng sâu bên trong IDE.
                  </p>
                </button>

                {/* Antigravity CLI Select */}
                <button
                  onClick={() => handleIdeChange("antigravity-cli")}
                  className={`p-3 rounded-lg border text-left transition-all duration-205 cursor-pointer flex flex-col gap-1 ${
                    ide === "antigravity-cli"
                      ? "border-violet-600 bg-violet-950/15 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100">Antigravity CLI</span>
                    {ide === "antigravity-cli" && <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                  </div>
                  <p className="text-[10px] text-zinc-450 leading-relaxed">
                    Quy tắc chuyên biệt cho dòng lệnh CLI.
                  </p>
                </button>

                {/* Claude Code - Coming Soon */}
                <div className="p-3 rounded-lg border border-zinc-900/50 bg-zinc-950/10 opacity-40 relative select-none flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Claude Code</span>
                    <span className="text-[8px] font-extrabold bg-violet-950/40 text-violet-400 border border-violet-800/30 px-1.5 py-0.5 rounded tracking-wide uppercase select-none shrink-0 scale-90">
                      Sắp ra mắt
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    Tương thích tệp chỉ thị chỉ lệnh riêng cho Anthropic.
                  </p>
                </div>

                {/* Codex - Coming Soon */}
                <div className="p-3 rounded-lg border border-zinc-900/50 bg-zinc-950/10 opacity-40 relative select-none flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">OpenAI Codex</span>
                    <span className="text-[8px] font-extrabold bg-violet-950/40 text-violet-400 border border-violet-800/30 px-1.5 py-0.5 rounded tracking-wide uppercase select-none shrink-0 scale-90">
                      Sắp ra mắt
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    Kiến trúc tối ưu tự động hóa mã nguồn tầm thế hệ mới từ OpenAI.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Tech Options */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4 space-y-4">
              <h3 className="text-[11px] font-extrabold text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                2. Tech Stack dự án
              </h3>

              {/* Ngôn ngữ & Stack Toggles */}
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-zinc-400 block uppercase tracking-wider">
                  Ngôn ngữ & Stack (Multi-select)
                </label>

                {/* Core Languages */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-zinc-500 block uppercase tracking-wide">Ngôn ngữ cốt lõi</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: "typescript", label: "TypeScript" },
                      { key: "javascript", label: "JavaScript" },
                      { key: "python", label: "Python" },
                      { key: "go", label: "Go" },
                      { key: "rust", label: "Rust" },
                      { key: "csharp", label: "C#" }
                    ].map((item) => {
                      const isActive = languages.includes(item.key);
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleToggleLanguage(item.key)}
                          className={`py-2.5 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                            isActive
                              ? "border-violet-600 bg-violet-950/20 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] scale-[0.98]"
                              : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700 hover:text-zinc-300"
                          }`}
                        >
                          {TECH_ICONS[item.key]}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Web & APIs */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-zinc-500 block uppercase tracking-wide">Web Frameworks & APIs</span>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { key: "react", label: "ReactJS" },
                      { key: "java", label: "Spring" },
                      { key: "php", label: "Laravel" }
                    ].map((item) => {
                      const isActive = languages.includes(item.key);
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleToggleLanguage(item.key)}
                          className={`py-2.5 px-2 rounded-md text-[10.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                            isActive
                              ? "border-violet-600 bg-violet-950/20 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] scale-[0.98]"
                              : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700 hover:text-zinc-300"
                          }`}
                        >
                          {TECH_ICONS[item.key]}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Frameworks */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-zinc-500 block uppercase tracking-wide">Mobile Frameworks</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: "react-native", label: "React Native" },
                      { key: "flutter", label: "Flutter" },
                      { key: "swift", label: "Swift" },
                      { key: "kotlin", label: "Kotlin" }
                    ].map((item) => {
                      const isActive = languages.includes(item.key);
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleToggleLanguage(item.key)}
                          className={`py-2.5 px-2 rounded-md text-[10.5px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                            isActive
                              ? "border-violet-600 bg-violet-950/20 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] scale-[0.98]"
                              : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700 hover:text-zinc-300"
                          }`}
                        >
                          {TECH_ICONS[item.key]}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-zinc-450 block">Cơ sở dữ liệu:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: "postgres", label: "PG" },
                    { key: "mongodb", label: "MDB" },
                    { key: "sqlite", label: "Lite" },
                    { key: "mysql", label: "SQL" },
                    { key: "redis", label: "Cache" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setDatabase(item.key)}
                      className={`py-2.5 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                        database === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-450 hover:border-zinc-700"
                      }`}
                    >
                      {TECH_ICONS[item.key]}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Framework */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-zinc-450 block">Framework:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: "nextjs-app", label: "Next" },
                    { key: "react-vite", label: "Vite" },
                    { key: "nodejs", label: "Node" },
                    { key: "springboot", label: "Spring" },
                    { key: "laravel", label: "Laravel" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setFramework(item.key)}
                      className={`py-2.5 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                        framework === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-455 hover:border-zinc-700"
                      }`}
                    >
                      {TECH_ICONS[item.key]}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* UI Library */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-zinc-450 block">Thư viện UI:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "tailwind-v4", label: "Tailwind v4" },
                    { key: "shadcn", label: "Shadcn" },
                    { key: "antd", label: "Ant Design" },
                    { key: "mui", label: "Material" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setStyling(item.key)}
                      className={`py-2.5 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                        styling === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-455 hover:border-zinc-700"
                      }`}
                    >
                      {TECH_ICONS[item.key]}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Testing */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-zinc-450 block">Kiểm thử:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "jest", label: "Jest" },
                    { key: "playwright", label: "Playwright" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setTesting(item.key)}
                      className={`py-2.5 px-2 rounded-md text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] ${
                        testing === item.key
                          ? "border-violet-600/80 bg-violet-950/25 text-violet-300"
                          : "border-zinc-800 bg-zinc-900/10 text-zinc-455 hover:border-zinc-700"
                      }`}
                    >
                      {TECH_ICONS[item.key]}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Presentation Screen (Expanded to lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col space-y-4">
            
            {/* Dynamic Premium CLI Setup Command Block */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur relative overflow-hidden group">
              {/* Inner glowing top-border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0" />
              
              <div className="space-y-1.5 max-w-full md:max-w-[45%]">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    ⚡ Cài đặt nhanh qua CLI / NPX
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-450 leading-relaxed">
                  Tự động tải và cấu hình toàn bộ rules, skills đã chọn trực tiếp vào thư mục gốc của dự án.
                </p>
              </div>

              {/* Glowing Terminal Code Block */}
              <div className="flex items-center bg-zinc-900/60 border border-zinc-850/80 rounded-lg p-2.5 font-mono text-[11px] text-violet-300 w-full md:w-auto flex-grow max-w-full md:max-w-[55%] justify-between gap-4 shadow-inner relative group-hover:border-zinc-800 transition-all select-all">
                <div className="overflow-x-auto whitespace-nowrap scrollbar-none flex-grow select-text pr-2">
                  <span className="text-zinc-500 select-none mr-1.5">$</span>
                  {cliCommand}
                </div>
                <button
                  onClick={handleCopyCli}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-extrabold cursor-pointer transition-all duration-150 flex items-center gap-1 shrink-0 ${
                    cliCopied
                      ? "bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                      : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-150 active:scale-95"
                  }`}
                >
                  {cliCopied ? (
                    <>
                      <CheckIcon className="text-xs shrink-0" />
                      <span>Đã copy</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="text-xs shrink-0" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Selected Technology Summary Panel */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4 space-y-3.5 relative overflow-hidden backdrop-blur shadow-md animate-fade-in">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-[10px] font-extrabold text-zinc-350 flex items-center gap-1.5 uppercase tracking-wide">
                  ✨ Các công nghệ đã chọn:
                </span>
                <span className="text-[9px] font-mono font-bold text-violet-400 bg-violet-950/20 border border-violet-900/30 px-2 py-0.5 rounded uppercase select-none tracking-wide animate-pulse">
                  Syncing active
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Languages */}
                {languages.map(lang => (
                  <span key={lang} className="inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/25 text-violet-300 px-2 py-1 rounded text-[9.5px] font-bold shadow-sm">
                    {TECH_ICONS[lang]}
                    <span className="capitalize">{lang}</span>
                  </span>
                ))}
                {/* Framework */}
                {framework !== "none" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-800/50 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-[9.5px] font-bold shadow-sm">
                    {TECH_ICONS[framework]}
                    <span className="capitalize">{framework === "nextjs-app" ? "Next.js" : framework === "react-vite" ? "React" : framework === "springboot" ? "Spring Boot" : framework === "laravel" ? "Laravel" : framework}</span>
                  </span>
                )}
                {/* Database */}
                {database !== "none" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-800/50 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-[9.5px] font-bold shadow-sm">
                    {TECH_ICONS[database]}
                    <span className="capitalize">{database}</span>
                  </span>
                )}
                {/* Styling */}
                {styling !== "none" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-800/50 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-[9.5px] font-bold shadow-sm">
                    {TECH_ICONS[styling]}
                    <span className="capitalize">{styling}</span>
                  </span>
                )}
                {/* Testing */}
                {testing !== "none" && (
                  <span className="inline-flex items-center gap-1 bg-zinc-800/50 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-[9.5px] font-bold shadow-sm">
                    {TECH_ICONS[testing]}
                    <span className="capitalize">{testing}</span>
                  </span>
                )}
              </div>
              <div className="bg-violet-950/15 border border-violet-900/20 rounded-lg p-2.5 flex items-start gap-2 text-[10.5px] text-zinc-300 shadow-sm leading-relaxed">
                <span className="text-sm shrink-0">💡</span>
                <p>
                  <strong className="text-violet-300">Tự động đồng bộ:</strong> Khi cài đặt bằng lệnh <code className="bg-zinc-950 px-1 py-0.5 rounded text-violet-400 font-mono font-bold select-all">npx @vanthiet/dev-vibe@latest</code>, Dev-Vibe CLI sẽ tự động phát hiện và khởi tạo bộ quy chuẩn chuyên biệt được tối ưu hóa riêng cho các công nghệ bạn đã chọn phía dưới!
                </p>
              </div>
            </div>


            {/* Output File Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-900 rounded-lg text-xs self-start overflow-x-auto max-w-full animate-fade-in">
              
              {/* IDE Mode Tabs */}
              {ide === "antigravity-ide" && (
                <>
                  <button
                    onClick={() => handleTabChange("config")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "config"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <GearIcon className="text-sm" />
                    <span>IDE Config</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("rules")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "rules"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <ShieldIcon className="text-sm" />
                    <span>Rules</span>
                  </button>
                  
                  <button
                    onClick={() => handleTabChange("skills")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "skills"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <SparklesIcon className="text-sm" />
                    <span>Skills</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("agents")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "agents"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <RobotIcon className="text-sm" />
                    <span>Agents</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("workflows")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "workflows"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <WorkflowIcon className="text-sm" />
                    <span>Workflows</span>
                  </button>
                </>
              )}

              {/* CLI Mode Tabs */}
              {ide === "antigravity-cli" && (
                <>
                  <button
                    onClick={() => handleTabChange("cli")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "cli"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <TerminalIcon className="text-sm" />
                    <span>CLI Config</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("skills")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "skills"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <SparklesIcon className="text-sm" />
                    <span>Skills</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("agents")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "agents"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <RobotIcon className="text-sm" />
                    <span>Agents</span>
                  </button>

                  <button
                    onClick={() => handleTabChange("rules")}
                    className={`px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      outputTab === "rules"
                        ? "bg-violet-950/60 text-violet-200 border-violet-600/70 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                        : "border-transparent text-zinc-455 hover:text-zinc-200 hover:bg-zinc-800/20"
                    }`}
                  >
                    <ShieldIcon className="text-sm" />
                    <span>Rules</span>
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
                  {activeFile === ".agent/config-overview.md" ? "vscode-autopilot-simulator" : generatedData.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Selector */}
                {activeFile !== ".agent/config-overview.md" && (
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
                )}

                {activeFile !== ".agent/config-overview.md" && (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* Split-pane File Explorer Simulator container */}
            <div className="grid grid-cols-1 md:grid-cols-12 border border-zinc-900 rounded-b-xl overflow-hidden min-h-[500px] bg-zinc-950 shadow-2xl">
              
              {/* File Explorer Sidebar: Visual Nested Tree Directory Structure */}
              <div className="relative md:col-span-3 bg-zinc-950/40 border-r border-zinc-900 p-4 select-none flex flex-col h-[500px] shrink-0">
                <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  WORKSPACE TREE
                </div>
                
                <div 
                  ref={treeContainerRef}
                  onScroll={checkScroll}
                  className="flex-grow overflow-y-auto space-y-1 pl-1 pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                >
                  {treeNodes && treeNodes.length > 0 ? (
                    renderTreeNodes(treeNodes, 0, ide === "antigravity-ide" && outputTab === "config")
                  ) : (
                    <span className="text-[10px] text-zinc-600 italic">No files available</span>
                  )}
                </div>

                {/* Animated down-pointing scrolling pointer indicator */}
                {showScrollArrow && (
                  <div 
                    onClick={handleScrollDown}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-violet-850/40 p-2.5 rounded-full text-violet-300 shadow-xl shadow-violet-950/50 animate-bounce cursor-pointer hover:bg-violet-900/25 transition-all select-none backdrop-blur-sm z-20 hover:scale-105 flex items-center justify-center"
                    title="Cuộn xuống"
                  >
                    <svg className="w-3 h-3 text-violet-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Code Preview or VS Code Simulator Pane */}
              <div className="md:col-span-9 bg-[#1e1e1e] overflow-hidden flex flex-col min-h-[500px] border-t md:border-t-0 border-zinc-900">
                {ide === "antigravity-ide" && activeFile === ".agent/config-overview.md" ? (
                  <VsCodeSimulator 
                    framework={framework}
                    languages={languages}
                    database={database}
                    styling={styling}
                    testing={testing}
                  />
                ) : (
                  <div className="p-5 overflow-y-auto max-h-[500px] font-mono text-[11px] md:text-xs leading-relaxed text-zinc-300 shadow-inner select-text whitespace-pre-wrap flex-grow">
                    {generatedData.content}
                  </div>
                )}
              </div>
              
            </div>

            {/* Interactive Command Simulator placed at the bottom */}
            <TerminalCmdSimulator
              languages={languages}
              framework={framework}
              database={database}
              styling={styling}
              testing={testing}
              ide={ide}
            />

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
