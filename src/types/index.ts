export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
}

export interface IParameterExplanation {
  param: string;
  description: string;
}

export interface IExample {
  title: string;
  command: string;
  description?: string;
}

export interface ICommand {
  _id: string;
  categoryId: string;
  title: string;
  slug: string;
  command: string;
  description: string;
  explanations: IParameterExplanation[];
  examples: IExample[];
  platforms: ("CMD" | "PowerShell" | "GitBash")[];
  tags: string[];
  viewCount: number;
}

export type ScopeGroup = "all" | "git" | "terminal" | "antigravity";
