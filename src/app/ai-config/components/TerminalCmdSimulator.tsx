"use client";

import { useState, useMemo, useEffect, useRef } from "react";

interface TerminalCmdSimulatorProps {
  languages: string[];
  framework: string;
  database: string;
  styling: string;
  testing: string;
  ide: string;
}

export default function TerminalCmdSimulator({
  languages,
  framework,
  database,
  styling,
  testing,
  ide,
}: TerminalCmdSimulatorProps) {
  const [typingCommand, setTypingCommand] = useState("");
  const [promptAnswer, setPromptAnswer] = useState("");
  const [installDots, setInstallDots] = useState("");
  const [stage, setStage] = useState(0); // 0: typing cmd, 1: show install confirm, 2: type confirm, 3: installing, 4: intro, 5: success, 6: printing tree
  const [printedFiles, setPrintedFiles] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetIdeName = ide === "antigravity-ide" ? "Antigravity IDE (.antigravityrules)" : "Antigravity CLI (.gemini/antigravity-cli)";

  // Compute dynamic skill paths to print
  const dynamicFiles = useMemo(() => {
    const files: string[] = [
      ".antigravityrules",
      ".agent/config-overview.md",
      ".agent/rules/GEMINI.md",
      ".agent/skills/",
    ];

    // Core languages selected
    languages.forEach(lang => {
      files.push(`L .agent/skills/${lang}/SKILL.md`);
    });

    // Framework
    if (framework !== "none") {
      files.push(`L .agent/skills/${framework === "nextjs-app" ? "nextjs-react-expert" : framework === "react-vite" ? "react-best-practices" : framework}/SKILL.md`);
    }

    // Database
    if (database !== "none") {
      files.push(`L .agent/skills/database-design/SKILL.md`);
    }

    // Styling
    if (styling !== "none") {
      files.push(`L .agent/skills/tailwind-patterns/SKILL.md`);
    }

    // Testing
    if (testing !== "none") {
      files.push(`L .agent/skills/testing-patterns/SKILL.md`);
    }

    // Add generic ones
    files.push("L .agent/skills/clean-code/SKILL.md");
    files.push("L .agent/skills/systematic-debugging/SKILL.md");

    return files;
  }, [languages, framework, database, styling, testing]);

  // Re-run whenever selections change
  useEffect(() => {
    let active = true;
    setTypingCommand("");
    setPromptAnswer("");
    setInstallDots("");
    setProgress(0);
    setStage(0);
    setPrintedFiles([]);
    
    const fullCommand = "npx @vanthiet/dev-vibe@latest";
    let charIndex = 0;
    
    let typingInterval: NodeJS.Timeout | null = null;
    let installInterval: NodeJS.Timeout | null = null;
    let filePrinter: NodeJS.Timeout | null = null;
    const timeouts: NodeJS.Timeout[] = [];
 
    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (active) fn();
      }, delay);
      timeouts.push(id);
    };
 
    // Stage 0: Type out command character-by-character
    typingInterval = setInterval(() => {
      if (!active) return;
      if (charIndex < fullCommand.length) {
        setTypingCommand(fullCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (typingInterval) clearInterval(typingInterval);
        
        // Transition to Prompt confirmation after typing finishes
        addTimeout(() => {
          setStage(1); // Show prompt
          
          addTimeout(() => {
            setStage(2); // Type confirm answer
            
            addTimeout(() => {
              setPromptAnswer("y"); // Types 'y'
              
              addTimeout(() => {
                setStage(3); // Start installation state
                
                let currentProgress = 0;
                installInterval = setInterval(() => {
                  if (!active) return;
                  if (currentProgress < 100) {
                    currentProgress += 10;
                    setProgress(currentProgress);
                  }
                }, 120);
                
                // End installation and run setup
                addTimeout(() => {
                  if (installInterval) clearInterval(installInterval);
                  setStage(4); // Show initialization introduction
                  
                  addTimeout(() => {
                    setStage(5); // Show success notice
                    
                    addTimeout(() => {
                      setStage(6); // Show directory tree header
                      
                      let fileIndex = 0;
                      filePrinter = setInterval(() => {
                        if (!active) return;
                        if (fileIndex < dynamicFiles.length) {
                          const currentFile = dynamicFiles[fileIndex];
                          if (currentFile) {
                            setPrintedFiles(prev => [...prev, currentFile]);
                          }
                          fileIndex++;
                        } else {
                          if (filePrinter) clearInterval(filePrinter);
                        }
                      }, 100);
                    }, 600);
                  }, 800);
                }, 1500);
              }, 400);
            }, 300);
          }, 400);
        }, 400);
      }
    }, 30);
    
    return () => {
      active = false;
      if (typingInterval) clearInterval(typingInterval);
      if (installInterval) clearInterval(installInterval);
      if (filePrinter) clearInterval(filePrinter);
      timeouts.forEach(clearTimeout);
    };
  }, [languages, framework, database, styling, testing, ide, dynamicFiles]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typingCommand, promptAnswer, installDots, stage, printedFiles]);

  return (
    <div className="w-full bg-[#09090b] border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl font-mono text-[11px] leading-relaxed text-zinc-300 flex flex-col relative group transition-all duration-300 hover:border-zinc-700/60">
      {/* Terminal Title Bar */}
      <div className="bg-[#121214] px-4 py-2.5 border-b border-zinc-900/60 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase select-none">Windows PowerShell</span>
        <span className="text-[9px] text-zinc-600 select-none">terminal</span>
      </div>

      {/* Terminal Screen content */}
      <div ref={containerRef} className="p-4 overflow-y-auto flex-1 space-y-2.5 min-h-[220px] max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-850 scrollbar-track-transparent">
        {/* Line 1: PS Prompt */}
        <div>
          <span className="text-zinc-400">PS D:\demo&gt; </span>
          <span className="text-zinc-100 font-semibold">{typingCommand}</span>
          {stage === 0 && <span className="inline-block w-1.5 h-3.5 bg-zinc-400 ml-0.5 animate-pulse" />}
        </div>

        {/* NPM package install confirmation prompt */}
        {stage >= 1 && (
          <div className="space-y-1 text-zinc-300">
            <div>Need to install the following packages:</div>
            <div className="pl-4 text-zinc-400">@vanthiet/dev-vibe@latest</div>
            <div>
              <span>Ok to proceed? (y) </span>
              <span className="text-zinc-100 font-semibold">{promptAnswer}</span>
              {stage === 2 && <span className="inline-block w-1.5 h-3.5 bg-zinc-400 ml-0.5 animate-pulse" />}
            </div>
          </div>
        )}

        {/* Installation progress */}
        {stage === 3 && (
          <div className="space-y-1 text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 animate-spin">⠋</span>
              <span>Installing packages...</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-zinc-650">[</span>
              <span className="text-emerald-450 tracking-[-0.5px]">
                {"█".repeat(Math.floor(progress / 5))}
                {"░".repeat(20 - Math.floor(progress / 5))}
              </span>
              <span className="text-zinc-650">]</span>
              <span className="text-zinc-300 font-bold">{progress}%</span>
            </div>
            <div className="text-[10px] text-zinc-500 pl-5">
              {progress < 25 && "sill resolveWithNewModule"}
              {progress >= 25 && progress < 50 && "sill loadCurrentTree"}
              {progress >= 50 && progress < 75 && "sill install @vanthiet/dev-vibe"}
              {progress >= 75 && "sill generateWorkspaces"}
            </div>
          </div>
        )}

        {/* Stage 4: Header / Option Prompt */}
        {stage >= 4 && (
          <div className="space-y-1 animate-fade-in pl-1">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <span>🚀 Khởi tạo Quy chuẩn Dev-Vibe Agent Initializer</span>
            </div>
            <div className="text-zinc-200">
              <span>Chọn cấu hình IDE đích của bạn: <span className="text-emerald-400 font-bold">» {targetIdeName}</span></span>
            </div>
          </div>
        )}

        {/* Stage 5: Success Notice */}
        {stage >= 5 && (
          <div className="text-emerald-400 font-semibold flex items-center gap-1.5 pl-1.5 py-0.5 animate-fade-in">
            <span>✓ Đã hoàn thành thiết lập Quy chuẩn Dev-Vibe thành công! 🎉</span>
          </div>
        )}

        {/* Stage 6: Project Tree Output */}
        {stage >= 6 && (
          <div className="space-y-1 border-t border-zinc-900/60 pt-2.5 animate-fade-in pl-1.5">
            <div className="text-yellow-500/90 font-bold flex items-center gap-1 text-[10px]">
              <span>📁 Thư mục dự án của bạn đã được cập nhật:</span>
            </div>
            <div className="space-y-0.5 pl-2 text-zinc-400">
              {printedFiles.map((file, index) =>
                file?.startsWith("L ") ? (
                  <div key={index} className="flex items-center gap-1.5 animate-fade-in">
                    <span className="text-zinc-700 select-none">└──</span>
                    <span className="text-zinc-550 select-none">[Tạo mới]</span>
                    <span className="text-violet-300 font-medium">{file.substring(2)}</span>
                  </div>
                ) : (
                  <div key={index} className="flex items-center gap-1.5 animate-fade-in">
                    <span className="text-emerald-500 select-none">[Tạo mới]</span>
                    <span className="text-zinc-200 font-medium">{file || ""}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
