"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { LightningIcon } from "@/components/icons";
import { GEMINI_RULES_CONTENT } from "../constants/gemini-rules";

// Hierarchical visual directory tree interface
export interface TreeNode {
  name: string;
  path?: string;
  isFolder: boolean;
  children: TreeNode[];
}

// Visual Directory Tree builder
export const buildTree = (files: { path: string; label: string }[]): TreeNode[] => {
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

interface VsCodeSimulatorProps {
  framework: string;
  languages: string[];
  database: string;
  styling: string;
  testing: string;
}

export default function VsCodeSimulator({ 
  framework, 
  languages,
  database,
  styling,
  testing
}: VsCodeSimulatorProps) {
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

  // Flash glow effect state for dynamic files
  const [glowingItems, setGlowingItems] = useState<string[]>([]);
  
  // Track previous values to detect changes
  const prevLanguages = useRef<string[]>(languages);
  const prevFramework = useRef<string>(framework);
  const prevDatabase = useRef<string>(database);
  const prevStyling = useRef<string>(styling);
  const prevTesting = useRef<string>(testing);

  useEffect(() => {
    const changes: string[] = [];

    // Check languages change
    if (JSON.stringify(languages) !== JSON.stringify(prevLanguages.current)) {
      languages.forEach(lang => {
        if (!prevLanguages.current.includes(lang)) {
          changes.push(`rules/${lang}.rules`);
        }
      });
      prevLanguages.current = languages;
    }

    // Check framework change
    if (framework !== prevFramework.current) {
      if (framework === "nextjs-app") {
        changes.push("skills/nextjs-react-expert/SKILL.md");
        changes.push("agents/nextjs-specialist.md");
      }
      prevFramework.current = framework;
    }

    // Check database change
    if (database !== prevDatabase.current) {
      changes.push("skills/database-design/SKILL.md");
      changes.push("agents/database-architect.md");
      prevDatabase.current = database;
    }

    // Check styling change
    if (styling !== prevStyling.current) {
      if (styling === "tailwind-v4") {
        changes.push("skills/tailwind-patterns/SKILL.md");
      }
      changes.push("agents/ui-designer.md");
      prevStyling.current = styling;
    }

    // If there are changes, trigger the glowing animation for 2 seconds!
    if (changes.length > 0) {
      setGlowingItems(changes);
      const timer = setTimeout(() => {
        setGlowingItems([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [languages, framework, database, styling, testing]);

  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the typing visual terminal/editor panel
  useEffect(() => {
    const el = editorContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [editorText]);

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
      for (const char of folderChars) {
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
      for (const char of fileChars) {
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

      // Phase 10: Character-by-character typing with realistic human-like speed variation
      setShowLaser(true);
      const fullContent = GEMINI_RULES_CONTENT;
      
      let typedEditor = "";
      for (let i = 0; i < fullContent.length; i++) {
        if (!active) return;
        const char = fullContent[i];
        typedEditor += char;
        setEditorText(typedEditor);

        // Realistic speed: slower at newlines/punctuation, faster for normal chars
        let delay: number;
        if (char === "\n") {
          delay = 80 + Math.random() * 100; // pause at line breaks
        } else if (".,;:!?".includes(char)) {
          delay = 60 + Math.random() * 80;  // slight pause after punctuation
        } else if (char === " ") {
          delay = 15 + Math.random() * 25;  // fast space
        } else {
          delay = 18 + Math.random() * 32;  // normal keystroke ~18-50ms
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      await new Promise(resolve => setTimeout(resolve, 600));
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
  }, [framework, languages]);

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
        <div className="md:col-span-3 bg-[#252526] border-r border-[#1e1e1e] flex flex-col text-zinc-400 font-mono select-none overflow-y-auto max-h-[500px]">
          <div className="px-3 py-2 text-[9px] uppercase tracking-wider font-extrabold text-zinc-500 border-b border-[#1e1e1e] flex items-center justify-between">
            <span>Explorer: MY-PROJECT</span>
            <div className="flex items-center gap-2 text-zinc-500 font-normal">
              <span className={`hover:text-zinc-200 transition-colors p-0.5 rounded ${showFolderInput ? "text-violet-400 bg-zinc-800" : ""}`}>📁⁺</span>
              <span className={`hover:text-zinc-200 transition-colors p-0.5 rounded ${showFileInput ? "text-violet-400 bg-zinc-800" : ""}`}>📄⁺</span>
            </div>
          </div>
          
          <div className="p-3 space-y-1.5 text-[11px] overflow-y-auto max-h-[460px]">
            <div className="font-bold text-zinc-300">📁 MY-PROJECT</div>
            
            {/* .agent/ folder tree */}
            <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
              
              {showFolderInput && (
                <div className="flex items-center gap-1.5 text-violet-400 font-bold bg-violet-950/20 py-0.5 px-1 rounded animate-pulse border border-violet-800/30">
                  <span>📂</span>
                  <span className="font-mono">{folderInputVal}</span>
                  <span className="w-1 h-3.5 bg-violet-400 animate-ping" />
                </div>
              )}

              {isStep1Done && (
                <div className="flex items-center gap-1.5 transition-all duration-300 text-emerald-400 font-bold animate-fade-in">
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
                  <div className="pl-4 flex items-center justify-between gap-1.5 transition-all duration-300 text-emerald-300 py-0.5 px-1.5 rounded hover:bg-zinc-800/20 group">
                    <div className="flex items-center gap-1.5">
                      <span>📄</span>
                      <span>GEMINI.md</span>
                    </div>
                    <span className="text-[7px] font-extrabold text-zinc-500 bg-zinc-800 border border-zinc-700 px-1 rounded uppercase tracking-wide shrink-0 scale-90">Core</span>
                  </div>
                )}

                {/* Dynamic language rules with reactive glows */}
                {isStep2Done && languages.map(lang => {
                  const itemPath = `rules/${lang}.rules`;
                  const isGlowing = glowingItems.includes(itemPath);
                  return (
                    <div 
                      key={lang} 
                      className={`pl-4 flex items-center justify-between gap-1.5 transition-all duration-500 py-0.5 px-1.5 rounded border ${
                        isGlowing 
                          ? "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                          : "text-emerald-300 border-transparent hover:bg-zinc-850/30"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>⚙️</span>
                        <span className="capitalize text-[10px]">{lang}.rules</span>
                      </div>
                      <span className={`text-[6px] font-extrabold px-1 rounded uppercase tracking-wide shrink-0 ${
                        isGlowing ? "text-violet-300 bg-violet-600/30 border border-violet-500/50" : "text-zinc-500 bg-zinc-850"
                      }`}>
                        {isGlowing ? "Flash" : "Active"}
                      </span>
                    </div>
                  );
                })}

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
                
                {isStep3Done && (
                  <>
                    <div className="pl-4 space-y-1 text-emerald-350">
                      <div className="flex items-center gap-1.5">
                        <span>📂</span>
                        <span>clean-code</span>
                      </div>
                      <div className="pl-4 flex items-center gap-1.5 text-emerald-300">
                        <span>📄</span>
                        <span>SKILL.md</span>
                      </div>
                    </div>

                    {/* Dynamic Next.js Skill */}
                    {framework === "nextjs-app" && (() => {
                      const itemPath = "skills/nextjs-react-expert/SKILL.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 space-y-1 rounded border transition-all duration-500 py-0.5 ${
                          isGlowing 
                            ? "bg-violet-500/20 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "border-transparent"
                        }`}>
                          <div className="flex items-center justify-between pr-1">
                            <div className="flex items-center gap-1.5 text-emerald-350">
                              <span>📂</span>
                              <span>nextjs-react-expert</span>
                            </div>
                            <span className="text-[6px] font-bold text-violet-300 bg-violet-950/50 border border-violet-850/40 px-1 rounded uppercase tracking-wide shrink-0">Next.js</span>
                          </div>
                          <div className="pl-4 flex items-center gap-1.5 text-emerald-300">
                            <span>📄</span>
                            <span>SKILL.md</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Dynamic Database Skill */}
                    {(database === "postgres" || database === "mongodb") && (() => {
                      const itemPath = "skills/database-design/SKILL.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 space-y-1 rounded border transition-all duration-500 py-0.5 ${
                          isGlowing 
                            ? "bg-violet-500/20 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "border-transparent"
                        }`}>
                          <div className="flex items-center justify-between pr-1">
                            <div className="flex items-center gap-1.5 text-emerald-350">
                              <span>📂</span>
                              <span>database-design</span>
                            </div>
                            <span className="text-[6px] font-bold text-violet-300 bg-violet-950/50 border border-violet-850/40 px-1 rounded uppercase tracking-wide shrink-0">DB</span>
                          </div>
                          <div className="pl-4 flex items-center gap-1.5 text-emerald-300">
                            <span>📄</span>
                            <span>SKILL.md</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Dynamic Tailwind Skill */}
                    {styling === "tailwind-v4" && (() => {
                      const itemPath = "skills/tailwind-patterns/SKILL.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 space-y-1 rounded border transition-all duration-500 py-0.5 ${
                          isGlowing 
                            ? "bg-violet-500/20 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "border-transparent"
                        }`}>
                          <div className="flex items-center justify-between pr-1">
                            <div className="flex items-center gap-1.5 text-emerald-350">
                              <span>📂</span>
                              <span>tailwind-patterns</span>
                            </div>
                            <span className="text-[6px] font-bold text-violet-300 bg-violet-950/50 border border-violet-850/40 px-1 rounded uppercase tracking-wide shrink-0">Tailwind</span>
                          </div>
                          <div className="pl-4 flex items-center gap-1.5 text-emerald-300">
                            <span>📄</span>
                            <span>SKILL.md</span>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}

                {!isStep3Done && (
                  <div className="pl-4 flex items-center gap-1.5 text-zinc-650 opacity-40">
                    <span>📂</span>
                    <span>clean-code</span>
                  </div>
                )}
              </div>

              {/* agents/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep3Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>agents</span>
                </div>
                
                {isStep3Done && (
                  <>
                    <div className="pl-4 flex items-center gap-1.5 text-emerald-300 py-0.5">
                      <span>📄</span>
                      <span>debugger.md</span>
                    </div>
                    <div className="pl-4 flex items-center gap-1.5 text-emerald-300 py-0.5">
                      <span>📄</span>
                      <span>orchestrator.md</span>
                    </div>

                    {/* Next.js Specialist */}
                    {framework === "nextjs-app" && (() => {
                      const itemPath = "agents/nextjs-specialist.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 flex items-center justify-between gap-1.5 transition-all duration-500 py-0.5 px-1.5 rounded border ${
                          isGlowing 
                            ? "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "text-emerald-300 border-transparent hover:bg-zinc-850/30"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span>📄</span>
                            <span>nextjs-specialist.md</span>
                          </div>
                          <span className={`text-[6px] font-extrabold px-1 rounded uppercase tracking-wide shrink-0 ${
                            isGlowing ? "text-violet-300 bg-violet-600/30 border border-violet-500/50 animate-pulse" : "text-zinc-500 bg-zinc-850"
                          }`}>
                            Next.js
                          </span>
                        </div>
                      );
                    })()}

                    {/* Database Architect */}
                    {(database === "postgres" || database === "mongodb") && (() => {
                      const itemPath = "agents/database-architect.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 flex items-center justify-between gap-1.5 transition-all duration-500 py-0.5 px-1.5 rounded border ${
                          isGlowing 
                            ? "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "text-emerald-300 border-transparent hover:bg-zinc-850/30"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span>📄</span>
                            <span>database-architect.md</span>
                          </div>
                          <span className={`text-[6px] font-extrabold px-1 rounded uppercase tracking-wide shrink-0 ${
                            isGlowing ? "text-violet-300 bg-violet-600/30 border border-violet-500/50 animate-pulse" : "text-zinc-500 bg-zinc-850"
                          }`}>
                            DB
                          </span>
                        </div>
                      );
                    })()}

                    {/* UI Designer */}
                    {(styling === "shadcn" || styling === "tailwind-v4") && (() => {
                      const itemPath = "agents/ui-designer.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 flex items-center justify-between gap-1.5 transition-all duration-500 py-0.5 px-1.5 rounded border ${
                          isGlowing 
                            ? "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "text-emerald-300 border-transparent hover:bg-zinc-850/30"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span>📄</span>
                            <span>ui-designer.md</span>
                          </div>
                          <span className={`text-[6px] font-extrabold px-1 rounded uppercase tracking-wide shrink-0 ${
                            isGlowing ? "text-violet-300 bg-violet-600/30 border border-violet-500/50 animate-pulse" : "text-zinc-500 bg-zinc-850"
                          }`}>
                            UI
                          </span>
                        </div>
                      );
                    })()}
                  </>
                )}

                {!isStep3Done && (
                  <div className="pl-4 flex items-center gap-1.5 text-zinc-650 opacity-40">
                    <span>📄</span>
                    <span>debugger.md</span>
                  </div>
                )}
              </div>

              {/* workflows/ subfolder */}
              <div className="pl-3 space-y-1.5 border-l border-zinc-800/80 ml-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isStep4Done ? "text-emerald-400 font-bold" : "text-zinc-650 opacity-40"
                }`}>
                  <span>📂</span>
                  <span>workflows</span>
                </div>
                
                {isStep4Done && (
                  <>
                    <div className="pl-4 flex items-center gap-1.5 text-emerald-350 py-0.5">
                      <span>📄</span>
                      <span>debug.md</span>
                    </div>
                    <div className="pl-4 flex items-center gap-1.5 text-emerald-350 py-0.5">
                      <span>📄</span>
                      <span>plan.md</span>
                    </div>

                    {/* UI/UX Workflow */}
                    {(framework === "nextjs-app" || styling === "shadcn") && (() => {
                      const itemPath = "workflows/ui-ux.md";
                      const isGlowing = glowingItems.includes(itemPath);
                      return (
                        <div className={`pl-4 flex items-center justify-between gap-1.5 transition-all duration-500 py-0.5 px-1.5 rounded border ${
                          isGlowing 
                            ? "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.4)] animate-pulse" 
                            : "text-emerald-300 border-transparent hover:bg-zinc-850/30"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span>📄</span>
                            <span>ui-ux.md</span>
                          </div>
                          <span className={`text-[6px] font-extrabold px-1 rounded uppercase tracking-wide shrink-0 ${
                            isGlowing ? "text-violet-300 bg-violet-600/30 border border-violet-500/50 animate-pulse" : "text-zinc-500 bg-zinc-850"
                          }`}>
                            UI/UX
                          </span>
                        </div>
                      );
                    })()}
                  </>
                )}

                {!isStep4Done && (
                  <div className="pl-4 flex items-center gap-1.5 text-zinc-650 opacity-40">
                    <span>📄</span>
                    <span>debug.md</span>
                  </div>
                )}
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
        <div className="md:col-span-9 p-5 flex flex-col bg-[#1e1e1e] text-zinc-300 overflow-hidden relative">
          
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
          <div 
            ref={editorContainerRef}
            className="flex-grow font-mono text-[11px] leading-relaxed text-zinc-300 overflow-y-auto max-h-[360px] whitespace-pre relative border border-zinc-900/60 rounded bg-[#151515] p-4 select-text scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          >
            {showLaser && (
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.8)]" style={{ top: "35%" }} />
            )}
            
            {editorText ? (
              <>
                {editorText}
                {showLaser && (
                  <span className="inline-block w-[2px] h-[14px] bg-zinc-200 align-middle animate-[blink_1s_step-end_infinite] ml-px" />
                )}
              </>
            ) : (
              <span className="text-zinc-650 italic select-none">Đang chờ khởi động quy chuẩn hành vi từ Explorer...</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
