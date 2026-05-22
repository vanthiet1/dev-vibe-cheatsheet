"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { ICategory, ICommand, ScopeGroup } from "@/types";
import {
  isGitCategory,
  isAntigravityCategory,
  isTerminalCategory,
} from "@/utils/categoryHelpers";
import { decodePayload } from "@/lib/security";

export function useCheatsheetData(options?: { securePayload?: string }) {
  const { securePayload } = options || {};

  const initialData = useMemo(() => {
    if (securePayload) {
      const decoded = decodePayload(securePayload) as {
        categories?: ICategory[];
        commands?: ICommand[];
      } | null;
      if (decoded && decoded.categories && decoded.commands) {
        return {
          categories: decoded.categories,
          commands: decoded.commands,
        };
      }
    }
    return { categories: [], commands: [] };
  }, [securePayload]);

  const [categories, setCategories] = useState<ICategory[]>(initialData.categories);
  const [commands, setCommands] = useState<ICommand[]>(initialData.commands);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(initialData.categories.length === 0);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ScopeGroup>("all");
  const [selectedCommandId, setSelectedCommandId] = useState<string | null>(
    null,
  );
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(() => {
    const initialExpanded: Record<string, boolean> = {};
    if (initialData.categories) {
      initialData.categories.forEach((cat) => {
        initialExpanded[cat._id] = true;
      });
    }
    return initialExpanded;
  });

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const cat = categories.find((c) => c._id === cmd.categoryId);
      if (!cat) return false;

      const isGit = isGitCategory(cat);
      const isAntigravity = isAntigravityCategory(cat);
      if (selectedGroup === "git" && !isGit) return false;
      if (selectedGroup === "terminal" && (isGit || isAntigravity))
        return false;
      if (selectedGroup === "antigravity" && !isAntigravity) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = cmd.title.toLowerCase().includes(q);
        const matchesDesc = cmd.description.toLowerCase().includes(q);
        const matchesCmd = cmd.command.toLowerCase().includes(q);
        const matchesTags = cmd.tags.some((t) => t.toLowerCase().includes(q));
        const matchesExplanations = cmd.explanations?.some(
          (exp) =>
            exp.param.toLowerCase().includes(q) ||
            exp.description.toLowerCase().includes(q),
        );
        const matchesExamples = cmd.examples?.some(
          (ex) =>
            ex.title.toLowerCase().includes(q) ||
            ex.command.toLowerCase().includes(q) ||
            ex.description?.toLowerCase().includes(q),
        );

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesCmd &&
          !matchesTags &&
          !matchesExplanations &&
          !matchesExamples
        ) {
          return false;
        }
      }

      return true;
    });
  }, [commands, categories, selectedGroup, searchQuery]);

  const commandsByCategory = useMemo(() => {
    const map: Record<string, ICommand[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!map[cmd.categoryId]) {
        map[cmd.categoryId] = [];
      }
      map[cmd.categoryId].push(cmd);
    });
    return map;
  }, [filteredCommands]);

  const activeCommand = useMemo(() => {
    if (selectedCommandId) {
      const found = filteredCommands.find((c) => c._id === selectedCommandId);
      if (found) return found;
    }
    return filteredCommands[0] || null;
  }, [filteredCommands, selectedCommandId]);

  const gitCategories = useMemo(
    () => categories.filter(isGitCategory),
    [categories],
  );

  const terminalCategories = useMemo(
    () => categories.filter(isTerminalCategory),
    [categories],
  );

  const antigravityCategories = useMemo(
    () => categories.filter(isAntigravityCategory),
    [categories],
  );

  const fetchInitialData = useCallback(async () => {
    if (categories.length > 0 && commands.length > 0) {
      setLoading(false);
      return;
    }
    try {
      const [catsRes, cmdsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/commands"),
      ]);
      const catsData = await catsRes.json();
      const cmdsData = await cmdsRes.json();

      if (catsData.success) {
        const cats = catsData.data || [];
        setCategories(cats);

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
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  }, [categories.length, commands.length]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchInitialData();
    });
  }, [fetchInitialData]);

  useEffect(() => {
    if (activeCommand) {
      Promise.resolve().then(() => {
        setExpandedCategories((prev) => {
          if (!prev[activeCommand.categoryId]) {
            return { ...prev, [activeCommand.categoryId]: true };
          }
          return prev;
        });
      });
    }
  }, [activeCommand]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const expanded: Record<string, boolean> = {};
      categories.forEach((cat) => {
        const hasMatch = filteredCommands.some(
          (cmd) => cmd.categoryId === cat._id,
        );
        if (hasMatch) {
          expanded[cat._id] = true;
        }
      });
      Promise.resolve().then(() => {
        setExpandedCategories(expanded);
      });
    }
  }, [searchQuery, filteredCommands, categories]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setShowDetailOnMobile(false);
    },
    [],
  );

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const runSeeding = useCallback(async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch("/api/seed?apiKey=dev-vibe-super-secret-key-2026");
      const result = await res.json();
      if (result.success) {
        setSeedMessage("Khởi tạo dữ liệu mẫu thành công!");
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
  }, [fetchInitialData]);

  const selectCommand = useCallback((id: string | null) => {
    setSelectedCommandId(id);
    if (id) {
      setShowDetailOnMobile(true);
    } else {
      setShowDetailOnMobile(false);
    }
  }, []);

  const selectGroup = useCallback((group: ScopeGroup) => {
    setSelectedGroup(group);
    setShowDetailOnMobile(false);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedGroup("all");
    setSelectedCommandId(null);
    setShowDetailOnMobile(false);
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  const goBackToList = useCallback(() => {
    setShowDetailOnMobile(false);
  }, []);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedGroup !== "all";

  return {
    categories,
    commands,
    searchQuery,
    copiedId,
    loading,
    seeding,
    seedMessage,
    selectedGroup,
    selectedCommandId,
    expandedCategories,
    showDetailOnMobile,
    filteredCommands,
    commandsByCategory,
    activeCommand,
    gitCategories,
    terminalCategories,
    antigravityCategories,
    hasActiveFilters,
    setSearchQuery,
    setSelectedGroup: selectGroup,
    setSelectedCommandId: selectCommand,
    handleSearchChange,
    handleCopy,
    runSeeding,
    resetFilters,
    toggleCategory,
    goBackToList,
  };
}
