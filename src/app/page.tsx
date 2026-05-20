'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
}

interface IParameterExplanation {
  param: string;
  description: string;
}

interface IExample {
  title: string;
  command: string;
  description?: string;
}

interface ICommand {
  _id: string;
  categoryId: string;
  title: string;
  slug: string;
  command: string;
  description: string;
  explanations: IParameterExplanation[];
  examples: IExample[];
  platforms: ('CMD' | 'PowerShell' | 'GitBash')[];
  tags: string[];
  viewCount: number;
}

// Helper to map category slugs to modern custom inline SVGs with responsive styling
const getCategoryIcon = (slug: string, color?: string) => {
  const c = color || 'currentColor';
  switch (slug) {
    case 'git-setup':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      );
    case 'git-config':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'github-auth':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case 'git-remote':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case 'git-branch':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 17V9m0 0a3 3 0 013-3h3m-3 3a3 3 0 003 3h3" />
        </svg>
      );
    case 'git-stash':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    case 'git-conflict':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'git-undo-reset':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      );
    case 'git-ignore':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      );
    case 'git-logs':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'vscode-git':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'git-errors':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'git-workflows':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case 'terminal-basics':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'antigravity-cli':
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      );
  }
};

// Helper to identify antigravity category
const isAntigravityCategory = (cat: ICategory) => {
  return cat.slug.startsWith('antigravity');
};

// Helper to identify git category
const isGitCategory = (cat: ICategory) => {
  return (cat.slug.startsWith('git') || cat.slug.startsWith('github') || cat.slug === 'vscode-git') && !isAntigravityCategory(cat);
};

export default function Home() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [commands, setCommands] = useState<ICommand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'git' | 'terminal' | 'antigravity'>('all');
  const [selectedCommandId, setSelectedCommandId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Filter commands by selectedGroup, platform, and search query
  const filteredCommands = useMemo(() => {
    return commands.filter(cmd => {
      const cat = categories.find(c => c._id === cmd.categoryId);
      if (!cat) return false;

      // 1. Group / Scope filter
      const isGit = isGitCategory(cat);
      const isAntigravity = isAntigravityCategory(cat);
      if (selectedGroup === 'git' && !isGit) return false;
      if (selectedGroup === 'terminal' && (isGit || isAntigravity)) return false;
      if (selectedGroup === 'antigravity' && !isAntigravity) return false;

      // 2. Platform filter
      if (selectedPlatform && !cmd.platforms.includes(selectedPlatform as any)) return false;

      // 3. Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = cmd.title.toLowerCase().includes(q);
        const matchesDesc = cmd.description.toLowerCase().includes(q);
        const matchesCmd = cmd.command.toLowerCase().includes(q);
        const matchesTags = cmd.tags.some(t => t.toLowerCase().includes(q));
        const matchesExplanations = cmd.explanations?.some(
          exp => exp.param.toLowerCase().includes(q) || exp.description.toLowerCase().includes(q)
        );
        const matchesExamples = cmd.examples?.some(
          ex => ex.title.toLowerCase().includes(q) || ex.command.toLowerCase().includes(q) || ex.description?.toLowerCase().includes(q)
        );

        if (!matchesTitle && !matchesDesc && !matchesCmd && !matchesTags && !matchesExplanations && !matchesExamples) {
          return false;
        }
      }

      return true;
    });
  }, [commands, categories, selectedGroup, selectedPlatform, searchQuery]);

  // Group filtered commands by categoryId
  const commandsByCategory = useMemo(() => {
    const map: Record<string, ICommand[]> = {};
    filteredCommands.forEach(cmd => {
      if (!map[cmd.categoryId]) {
        map[cmd.categoryId] = [];
      }
      map[cmd.categoryId].push(cmd);
    });
    return map;
  }, [filteredCommands]);

  // Active command logic
  const activeCommand = useMemo(() => {
    if (selectedCommandId) {
      const found = filteredCommands.find(c => c._id === selectedCommandId);
      if (found) return found;
    }
    return filteredCommands[0] || null;
  }, [filteredCommands, selectedCommandId]);

  // Split categories for Git, Terminal, and Antigravity
  const gitCategories = useMemo(() => {
    return categories.filter(isGitCategory);
  }, [categories]);

  const terminalCategories = useMemo(() => {
    return categories.filter(cat => !isGitCategory(cat) && !isAntigravityCategory(cat));
  }, [categories]);

  const antigravityCategories = useMemo(() => {
    return categories.filter(isAntigravityCategory);
  }, [categories]);

  // Load initial data
  const fetchInitialData = async () => {
    try {
      const [catsRes, cmdsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/commands')
      ]);
      const catsData = await catsRes.json();
      const cmdsData = await cmdsRes.json();

      if (catsData.success) {
        const cats = catsData.data || [];
        setCategories(cats);
        
        // Auto-expand all categories on initial load
        const initialExpanded: Record<string, boolean> = {};
        cats.forEach((cat: ICategory) => {
          initialExpanded[cat._id] = true;
        });
        setExpandedCategories(initialExpanded);
      }
      if (cmdsData.success) {
        setCommands(cmdsData.data || []);
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Auto-expand active command's category
  useEffect(() => {
    if (activeCommand) {
      Promise.resolve().then(() => {
        setExpandedCategories(prev => {
          if (!prev[activeCommand.categoryId]) {
            return { ...prev, [activeCommand.categoryId]: true };
          }
          return prev;
        });
      });
    }
  }, [activeCommand]);

  // Auto-expand categories with matching search results
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const expanded: Record<string, boolean> = {};
      categories.forEach(cat => {
        const hasMatch = filteredCommands.some(cmd => cmd.categoryId === cat._id);
        if (hasMatch) {
          expanded[cat._id] = true;
        }
      });
      Promise.resolve().then(() => {
        setExpandedCategories(expanded);
      });
    }
  }, [searchQuery, filteredCommands, categories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runSeeding = async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch('/api/seed');
      const result = await res.json();
      if (result.success) {
        setSeedMessage('Khởi tạo dữ liệu mẫu thành công!');
        setLoading(true);
        await fetchInitialData();
      } else {
        setSeedMessage(`Lỗi khởi tạo: ${result.error}`);
      }
    } catch (err) {
      const error = err as Error;
      setSeedMessage(`Yêu cầu thất bại: ${error.message}`);
    } finally {
      setSeeding(false);
    }
  };


  const resetFilters = () => {
    setSelectedPlatform(null);
    setSearchQuery('');
    setSelectedGroup('all');
    setSelectedCommandId(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-blue-500 selection:text-white">
      {/* Header Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-8xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-zinc-50 before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4  before:from-blue-500 before:via-cyan-500 before:to-blue-600 before:opacity-15 before:mix-blend-hard-light font-semibold text-base tracking-tight flex items-center gap-2">
              <span className="text-blue-500 font-extrabold font-mono">&gt;_</span> DEV-CHEATSHEET
            </h1>
            <span className="text-xs uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-medium">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runSeeding}
              disabled={seeding}
              className={`text-sm font-medium px-3 py-1.5 border rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95 ${seeding
                ? 'border-blue-500/30 text-blue-400 bg-blue-500/5'
                : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-50 hover:border-zinc-700'
                }`}
            >
              {seeding ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Seeding DB...</span>
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
                  </svg>
                  <span>Re-seed Database</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-8xl mx-auto px-6 py-8">

        {/* Seed status message pop-up */}
        {seedMessage && (
          <div className="mb-6 p-4 border border-zinc-800 bg-zinc-900 text-zinc-200 text-xs flex items-center justify-between animate-fade-in rounded-md">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              <span>{seedMessage}</span>
            </div>
          </div>
        )}

        {/* Global Search Bar */}
        <div className="relative mb-8 bg-zinc-900/40 border border-zinc-800/80 focus-within:border-blue-500 focus-within:bg-zinc-950 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200 rounded-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-zinc-500 text-sm font-semibold select-none font-mono">$</span>
            <span className="text-zinc-500 text-xs ml-1.5 select-none font-mono">grep</span>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm lệnh, công dụng, cờ (e.g. proxy, config, user.name, Get-NetTCPConnection)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-16 pr-4 py-3.5 bg-transparent border-0 outline-none text-zinc-100 placeholder-zinc-500 text-base leading-relaxed"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors text-xs"
            >
              [clear]
            </button>
          )}
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Column: Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">

            {/* Scope Switcher */}
            <div className="space-y-2">
              <h3 className="px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                🔌 Scope / Công cụ
              </h3>
              <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-950 border border-zinc-900 rounded-lg">
                <button
                  onClick={() => setSelectedGroup('all')}
                  className={`py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer text-center truncate ${selectedGroup === 'all'
                    ? 'bg-zinc-900 text-zinc-50 border border-zinc-800/80 shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedGroup('git')}
                  className={`py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer text-center truncate ${selectedGroup === 'git'
                    ? 'bg-zinc-900 text-zinc-50 border border-zinc-800/80 shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  Git
                </button>
                <button
                  onClick={() => setSelectedGroup('terminal')}
                  className={`py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer text-center truncate ${selectedGroup === 'terminal'
                    ? 'bg-zinc-900 text-zinc-50 border border-zinc-800/80 shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  Terminal
                </button>
                <button
                  onClick={() => setSelectedGroup('antigravity')}
                  className={`py-1.5 text-[10px] sm:text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer text-center truncate ${selectedGroup === 'antigravity'
                    ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/80 shadow-xs font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-cyan-950/10'
                    }`}
                >
                  Antigravity
                </button>
              </div>
            </div>

            {/* Filter Section: Categories & Commands Tree */}
            <div className="space-y-2">
              <h3 className="px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                I - Danh mục & Lệnh
              </h3>
              <nav className="space-y-4">
                {/* Git Accordion Group */}
                {(selectedGroup === 'all' || selectedGroup === 'git') && (
                  <div className="space-y-1.5">
                    <div className="px-2 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-l border-blue-500/50 ml-1 flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-[#F05032]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.38 11.41L12.59 1.62c-.78-.78-2.05-.78-2.83 0L7.75 3.63l3.29 3.29c.8-.26 1.71-.06 2.33.56.62.62.82 1.53.56 2.33l3.29 3.29c.8-.26 1.71-.06 2.33.56.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.62-.62-.82-1.53-.56-2.33l-3.29-3.29c-.26.26-.61.43-.99.49l-.01.01c-.13 3.19-.13 3.19-.07 3.3l3.28 3.28c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83l-3.28-3.28c-.06-.11-.06-.11-.06-3.32-.38-.06-.73-.23-.99-.49-.62-.62-.82-1.53-.56-2.33L6.96 6.84 1.62 12.18c-.78.78-.78 2.05 0 2.83l9.79 9.79c.78.78 2.05.78 2.83 0l9.79-9.79c.79-.79.79-2.05.35-2.6z" />
                      </svg>
                      <span>Git & GitHub</span>
                    </div>
                    <div className="space-y-1 pl-1">
                      {gitCategories.map(cat => {
                        const catCommands = commandsByCategory[cat._id] || [];
                        if (catCommands.length === 0) return null;
                        const isExpanded = !!expandedCategories[cat._id];

                        return (
                          <div key={cat._id} className="space-y-0.5">
                            <button
                              onClick={() => setExpandedCategories(prev => ({ ...prev, [cat._id]: !prev[cat._id] }))}
                              className="w-full text-left px-2 py-1.5 text-[13px] rounded transition-all duration-200 font-medium flex items-center justify-between cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                            >
                              <div className="flex items-center gap-2 truncate">
                                {getCategoryIcon(cat.slug, cat.color)}
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-800/80">
                                  {catCommands.length}
                                </span>
                                <svg
                                  className={`h-2.5 w-2.5 text-zinc-500 transition-transform duration-150 ${isExpanded ? 'rotate-90 text-zinc-300' : ''
                                    }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </button>
                            {isExpanded && (
                              <div className="space-y-0.5 ml-1 pb-1 transition-all duration-150 pl-1.5 border-l border-zinc-900">
                                {catCommands.map((cmd) => {
                                  const isSelected = activeCommand?._id === cmd._id;
                                  return (
                                    <button
                                      key={cmd._id}
                                      onClick={() => setSelectedCommandId(cmd._id)}
                                      className={`w-full text-left text-xs rounded transition-all duration-150 py-1.5 px-2.5 flex items-start gap-1.5 cursor-pointer font-mono ${isSelected
                                        ? 'text-blue-400 bg-blue-950/15 border-l-2 border-blue-500 font-medium'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/25 border-l border-zinc-800'
                                        }`}
                                    >
                                      <span className="text-zinc-700 select-none">&gt;</span>
                                      <span className="truncate" title={cmd.command}>{cmd.command}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Terminal/CMD Accordion Group */}
                {(selectedGroup === 'all' || selectedGroup === 'terminal') && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-900/60">
                    <div className="px-2 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-l border-purple-500/50 ml-1 flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Terminal & CMD</span>
                    </div>
                    <div className="space-y-1 pl-1">
                      {terminalCategories.map(cat => {
                        const catCommands = commandsByCategory[cat._id] || [];
                        if (catCommands.length === 0) return null;
                        const isExpanded = !!expandedCategories[cat._id];

                        return (
                          <div key={cat._id} className="space-y-0.5">
                            <button
                              onClick={() => setExpandedCategories(prev => ({ ...prev, [cat._id]: !prev[cat._id] }))}
                              className="w-full text-left px-2 py-1.5 text-[13px] rounded transition-all duration-200 font-medium flex items-center justify-between cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                            >
                              <div className="flex items-center gap-2 truncate">
                                {getCategoryIcon(cat.slug, cat.color)}
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-800/80">
                                  {catCommands.length}
                                </span>
                                <svg
                                  className={`h-2.5 w-2.5 text-zinc-500 transition-transform duration-150 ${isExpanded ? 'rotate-90 text-zinc-300' : ''
                                    }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </button>
                            {isExpanded && (
                              <div className="space-y-0.5 ml-1 pb-1 transition-all duration-150 pl-1.5 border-l border-zinc-900">
                                {catCommands.map((cmd) => {
                                  const isSelected = activeCommand?._id === cmd._id;
                                  return (
                                    <button
                                      key={cmd._id}
                                      onClick={() => setSelectedCommandId(cmd._id)}
                                      className={`w-full text-left text-xs rounded transition-all duration-150 py-1.5 px-2.5 flex items-start gap-1.5 cursor-pointer font-mono ${isSelected
                                        ? 'text-blue-400 bg-blue-950/15 border-l-2 border-blue-500 font-medium'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/25 border-l border-zinc-800'
                                        }`}
                                    >
                                      <span className="text-zinc-700 select-none">&gt;</span>
                                      <span className="truncate" title={cmd.command}>{cmd.command}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Antigravity Accordion Group */}
                {(selectedGroup === 'all' || selectedGroup === 'antigravity') && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-900/60">
                    <div className="px-2 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-l border-cyan-500/50 ml-1 flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 12h10L8 21l14-9H12l4-9z" />
                      </svg>
                      <span>Antigravity</span>
                    </div>
                    <div className="space-y-1 pl-1">
                      {antigravityCategories.map(cat => {
                        const catCommands = commandsByCategory[cat._id] || [];
                        if (catCommands.length === 0) return null;
                        const isExpanded = !!expandedCategories[cat._id];

                        return (
                          <div key={cat._id} className="space-y-0.5">
                            <button
                              onClick={() => setExpandedCategories(prev => ({ ...prev, [cat._id]: !prev[cat._id] }))}
                              className="w-full text-left px-2 py-1.5 text-[13px] rounded transition-all duration-200 font-medium flex items-center justify-between cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                            >
                              <div className="flex items-center gap-2 truncate">
                                {getCategoryIcon(cat.slug, cat.color)}
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-800/80">
                                  {catCommands.length}
                                </span>
                                <svg
                                  className={`h-2.5 w-2.5 text-zinc-500 transition-transform duration-150 ${isExpanded ? 'rotate-90 text-zinc-300' : ''
                                    }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </button>
                            {isExpanded && (
                              <div className="space-y-0.5 ml-1 pb-1 transition-all duration-150 pl-1.5 border-l border-zinc-900">
                                {catCommands.map((cmd) => {
                                  const isSelected = activeCommand?._id === cmd._id;
                                  return (
                                    <button
                                      key={cmd._id}
                                      onClick={() => setSelectedCommandId(cmd._id)}
                                      className={`w-full text-left text-xs rounded transition-all duration-150 py-1.5 px-2.5 flex items-start gap-1.5 cursor-pointer font-mono ${isSelected
                                        ? 'text-cyan-400 bg-cyan-950/15 border-l-2 border-cyan-500 font-medium'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/25 border-l border-zinc-800'
                                        }`}
                                    >
                                      <span className="text-zinc-700 select-none">&gt;</span>
                                      <span className="truncate" title={cmd.command}>{cmd.command}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </nav>
            </div>

            {/* Filter Section: Platforms */}
            <div className="space-y-3">
              <h3 className="px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                💻 Platforms
              </h3>
              <nav className="space-y-0.5">
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className={`w-full text-left px-2.5 py-1.5 text-sm rounded-md transition-colors font-medium flex items-center justify-between cursor-pointer ${selectedPlatform === null
                    ? 'bg-zinc-800 text-zinc-50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                >
                  <span>All Platforms</span>
                </button>
                {['CMD', 'PowerShell', 'GitBash'].map((plat) => {
                  const isActive = selectedPlatform === plat;
                  return (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(isActive ? null : plat)}
                      className={`w-full text-left px-2.5 py-1.5 text-sm rounded-md transition-colors flex items-center justify-between cursor-pointer ${isActive
                        ? 'bg-zinc-800 text-zinc-50 font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                        }`}
                    >
                      <span>{plat}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Helper Panel */}
            <div className="border-t border-zinc-800/80 pt-6 px-2 text-sm text-zinc-500 leading-relaxed space-y-2.5 hidden lg:block">
              <p>
                Click vào dòng lệnh hoặc ví dụ để sao chép nhanh vào Clipboard.
              </p>
              {(selectedPlatform || searchQuery || selectedGroup !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="w-full text-center py-1.5 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-md transition-colors text-sm font-medium cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>

          </aside>

          {/* Right Column: Active Command Detail */}
          <div className="lg:col-span-3 space-y-6">

            {/* Active filters display */}
            {(selectedPlatform || searchQuery || selectedGroup !== 'all') && (
              <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-800 px-4 py-2.5 rounded-md text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-zinc-400">Kết quả lọc:</span>
                  {selectedGroup !== 'all' && (
                    <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium">
                      scope:{selectedGroup === 'git' ? 'Git' : selectedGroup === 'terminal' ? 'CMD/Terminal' : 'Antigravity'}
                    </span>
                  )}
                  {selectedPlatform && (
                    <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium">
                      platform:{selectedPlatform}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-medium italic">
                      &ldquo;{searchQuery}&rdquo;
                    </span>
                  )}
                </div>
                <button
                  onClick={resetFilters}
                  className="text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
                >
                  Xóa bộ lọc [x]
                </button>
              </div>
            )}

            {/* Main Content Area */}
            {loading ? (
              <div className="border border-zinc-800/80 bg-zinc-900/20 p-16 text-center flex flex-col items-center justify-center gap-3 rounded-md">
                <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs text-zinc-500">Đang tải danh sách câu lệnh...</span>
              </div>
            ) : filteredCommands.length === 0 ? (
              <div className="border border-zinc-800 bg-zinc-900/20 p-12 text-center rounded-md">
                <p className="text-sm text-zinc-400 mb-4">
                  Không tìm thấy câu lệnh nào khớp với bộ lọc hiện tại.
                </p>
                {categories.length === 0 && (
                  <div className="max-w-md mx-auto p-4 border border-zinc-800 bg-zinc-900 text-left text-xs mb-4 rounded-md">
                    <p className="text-zinc-300 font-semibold mb-1">Dữ liệu rỗng</p>
                    <p className="text-zinc-500 leading-relaxed">
                      Nhấn nút <strong className="text-blue-500 font-medium">Re-seed Database</strong> ở góc trên bên phải màn hình để tự động chèn dữ liệu mẫu cho Git, PowerShell và CMD.
                    </p>
                  </div>
                )}
                <button
                  onClick={resetFilters}
                  className="px-3.5 py-1.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all rounded-md text-xs cursor-pointer active:scale-95"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : activeCommand ? (
              <div className="space-y-6">
                {/* Active Category Display Header */}
                {(() => {
                  const cat = categories.find(c => c._id === activeCommand.categoryId);
                  const isAntigravity = cat ? isAntigravityCategory(cat) : false;
                  const isCopied = copiedId === activeCommand._id;
                  return (
                    <section className="space-y-4">
                      {/* Section Title */}
                      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 px-1">
                        <span className={`text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 ${isAntigravity ? 'text-cyan-400' : 'text-blue-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAntigravity ? 'bg-cyan-400' : 'bg-blue-500'}`} />
                          <span>{cat?.name || 'Chi tiết lệnh'}</span>
                        </span>
                      </div>

                      {/* Main Detail Command Card */}
                      <article className={`bg-zinc-900/30 border transition-all duration-200 p-6 flex flex-col gap-4 rounded-md group relative animate-fade-in ${isAntigravity ? 'border-cyan-900/30 hover:border-cyan-800/50' : 'border-zinc-800/80 hover:border-zinc-800'}`}>
                        {/* Top bar: Tags and Platform tags */}
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            {activeCommand.tags.slice(0, 4).map(tag => (
                              <span key={tag} className={`text-xs font-medium font-mono ${isAntigravity ? 'text-cyan-500/80' : 'text-zinc-400'}`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            {activeCommand.platforms.map((plat) => (
                              <span
                                key={plat}
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase border ${plat === 'PowerShell'
                                  ? 'bg-blue-950/30 text-blue-400 border-blue-900/40'
                                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                  }`}
                              >
                                {plat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Header title */}
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-150">
                            {activeCommand.title}
                          </h3>
                          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                            {activeCommand.description}
                          </p>
                        </div>

                        {/* Main Interactive Command Codeblock */}
                        <div
                          onClick={() => handleCopy(activeCommand._id, activeCommand.command)}
                          className={`group/code relative cursor-pointer p-3.5 font-mono text-sm border rounded-md transition-all duration-200 overflow-x-auto ${isCopied
                            ? isAntigravity ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-blue-500/40 bg-blue-500/5'
                            : 'border-zinc-800 bg-zinc-900'
                            }`}
                        >
                          <div className="flex items-center justify-between gap-4 select-all">
                            <code className={`font-medium break-all font-mono ${isAntigravity ? 'text-cyan-400' : 'text-blue-400'}`}>
                              {activeCommand.command}
                            </code>
                            <div className="flex items-center gap-2 select-none shrink-0">
                              {isCopied ? (
                                <span className={`font-medium text-xs tracking-wider uppercase animate-pulse ${isAntigravity ? 'text-cyan-400' : 'text-blue-500'}`}>
                                  COPIED!
                                </span>
                              ) : (
                                <span className="text-zinc-550 group-hover/code:text-zinc-400 transition-colors text-xs uppercase font-medium">
                                  [click copy]
                                </span>
                              )}
                              <svg
                                className={`h-4 w-4 transition-transform duration-150 ${isCopied ? isAntigravity ? 'text-cyan-500 scale-105' : 'text-blue-500 scale-105' : 'text-zinc-500 group-hover/code:text-zinc-400'
                                  }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                {isCopied ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                )}
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Command parameter explanation list */}
                        {activeCommand.explanations && activeCommand.explanations.length > 0 && (
                          <div className="mt-1 bg-zinc-950/20 border border-zinc-900 px-4 py-3 text-sm space-y-2 rounded-md">
                            <div className="text-[11px] text-zinc-450 uppercase tracking-wider font-semibold border-b border-zinc-900 pb-1.5">
                              Giải thích tham số
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pt-0.5">
                              {activeCommand.explanations.map((exp, idx) => (
                                <div key={idx} className="flex gap-2 items-start leading-relaxed text-sm">
                                  <code className="text-zinc-300 font-medium shrink-0 font-mono bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded text-xs">{exp.param}</code>
                                  <span className="text-zinc-400">— {exp.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Examples section */}
                        {activeCommand.examples && activeCommand.examples.length > 0 && (
                          <div className="space-y-2 mt-1">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                              Ví dụ thực tế
                            </div>
                            {activeCommand.examples.map((ex, idx) => {
                              const exCopied = copiedId === `${activeCommand._id}-ex-${idx}`;
                              return (
                                <div
                                  key={idx}
                                  className="bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm rounded-md transition-all"
                                >
                                  <div className="space-y-1">
                                    <div className="font-medium text-zinc-200">{ex.title}</div>
                                    {ex.description && <div className="text-zinc-500 text-xs font-normal leading-relaxed">{ex.description}</div>}
                                  </div>
                                  <div
                                    onClick={() => handleCopy(`${activeCommand._id}-ex-${idx}`, ex.command)}
                                    className={`w-full md:w-auto font-mono bg-zinc-950 border px-3 py-1.5 text-zinc-300 rounded font-medium flex items-center justify-between gap-3 cursor-pointer shrink-0 active:scale-95 transition-all text-sm ${exCopied ? isAntigravity ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400' : 'border-blue-500/40 bg-blue-500/5 text-blue-400' : 'border-zinc-900 hover:border-zinc-800'
                                      }`}
                                  >
                                    <code className="font-mono text-zinc-300">{ex.command}</code>
                                    <span className="text-xs text-zinc-550 uppercase select-none font-medium">
                                      {exCopied ? 'Copied' : 'Copy'}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </article>
                    </section>
                  );
                })()}
              </div>
            ) : null}

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-center text-sm text-zinc-600 mt-16 font-mono leading-relaxed">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <div>
            &copy; 2026 Dev-CheatSheet. Built for developers with Next.js, Mongoose and Tailwind CSS v4.
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-700">
            <span>SYSTEM STATE: RUNNING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}
