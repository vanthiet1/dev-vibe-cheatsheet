# PLAN: AI Rules Hub Configurator Expansion (.rules, skills & UI libraries)

This plan details the addition of multiple languages, frontend UI libraries, and advanced Antigravity IDE configuration options to the interactive AI Rules Hub.

## Goal
To extend the existing `/ai-config` page so that developers can choose from an array of languages (TypeScript, JavaScript, Python, Go, Rust, C#), database engines (PostgreSQL, MongoDB, SQLite, MySQL, Redis), UI frameworks/libraries (Tailwind CSS, Shadcn UI, Ant Design, Material UI), and export dedicated Antigravity configurations for **Skills**, **Workflows**, and **Rules** dynamically tailored to their choices.

## Selected Tech Stacks & Formats
- **Languages:** TypeScript, JavaScript, Python, Go, Rust, C#
- **Databases:** PostgreSQL, MongoDB, SQLite, MySQL, Redis
- **UI Libraries:** Tailwind CSS v4, Shadcn UI, Ant Design, Material UI
- **Antigravity Output Formats:**
  1. `.antigravityrules` / `.cursorrules` (Instruction files)
  2. `SKILL.md` (Modular agent skill definitions saved under dedicated folders, e.g., `.antigravity/skills/{skill-name}/SKILL.md` with optional scripts/ and examples/)
  3. `mcp_config.json` (MCP server integrations)

## Implementation Steps
1. **Modify Configurator UI (page.tsx):**
   - Incorporate checkboxes and radio selectors for the new languages, database systems, and UI libraries.
   - Design tab controls above the code preview box to switch between the three file outputs.
2. **Logic Expansion:**
   - Expand the dynamic text compilation mapping logic to output rich, structured specifications according to the chosen inputs.
3. **Validation & Checks:**
   - Run typecheck and compilation tests to guarantee zero runtime failures.
