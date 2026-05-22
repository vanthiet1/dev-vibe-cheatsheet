"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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

// Tab Category Icons for beautiful, dynamic UI
function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );
}

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h5v5H4V4zm11 0h5v5h-5V4zM4 15h5v5H4v-5zm11 0h5v5h-5v-5zM9 6.5h6m-6 11h6M6.5 9v6m11-6v6" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="1em" height="1em">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

// Brand SVG icons for Tech Stack buttons
const TECH_ICONS: Record<string, React.ReactNode> = {
  // Languages
  typescript: <i className="devicon-typescript-plain colored text-sm shrink-0" />,
  javascript: <i className="devicon-javascript-plain colored text-sm shrink-0" />,
  python: <i className="devicon-python-plain colored text-sm shrink-0" />,
  go: <i className="devicon-go-plain colored text-sm shrink-0" />,
  rust: <i className="devicon-rust-plain text-[#e05a47] text-sm shrink-0" style={{ color: "#e05a47" }} />,
  csharp: <i className="devicon-csharp-plain colored text-sm shrink-0" />,
  // Databases
  postgres: <i className="devicon-postgresql-plain colored text-sm shrink-0" />,
  mongodb: <i className="devicon-mongodb-plain colored text-sm shrink-0" />,
  sqlite: <i className="devicon-sqlite-plain colored text-sm shrink-0" />,
  mysql: <i className="devicon-mysql-plain colored text-sm shrink-0" />,
  redis: <i className="devicon-redis-plain colored text-sm shrink-0" />,
  // Frameworks
  "nextjs-app": <i className="devicon-nextjs-plain text-sm shrink-0" />,
  "react-vite": <i className="devicon-vitejs-plain colored text-sm shrink-0" />,
  nodejs: <i className="devicon-nodejs-plain colored text-sm shrink-0" />,
  // UI Libraries
  "tailwind-v4": <i className="devicon-tailwindcss-plain colored text-sm shrink-0" />,
  shadcn: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="black" />
      <path d="m15 6-6 6M20 6l-10 10M17 16l-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  antd: <i className="devicon-antdesign-plain colored text-sm shrink-0" />,
  mui: <i className="devicon-materialui-plain colored text-sm shrink-0" />,
  // Testing
  jest: <i className="devicon-jest-plain colored text-sm shrink-0" />,
  playwright: <i className="devicon-playwright-plain colored text-sm shrink-0" />,
};

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

// High-fidelity interactive VS Code workspace simulation with visual auto-gliding mouse pointer
function VsCodeSimulator({ 
  framework, 
  language 
}: { 
  framework: string; 
  language: string; 
  database: string; 
  styling: string; 
  testing: string; 
}) {
  // Stepper completion and dynamic loop variables
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Stepper input text fields for character-by-character visual typing
  const [folderInputVal, setFolderInputVal] = useState("");
  const [fileInputVal, setFileInputVal] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);

  // Dynamic visual Mouse Cursor state controls
  const [cursorX, setCursorX] = useState(250);
  const [cursorY, setCursorY] = useState(150);
  const [cursorAction, setCursorAction] = useState<"idle" | "clicking" | "moving">("idle");

  // Laser editor compiling sweep state
  const [editorText, setEditorText] = useState("");
  const [showLaser, setShowLaser] = useState(false);

  // Visual Autopilot sequence runner inside simulator
  useEffect(() => {
    let active = true;
    let timerId: NodeJS.Timeout;

    // Continuous loop executing the entire VS Code simulation lifecycle
    const playSimulatorSequence = async () => {
      if (!active) return;

      // Phase 0: Reset states
      setCompletedSteps([]);
      setFolderInputVal("");
      setFileInputVal("");
      setShowFolderInput(false);
      setShowFileInput(false);
      setEditorText("");
      setShowLaser(false);
      setCursorX(280);
      setCursorY(150);

      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!active) return;

      // Phase 1: Glide mouse to "New Folder" Icon in mock Explorer top header
      setCursorAction("moving");
      setCursorX(124);
      setCursorY(35);
      await new Promise(resolve => setTimeout(resolve, 1300));
      if (!active) return;

      // Phase 2: Click New Folder Icon
      setCursorAction("clicking");
      await new Promise(resolve => setTimeout(resolve, 250));
      setCursorAction("idle");
      setShowFolderInput(true);
      await new Promise(resolve => setTimeout(resolve, 350));
      if (!active) return;

      // Phase 3: Character-by-character typing ".agent"
      const folderChars = ".agent".split("");
      let folderTemp = "";
      for (let char of folderChars) {
        if (!active) return;
        folderTemp += char;
        setFolderInputVal(folderTemp);
        await new Promise(resolve => setTimeout(resolve, 120));
      }
      await new Promise(resolve => setTimeout(resolve, 350));
      if (!active) return;

      // Phase 4: Submit folder creation
      setShowFolderInput(false);
      setCompletedSteps(prev => [...prev, 1]);
      await new Promise(resolve => setTimeout(resolve, 900));
      if (!active) return;

      // Phase 5: Glide mouse to "New File" Icon
      setCursorAction("moving");
      setCursorX(146);
      setCursorY(35);
      await new Promise(resolve => setTimeout(resolve, 1300));
      if (!active) return;

      // Phase 6: Click New File Icon
      setCursorAction("clicking");
      await new Promise(resolve => setTimeout(resolve, 250));
      setCursorAction("idle");
      setShowFileInput(true);
      await new Promise(resolve => setTimeout(resolve, 350));
      if (!active) return;

      // Phase 7: Character-by-character typing "GEMINI.md"
      const fileChars = "GEMINI.md".split("");
      let fileTemp = "";
      for (let char of fileChars) {
        if (!active) return;
        fileTemp += char;
        setFileInputVal(fileTemp);
        await new Promise(resolve => setTimeout(resolve, 120));
      }
      await new Promise(resolve => setTimeout(resolve, 350));
      if (!active) return;

      // Phase 8: Submit rules file creation
      setShowFileInput(false);
      setCompletedSteps(prev => [...prev, 2, 3, 4]);
      await new Promise(resolve => setTimeout(resolve, 900));
      if (!active) return;

      // Phase 9: Glide to main editor window
      setCursorAction("moving");
      setCursorX(360);
      setCursorY(160);
      await new Promise(resolve => setTimeout(resolve, 1200));
      if (!active) return;

      // Phase 10: Laser compile sweep and print out behavior rules inside VS Code editor
      setShowLaser(true);
      const lines = [
        `# Antigravity behaviour specifications (GEMINI.md)`,
        `# Primary stack loaded: ${framework} (${language})`,
        ``,
        `## Universal direct rules:`,
        `- Restrict function blocks to a maximum of 25 lines.`,
        `- Reuse existing modular abstractions before writing new code.`,
        `- Enforce zero-exception TypeScript type safety.`
      ];
      
      let typedEditor = "";
      for (let line of lines) {
        if (!active) return;
        typedEditor += line + "\n";
        setEditorText(typedEditor);
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setShowLaser(false);

      // Loop cooldown delay before resetting
      timerId = setTimeout(() => {
        if (active) playSimulatorSequence();
      }, 7000);
    };

    playSimulatorSequence();

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [framework, language]);

  const isStep1Done = completedSteps.includes(1);
  const isStep2Done = completedSteps.includes(2);
  const isStep3Done = completedSteps.includes(3);
  const isStep4Done = completedSteps.includes(4);

  return (
    <div className="relative w-full flex flex-col bg-[#1e1e1e] border border-zinc-800 rounded-lg overflow-hidden font-sans text-xs select-none shadow-2xl h-full min-h-[500px]">
      
      {/* Dynamic Absolute Mouse Pointer element */}
      <div 
        style={{ 
          transform: `translate(${cursorX}px, ${cursorY}px)`,
          transition: "transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
        className={`absolute pointer-events-none z-50 transition-all duration-150 ${
          cursorAction === "clicking" ? "scale-90 opacity-80" : "scale-100"
        }`}
      >
        <svg className="w-5 h-5 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 3v15.3l4.7-4.6 3.8 8.8 3.5-1.5-3.8-8.8 6-0.6L4.5 3z" />
        </svg>
      </div>

      {/* VS Code Window Header */}
      <div className="bg-[#2d2d2d] px-3 py-2 flex items-center justify-between border-b border-[#252526] z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="text-[10px] text-zinc-400 font-mono ml-2">Visual Studio Code - Simulator</span>
        </div>
        <div className="bg-[#3c3c3c] text-zinc-300 font-mono text-[9px] px-8 py-0.5 rounded border border-zinc-800 select-none">
          my-project - Antigravity Configurator
        </div>
        <div className="w-12" />
      </div>

      {/* VS Code Editor Main Grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12 bg-[#1e1e1e] min-h-[380px] relative z-10">
        
        {/* Mock VS Code Explorer Sidebar */}
        <div className="md:col-span-4 bg-[#252526] border-r border-[#1e1e1e] flex flex-col text-zinc-400 font-mono select-none">
          <div className="px-3 py-2 text-[9px] uppercase tracking-wider font-extrabold text-zinc-500 border-b border-[#1e1e1e] flex items-center justify-between">
            <span>Explorer: MY-PROJECT</span>
            <div className="flex items-center gap-2 text-zinc-500 font-normal">
              {/* Folder and File creation controls highlighted visually */}
              <span className={`hover:text-zinc-200 transition-colors p-0.5 rounded ${showFolderInput ? "text-violet-400 bg-zinc-800" : ""}`}>📁⁺</span>
              <span className={`hover:text-zinc-200 transition-colors p-0.5 rounded ${showFileInput ? "text-violet-400 bg-zinc-800" : ""}`}>📄⁺</span>
            </div>
          </div>
          
          <div className="p-3 space-y-1.5 text-[11px] overflow-y-hidden max-h-[220px]">
            <div className="font-bold text-zinc-300">📁 MY-PROJECT</div>
            
            {/* .agent/ folder tree */}
            <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
              
              {/* Step 1 input folder typing */}
              {showFolderInput && (
                <div className="flex items-center gap-1.5 text-violet-400 font-bold bg-violet-950/20 py-0.5 px-1 rounded animate-pulse border border-violet-800/30">
                  <span>📂</span>
                  <span className="font-mono">{folderInputVal}</span>
                  <span className="w-1 h-3.5 bg-violet-400 animate-ping" />
                </div>
              )}

              {isStep1Done && (
                <div className="flex items-center gap-1.5 transition-all duration-300 text-emerald-400 font-bold">
                  <span>📂</span>
                  <span>.agent</span>
                </div>
              )}

              {!isStep1Done && !showFolderInput && (
                <div className="flex items-center gap-1.5 text-zinc-650 opacity-40">
                  <span>📂</span>
                  <span>.agent</span>
                </div>
              )}

              {/* rules/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep2Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>rules</span>
                </div>
                
                {/* Step 2 input file typing */}
                {showFileInput && (
                  <div className="pl-4 flex items-center gap-1.5 text-violet-400 font-bold bg-violet-950/20 py-0.5 px-1 rounded animate-pulse border border-violet-800/30">
                    <span>📄</span>
                    <span className="font-mono">{fileInputVal}</span>
                    <span className="w-1 h-3.5 bg-violet-400 animate-ping" />
                  </div>
                )}

                {isStep2Done && (
                  <div className="pl-4 flex items-center gap-1.5 transition-all duration-300 text-emerald-300">
                    <span>📄</span>
                    <span>GEMINI.md</span>
                  </div>
                )}

                {!isStep2Done && !showFileInput && (
                  <div className="pl-4 flex items-center gap-1.5 text-zinc-650 opacity-40">
                    <span>📄</span>
                    <span>GEMINI.md</span>
                  </div>
                )}
              </div>

              {/* skills/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>skills</span>
                </div>
                <div className={`pl-4 flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-350" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>clean-code</span>
                </div>
                <div className={`pl-8 flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-300" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📄</span>
                  <span>SKILL.md</span>
                </div>
              </div>

              {/* agents/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>agents</span>
                </div>
                <div className={`pl-4 flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-300" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📄</span>
                  <span>debugger.md</span>
                </div>
              </div>

              {/* workflows/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep4Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>workflows</span>
                </div>
                <div className={`pl-4 flex items-center gap-1.5 transition-all duration-300 ${
                  isStep4Done ? "text-emerald-300" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📄</span>
                  <span>debug.md</span>
                </div>
              </div>
            </div>

            {/* Standard non-config workspace files */}
            <div className="pl-3 space-y-1 ml-2 text-zinc-500 opacity-60">
              <div className="flex items-center gap-1.5">
                <span>⚙️</span>
                <span>package.json</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚙️</span>
                <span>.env</span>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic code typing panel simulating developer writing */}
        <div className="md:col-span-8 p-5 flex flex-col bg-[#1e1e1e] text-zinc-300 overflow-hidden relative">
          
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5 select-none mb-3">
            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <LightningIcon className="text-violet-400" />
                WORKSPACE EDITOR: Rules Compiler
              </h3>
            </div>
            {isStep4Done && (
              <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded animate-pulse select-none">
                ĐỒNG BỘ THÀNH CÔNG
              </span>
            )}
          </div>

          {/* Interactive laser compilation sweep sweep block */}
          <div className="flex-grow font-mono text-[11px] leading-relaxed text-zinc-300 overflow-y-hidden whitespace-pre relative border border-zinc-900/60 rounded bg-[#151515] p-4 select-text">
            {showLaser && (
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.8)]" style={{ top: "35%" }} />
            )}
            
            {editorText ? editorText : (
              <span className="text-zinc-600 italic select-none">Đang chờ khởi động quy chuẩn hành vi từ Explorer...</span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default function AiConfigPage() {
  // Option selectors state
  const [ide, setIde] = useState("antigravity-ide");
  const [framework, setFramework] = useState("nextjs-app");
  const [language, setLanguage] = useState("typescript");
  const [database, setDatabase] = useState("postgres");
  const [styling, setStyling] = useState("shadcn");
  const [testing, setTesting] = useState("jest");

  // Output format state: 'config' | 'rules' | 'cli' | 'skills' | 'workflows' | 'agents'
  const [outputTab, setOutputTab] = useState<"config" | "rules" | "cli" | "skills" | "workflows" | "agents">("config");
  const [activeFile, setActiveFile] = useState(".agent/config-overview.md");
  const [contentLanguage, setContentLanguage] = useState<"en" | "vi">("vi");
  const [copied, setCopied] = useState(false);

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
  }, [outputTab, ide, language, database, framework, styling, testing]);

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
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/seo-fundamentals/SKILL.md`, label: "seo-fundamentals/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/i18n-localization/SKILL.md`, label: "i18n-localization/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/powershell-windows/SKILL.md`, label: "powershell-windows/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/git-workflows/SKILL.md`, label: "git-workflows/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/performance-profiling/SKILL.md`, label: "performance-profiling/SKILL.md" });
    dynamicSkills.push({ path: `${prefix}${pluginPrefix}skills/clean-architecture/SKILL.md`, label: "clean-architecture/SKILL.md" });

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
        workflows: [] // Not used in CLI
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
              </div>
            </div>

            {/* Core Tech Options */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4 space-y-4">
              <h3 className="text-[11px] font-extrabold text-zinc-200 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                2. Tech Stack dự án
              </h3>

              {/* Ngôn ngữ */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-zinc-450 block">Ngôn ngữ:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "typescript", label: "TypeScript" },
                    { key: "javascript", label: "JavaScript" },
                    { key: "python", label: "Python" },
                    { key: "go", label: "Go" },
                    { key: "rust", label: "Rust" },
                    { key: "csharp", label: "C#" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setLanguage(item.key)}
                      className={`py-1.5 px-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        language === item.key
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
                      className={`py-1.5 px-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
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
                    { key: "nodejs", label: "Node" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setFramework(item.key)}
                      className={`py-1.5 px-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
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
                      className={`py-1.5 px-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
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
                      className={`py-1.5 px-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
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
              <div className="relative md:col-span-4 bg-zinc-950/40 border-r border-zinc-900 p-4 select-none flex flex-col h-[500px] shrink-0">
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
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bg-zinc-900/90 border border-violet-850/40 px-3 py-1.5 rounded-full text-[9px] font-extrabold text-violet-300 shadow-xl shadow-violet-950/50 animate-bounce cursor-pointer hover:bg-violet-900/20 transition-all select-none backdrop-blur-sm z-20"
                  >
                    <span>Cuộn xuống</span>
                    <svg className="w-2.5 h-2.5 text-violet-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Code Preview or VS Code Simulator Pane */}
              <div className="md:col-span-8 bg-[#1e1e1e] overflow-hidden flex flex-col min-h-[500px] border-t md:border-t-0 border-zinc-900">
                {ide === "antigravity-ide" && activeFile === ".agent/config-overview.md" ? (
                  <VsCodeSimulator 
                    framework={framework}
                    language={language}
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
