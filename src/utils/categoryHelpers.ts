import type { ICategory } from "@/types";

export const isAntigravityCategory = (cat: ICategory): boolean => {
  return cat.slug.startsWith("antigravity") || cat.slug.startsWith("ai-");
};

export const isGitCategory = (cat: ICategory): boolean => {
  return (
    (cat.slug.startsWith("git") ||
      cat.slug.startsWith("github") ||
      cat.slug === "vscode-git") &&
    !isAntigravityCategory(cat)
  );
};

export const isTerminalCategory = (cat: ICategory): boolean => {
  return !isGitCategory(cat) && !isAntigravityCategory(cat);
};

/**
 * Map category slugs to custom inline SVGs with consistent styling.
 */
export const getCategoryIcon = (slug: string, color?: string) => {
  const c = color || "currentColor";
  const cls = "h-4.5 w-4.5 shrink-0";

  const iconPaths: Record<string, string> = {
    "git-setup":
      "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    "git-config":
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    "github-auth":
      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    "git-remote":
      "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    "git-branch":
      "M18 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0z",
    "git-stash":
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    "git-conflict":
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    "git-undo-reset":
      "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6",
    "git-ignore":
      "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
    "git-logs":
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    "vscode-git":
      "M10 20l4-16m2 16l4-16M6 9h14M4 15h14",
    "git-errors":
      "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    "git-workflows":
      "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    "terminal-basics":
      "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    "antigravity-ide":
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    "antigravity-cli":
      "M13 10V3L4 14h7v7l9-11h-7z",
    "ai-agent-playbook":
      "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  };

  // git-config has a secondary circle path
  const secondaryPaths: Record<string, string> = {
    "git-config": "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    "git-branch": "M6 17V9m0 0a3 3 0 013-3h3m-3 3a3 3 0 003 3h3",
  };

  const d = iconPaths[slug] || "M7 20l4-16m2 16l4-16M6 9h14M4 15h14";
  const d2 = secondaryPaths[slug];

  return { className: cls, color: c, d, d2 };
};
