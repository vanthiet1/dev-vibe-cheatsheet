export function getLintAndValidateTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  // Static compilation fallback
  return metadata + `# Lint and Validate Skill

> **MANDATORY:** Run appropriate validation tools after EVERY code change. Do not finish a task until the code is error-free.

### Procedures by Ecosystem

#### Node.js / TypeScript
1. **Lint/Fix:** \`npm run lint\` or \`npx eslint "path" --fix\`
2. **Types:** \`npx tsc --noEmit\`
3. **Security:** \`npm audit --audit-level=high\`

#### Python
1. **Linter (Ruff):** \`ruff check "path" --fix\` (Fast & Modern)
2. **Security (Bandit):** \`bandit -r "path" -ll\`
3. **Types (MyPy):** \`mypy "path"\`

## The Quality Loop
1. **Write/Edit Code**
2. **Run Audit:** \`npm run lint && npx tsc --noEmit\`
3. **Analyze Report:** Check the "FINAL AUDIT REPORT" section.
4. **Fix & Repeat:** Submitting code with "FINAL AUDIT" failures is NOT allowed.

## Error Handling
- If \`lint\` fails: Fix the style or syntax issues immediately.
- If \`tsc\` fails: Correct type mismatches before proceeding.
- If no tool is configured: Check the project root for \`.eslintrc\`, \`tsconfig.json\`, \`pyproject.toml\` and suggest creating one.

---
**Strict Rule:** No code should be committed or reported as "done" without passing these checks.

---

## Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| \`scripts/lint_runner.py\` | Unified lint check | \`python scripts/lint_runner.py <project_path>\` |
| \`scripts/type_coverage.py\` | Type coverage analysis | \`python scripts/type_coverage.py <project_path>\` |

## CLI Automation Script & MCP Integration
This skill includes automated checker scripts:

- **File Path**: \`.agent/skills/lint-and-validate/scripts/lint_runner.py\`
- **Execution Command**: \`python .agent/skills/lint-and-validate/scripts/lint_runner.py <project_path>\`
- **Actual Script Source Code**:
\`\`\`python
#!/usr/bin/env python3
"""
Lint Runner - Unified linting and type checking
Runs appropriate linters based on project type.

Usage:
    python lint_runner.py <project_path>

Supports:
    - Node.js: npm run lint, npx tsc --noEmit
    - Python: ruff check, mypy
"""

import subprocess
import sys
import json
import platform
import shutil
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_project_type(project_path: Path) -> dict:
    """Detect project type and available linters."""
    result = {
        "type": "unknown",
        "linters": []
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for lint script
            if "lint" in scripts:
                result["linters"].append({"name": "npm lint", "cmd": ["npm", "run", "lint"]})
            elif "eslint" in deps:
                result["linters"].append({"name": "eslint", "cmd": ["npx", "eslint", "."]})
            
            # Check for TypeScript
            if "typescript" in deps or (project_path / "tsconfig.json").exists():
                result["linters"].append({"name": "tsc", "cmd": ["npx", "tsc", "--noEmit"]})
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        
        # Check for ruff
        result["linters"].append({"name": "ruff", "cmd": ["ruff", "check", "."]})
        
        # Check for mypy
        if (project_path / "mypy.ini").exists() or (project_path / "pyproject.toml").exists():
            result["linters"].append({"name": "mypy", "cmd": ["mypy", "."]})
    
    return result


def run_linter(linter: dict, cwd: Path) -> dict:
    """Run a single linter and return results."""
    result = {
        "name": linter["name"],
        "passed": False,
        "output": "",
        "error": ""
    }
    
    try:
        cmd = linter["cmd"]
        
        # Windows compatibility for npm/npx
        if platform.system() == "Windows":
            if cmd[0] in ["npm", "npx"]:
                # Force .cmd extension on Windows
                if not cmd[0].lower().endswith(".cmd"):
                    cmd[0] = f"{cmd[0]}.cmd"
        
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=120,
            shell=platform.system() == "Windows" # Shell=True often helps with path resolution on Windows
        )
        
        result["output"] = proc.stdout[:2000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {linter['cmd'][0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 120s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[LINT RUNNER] Unified Linting")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect project type
    project_info = detect_project_type(project_path)
    print(f"Type: {project_info['type']}")
    print(f"Linters: {len(project_info['linters'])}")
    print("-"*60)
    
    if not project_info["linters"]:
        print("No linters found for this project type.")
        output = {
            "script": "lint_runner",
            "project": str(project_path),
            "type": project_info["type"],
            "checks": [],
            "passed": True,
            "message": "No linters configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Run each linter
    results = []
    all_passed = True
    
    for linter in project_info["linters"]:
        print(f"\\nRunning: {linter['name']}...")
        result = run_linter(linter, project_path)
        results.append(result)
        
        if result["passed"]:
            print(f"  [PASS] {linter['name']}")
        else:
            print(f"  [FAIL] {linter['name']}")
            if result["error"]:
                print(f"  Error: {result['error'][:200]}")
            all_passed = False
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    for r in results:
        icon = "[PASS]" if r["passed"] else "[FAIL]"
        print(f"{icon} {r['name']}")
    
    output = {
        "script": "lint_runner",
        "project": str(project_path),
        "type": project_info["type"],
        "checks": results,
        "passed": all_passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()

\`\`\`

- **File Path**: \`.agent/skills/lint-and-validate/scripts/type_coverage.py\`
- **Execution Command**: \`python .agent/skills/lint-and-validate/scripts/type_coverage.py <project_path>\`
- **Actual Script Source Code**:
\`\`\`python
#!/usr/bin/env python3
"""
Type Coverage Checker - Measures TypeScript/Python type coverage.
Identifies untyped functions, any usage, and type safety issues.
"""
import sys
import re
import subprocess
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

def check_typescript_coverage(project_path: Path) -> dict:
    """Check TypeScript type coverage."""
    issues = []
    passed = []
    stats = {'any_count': 0, 'untyped_functions': 0, 'total_functions': 0}
    
    ts_files = list(project_path.rglob("*.ts")) + list(project_path.rglob("*.tsx"))
    ts_files = [f for f in ts_files if 'node_modules' not in str(f) and '.d.ts' not in str(f)]
    
    if not ts_files:
        return {'type': 'typescript', 'files': 0, 'passed': [], 'issues': ["[!] No TypeScript files found"], 'stats': stats}
    
    for file_path in ts_files[:30]:  # Limit
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            
            # Count 'any' usage
            any_matches = re.findall(r':\\s*any\\b', content)
            stats['any_count'] += len(any_matches)
            
            # Find functions without return types
            # function name(params) { - no return type
            untyped = re.findall(r'function\\s+\\w+\\s*\\([^)]*\\)\\s*{', content)
            # Arrow functions without types: const fn = (x) => or (x) =>
            untyped += re.findall(r'=\\s*\\([^:)]*\\)\\s*=>', content)
            stats['untyped_functions'] += len(untyped)
            
            # Count typed functions
            typed = re.findall(r'function\\s+\\w+\\s*\\([^)]*\\)\\s*:\\s*\\w+', content)
            typed += re.findall(r':\\s*\\([^)]*\\)\\s*=>\\s*\\w+', content)
            stats['total_functions'] += len(typed) + len(untyped)
            
        except Exception:
            continue
    
    # Analyze results
    if stats['any_count'] == 0:
        passed.append("[OK] No 'any' types found")
    elif stats['any_count'] <= 5:
        issues.append(f"[!] {stats['any_count']} 'any' types found (acceptable)")
    else:
        issues.append(f"[X] {stats['any_count']} 'any' types found (too many)")
    
    if stats['total_functions'] > 0:
        typed_ratio = (stats['total_functions'] - stats['untyped_functions']) / stats['total_functions'] * 100
        if typed_ratio >= 80:
            passed.append(f"[OK] Type coverage: {typed_ratio:.0f}%")
        elif typed_ratio >= 50:
            issues.append(f"[!] Type coverage: {typed_ratio:.0f}% (improve)")
        else:
            issues.append(f"[X] Type coverage: {typed_ratio:.0f}% (too low)")
    
    passed.append(f"[OK] Analyzed {len(ts_files)} TypeScript files")
    
    return {'type': 'typescript', 'files': len(ts_files), 'passed': passed, 'issues': issues, 'stats': stats}

def check_python_coverage(project_path: Path) -> dict:
    """Check Python type hints coverage."""
    issues = []
    passed = []
    stats = {'untyped_functions': 0, 'typed_functions': 0, 'any_count': 0}
    
    py_files = list(project_path.rglob("*.py"))
    py_files = [f for f in py_files if not any(x in str(f) for x in ['venv', '__pycache__', '.git', 'node_modules'])]
    
    if not py_files:
        return {'type': 'python', 'files': 0, 'passed': [], 'issues': ["[!] No Python files found"], 'stats': stats}
    
    for file_path in py_files[:30]:  # Limit
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            
            # Count Any usage
            any_matches = re.findall(r':\\s*Any\\b', content)
            stats['any_count'] += len(any_matches)
            
            # Find functions with type hints
            typed_funcs = re.findall(r'def\\s+\\w+\\s*\\([^)]*:[^)]+\\)', content)
            typed_funcs += re.findall(r'def\\s+\\w+\\s*\\([^)]*\\)\\s*->', content)
            stats['typed_functions'] += len(typed_funcs)
            
            # Find functions without type hints
            all_funcs = re.findall(r'def\\s+\\w+\\s*\\(', content)
            stats['untyped_functions'] += len(all_funcs) - len(typed_funcs)
            
        except Exception:
            continue
    
    total = stats['typed_functions'] + stats['untyped_functions']
    
    if total > 0:
        typed_ratio = stats['typed_functions'] / total * 100
        if typed_ratio >= 70:
            passed.append(f"[OK] Type hints coverage: {typed_ratio:.0f}%")
        elif typed_ratio >= 40:
            issues.append(f"[!] Type hints coverage: {typed_ratio:.0f}%")
        else:
            issues.append(f"[X] Type hints coverage: {typed_ratio:.0f}% (add type hints)")
    
    if stats['any_count'] == 0:
        passed.append("[OK] No 'Any' types found")
    elif stats['any_count'] <= 3:
        issues.append(f"[!] {stats['any_count']} 'Any' types found")
    else:
        issues.append(f"[X] {stats['any_count']} 'Any' types found")
    
    passed.append(f"[OK] Analyzed {len(py_files)} Python files")
    
    return {'type': 'python', 'files': len(py_files), 'passed': passed, 'issues': issues, 'stats': stats}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  TYPE COVERAGE CHECKER")
    print("=" * 60 + "\\n")
    
    results = []
    
    # Check TypeScript
    ts_result = check_typescript_coverage(project_path)
    if ts_result['files'] > 0:
        results.append(ts_result)
    
    # Check Python
    py_result = check_python_coverage(project_path)
    if py_result['files'] > 0:
        results.append(py_result)
    
    if not results:
        print("[!] No TypeScript or Python files found.")
        sys.exit(0)
    
    # Print results
    critical_issues = 0
    for result in results:
        print(f"\\n[{result['type'].upper()}]")
        print("-" * 40)
        for item in result['passed']:
            print(f"  {item}")
        for item in result['issues']:
            print(f"  {item}")
            if item.startswith("[X]"):
                critical_issues += 1
    
    print("\\n" + "=" * 60)
    if critical_issues == 0:
        print("[OK] TYPE COVERAGE: ACCEPTABLE")
        sys.exit(0)
    else:
        print(f"[X] TYPE COVERAGE: {critical_issues} critical issues")
        sys.exit(1)

if __name__ == "__main__":
    main()

\`\`\`
`;
}
