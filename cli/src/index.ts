#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import chalk from "chalk";

const program = new Command();

program
  .name("dev-vibe")
  .description("CLI tool to initialize IDE rules, agent skills, and workflows from Dev-Vibe")
  .version("1.0.0")
  .option("-t, --tech <techs>", "Comma-separated list of technologies (e.g., nextjs,typescript)")
  .option("-s, --skills <skills>", "Comma-separated list of skills (e.g., clean-code,database-design)")
  .option("-i, --ide <ide>", "Target IDE rules (cursor, windsurf, vscode, antigravity)")
  .action(async (options: { tech?: string; skills?: string; ide?: string }) => {
    try {
      await initCommand({
        tech: options.tech ? options.tech.split(",").map((s: string) => s.trim().toLowerCase()) : undefined,
        skills: options.skills ? options.skills.split(",").map((s: string) => s.trim().toLowerCase()) : undefined,
        ide: options.ide ? options.ide.trim().toLowerCase() : undefined,
      });
    } catch (error: any) {
      console.error(chalk.red(`\n❌ Error: ${error.message || error}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
