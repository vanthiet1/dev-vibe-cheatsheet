export function generateTerminalScript(command: string): string[] {
  const cleanCmd = command.trim();
  const lower = cleanCmd.toLowerCase();

  // 1. GIT VERSION & SETUP
  if (lower.startsWith("git --version")) {
    return [
      "$ git --version",
      "git version 2.45.2.windows.1",
      "✓ Git is installed and available in environment path."
    ];
  }

  if (lower.startsWith("git init")) {
    return [
      "$ git init",
      "Initialized empty Git repository in D:/projects/my-awesome-app/.git/",
      "✓ Created .git/ directory structure (hidden)",
      "✓ Configured default branch to 'main'"
    ];
  }

  if (lower.startsWith("git clone")) {
    const parts = cleanCmd.split(" ");
    const url = parts[parts.length - 1] || "https://github.com/facebook/react.git";
    const repoName = url.split("/").pop()?.replace(".git", "") || "react";
    return [
      `$ ${cleanCmd}`,
      `Cloning into '${repoName}'...`,
      "remote: Enumerating objects: 120530, done.",
      "remote: Counting objects: 100% (4502/4502), done.",
      "remote: Compressing objects: 100% (2109/2109), done.",
      "remote: Total 120530 (delta 3021), reused 3942 (delta 2390), pack-reused 116028",
      "Receiving objects: 100% (120530/120530), 84.50 MiB | 12.45 MiB/s, done.",
      "Resolving deltas: 100% (82341/82341), done.",
      `✓ Successfully cloned repository to ./${repoName}`
    ];
  }

  // 2. GIT STATUS & ADD
  if (lower === "git status") {
    return [
      "$ git status",
      "On branch main",
      "Your branch is up to date with 'origin/main'.",
      "",
      "Changes not staged for commit:",
      "  (use \"git add <file>...\" to update what will be committed)",
      "  (use \"git restore <file>...\" to discard changes in working directory)",
      "        modified:   src/app/page.tsx",
      "        modified:   src/components/Footer.tsx",
      "",
      "Untracked files:",
      "  (use \"git add <file>...\" to include in what will be committed)",
      "        src/utils/terminalScripts.ts",
      "",
      "no changes added to commit (use \"git add\" and/or \"git commit -a\")"
    ];
  }

  if (lower.startsWith("git status -s")) {
    return [
      "$ git status -s",
      " M src/app/page.tsx",
      " M src/components/Footer.tsx",
      "?? src/utils/terminalScripts.ts",
      "ℹ Key: M (Modified), ?? (Untracked)"
    ];
  }

  if (lower.startsWith("git add")) {
    const target = cleanCmd.substring(7).trim() || ".";
    return [
      `$ ${cleanCmd}`,
      `ℹ Staging changes for: ${target}`,
      "✓ Index updated successfully.",
      "✓ Use 'git status' to view staged changes."
    ];
  }

  // 3. GIT COMMIT
  if (lower.startsWith("git commit -am") || lower.startsWith("git commit -m")) {
    const match = cleanCmd.match(/-m\s+["'](.+?)["']/);
    const msg = match ? match[1] : "feat: update project layout";
    return [
      `$ ${cleanCmd}`,
      `[main 8a1e2f3] ${msg}`,
      " 3 files changed, 114 insertions(+), 18 deletions(-)",
      " create mode 100644 src/utils/terminalScripts.ts",
      "✓ Commit recorded to local git database successfully."
    ];
  }

  // 4. GIT PULL & PUSH
  if (lower.startsWith("git push")) {
    const isUpstream = lower.includes("-u");
    return [
      `$ ${cleanCmd}`,
      "Enumerating objects: 12, done.",
      "Counting objects: 100% (12/12), done.",
      "Delta compression using up to 16 threads",
      "Compressing objects: 100% (8/8), done.",
      "Writing objects: 100% (8/8), 1.25 KiB | 625.00 KiB/s, done.",
      "Total 8 (delta 5), reused 0 (delta 0), pack-reused 0",
      "remote: Resolving deltas: 100% (5/5), completed with 5 local objects.",
      "To https://github.com/vanthiet1/dev-vibe-cheatsheet.git",
      isUpstream 
        ? " * [new branch]      feature-auth -> feature-auth"
        : "   a5c32b1..8a1e2f3  main -> main",
      "✓ Push completed. Remote updated successfully."
    ];
  }

  if (lower.startsWith("git pull")) {
    return [
      `$ ${cleanCmd}`,
      "remote: Enumerating objects: 8, done.",
      "remote: Counting objects: 100% (8/8), done.",
      "remote: Compressing objects: 100% (4/4), done.",
      "remote: Total 6 (delta 4), reused 0 (delta 0), pack-reused 0",
      "Unpacking objects: 100% (6/6), 1.05 KiB | 525.00 KiB/s, done.",
      "From https://github.com/vanthiet1/dev-vibe-cheatsheet",
      "   8a1e2f3..d4f9b2c  main       -> origin/main",
      "Updating 8a1e2f3..d4f9b2c",
      "Fast-forward",
      " src/app/page.tsx          | 24 ++++++++++++++----------",
      " src/components/Footer.tsx |  4 +--",
      " 2 files changed, 14 insertions(+), 12 deletions(-)",
      "✓ Local repository synchronized with remote."
    ];
  }

  // 5. GIT CONFIG
  if (lower.startsWith("git config --global user.name")) {
    const val = cleanCmd.split('"').slice(-2)[0] || "Nguyen Van Thiet";
    return [
      `$ ${cleanCmd}`,
      `✓ global setting: user.name is now configured to "${val}"`
    ];
  }

  if (lower.startsWith("git config --global user.email")) {
    const val = cleanCmd.split('"').slice(-2)[0] || cleanCmd.split(" ").pop() || "vanthiet1@gmail.com";
    return [
      `$ ${cleanCmd}`,
      `✓ global setting: user.email is now configured to "${val}"`
    ];
  }

  if (lower.startsWith("git config --global http.proxy")) {
    const val = cleanCmd.split(" ").pop() || "http://127.0.0.1:1080";
    return [
      `$ ${cleanCmd}`,
      `✓ HTTP proxy route set to: ${val}`,
      "ℹ Git traffic will tunnel through local proxy server."
    ];
  }

  if (lower.includes("git config --list")) {
    return [
      `$ ${cleanCmd}`,
      "file:C:/Program Data/Git/config   diff.astextplain.textconv=astextplain",
      "file:C:/Users/USER/.gitconfig     user.name=Nguyen Van Thiet",
      "file:C:/Users/USER/.gitconfig     user.email=vanthiet1@gmail.com",
      "file:C:/Users/USER/.gitconfig     credential.helper=manager",
      "file:.git/config                  core.repositoryformatversion=0",
      "file:.git/config                  core.filemode=true",
      "file:.git/config                  remote.origin.url=https://github.com/vanthiet1/dev-vibe-cheatsheet.git",
      "✓ Finished listing Git configuration values."
    ];
  }

  if (lower.startsWith("git config --global --unset")) {
    const key = cleanCmd.split(" ").pop() || "http.proxy";
    return [
      `$ ${cleanCmd}`,
      `✓ Removed configuration key: "${key}"`,
      "ℹ Setting fell back to default value."
    ];
  }

  // 6. GITHUB AUTHENTICATION
  if (lower.startsWith("gh auth login")) {
    return [
      `$ ${cleanCmd}`,
      "ℹ Interactive GitHub authentication procedure started.",
      "? What is your preferred protocol for Git operations? HTTPS",
      "? Authenticate Git with your GitHub credentials? Yes",
      "? How would you like to authenticate GitHub CLI? Login with a web browser",
      "! First copy your one-time code: B421-99D3",
      "Press Enter to open github.com in your browser...",
      "✓ Authentication complete. Logged in as vanthiet1!"
    ];
  }

  if (lower.startsWith("git config --global credential.helper")) {
    return [
      `$ ${cleanCmd}`,
      "✓ Credential helper registered as 'manager'.",
      "ℹ System Credential Vault will securely hold your account tokens."
    ];
  }

  if (lower.startsWith("cmdkey")) {
    return [
      "C:\\> " + cleanCmd,
      "CMDKEY: Attempting to delete generic credentials...",
      "✓ Successful: Removed credential 'LegacyGeneric:target=git:https://github.com'",
      "ℹ GitHub security tokens purged from Windows Credentials Manager."
    ];
  }

  if (lower.startsWith("ssh -t")) {
    return [
      `$ ${cleanCmd}`,
      "PTY allocation request failed on channel 0",
      "Hi vanthiet1! You've successfully authenticated, but GitHub does not provide shell access.",
      "✓ Connection to github.com on port 22 verified successfully."
    ];
  }

  if (lower.includes("credential-manager reject") || lower.includes("credential reject")) {
    return [
      `$ ${cleanCmd}`,
      "Purging host credentials for: https://github.com",
      "✓ PURGED. Cleaned credentials cache."
    ];
  }

  // 7. GIT REMOTE
  if (lower === "git remote -v") {
    return [
      "$ git remote -v",
      "origin  https://github.com/vanthiet1/dev-vibe-cheatsheet.git (fetch)",
      "origin  https://github.com/vanthiet1/dev-vibe-cheatsheet.git (push)"
    ];
  }

  if (lower.startsWith("git remote add")) {
    const parts = cleanCmd.split(" ");
    const name = parts[3] || "origin";
    const url = parts[4] || "https://github.com/user/repo.git";
    return [
      `$ ${cleanCmd}`,
      `✓ Added remote registry: '${name}'`,
      `✓ Linked target URL: ${url}`
    ];
  }

  if (lower.startsWith("git remote set-url")) {
    const parts = cleanCmd.split(" ");
    const name = parts[3] || "origin";
    const url = parts[4] || "https://github.com/user/new-repo.git";
    return [
      `$ ${cleanCmd}`,
      `✓ Updated remote server: '${name}'`,
      `✓ Routed all future pushes/pulls to: ${url}`
    ];
  }

  if (lower.startsWith("git remote remove")) {
    const name = cleanCmd.split(" ").pop() || "origin";
    return [
      `$ ${cleanCmd}`,
      `✓ Removed remote mapping: '${name}'`,
      "ℹ Local commits will no longer track remote updates."
    ];
  }

  // 8. GIT BRANCH & FLOWS
  if (lower.startsWith("git branch") && !lower.includes("-")) {
    const name = cleanCmd.split(" ").pop();
    if (name === "git branch") {
      return [
        "$ git branch",
        "  develop",
        "* main",
        "  feature-login",
        "ℹ Star (*) indicates current active branch."
      ];
    }
    return [
      `$ ${cleanCmd}`,
      `✓ Local branch '${name}' spawned successfully.`
    ];
  }

  if (lower.startsWith("git checkout -b")) {
    const name = cleanCmd.split(" ").pop() || "feature-payment";
    return [
      `$ ${cleanCmd}`,
      `Switched to a new branch '${name}'`,
      "✓ HEAD pointer reset to reference target branch."
    ];
  }

  if (lower.startsWith("git checkout") || lower.startsWith("git switch")) {
    const name = cleanCmd.split(" ").pop() || "develop";
    return [
      `$ ${cleanCmd}`,
      `Switched to branch '${name}'`,
      "Your branch is up to date with 'origin/" + name + "'."
    ];
  }

  if (lower.startsWith("git merge")) {
    const name = cleanCmd.split(" ").pop() || "feature-login";
    return [
      `$ ${cleanCmd}`,
      "Updating a5c32b1..8a1e2f3",
      "Fast-forward",
      " src/app/page.tsx | 15 ++++++++++-----",
      " 1 file changed, 10 insertions(+), 5 deletions(-)",
      `✓ Successfully merged '${name}' into current branch.`
    ];
  }

  if (lower.startsWith("git rebase")) {
    const name = cleanCmd.split(" ").pop() || "develop";
    return [
      `$ ${cleanCmd}`,
      "First, rewinding head to replay your work on top of it...",
      "Applying: feat(auth): add google sign-in hook",
      "Applying: docs: update readme with setup guides",
      `✓ Successfully rebased and updated refs/heads/main onto '${name}'.`
    ];
  }

  if (lower.startsWith("git branch -m")) {
    const name = cleanCmd.split(" ").pop() || "main";
    return [
      `$ ${cleanCmd}`,
      `✓ Current branch renamed to: '${name}'`
    ];
  }

  if (lower.startsWith("git branch -d") || lower.startsWith("git branch -D")) {
    const name = cleanCmd.split(" ").pop() || "feature-done";
    return [
      `$ ${cleanCmd}`,
      `Deleted branch ${name} (was 8a1e2f3).`
    ];
  }

  if (lower.startsWith("git branch -a")) {
    return [
      "$ git branch -a",
      "  develop",
      "* main",
      "  feature-login",
      "  remotes/origin/HEAD -> origin/main",
      "  remotes/origin/develop",
      "  remotes/origin/main",
      "  remotes/origin/feature-login"
    ];
  }

  if (lower.startsWith("git fetch")) {
    return [
      `$ ${cleanCmd}`,
      "Fetching origin...",
      "remote: Enumerating objects: 15, done.",
      "remote: Counting objects: 100% (15/15), done.",
      "From https://github.com/vanthiet1/dev-vibe-cheatsheet",
      "   7d82fc1..b4e3109  main       -> origin/main",
      " - [deleted]         (none)     -> origin/feature-temp",
      "✓ Fetched updates from 1 remote server successfully."
    ];
  }

  if (lower.startsWith("git tag")) {
    const name = cleanCmd.split(" ").pop();
    if (name === "git tag") {
      return [
        "$ git tag",
        "v1.0.0",
        "v1.1.0-beta",
        "v1.2.0"
      ];
    }
    return [
      `$ ${cleanCmd}`,
      `✓ Created tag version: '${name}'`
    ];
  }

  // 9. GIT STASH
  if (lower === "git stash") {
    return [
      "$ git stash",
      "Saved working directory and index state WIP on main: 8a1e2f3 feat: update UI",
      "✓ Head is now at 8a1e2f3",
      "ℹ Run 'git stash list' to see all stashed states."
    ];
  }

  if (lower.startsWith("git stash save")) {
    const match = cleanCmd.match(/["'](.+?)["']/);
    const msg = match ? match[1] : "WIP on branch main";
    return [
      `$ ${cleanCmd}`,
      `Saved working directory state: "${msg}"`,
      "✓ Head is now at 8a1e2f3"
    ];
  }

  if (lower === "git stash list") {
    return [
      "$ git stash list",
      "stash@{0}: WIP on main: 8a1e2f3 feat: update UI",
      "stash@{1}: On develop: d4f9b2c refactor: clean code",
      "ℹ Syntax: use stash@{index} with apply or pop."
    ];
  }

  if (lower === "git stash pop") {
    return [
      "$ git stash pop",
      "On branch main",
      "Changes to be committed:",
      "        modified:   src/app/page.tsx",
      "Dropped refs/stash@{0} (80ad7d1891b2c45e0fa0c128d9ac567812ea012c)",
      "✓ Restored latest stash state into current workspace."
    ];
  }

  if (lower.startsWith("git stash apply")) {
    const idx = cleanCmd.split(" ").pop() || "stash@{0}";
    return [
      `$ ${cleanCmd}`,
      "On branch main",
      "Changes not staged for commit:",
      "        modified:   src/app/page.tsx",
      `✓ Stash state ${idx} applied successfully (kept record inside stack).`
    ];
  }

  if (lower.startsWith("git stash drop")) {
    const idx = cleanCmd.split(" ").pop() || "stash@{0}";
    return [
      `$ ${cleanCmd}`,
      `Dropped ${idx} (80ad7d1891b2c45e0fa0c128d9ac567812ea012c)`
    ];
  }

  if (lower === "git stash clear") {
    return [
      "$ git stash clear",
      "✓ Purged all stash history records.",
      "ℹ Stack count: 0."
    ];
  }

  // 10. GIT CONFLICTS & UNDO
  if (lower === "git mergetool") {
    return [
      "$ git mergetool",
      "Merging:",
      "src/app/page.tsx",
      "",
      "Normal merge conflict resolution in progress...",
      "✓ Resolved conflict block using default merge tool.",
      "✓ File src/app/page.tsx updated."
    ];
  }

  if (lower === "git merge --abort") {
    return [
      "$ git merge --abort",
      "✓ Merge process aborted.",
      "✓ HEAD pointer rolled back to pre-merge commit: a5c32b1."
    ];
  }

  // 11. ANTIGRAVITY INSTALL SETUP
  if (lower.includes("install.sh")) {
    return [
      `$ ${cleanCmd}`,
      "Downloading Antigravity CLI Installer...",
      "Connecting to antigravity.google...",
      "✓ Downloading installation bundle [1.5MB]",
      "Installing Antigravity CLI to /usr/local/bin/antigravity...",
      "✓ Installation succeeded!",
      "",
      "--------------------------------------------------",
      "  Google Antigravity CLI has been installed successfully!",
      "  Run 'antigravity --help' to get started.",
      "--------------------------------------------------"
    ];
  }

  if (lower.includes("install.ps1")) {
    return [
      "PS C:\\Users\\USER> " + cleanCmd,
      "Downloading Antigravity CLI...",
      "Connecting to https://antigravity.google...",
      "✓ Extracting package to C:\\Users\\USER\\.gemini\\antigravity-cli",
      "Adding executable to User PATH Environment...",
      "✓ Antigravity environment configured successfully!",
      "",
      "To verify installation, please run: antigravity --version"
    ];
  }

  if (lower.includes("install.cmd")) {
    return [
      "C:\\Users\\USER> " + cleanCmd,
      "Downloading install.cmd...",
      "Executing installation routine...",
      "✓ Setting system paths",
      "✓ Initializing Sandbox parameters",
      "✓ Deleting temporary script install.cmd",
      "✓ Antigravity CMD environment loaded."
    ];
  }

  // 12. ANTIGRAVITY GENERAL SLASH COMMANDS & UTILS
  if (lower.startsWith("/resume")) {
    return [
      `$ ${cleanCmd}`,
      "Fetching available conversational logs...",
      "+---------+-----------------------------+--------------+",
      "| ID      | Topic Title                 | Last Active  |",
      "+---------+-----------------------------+--------------+",
      "| 1600380 | Hydration Mismatch Resolve  | 2 mins ago   |",
      "| f2855cb | Seed Database Workflows     | 1 hour ago   |",
      "+---------+-----------------------------+--------------+",
      "✓ Loaded chat sessions list. Pick a session ID to resume."
    ];
  }

  if (lower.startsWith("/goal")) {
    const desc = cleanCmd.substring(5).trim();
    if (desc) {
      return [
        `$ ${cleanCmd}`,
        `✓ Core target set: "${desc}"`,
        "ℹ Agents will prioritize guidelines related to this goal."
      ];
    }
    return [
      "$ /goal",
      "Core Goal: Complete the modular configuration of the Antigravity system.",
      "✓ Session tracking is highly focused."
    ];
  }

  if (lower.startsWith("@")) {
    const path = cleanCmd.substring(1);
    return [
      `$ ${cleanCmd}`,
      `Reading context file: ${path}...`,
      "✓ File length: 145 lines, 4.2KB",
      "✓ Integrated file content into active prompt context."
    ];
  }

  if (lower.startsWith("/rewind") || lower.startsWith("/undo")) {
    return [
      `$ ${cleanCmd}`,
      "Rolling back active chat history...",
      "✓ Discarded last model response.",
      "✓ Restored conversation state to user checkpoint.",
      "ℹ Ready to accept your next instruction."
    ];
  }

  if (lower.startsWith("/rename")) {
    return [
      `$ ${cleanCmd}`,
      "✓ Renamed current session: 'Refactoring Footer & Nav UI'"
    ];
  }

  if (lower.startsWith("/permissions")) {
    return [
      `$ ${cleanCmd}`,
      "Antigravity Agent Autonomy Settings:",
      "  Engine Control: STRICT",
      "  Command Execution: REQUEST-REVIEW (Confirm before run)",
      "  Sandbox: ENABLED",
      "✓ Settings updated successfully."
    ];
  }

  if (lower.startsWith("/model")) {
    return [
      `$ ${cleanCmd}`,
      "Active Model: Gemini 2.5 Pro (Pro-tier reasoning)",
      "Fallback Model: Gemini 2.5 Flash",
      "✓ Model selection validated."
    ];
  }

  if (lower.startsWith("/keybindings")) {
    return [
      `$ ${cleanCmd}`,
      "Loaded hotkeys configuration:",
      "  Ctrl+Space  -> Trigger Agent Autocomplete",
      "  Ctrl+Enter  -> Confirm & Proceed command execution",
      "  Escape      -> Interrupt active subagent",
      "✓ Hotkeys mapped."
    ];
  }

  if (lower.startsWith("/statusline")) {
    return [
      `$ ${cleanCmd}`,
      "Statusbar layout configured:",
      "  [Left: Scope] [Center: Task Status] [Right: Token Usage]",
      "✓ Statusline customized."
    ];
  }

  if (lower.startsWith("/tasks")) {
    return [
      `$ ${cleanCmd}`,
      "Active background processes:",
      "  ID: tsk_948a  | Command: npm run dev  | Status: RUNNING",
      "✓ Task monitor loaded."
    ];
  }

  if (lower.startsWith("/skills")) {
    return [
      `$ ${cleanCmd}`,
      "Scanning ~/.gemini/antigravity/skills/...",
      "✓ Found 4 Global skills:",
      "  - intelligent-routing (v1.2.0)",
      "  - clean-code (v1.0.5)",
      "  - frontend-design (v2.0.1)",
      "  - database-architect (v1.4.0)"
    ];
  }

  if (lower.startsWith("/mcp")) {
    return [
      `$ ${cleanCmd}`,
      "Configured Model Context Protocol Servers:",
      "  - postgres-db (ONLINE, 12 tools)",
      "  - file-system (ONLINE, 5 tools)",
      "✓ MCP server statuses healthy."
    ];
  }

  if (lower.startsWith("/open")) {
    const path = cleanCmd.split(" ").pop() || "package.json";
    return [
      `$ ${cleanCmd}`,
      `Launching system editor for: ${path}...`,
      "✓ File opened in default external editor."
    ];
  }

  if (lower.startsWith("/usage")) {
    return [
      `$ ${cleanCmd}`,
      "Google Antigravity CLI Help Manual:",
      "  Usage: antigravity <command> [options]",
      "  Slash Commands available: /resume, /goal, /rewind, /permissions, /model",
      "✓ End of manual documentation page."
    ];
  }

  if (lower.startsWith("/logout")) {
    return [
      `$ ${cleanCmd}`,
      "Revoking Google Identity Tokens...",
      "✓ Session token destroyed.",
      "✓ Logged out successfully. Purged login cache."
    ];
  }

  // 13. TERMINAL SYSTEM BASICS

  // cd navigation
  if (lower.startsWith("cd ") || lower === "cd ..") {
    const target = cleanCmd.substring(3).trim() || "..";
    if (target === "..") {
      return [
        `$ ${cleanCmd}`,
        "D:\\dev> cd ..",
        "D:\\>"
      ];
    }
    return [
      `$ ${cleanCmd}`,
      `D:\\dev> `,
      `✓ Working directory changed to: ${target}`
    ];
  }

  // dir / ls -la
  if (lower === "dir" || lower.startsWith("ls")) {
    const isLs = lower.startsWith("ls");
    const prefix = isLs ? "$" : "C:\\dev\\my-project>";
    if (isLs && lower.includes("-la")) {
      return [
        `${prefix} ${cleanCmd}`,
        "total 48",
        "drwxr-xr-x  8 user staff   256 May 21 00:05 .",
        "drwxr-xr-x 12 user staff   384 May 20 23:59 ..",
        "drwxr-xr-x  9 user staff   288 May 21 00:05 .git",
        "-rw-r--r--  1 user staff   312 May 20 14:30 .env",
        "-rw-r--r--  1 user staff   892 May 20 14:30 .gitignore",
        "-rw-r--r--  1 user staff  1140 May 21 00:02 package.json",
        "drwxr-xr-x  5 user staff   160 May 21 00:05 src",
        "drwxr-xr-x  3 user staff    96 May 21 00:04 node_modules",
        "-rw-r--r--  1 user staff   231 May 20 14:30 README.md"
      ];
    }
    return [
      `C:\\dev\\my-project> dir`,
      " Volume in drive D is DATA",
      " Volume Serial Number is A1B2-C3D4",
      "",
      " Directory of D:\\dev\\my-project",
      "",
      "21/05/2026  00:05    <DIR>          .",
      "21/05/2026  00:05    <DIR>          ..",
      "21/05/2026  00:05    <DIR>          src",
      "21/05/2026  00:04    <DIR>          node_modules",
      "20/05/2026  14:30               312 .env",
      "20/05/2026  14:30             1,140 package.json",
      "20/05/2026  14:30               231 README.md",
      "               3 File(s)          1,683 bytes",
      "               4 Dir(s)   85,234,688,000 bytes free"
    ];
  }

  // mkdir
  if (lower.startsWith("mkdir ")) {
    const name = cleanCmd.substring(6).trim() || "src";
    return [
      `$ ${cleanCmd}`,
      `✓ Created directory: ${name}/`
    ];
  }

  // cls / clear
  if (lower === "cls" || lower === "clear") {
    return [
      `$ ${cleanCmd}`,
      "[Screen cleared]",
      "C:\\dev\\my-project>"
    ];
  }

  // ipconfig /flushdns — must come before plain ipconfig
  if (lower.includes("flushdns")) {
    return [
      `C:\\> ${cleanCmd}`,
      "Windows IP Configuration",
      "",
      "Successfully flushed the DNS Resolver Cache.",
      "✓ DNS cache cleared. Stale entries purged.",
      "ℹ New DNS lookups will retrieve fresh IP addresses from server."
    ];
  }

  // ipconfig /all — must come before plain ipconfig
  if (lower === "ipconfig /all") {
    return [
      "C:\\> ipconfig /all",
      "Windows IP Configuration",
      "   Host Name . . . . . . . . . . . : DESKTOP-VT1",
      "   Primary Dns Suffix  . . . . . . :",
      "   Node Type . . . . . . . . . . . : Hybrid",
      "",
      "Ethernet adapter vEthernet (WSL):",
      "   IPv4 Address. . . . . . . . . . : 172.26.224.1",
      "   Subnet Mask . . . . . . . . . . : 255.255.240.0",
      "",
      "Wireless LAN adapter Wi-Fi:",
      "   Connection-specific DNS Suffix  : local",
      "   IPv4 Address. . . . . . . . . . : 192.168.1.105",
      "   Subnet Mask . . . . . . . . . . : 255.255.255.0",
      "   Default Gateway . . . . . . . . : 192.168.1.1"
    ];
  }

  // ipconfig (plain)
  if (lower === "ipconfig") {
    return [
      "C:\\> ipconfig",
      "Windows IP Configuration",
      "",
      "Ethernet adapter vEthernet (WSL):",
      "   Connection-specific DNS Suffix  :",
      "   Link-local IPv6 Address . . . . : fe80::1%4",
      "   IPv4 Address. . . . . . . . . . : 172.26.224.1",
      "   Subnet Mask . . . . . . . . . . : 255.255.240.0",
      "   Default Gateway . . . . . . . . :",
      "",
      "Wireless LAN adapter Wi-Fi:",
      "   IPv4 Address. . . . . . . . . . : 192.168.1.105",
      "   Subnet Mask . . . . . . . . . . : 255.255.255.0",
      "   Default Gateway . . . . . . . . : 192.168.1.1"
    ];
  }

  // ping -t (continuous) — before plain ping
  if (lower.includes("ping") && lower.includes("-t")) {
    return [
      `C:\\> ${cleanCmd}`,
      "Pinging google.com [142.250.4.100] with 32 bytes of data:",
      "Reply from 142.250.4.100: bytes=32 time=12ms TTL=118",
      "Reply from 142.250.4.100: bytes=32 time=11ms TTL=118",
      "Reply from 142.250.4.100: bytes=32 time=13ms TTL=118",
      "Reply from 142.250.4.100: bytes=32 time=11ms TTL=118",
      "  (Ctrl+C to stop continuous ping...)"
    ];
  }

  // ping (plain)
  if (lower.startsWith("ping ")) {
    const host = cleanCmd.split(" ")[1] || "google.com";
    return [
      `C:\\> ${cleanCmd}`,
      `Pinging ${host} [142.250.4.100] with 32 bytes of data:`,
      `Reply from 142.250.4.100: bytes=32 time=12ms TTL=118`,
      `Reply from 142.250.4.100: bytes=32 time=11ms TTL=118`,
      `Reply from 142.250.4.100: bytes=32 time=13ms TTL=118`,
      `Reply from 142.250.4.100: bytes=32 time=12ms TTL=118`,
      "",
      `Ping statistics for 142.250.4.100:`,
      "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)",
      "Approximate round trip times in milli-seconds:",
      "    Minimum = 11ms, Maximum = 13ms, Average = 12ms"
    ];
  }

  // systeminfo
  if (lower === "systeminfo") {
    return [
      "C:\\> systeminfo",
      "",
      "Host Name:                 DESKTOP-VT1",
      "OS Name:                   Microsoft Windows 11 Pro",
      "OS Version:                10.0.26100 N/A Build 26100",
      "OS Manufacturer:           Microsoft Corporation",
      "System Type:               x64-based PC",
      "Processor(s):              Intel(R) Core(TM) i7-12700H, 2300 Mhz, 14 Core(s)",
      "Total Physical Memory:     32,768 MB",
      "Available Physical Memory: 18,432 MB",
      "Virtual Memory: Max Size:  46,592 MB",
      "Windows Directory:         C:\\WINDOWS",
      "System Directory:          C:\\WINDOWS\\system32",
      "Time Zone:                 (UTC+07:00) Bangkok, Hanoi, Jakarta",
      "Hotfix(s):                 8 Hotfix(s) Installed."
    ];
  }

  // tasklist
  if (lower === "tasklist") {
    return [
      "C:\\> tasklist",
      "",
      "Image Name                     PID Session Name        Mem Usage",
      "========================= ======== ================ ===========",
      "System Idle Process              0 Services               20 K",
      "node.exe                     14892 Console            94,512 K",
      "chrome.exe                    9832 Console           312,480 K",
      "Code.exe                      7144 Console           245,120 K",
      "WindowsTerminal.exe          11204 Console            52,344 K",
      "explorer.exe                  4412 Console            84,600 K"
    ];
  }

  // taskkill /f /pid
  if (lower.startsWith("taskkill") && lower.includes("/pid")) {
    const pid = cleanCmd.match(/\/pid\s+(\d+)/i)?.[1] || "1234";
    return [
      `C:\\> ${cleanCmd}`,
      `SUCCESS: The process with PID ${pid} has been terminated.`
    ];
  }

  // taskkill /f /im
  if (lower.startsWith("taskkill")) {
    const match = cleanCmd.match(/\/im\s+(\S+)/i);
    const proc = match ? match[1] : "chrome.exe";
    return [
      `C:\\> ${cleanCmd}`,
      `SUCCESS: The process "${proc}" with PID 9832 has been terminated.`
    ];
  }

  // netstat -ano | findstr — pipe variant — before plain netstat
  if (lower.startsWith("netstat") && lower.includes("findstr")) {
    const portMatch = lower.match(/:(\d+)/);
    const port = portMatch ? portMatch[1] : "3000";
    return [
      `C:\\> ${cleanCmd}`,
      `  TCP    0.0.0.0:${port}           0.0.0.0:0              LISTENING       14892`,
      `  TCP    127.0.0.1:${port}         127.0.0.1:52341        ESTABLISHED     14892`,
      `ℹ PID 14892 is occupying port ${port}. Use 'taskkill /f /pid 14892' to free it.`
    ];
  }

  // netstat / Get-NetTCPConnection
  if (lower.startsWith("netstat") || lower.startsWith("get-nettcpconnection")) {
    return [
      `C:\\> ${cleanCmd}`,
      "",
      "  Proto  Local Address          Foreign Address        State           PID",
      "  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING        4",
      "  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING        4",
      "  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       14892",
      "  TCP    0.0.0.0:5432           0.0.0.0:0              LISTENING        9012",
      "  TCP    127.0.0.1:3000         127.0.0.1:52341        ESTABLISHED     14892",
      "  UDP    0.0.0.0:5353           *:*                                      2312"
    ];
  }

  // type / cat / Get-Content
  if (lower.startsWith("type ") || lower.startsWith("cat ") || lower.startsWith("get-content ")) {
    const parts = cleanCmd.split(" ");
    const file = parts[parts.length - 1] || "config.json";
    const isJson = file.endsWith(".json");
    const isEnv = file.endsWith(".env");
    if (isEnv) {
      return [
        `$ ${cleanCmd}`,
        "NODE_ENV=development",
        "PORT=3000",
        "MONGODB_URI=mongodb://localhost:27017/devdb",
        "JWT_SECRET=supersecretkey_change_in_production",
        "NEXT_PUBLIC_API_URL=http://localhost:3000/api"
      ];
    }
    if (isJson) {
      return [
        `$ ${cleanCmd}`,
        "{",
        '  "name": "dev-vibe-cheatsheet",',
        '  "version": "1.0.0",',
        '  "scripts": {',
        '    "dev": "next dev",',
        '    "build": "next build",',
        '    "start": "next start"',
        "  },",
        '  "dependencies": {',
        '    "next": "^16.2.6",',
        '    "react": "^19.0.0"',
        "  }",
        "}"
      ];
    }
    return [
      `$ ${cleanCmd}`,
      `--- Content of ${file} ---`,
      "# Project Configuration File",
      "# Last modified: 2026-05-21",
      "✓ File read successfully."
    ];
  }

  // pwd
  if (lower === "pwd") {
    return [
      "$ pwd",
      "D:/dev/my-project"
    ];
  }

  // del / rm (file deletion)
  if (lower.startsWith("del ") || (lower.startsWith("rm ") && !lower.includes("-rf"))) {
    const file = cleanCmd.split(" ").pop() || "app.log";
    return [
      `$ ${cleanCmd}`,
      `✓ Deleted: ${file}`,
      "ℹ File removed from disk. Action cannot be undone."
    ];
  }

  // copy / cp
  if (lower.startsWith("copy ") || lower.startsWith("cp ")) {
    const parts = cleanCmd.split(" ");
    const src = parts[1] || "config.json";
    const dst = parts[2] || "backup.json";
    return [
      `$ ${cleanCmd}`,
      `        1 file(s) copied.`,
      `✓ Copied '${src}' → '${dst}'`
    ];
  }

  // move / mv / ren
  if (lower.startsWith("move ") || lower.startsWith("mv ") || lower.startsWith("ren ")) {
    const parts = cleanCmd.split(" ");
    const src = parts[1] || "old.txt";
    const dst = parts[2] || "new.txt";
    return [
      `$ ${cleanCmd}`,
      `        1 file(s) moved.`,
      `✓ Renamed/Moved '${src}' → '${dst}'`
    ];
  }

  // rmdir /s /q OR rm -rf
  if (lower.startsWith("rmdir") || (lower.startsWith("rm") && lower.includes("-rf"))) {
    const target = cleanCmd.split(" ").pop() || "temp_build";
    return [
      `$ ${cleanCmd}`,
      `ℹ Recursively removing: ${target}/`,
      `  Deleting files...`,
      `✓ Directory '${target}' and all contents removed.`,
      "⚠ This action is permanent and cannot be undone."
    ];
  }

  // code .
  if (lower === "code .") {
    return [
      "$ code .",
      "Launching Visual Studio Code...",
      "✓ Opened workspace: D:/dev/my-project",
      "ℹ Extensions: ESLint, Prettier, TypeScript active."
    ];
  }

  // explorer . / start .
  if (lower === "explorer ." || lower === "start .") {
    return [
      `C:\\dev\\my-project> ${cleanCmd}`,
      "✓ Opening File Explorer at current directory...",
      "ℹ Window: D:\\dev\\my-project"
    ];
  }

  // echo %PATH% / $env:PATH / echo $PATH
  if (lower.startsWith("echo %path%") || lower === "$env:path" || lower === "echo $path") {
    return [
      `$ ${cleanCmd}`,
      "C:\\Program Files\\Git\\cmd;",
      "C:\\Program Files\\nodejs;",
      "C:\\Users\\USER\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;",
      "C:\\WINDOWS\\system32;",
      "C:\\WINDOWS;",
      "C:\\Users\\USER\\.gemini\\antigravity-cli\\bin",
      "ℹ PATH contains 6 executable directories."
    ];
  }

  // set PATH / $env:PATH +=
  if (lower.startsWith("set path=") || lower.startsWith("$env:path +=")) {
    return [
      `$ ${cleanCmd}`,
      "✓ Directory appended to PATH for this session.",
      "ℹ Restart terminal to persist changes permanently."
    ];
  }

  // node -v && npm -v
  if (lower.includes("node") && lower.includes("-v")) {
    return [
      `$ ${cleanCmd}`,
      "v22.3.0",
      "10.8.1",
      "✓ Node.js and NPM are installed and accessible."
    ];
  }

  // npm install lodash (specific package) — before generic npm install
  if (lower.startsWith("npm install ") && !lower.includes("run")) {
    const pkg = cleanCmd.split(" ").pop() || "lodash";
    return [
      `$ ${cleanCmd}`,
      `npm warn deprecated ${pkg}@4.17.21: ...`,
      `added 1 package in 1.842s`,
      "",
      `1 package is looking for funding`,
      `  run \`npm fund\` for details`,
      `✓ Package '${pkg}' installed to node_modules.`
    ];
  }

  // npm install (no args)
  if (lower === "npm install") {
    return [
      "$ npm install",
      "npm warn deprecated inflight@1.0.6: This module is not supported.",
      "",
      "added 284 packages in 14s",
      "",
      "87 packages are looking for funding",
      "  run `npm fund` for details",
      "✓ All dependencies installed to node_modules/."
    ];
  }

  // npm run dev / npm run build / npm start
  if (lower === "npm run dev") {
    return [
      "$ npm run dev",
      "",
      "> dev-vibe-cheatsheet@1.0.0 dev",
      "> next dev",
      "",
      "  ▲ Next.js 16.2.6",
      "  - Local:        http://localhost:3000",
      "  - Network:      http://192.168.1.105:3000",
      "",
      " ✓ Starting...",
      " ✓ Ready in 1843ms"
    ];
  }

  if (lower === "npm run build") {
    return [
      "$ npm run build",
      "",
      "> dev-vibe-cheatsheet@1.0.0 build",
      "> next build",
      "",
      "  ▲ Next.js 16.2.6 (Turbopack)",
      "  Creating an optimized production build ...",
      "✓ Compiled successfully in 6.6s",
      "✓ Generating static pages (8/8)",
      "",
      "Route (app)",
      "┌ ○ /",
      "└ ƒ /api/commands",
      "",
      "Exit code: 0"
    ];
  }

  if (lower === "npm start") {
    return [
      "$ npm start",
      "",
      "> dev-vibe-cheatsheet@1.0.0 start",
      "> next start",
      "",
      "  ▲ Next.js 16.2.6",
      "  - Local:        http://localhost:3000",
      " ✓ Ready in 312ms"
    ];
  }

  if (lower.startsWith("npm run ")) {
    const script = cleanCmd.substring(8).trim();
    return [
      `$ ${cleanCmd}`,
      `> running script: "${script}"`,
      `✓ Script '${script}' completed successfully.`
    ];
  }

  // npx create-react-app
  if (lower.startsWith("npx create-react-app")) {
    const name = cleanCmd.split(" ").pop() || "my-app";
    return [
      `$ ${cleanCmd}`,
      "",
      `Creating a new React app in D:\\dev\\${name}.`,
      "",
      "Installing packages. This might take a couple of minutes.",
      "Installing react, react-dom, and react-scripts...",
      "",
      "added 1469 packages in 42s",
      "",
      "✓ Success! Created " + name + " at D:\\dev\\" + name,
      "",
      "Inside that directory, run:",
      "  cd " + name,
      "  npm start"
    ];
  }

  // wmic logicaldisk
  if (lower.startsWith("wmic")) {
    return [
      `C:\\> ${cleanCmd}`,
      "",
      "Caption  FreeSpace        Size",
      "C:       45,234,176,000   256,060,514,304",
      "D:       385,122,304,000  1,000,204,886,016",
      "",
      "ℹ C: drive: 45.2 GB free / 256 GB total",
      "ℹ D: drive: 385 GB free / 1 TB total"
    ];
  }

  // touch / New-Item / type nul >
  if (lower.startsWith("touch ") || lower.startsWith("new-item ") || lower.includes("type nul >")) {
    const file = lower.startsWith("touch ")
      ? cleanCmd.split(" ")[1]
      : lower.startsWith("new-item ")
        ? cleanCmd.split(" ")[1]
        : cleanCmd.split(">").pop()?.trim() || "index.html";
    return [
      `$ ${cleanCmd}`,
      `✓ Created empty file: ${file}`,
      `ℹ Size: 0 bytes | Modified: ${new Date().toLocaleDateString("vi-VN")}`
    ];
  }

  // nano
  if (lower.startsWith("nano ")) {
    const file = cleanCmd.split(" ")[1] || ".env";
    return [
      `$ ${cleanCmd}`,
      `  GNU nano 7.2           ${file}`,
      "",
      "  # Edit your file here...",
      "  NODE_ENV=development",
      "  PORT=3000",
      "",
      "^G Help   ^O Write   ^X Exit   ^K Cut   ^T Execute"
    ];
  }

  // history
  if (lower === "history") {
    return [
      "$ history",
      "  497  git status",
      "  498  git add .",
      "  499  git commit -m \"feat: add terminal simulator\"",
      "  500  git push origin main",
      "  501  npm run dev",
      "  502  code .",
      "  503  history"
    ];
  }

  // findstr / grep
  if (lower.startsWith("findstr") || lower.startsWith("grep")) {
    const matchQ = cleanCmd.match(/["'](.+?)["']/);
    const query = matchQ ? matchQ[1] : "PORT";
    const fileArg = cleanCmd.split(" ").pop() || ".env";
    return [
      `$ ${cleanCmd}`,
      `${fileArg}:PORT=3000`,
      `✓ Found 1 matching line for "${query}" in ${fileArg}.`
    ];
  }

  // where / which
  if (lower.startsWith("where ") || lower.startsWith("which ")) {
    const prog = cleanCmd.split(" ").pop() || "git";
    const isWindows = lower.startsWith("where");
    return [
      `$ ${cleanCmd}`,
      isWindows
        ? `C:\\Program Files\\Git\\cmd\\${prog}.exe`
        : `/usr/bin/${prog}`,
      `✓ Found executable for '${prog}' in PATH.`
    ];
  }

  // 14. GENERIC FALLBACK
  return [
    `$ ${cleanCmd}`,
    "Executing command on system...",
    "✓ Job completed successfully."
  ];
}
