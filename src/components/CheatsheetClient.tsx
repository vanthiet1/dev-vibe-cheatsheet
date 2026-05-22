"use client";

import { useEffect } from "react";
import { useCheatsheetData } from "@/hooks/useCheatsheetData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ScopeSwitcher from "@/components/ScopeSwitcher";
import CategoryNav from "@/components/CategoryNav";
import ActiveFilters from "@/components/ActiveFilters";
import CommandDetail from "@/components/CommandDetail";
import { LoadingSpinner, EmptyState } from "@/components/LoadingState";
import { initDomDefender } from "@/utils/domDefender";

interface CheatsheetClientProps {
  securePayload: string;
}

export default function CheatsheetClient({ securePayload }: CheatsheetClientProps) {
  useEffect(() => {
    initDomDefender();
  }, []);

  const {
    categories,
    searchQuery,
    copiedId,
    loading,
    seeding,
    seedMessage,
    selectedGroup,
    expandedCategories,
    filteredCommands,
    commandsByCategory,
    activeCommand,
    gitCategories,
    terminalCategories,
    antigravityCategories,
    hasActiveFilters,
    showDetailOnMobile,
    setSearchQuery,
    setSelectedGroup,
    setSelectedCommandId,
    handleSearchChange,
    handleCopy,
    runSeeding,
    resetFilters,
    toggleCategory,
    goBackToList,
  } = useCheatsheetData({ securePayload });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-blue-500 selection:text-white">
      <Header seeding={seeding} onRunSeeding={runSeeding} />

      <main className="max-w-8xl mx-auto px-6 py-8">
        {seedMessage && (
          <div className="mb-6 p-4 border border-zinc-800 bg-zinc-900 text-zinc-200 text-xs flex items-center justify-between animate-fade-in rounded-md">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              <span>{seedMessage}</span>
            </div>
          </div>
        )}

        <div className={showDetailOnMobile ? "hidden lg:block" : "block"}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClear={() => setSearchQuery("")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside
            className={`lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 ${
              showDetailOnMobile ? "hidden lg:block" : "block"
            }`}
          >
            <ScopeSwitcher
              selectedGroup={selectedGroup}
              onGroupChange={setSelectedGroup}
            />

            <CategoryNav
              selectedGroup={selectedGroup}
              gitCategories={gitCategories}
              terminalCategories={terminalCategories}
              antigravityCategories={antigravityCategories}
              commandsByCategory={commandsByCategory}
              expandedCategories={expandedCategories}
              activeCommandId={activeCommand?._id}
              hasActiveFilters={hasActiveFilters}
              onToggleCategory={toggleCategory}
              onSelectCommand={setSelectedCommandId}
              onResetFilters={resetFilters}
            />
          </aside>

          <div
            className={`lg:col-span-3 space-y-6 ${
              !showDetailOnMobile ? "hidden lg:block" : "block"
            }`}
          >
            {hasActiveFilters && (
              <ActiveFilters
                selectedGroup={selectedGroup}
                searchQuery={searchQuery}
                onResetFilters={resetFilters}
              />
            )}

            {loading ? (
              <LoadingSpinner />
            ) : filteredCommands.length === 0 ? (
              <EmptyState
                onResetFilters={resetFilters}
              />
            ) : activeCommand ? (
              <div className="space-y-6">
                <CommandDetail
                  command={activeCommand}
                  category={categories.find(
                    (c) => c._id === activeCommand.categoryId,
                  )}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                  onBack={goBackToList}
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
