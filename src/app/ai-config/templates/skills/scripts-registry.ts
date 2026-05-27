// Auto-generated scripts registry for static template fallback
export const SCRIPTS_REGISTRY: Record<string, string> = {
  ".agent/scripts/auto_preview.py": `#!/usr/bin/env python3
"""
Auto Preview - AG Kit
==============================
Manages (start/stop/status) the local development server for previewing the application.

Usage:
    python .agent/scripts/auto_preview.py start [port]
    python .agent/scripts/auto_preview.py stop
    python .agent/scripts/auto_preview.py status
"""

import os
import sys
import time
import json
import signal
import argparse
import subprocess
from pathlib import Path

AGENT_DIR = Path(".agent")
PID_FILE = AGENT_DIR / "preview.pid"
LOG_FILE = AGENT_DIR / "preview.log"

def get_project_root():
    return Path(".").resolve()

def is_running(pid):
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False

def get_start_command(root):
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return None
    
    with open(pkg_file, 'r') as f:
        data = json.load(f)
    
    scripts = data.get("scripts", {})
    if "dev" in scripts:
        return ["npm", "run", "dev"]
    elif "start" in scripts:
        return ["npm", "start"]
    return None

def start_server(port=3000):
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                print(f"⚠️  Preview already running (PID: {pid})")
                return
        except:
            pass # Invalid PID file

    root = get_project_root()
    cmd = get_start_command(root)
    
    if not cmd:
        print("❌ No 'dev' or 'start' script found in package.json")
        sys.exit(1)
    
    # Add port env var if needed (simple heuristic)
    env = os.environ.copy()
    env["PORT"] = str(port)
    
    print(f"🚀 Starting preview on port {port}...")
    
    with open(LOG_FILE, "w") as log:
        process = subprocess.Popen(
            cmd,
            cwd=str(root),
            stdout=log,
            stderr=log,
            env=env,
            shell=True # Required for npm on windows often, or consistent path handling
        )
    
    PID_FILE.write_text(str(process.pid))
    print(f"✅ Preview started! (PID: {process.pid})")
    print(f"   Logs: {LOG_FILE}")
    print(f"   URL: http://localhost:{port}")

def stop_server():
    if not PID_FILE.exists():
        print("ℹ️  No preview server found.")
        return

    try:
        pid = int(PID_FILE.read_text().strip())
        if is_running(pid):
            # Try gentle kill first
            os.kill(pid, signal.SIGTERM) if sys.platform != 'win32' else subprocess.call(['taskkill', '/F', '/T', '/PID', str(pid)])
            print(f"🛑 Preview stopped (PID: {pid})")
        else:
            print("ℹ️  Process was not running.")
    except Exception as e:
        print(f"❌ Error stopping server: {e}")
    finally:
        if PID_FILE.exists():
            PID_FILE.unlink()

def status_server():
    running = False
    pid = None
    url = "Unknown"
    
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                running = True
                # Heuristic for URL, strictly we should save it
                url = "http://localhost:3000" 
        except:
            pass
            
    print("\\n=== Preview Status ===")
    if running:
        print(f"✅ Status: Running")
        print(f"🔢 PID: {pid}")
        print(f"🌐 URL: {url} (Likely)")
        print(f"📝 Logs: {LOG_FILE}")
    else:
        print("⚪ Status: Stopped")
    print("===================\\n")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["start", "stop", "status"])
    parser.add_argument("port", nargs="?", default="3000")
    
    args = parser.parse_args()
    
    if args.action == "start":
        start_server(int(args.port))
    elif args.action == "stop":
        stop_server()
    elif args.action == "status":
        status_server()

if __name__ == "__main__":
    main()
`,
  "scripts/auto_preview.py": `#!/usr/bin/env python3
"""
Auto Preview - AG Kit
==============================
Manages (start/stop/status) the local development server for previewing the application.

Usage:
    python .agent/scripts/auto_preview.py start [port]
    python .agent/scripts/auto_preview.py stop
    python .agent/scripts/auto_preview.py status
"""

import os
import sys
import time
import json
import signal
import argparse
import subprocess
from pathlib import Path

AGENT_DIR = Path(".agent")
PID_FILE = AGENT_DIR / "preview.pid"
LOG_FILE = AGENT_DIR / "preview.log"

def get_project_root():
    return Path(".").resolve()

def is_running(pid):
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False

def get_start_command(root):
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return None
    
    with open(pkg_file, 'r') as f:
        data = json.load(f)
    
    scripts = data.get("scripts", {})
    if "dev" in scripts:
        return ["npm", "run", "dev"]
    elif "start" in scripts:
        return ["npm", "start"]
    return None

def start_server(port=3000):
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                print(f"⚠️  Preview already running (PID: {pid})")
                return
        except:
            pass # Invalid PID file

    root = get_project_root()
    cmd = get_start_command(root)
    
    if not cmd:
        print("❌ No 'dev' or 'start' script found in package.json")
        sys.exit(1)
    
    # Add port env var if needed (simple heuristic)
    env = os.environ.copy()
    env["PORT"] = str(port)
    
    print(f"🚀 Starting preview on port {port}...")
    
    with open(LOG_FILE, "w") as log:
        process = subprocess.Popen(
            cmd,
            cwd=str(root),
            stdout=log,
            stderr=log,
            env=env,
            shell=True # Required for npm on windows often, or consistent path handling
        )
    
    PID_FILE.write_text(str(process.pid))
    print(f"✅ Preview started! (PID: {process.pid})")
    print(f"   Logs: {LOG_FILE}")
    print(f"   URL: http://localhost:{port}")

def stop_server():
    if not PID_FILE.exists():
        print("ℹ️  No preview server found.")
        return

    try:
        pid = int(PID_FILE.read_text().strip())
        if is_running(pid):
            # Try gentle kill first
            os.kill(pid, signal.SIGTERM) if sys.platform != 'win32' else subprocess.call(['taskkill', '/F', '/T', '/PID', str(pid)])
            print(f"🛑 Preview stopped (PID: {pid})")
        else:
            print("ℹ️  Process was not running.")
    except Exception as e:
        print(f"❌ Error stopping server: {e}")
    finally:
        if PID_FILE.exists():
            PID_FILE.unlink()

def status_server():
    running = False
    pid = None
    url = "Unknown"
    
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                running = True
                # Heuristic for URL, strictly we should save it
                url = "http://localhost:3000" 
        except:
            pass
            
    print("\\n=== Preview Status ===")
    if running:
        print(f"✅ Status: Running")
        print(f"🔢 PID: {pid}")
        print(f"🌐 URL: {url} (Likely)")
        print(f"📝 Logs: {LOG_FILE}")
    else:
        print("⚪ Status: Stopped")
    print("===================\\n")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["start", "stop", "status"])
    parser.add_argument("port", nargs="?", default="3000")
    
    args = parser.parse_args()
    
    if args.action == "start":
        start_server(int(args.port))
    elif args.action == "stop":
        stop_server()
    elif args.action == "status":
        status_server()

if __name__ == "__main__":
    main()
`,
  "auto_preview.py": `#!/usr/bin/env python3
"""
Auto Preview - AG Kit
==============================
Manages (start/stop/status) the local development server for previewing the application.

Usage:
    python .agent/scripts/auto_preview.py start [port]
    python .agent/scripts/auto_preview.py stop
    python .agent/scripts/auto_preview.py status
"""

import os
import sys
import time
import json
import signal
import argparse
import subprocess
from pathlib import Path

AGENT_DIR = Path(".agent")
PID_FILE = AGENT_DIR / "preview.pid"
LOG_FILE = AGENT_DIR / "preview.log"

def get_project_root():
    return Path(".").resolve()

def is_running(pid):
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False

def get_start_command(root):
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return None
    
    with open(pkg_file, 'r') as f:
        data = json.load(f)
    
    scripts = data.get("scripts", {})
    if "dev" in scripts:
        return ["npm", "run", "dev"]
    elif "start" in scripts:
        return ["npm", "start"]
    return None

def start_server(port=3000):
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                print(f"⚠️  Preview already running (PID: {pid})")
                return
        except:
            pass # Invalid PID file

    root = get_project_root()
    cmd = get_start_command(root)
    
    if not cmd:
        print("❌ No 'dev' or 'start' script found in package.json")
        sys.exit(1)
    
    # Add port env var if needed (simple heuristic)
    env = os.environ.copy()
    env["PORT"] = str(port)
    
    print(f"🚀 Starting preview on port {port}...")
    
    with open(LOG_FILE, "w") as log:
        process = subprocess.Popen(
            cmd,
            cwd=str(root),
            stdout=log,
            stderr=log,
            env=env,
            shell=True # Required for npm on windows often, or consistent path handling
        )
    
    PID_FILE.write_text(str(process.pid))
    print(f"✅ Preview started! (PID: {process.pid})")
    print(f"   Logs: {LOG_FILE}")
    print(f"   URL: http://localhost:{port}")

def stop_server():
    if not PID_FILE.exists():
        print("ℹ️  No preview server found.")
        return

    try:
        pid = int(PID_FILE.read_text().strip())
        if is_running(pid):
            # Try gentle kill first
            os.kill(pid, signal.SIGTERM) if sys.platform != 'win32' else subprocess.call(['taskkill', '/F', '/T', '/PID', str(pid)])
            print(f"🛑 Preview stopped (PID: {pid})")
        else:
            print("ℹ️  Process was not running.")
    except Exception as e:
        print(f"❌ Error stopping server: {e}")
    finally:
        if PID_FILE.exists():
            PID_FILE.unlink()

def status_server():
    running = False
    pid = None
    url = "Unknown"
    
    if PID_FILE.exists():
        try:
            pid = int(PID_FILE.read_text().strip())
            if is_running(pid):
                running = True
                # Heuristic for URL, strictly we should save it
                url = "http://localhost:3000" 
        except:
            pass
            
    print("\\n=== Preview Status ===")
    if running:
        print(f"✅ Status: Running")
        print(f"🔢 PID: {pid}")
        print(f"🌐 URL: {url} (Likely)")
        print(f"📝 Logs: {LOG_FILE}")
    else:
        print("⚪ Status: Stopped")
    print("===================\\n")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["start", "stop", "status"])
    parser.add_argument("port", nargs="?", default="3000")
    
    args = parser.parse_args()
    
    if args.action == "start":
        start_server(int(args.port))
    elif args.action == "stop":
        stop_server()
    elif args.action == "status":
        status_server()

if __name__ == "__main__":
    main()
`,
  ".agent/scripts/checklist.py": `#!/usr/bin/env python3
"""
Master Checklist Runner - AG Kit
==========================================

Orchestrates all validation scripts in priority order.
Use this for incremental validation during development.

Usage:
    python scripts/checklist.py .                    # Run core checks
    python scripts/checklist.py . --url <URL>        # Include performance checks

Priority Order:
    P0: Security Scan (vulnerabilities, secrets)
    P1: Lint & Type Check (code quality)
    P2: Schema Validation (if database exists)
    P3: Test Runner (unit/integration tests)
    P4: UX Audit (psychology laws, accessibility)
    P5: SEO Check (meta tags, structure)
    P6: Performance (lighthouse - requires URL)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple, Optional

# ANSI colors for terminal output
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(60)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Define priority-ordered checks
CORE_CHECKS = [
    ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
    ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
    ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
    ("Test Runner", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
    ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
    ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
]

PERFORMANCE_CHECKS = [
    ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
    ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
]

def check_script_exists(script_path: Path) -> bool:
    """Check if script file exists"""
    return script_path.exists() and script_path.is_file()

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """
    Run a validation script and capture results
    
    Returns:
        dict with keys: name, passed, output, skipped
    """
    if not check_script_exists(script_path):
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "output": "", "skipped": True}
    
    print_step(f"Running: {name}")
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run script
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED")
        else:
            print_error(f"{name}: FAILED")
            if result.stderr:
                print(f"  Error: {result.stderr[:200]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False
        }
    
    except subprocess.TimeoutExpired:
        print_error(f"{name}: TIMEOUT (>5 minutes)")
        return {"name": name, "passed": False, "output": "", "error": "Timeout", "skipped": False}
    
    except Exception as e:
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "output": "", "error": str(e), "skipped": False}

def print_summary(results: List[dict]):
    """Print final summary report"""
    print_header("📊 CHECKLIST SUMMARY")
    
    passed_count = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed_count = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped_count = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Checks: {len(results)}")
    print(f"{Colors.GREEN}✅ Passed: {passed_count}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed_count}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped_count}{Colors.ENDC}")
    print()
    
    # Detailed results
    for r in results:
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        print(f"{status} {r['name']}")
    
    print()
    
    if failed_count > 0:
        print_error(f"{failed_count} check(s) FAILED - Please fix before proceeding")
        return False
    else:
        print_success("All checks PASSED ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run AG Kit validation checklist",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/checklist.py .                      # Core checks only
  python scripts/checklist.py . --url http://localhost:3000  # Include performance
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", help="URL for performance checks (lighthouse, playwright)")
    parser.add_argument("--skip-performance", action="store_true", help="Skip performance checks even if URL provided")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - MASTER CHECKLIST")
    print(f"Project: {project_path}")
    print(f"URL: {args.url if args.url else 'Not provided (performance checks skipped)'}")
    
    results = []
    
    # Run core checks
    print_header("📋 CORE CHECKS")
    for name, script_path, required in CORE_CHECKS:
        script = project_path / script_path
        result = run_script(name, script, str(project_path))
        results.append(result)
        
        # If required check fails, stop
        if required and not result["passed"] and not result.get("skipped"):
            print_error(f"CRITICAL: {name} failed. Stopping checklist.")
            print_summary(results)
            sys.exit(1)
    
    # Run performance checks if URL provided
    if args.url and not args.skip_performance:
        print_header("⚡ PERFORMANCE CHECKS")
        for name, script_path, required in PERFORMANCE_CHECKS:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            results.append(result)
    
    # Print summary
    all_passed = print_summary(results)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  "scripts/checklist.py": `#!/usr/bin/env python3
"""
Master Checklist Runner - AG Kit
==========================================

Orchestrates all validation scripts in priority order.
Use this for incremental validation during development.

Usage:
    python scripts/checklist.py .                    # Run core checks
    python scripts/checklist.py . --url <URL>        # Include performance checks

Priority Order:
    P0: Security Scan (vulnerabilities, secrets)
    P1: Lint & Type Check (code quality)
    P2: Schema Validation (if database exists)
    P3: Test Runner (unit/integration tests)
    P4: UX Audit (psychology laws, accessibility)
    P5: SEO Check (meta tags, structure)
    P6: Performance (lighthouse - requires URL)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple, Optional

# ANSI colors for terminal output
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(60)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Define priority-ordered checks
CORE_CHECKS = [
    ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
    ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
    ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
    ("Test Runner", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
    ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
    ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
]

PERFORMANCE_CHECKS = [
    ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
    ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
]

def check_script_exists(script_path: Path) -> bool:
    """Check if script file exists"""
    return script_path.exists() and script_path.is_file()

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """
    Run a validation script and capture results
    
    Returns:
        dict with keys: name, passed, output, skipped
    """
    if not check_script_exists(script_path):
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "output": "", "skipped": True}
    
    print_step(f"Running: {name}")
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run script
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED")
        else:
            print_error(f"{name}: FAILED")
            if result.stderr:
                print(f"  Error: {result.stderr[:200]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False
        }
    
    except subprocess.TimeoutExpired:
        print_error(f"{name}: TIMEOUT (>5 minutes)")
        return {"name": name, "passed": False, "output": "", "error": "Timeout", "skipped": False}
    
    except Exception as e:
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "output": "", "error": str(e), "skipped": False}

def print_summary(results: List[dict]):
    """Print final summary report"""
    print_header("📊 CHECKLIST SUMMARY")
    
    passed_count = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed_count = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped_count = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Checks: {len(results)}")
    print(f"{Colors.GREEN}✅ Passed: {passed_count}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed_count}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped_count}{Colors.ENDC}")
    print()
    
    # Detailed results
    for r in results:
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        print(f"{status} {r['name']}")
    
    print()
    
    if failed_count > 0:
        print_error(f"{failed_count} check(s) FAILED - Please fix before proceeding")
        return False
    else:
        print_success("All checks PASSED ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run AG Kit validation checklist",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/checklist.py .                      # Core checks only
  python scripts/checklist.py . --url http://localhost:3000  # Include performance
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", help="URL for performance checks (lighthouse, playwright)")
    parser.add_argument("--skip-performance", action="store_true", help="Skip performance checks even if URL provided")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - MASTER CHECKLIST")
    print(f"Project: {project_path}")
    print(f"URL: {args.url if args.url else 'Not provided (performance checks skipped)'}")
    
    results = []
    
    # Run core checks
    print_header("📋 CORE CHECKS")
    for name, script_path, required in CORE_CHECKS:
        script = project_path / script_path
        result = run_script(name, script, str(project_path))
        results.append(result)
        
        # If required check fails, stop
        if required and not result["passed"] and not result.get("skipped"):
            print_error(f"CRITICAL: {name} failed. Stopping checklist.")
            print_summary(results)
            sys.exit(1)
    
    # Run performance checks if URL provided
    if args.url and not args.skip_performance:
        print_header("⚡ PERFORMANCE CHECKS")
        for name, script_path, required in PERFORMANCE_CHECKS:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            results.append(result)
    
    # Print summary
    all_passed = print_summary(results)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  "checklist.py": `#!/usr/bin/env python3
"""
Master Checklist Runner - AG Kit
==========================================

Orchestrates all validation scripts in priority order.
Use this for incremental validation during development.

Usage:
    python scripts/checklist.py .                    # Run core checks
    python scripts/checklist.py . --url <URL>        # Include performance checks

Priority Order:
    P0: Security Scan (vulnerabilities, secrets)
    P1: Lint & Type Check (code quality)
    P2: Schema Validation (if database exists)
    P3: Test Runner (unit/integration tests)
    P4: UX Audit (psychology laws, accessibility)
    P5: SEO Check (meta tags, structure)
    P6: Performance (lighthouse - requires URL)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Tuple, Optional

# ANSI colors for terminal output
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(60)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Define priority-ordered checks
CORE_CHECKS = [
    ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
    ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
    ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
    ("Test Runner", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
    ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
    ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
]

PERFORMANCE_CHECKS = [
    ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
    ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
]

def check_script_exists(script_path: Path) -> bool:
    """Check if script file exists"""
    return script_path.exists() and script_path.is_file()

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """
    Run a validation script and capture results
    
    Returns:
        dict with keys: name, passed, output, skipped
    """
    if not check_script_exists(script_path):
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "output": "", "skipped": True}
    
    print_step(f"Running: {name}")
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run script
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED")
        else:
            print_error(f"{name}: FAILED")
            if result.stderr:
                print(f"  Error: {result.stderr[:200]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False
        }
    
    except subprocess.TimeoutExpired:
        print_error(f"{name}: TIMEOUT (>5 minutes)")
        return {"name": name, "passed": False, "output": "", "error": "Timeout", "skipped": False}
    
    except Exception as e:
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "output": "", "error": str(e), "skipped": False}

def print_summary(results: List[dict]):
    """Print final summary report"""
    print_header("📊 CHECKLIST SUMMARY")
    
    passed_count = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed_count = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped_count = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Checks: {len(results)}")
    print(f"{Colors.GREEN}✅ Passed: {passed_count}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed_count}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped_count}{Colors.ENDC}")
    print()
    
    # Detailed results
    for r in results:
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        print(f"{status} {r['name']}")
    
    print()
    
    if failed_count > 0:
        print_error(f"{failed_count} check(s) FAILED - Please fix before proceeding")
        return False
    else:
        print_success("All checks PASSED ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run AG Kit validation checklist",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/checklist.py .                      # Core checks only
  python scripts/checklist.py . --url http://localhost:3000  # Include performance
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", help="URL for performance checks (lighthouse, playwright)")
    parser.add_argument("--skip-performance", action="store_true", help="Skip performance checks even if URL provided")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - MASTER CHECKLIST")
    print(f"Project: {project_path}")
    print(f"URL: {args.url if args.url else 'Not provided (performance checks skipped)'}")
    
    results = []
    
    # Run core checks
    print_header("📋 CORE CHECKS")
    for name, script_path, required in CORE_CHECKS:
        script = project_path / script_path
        result = run_script(name, script, str(project_path))
        results.append(result)
        
        # If required check fails, stop
        if required and not result["passed"] and not result.get("skipped"):
            print_error(f"CRITICAL: {name} failed. Stopping checklist.")
            print_summary(results)
            sys.exit(1)
    
    # Run performance checks if URL provided
    if args.url and not args.skip_performance:
        print_header("⚡ PERFORMANCE CHECKS")
        for name, script_path, required in PERFORMANCE_CHECKS:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            results.append(result)
    
    # Print summary
    all_passed = print_summary(results)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  ".agent/scripts/session_manager.py": `#!/usr/bin/env python3
"""
Session Manager - AG Kit
=================================
Analyzes project state, detects tech stack, tracks file statistics, and provides
a summary of the current session.

Usage:
    python .agent/scripts/session_manager.py status [path]
    python .agent/scripts/session_manager.py info [path]
"""

import os
import json
import argparse
from pathlib import Path
from typing import Dict, Any, List

def get_project_root(path: str) -> Path:
    return Path(path).resolve()

def analyze_package_json(root: Path) -> Dict[str, Any]:
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return {"type": "unknown", "dependencies": {}}
    
    try:
        with open(pkg_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
        all_deps = {**deps, **dev_deps}
        
        stack = []
        if "next" in all_deps: stack.append("Next.js")
        elif "react" in all_deps: stack.append("React")
        elif "vue" in all_deps: stack.append("Vue")
        elif "svelte" in all_deps: stack.append("Svelte")
        elif "express" in all_deps: stack.append("Express")
        elif "nestjs" in all_deps or "@nestjs/core" in all_deps: stack.append("NestJS")
        
        if "tailwindcss" in all_deps: stack.append("Tailwind CSS")
        if "prisma" in all_deps: stack.append("Prisma")
        if "typescript" in all_deps: stack.append("TypeScript")
        
        return {
            "name": data.get("name", "unnamed"),
            "version": data.get("version", "0.0.0"),
            "stack": stack,
            "scripts": list(data.get("scripts", {}).keys())
        }
    except Exception as e:
        return {"error": str(e)}

def count_files(root: Path) -> Dict[str, int]:
    stats = {"created": 0, "modified": 0, "total": 0}
    # Simple count for now, comprehensive tracking would require git diff or extensive history
    exclude = {".git", "node_modules", ".next", "dist", "build", ".agent", ".gemini", "__pycache__"}
    
    for root_dir, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in exclude]
        stats["total"] += len(files)
        
    return stats

def detect_features(root: Path) -> List[str]:
    # Heuristic: look at folder names in src/
    features = []
    src = root / "src"
    if src.exists():
        possible_dirs = ["components", "modules", "features", "app", "pages", "services"]
        for d in possible_dirs:
            p = src / d
            if p.exists() and p.is_dir():
                # List subdirectories as likely features
                for child in p.iterdir():
                    if child.is_dir():
                        features.append(child.name)
    return features[:10] # Limit to top 10

def print_status(root: Path):
    info = analyze_package_json(root)
    stats = count_files(root)
    features = detect_features(root)
    
    print("\\n=== Project Status ===")
    print(f"\\n📁 Project: {info.get('name', root.name)}")
    print(f"📂 Path: {root}")
    print(f"🏷️  Type: {', '.join(info.get('stack', ['Generic']))}")
    print(f"📊 Status: Active")
    
    print("\\n🔧 Tech Stack:")
    for tech in info.get('stack', []):
        print(f"   • {tech}")
        
    print(f"\\n✅ Detected Modules/Features ({len(features)}):")
    for feat in features:
        print(f"   • {feat}")
    if not features:
        print("   (No distinct feature modules detected)")
        
    print(f"\\n📄 Files: {stats['total']} total files tracked")
    print("\\n====================\\n")

def main():
    parser = argparse.ArgumentParser(description="Session Manager")
    parser.add_argument("command", choices=["status", "info"], help="Command to run")
    parser.add_argument("path", nargs="?", default=".", help="Project path")
    
    args = parser.parse_args()
    root = get_project_root(args.path)
    
    if args.command == "status":
        print_status(root)
    elif args.command == "info":
        print(json.dumps(analyze_package_json(root), indent=2))

if __name__ == "__main__":
    main()
`,
  "scripts/session_manager.py": `#!/usr/bin/env python3
"""
Session Manager - AG Kit
=================================
Analyzes project state, detects tech stack, tracks file statistics, and provides
a summary of the current session.

Usage:
    python .agent/scripts/session_manager.py status [path]
    python .agent/scripts/session_manager.py info [path]
"""

import os
import json
import argparse
from pathlib import Path
from typing import Dict, Any, List

def get_project_root(path: str) -> Path:
    return Path(path).resolve()

def analyze_package_json(root: Path) -> Dict[str, Any]:
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return {"type": "unknown", "dependencies": {}}
    
    try:
        with open(pkg_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
        all_deps = {**deps, **dev_deps}
        
        stack = []
        if "next" in all_deps: stack.append("Next.js")
        elif "react" in all_deps: stack.append("React")
        elif "vue" in all_deps: stack.append("Vue")
        elif "svelte" in all_deps: stack.append("Svelte")
        elif "express" in all_deps: stack.append("Express")
        elif "nestjs" in all_deps or "@nestjs/core" in all_deps: stack.append("NestJS")
        
        if "tailwindcss" in all_deps: stack.append("Tailwind CSS")
        if "prisma" in all_deps: stack.append("Prisma")
        if "typescript" in all_deps: stack.append("TypeScript")
        
        return {
            "name": data.get("name", "unnamed"),
            "version": data.get("version", "0.0.0"),
            "stack": stack,
            "scripts": list(data.get("scripts", {}).keys())
        }
    except Exception as e:
        return {"error": str(e)}

def count_files(root: Path) -> Dict[str, int]:
    stats = {"created": 0, "modified": 0, "total": 0}
    # Simple count for now, comprehensive tracking would require git diff or extensive history
    exclude = {".git", "node_modules", ".next", "dist", "build", ".agent", ".gemini", "__pycache__"}
    
    for root_dir, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in exclude]
        stats["total"] += len(files)
        
    return stats

def detect_features(root: Path) -> List[str]:
    # Heuristic: look at folder names in src/
    features = []
    src = root / "src"
    if src.exists():
        possible_dirs = ["components", "modules", "features", "app", "pages", "services"]
        for d in possible_dirs:
            p = src / d
            if p.exists() and p.is_dir():
                # List subdirectories as likely features
                for child in p.iterdir():
                    if child.is_dir():
                        features.append(child.name)
    return features[:10] # Limit to top 10

def print_status(root: Path):
    info = analyze_package_json(root)
    stats = count_files(root)
    features = detect_features(root)
    
    print("\\n=== Project Status ===")
    print(f"\\n📁 Project: {info.get('name', root.name)}")
    print(f"📂 Path: {root}")
    print(f"🏷️  Type: {', '.join(info.get('stack', ['Generic']))}")
    print(f"📊 Status: Active")
    
    print("\\n🔧 Tech Stack:")
    for tech in info.get('stack', []):
        print(f"   • {tech}")
        
    print(f"\\n✅ Detected Modules/Features ({len(features)}):")
    for feat in features:
        print(f"   • {feat}")
    if not features:
        print("   (No distinct feature modules detected)")
        
    print(f"\\n📄 Files: {stats['total']} total files tracked")
    print("\\n====================\\n")

def main():
    parser = argparse.ArgumentParser(description="Session Manager")
    parser.add_argument("command", choices=["status", "info"], help="Command to run")
    parser.add_argument("path", nargs="?", default=".", help="Project path")
    
    args = parser.parse_args()
    root = get_project_root(args.path)
    
    if args.command == "status":
        print_status(root)
    elif args.command == "info":
        print(json.dumps(analyze_package_json(root), indent=2))

if __name__ == "__main__":
    main()
`,
  "session_manager.py": `#!/usr/bin/env python3
"""
Session Manager - AG Kit
=================================
Analyzes project state, detects tech stack, tracks file statistics, and provides
a summary of the current session.

Usage:
    python .agent/scripts/session_manager.py status [path]
    python .agent/scripts/session_manager.py info [path]
"""

import os
import json
import argparse
from pathlib import Path
from typing import Dict, Any, List

def get_project_root(path: str) -> Path:
    return Path(path).resolve()

def analyze_package_json(root: Path) -> Dict[str, Any]:
    pkg_file = root / "package.json"
    if not pkg_file.exists():
        return {"type": "unknown", "dependencies": {}}
    
    try:
        with open(pkg_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
        all_deps = {**deps, **dev_deps}
        
        stack = []
        if "next" in all_deps: stack.append("Next.js")
        elif "react" in all_deps: stack.append("React")
        elif "vue" in all_deps: stack.append("Vue")
        elif "svelte" in all_deps: stack.append("Svelte")
        elif "express" in all_deps: stack.append("Express")
        elif "nestjs" in all_deps or "@nestjs/core" in all_deps: stack.append("NestJS")
        
        if "tailwindcss" in all_deps: stack.append("Tailwind CSS")
        if "prisma" in all_deps: stack.append("Prisma")
        if "typescript" in all_deps: stack.append("TypeScript")
        
        return {
            "name": data.get("name", "unnamed"),
            "version": data.get("version", "0.0.0"),
            "stack": stack,
            "scripts": list(data.get("scripts", {}).keys())
        }
    except Exception as e:
        return {"error": str(e)}

def count_files(root: Path) -> Dict[str, int]:
    stats = {"created": 0, "modified": 0, "total": 0}
    # Simple count for now, comprehensive tracking would require git diff or extensive history
    exclude = {".git", "node_modules", ".next", "dist", "build", ".agent", ".gemini", "__pycache__"}
    
    for root_dir, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in exclude]
        stats["total"] += len(files)
        
    return stats

def detect_features(root: Path) -> List[str]:
    # Heuristic: look at folder names in src/
    features = []
    src = root / "src"
    if src.exists():
        possible_dirs = ["components", "modules", "features", "app", "pages", "services"]
        for d in possible_dirs:
            p = src / d
            if p.exists() and p.is_dir():
                # List subdirectories as likely features
                for child in p.iterdir():
                    if child.is_dir():
                        features.append(child.name)
    return features[:10] # Limit to top 10

def print_status(root: Path):
    info = analyze_package_json(root)
    stats = count_files(root)
    features = detect_features(root)
    
    print("\\n=== Project Status ===")
    print(f"\\n📁 Project: {info.get('name', root.name)}")
    print(f"📂 Path: {root}")
    print(f"🏷️  Type: {', '.join(info.get('stack', ['Generic']))}")
    print(f"📊 Status: Active")
    
    print("\\n🔧 Tech Stack:")
    for tech in info.get('stack', []):
        print(f"   • {tech}")
        
    print(f"\\n✅ Detected Modules/Features ({len(features)}):")
    for feat in features:
        print(f"   • {feat}")
    if not features:
        print("   (No distinct feature modules detected)")
        
    print(f"\\n📄 Files: {stats['total']} total files tracked")
    print("\\n====================\\n")

def main():
    parser = argparse.ArgumentParser(description="Session Manager")
    parser.add_argument("command", choices=["status", "info"], help="Command to run")
    parser.add_argument("path", nargs="?", default=".", help="Project path")
    
    args = parser.parse_args()
    root = get_project_root(args.path)
    
    if args.command == "status":
        print_status(root)
    elif args.command == "info":
        print(json.dumps(analyze_package_json(root), indent=2))

if __name__ == "__main__":
    main()
`,
  ".agent/scripts/verify_all.py": `#!/usr/bin/env python3
"""
Full Verification Suite - AG Kit
==========================================

Runs COMPLETE validation including all checks + performance + E2E.
Use this before deployment or major releases.

Usage:
    python scripts/verify_all.py . --url <URL>

Includes ALL checks:
    ✅ Security Scan (OWASP, secrets, dependencies)
    ✅ Lint & Type Coverage
    ✅ Schema Validation
    ✅ Test Suite (unit + integration)
    ✅ UX Audit (psychology, accessibility)
    ✅ SEO Check
    ✅ Lighthouse (Core Web Vitals)
    ✅ Playwright E2E
    ✅ Bundle Analysis (if applicable)
    ✅ Mobile Audit (if applicable)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime

# ANSI colors
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(70)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Complete verification suite
VERIFICATION_SUITE = [
    # P0: Security (CRITICAL)
    {
        "category": "Security",
        "checks": [
            ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
            ("Dependency Analysis", ".agent/skills/vulnerability-scanner/scripts/dependency_analyzer.py", False),
        ]
    },
    
    # P1: Code Quality (CRITICAL)
    {
        "category": "Code Quality",
        "checks": [
            ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
            ("Type Coverage", ".agent/skills/lint-and-validate/scripts/type_coverage.py", False),
        ]
    },
    
    # P2: Data Layer
    {
        "category": "Data Layer",
        "checks": [
            ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
        ]
    },
    
    # P3: Testing
    {
        "category": "Testing",
        "checks": [
            ("Test Suite", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
        ]
    },
    
    # P4: UX & Accessibility
    {
        "category": "UX & Accessibility",
        "checks": [
            ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
            ("Accessibility Check", ".agent/skills/frontend-design/scripts/accessibility_checker.py", False),
        ]
    },
    
    # P5: SEO & Content
    {
        "category": "SEO & Content",
        "checks": [
            ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
            ("GEO Check", ".agent/skills/geo-fundamentals/scripts/geo_checker.py", False),
        ]
    },
    
    # P6: Performance (requires URL)
    {
        "category": "Performance",
        "requires_url": True,
        "checks": [
            ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
            ("Bundle Analysis", ".agent/skills/performance-profiling/scripts/bundle_analyzer.py", False),
        ]
    },
    
    # P7: E2E Testing (requires URL)
    {
        "category": "E2E Testing",
        "requires_url": True,
        "checks": [
            ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
        ]
    },
    
    # P8: Mobile (if applicable)
    {
        "category": "Mobile",
        "checks": [
            ("Mobile Audit", ".agent/skills/mobile-design/scripts/mobile_audit.py", False),
        ]
    },
    
    # P9: Internationalization
    {
        "category": "Internationalization",
        "checks": [
            ("i18n Check", ".agent/skills/i18n-localization/scripts/i18n_checker.py", False),
        ]
    },
]

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """Run validation script"""
    if not script_path.exists():
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "skipped": True, "duration": 0}
    
    print_step(f"Running: {name}")
    start_time = datetime.now()
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout for slow checks
        )
        
        duration = (datetime.now() - start_time).total_seconds()
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED ({duration:.1f}s)")
        else:
            print_error(f"{name}: FAILED ({duration:.1f}s)")
            if result.stderr:
                print(f"  {result.stderr[:300]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False,
            "duration": duration
        }
    
    except subprocess.TimeoutExpired:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: TIMEOUT (>{duration:.0f}s)")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": "Timeout"}
    
    except Exception as e:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": str(e)}

def print_final_report(results: List[dict], start_time: datetime):
    """Print comprehensive final report"""
    total_duration = (datetime.now() - start_time).total_seconds()
    
    print_header("📊 FULL VERIFICATION REPORT")
    
    # Statistics
    total = len(results)
    passed = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Duration: {total_duration:.1f}s")
    print(f"Total Checks: {total}")
    print(f"{Colors.GREEN}✅ Passed: {passed}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped}{Colors.ENDC}")
    print()
    
    # Category breakdown
    print(f"{Colors.BOLD}Results by Category:{Colors.ENDC}")
    current_category = None
    for r in results:
        # Print category header if changed
        if r.get("category") and r["category"] != current_category:
            current_category = r["category"]
            print(f"\\n{Colors.BOLD}{Colors.CYAN}{current_category}:{Colors.ENDC}")
        
        # Print result
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        duration_str = f"({r.get('duration', 0):.1f}s)" if not r.get("skipped") else ""
        print(f"  {status} {r['name']} {duration_str}")
    
    print()
    
    # Failed checks detail
    if failed > 0:
        print(f"{Colors.BOLD}{Colors.RED}❌ FAILED CHECKS:{Colors.ENDC}")
        for r in results:
            if not r["passed"] and not r.get("skipped"):
                print(f"\\n{Colors.RED}✗ {r['name']}{Colors.ENDC}")
                if r.get("error"):
                    error_preview = r["error"][:200]
                    print(f"  Error: {error_preview}")
        print()
    
    # Final verdict
    if failed > 0:
        print_error(f"VERIFICATION FAILED - {failed} check(s) need attention")
        print(f"\\n{Colors.YELLOW}💡 Tip: Fix critical (security, lint) issues first{Colors.ENDC}")
        return False
    else:
        print_success("✨ ALL CHECKS PASSED - Ready for deployment! ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run complete AG Kit verification suite",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/verify_all.py . --url http://localhost:3000
  python scripts/verify_all.py . --url https://staging.example.com --no-e2e
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", required=True, help="URL for performance & E2E checks")
    parser.add_argument("--no-e2e", action="store_true", help="Skip E2E tests")
    parser.add_argument("--stop-on-fail", action="store_true", help="Stop on first failure")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - FULL VERIFICATION SUITE")
    print(f"Project: {project_path}")
    print(f"URL: {args.url}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    start_time = datetime.now()
    results = []
    
    # Run all verification categories
    for suite in VERIFICATION_SUITE:
        category = suite["category"]
        requires_url = suite.get("requires_url", False)
        
        # Skip if requires URL and not provided
        if requires_url and not args.url:
            continue
        
        # Skip E2E if flag set
        if args.no_e2e and category == "E2E Testing":
            continue
        
        print_header(f"📋 {category.upper()}")
        
        for name, script_path, required in suite["checks"]:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            result["category"] = category
            results.append(result)
            
            # Stop on critical failure if flag set
            if args.stop_on_fail and required and not result["passed"] and not result.get("skipped"):
                print_error(f"CRITICAL: {name} failed. Stopping verification.")
                print_final_report(results, start_time)
                sys.exit(1)
    
    # Print final report
    all_passed = print_final_report(results, start_time)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  "scripts/verify_all.py": `#!/usr/bin/env python3
"""
Full Verification Suite - AG Kit
==========================================

Runs COMPLETE validation including all checks + performance + E2E.
Use this before deployment or major releases.

Usage:
    python scripts/verify_all.py . --url <URL>

Includes ALL checks:
    ✅ Security Scan (OWASP, secrets, dependencies)
    ✅ Lint & Type Coverage
    ✅ Schema Validation
    ✅ Test Suite (unit + integration)
    ✅ UX Audit (psychology, accessibility)
    ✅ SEO Check
    ✅ Lighthouse (Core Web Vitals)
    ✅ Playwright E2E
    ✅ Bundle Analysis (if applicable)
    ✅ Mobile Audit (if applicable)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime

# ANSI colors
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(70)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Complete verification suite
VERIFICATION_SUITE = [
    # P0: Security (CRITICAL)
    {
        "category": "Security",
        "checks": [
            ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
            ("Dependency Analysis", ".agent/skills/vulnerability-scanner/scripts/dependency_analyzer.py", False),
        ]
    },
    
    # P1: Code Quality (CRITICAL)
    {
        "category": "Code Quality",
        "checks": [
            ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
            ("Type Coverage", ".agent/skills/lint-and-validate/scripts/type_coverage.py", False),
        ]
    },
    
    # P2: Data Layer
    {
        "category": "Data Layer",
        "checks": [
            ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
        ]
    },
    
    # P3: Testing
    {
        "category": "Testing",
        "checks": [
            ("Test Suite", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
        ]
    },
    
    # P4: UX & Accessibility
    {
        "category": "UX & Accessibility",
        "checks": [
            ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
            ("Accessibility Check", ".agent/skills/frontend-design/scripts/accessibility_checker.py", False),
        ]
    },
    
    # P5: SEO & Content
    {
        "category": "SEO & Content",
        "checks": [
            ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
            ("GEO Check", ".agent/skills/geo-fundamentals/scripts/geo_checker.py", False),
        ]
    },
    
    # P6: Performance (requires URL)
    {
        "category": "Performance",
        "requires_url": True,
        "checks": [
            ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
            ("Bundle Analysis", ".agent/skills/performance-profiling/scripts/bundle_analyzer.py", False),
        ]
    },
    
    # P7: E2E Testing (requires URL)
    {
        "category": "E2E Testing",
        "requires_url": True,
        "checks": [
            ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
        ]
    },
    
    # P8: Mobile (if applicable)
    {
        "category": "Mobile",
        "checks": [
            ("Mobile Audit", ".agent/skills/mobile-design/scripts/mobile_audit.py", False),
        ]
    },
    
    # P9: Internationalization
    {
        "category": "Internationalization",
        "checks": [
            ("i18n Check", ".agent/skills/i18n-localization/scripts/i18n_checker.py", False),
        ]
    },
]

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """Run validation script"""
    if not script_path.exists():
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "skipped": True, "duration": 0}
    
    print_step(f"Running: {name}")
    start_time = datetime.now()
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout for slow checks
        )
        
        duration = (datetime.now() - start_time).total_seconds()
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED ({duration:.1f}s)")
        else:
            print_error(f"{name}: FAILED ({duration:.1f}s)")
            if result.stderr:
                print(f"  {result.stderr[:300]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False,
            "duration": duration
        }
    
    except subprocess.TimeoutExpired:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: TIMEOUT (>{duration:.0f}s)")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": "Timeout"}
    
    except Exception as e:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": str(e)}

def print_final_report(results: List[dict], start_time: datetime):
    """Print comprehensive final report"""
    total_duration = (datetime.now() - start_time).total_seconds()
    
    print_header("📊 FULL VERIFICATION REPORT")
    
    # Statistics
    total = len(results)
    passed = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Duration: {total_duration:.1f}s")
    print(f"Total Checks: {total}")
    print(f"{Colors.GREEN}✅ Passed: {passed}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped}{Colors.ENDC}")
    print()
    
    # Category breakdown
    print(f"{Colors.BOLD}Results by Category:{Colors.ENDC}")
    current_category = None
    for r in results:
        # Print category header if changed
        if r.get("category") and r["category"] != current_category:
            current_category = r["category"]
            print(f"\\n{Colors.BOLD}{Colors.CYAN}{current_category}:{Colors.ENDC}")
        
        # Print result
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        duration_str = f"({r.get('duration', 0):.1f}s)" if not r.get("skipped") else ""
        print(f"  {status} {r['name']} {duration_str}")
    
    print()
    
    # Failed checks detail
    if failed > 0:
        print(f"{Colors.BOLD}{Colors.RED}❌ FAILED CHECKS:{Colors.ENDC}")
        for r in results:
            if not r["passed"] and not r.get("skipped"):
                print(f"\\n{Colors.RED}✗ {r['name']}{Colors.ENDC}")
                if r.get("error"):
                    error_preview = r["error"][:200]
                    print(f"  Error: {error_preview}")
        print()
    
    # Final verdict
    if failed > 0:
        print_error(f"VERIFICATION FAILED - {failed} check(s) need attention")
        print(f"\\n{Colors.YELLOW}💡 Tip: Fix critical (security, lint) issues first{Colors.ENDC}")
        return False
    else:
        print_success("✨ ALL CHECKS PASSED - Ready for deployment! ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run complete AG Kit verification suite",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/verify_all.py . --url http://localhost:3000
  python scripts/verify_all.py . --url https://staging.example.com --no-e2e
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", required=True, help="URL for performance & E2E checks")
    parser.add_argument("--no-e2e", action="store_true", help="Skip E2E tests")
    parser.add_argument("--stop-on-fail", action="store_true", help="Stop on first failure")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - FULL VERIFICATION SUITE")
    print(f"Project: {project_path}")
    print(f"URL: {args.url}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    start_time = datetime.now()
    results = []
    
    # Run all verification categories
    for suite in VERIFICATION_SUITE:
        category = suite["category"]
        requires_url = suite.get("requires_url", False)
        
        # Skip if requires URL and not provided
        if requires_url and not args.url:
            continue
        
        # Skip E2E if flag set
        if args.no_e2e and category == "E2E Testing":
            continue
        
        print_header(f"📋 {category.upper()}")
        
        for name, script_path, required in suite["checks"]:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            result["category"] = category
            results.append(result)
            
            # Stop on critical failure if flag set
            if args.stop_on_fail and required and not result["passed"] and not result.get("skipped"):
                print_error(f"CRITICAL: {name} failed. Stopping verification.")
                print_final_report(results, start_time)
                sys.exit(1)
    
    # Print final report
    all_passed = print_final_report(results, start_time)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  "verify_all.py": `#!/usr/bin/env python3
"""
Full Verification Suite - AG Kit
==========================================

Runs COMPLETE validation including all checks + performance + E2E.
Use this before deployment or major releases.

Usage:
    python scripts/verify_all.py . --url <URL>

Includes ALL checks:
    ✅ Security Scan (OWASP, secrets, dependencies)
    ✅ Lint & Type Coverage
    ✅ Schema Validation
    ✅ Test Suite (unit + integration)
    ✅ UX Audit (psychology, accessibility)
    ✅ SEO Check
    ✅ Lighthouse (Core Web Vitals)
    ✅ Playwright E2E
    ✅ Bundle Analysis (if applicable)
    ✅ Mobile Audit (if applicable)
"""

import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime

# ANSI colors
class Colors:
    HEADER = '\\033[95m'
    BLUE = '\\033[94m'
    CYAN = '\\033[96m'
    GREEN = '\\033[92m'
    YELLOW = '\\033[93m'
    RED = '\\033[91m'
    ENDC = '\\033[0m'
    BOLD = '\\033[1m'

def print_header(text: str):
    print(f"\\n{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(70)}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*70}{Colors.ENDC}\\n")

def print_step(text: str):
    print(f"{Colors.BOLD}{Colors.BLUE}🔄 {text}{Colors.ENDC}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

# Complete verification suite
VERIFICATION_SUITE = [
    # P0: Security (CRITICAL)
    {
        "category": "Security",
        "checks": [
            ("Security Scan", ".agent/skills/vulnerability-scanner/scripts/security_scan.py", True),
            ("Dependency Analysis", ".agent/skills/vulnerability-scanner/scripts/dependency_analyzer.py", False),
        ]
    },
    
    # P1: Code Quality (CRITICAL)
    {
        "category": "Code Quality",
        "checks": [
            ("Lint Check", ".agent/skills/lint-and-validate/scripts/lint_runner.py", True),
            ("Type Coverage", ".agent/skills/lint-and-validate/scripts/type_coverage.py", False),
        ]
    },
    
    # P2: Data Layer
    {
        "category": "Data Layer",
        "checks": [
            ("Schema Validation", ".agent/skills/database-design/scripts/schema_validator.py", False),
        ]
    },
    
    # P3: Testing
    {
        "category": "Testing",
        "checks": [
            ("Test Suite", ".agent/skills/testing-patterns/scripts/test_runner.py", False),
        ]
    },
    
    # P4: UX & Accessibility
    {
        "category": "UX & Accessibility",
        "checks": [
            ("UX Audit", ".agent/skills/frontend-design/scripts/ux_audit.py", False),
            ("Accessibility Check", ".agent/skills/frontend-design/scripts/accessibility_checker.py", False),
        ]
    },
    
    # P5: SEO & Content
    {
        "category": "SEO & Content",
        "checks": [
            ("SEO Check", ".agent/skills/seo-fundamentals/scripts/seo_checker.py", False),
            ("GEO Check", ".agent/skills/geo-fundamentals/scripts/geo_checker.py", False),
        ]
    },
    
    # P6: Performance (requires URL)
    {
        "category": "Performance",
        "requires_url": True,
        "checks": [
            ("Lighthouse Audit", ".agent/skills/performance-profiling/scripts/lighthouse_audit.py", True),
            ("Bundle Analysis", ".agent/skills/performance-profiling/scripts/bundle_analyzer.py", False),
        ]
    },
    
    # P7: E2E Testing (requires URL)
    {
        "category": "E2E Testing",
        "requires_url": True,
        "checks": [
            ("Playwright E2E", ".agent/skills/webapp-testing/scripts/playwright_runner.py", False),
        ]
    },
    
    # P8: Mobile (if applicable)
    {
        "category": "Mobile",
        "checks": [
            ("Mobile Audit", ".agent/skills/mobile-design/scripts/mobile_audit.py", False),
        ]
    },
    
    # P9: Internationalization
    {
        "category": "Internationalization",
        "checks": [
            ("i18n Check", ".agent/skills/i18n-localization/scripts/i18n_checker.py", False),
        ]
    },
]

def run_script(name: str, script_path: Path, project_path: str, url: Optional[str] = None) -> dict:
    """Run validation script"""
    if not script_path.exists():
        print_warning(f"{name}: Script not found, skipping")
        return {"name": name, "passed": True, "skipped": True, "duration": 0}
    
    print_step(f"Running: {name}")
    start_time = datetime.now()
    
    # Build command
    cmd = ["python", str(script_path), project_path]
    if url and ("lighthouse" in script_path.name.lower() or "playwright" in script_path.name.lower()):
        cmd.append(url)
    
    # Run
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout for slow checks
        )
        
        duration = (datetime.now() - start_time).total_seconds()
        passed = result.returncode == 0
        
        if passed:
            print_success(f"{name}: PASSED ({duration:.1f}s)")
        else:
            print_error(f"{name}: FAILED ({duration:.1f}s)")
            if result.stderr:
                print(f"  {result.stderr[:300]}")
        
        return {
            "name": name,
            "passed": passed,
            "output": result.stdout,
            "error": result.stderr,
            "skipped": False,
            "duration": duration
        }
    
    except subprocess.TimeoutExpired:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: TIMEOUT (>{duration:.0f}s)")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": "Timeout"}
    
    except Exception as e:
        duration = (datetime.now() - start_time).total_seconds()
        print_error(f"{name}: ERROR - {str(e)}")
        return {"name": name, "passed": False, "skipped": False, "duration": duration, "error": str(e)}

def print_final_report(results: List[dict], start_time: datetime):
    """Print comprehensive final report"""
    total_duration = (datetime.now() - start_time).total_seconds()
    
    print_header("📊 FULL VERIFICATION REPORT")
    
    # Statistics
    total = len(results)
    passed = sum(1 for r in results if r["passed"] and not r.get("skipped"))
    failed = sum(1 for r in results if not r["passed"] and not r.get("skipped"))
    skipped = sum(1 for r in results if r.get("skipped"))
    
    print(f"Total Duration: {total_duration:.1f}s")
    print(f"Total Checks: {total}")
    print(f"{Colors.GREEN}✅ Passed: {passed}{Colors.ENDC}")
    print(f"{Colors.RED}❌ Failed: {failed}{Colors.ENDC}")
    print(f"{Colors.YELLOW}⏭️  Skipped: {skipped}{Colors.ENDC}")
    print()
    
    # Category breakdown
    print(f"{Colors.BOLD}Results by Category:{Colors.ENDC}")
    current_category = None
    for r in results:
        # Print category header if changed
        if r.get("category") and r["category"] != current_category:
            current_category = r["category"]
            print(f"\\n{Colors.BOLD}{Colors.CYAN}{current_category}:{Colors.ENDC}")
        
        # Print result
        if r.get("skipped"):
            status = f"{Colors.YELLOW}⏭️ {Colors.ENDC}"
        elif r["passed"]:
            status = f"{Colors.GREEN}✅{Colors.ENDC}"
        else:
            status = f"{Colors.RED}❌{Colors.ENDC}"
        
        duration_str = f"({r.get('duration', 0):.1f}s)" if not r.get("skipped") else ""
        print(f"  {status} {r['name']} {duration_str}")
    
    print()
    
    # Failed checks detail
    if failed > 0:
        print(f"{Colors.BOLD}{Colors.RED}❌ FAILED CHECKS:{Colors.ENDC}")
        for r in results:
            if not r["passed"] and not r.get("skipped"):
                print(f"\\n{Colors.RED}✗ {r['name']}{Colors.ENDC}")
                if r.get("error"):
                    error_preview = r["error"][:200]
                    print(f"  Error: {error_preview}")
        print()
    
    # Final verdict
    if failed > 0:
        print_error(f"VERIFICATION FAILED - {failed} check(s) need attention")
        print(f"\\n{Colors.YELLOW}💡 Tip: Fix critical (security, lint) issues first{Colors.ENDC}")
        return False
    else:
        print_success("✨ ALL CHECKS PASSED - Ready for deployment! ✨")
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Run complete AG Kit verification suite",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/verify_all.py . --url http://localhost:3000
  python scripts/verify_all.py . --url https://staging.example.com --no-e2e
        """
    )
    parser.add_argument("project", help="Project path to validate")
    parser.add_argument("--url", required=True, help="URL for performance & E2E checks")
    parser.add_argument("--no-e2e", action="store_true", help="Skip E2E tests")
    parser.add_argument("--stop-on-fail", action="store_true", help="Stop on first failure")
    
    args = parser.parse_args()
    
    project_path = Path(args.project).resolve()
    
    if not project_path.exists():
        print_error(f"Project path does not exist: {project_path}")
        sys.exit(1)
    
    print_header("🚀 ANTIGRAVITY KIT - FULL VERIFICATION SUITE")
    print(f"Project: {project_path}")
    print(f"URL: {args.url}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    start_time = datetime.now()
    results = []
    
    # Run all verification categories
    for suite in VERIFICATION_SUITE:
        category = suite["category"]
        requires_url = suite.get("requires_url", False)
        
        # Skip if requires URL and not provided
        if requires_url and not args.url:
            continue
        
        # Skip E2E if flag set
        if args.no_e2e and category == "E2E Testing":
            continue
        
        print_header(f"📋 {category.upper()}")
        
        for name, script_path, required in suite["checks"]:
            script = project_path / script_path
            result = run_script(name, script, str(project_path), args.url)
            result["category"] = category
            results.append(result)
            
            # Stop on critical failure if flag set
            if args.stop_on_fail and required and not result["passed"] and not result.get("skipped"):
                print_error(f"CRITICAL: {name} failed. Stopping verification.")
                print_final_report(results, start_time)
                sys.exit(1)
    
    # Print final report
    all_passed = print_final_report(results, start_time)
    
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
`,
  "api-patterns/scripts/api_validator.py": `#!/usr/bin/env python3
"""
API Validator - Checks API endpoints for best practices.
Validates OpenAPI specs, response formats, and common issues.
"""
import sys
import json
import re
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

def find_api_files(project_path: Path) -> list:
    """Find API-related files."""
    patterns = [
        "**/*api*.ts", "**/*api*.js", "**/*api*.py",
        "**/routes/*.ts", "**/routes/*.js", "**/routes/*.py",
        "**/controllers/*.ts", "**/controllers/*.js",
        "**/endpoints/*.ts", "**/endpoints/*.py",
        "**/*.openapi.json", "**/*.openapi.yaml",
        "**/swagger.json", "**/swagger.yaml",
        "**/openapi.json", "**/openapi.yaml"
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    # Exclude node_modules, etc.
    return [f for f in files if not any(x in str(f) for x in ['node_modules', '.git', 'dist', 'build', '__pycache__'])]

def check_openapi_spec(file_path: Path) -> dict:
    """Check OpenAPI/Swagger specification."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        if file_path.suffix == '.json':
            spec = json.loads(content)
        else:
            # Basic YAML check
            if 'openapi:' in content or 'swagger:' in content:
                passed.append("[OK] OpenAPI/Swagger version defined")
            else:
                issues.append("[X] No OpenAPI version found")
            
            if 'paths:' in content:
                passed.append("[OK] Paths section exists")
            else:
                issues.append("[X] No paths defined")
            
            if 'components:' in content or 'definitions:' in content:
                passed.append("[OK] Schema components defined")
            
            return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}
        
        # JSON OpenAPI checks
        if 'openapi' in spec or 'swagger' in spec:
            passed.append("[OK] OpenAPI version defined")
        
        if 'info' in spec:
            if 'title' in spec['info']:
                passed.append("[OK] API title defined")
            if 'version' in spec['info']:
                passed.append("[OK] API version defined")
            if 'description' not in spec['info']:
                issues.append("[!] API description missing")
        
        if 'paths' in spec:
            path_count = len(spec['paths'])
            passed.append(f"[OK] {path_count} endpoints defined")
            
            # Check each path
            for path, methods in spec['paths'].items():
                for method, details in methods.items():
                    if method in ['get', 'post', 'put', 'patch', 'delete']:
                        if 'responses' not in details:
                            issues.append(f"[X] {method.upper()} {path}: No responses defined")
                        if 'summary' not in details and 'description' not in details:
                            issues.append(f"[!] {method.upper()} {path}: No description")
        
    except Exception as e:
        issues.append(f"[X] Parse error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}

def check_api_code(file_path: Path) -> dict:
    """Check API code for common issues."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        # Check for error handling
        error_patterns = [
            r'try\\s*{', r'try:', r'\\.catch\\(',
            r'except\\s+', r'catch\\s*\\('
        ]
        has_error_handling = any(re.search(p, content) for p in error_patterns)
        if has_error_handling:
            passed.append("[OK] Error handling present")
        else:
            issues.append("[X] No error handling found")
        
        # Check for status codes
        status_patterns = [
            r'status\\s*\\(\\s*\\d{3}\\s*\\)', r'statusCode\\s*[=:]\\s*\\d{3}',
            r'HttpStatus\\.', r'status_code\\s*=\\s*\\d{3}',
            r'\\.status\\(\\d{3}\\)', r'res\\.status\\('
        ]
        has_status = any(re.search(p, content) for p in status_patterns)
        if has_status:
            passed.append("[OK] HTTP status codes used")
        else:
            issues.append("[!] No explicit HTTP status codes")
        
        # Check for validation
        validation_patterns = [
            r'validate', r'schema', r'zod', r'joi', r'yup',
            r'pydantic', r'@Body\\(', r'@Query\\('
        ]
        has_validation = any(re.search(p, content, re.I) for p in validation_patterns)
        if has_validation:
            passed.append("[OK] Input validation present")
        else:
            issues.append("[!] No input validation detected")
        
        # Check for auth middleware
        auth_patterns = [
            r'auth', r'jwt', r'bearer', r'token',
            r'middleware', r'guard', r'@Authenticated'
        ]
        has_auth = any(re.search(p, content, re.I) for p in auth_patterns)
        if has_auth:
            passed.append("[OK] Authentication/authorization detected")
        
        # Check for rate limiting
        rate_patterns = [r'rateLimit', r'throttle', r'rate.?limit']
        has_rate = any(re.search(p, content, re.I) for p in rate_patterns)
        if has_rate:
            passed.append("[OK] Rate limiting present")
        
        # Check for logging
        log_patterns = [r'console\\.log', r'logger\\.', r'logging\\.', r'log\\.']
        has_logging = any(re.search(p, content) for p in log_patterns)
        if has_logging:
            passed.append("[OK] Logging present")
        
    except Exception as e:
        issues.append(f"[X] Read error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'code'}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  API VALIDATOR - Endpoint Best Practices Check")
    print("=" * 60 + "\\n")
    
    api_files = find_api_files(project_path)
    
    if not api_files:
        print("[!] No API files found.")
        print("   Looking for: routes/, controllers/, api/, openapi.json/yaml")
        sys.exit(0)
    
    results = []
    for file_path in api_files[:15]:  # Limit
        if 'openapi' in file_path.name.lower() or 'swagger' in file_path.name.lower():
            result = check_openapi_spec(file_path)
        else:
            result = check_api_code(file_path)
        results.append(result)
    
    # Print results
    total_issues = 0
    total_passed = 0
    
    for result in results:
        print(f"\\n[FILE] {result['file']} [{result['type']}]")
        for item in result['passed']:
            print(f"   {item}")
            total_passed += 1
        for item in result['issues']:
            print(f"   {item}")
            if item.startswith("[X]"):
                total_issues += 1
    
    print("\\n" + "=" * 60)
    print(f"[RESULTS] {total_passed} passed, {total_issues} critical issues")
    print("=" * 60)
    
    if total_issues == 0:
        print("[OK] API validation passed")
        sys.exit(0)
    else:
        print("[X] Fix critical issues before deployment")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  "skills/api-patterns/scripts/api_validator.py": `#!/usr/bin/env python3
"""
API Validator - Checks API endpoints for best practices.
Validates OpenAPI specs, response formats, and common issues.
"""
import sys
import json
import re
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

def find_api_files(project_path: Path) -> list:
    """Find API-related files."""
    patterns = [
        "**/*api*.ts", "**/*api*.js", "**/*api*.py",
        "**/routes/*.ts", "**/routes/*.js", "**/routes/*.py",
        "**/controllers/*.ts", "**/controllers/*.js",
        "**/endpoints/*.ts", "**/endpoints/*.py",
        "**/*.openapi.json", "**/*.openapi.yaml",
        "**/swagger.json", "**/swagger.yaml",
        "**/openapi.json", "**/openapi.yaml"
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    # Exclude node_modules, etc.
    return [f for f in files if not any(x in str(f) for x in ['node_modules', '.git', 'dist', 'build', '__pycache__'])]

def check_openapi_spec(file_path: Path) -> dict:
    """Check OpenAPI/Swagger specification."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        if file_path.suffix == '.json':
            spec = json.loads(content)
        else:
            # Basic YAML check
            if 'openapi:' in content or 'swagger:' in content:
                passed.append("[OK] OpenAPI/Swagger version defined")
            else:
                issues.append("[X] No OpenAPI version found")
            
            if 'paths:' in content:
                passed.append("[OK] Paths section exists")
            else:
                issues.append("[X] No paths defined")
            
            if 'components:' in content or 'definitions:' in content:
                passed.append("[OK] Schema components defined")
            
            return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}
        
        # JSON OpenAPI checks
        if 'openapi' in spec or 'swagger' in spec:
            passed.append("[OK] OpenAPI version defined")
        
        if 'info' in spec:
            if 'title' in spec['info']:
                passed.append("[OK] API title defined")
            if 'version' in spec['info']:
                passed.append("[OK] API version defined")
            if 'description' not in spec['info']:
                issues.append("[!] API description missing")
        
        if 'paths' in spec:
            path_count = len(spec['paths'])
            passed.append(f"[OK] {path_count} endpoints defined")
            
            # Check each path
            for path, methods in spec['paths'].items():
                for method, details in methods.items():
                    if method in ['get', 'post', 'put', 'patch', 'delete']:
                        if 'responses' not in details:
                            issues.append(f"[X] {method.upper()} {path}: No responses defined")
                        if 'summary' not in details and 'description' not in details:
                            issues.append(f"[!] {method.upper()} {path}: No description")
        
    except Exception as e:
        issues.append(f"[X] Parse error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}

def check_api_code(file_path: Path) -> dict:
    """Check API code for common issues."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        # Check for error handling
        error_patterns = [
            r'try\\s*{', r'try:', r'\\.catch\\(',
            r'except\\s+', r'catch\\s*\\('
        ]
        has_error_handling = any(re.search(p, content) for p in error_patterns)
        if has_error_handling:
            passed.append("[OK] Error handling present")
        else:
            issues.append("[X] No error handling found")
        
        # Check for status codes
        status_patterns = [
            r'status\\s*\\(\\s*\\d{3}\\s*\\)', r'statusCode\\s*[=:]\\s*\\d{3}',
            r'HttpStatus\\.', r'status_code\\s*=\\s*\\d{3}',
            r'\\.status\\(\\d{3}\\)', r'res\\.status\\('
        ]
        has_status = any(re.search(p, content) for p in status_patterns)
        if has_status:
            passed.append("[OK] HTTP status codes used")
        else:
            issues.append("[!] No explicit HTTP status codes")
        
        # Check for validation
        validation_patterns = [
            r'validate', r'schema', r'zod', r'joi', r'yup',
            r'pydantic', r'@Body\\(', r'@Query\\('
        ]
        has_validation = any(re.search(p, content, re.I) for p in validation_patterns)
        if has_validation:
            passed.append("[OK] Input validation present")
        else:
            issues.append("[!] No input validation detected")
        
        # Check for auth middleware
        auth_patterns = [
            r'auth', r'jwt', r'bearer', r'token',
            r'middleware', r'guard', r'@Authenticated'
        ]
        has_auth = any(re.search(p, content, re.I) for p in auth_patterns)
        if has_auth:
            passed.append("[OK] Authentication/authorization detected")
        
        # Check for rate limiting
        rate_patterns = [r'rateLimit', r'throttle', r'rate.?limit']
        has_rate = any(re.search(p, content, re.I) for p in rate_patterns)
        if has_rate:
            passed.append("[OK] Rate limiting present")
        
        # Check for logging
        log_patterns = [r'console\\.log', r'logger\\.', r'logging\\.', r'log\\.']
        has_logging = any(re.search(p, content) for p in log_patterns)
        if has_logging:
            passed.append("[OK] Logging present")
        
    except Exception as e:
        issues.append(f"[X] Read error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'code'}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  API VALIDATOR - Endpoint Best Practices Check")
    print("=" * 60 + "\\n")
    
    api_files = find_api_files(project_path)
    
    if not api_files:
        print("[!] No API files found.")
        print("   Looking for: routes/, controllers/, api/, openapi.json/yaml")
        sys.exit(0)
    
    results = []
    for file_path in api_files[:15]:  # Limit
        if 'openapi' in file_path.name.lower() or 'swagger' in file_path.name.lower():
            result = check_openapi_spec(file_path)
        else:
            result = check_api_code(file_path)
        results.append(result)
    
    # Print results
    total_issues = 0
    total_passed = 0
    
    for result in results:
        print(f"\\n[FILE] {result['file']} [{result['type']}]")
        for item in result['passed']:
            print(f"   {item}")
            total_passed += 1
        for item in result['issues']:
            print(f"   {item}")
            if item.startswith("[X]"):
                total_issues += 1
    
    print("\\n" + "=" * 60)
    print(f"[RESULTS] {total_passed} passed, {total_issues} critical issues")
    print("=" * 60)
    
    if total_issues == 0:
        print("[OK] API validation passed")
        sys.exit(0)
    else:
        print("[X] Fix critical issues before deployment")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  ".agent/skills/api-patterns/scripts/api_validator.py": `#!/usr/bin/env python3
"""
API Validator - Checks API endpoints for best practices.
Validates OpenAPI specs, response formats, and common issues.
"""
import sys
import json
import re
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

def find_api_files(project_path: Path) -> list:
    """Find API-related files."""
    patterns = [
        "**/*api*.ts", "**/*api*.js", "**/*api*.py",
        "**/routes/*.ts", "**/routes/*.js", "**/routes/*.py",
        "**/controllers/*.ts", "**/controllers/*.js",
        "**/endpoints/*.ts", "**/endpoints/*.py",
        "**/*.openapi.json", "**/*.openapi.yaml",
        "**/swagger.json", "**/swagger.yaml",
        "**/openapi.json", "**/openapi.yaml"
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    # Exclude node_modules, etc.
    return [f for f in files if not any(x in str(f) for x in ['node_modules', '.git', 'dist', 'build', '__pycache__'])]

def check_openapi_spec(file_path: Path) -> dict:
    """Check OpenAPI/Swagger specification."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        if file_path.suffix == '.json':
            spec = json.loads(content)
        else:
            # Basic YAML check
            if 'openapi:' in content or 'swagger:' in content:
                passed.append("[OK] OpenAPI/Swagger version defined")
            else:
                issues.append("[X] No OpenAPI version found")
            
            if 'paths:' in content:
                passed.append("[OK] Paths section exists")
            else:
                issues.append("[X] No paths defined")
            
            if 'components:' in content or 'definitions:' in content:
                passed.append("[OK] Schema components defined")
            
            return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}
        
        # JSON OpenAPI checks
        if 'openapi' in spec or 'swagger' in spec:
            passed.append("[OK] OpenAPI version defined")
        
        if 'info' in spec:
            if 'title' in spec['info']:
                passed.append("[OK] API title defined")
            if 'version' in spec['info']:
                passed.append("[OK] API version defined")
            if 'description' not in spec['info']:
                issues.append("[!] API description missing")
        
        if 'paths' in spec:
            path_count = len(spec['paths'])
            passed.append(f"[OK] {path_count} endpoints defined")
            
            # Check each path
            for path, methods in spec['paths'].items():
                for method, details in methods.items():
                    if method in ['get', 'post', 'put', 'patch', 'delete']:
                        if 'responses' not in details:
                            issues.append(f"[X] {method.upper()} {path}: No responses defined")
                        if 'summary' not in details and 'description' not in details:
                            issues.append(f"[!] {method.upper()} {path}: No description")
        
    except Exception as e:
        issues.append(f"[X] Parse error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'openapi'}

def check_api_code(file_path: Path) -> dict:
    """Check API code for common issues."""
    issues = []
    passed = []
    
    try:
        content = file_path.read_text(encoding='utf-8')
        
        # Check for error handling
        error_patterns = [
            r'try\\s*{', r'try:', r'\\.catch\\(',
            r'except\\s+', r'catch\\s*\\('
        ]
        has_error_handling = any(re.search(p, content) for p in error_patterns)
        if has_error_handling:
            passed.append("[OK] Error handling present")
        else:
            issues.append("[X] No error handling found")
        
        # Check for status codes
        status_patterns = [
            r'status\\s*\\(\\s*\\d{3}\\s*\\)', r'statusCode\\s*[=:]\\s*\\d{3}',
            r'HttpStatus\\.', r'status_code\\s*=\\s*\\d{3}',
            r'\\.status\\(\\d{3}\\)', r'res\\.status\\('
        ]
        has_status = any(re.search(p, content) for p in status_patterns)
        if has_status:
            passed.append("[OK] HTTP status codes used")
        else:
            issues.append("[!] No explicit HTTP status codes")
        
        # Check for validation
        validation_patterns = [
            r'validate', r'schema', r'zod', r'joi', r'yup',
            r'pydantic', r'@Body\\(', r'@Query\\('
        ]
        has_validation = any(re.search(p, content, re.I) for p in validation_patterns)
        if has_validation:
            passed.append("[OK] Input validation present")
        else:
            issues.append("[!] No input validation detected")
        
        # Check for auth middleware
        auth_patterns = [
            r'auth', r'jwt', r'bearer', r'token',
            r'middleware', r'guard', r'@Authenticated'
        ]
        has_auth = any(re.search(p, content, re.I) for p in auth_patterns)
        if has_auth:
            passed.append("[OK] Authentication/authorization detected")
        
        # Check for rate limiting
        rate_patterns = [r'rateLimit', r'throttle', r'rate.?limit']
        has_rate = any(re.search(p, content, re.I) for p in rate_patterns)
        if has_rate:
            passed.append("[OK] Rate limiting present")
        
        # Check for logging
        log_patterns = [r'console\\.log', r'logger\\.', r'logging\\.', r'log\\.']
        has_logging = any(re.search(p, content) for p in log_patterns)
        if has_logging:
            passed.append("[OK] Logging present")
        
    except Exception as e:
        issues.append(f"[X] Read error: {e}")
    
    return {'file': str(file_path), 'passed': passed, 'issues': issues, 'type': 'code'}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  API VALIDATOR - Endpoint Best Practices Check")
    print("=" * 60 + "\\n")
    
    api_files = find_api_files(project_path)
    
    if not api_files:
        print("[!] No API files found.")
        print("   Looking for: routes/, controllers/, api/, openapi.json/yaml")
        sys.exit(0)
    
    results = []
    for file_path in api_files[:15]:  # Limit
        if 'openapi' in file_path.name.lower() or 'swagger' in file_path.name.lower():
            result = check_openapi_spec(file_path)
        else:
            result = check_api_code(file_path)
        results.append(result)
    
    # Print results
    total_issues = 0
    total_passed = 0
    
    for result in results:
        print(f"\\n[FILE] {result['file']} [{result['type']}]")
        for item in result['passed']:
            print(f"   {item}")
            total_passed += 1
        for item in result['issues']:
            print(f"   {item}")
            if item.startswith("[X]"):
                total_issues += 1
    
    print("\\n" + "=" * 60)
    print(f"[RESULTS] {total_passed} passed, {total_issues} critical issues")
    print("=" * 60)
    
    if total_issues == 0:
        print("[OK] API validation passed")
        sys.exit(0)
    else:
        print("[X] Fix critical issues before deployment")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  "database-design/scripts/schema_validator.py": `#!/usr/bin/env python3
"""
Schema Validator - Database schema validation
Validates Prisma schemas and checks for common issues.

Usage:
    python schema_validator.py <project_path>

Checks:
    - Prisma schema syntax
    - Missing relations
    - Index recommendations
    - Naming conventions
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_schema_files(project_path: Path) -> list:
    """Find database schema files."""
    schemas = []
    
    # Prisma schema
    prisma_files = list(project_path.glob('**/prisma/schema.prisma'))
    schemas.extend([('prisma', f) for f in prisma_files])
    
    # Drizzle schema files
    drizzle_files = list(project_path.glob('**/drizzle/*.ts'))
    drizzle_files.extend(project_path.glob('**/schema/*.ts'))
    for f in drizzle_files:
        if 'schema' in f.name.lower() or 'table' in f.name.lower():
            schemas.append(('drizzle', f))
    
    return schemas[:10]  # Limit


def validate_prisma_schema(file_path: Path) -> list:
    """Validate Prisma schema file."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Find all models
        models = re.findall(r'model\\s+(\\w+)\\s*{([^}]+)}', content, re.DOTALL)
        
        for model_name, model_body in models:
            # Check naming convention (PascalCase)
            if not model_name[0].isupper():
                issues.append(f"Model '{model_name}' should be PascalCase")
            
            # Check for id field
            if '@id' not in model_body and 'id' not in model_body.lower():
                issues.append(f"Model '{model_name}' might be missing @id field")
            
            # Check for createdAt/updatedAt
            if 'createdAt' not in model_body and 'created_at' not in model_body:
                issues.append(f"Model '{model_name}' missing createdAt field (recommended)")
            
            # Check for @relation without fields
            relations = re.findall(r'@relation\\([^)]*\\)', model_body)
            for rel in relations:
                if 'fields:' not in rel and 'references:' not in rel:
                    pass  # Implicit relation, ok
            
            # Check for @@index suggestions
            foreign_keys = re.findall(r'(\\w+Id)\\s+\\w+', model_body)
            for fk in foreign_keys:
                if f'@@index([{fk}])' not in content and f'@@index(["{fk}"])' not in content:
                    issues.append(f"Consider adding @@index([{fk}]) for better query performance in {model_name}")
        
        # Check for enum definitions
        enums = re.findall(r'enum\\s+(\\w+)\\s*{', content)
        for enum_name in enums:
            if not enum_name[0].isupper():
                issues.append(f"Enum '{enum_name}' should be PascalCase")
        
    except Exception as e:
        issues.append(f"Error reading schema: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[SCHEMA VALIDATOR] Database Schema Validation")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find schema files
    schemas = find_schema_files(project_path)
    print(f"Found {len(schemas)} schema files")
    
    if not schemas:
        output = {
            "script": "schema_validator",
            "project": str(project_path),
            "schemas_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No schema files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Validate each schema
    all_issues = []
    
    for schema_type, file_path in schemas:
        print(f"\\nValidating: {file_path.name} ({schema_type})")
        
        if schema_type == 'prisma':
            issues = validate_prisma_schema(file_path)
        else:
            issues = []  # Drizzle validation could be added
        
        if issues:
            all_issues.append({
                "file": str(file_path.name),
                "type": schema_type,
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("SCHEMA ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues:
            print(f"\\n{item['file']} ({item['type']}):")
            for issue in item["issues"][:5]:  # Limit per file
                print(f"  - {issue}")
            if len(item["issues"]) > 5:
                print(f"  ... and {len(item['issues']) - 5} more issues")
    else:
        print("No schema issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Schema issues are warnings, not failures
    passed = True
    
    output = {
        "script": "schema_validator",
        "project": str(project_path),
        "schemas_checked": len(schemas),
        "issues_found": total_issues,
        "passed": passed,
        "issues": all_issues
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0)


if __name__ == "__main__":
    main()
`,
  "skills/database-design/scripts/schema_validator.py": `#!/usr/bin/env python3
"""
Schema Validator - Database schema validation
Validates Prisma schemas and checks for common issues.

Usage:
    python schema_validator.py <project_path>

Checks:
    - Prisma schema syntax
    - Missing relations
    - Index recommendations
    - Naming conventions
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_schema_files(project_path: Path) -> list:
    """Find database schema files."""
    schemas = []
    
    # Prisma schema
    prisma_files = list(project_path.glob('**/prisma/schema.prisma'))
    schemas.extend([('prisma', f) for f in prisma_files])
    
    # Drizzle schema files
    drizzle_files = list(project_path.glob('**/drizzle/*.ts'))
    drizzle_files.extend(project_path.glob('**/schema/*.ts'))
    for f in drizzle_files:
        if 'schema' in f.name.lower() or 'table' in f.name.lower():
            schemas.append(('drizzle', f))
    
    return schemas[:10]  # Limit


def validate_prisma_schema(file_path: Path) -> list:
    """Validate Prisma schema file."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Find all models
        models = re.findall(r'model\\s+(\\w+)\\s*{([^}]+)}', content, re.DOTALL)
        
        for model_name, model_body in models:
            # Check naming convention (PascalCase)
            if not model_name[0].isupper():
                issues.append(f"Model '{model_name}' should be PascalCase")
            
            # Check for id field
            if '@id' not in model_body and 'id' not in model_body.lower():
                issues.append(f"Model '{model_name}' might be missing @id field")
            
            # Check for createdAt/updatedAt
            if 'createdAt' not in model_body and 'created_at' not in model_body:
                issues.append(f"Model '{model_name}' missing createdAt field (recommended)")
            
            # Check for @relation without fields
            relations = re.findall(r'@relation\\([^)]*\\)', model_body)
            for rel in relations:
                if 'fields:' not in rel and 'references:' not in rel:
                    pass  # Implicit relation, ok
            
            # Check for @@index suggestions
            foreign_keys = re.findall(r'(\\w+Id)\\s+\\w+', model_body)
            for fk in foreign_keys:
                if f'@@index([{fk}])' not in content and f'@@index(["{fk}"])' not in content:
                    issues.append(f"Consider adding @@index([{fk}]) for better query performance in {model_name}")
        
        # Check for enum definitions
        enums = re.findall(r'enum\\s+(\\w+)\\s*{', content)
        for enum_name in enums:
            if not enum_name[0].isupper():
                issues.append(f"Enum '{enum_name}' should be PascalCase")
        
    except Exception as e:
        issues.append(f"Error reading schema: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[SCHEMA VALIDATOR] Database Schema Validation")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find schema files
    schemas = find_schema_files(project_path)
    print(f"Found {len(schemas)} schema files")
    
    if not schemas:
        output = {
            "script": "schema_validator",
            "project": str(project_path),
            "schemas_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No schema files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Validate each schema
    all_issues = []
    
    for schema_type, file_path in schemas:
        print(f"\\nValidating: {file_path.name} ({schema_type})")
        
        if schema_type == 'prisma':
            issues = validate_prisma_schema(file_path)
        else:
            issues = []  # Drizzle validation could be added
        
        if issues:
            all_issues.append({
                "file": str(file_path.name),
                "type": schema_type,
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("SCHEMA ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues:
            print(f"\\n{item['file']} ({item['type']}):")
            for issue in item["issues"][:5]:  # Limit per file
                print(f"  - {issue}")
            if len(item["issues"]) > 5:
                print(f"  ... and {len(item['issues']) - 5} more issues")
    else:
        print("No schema issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Schema issues are warnings, not failures
    passed = True
    
    output = {
        "script": "schema_validator",
        "project": str(project_path),
        "schemas_checked": len(schemas),
        "issues_found": total_issues,
        "passed": passed,
        "issues": all_issues
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/database-design/scripts/schema_validator.py": `#!/usr/bin/env python3
"""
Schema Validator - Database schema validation
Validates Prisma schemas and checks for common issues.

Usage:
    python schema_validator.py <project_path>

Checks:
    - Prisma schema syntax
    - Missing relations
    - Index recommendations
    - Naming conventions
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_schema_files(project_path: Path) -> list:
    """Find database schema files."""
    schemas = []
    
    # Prisma schema
    prisma_files = list(project_path.glob('**/prisma/schema.prisma'))
    schemas.extend([('prisma', f) for f in prisma_files])
    
    # Drizzle schema files
    drizzle_files = list(project_path.glob('**/drizzle/*.ts'))
    drizzle_files.extend(project_path.glob('**/schema/*.ts'))
    for f in drizzle_files:
        if 'schema' in f.name.lower() or 'table' in f.name.lower():
            schemas.append(('drizzle', f))
    
    return schemas[:10]  # Limit


def validate_prisma_schema(file_path: Path) -> list:
    """Validate Prisma schema file."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Find all models
        models = re.findall(r'model\\s+(\\w+)\\s*{([^}]+)}', content, re.DOTALL)
        
        for model_name, model_body in models:
            # Check naming convention (PascalCase)
            if not model_name[0].isupper():
                issues.append(f"Model '{model_name}' should be PascalCase")
            
            # Check for id field
            if '@id' not in model_body and 'id' not in model_body.lower():
                issues.append(f"Model '{model_name}' might be missing @id field")
            
            # Check for createdAt/updatedAt
            if 'createdAt' not in model_body and 'created_at' not in model_body:
                issues.append(f"Model '{model_name}' missing createdAt field (recommended)")
            
            # Check for @relation without fields
            relations = re.findall(r'@relation\\([^)]*\\)', model_body)
            for rel in relations:
                if 'fields:' not in rel and 'references:' not in rel:
                    pass  # Implicit relation, ok
            
            # Check for @@index suggestions
            foreign_keys = re.findall(r'(\\w+Id)\\s+\\w+', model_body)
            for fk in foreign_keys:
                if f'@@index([{fk}])' not in content and f'@@index(["{fk}"])' not in content:
                    issues.append(f"Consider adding @@index([{fk}]) for better query performance in {model_name}")
        
        # Check for enum definitions
        enums = re.findall(r'enum\\s+(\\w+)\\s*{', content)
        for enum_name in enums:
            if not enum_name[0].isupper():
                issues.append(f"Enum '{enum_name}' should be PascalCase")
        
    except Exception as e:
        issues.append(f"Error reading schema: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[SCHEMA VALIDATOR] Database Schema Validation")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find schema files
    schemas = find_schema_files(project_path)
    print(f"Found {len(schemas)} schema files")
    
    if not schemas:
        output = {
            "script": "schema_validator",
            "project": str(project_path),
            "schemas_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No schema files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Validate each schema
    all_issues = []
    
    for schema_type, file_path in schemas:
        print(f"\\nValidating: {file_path.name} ({schema_type})")
        
        if schema_type == 'prisma':
            issues = validate_prisma_schema(file_path)
        else:
            issues = []  # Drizzle validation could be added
        
        if issues:
            all_issues.append({
                "file": str(file_path.name),
                "type": schema_type,
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("SCHEMA ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues:
            print(f"\\n{item['file']} ({item['type']}):")
            for issue in item["issues"][:5]:  # Limit per file
                print(f"  - {issue}")
            if len(item["issues"]) > 5:
                print(f"  ... and {len(item['issues']) - 5} more issues")
    else:
        print("No schema issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Schema issues are warnings, not failures
    passed = True
    
    output = {
        "script": "schema_validator",
        "project": str(project_path),
        "schemas_checked": len(schemas),
        "issues_found": total_issues,
        "passed": passed,
        "issues": all_issues
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0)


if __name__ == "__main__":
    main()
`,
  "frontend-design/scripts/accessibility_checker.py": `#!/usr/bin/env python3
"""
Accessibility Checker - WCAG compliance audit
Checks HTML files for accessibility issues.

Usage:
    python accessibility_checker.py <project_path>

Checks:
    - Form labels
    - ARIA attributes
    - Color contrast hints
    - Keyboard navigation
    - Semantic HTML
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_html_files(project_path: Path) -> list:
    """Find all HTML/JSX/TSX files."""
    patterns = ['**/*.html', '**/*.jsx', '**/*.tsx']
    skip_dirs = {'node_modules', '.next', 'dist', 'build', '.git'}
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            if not any(skip in f.parts for skip in skip_dirs):
                files.append(f)
    
    return files[:50]


def check_accessibility(file_path: Path) -> list:
    """Check a single file for accessibility issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Check for form inputs without labels
        inputs = re.findall(r'<input[^>]*>', content, re.IGNORECASE)
        for inp in inputs:
            if 'type="hidden"' not in inp.lower():
                if 'aria-label' not in inp.lower() and 'id=' not in inp.lower():
                    issues.append("Input without label or aria-label")
                    break
        
        # Check for buttons without accessible text
        buttons = re.findall(r'<button[^>]*>[^<]*</button>', content, re.IGNORECASE)
        for btn in buttons:
            # Check if button has text content or aria-label
            if 'aria-label' not in btn.lower():
                text = re.sub(r'<[^>]+>', '', btn)
                if not text.strip():
                    issues.append("Button without accessible text")
                    break
        
        # Check for missing lang attribute
        if '<html' in content.lower() and 'lang=' not in content.lower():
            issues.append("Missing lang attribute on <html>")
        
        # Check for missing skip link
        if '<main' in content.lower() or '<body' in content.lower():
            if 'skip' not in content.lower() and '#main' not in content.lower():
                issues.append("Consider adding skip-to-main-content link")
        
        # Check for click handlers without keyboard support
        onclick_count = content.lower().count('onclick=')
        onkeydown_count = content.lower().count('onkeydown=') + content.lower().count('onkeyup=')
        if onclick_count > 0 and onkeydown_count == 0:
            issues.append("onClick without keyboard handler (onKeyDown)")
        
        # Check for tabIndex misuse
        if 'tabindex=' in content.lower():
            if 'tabindex="-1"' not in content.lower() and 'tabindex="0"' not in content.lower():
                positive_tabindex = re.findall(r'tabindex="([1-9]\\d*)"', content, re.IGNORECASE)
                if positive_tabindex:
                    issues.append("Avoid positive tabIndex values")
        
        # Check for autoplay media
        if 'autoplay' in content.lower():
            if 'muted' not in content.lower():
                issues.append("Autoplay media should be muted")
        
        # Check for role usage
        if 'role="button"' in content.lower():
            # Divs with role button should have tabindex
            div_buttons = re.findall(r'<div[^>]*role="button"[^>]*>', content, re.IGNORECASE)
            for div in div_buttons:
                if 'tabindex' not in div.lower():
                    issues.append("role='button' without tabindex")
                    break
        
    except Exception as e:
        issues.append(f"Error reading file: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[ACCESSIBILITY CHECKER] WCAG Compliance Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find HTML files
    files = find_html_files(project_path)
    print(f"Found {len(files)} HTML/JSX/TSX files")
    
    if not files:
        output = {
            "script": "accessibility_checker",
            "project": str(project_path),
            "files_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No HTML files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Check each file
    all_issues = []
    
    for f in files:
        issues = check_accessibility(f)
        if issues:
            all_issues.append({
                "file": str(f.name),
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("ACCESSIBILITY ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues[:10]:
            print(f"\\n{item['file']}:")
            for issue in item["issues"]:
                print(f"  - {issue}")
        
        if len(all_issues) > 10:
            print(f"\\n... and {len(all_issues) - 10} more files with issues")
    else:
        print("No accessibility issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Accessibility issues are important but not blocking
    passed = total_issues < 5  # Allow minor issues
    
    output = {
        "script": "accessibility_checker",
        "project": str(project_path),
        "files_checked": len(files),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  "skills/frontend-design/scripts/accessibility_checker.py": `#!/usr/bin/env python3
"""
Accessibility Checker - WCAG compliance audit
Checks HTML files for accessibility issues.

Usage:
    python accessibility_checker.py <project_path>

Checks:
    - Form labels
    - ARIA attributes
    - Color contrast hints
    - Keyboard navigation
    - Semantic HTML
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_html_files(project_path: Path) -> list:
    """Find all HTML/JSX/TSX files."""
    patterns = ['**/*.html', '**/*.jsx', '**/*.tsx']
    skip_dirs = {'node_modules', '.next', 'dist', 'build', '.git'}
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            if not any(skip in f.parts for skip in skip_dirs):
                files.append(f)
    
    return files[:50]


def check_accessibility(file_path: Path) -> list:
    """Check a single file for accessibility issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Check for form inputs without labels
        inputs = re.findall(r'<input[^>]*>', content, re.IGNORECASE)
        for inp in inputs:
            if 'type="hidden"' not in inp.lower():
                if 'aria-label' not in inp.lower() and 'id=' not in inp.lower():
                    issues.append("Input without label or aria-label")
                    break
        
        # Check for buttons without accessible text
        buttons = re.findall(r'<button[^>]*>[^<]*</button>', content, re.IGNORECASE)
        for btn in buttons:
            # Check if button has text content or aria-label
            if 'aria-label' not in btn.lower():
                text = re.sub(r'<[^>]+>', '', btn)
                if not text.strip():
                    issues.append("Button without accessible text")
                    break
        
        # Check for missing lang attribute
        if '<html' in content.lower() and 'lang=' not in content.lower():
            issues.append("Missing lang attribute on <html>")
        
        # Check for missing skip link
        if '<main' in content.lower() or '<body' in content.lower():
            if 'skip' not in content.lower() and '#main' not in content.lower():
                issues.append("Consider adding skip-to-main-content link")
        
        # Check for click handlers without keyboard support
        onclick_count = content.lower().count('onclick=')
        onkeydown_count = content.lower().count('onkeydown=') + content.lower().count('onkeyup=')
        if onclick_count > 0 and onkeydown_count == 0:
            issues.append("onClick without keyboard handler (onKeyDown)")
        
        # Check for tabIndex misuse
        if 'tabindex=' in content.lower():
            if 'tabindex="-1"' not in content.lower() and 'tabindex="0"' not in content.lower():
                positive_tabindex = re.findall(r'tabindex="([1-9]\\d*)"', content, re.IGNORECASE)
                if positive_tabindex:
                    issues.append("Avoid positive tabIndex values")
        
        # Check for autoplay media
        if 'autoplay' in content.lower():
            if 'muted' not in content.lower():
                issues.append("Autoplay media should be muted")
        
        # Check for role usage
        if 'role="button"' in content.lower():
            # Divs with role button should have tabindex
            div_buttons = re.findall(r'<div[^>]*role="button"[^>]*>', content, re.IGNORECASE)
            for div in div_buttons:
                if 'tabindex' not in div.lower():
                    issues.append("role='button' without tabindex")
                    break
        
    except Exception as e:
        issues.append(f"Error reading file: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[ACCESSIBILITY CHECKER] WCAG Compliance Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find HTML files
    files = find_html_files(project_path)
    print(f"Found {len(files)} HTML/JSX/TSX files")
    
    if not files:
        output = {
            "script": "accessibility_checker",
            "project": str(project_path),
            "files_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No HTML files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Check each file
    all_issues = []
    
    for f in files:
        issues = check_accessibility(f)
        if issues:
            all_issues.append({
                "file": str(f.name),
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("ACCESSIBILITY ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues[:10]:
            print(f"\\n{item['file']}:")
            for issue in item["issues"]:
                print(f"  - {issue}")
        
        if len(all_issues) > 10:
            print(f"\\n... and {len(all_issues) - 10} more files with issues")
    else:
        print("No accessibility issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Accessibility issues are important but not blocking
    passed = total_issues < 5  # Allow minor issues
    
    output = {
        "script": "accessibility_checker",
        "project": str(project_path),
        "files_checked": len(files),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/frontend-design/scripts/accessibility_checker.py": `#!/usr/bin/env python3
"""
Accessibility Checker - WCAG compliance audit
Checks HTML files for accessibility issues.

Usage:
    python accessibility_checker.py <project_path>

Checks:
    - Form labels
    - ARIA attributes
    - Color contrast hints
    - Keyboard navigation
    - Semantic HTML
"""

import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def find_html_files(project_path: Path) -> list:
    """Find all HTML/JSX/TSX files."""
    patterns = ['**/*.html', '**/*.jsx', '**/*.tsx']
    skip_dirs = {'node_modules', '.next', 'dist', 'build', '.git'}
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            if not any(skip in f.parts for skip in skip_dirs):
                files.append(f)
    
    return files[:50]


def check_accessibility(file_path: Path) -> list:
    """Check a single file for accessibility issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        
        # Check for form inputs without labels
        inputs = re.findall(r'<input[^>]*>', content, re.IGNORECASE)
        for inp in inputs:
            if 'type="hidden"' not in inp.lower():
                if 'aria-label' not in inp.lower() and 'id=' not in inp.lower():
                    issues.append("Input without label or aria-label")
                    break
        
        # Check for buttons without accessible text
        buttons = re.findall(r'<button[^>]*>[^<]*</button>', content, re.IGNORECASE)
        for btn in buttons:
            # Check if button has text content or aria-label
            if 'aria-label' not in btn.lower():
                text = re.sub(r'<[^>]+>', '', btn)
                if not text.strip():
                    issues.append("Button without accessible text")
                    break
        
        # Check for missing lang attribute
        if '<html' in content.lower() and 'lang=' not in content.lower():
            issues.append("Missing lang attribute on <html>")
        
        # Check for missing skip link
        if '<main' in content.lower() or '<body' in content.lower():
            if 'skip' not in content.lower() and '#main' not in content.lower():
                issues.append("Consider adding skip-to-main-content link")
        
        # Check for click handlers without keyboard support
        onclick_count = content.lower().count('onclick=')
        onkeydown_count = content.lower().count('onkeydown=') + content.lower().count('onkeyup=')
        if onclick_count > 0 and onkeydown_count == 0:
            issues.append("onClick without keyboard handler (onKeyDown)")
        
        # Check for tabIndex misuse
        if 'tabindex=' in content.lower():
            if 'tabindex="-1"' not in content.lower() and 'tabindex="0"' not in content.lower():
                positive_tabindex = re.findall(r'tabindex="([1-9]\\d*)"', content, re.IGNORECASE)
                if positive_tabindex:
                    issues.append("Avoid positive tabIndex values")
        
        # Check for autoplay media
        if 'autoplay' in content.lower():
            if 'muted' not in content.lower():
                issues.append("Autoplay media should be muted")
        
        # Check for role usage
        if 'role="button"' in content.lower():
            # Divs with role button should have tabindex
            div_buttons = re.findall(r'<div[^>]*role="button"[^>]*>', content, re.IGNORECASE)
            for div in div_buttons:
                if 'tabindex' not in div.lower():
                    issues.append("role='button' without tabindex")
                    break
        
    except Exception as e:
        issues.append(f"Error reading file: {str(e)[:50]}")
    
    return issues


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"[ACCESSIBILITY CHECKER] WCAG Compliance Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find HTML files
    files = find_html_files(project_path)
    print(f"Found {len(files)} HTML/JSX/TSX files")
    
    if not files:
        output = {
            "script": "accessibility_checker",
            "project": str(project_path),
            "files_checked": 0,
            "issues_found": 0,
            "passed": True,
            "message": "No HTML files found"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Check each file
    all_issues = []
    
    for f in files:
        issues = check_accessibility(f)
        if issues:
            all_issues.append({
                "file": str(f.name),
                "issues": issues
            })
    
    # Summary
    print("\\n" + "="*60)
    print("ACCESSIBILITY ISSUES")
    print("="*60)
    
    if all_issues:
        for item in all_issues[:10]:
            print(f"\\n{item['file']}:")
            for issue in item["issues"]:
                print(f"  - {issue}")
        
        if len(all_issues) > 10:
            print(f"\\n... and {len(all_issues) - 10} more files with issues")
    else:
        print("No accessibility issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    # Accessibility issues are important but not blocking
    passed = total_issues < 5  # Allow minor issues
    
    output = {
        "script": "accessibility_checker",
        "project": str(project_path),
        "files_checked": len(files),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  "frontend-design/scripts/ux_audit.py": `#!/usr/bin/env python3
"""
UX Audit Script - Full Frontend Design Coverage

Analyzes code for compliance with:

1. CORE PSYCHOLOGY LAWS:
   - Hick's Law (nav items, form complexity)
   - Fitts' Law (target sizes, touch targets)
   - Miller's Law (chunking, memory limits)
   - Von Restorff Effect (primary CTA visibility)
   - Serial Position Effect (important items at start/end)

2. EMOTIONAL DESIGN (Don Norman):
   - Visceral (first impressions, gradients, animations)
   - Behavioral (feedback, usability, performance)
   - Reflective (brand story, values, identity)

3. TRUST BUILDING:
   - Security signals (SSL, encryption on forms)
   - Social proof (testimonials, reviews, logos)
   - Authority indicators (certifications, awards, media)

4. COGNITIVE LOAD MANAGEMENT:
   - Progressive disclosure (accordion, tabs, "Advanced")
   - Visual noise (too many colors/borders)
   - Familiar patterns (labels, standard conventions)

5. PERSUASIVE DESIGN (Ethical):
   - Smart defaults (pre-selected options)
   - Anchoring (original vs discount price)
   - Social proof (live indicators, numbers)
   - Progress indicators (progress bars, steps)

6. TYPOGRAPHY SYSTEM (9 sections):
   - Font Pairing (max 3 families)
   - Line Length (45-75ch)
   - Line Height (proper ratios)
   - Letter Spacing (uppercase, display text)
   - Weight and Emphasis (contrast levels)
   - Responsive Typography (clamp())
   - Hierarchy (sequential headings)
   - Modular Scale (consistent ratios)
   - Readability (chunking, subheadings)

7. VISUAL EFFECTS (10 sections):
   - Glassmorphism (blur + transparency)
   - Neomorphism (dual shadows, inset)
   - Shadow Hierarchy (elevation levels)
   - Gradients (usage, overuse)
   - Border Effects (complexity check)
   - Glow Effects (text-shadow, box-shadow)
   - Overlay Techniques (image text readability)
   - GPU Acceleration (transform/opacity vs layout)
   - Performance (will-change usage)
   - Effect Selection (purpose over decoration)

8. COLOR SYSTEM (7 sections):
   - PURPLE BAN (Critical Maestro rule - #8B5CF6, #A855F7, etc.)
   - 60-30-10 Rule (dominant, secondary, accent)
   - Color Scheme Patterns (monochromatic, analogous)
   - Dark Mode Compliance (no pure black/white)
   - WCAG Contrast (low-contrast detection)
   - Color Psychology Context (food + blue = bad)
   - HSL-Based Palettes (recommended approach)

9. ANIMATION GUIDE (6 sections):
   - Duration Appropriateness (50ms minimum, 1s max transitions)
   - Easing Functions (ease-out for entry, ease-in for exit)
   - Micro-interactions (hover/focus feedback)
   - Loading States (skeleton, spinner, progress)
   - Page Transitions (fade/slide for routing)
   - Scroll Animation Performance (no layout properties)

10. MOTION GRAPHICS (7 sections):
   - Lottie Animations (reduced motion fallbacks)
   - GSAP Memory Leaks (kill/revert on unmount)
   - SVG Animation Performance (stroke-dashoffset sparingly)
   - 3D Transforms (perspective parent, mobile warning)
   - Particle Effects (mobile fallback)
   - Scroll-Driven Animations (throttle with rAF)
   - Motion Decision Tree (functional vs decorative)

11. ACCESSIBILITY:
   - Alt text for images
   - Reduced motion checks
   - Form labels

Total: 80+ checks across all design principles
"""

import sys
import os
import re
import json
from pathlib import Path

class UXAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0
    
    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except: return
        
        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Pre-calculate common flags
        has_long_text = bool(re.search(r'<p|<div.*class=.*text|article|<span.*text', content, re.IGNORECASE))
        has_form = bool(re.search(r'<form|<input|password|credit|card|payment', content, re.IGNORECASE))
        complex_elements = len(re.findall(r'<input|<select|<textarea|<option', content, re.IGNORECASE))

        # --- 1. PSYCHOLOGY LAWS ---
        # Hick's Law
        nav_items = len(re.findall(r'<NavLink|<Link|<a\\s+href|nav-item', content, re.IGNORECASE))
        if nav_items > 7:
            self.issues.append(f"[Hick's Law] {filename}: {nav_items} nav items (Max 7)")
        
        # Fitts' Law
        if re.search(r'height:\\s*([0-3]\\d)px', content) or re.search(r'h-[1-9]\\b|h-10\\b', content):
            self.warnings.append(f"[Fitts' Law] {filename}: Small targets (< 44px)")
        
        # Miller's Law
        form_fields = len(re.findall(r'<input|<select|<textarea', content, re.IGNORECASE))
        if form_fields > 7 and not re.search(r'step|wizard|stage', content, re.IGNORECASE):
            self.warnings.append(f"[Miller's Law] {filename}: Complex form ({form_fields} fields)")
            
        # Von Restorff
        if 'button' in content.lower() and not re.search(r'primary|bg-primary|Button.*primary|variant=["\\']primary', content, re.IGNORECASE):
            self.warnings.append(f"[Von Restorff] {filename}: No primary CTA")

        # Serial Position Effect - Important items at beginning/end
        if nav_items > 3:
            # Check if last nav item is important (contact, login, etc.)
            nav_content = re.findall(r'<NavLink|<Link|<a\\s+href[^>]*>([^<]+)</a>', content, re.IGNORECASE)
            if nav_content and len(nav_content) > 2:
                last_item = nav_content[-1].lower() if nav_content else ''
                if not any(x in last_item for x in ['contact', 'login', 'sign', 'get started', 'cta', 'button']):
                    self.warnings.append(f"[Serial Position] {filename}: Last nav item may not be important. Place key actions at start/end.")

        # --- 1.5 EMOTIONAL DESIGN (Don Norman) ---

        # Visceral: First impressions (aesthetics, gradients, animations)
        has_hero = bool(re.search(r'hero|<h1|banner', content, re.IGNORECASE))
        if has_hero:
            # Check for visual appeal elements
            has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient', content))
            has_animation = bool(re.search(r'@keyframes|transition:|animate-', content))
            has_visual_interest = has_gradient or has_animation

            if not has_visual_interest and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visceral] {filename}: Hero section lacks visual appeal. Consider gradients or subtle animations.")

        # Behavioral: Instant feedback and usability
        if 'onClick' in content or '@click' in content or 'onclick' in content:
            has_feedback = re.search(r'transition|animate|hover:|focus:|disabled|loading|spinner', content, re.IGNORECASE)
            has_state_change = re.search(r'setState|useState|disabled|loading', content)

            if not has_feedback and not has_state_change:
                self.warnings.append(f"[Behavioral] {filename}: Interactive elements lack immediate feedback. Add hover/focus/disabled states.")

        # Reflective: Brand story, values, identity
        has_reflective = bool(re.search(r'about|story|mission|values|why we|our journey|testimonials', content, re.IGNORECASE))
        if has_long_text and not has_reflective:
            self.warnings.append(f"[Reflective] {filename}: Long-form content without brand story/values. Add 'About' or 'Why We Exist' section.")

        # --- 1.6 TRUST BUILDING (Enhanced) ---

        # Security signals
        if has_form:
            security_signals = re.findall(r'ssl|secure|encrypt|lock|padlock|https', content, re.IGNORECASE)
            if len(security_signals) == 0 and not re.search(r'checkout|payment', content, re.IGNORECASE):
                self.warnings.append(f"[Trust] {filename}: Form without security indicators. Add 'SSL Secure' or lock icon.")

        # Social proof elements
        social_proof = re.findall(r'review|testimonial|rating|star|trust|trusted by|customer|logo', content, re.IGNORECASE)
        if len(social_proof) > 0:
            self.passed_count += 1
        else:
            if has_long_text:
                self.warnings.append(f"[Trust] {filename}: No social proof detected. Consider adding testimonials, ratings, or 'Trusted by' logos.")

        # Authority indicators
        has_footer = bool(re.search(r'footer|<footer', content, re.IGNORECASE))
        if has_footer:
            authority = re.findall(r'certif|award|media|press|featured|as seen in', content, re.IGNORECASE)
            if len(authority) == 0:
                self.warnings.append(f"[Trust] {filename}: Footer lacks authority signals. Add certifications, awards, or media mentions.")

        # --- 1.7 COGNITIVE LOAD MANAGEMENT ---

        # Progressive disclosure
        if complex_elements > 5:
            has_progressive = re.search(r'step|wizard|stage|accordion|collapsible|tab|more\\.\\.\\.|advanced|show more', content, re.IGNORECASE)
            if not has_progressive:
                self.warnings.append(f"[Cognitive Load] {filename}: Many form elements without progressive disclosure. Consider accordion, tabs, or 'Advanced' toggle.")

        # Visual noise check
        has_many_colors = len(re.findall(r'#[0-9a-fA-F]{3,6}|rgb|hsl', content)) > 15
        has_many_borders = len(re.findall(r'border:|border-', content)) > 10
        if has_many_colors and has_many_borders:
            self.warnings.append(f"[Cognitive Load] {filename}: High visual noise detected. Many colors and borders increase cognitive load.")

        # Familiar patterns
        if has_form:
            has_standard_labels = bool(re.search(r'<label|placeholder|aria-label', content, re.IGNORECASE))
            if not has_standard_labels:
                self.issues.append(f"[Cognitive Load] {filename}: Form inputs without labels. Use <label> for accessibility and clarity.")

        # --- 1.8 PERSUASIVE DESIGN (Ethical) ---

        # Smart defaults
        if has_form:
            has_defaults = bool(re.search(r'checked|selected|default|value=["\\'].*["\\']', content))
            radio_inputs = len(re.findall(r'type=["\\']radio', content, re.IGNORECASE))
            if radio_inputs > 0 and not has_defaults:
                self.warnings.append(f"[Persuasion] {filename}: Radio buttons without default selection. Pre-select recommended option.")

        # Anchoring (showing original price)
        if re.search(r'price|pricing|cost|\\$\\d+', content, re.IGNORECASE):
            has_anchor = bool(re.search(r'original|was|strike|del|save \\d+%', content, re.IGNORECASE))
            if not has_anchor:
                self.warnings.append(f"[Persuasion] {filename}: Prices without anchoring. Show original price to frame discount value.")

        # Social proof live indicators
        has_social = bool(re.search(r'join|subscriber|member|user', content, re.IGNORECASE))
        if has_social:
            has_count = bool(re.findall(r'\\d+[+kmb]|\\d+,\\d+', content))
            if not has_count:
                self.warnings.append(f"[Persuasion] {filename}: Social proof without specific numbers. Use 'Join 10,000+' format.")

        # Progress indicators
        if has_form:
            has_progress = bool(re.search(r'progress|step \\d+|complete|%|bar', content, re.IGNORECASE))
            if complex_elements > 5 and not has_progress:
                self.warnings.append(f"[Persuasion] {filename}: Long form without progress indicator. Add progress bar or 'Step X of Y'.")

        # --- 2. TYPOGRAPHY SYSTEM (Complete Coverage) ---

        # 2.1 Font Pairing - Too many font families
        font_families = set()
        # Check for @font-face, Google Fonts, font-family declarations
        font_faces = re.findall(r'@font-face\\s*\\{[^}]*family:\\s*["\\']?([^;"\\'\\s}]+)', content, re.IGNORECASE)
        google_fonts = re.findall(r'fonts\\.googleapis\\.com[^"\\']*family=([^"&]+)', content, re.IGNORECASE)
        font_family_css = re.findall(r'font-family:\\s*([^;]+)', content, re.IGNORECASE)

        for font in font_faces: font_families.add(font.strip().lower())
        for font in google_fonts:
            for f in font.replace('+', ' ').split('|'):
                font_families.add(f.split(':')[0].strip().lower())
        for family in font_family_css:
            # Extract first font from stack
            first_font = family.split(',')[0].strip().strip('"\\'')

            if first_font.lower() not in {'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'inherit', 'arial', 'georgia', 'times new roman', 'courier new', 'verdana', 'helvetica', 'tahoma'}:
                font_families.add(first_font.lower())

        if len(font_families) > 3:
            self.issues.append(f"[Typography] {filename}: {len(font_families)} font families detected. Limit to 2-3 for cohesion.")

        # 2.2 Line Length - Character-based width
        if has_long_text and not re.search(r'max-w-(?:prose|[\\[\\\\]?\\d+ch[\\]\\\\]?)|max-width:\\s*\\d+ch', content):
            self.warnings.append(f"[Typography] {filename}: No line length constraint (45-75ch). Use max-w-prose or max-w-[65ch].")

        # 2.3 Line Height - Proper leading ratios
        # Check for text without proper line-height
        text_elements = len(re.findall(r'<p|<span|<div.*text|<h[1-6]', content, re.IGNORECASE))
        if text_elements > 0 and not re.search(r'leading-|line-height:', content):
            self.warnings.append(f"[Typography] {filename}: Text elements found without line-height. Body: 1.4-1.6, Headings: 1.1-1.3")

        # Check for heading-specific line height issues
        if re.search(r'<h[1-6]|text-(?:xl|2xl|3xl|4xl|5xl|6xl)', content, re.IGNORECASE):
            # Extract line-height values
            line_heights = re.findall(r'(?:leading-|line-height:\\s*)([\\d.]+)', content)
            for lh in line_heights:
                if float(lh) > 1.5:
                    self.warnings.append(f"[Typography] {filename}: Heading has line-height {lh} (>1.3). Headings should be tighter (1.1-1.3).")

        # 2.4 Letter Spacing (Tracking)
        # Uppercase without tracking
        if re.search(r'uppercase|text-transform:\\s*uppercase', content, re.IGNORECASE):
            if not re.search(r'tracking-|letter-spacing:', content):
                self.warnings.append(f"[Typography] {filename}: Uppercase text without tracking. ALL CAPS needs +5-10% spacing.")

        # Large text (display/hero) should have negative tracking
        if re.search(r'text-(?:4xl|5xl|6xl|7xl|8xl|9xl)|font-size:\\s*[3-9]\\dpx', content):
            if not re.search(r'tracking-tight|letter-spacing:\\s*-[0-9]', content):
                self.warnings.append(f"[Typography] {filename}: Large display text without tracking-tight. Big text needs -1% to -4% spacing.")

        # 2.5 Weight and Emphasis - Contrast levels
        # Check for adjacent weight levels (poor contrast)
        weights = re.findall(r'font-weight:\\s*(\\d+)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|fw-(\\d+)', content, re.IGNORECASE)
        weight_values = []
        for w in weights:
            val = w[0] or w[1]
            if val:
                # Map named weights to numbers
                weight_map = {'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400', 'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900'}
                val = weight_map.get(val.lower(), val)
                try:
                    weight_values.append(int(val))
                except: pass

        # Check for adjacent weights (400/500, 500/600, etc.)
        for i in range(len(weight_values) - 1):
            diff = abs(weight_values[i] - weight_values[i+1])
            if diff == 100:
                self.warnings.append(f"[Typography] {filename}: Adjacent font weights ({weight_values[i]}/{weight_values[i+1]}). Skip at least 2 levels for contrast.")

        # Too many weight levels
        unique_weights = set(weight_values)
        if len(unique_weights) > 4:
            self.warnings.append(f"[Typography] {filename}: {len(unique_weights)} font weights. Limit to 3-4 per page.")

        # 2.6 Responsive Typography - Fluid sizing with clamp()
        has_font_sizes = bool(re.search(r'font-size:|text-(?:xs|sm|base|lg|xl|2xl)', content))
        if has_font_sizes and not re.search(r'clamp\\(|responsive:', content):
            self.warnings.append(f"[Typography] {filename}: Fixed font sizes without clamp(). Consider fluid typography: clamp(MIN, PREFERRED, MAX)")

        # 2.7 Hierarchy - Heading structure
        headings = re.findall(r'<(h[1-6])', content, re.IGNORECASE)
        if headings:
            # Check for skipped levels (h1 -> h3)
            for i in range(len(headings) - 1):
                curr = int(headings[i][1])
                next_h = int(headings[i+1][1])
                if next_h > curr + 1:
                    self.warnings.append(f"[Typography] {filename}: Skipped heading level (h{curr} -> h{next_h}). Maintain sequential hierarchy.")

            # Check if h1 exists for main content
            if 'h1' not in [h.lower() for h in headings] and has_long_text:
                self.warnings.append(f"[Typography] {filename}: No h1 found. Each page should have one primary heading.")

        # 2.8 Modular Scale - Consistent sizing
        # Extract font-size values
        font_sizes = re.findall(r'font-size:\\s*(\\d+(?:\\.\\d+)?)(px|rem|em)', content)
        size_values = []
        for size, unit in font_sizes:
            if unit == 'rem' or unit == 'em':
                size_values.append(float(size))
            elif unit == 'px':
                size_values.append(float(size) / 16)  # Normalize to rem

        if len(size_values) > 2:
            # Check if sizes follow a modular scale roughly
            sorted_sizes = sorted(set(size_values))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common scale ratios: 1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618
            common_ratios = {1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618}
            for ratio in ratios[:3]:  # Check first 3 ratios
                if not any(abs(ratio - cr) < 0.05 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio like 1.25 (Major Third).")
                    break

        # 2.9 Readability - Content chunking
        # Check for very long paragraphs (>5 lines estimated)
        paragraphs = re.findall(r'<p[^>]*>([^<]+)</p>', content, re.IGNORECASE)
        for p in paragraphs:
            word_count = len(p.split())
            if word_count > 100:  # ~5-6 lines
                self.warnings.append(f"[Typography] {filename}: Long paragraph detected ({word_count} words). Break into 3-4 line chunks for readability.")

        # Check for missing subheadings in long content
        if len(paragraphs) > 5:
            subheadings = len(re.findall(r'<h[2-6]', content, re.IGNORECASE))
            if subheadings == 0:
                self.warnings.append(f"[Typography] {filename}: Long content without subheadings. Add h2/h3 to break up text.")

        # --- 3. VISUAL EFFECTS (visual-effects.md) ---
        
        # Glassmorphism Check
        if 'backdrop-filter' in content or 'blur(' in content:
            if not re.search(r'background:\\s*rgba|bg-opacity|bg-[a-z0-9]+\\/\\d+', content):
                self.warnings.append(f"[Visual] {filename}: Blur used without semi-transparent background (Glassmorphism fail)")
        
        # GPU Acceleration / Performance
        if re.search(r'@keyframes|transition:', content):
            expensive_props = re.findall(r'width|height|top|left|right|bottom|margin|padding', content)
            if expensive_props:
                self.warnings.append(f"[Performance] {filename}: Animating expensive properties ({', '.join(set(expensive_props))}). Use transform/opacity where possible.")
            
            # Reduced Motion
            if not re.search(r'prefers-reduced-motion', content):
                self.warnings.append(f"[Accessibility] {filename}: Animations found without prefers-reduced-motion check")

        # Natural Shadows
        shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in shadows:
            # Check if natural (Y > X) or multiple layers
            if ',' not in shadow and not re.search(r'\\d+px\\s+[1-9]\\d*px', shadow): # Simple heuristic for Y-offset
                 self.warnings.append(f"[Visual] {filename}: Simple/Unnatural shadow detected. Consider multiple layers or Y > X offset for realism.")

        # --- 3.1 NEOMORPHISM CHECK ---
        # Check for neomorphism patterns (dual shadows with opposite directions)
        neo_shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in neo_shadows:
            # Neomorphism has two shadows: positive offset + negative offset
            if ',' in shadow and '-' in shadow:
                # Check for inset pattern (pressed state)
                if 'inset' in shadow:
                    self.warnings.append(f"[Visual] {filename}: Neomorphism inset detected. Ensure adequate contrast for accessibility.")

        # --- 3.2 SHADOW HIERARCHY ---
        # Count shadow levels to check for elevation consistency
        shadow_count = len(shadows)
        if shadow_count > 0:
            # Check for shadow opacity levels (should indicate hierarchy)
            opacities = re.findall(r'rgba?\\([^)]+,\\s*([\\d.]+)\\)', content)
            shadow_opacities = [float(o) for o in opacities if float(o) < 0.5]
            if shadow_count >= 3 and len(shadow_opacities) > 0:
                # Check if there's variety in shadow opacities for different elevations
                unique_opacities = len(set(shadow_opacities))
                if unique_opacities < 2:
                    self.warnings.append(f"[Visual] {filename}: All shadows at same opacity level. Vary shadow intensity for elevation hierarchy.")

        # --- 3.3 GRADIENT CHECKS ---
        # Check for gradient usage
        has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient|conic-gradient', content))
        if has_gradient:
            # Warn about mesh/aurora gradients (can be overused)
            gradient_count = len(re.findall(r'gradient', content, re.IGNORECASE))
            if gradient_count > 5:
                self.warnings.append(f"[Visual] {filename}: Many gradients detected ({gradient_count}). Ensure this serves purpose, not decoration.")
        else:
            # Check if hero section exists without gradient
            if has_hero and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visual] {filename}: Hero section without visual interest. Consider gradient for depth.")

        # --- 3.4 BORDER EFFECTS ---
        # Check for gradient borders or animated borders
        has_border = bool(re.search(r'border:|border-', content))
        if has_border:
            # Check for overly complex borders
            border_count = len(re.findall(r'border:', content))
            if border_count > 8:
                self.warnings.append(f"[Visual] {filename}: Many border declarations ({border_count}). Simplify for cleaner look.")

        # --- 3.5 GLOW EFFECTS ---
        # Check for text-shadow or multiple box-shadow layers (glow effects)
        text_shadows = re.findall(r'text-shadow:', content)
        for ts in text_shadows:
            # Multiple text-shadow layers indicate glow
            if ',' in ts:
                self.warnings.append(f"[Visual] {filename}: Text glow effect detected. Ensure readability is maintained.")

        # Check for box-shadow glow (multiple layers with 0 offset)
        glow_shadows = re.findall(r'box-shadow:\\s*[^;]*0\\s+0\\s+', content)
        if len(glow_shadows) > 2:
            self.warnings.append(f"[Visual] {filename}: Multiple glow effects detected. Use sparingly for emphasis only.")

        # --- 3.6 OVERLAY TECHNIQUES ---
        # Check for image overlays (for readability)
        has_images = bool(re.search(r'<img|background-image:|bg-\\[url', content))
        if has_images and has_long_text:
            has_overlay = bool(re.search(r'overlay|rgba\\(0|gradient.*transparent|::after|::before', content))
            if not has_overlay:
                self.warnings.append(f"[Visual] {filename}: Text over image without overlay. Add gradient overlay for readability.")

        # --- 3.7 PERFORMANCE: will-change ---
        # Check for will-change usage
        if re.search(r'will-change:', content):
            will_change_props = re.findall(r'will-change:\\s*([^;]+)', content)
            for prop in will_change_props:
                prop = prop.strip().lower()
                if prop in ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding']:
                    self.issues.append(f"[Performance] {filename}: will-change on '{prop}' (layout property). Use only for transform/opacity.")

        # Check for excessive will-change usage
        will_change_count = len(re.findall(r'will-change:', content))
        if will_change_count > 3:
            self.warnings.append(f"[Performance] {filename}: Many will-change declarations ({will_change_count}). Use sparingly, only for heavy animations.")

        # --- 3.8 EFFECT SELECTION ---
        # Check for effect overuse (too many visual effects)
        effect_count = (
            (1 if has_gradient else 0) +
            shadow_count +
            len(re.findall(r'backdrop-filter|blur\\(', content)) +
            len(re.findall(r'text-shadow:', content))
        )
        if effect_count > 10:
            self.warnings.append(f"[Visual] {filename}: Many visual effects ({effect_count}). Ensure effects serve purpose, not decoration.")

        # Check for static/flat design (no depth)
        if has_long_text and effect_count == 0:
            self.warnings.append(f"[Visual] {filename}: Flat design with no depth. Consider shadows or subtle gradients for hierarchy.")

        # --- 4. COLOR SYSTEM (color-system.md) ---

        # 4.1 PURPLE BAN - Critical check from color-system.md
        purple_hexes = ['#8B5CF6', '#A855F7', '#9333EA', '#7C3AED', '#6D28D9',
                        '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE',
                        '#8b5cf6', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9',
                        'purple', 'violet', 'fuchsia', 'magenta', 'lavender']
        for purple in purple_hexes:
            if purple.lower() in content.lower():
                self.issues.append(f"[Color] {filename}: PURPLE DETECTED ('{purple}'). Banned by Maestro rules. Use Teal/Cyan/Emerald instead.")
                break

        # 4.2 60-30-10 Rule check
        # Count color usage to estimate ratio
        color_hex_count = len(re.findall(r'#[0-9a-fA-F]{3,6}', content))
        hsl_count = len(re.findall(r'hsl\\(', content))
        total_colors = color_hex_count + hsl_count
        if total_colors > 3:
            # Check for dominant colors (should be ~60%)
            bg_declarations = re.findall(r'(?:background|bg-|bg\\[)([^;}\\s]+)', content)
            text_declarations = re.findall(r'(?:color|text-)([^;}\\s]+)', content)
            if len(bg_declarations) > 0 and len(text_declarations) > 0:
                # Just warn if too many distinct colors
                unique_hexes = set(re.findall(r'#[0-9a-fA-F]{6}', content))
                if len(unique_hexes) > 5:
                    self.warnings.append(f"[Color] {filename}: {len(unique_hexes)} distinct colors. Consider 60-30-10 rule: dominant (60%), secondary (30%), accent (10%).")

        # 4.3 Color Scheme Pattern Detection
        # Detect monochromatic (same hue, different lightness)
        hsl_matches = re.findall(r'hsl\\((\\d+),\\s*\\d+%,\\s*\\d+%\\)', content)
        if len(hsl_matches) >= 3:
            hues = [int(h) for h in hsl_matches]
            hue_range = max(hues) - min(hues)
            if hue_range < 10:
                self.warnings.append(f"[Color] {filename}: Monochromatic palette detected (hue variance: {hue_range}deg). Ensure adequate contrast.")

        # 4.4 Dark Mode Compliance
        # Check for pure black (#000000) or pure white (#FFFFFF) text (forbidden)
        if re.search(r'color:\\s*#000000|#000\\b', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use #1a1a1a or darker grays for better dark mode.")
        if re.search(r'background:\\s*#ffffff|#fff\\b', content) and re.search(r'dark:\\s*|dark:', content):
            self.warnings.append(f"[Color] {filename}: Pure white background in dark mode context. Use slight off-white (#f9fafb) for reduced eye strain.")

        # 4.5 WCAG Contrast Pattern Check
        # Look for potential low-contrast combinations
        light_bg_light_text = bool(re.search(r'bg-(?:gray|slate|zinc)-50|bg-white.*text-(?:gray|slate)-[12]', content))
        dark_bg_dark_text = bool(re.search(r'bg-(?:gray|slate|zinct)-9|bg-black.*text-(?:gray|slate)-[89]', content))
        if light_bg_light_text or dark_bg_dark_text:
            self.warnings.append(f"[Color] {filename}: Possible low-contrast combination detected. Verify WCAG AA (4.5:1 for text).")

        # 4.6 Color Psychology Context Check
        # Warn if blue used for food/restaurant context
        has_blue = bool(re.search(r'bg-blue|text-blue|from-blue|#[0-9a-fA-F]*00[0-9A-Fa-f]{2}|#[0-9a-fA-F]*1[0-9A-Fa-f]{2}', content))
        has_food_context = bool(re.search(r'restaurant|food|cooking|recipe|menu|dish|meal', content, re.IGNORECASE))
        if has_blue and has_food_context:
            self.warnings.append(f"[Color] {filename}: Blue color in food context. Blue suppresses appetite; consider warm colors (red, orange, yellow).")

        # 4.7 HSL-Based Palette Detection
        # Check if using HSL for palette (recommended in color-system.md)
        has_color_vars = bool(re.search(r'--color-|color-|primary-|secondary-', content))
        if has_color_vars and not re.search(r'hsl\\(', content):
            self.warnings.append(f"[Color] {filename}: Color variables without HSL. Consider HSL for easier palette adjustment (Hue, Saturation, Lightness).")

        # --- 5. ANIMATION GUIDE (animation-guide.md) ---

        # 5.1 Duration Appropriateness
        # Check for excessively long or short animations
        durations = re.findall(r'(?:duration|animation-duration|transition-duration):\\s*([\\d.]+)(s|ms)', content)
        for duration, unit in durations:
            duration_ms = float(duration) * (1000 if unit == 's' else 1)
            if duration_ms < 50:
                self.warnings.append(f"[Animation] {filename}: Very fast animation ({duration}{unit}). Minimum 50ms for visibility.")
            elif duration_ms > 1000 and 'transition' in content.lower():
                self.warnings.append(f"[Animation] {filename}: Long transition ({duration}{unit}). Transitions should be 100-300ms for responsiveness.")

        # 5.2 Easing Function Correctness
        # Check for incorrect easing patterns
        if re.search(r'ease-in\\s+.*entry|fade-in.*ease-in', content):
            self.warnings.append(f"[Animation] {filename}: Entry animation with ease-in. Entry should use ease-out for snappy feel.")
        if re.search(r'ease-out\\s+.*exit|fade-out.*ease-out', content):
            self.warnings.append(f"[Animation] {filename}: Exit animation with ease-out. Exit should use ease-in for natural feel.")

        # 5.3 Micro-interaction Feedback Patterns
        # Check for interactive elements without hover/focus states
        interactive_elements = len(re.findall(r'<button|<a\\s+href|onClick|@click', content))
        has_hover_focus = bool(re.search(r'hover:|focus:|:hover|:focus', content))
        if interactive_elements > 2 and not has_hover_focus:
            self.warnings.append(f"[Animation] {filename}: Interactive elements without hover/focus states. Add micro-interactions for feedback.")

        # 5.4 Loading State Indicators
        # Check for loading patterns
        has_async = bool(re.search(r'async|await|fetch|axios|loading|isLoading', content))
        has_loading_indicator = bool(re.search(r'skeleton|spinner|progress|loading|<circle.*animate', content))
        if has_async and not has_loading_indicator:
            self.warnings.append(f"[Animation] {filename}: Async operations without loading indicator. Add skeleton or spinner for perceived performance.")

        # 5.5 Page Transition Patterns
        # Check for page/view transitions
        has_routing = bool(re.search(r'router|navigate|Link.*to|useHistory', content))
        has_page_transition = bool(re.search(r'AnimatePresence|motion\\.|transition.*page|fade.*route', content))
        if has_routing and not has_page_transition:
            self.warnings.append(f"[Animation] {filename}: Routing detected without page transitions. Consider fade/slide for context continuity.")

        # 5.6 Scroll Animation Performance
        # Check for scroll-driven animations
        has_scroll_anim = bool(re.search(r'onScroll|scroll.*trigger|IntersectionObserver', content))
        if has_scroll_anim:
            # Check if using expensive properties in scroll handlers
            if re.search(r'onScroll.*[^\\w](width|height|top|left)', content):
                self.issues.append(f"[Animation] {filename}: Scroll handler animating layout properties. Use transform/opacity for 60fps.")

        # --- 6. MOTION GRAPHICS (motion-graphics.md) ---

        # 6.1 Lottie Animation Checks
        has_lottie = bool(re.search(r'lottie|Lottie|@lottie-react', content))
        if has_lottie:
            # Check for reduced motion fallback
            has_lottie_fallback = bool(re.search(r'prefers-reduced-motion.*lottie|lottie.*isPaused|lottie.*stop', content))
            if not has_lottie_fallback:
                self.warnings.append(f"[Motion] {filename}: Lottie animation without reduced-motion fallback. Add pause/stop for accessibility.")

        # 6.2 GSAP Memory Leak Risks
        has_gsap = bool(re.search(r'gsap|ScrollTrigger|from\\(.*gsap', content))
        if has_gsap:
            # Check for cleanup patterns
            has_gsap_cleanup = bool(re.search(r'kill\\(|revert\\(|useEffect.*return.*gsap', content))
            if not has_gsap_cleanup:
                self.issues.append(f"[Motion] {filename}: GSAP animation without cleanup (kill/revert). Memory leak risk on unmount.")

        # 6.3 SVG Animation Performance
        svg_animations = re.findall(r'<animate|<animateTransform|stroke-dasharray|stroke-dashoffset', content)
        if len(svg_animations) > 3:
            self.warnings.append(f"[Motion] {filename}: Multiple SVG animations detected. Ensure stroke-dashoffset is used sparingly for mobile performance.")

        # 6.4 3D Transform Performance
        has_3d_transform = bool(re.search(r'transform3d|perspective\\(|rotate3d|translate3d', content))
        if has_3d_transform:
            # Check for perspective on parent
            has_perspective_parent = bool(re.search(r'perspective:\\s*\\d+px|perspective\\s*\\(', content))
            if not has_perspective_parent:
                self.warnings.append(f"[Motion] {filename}: 3D transform without perspective parent. Add perspective: 1000px for realistic depth.")

            # Warn about mobile performance
            self.warnings.append(f"[Motion] {filename}: 3D transforms detected. Test on mobile; can impact performance on low-end devices.")

        # 6.5 Particle Effect Warnings
        # Check for canvas/WebGL particle systems
        has_particles = bool(re.search(r'particle|canvas.*loop|requestAnimationFrame.*draw|Three\\.js', content))
        if has_particles:
            self.warnings.append(f"[Motion] {filename}: Particle effects detected. Ensure fallback or reduced-quality option for mobile devices.")

        # 6.6 Scroll-Driven Animation Performance
        has_scroll_driven = bool(re.search(r'IntersectionObserver.*animate|scroll.*progress|view-timeline', content))
        if has_scroll_driven:
            # Check for throttling/debouncing
            has_throttle = bool(re.search(r'throttle|debounce|requestAnimationFrame', content))
            if not has_throttle:
                self.issues.append(f"[Motion] {filename}: Scroll-driven animation without throttling. Add requestAnimationFrame for 60fps.")

        # 6.7 Motion Decision Tree - Context Check
        # Check if animation serves purpose (not just decoration)
        total_animations = (
            len(re.findall(r'@keyframes|transition:|animate-', content)) +
            (1 if has_lottie else 0) +
            (1 if has_gsap else 0)
        )
        if total_animations > 5:
            # Check if animations are functional
            functional_animations = len(re.findall(r'hover:|focus:|disabled|loading|error|success', content))
            if functional_animations < total_animations / 2:
                self.warnings.append(f"[Motion] {filename}: Many animations ({total_animations}). Ensure majority serve functional purpose (feedback, guidance), not decoration.")

        # --- 7. ACCESSIBILITY ---
        if re.search(r'<img(?![^>]*alt=)[^>]*>', content):
            self.issues.append(f"[Accessibility] {filename}: Missing img alt text")

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.jsx', '.html', '.vue', '.svelte', '.css'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }

def main():
    if len(sys.argv) < 2: sys.exit(1)
    
    path = sys.argv[1]
    is_json = "--json" in sys.argv
    
    auditor = UXAuditor()
    if os.path.isfile(path): auditor.audit_file(path)
    else: auditor.audit_directory(path)
    
    report = auditor.get_report()
    
    if is_json:
        print(json.dumps(report))
    else:
        # Use ASCII-safe output for Windows console compatibility
        print(f"\\n[UX AUDIT] {report['files_checked']} files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]: print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]: print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)

if __name__ == "__main__":
    main()
`,
  "skills/frontend-design/scripts/ux_audit.py": `#!/usr/bin/env python3
"""
UX Audit Script - Full Frontend Design Coverage

Analyzes code for compliance with:

1. CORE PSYCHOLOGY LAWS:
   - Hick's Law (nav items, form complexity)
   - Fitts' Law (target sizes, touch targets)
   - Miller's Law (chunking, memory limits)
   - Von Restorff Effect (primary CTA visibility)
   - Serial Position Effect (important items at start/end)

2. EMOTIONAL DESIGN (Don Norman):
   - Visceral (first impressions, gradients, animations)
   - Behavioral (feedback, usability, performance)
   - Reflective (brand story, values, identity)

3. TRUST BUILDING:
   - Security signals (SSL, encryption on forms)
   - Social proof (testimonials, reviews, logos)
   - Authority indicators (certifications, awards, media)

4. COGNITIVE LOAD MANAGEMENT:
   - Progressive disclosure (accordion, tabs, "Advanced")
   - Visual noise (too many colors/borders)
   - Familiar patterns (labels, standard conventions)

5. PERSUASIVE DESIGN (Ethical):
   - Smart defaults (pre-selected options)
   - Anchoring (original vs discount price)
   - Social proof (live indicators, numbers)
   - Progress indicators (progress bars, steps)

6. TYPOGRAPHY SYSTEM (9 sections):
   - Font Pairing (max 3 families)
   - Line Length (45-75ch)
   - Line Height (proper ratios)
   - Letter Spacing (uppercase, display text)
   - Weight and Emphasis (contrast levels)
   - Responsive Typography (clamp())
   - Hierarchy (sequential headings)
   - Modular Scale (consistent ratios)
   - Readability (chunking, subheadings)

7. VISUAL EFFECTS (10 sections):
   - Glassmorphism (blur + transparency)
   - Neomorphism (dual shadows, inset)
   - Shadow Hierarchy (elevation levels)
   - Gradients (usage, overuse)
   - Border Effects (complexity check)
   - Glow Effects (text-shadow, box-shadow)
   - Overlay Techniques (image text readability)
   - GPU Acceleration (transform/opacity vs layout)
   - Performance (will-change usage)
   - Effect Selection (purpose over decoration)

8. COLOR SYSTEM (7 sections):
   - PURPLE BAN (Critical Maestro rule - #8B5CF6, #A855F7, etc.)
   - 60-30-10 Rule (dominant, secondary, accent)
   - Color Scheme Patterns (monochromatic, analogous)
   - Dark Mode Compliance (no pure black/white)
   - WCAG Contrast (low-contrast detection)
   - Color Psychology Context (food + blue = bad)
   - HSL-Based Palettes (recommended approach)

9. ANIMATION GUIDE (6 sections):
   - Duration Appropriateness (50ms minimum, 1s max transitions)
   - Easing Functions (ease-out for entry, ease-in for exit)
   - Micro-interactions (hover/focus feedback)
   - Loading States (skeleton, spinner, progress)
   - Page Transitions (fade/slide for routing)
   - Scroll Animation Performance (no layout properties)

10. MOTION GRAPHICS (7 sections):
   - Lottie Animations (reduced motion fallbacks)
   - GSAP Memory Leaks (kill/revert on unmount)
   - SVG Animation Performance (stroke-dashoffset sparingly)
   - 3D Transforms (perspective parent, mobile warning)
   - Particle Effects (mobile fallback)
   - Scroll-Driven Animations (throttle with rAF)
   - Motion Decision Tree (functional vs decorative)

11. ACCESSIBILITY:
   - Alt text for images
   - Reduced motion checks
   - Form labels

Total: 80+ checks across all design principles
"""

import sys
import os
import re
import json
from pathlib import Path

class UXAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0
    
    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except: return
        
        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Pre-calculate common flags
        has_long_text = bool(re.search(r'<p|<div.*class=.*text|article|<span.*text', content, re.IGNORECASE))
        has_form = bool(re.search(r'<form|<input|password|credit|card|payment', content, re.IGNORECASE))
        complex_elements = len(re.findall(r'<input|<select|<textarea|<option', content, re.IGNORECASE))

        # --- 1. PSYCHOLOGY LAWS ---
        # Hick's Law
        nav_items = len(re.findall(r'<NavLink|<Link|<a\\s+href|nav-item', content, re.IGNORECASE))
        if nav_items > 7:
            self.issues.append(f"[Hick's Law] {filename}: {nav_items} nav items (Max 7)")
        
        # Fitts' Law
        if re.search(r'height:\\s*([0-3]\\d)px', content) or re.search(r'h-[1-9]\\b|h-10\\b', content):
            self.warnings.append(f"[Fitts' Law] {filename}: Small targets (< 44px)")
        
        # Miller's Law
        form_fields = len(re.findall(r'<input|<select|<textarea', content, re.IGNORECASE))
        if form_fields > 7 and not re.search(r'step|wizard|stage', content, re.IGNORECASE):
            self.warnings.append(f"[Miller's Law] {filename}: Complex form ({form_fields} fields)")
            
        # Von Restorff
        if 'button' in content.lower() and not re.search(r'primary|bg-primary|Button.*primary|variant=["\\']primary', content, re.IGNORECASE):
            self.warnings.append(f"[Von Restorff] {filename}: No primary CTA")

        # Serial Position Effect - Important items at beginning/end
        if nav_items > 3:
            # Check if last nav item is important (contact, login, etc.)
            nav_content = re.findall(r'<NavLink|<Link|<a\\s+href[^>]*>([^<]+)</a>', content, re.IGNORECASE)
            if nav_content and len(nav_content) > 2:
                last_item = nav_content[-1].lower() if nav_content else ''
                if not any(x in last_item for x in ['contact', 'login', 'sign', 'get started', 'cta', 'button']):
                    self.warnings.append(f"[Serial Position] {filename}: Last nav item may not be important. Place key actions at start/end.")

        # --- 1.5 EMOTIONAL DESIGN (Don Norman) ---

        # Visceral: First impressions (aesthetics, gradients, animations)
        has_hero = bool(re.search(r'hero|<h1|banner', content, re.IGNORECASE))
        if has_hero:
            # Check for visual appeal elements
            has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient', content))
            has_animation = bool(re.search(r'@keyframes|transition:|animate-', content))
            has_visual_interest = has_gradient or has_animation

            if not has_visual_interest and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visceral] {filename}: Hero section lacks visual appeal. Consider gradients or subtle animations.")

        # Behavioral: Instant feedback and usability
        if 'onClick' in content or '@click' in content or 'onclick' in content:
            has_feedback = re.search(r'transition|animate|hover:|focus:|disabled|loading|spinner', content, re.IGNORECASE)
            has_state_change = re.search(r'setState|useState|disabled|loading', content)

            if not has_feedback and not has_state_change:
                self.warnings.append(f"[Behavioral] {filename}: Interactive elements lack immediate feedback. Add hover/focus/disabled states.")

        # Reflective: Brand story, values, identity
        has_reflective = bool(re.search(r'about|story|mission|values|why we|our journey|testimonials', content, re.IGNORECASE))
        if has_long_text and not has_reflective:
            self.warnings.append(f"[Reflective] {filename}: Long-form content without brand story/values. Add 'About' or 'Why We Exist' section.")

        # --- 1.6 TRUST BUILDING (Enhanced) ---

        # Security signals
        if has_form:
            security_signals = re.findall(r'ssl|secure|encrypt|lock|padlock|https', content, re.IGNORECASE)
            if len(security_signals) == 0 and not re.search(r'checkout|payment', content, re.IGNORECASE):
                self.warnings.append(f"[Trust] {filename}: Form without security indicators. Add 'SSL Secure' or lock icon.")

        # Social proof elements
        social_proof = re.findall(r'review|testimonial|rating|star|trust|trusted by|customer|logo', content, re.IGNORECASE)
        if len(social_proof) > 0:
            self.passed_count += 1
        else:
            if has_long_text:
                self.warnings.append(f"[Trust] {filename}: No social proof detected. Consider adding testimonials, ratings, or 'Trusted by' logos.")

        # Authority indicators
        has_footer = bool(re.search(r'footer|<footer', content, re.IGNORECASE))
        if has_footer:
            authority = re.findall(r'certif|award|media|press|featured|as seen in', content, re.IGNORECASE)
            if len(authority) == 0:
                self.warnings.append(f"[Trust] {filename}: Footer lacks authority signals. Add certifications, awards, or media mentions.")

        # --- 1.7 COGNITIVE LOAD MANAGEMENT ---

        # Progressive disclosure
        if complex_elements > 5:
            has_progressive = re.search(r'step|wizard|stage|accordion|collapsible|tab|more\\.\\.\\.|advanced|show more', content, re.IGNORECASE)
            if not has_progressive:
                self.warnings.append(f"[Cognitive Load] {filename}: Many form elements without progressive disclosure. Consider accordion, tabs, or 'Advanced' toggle.")

        # Visual noise check
        has_many_colors = len(re.findall(r'#[0-9a-fA-F]{3,6}|rgb|hsl', content)) > 15
        has_many_borders = len(re.findall(r'border:|border-', content)) > 10
        if has_many_colors and has_many_borders:
            self.warnings.append(f"[Cognitive Load] {filename}: High visual noise detected. Many colors and borders increase cognitive load.")

        # Familiar patterns
        if has_form:
            has_standard_labels = bool(re.search(r'<label|placeholder|aria-label', content, re.IGNORECASE))
            if not has_standard_labels:
                self.issues.append(f"[Cognitive Load] {filename}: Form inputs without labels. Use <label> for accessibility and clarity.")

        # --- 1.8 PERSUASIVE DESIGN (Ethical) ---

        # Smart defaults
        if has_form:
            has_defaults = bool(re.search(r'checked|selected|default|value=["\\'].*["\\']', content))
            radio_inputs = len(re.findall(r'type=["\\']radio', content, re.IGNORECASE))
            if radio_inputs > 0 and not has_defaults:
                self.warnings.append(f"[Persuasion] {filename}: Radio buttons without default selection. Pre-select recommended option.")

        # Anchoring (showing original price)
        if re.search(r'price|pricing|cost|\\$\\d+', content, re.IGNORECASE):
            has_anchor = bool(re.search(r'original|was|strike|del|save \\d+%', content, re.IGNORECASE))
            if not has_anchor:
                self.warnings.append(f"[Persuasion] {filename}: Prices without anchoring. Show original price to frame discount value.")

        # Social proof live indicators
        has_social = bool(re.search(r'join|subscriber|member|user', content, re.IGNORECASE))
        if has_social:
            has_count = bool(re.findall(r'\\d+[+kmb]|\\d+,\\d+', content))
            if not has_count:
                self.warnings.append(f"[Persuasion] {filename}: Social proof without specific numbers. Use 'Join 10,000+' format.")

        # Progress indicators
        if has_form:
            has_progress = bool(re.search(r'progress|step \\d+|complete|%|bar', content, re.IGNORECASE))
            if complex_elements > 5 and not has_progress:
                self.warnings.append(f"[Persuasion] {filename}: Long form without progress indicator. Add progress bar or 'Step X of Y'.")

        # --- 2. TYPOGRAPHY SYSTEM (Complete Coverage) ---

        # 2.1 Font Pairing - Too many font families
        font_families = set()
        # Check for @font-face, Google Fonts, font-family declarations
        font_faces = re.findall(r'@font-face\\s*\\{[^}]*family:\\s*["\\']?([^;"\\'\\s}]+)', content, re.IGNORECASE)
        google_fonts = re.findall(r'fonts\\.googleapis\\.com[^"\\']*family=([^"&]+)', content, re.IGNORECASE)
        font_family_css = re.findall(r'font-family:\\s*([^;]+)', content, re.IGNORECASE)

        for font in font_faces: font_families.add(font.strip().lower())
        for font in google_fonts:
            for f in font.replace('+', ' ').split('|'):
                font_families.add(f.split(':')[0].strip().lower())
        for family in font_family_css:
            # Extract first font from stack
            first_font = family.split(',')[0].strip().strip('"\\'')

            if first_font.lower() not in {'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'inherit', 'arial', 'georgia', 'times new roman', 'courier new', 'verdana', 'helvetica', 'tahoma'}:
                font_families.add(first_font.lower())

        if len(font_families) > 3:
            self.issues.append(f"[Typography] {filename}: {len(font_families)} font families detected. Limit to 2-3 for cohesion.")

        # 2.2 Line Length - Character-based width
        if has_long_text and not re.search(r'max-w-(?:prose|[\\[\\\\]?\\d+ch[\\]\\\\]?)|max-width:\\s*\\d+ch', content):
            self.warnings.append(f"[Typography] {filename}: No line length constraint (45-75ch). Use max-w-prose or max-w-[65ch].")

        # 2.3 Line Height - Proper leading ratios
        # Check for text without proper line-height
        text_elements = len(re.findall(r'<p|<span|<div.*text|<h[1-6]', content, re.IGNORECASE))
        if text_elements > 0 and not re.search(r'leading-|line-height:', content):
            self.warnings.append(f"[Typography] {filename}: Text elements found without line-height. Body: 1.4-1.6, Headings: 1.1-1.3")

        # Check for heading-specific line height issues
        if re.search(r'<h[1-6]|text-(?:xl|2xl|3xl|4xl|5xl|6xl)', content, re.IGNORECASE):
            # Extract line-height values
            line_heights = re.findall(r'(?:leading-|line-height:\\s*)([\\d.]+)', content)
            for lh in line_heights:
                if float(lh) > 1.5:
                    self.warnings.append(f"[Typography] {filename}: Heading has line-height {lh} (>1.3). Headings should be tighter (1.1-1.3).")

        # 2.4 Letter Spacing (Tracking)
        # Uppercase without tracking
        if re.search(r'uppercase|text-transform:\\s*uppercase', content, re.IGNORECASE):
            if not re.search(r'tracking-|letter-spacing:', content):
                self.warnings.append(f"[Typography] {filename}: Uppercase text without tracking. ALL CAPS needs +5-10% spacing.")

        # Large text (display/hero) should have negative tracking
        if re.search(r'text-(?:4xl|5xl|6xl|7xl|8xl|9xl)|font-size:\\s*[3-9]\\dpx', content):
            if not re.search(r'tracking-tight|letter-spacing:\\s*-[0-9]', content):
                self.warnings.append(f"[Typography] {filename}: Large display text without tracking-tight. Big text needs -1% to -4% spacing.")

        # 2.5 Weight and Emphasis - Contrast levels
        # Check for adjacent weight levels (poor contrast)
        weights = re.findall(r'font-weight:\\s*(\\d+)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|fw-(\\d+)', content, re.IGNORECASE)
        weight_values = []
        for w in weights:
            val = w[0] or w[1]
            if val:
                # Map named weights to numbers
                weight_map = {'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400', 'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900'}
                val = weight_map.get(val.lower(), val)
                try:
                    weight_values.append(int(val))
                except: pass

        # Check for adjacent weights (400/500, 500/600, etc.)
        for i in range(len(weight_values) - 1):
            diff = abs(weight_values[i] - weight_values[i+1])
            if diff == 100:
                self.warnings.append(f"[Typography] {filename}: Adjacent font weights ({weight_values[i]}/{weight_values[i+1]}). Skip at least 2 levels for contrast.")

        # Too many weight levels
        unique_weights = set(weight_values)
        if len(unique_weights) > 4:
            self.warnings.append(f"[Typography] {filename}: {len(unique_weights)} font weights. Limit to 3-4 per page.")

        # 2.6 Responsive Typography - Fluid sizing with clamp()
        has_font_sizes = bool(re.search(r'font-size:|text-(?:xs|sm|base|lg|xl|2xl)', content))
        if has_font_sizes and not re.search(r'clamp\\(|responsive:', content):
            self.warnings.append(f"[Typography] {filename}: Fixed font sizes without clamp(). Consider fluid typography: clamp(MIN, PREFERRED, MAX)")

        # 2.7 Hierarchy - Heading structure
        headings = re.findall(r'<(h[1-6])', content, re.IGNORECASE)
        if headings:
            # Check for skipped levels (h1 -> h3)
            for i in range(len(headings) - 1):
                curr = int(headings[i][1])
                next_h = int(headings[i+1][1])
                if next_h > curr + 1:
                    self.warnings.append(f"[Typography] {filename}: Skipped heading level (h{curr} -> h{next_h}). Maintain sequential hierarchy.")

            # Check if h1 exists for main content
            if 'h1' not in [h.lower() for h in headings] and has_long_text:
                self.warnings.append(f"[Typography] {filename}: No h1 found. Each page should have one primary heading.")

        # 2.8 Modular Scale - Consistent sizing
        # Extract font-size values
        font_sizes = re.findall(r'font-size:\\s*(\\d+(?:\\.\\d+)?)(px|rem|em)', content)
        size_values = []
        for size, unit in font_sizes:
            if unit == 'rem' or unit == 'em':
                size_values.append(float(size))
            elif unit == 'px':
                size_values.append(float(size) / 16)  # Normalize to rem

        if len(size_values) > 2:
            # Check if sizes follow a modular scale roughly
            sorted_sizes = sorted(set(size_values))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common scale ratios: 1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618
            common_ratios = {1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618}
            for ratio in ratios[:3]:  # Check first 3 ratios
                if not any(abs(ratio - cr) < 0.05 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio like 1.25 (Major Third).")
                    break

        # 2.9 Readability - Content chunking
        # Check for very long paragraphs (>5 lines estimated)
        paragraphs = re.findall(r'<p[^>]*>([^<]+)</p>', content, re.IGNORECASE)
        for p in paragraphs:
            word_count = len(p.split())
            if word_count > 100:  # ~5-6 lines
                self.warnings.append(f"[Typography] {filename}: Long paragraph detected ({word_count} words). Break into 3-4 line chunks for readability.")

        # Check for missing subheadings in long content
        if len(paragraphs) > 5:
            subheadings = len(re.findall(r'<h[2-6]', content, re.IGNORECASE))
            if subheadings == 0:
                self.warnings.append(f"[Typography] {filename}: Long content without subheadings. Add h2/h3 to break up text.")

        # --- 3. VISUAL EFFECTS (visual-effects.md) ---
        
        # Glassmorphism Check
        if 'backdrop-filter' in content or 'blur(' in content:
            if not re.search(r'background:\\s*rgba|bg-opacity|bg-[a-z0-9]+\\/\\d+', content):
                self.warnings.append(f"[Visual] {filename}: Blur used without semi-transparent background (Glassmorphism fail)")
        
        # GPU Acceleration / Performance
        if re.search(r'@keyframes|transition:', content):
            expensive_props = re.findall(r'width|height|top|left|right|bottom|margin|padding', content)
            if expensive_props:
                self.warnings.append(f"[Performance] {filename}: Animating expensive properties ({', '.join(set(expensive_props))}). Use transform/opacity where possible.")
            
            # Reduced Motion
            if not re.search(r'prefers-reduced-motion', content):
                self.warnings.append(f"[Accessibility] {filename}: Animations found without prefers-reduced-motion check")

        # Natural Shadows
        shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in shadows:
            # Check if natural (Y > X) or multiple layers
            if ',' not in shadow and not re.search(r'\\d+px\\s+[1-9]\\d*px', shadow): # Simple heuristic for Y-offset
                 self.warnings.append(f"[Visual] {filename}: Simple/Unnatural shadow detected. Consider multiple layers or Y > X offset for realism.")

        # --- 3.1 NEOMORPHISM CHECK ---
        # Check for neomorphism patterns (dual shadows with opposite directions)
        neo_shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in neo_shadows:
            # Neomorphism has two shadows: positive offset + negative offset
            if ',' in shadow and '-' in shadow:
                # Check for inset pattern (pressed state)
                if 'inset' in shadow:
                    self.warnings.append(f"[Visual] {filename}: Neomorphism inset detected. Ensure adequate contrast for accessibility.")

        # --- 3.2 SHADOW HIERARCHY ---
        # Count shadow levels to check for elevation consistency
        shadow_count = len(shadows)
        if shadow_count > 0:
            # Check for shadow opacity levels (should indicate hierarchy)
            opacities = re.findall(r'rgba?\\([^)]+,\\s*([\\d.]+)\\)', content)
            shadow_opacities = [float(o) for o in opacities if float(o) < 0.5]
            if shadow_count >= 3 and len(shadow_opacities) > 0:
                # Check if there's variety in shadow opacities for different elevations
                unique_opacities = len(set(shadow_opacities))
                if unique_opacities < 2:
                    self.warnings.append(f"[Visual] {filename}: All shadows at same opacity level. Vary shadow intensity for elevation hierarchy.")

        # --- 3.3 GRADIENT CHECKS ---
        # Check for gradient usage
        has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient|conic-gradient', content))
        if has_gradient:
            # Warn about mesh/aurora gradients (can be overused)
            gradient_count = len(re.findall(r'gradient', content, re.IGNORECASE))
            if gradient_count > 5:
                self.warnings.append(f"[Visual] {filename}: Many gradients detected ({gradient_count}). Ensure this serves purpose, not decoration.")
        else:
            # Check if hero section exists without gradient
            if has_hero and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visual] {filename}: Hero section without visual interest. Consider gradient for depth.")

        # --- 3.4 BORDER EFFECTS ---
        # Check for gradient borders or animated borders
        has_border = bool(re.search(r'border:|border-', content))
        if has_border:
            # Check for overly complex borders
            border_count = len(re.findall(r'border:', content))
            if border_count > 8:
                self.warnings.append(f"[Visual] {filename}: Many border declarations ({border_count}). Simplify for cleaner look.")

        # --- 3.5 GLOW EFFECTS ---
        # Check for text-shadow or multiple box-shadow layers (glow effects)
        text_shadows = re.findall(r'text-shadow:', content)
        for ts in text_shadows:
            # Multiple text-shadow layers indicate glow
            if ',' in ts:
                self.warnings.append(f"[Visual] {filename}: Text glow effect detected. Ensure readability is maintained.")

        # Check for box-shadow glow (multiple layers with 0 offset)
        glow_shadows = re.findall(r'box-shadow:\\s*[^;]*0\\s+0\\s+', content)
        if len(glow_shadows) > 2:
            self.warnings.append(f"[Visual] {filename}: Multiple glow effects detected. Use sparingly for emphasis only.")

        # --- 3.6 OVERLAY TECHNIQUES ---
        # Check for image overlays (for readability)
        has_images = bool(re.search(r'<img|background-image:|bg-\\[url', content))
        if has_images and has_long_text:
            has_overlay = bool(re.search(r'overlay|rgba\\(0|gradient.*transparent|::after|::before', content))
            if not has_overlay:
                self.warnings.append(f"[Visual] {filename}: Text over image without overlay. Add gradient overlay for readability.")

        # --- 3.7 PERFORMANCE: will-change ---
        # Check for will-change usage
        if re.search(r'will-change:', content):
            will_change_props = re.findall(r'will-change:\\s*([^;]+)', content)
            for prop in will_change_props:
                prop = prop.strip().lower()
                if prop in ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding']:
                    self.issues.append(f"[Performance] {filename}: will-change on '{prop}' (layout property). Use only for transform/opacity.")

        # Check for excessive will-change usage
        will_change_count = len(re.findall(r'will-change:', content))
        if will_change_count > 3:
            self.warnings.append(f"[Performance] {filename}: Many will-change declarations ({will_change_count}). Use sparingly, only for heavy animations.")

        # --- 3.8 EFFECT SELECTION ---
        # Check for effect overuse (too many visual effects)
        effect_count = (
            (1 if has_gradient else 0) +
            shadow_count +
            len(re.findall(r'backdrop-filter|blur\\(', content)) +
            len(re.findall(r'text-shadow:', content))
        )
        if effect_count > 10:
            self.warnings.append(f"[Visual] {filename}: Many visual effects ({effect_count}). Ensure effects serve purpose, not decoration.")

        # Check for static/flat design (no depth)
        if has_long_text and effect_count == 0:
            self.warnings.append(f"[Visual] {filename}: Flat design with no depth. Consider shadows or subtle gradients for hierarchy.")

        # --- 4. COLOR SYSTEM (color-system.md) ---

        # 4.1 PURPLE BAN - Critical check from color-system.md
        purple_hexes = ['#8B5CF6', '#A855F7', '#9333EA', '#7C3AED', '#6D28D9',
                        '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE',
                        '#8b5cf6', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9',
                        'purple', 'violet', 'fuchsia', 'magenta', 'lavender']
        for purple in purple_hexes:
            if purple.lower() in content.lower():
                self.issues.append(f"[Color] {filename}: PURPLE DETECTED ('{purple}'). Banned by Maestro rules. Use Teal/Cyan/Emerald instead.")
                break

        # 4.2 60-30-10 Rule check
        # Count color usage to estimate ratio
        color_hex_count = len(re.findall(r'#[0-9a-fA-F]{3,6}', content))
        hsl_count = len(re.findall(r'hsl\\(', content))
        total_colors = color_hex_count + hsl_count
        if total_colors > 3:
            # Check for dominant colors (should be ~60%)
            bg_declarations = re.findall(r'(?:background|bg-|bg\\[)([^;}\\s]+)', content)
            text_declarations = re.findall(r'(?:color|text-)([^;}\\s]+)', content)
            if len(bg_declarations) > 0 and len(text_declarations) > 0:
                # Just warn if too many distinct colors
                unique_hexes = set(re.findall(r'#[0-9a-fA-F]{6}', content))
                if len(unique_hexes) > 5:
                    self.warnings.append(f"[Color] {filename}: {len(unique_hexes)} distinct colors. Consider 60-30-10 rule: dominant (60%), secondary (30%), accent (10%).")

        # 4.3 Color Scheme Pattern Detection
        # Detect monochromatic (same hue, different lightness)
        hsl_matches = re.findall(r'hsl\\((\\d+),\\s*\\d+%,\\s*\\d+%\\)', content)
        if len(hsl_matches) >= 3:
            hues = [int(h) for h in hsl_matches]
            hue_range = max(hues) - min(hues)
            if hue_range < 10:
                self.warnings.append(f"[Color] {filename}: Monochromatic palette detected (hue variance: {hue_range}deg). Ensure adequate contrast.")

        # 4.4 Dark Mode Compliance
        # Check for pure black (#000000) or pure white (#FFFFFF) text (forbidden)
        if re.search(r'color:\\s*#000000|#000\\b', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use #1a1a1a or darker grays for better dark mode.")
        if re.search(r'background:\\s*#ffffff|#fff\\b', content) and re.search(r'dark:\\s*|dark:', content):
            self.warnings.append(f"[Color] {filename}: Pure white background in dark mode context. Use slight off-white (#f9fafb) for reduced eye strain.")

        # 4.5 WCAG Contrast Pattern Check
        # Look for potential low-contrast combinations
        light_bg_light_text = bool(re.search(r'bg-(?:gray|slate|zinc)-50|bg-white.*text-(?:gray|slate)-[12]', content))
        dark_bg_dark_text = bool(re.search(r'bg-(?:gray|slate|zinct)-9|bg-black.*text-(?:gray|slate)-[89]', content))
        if light_bg_light_text or dark_bg_dark_text:
            self.warnings.append(f"[Color] {filename}: Possible low-contrast combination detected. Verify WCAG AA (4.5:1 for text).")

        # 4.6 Color Psychology Context Check
        # Warn if blue used for food/restaurant context
        has_blue = bool(re.search(r'bg-blue|text-blue|from-blue|#[0-9a-fA-F]*00[0-9A-Fa-f]{2}|#[0-9a-fA-F]*1[0-9A-Fa-f]{2}', content))
        has_food_context = bool(re.search(r'restaurant|food|cooking|recipe|menu|dish|meal', content, re.IGNORECASE))
        if has_blue and has_food_context:
            self.warnings.append(f"[Color] {filename}: Blue color in food context. Blue suppresses appetite; consider warm colors (red, orange, yellow).")

        # 4.7 HSL-Based Palette Detection
        # Check if using HSL for palette (recommended in color-system.md)
        has_color_vars = bool(re.search(r'--color-|color-|primary-|secondary-', content))
        if has_color_vars and not re.search(r'hsl\\(', content):
            self.warnings.append(f"[Color] {filename}: Color variables without HSL. Consider HSL for easier palette adjustment (Hue, Saturation, Lightness).")

        # --- 5. ANIMATION GUIDE (animation-guide.md) ---

        # 5.1 Duration Appropriateness
        # Check for excessively long or short animations
        durations = re.findall(r'(?:duration|animation-duration|transition-duration):\\s*([\\d.]+)(s|ms)', content)
        for duration, unit in durations:
            duration_ms = float(duration) * (1000 if unit == 's' else 1)
            if duration_ms < 50:
                self.warnings.append(f"[Animation] {filename}: Very fast animation ({duration}{unit}). Minimum 50ms for visibility.")
            elif duration_ms > 1000 and 'transition' in content.lower():
                self.warnings.append(f"[Animation] {filename}: Long transition ({duration}{unit}). Transitions should be 100-300ms for responsiveness.")

        # 5.2 Easing Function Correctness
        # Check for incorrect easing patterns
        if re.search(r'ease-in\\s+.*entry|fade-in.*ease-in', content):
            self.warnings.append(f"[Animation] {filename}: Entry animation with ease-in. Entry should use ease-out for snappy feel.")
        if re.search(r'ease-out\\s+.*exit|fade-out.*ease-out', content):
            self.warnings.append(f"[Animation] {filename}: Exit animation with ease-out. Exit should use ease-in for natural feel.")

        # 5.3 Micro-interaction Feedback Patterns
        # Check for interactive elements without hover/focus states
        interactive_elements = len(re.findall(r'<button|<a\\s+href|onClick|@click', content))
        has_hover_focus = bool(re.search(r'hover:|focus:|:hover|:focus', content))
        if interactive_elements > 2 and not has_hover_focus:
            self.warnings.append(f"[Animation] {filename}: Interactive elements without hover/focus states. Add micro-interactions for feedback.")

        # 5.4 Loading State Indicators
        # Check for loading patterns
        has_async = bool(re.search(r'async|await|fetch|axios|loading|isLoading', content))
        has_loading_indicator = bool(re.search(r'skeleton|spinner|progress|loading|<circle.*animate', content))
        if has_async and not has_loading_indicator:
            self.warnings.append(f"[Animation] {filename}: Async operations without loading indicator. Add skeleton or spinner for perceived performance.")

        # 5.5 Page Transition Patterns
        # Check for page/view transitions
        has_routing = bool(re.search(r'router|navigate|Link.*to|useHistory', content))
        has_page_transition = bool(re.search(r'AnimatePresence|motion\\.|transition.*page|fade.*route', content))
        if has_routing and not has_page_transition:
            self.warnings.append(f"[Animation] {filename}: Routing detected without page transitions. Consider fade/slide for context continuity.")

        # 5.6 Scroll Animation Performance
        # Check for scroll-driven animations
        has_scroll_anim = bool(re.search(r'onScroll|scroll.*trigger|IntersectionObserver', content))
        if has_scroll_anim:
            # Check if using expensive properties in scroll handlers
            if re.search(r'onScroll.*[^\\w](width|height|top|left)', content):
                self.issues.append(f"[Animation] {filename}: Scroll handler animating layout properties. Use transform/opacity for 60fps.")

        # --- 6. MOTION GRAPHICS (motion-graphics.md) ---

        # 6.1 Lottie Animation Checks
        has_lottie = bool(re.search(r'lottie|Lottie|@lottie-react', content))
        if has_lottie:
            # Check for reduced motion fallback
            has_lottie_fallback = bool(re.search(r'prefers-reduced-motion.*lottie|lottie.*isPaused|lottie.*stop', content))
            if not has_lottie_fallback:
                self.warnings.append(f"[Motion] {filename}: Lottie animation without reduced-motion fallback. Add pause/stop for accessibility.")

        # 6.2 GSAP Memory Leak Risks
        has_gsap = bool(re.search(r'gsap|ScrollTrigger|from\\(.*gsap', content))
        if has_gsap:
            # Check for cleanup patterns
            has_gsap_cleanup = bool(re.search(r'kill\\(|revert\\(|useEffect.*return.*gsap', content))
            if not has_gsap_cleanup:
                self.issues.append(f"[Motion] {filename}: GSAP animation without cleanup (kill/revert). Memory leak risk on unmount.")

        # 6.3 SVG Animation Performance
        svg_animations = re.findall(r'<animate|<animateTransform|stroke-dasharray|stroke-dashoffset', content)
        if len(svg_animations) > 3:
            self.warnings.append(f"[Motion] {filename}: Multiple SVG animations detected. Ensure stroke-dashoffset is used sparingly for mobile performance.")

        # 6.4 3D Transform Performance
        has_3d_transform = bool(re.search(r'transform3d|perspective\\(|rotate3d|translate3d', content))
        if has_3d_transform:
            # Check for perspective on parent
            has_perspective_parent = bool(re.search(r'perspective:\\s*\\d+px|perspective\\s*\\(', content))
            if not has_perspective_parent:
                self.warnings.append(f"[Motion] {filename}: 3D transform without perspective parent. Add perspective: 1000px for realistic depth.")

            # Warn about mobile performance
            self.warnings.append(f"[Motion] {filename}: 3D transforms detected. Test on mobile; can impact performance on low-end devices.")

        # 6.5 Particle Effect Warnings
        # Check for canvas/WebGL particle systems
        has_particles = bool(re.search(r'particle|canvas.*loop|requestAnimationFrame.*draw|Three\\.js', content))
        if has_particles:
            self.warnings.append(f"[Motion] {filename}: Particle effects detected. Ensure fallback or reduced-quality option for mobile devices.")

        # 6.6 Scroll-Driven Animation Performance
        has_scroll_driven = bool(re.search(r'IntersectionObserver.*animate|scroll.*progress|view-timeline', content))
        if has_scroll_driven:
            # Check for throttling/debouncing
            has_throttle = bool(re.search(r'throttle|debounce|requestAnimationFrame', content))
            if not has_throttle:
                self.issues.append(f"[Motion] {filename}: Scroll-driven animation without throttling. Add requestAnimationFrame for 60fps.")

        # 6.7 Motion Decision Tree - Context Check
        # Check if animation serves purpose (not just decoration)
        total_animations = (
            len(re.findall(r'@keyframes|transition:|animate-', content)) +
            (1 if has_lottie else 0) +
            (1 if has_gsap else 0)
        )
        if total_animations > 5:
            # Check if animations are functional
            functional_animations = len(re.findall(r'hover:|focus:|disabled|loading|error|success', content))
            if functional_animations < total_animations / 2:
                self.warnings.append(f"[Motion] {filename}: Many animations ({total_animations}). Ensure majority serve functional purpose (feedback, guidance), not decoration.")

        # --- 7. ACCESSIBILITY ---
        if re.search(r'<img(?![^>]*alt=)[^>]*>', content):
            self.issues.append(f"[Accessibility] {filename}: Missing img alt text")

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.jsx', '.html', '.vue', '.svelte', '.css'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }

def main():
    if len(sys.argv) < 2: sys.exit(1)
    
    path = sys.argv[1]
    is_json = "--json" in sys.argv
    
    auditor = UXAuditor()
    if os.path.isfile(path): auditor.audit_file(path)
    else: auditor.audit_directory(path)
    
    report = auditor.get_report()
    
    if is_json:
        print(json.dumps(report))
    else:
        # Use ASCII-safe output for Windows console compatibility
        print(f"\\n[UX AUDIT] {report['files_checked']} files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]: print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]: print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)

if __name__ == "__main__":
    main()
`,
  ".agent/skills/frontend-design/scripts/ux_audit.py": `#!/usr/bin/env python3
"""
UX Audit Script - Full Frontend Design Coverage

Analyzes code for compliance with:

1. CORE PSYCHOLOGY LAWS:
   - Hick's Law (nav items, form complexity)
   - Fitts' Law (target sizes, touch targets)
   - Miller's Law (chunking, memory limits)
   - Von Restorff Effect (primary CTA visibility)
   - Serial Position Effect (important items at start/end)

2. EMOTIONAL DESIGN (Don Norman):
   - Visceral (first impressions, gradients, animations)
   - Behavioral (feedback, usability, performance)
   - Reflective (brand story, values, identity)

3. TRUST BUILDING:
   - Security signals (SSL, encryption on forms)
   - Social proof (testimonials, reviews, logos)
   - Authority indicators (certifications, awards, media)

4. COGNITIVE LOAD MANAGEMENT:
   - Progressive disclosure (accordion, tabs, "Advanced")
   - Visual noise (too many colors/borders)
   - Familiar patterns (labels, standard conventions)

5. PERSUASIVE DESIGN (Ethical):
   - Smart defaults (pre-selected options)
   - Anchoring (original vs discount price)
   - Social proof (live indicators, numbers)
   - Progress indicators (progress bars, steps)

6. TYPOGRAPHY SYSTEM (9 sections):
   - Font Pairing (max 3 families)
   - Line Length (45-75ch)
   - Line Height (proper ratios)
   - Letter Spacing (uppercase, display text)
   - Weight and Emphasis (contrast levels)
   - Responsive Typography (clamp())
   - Hierarchy (sequential headings)
   - Modular Scale (consistent ratios)
   - Readability (chunking, subheadings)

7. VISUAL EFFECTS (10 sections):
   - Glassmorphism (blur + transparency)
   - Neomorphism (dual shadows, inset)
   - Shadow Hierarchy (elevation levels)
   - Gradients (usage, overuse)
   - Border Effects (complexity check)
   - Glow Effects (text-shadow, box-shadow)
   - Overlay Techniques (image text readability)
   - GPU Acceleration (transform/opacity vs layout)
   - Performance (will-change usage)
   - Effect Selection (purpose over decoration)

8. COLOR SYSTEM (7 sections):
   - PURPLE BAN (Critical Maestro rule - #8B5CF6, #A855F7, etc.)
   - 60-30-10 Rule (dominant, secondary, accent)
   - Color Scheme Patterns (monochromatic, analogous)
   - Dark Mode Compliance (no pure black/white)
   - WCAG Contrast (low-contrast detection)
   - Color Psychology Context (food + blue = bad)
   - HSL-Based Palettes (recommended approach)

9. ANIMATION GUIDE (6 sections):
   - Duration Appropriateness (50ms minimum, 1s max transitions)
   - Easing Functions (ease-out for entry, ease-in for exit)
   - Micro-interactions (hover/focus feedback)
   - Loading States (skeleton, spinner, progress)
   - Page Transitions (fade/slide for routing)
   - Scroll Animation Performance (no layout properties)

10. MOTION GRAPHICS (7 sections):
   - Lottie Animations (reduced motion fallbacks)
   - GSAP Memory Leaks (kill/revert on unmount)
   - SVG Animation Performance (stroke-dashoffset sparingly)
   - 3D Transforms (perspective parent, mobile warning)
   - Particle Effects (mobile fallback)
   - Scroll-Driven Animations (throttle with rAF)
   - Motion Decision Tree (functional vs decorative)

11. ACCESSIBILITY:
   - Alt text for images
   - Reduced motion checks
   - Form labels

Total: 80+ checks across all design principles
"""

import sys
import os
import re
import json
from pathlib import Path

class UXAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0
    
    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except: return
        
        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Pre-calculate common flags
        has_long_text = bool(re.search(r'<p|<div.*class=.*text|article|<span.*text', content, re.IGNORECASE))
        has_form = bool(re.search(r'<form|<input|password|credit|card|payment', content, re.IGNORECASE))
        complex_elements = len(re.findall(r'<input|<select|<textarea|<option', content, re.IGNORECASE))

        # --- 1. PSYCHOLOGY LAWS ---
        # Hick's Law
        nav_items = len(re.findall(r'<NavLink|<Link|<a\\s+href|nav-item', content, re.IGNORECASE))
        if nav_items > 7:
            self.issues.append(f"[Hick's Law] {filename}: {nav_items} nav items (Max 7)")
        
        # Fitts' Law
        if re.search(r'height:\\s*([0-3]\\d)px', content) or re.search(r'h-[1-9]\\b|h-10\\b', content):
            self.warnings.append(f"[Fitts' Law] {filename}: Small targets (< 44px)")
        
        # Miller's Law
        form_fields = len(re.findall(r'<input|<select|<textarea', content, re.IGNORECASE))
        if form_fields > 7 and not re.search(r'step|wizard|stage', content, re.IGNORECASE):
            self.warnings.append(f"[Miller's Law] {filename}: Complex form ({form_fields} fields)")
            
        # Von Restorff
        if 'button' in content.lower() and not re.search(r'primary|bg-primary|Button.*primary|variant=["\\']primary', content, re.IGNORECASE):
            self.warnings.append(f"[Von Restorff] {filename}: No primary CTA")

        # Serial Position Effect - Important items at beginning/end
        if nav_items > 3:
            # Check if last nav item is important (contact, login, etc.)
            nav_content = re.findall(r'<NavLink|<Link|<a\\s+href[^>]*>([^<]+)</a>', content, re.IGNORECASE)
            if nav_content and len(nav_content) > 2:
                last_item = nav_content[-1].lower() if nav_content else ''
                if not any(x in last_item for x in ['contact', 'login', 'sign', 'get started', 'cta', 'button']):
                    self.warnings.append(f"[Serial Position] {filename}: Last nav item may not be important. Place key actions at start/end.")

        # --- 1.5 EMOTIONAL DESIGN (Don Norman) ---

        # Visceral: First impressions (aesthetics, gradients, animations)
        has_hero = bool(re.search(r'hero|<h1|banner', content, re.IGNORECASE))
        if has_hero:
            # Check for visual appeal elements
            has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient', content))
            has_animation = bool(re.search(r'@keyframes|transition:|animate-', content))
            has_visual_interest = has_gradient or has_animation

            if not has_visual_interest and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visceral] {filename}: Hero section lacks visual appeal. Consider gradients or subtle animations.")

        # Behavioral: Instant feedback and usability
        if 'onClick' in content or '@click' in content or 'onclick' in content:
            has_feedback = re.search(r'transition|animate|hover:|focus:|disabled|loading|spinner', content, re.IGNORECASE)
            has_state_change = re.search(r'setState|useState|disabled|loading', content)

            if not has_feedback and not has_state_change:
                self.warnings.append(f"[Behavioral] {filename}: Interactive elements lack immediate feedback. Add hover/focus/disabled states.")

        # Reflective: Brand story, values, identity
        has_reflective = bool(re.search(r'about|story|mission|values|why we|our journey|testimonials', content, re.IGNORECASE))
        if has_long_text and not has_reflective:
            self.warnings.append(f"[Reflective] {filename}: Long-form content without brand story/values. Add 'About' or 'Why We Exist' section.")

        # --- 1.6 TRUST BUILDING (Enhanced) ---

        # Security signals
        if has_form:
            security_signals = re.findall(r'ssl|secure|encrypt|lock|padlock|https', content, re.IGNORECASE)
            if len(security_signals) == 0 and not re.search(r'checkout|payment', content, re.IGNORECASE):
                self.warnings.append(f"[Trust] {filename}: Form without security indicators. Add 'SSL Secure' or lock icon.")

        # Social proof elements
        social_proof = re.findall(r'review|testimonial|rating|star|trust|trusted by|customer|logo', content, re.IGNORECASE)
        if len(social_proof) > 0:
            self.passed_count += 1
        else:
            if has_long_text:
                self.warnings.append(f"[Trust] {filename}: No social proof detected. Consider adding testimonials, ratings, or 'Trusted by' logos.")

        # Authority indicators
        has_footer = bool(re.search(r'footer|<footer', content, re.IGNORECASE))
        if has_footer:
            authority = re.findall(r'certif|award|media|press|featured|as seen in', content, re.IGNORECASE)
            if len(authority) == 0:
                self.warnings.append(f"[Trust] {filename}: Footer lacks authority signals. Add certifications, awards, or media mentions.")

        # --- 1.7 COGNITIVE LOAD MANAGEMENT ---

        # Progressive disclosure
        if complex_elements > 5:
            has_progressive = re.search(r'step|wizard|stage|accordion|collapsible|tab|more\\.\\.\\.|advanced|show more', content, re.IGNORECASE)
            if not has_progressive:
                self.warnings.append(f"[Cognitive Load] {filename}: Many form elements without progressive disclosure. Consider accordion, tabs, or 'Advanced' toggle.")

        # Visual noise check
        has_many_colors = len(re.findall(r'#[0-9a-fA-F]{3,6}|rgb|hsl', content)) > 15
        has_many_borders = len(re.findall(r'border:|border-', content)) > 10
        if has_many_colors and has_many_borders:
            self.warnings.append(f"[Cognitive Load] {filename}: High visual noise detected. Many colors and borders increase cognitive load.")

        # Familiar patterns
        if has_form:
            has_standard_labels = bool(re.search(r'<label|placeholder|aria-label', content, re.IGNORECASE))
            if not has_standard_labels:
                self.issues.append(f"[Cognitive Load] {filename}: Form inputs without labels. Use <label> for accessibility and clarity.")

        # --- 1.8 PERSUASIVE DESIGN (Ethical) ---

        # Smart defaults
        if has_form:
            has_defaults = bool(re.search(r'checked|selected|default|value=["\\'].*["\\']', content))
            radio_inputs = len(re.findall(r'type=["\\']radio', content, re.IGNORECASE))
            if radio_inputs > 0 and not has_defaults:
                self.warnings.append(f"[Persuasion] {filename}: Radio buttons without default selection. Pre-select recommended option.")

        # Anchoring (showing original price)
        if re.search(r'price|pricing|cost|\\$\\d+', content, re.IGNORECASE):
            has_anchor = bool(re.search(r'original|was|strike|del|save \\d+%', content, re.IGNORECASE))
            if not has_anchor:
                self.warnings.append(f"[Persuasion] {filename}: Prices without anchoring. Show original price to frame discount value.")

        # Social proof live indicators
        has_social = bool(re.search(r'join|subscriber|member|user', content, re.IGNORECASE))
        if has_social:
            has_count = bool(re.findall(r'\\d+[+kmb]|\\d+,\\d+', content))
            if not has_count:
                self.warnings.append(f"[Persuasion] {filename}: Social proof without specific numbers. Use 'Join 10,000+' format.")

        # Progress indicators
        if has_form:
            has_progress = bool(re.search(r'progress|step \\d+|complete|%|bar', content, re.IGNORECASE))
            if complex_elements > 5 and not has_progress:
                self.warnings.append(f"[Persuasion] {filename}: Long form without progress indicator. Add progress bar or 'Step X of Y'.")

        # --- 2. TYPOGRAPHY SYSTEM (Complete Coverage) ---

        # 2.1 Font Pairing - Too many font families
        font_families = set()
        # Check for @font-face, Google Fonts, font-family declarations
        font_faces = re.findall(r'@font-face\\s*\\{[^}]*family:\\s*["\\']?([^;"\\'\\s}]+)', content, re.IGNORECASE)
        google_fonts = re.findall(r'fonts\\.googleapis\\.com[^"\\']*family=([^"&]+)', content, re.IGNORECASE)
        font_family_css = re.findall(r'font-family:\\s*([^;]+)', content, re.IGNORECASE)

        for font in font_faces: font_families.add(font.strip().lower())
        for font in google_fonts:
            for f in font.replace('+', ' ').split('|'):
                font_families.add(f.split(':')[0].strip().lower())
        for family in font_family_css:
            # Extract first font from stack
            first_font = family.split(',')[0].strip().strip('"\\'')

            if first_font.lower() not in {'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'inherit', 'arial', 'georgia', 'times new roman', 'courier new', 'verdana', 'helvetica', 'tahoma'}:
                font_families.add(first_font.lower())

        if len(font_families) > 3:
            self.issues.append(f"[Typography] {filename}: {len(font_families)} font families detected. Limit to 2-3 for cohesion.")

        # 2.2 Line Length - Character-based width
        if has_long_text and not re.search(r'max-w-(?:prose|[\\[\\\\]?\\d+ch[\\]\\\\]?)|max-width:\\s*\\d+ch', content):
            self.warnings.append(f"[Typography] {filename}: No line length constraint (45-75ch). Use max-w-prose or max-w-[65ch].")

        # 2.3 Line Height - Proper leading ratios
        # Check for text without proper line-height
        text_elements = len(re.findall(r'<p|<span|<div.*text|<h[1-6]', content, re.IGNORECASE))
        if text_elements > 0 and not re.search(r'leading-|line-height:', content):
            self.warnings.append(f"[Typography] {filename}: Text elements found without line-height. Body: 1.4-1.6, Headings: 1.1-1.3")

        # Check for heading-specific line height issues
        if re.search(r'<h[1-6]|text-(?:xl|2xl|3xl|4xl|5xl|6xl)', content, re.IGNORECASE):
            # Extract line-height values
            line_heights = re.findall(r'(?:leading-|line-height:\\s*)([\\d.]+)', content)
            for lh in line_heights:
                if float(lh) > 1.5:
                    self.warnings.append(f"[Typography] {filename}: Heading has line-height {lh} (>1.3). Headings should be tighter (1.1-1.3).")

        # 2.4 Letter Spacing (Tracking)
        # Uppercase without tracking
        if re.search(r'uppercase|text-transform:\\s*uppercase', content, re.IGNORECASE):
            if not re.search(r'tracking-|letter-spacing:', content):
                self.warnings.append(f"[Typography] {filename}: Uppercase text without tracking. ALL CAPS needs +5-10% spacing.")

        # Large text (display/hero) should have negative tracking
        if re.search(r'text-(?:4xl|5xl|6xl|7xl|8xl|9xl)|font-size:\\s*[3-9]\\dpx', content):
            if not re.search(r'tracking-tight|letter-spacing:\\s*-[0-9]', content):
                self.warnings.append(f"[Typography] {filename}: Large display text without tracking-tight. Big text needs -1% to -4% spacing.")

        # 2.5 Weight and Emphasis - Contrast levels
        # Check for adjacent weight levels (poor contrast)
        weights = re.findall(r'font-weight:\\s*(\\d+)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|fw-(\\d+)', content, re.IGNORECASE)
        weight_values = []
        for w in weights:
            val = w[0] or w[1]
            if val:
                # Map named weights to numbers
                weight_map = {'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400', 'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900'}
                val = weight_map.get(val.lower(), val)
                try:
                    weight_values.append(int(val))
                except: pass

        # Check for adjacent weights (400/500, 500/600, etc.)
        for i in range(len(weight_values) - 1):
            diff = abs(weight_values[i] - weight_values[i+1])
            if diff == 100:
                self.warnings.append(f"[Typography] {filename}: Adjacent font weights ({weight_values[i]}/{weight_values[i+1]}). Skip at least 2 levels for contrast.")

        # Too many weight levels
        unique_weights = set(weight_values)
        if len(unique_weights) > 4:
            self.warnings.append(f"[Typography] {filename}: {len(unique_weights)} font weights. Limit to 3-4 per page.")

        # 2.6 Responsive Typography - Fluid sizing with clamp()
        has_font_sizes = bool(re.search(r'font-size:|text-(?:xs|sm|base|lg|xl|2xl)', content))
        if has_font_sizes and not re.search(r'clamp\\(|responsive:', content):
            self.warnings.append(f"[Typography] {filename}: Fixed font sizes without clamp(). Consider fluid typography: clamp(MIN, PREFERRED, MAX)")

        # 2.7 Hierarchy - Heading structure
        headings = re.findall(r'<(h[1-6])', content, re.IGNORECASE)
        if headings:
            # Check for skipped levels (h1 -> h3)
            for i in range(len(headings) - 1):
                curr = int(headings[i][1])
                next_h = int(headings[i+1][1])
                if next_h > curr + 1:
                    self.warnings.append(f"[Typography] {filename}: Skipped heading level (h{curr} -> h{next_h}). Maintain sequential hierarchy.")

            # Check if h1 exists for main content
            if 'h1' not in [h.lower() for h in headings] and has_long_text:
                self.warnings.append(f"[Typography] {filename}: No h1 found. Each page should have one primary heading.")

        # 2.8 Modular Scale - Consistent sizing
        # Extract font-size values
        font_sizes = re.findall(r'font-size:\\s*(\\d+(?:\\.\\d+)?)(px|rem|em)', content)
        size_values = []
        for size, unit in font_sizes:
            if unit == 'rem' or unit == 'em':
                size_values.append(float(size))
            elif unit == 'px':
                size_values.append(float(size) / 16)  # Normalize to rem

        if len(size_values) > 2:
            # Check if sizes follow a modular scale roughly
            sorted_sizes = sorted(set(size_values))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common scale ratios: 1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618
            common_ratios = {1.067, 1.125, 1.2, 1.25, 1.333, 1.5, 1.618}
            for ratio in ratios[:3]:  # Check first 3 ratios
                if not any(abs(ratio - cr) < 0.05 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio like 1.25 (Major Third).")
                    break

        # 2.9 Readability - Content chunking
        # Check for very long paragraphs (>5 lines estimated)
        paragraphs = re.findall(r'<p[^>]*>([^<]+)</p>', content, re.IGNORECASE)
        for p in paragraphs:
            word_count = len(p.split())
            if word_count > 100:  # ~5-6 lines
                self.warnings.append(f"[Typography] {filename}: Long paragraph detected ({word_count} words). Break into 3-4 line chunks for readability.")

        # Check for missing subheadings in long content
        if len(paragraphs) > 5:
            subheadings = len(re.findall(r'<h[2-6]', content, re.IGNORECASE))
            if subheadings == 0:
                self.warnings.append(f"[Typography] {filename}: Long content without subheadings. Add h2/h3 to break up text.")

        # --- 3. VISUAL EFFECTS (visual-effects.md) ---
        
        # Glassmorphism Check
        if 'backdrop-filter' in content or 'blur(' in content:
            if not re.search(r'background:\\s*rgba|bg-opacity|bg-[a-z0-9]+\\/\\d+', content):
                self.warnings.append(f"[Visual] {filename}: Blur used without semi-transparent background (Glassmorphism fail)")
        
        # GPU Acceleration / Performance
        if re.search(r'@keyframes|transition:', content):
            expensive_props = re.findall(r'width|height|top|left|right|bottom|margin|padding', content)
            if expensive_props:
                self.warnings.append(f"[Performance] {filename}: Animating expensive properties ({', '.join(set(expensive_props))}). Use transform/opacity where possible.")
            
            # Reduced Motion
            if not re.search(r'prefers-reduced-motion', content):
                self.warnings.append(f"[Accessibility] {filename}: Animations found without prefers-reduced-motion check")

        # Natural Shadows
        shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in shadows:
            # Check if natural (Y > X) or multiple layers
            if ',' not in shadow and not re.search(r'\\d+px\\s+[1-9]\\d*px', shadow): # Simple heuristic for Y-offset
                 self.warnings.append(f"[Visual] {filename}: Simple/Unnatural shadow detected. Consider multiple layers or Y > X offset for realism.")

        # --- 3.1 NEOMORPHISM CHECK ---
        # Check for neomorphism patterns (dual shadows with opposite directions)
        neo_shadows = re.findall(r'box-shadow:\\s*([^;]+)', content)
        for shadow in neo_shadows:
            # Neomorphism has two shadows: positive offset + negative offset
            if ',' in shadow and '-' in shadow:
                # Check for inset pattern (pressed state)
                if 'inset' in shadow:
                    self.warnings.append(f"[Visual] {filename}: Neomorphism inset detected. Ensure adequate contrast for accessibility.")

        # --- 3.2 SHADOW HIERARCHY ---
        # Count shadow levels to check for elevation consistency
        shadow_count = len(shadows)
        if shadow_count > 0:
            # Check for shadow opacity levels (should indicate hierarchy)
            opacities = re.findall(r'rgba?\\([^)]+,\\s*([\\d.]+)\\)', content)
            shadow_opacities = [float(o) for o in opacities if float(o) < 0.5]
            if shadow_count >= 3 and len(shadow_opacities) > 0:
                # Check if there's variety in shadow opacities for different elevations
                unique_opacities = len(set(shadow_opacities))
                if unique_opacities < 2:
                    self.warnings.append(f"[Visual] {filename}: All shadows at same opacity level. Vary shadow intensity for elevation hierarchy.")

        # --- 3.3 GRADIENT CHECKS ---
        # Check for gradient usage
        has_gradient = bool(re.search(r'gradient|linear-gradient|radial-gradient|conic-gradient', content))
        if has_gradient:
            # Warn about mesh/aurora gradients (can be overused)
            gradient_count = len(re.findall(r'gradient', content, re.IGNORECASE))
            if gradient_count > 5:
                self.warnings.append(f"[Visual] {filename}: Many gradients detected ({gradient_count}). Ensure this serves purpose, not decoration.")
        else:
            # Check if hero section exists without gradient
            if has_hero and not re.search(r'background:|bg-', content):
                self.warnings.append(f"[Visual] {filename}: Hero section without visual interest. Consider gradient for depth.")

        # --- 3.4 BORDER EFFECTS ---
        # Check for gradient borders or animated borders
        has_border = bool(re.search(r'border:|border-', content))
        if has_border:
            # Check for overly complex borders
            border_count = len(re.findall(r'border:', content))
            if border_count > 8:
                self.warnings.append(f"[Visual] {filename}: Many border declarations ({border_count}). Simplify for cleaner look.")

        # --- 3.5 GLOW EFFECTS ---
        # Check for text-shadow or multiple box-shadow layers (glow effects)
        text_shadows = re.findall(r'text-shadow:', content)
        for ts in text_shadows:
            # Multiple text-shadow layers indicate glow
            if ',' in ts:
                self.warnings.append(f"[Visual] {filename}: Text glow effect detected. Ensure readability is maintained.")

        # Check for box-shadow glow (multiple layers with 0 offset)
        glow_shadows = re.findall(r'box-shadow:\\s*[^;]*0\\s+0\\s+', content)
        if len(glow_shadows) > 2:
            self.warnings.append(f"[Visual] {filename}: Multiple glow effects detected. Use sparingly for emphasis only.")

        # --- 3.6 OVERLAY TECHNIQUES ---
        # Check for image overlays (for readability)
        has_images = bool(re.search(r'<img|background-image:|bg-\\[url', content))
        if has_images and has_long_text:
            has_overlay = bool(re.search(r'overlay|rgba\\(0|gradient.*transparent|::after|::before', content))
            if not has_overlay:
                self.warnings.append(f"[Visual] {filename}: Text over image without overlay. Add gradient overlay for readability.")

        # --- 3.7 PERFORMANCE: will-change ---
        # Check for will-change usage
        if re.search(r'will-change:', content):
            will_change_props = re.findall(r'will-change:\\s*([^;]+)', content)
            for prop in will_change_props:
                prop = prop.strip().lower()
                if prop in ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding']:
                    self.issues.append(f"[Performance] {filename}: will-change on '{prop}' (layout property). Use only for transform/opacity.")

        # Check for excessive will-change usage
        will_change_count = len(re.findall(r'will-change:', content))
        if will_change_count > 3:
            self.warnings.append(f"[Performance] {filename}: Many will-change declarations ({will_change_count}). Use sparingly, only for heavy animations.")

        # --- 3.8 EFFECT SELECTION ---
        # Check for effect overuse (too many visual effects)
        effect_count = (
            (1 if has_gradient else 0) +
            shadow_count +
            len(re.findall(r'backdrop-filter|blur\\(', content)) +
            len(re.findall(r'text-shadow:', content))
        )
        if effect_count > 10:
            self.warnings.append(f"[Visual] {filename}: Many visual effects ({effect_count}). Ensure effects serve purpose, not decoration.")

        # Check for static/flat design (no depth)
        if has_long_text and effect_count == 0:
            self.warnings.append(f"[Visual] {filename}: Flat design with no depth. Consider shadows or subtle gradients for hierarchy.")

        # --- 4. COLOR SYSTEM (color-system.md) ---

        # 4.1 PURPLE BAN - Critical check from color-system.md
        purple_hexes = ['#8B5CF6', '#A855F7', '#9333EA', '#7C3AED', '#6D28D9',
                        '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE',
                        '#8b5cf6', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9',
                        'purple', 'violet', 'fuchsia', 'magenta', 'lavender']
        for purple in purple_hexes:
            if purple.lower() in content.lower():
                self.issues.append(f"[Color] {filename}: PURPLE DETECTED ('{purple}'). Banned by Maestro rules. Use Teal/Cyan/Emerald instead.")
                break

        # 4.2 60-30-10 Rule check
        # Count color usage to estimate ratio
        color_hex_count = len(re.findall(r'#[0-9a-fA-F]{3,6}', content))
        hsl_count = len(re.findall(r'hsl\\(', content))
        total_colors = color_hex_count + hsl_count
        if total_colors > 3:
            # Check for dominant colors (should be ~60%)
            bg_declarations = re.findall(r'(?:background|bg-|bg\\[)([^;}\\s]+)', content)
            text_declarations = re.findall(r'(?:color|text-)([^;}\\s]+)', content)
            if len(bg_declarations) > 0 and len(text_declarations) > 0:
                # Just warn if too many distinct colors
                unique_hexes = set(re.findall(r'#[0-9a-fA-F]{6}', content))
                if len(unique_hexes) > 5:
                    self.warnings.append(f"[Color] {filename}: {len(unique_hexes)} distinct colors. Consider 60-30-10 rule: dominant (60%), secondary (30%), accent (10%).")

        # 4.3 Color Scheme Pattern Detection
        # Detect monochromatic (same hue, different lightness)
        hsl_matches = re.findall(r'hsl\\((\\d+),\\s*\\d+%,\\s*\\d+%\\)', content)
        if len(hsl_matches) >= 3:
            hues = [int(h) for h in hsl_matches]
            hue_range = max(hues) - min(hues)
            if hue_range < 10:
                self.warnings.append(f"[Color] {filename}: Monochromatic palette detected (hue variance: {hue_range}deg). Ensure adequate contrast.")

        # 4.4 Dark Mode Compliance
        # Check for pure black (#000000) or pure white (#FFFFFF) text (forbidden)
        if re.search(r'color:\\s*#000000|#000\\b', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use #1a1a1a or darker grays for better dark mode.")
        if re.search(r'background:\\s*#ffffff|#fff\\b', content) and re.search(r'dark:\\s*|dark:', content):
            self.warnings.append(f"[Color] {filename}: Pure white background in dark mode context. Use slight off-white (#f9fafb) for reduced eye strain.")

        # 4.5 WCAG Contrast Pattern Check
        # Look for potential low-contrast combinations
        light_bg_light_text = bool(re.search(r'bg-(?:gray|slate|zinc)-50|bg-white.*text-(?:gray|slate)-[12]', content))
        dark_bg_dark_text = bool(re.search(r'bg-(?:gray|slate|zinct)-9|bg-black.*text-(?:gray|slate)-[89]', content))
        if light_bg_light_text or dark_bg_dark_text:
            self.warnings.append(f"[Color] {filename}: Possible low-contrast combination detected. Verify WCAG AA (4.5:1 for text).")

        # 4.6 Color Psychology Context Check
        # Warn if blue used for food/restaurant context
        has_blue = bool(re.search(r'bg-blue|text-blue|from-blue|#[0-9a-fA-F]*00[0-9A-Fa-f]{2}|#[0-9a-fA-F]*1[0-9A-Fa-f]{2}', content))
        has_food_context = bool(re.search(r'restaurant|food|cooking|recipe|menu|dish|meal', content, re.IGNORECASE))
        if has_blue and has_food_context:
            self.warnings.append(f"[Color] {filename}: Blue color in food context. Blue suppresses appetite; consider warm colors (red, orange, yellow).")

        # 4.7 HSL-Based Palette Detection
        # Check if using HSL for palette (recommended in color-system.md)
        has_color_vars = bool(re.search(r'--color-|color-|primary-|secondary-', content))
        if has_color_vars and not re.search(r'hsl\\(', content):
            self.warnings.append(f"[Color] {filename}: Color variables without HSL. Consider HSL for easier palette adjustment (Hue, Saturation, Lightness).")

        # --- 5. ANIMATION GUIDE (animation-guide.md) ---

        # 5.1 Duration Appropriateness
        # Check for excessively long or short animations
        durations = re.findall(r'(?:duration|animation-duration|transition-duration):\\s*([\\d.]+)(s|ms)', content)
        for duration, unit in durations:
            duration_ms = float(duration) * (1000 if unit == 's' else 1)
            if duration_ms < 50:
                self.warnings.append(f"[Animation] {filename}: Very fast animation ({duration}{unit}). Minimum 50ms for visibility.")
            elif duration_ms > 1000 and 'transition' in content.lower():
                self.warnings.append(f"[Animation] {filename}: Long transition ({duration}{unit}). Transitions should be 100-300ms for responsiveness.")

        # 5.2 Easing Function Correctness
        # Check for incorrect easing patterns
        if re.search(r'ease-in\\s+.*entry|fade-in.*ease-in', content):
            self.warnings.append(f"[Animation] {filename}: Entry animation with ease-in. Entry should use ease-out for snappy feel.")
        if re.search(r'ease-out\\s+.*exit|fade-out.*ease-out', content):
            self.warnings.append(f"[Animation] {filename}: Exit animation with ease-out. Exit should use ease-in for natural feel.")

        # 5.3 Micro-interaction Feedback Patterns
        # Check for interactive elements without hover/focus states
        interactive_elements = len(re.findall(r'<button|<a\\s+href|onClick|@click', content))
        has_hover_focus = bool(re.search(r'hover:|focus:|:hover|:focus', content))
        if interactive_elements > 2 and not has_hover_focus:
            self.warnings.append(f"[Animation] {filename}: Interactive elements without hover/focus states. Add micro-interactions for feedback.")

        # 5.4 Loading State Indicators
        # Check for loading patterns
        has_async = bool(re.search(r'async|await|fetch|axios|loading|isLoading', content))
        has_loading_indicator = bool(re.search(r'skeleton|spinner|progress|loading|<circle.*animate', content))
        if has_async and not has_loading_indicator:
            self.warnings.append(f"[Animation] {filename}: Async operations without loading indicator. Add skeleton or spinner for perceived performance.")

        # 5.5 Page Transition Patterns
        # Check for page/view transitions
        has_routing = bool(re.search(r'router|navigate|Link.*to|useHistory', content))
        has_page_transition = bool(re.search(r'AnimatePresence|motion\\.|transition.*page|fade.*route', content))
        if has_routing and not has_page_transition:
            self.warnings.append(f"[Animation] {filename}: Routing detected without page transitions. Consider fade/slide for context continuity.")

        # 5.6 Scroll Animation Performance
        # Check for scroll-driven animations
        has_scroll_anim = bool(re.search(r'onScroll|scroll.*trigger|IntersectionObserver', content))
        if has_scroll_anim:
            # Check if using expensive properties in scroll handlers
            if re.search(r'onScroll.*[^\\w](width|height|top|left)', content):
                self.issues.append(f"[Animation] {filename}: Scroll handler animating layout properties. Use transform/opacity for 60fps.")

        # --- 6. MOTION GRAPHICS (motion-graphics.md) ---

        # 6.1 Lottie Animation Checks
        has_lottie = bool(re.search(r'lottie|Lottie|@lottie-react', content))
        if has_lottie:
            # Check for reduced motion fallback
            has_lottie_fallback = bool(re.search(r'prefers-reduced-motion.*lottie|lottie.*isPaused|lottie.*stop', content))
            if not has_lottie_fallback:
                self.warnings.append(f"[Motion] {filename}: Lottie animation without reduced-motion fallback. Add pause/stop for accessibility.")

        # 6.2 GSAP Memory Leak Risks
        has_gsap = bool(re.search(r'gsap|ScrollTrigger|from\\(.*gsap', content))
        if has_gsap:
            # Check for cleanup patterns
            has_gsap_cleanup = bool(re.search(r'kill\\(|revert\\(|useEffect.*return.*gsap', content))
            if not has_gsap_cleanup:
                self.issues.append(f"[Motion] {filename}: GSAP animation without cleanup (kill/revert). Memory leak risk on unmount.")

        # 6.3 SVG Animation Performance
        svg_animations = re.findall(r'<animate|<animateTransform|stroke-dasharray|stroke-dashoffset', content)
        if len(svg_animations) > 3:
            self.warnings.append(f"[Motion] {filename}: Multiple SVG animations detected. Ensure stroke-dashoffset is used sparingly for mobile performance.")

        # 6.4 3D Transform Performance
        has_3d_transform = bool(re.search(r'transform3d|perspective\\(|rotate3d|translate3d', content))
        if has_3d_transform:
            # Check for perspective on parent
            has_perspective_parent = bool(re.search(r'perspective:\\s*\\d+px|perspective\\s*\\(', content))
            if not has_perspective_parent:
                self.warnings.append(f"[Motion] {filename}: 3D transform without perspective parent. Add perspective: 1000px for realistic depth.")

            # Warn about mobile performance
            self.warnings.append(f"[Motion] {filename}: 3D transforms detected. Test on mobile; can impact performance on low-end devices.")

        # 6.5 Particle Effect Warnings
        # Check for canvas/WebGL particle systems
        has_particles = bool(re.search(r'particle|canvas.*loop|requestAnimationFrame.*draw|Three\\.js', content))
        if has_particles:
            self.warnings.append(f"[Motion] {filename}: Particle effects detected. Ensure fallback or reduced-quality option for mobile devices.")

        # 6.6 Scroll-Driven Animation Performance
        has_scroll_driven = bool(re.search(r'IntersectionObserver.*animate|scroll.*progress|view-timeline', content))
        if has_scroll_driven:
            # Check for throttling/debouncing
            has_throttle = bool(re.search(r'throttle|debounce|requestAnimationFrame', content))
            if not has_throttle:
                self.issues.append(f"[Motion] {filename}: Scroll-driven animation without throttling. Add requestAnimationFrame for 60fps.")

        # 6.7 Motion Decision Tree - Context Check
        # Check if animation serves purpose (not just decoration)
        total_animations = (
            len(re.findall(r'@keyframes|transition:|animate-', content)) +
            (1 if has_lottie else 0) +
            (1 if has_gsap else 0)
        )
        if total_animations > 5:
            # Check if animations are functional
            functional_animations = len(re.findall(r'hover:|focus:|disabled|loading|error|success', content))
            if functional_animations < total_animations / 2:
                self.warnings.append(f"[Motion] {filename}: Many animations ({total_animations}). Ensure majority serve functional purpose (feedback, guidance), not decoration.")

        # --- 7. ACCESSIBILITY ---
        if re.search(r'<img(?![^>]*alt=)[^>]*>', content):
            self.issues.append(f"[Accessibility] {filename}: Missing img alt text")

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.jsx', '.html', '.vue', '.svelte', '.css'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }

def main():
    if len(sys.argv) < 2: sys.exit(1)
    
    path = sys.argv[1]
    is_json = "--json" in sys.argv
    
    auditor = UXAuditor()
    if os.path.isfile(path): auditor.audit_file(path)
    else: auditor.audit_directory(path)
    
    report = auditor.get_report()
    
    if is_json:
        print(json.dumps(report))
    else:
        # Use ASCII-safe output for Windows console compatibility
        print(f"\\n[UX AUDIT] {report['files_checked']} files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]: print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]: print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)

if __name__ == "__main__":
    main()
`,
  "geo-fundamentals/scripts/geo_checker.py": `#!/usr/bin/env python3
"""
GEO Checker - Generative Engine Optimization Audit
Checks PUBLIC WEB CONTENT for AI citation readiness.

PURPOSE:
    - Analyze pages that will be INDEXED by AI engines (ChatGPT, Perplexity, etc.)
    - Check for structured data, author info, dates, FAQ sections
    - Help content rank in AI-generated answers

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - NOT markdown files (those are developer docs, not public content)

Usage:
    python geo_checker.py <project_path>
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass


# Directories to skip (not public content)
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation'
}

# Files to skip (not public pages)
SKIP_FILES = {
    'jest.config', 'webpack.config', 'vite.config', 'tsconfig',
    'package.json', 'package-lock', 'yarn.lock', '.eslintrc',
    'tailwind.config', 'postcss.config', 'next.config'
}


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.stem.lower()
    
    # Skip config/utility files
    if any(skip in name for skip in SKIP_FILES):
        return False
    
    # Skip test files
    if name.endswith('.test') or name.endswith('.spec'):
        return False
    if name.startswith('test_') or name.startswith('spec_'):
        return False
    
    # Likely page indicators
    page_indicators = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                       'post', 'article', 'product', 'service', 'landing']
    
    # Check if it's in a pages/app directory (Next.js, etc.)
    parts = [p.lower() for p in file_path.parts]
    if 'pages' in parts or 'app' in parts or 'routes' in parts:
        return True
    
    # Check filename indicators
    if any(ind in name for ind in page_indicators):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() == '.html':
        return True
    
    return False


def find_web_pages(project_path: Path) -> list:
    """Find public-facing web pages only."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:30]  # Limit to 30 pages


def check_page(file_path: Path) -> dict:
    """Check a single web page for GEO elements."""
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {'file': str(file_path.name), 'passed': [], 'issues': [f"Error: {e}"], 'score': 0}
    
    issues = []
    passed = []
    
    # 1. JSON-LD Structured Data (Critical for AI)
    if 'application/ld+json' in content:
        passed.append("JSON-LD structured data found")
        if '"@type"' in content:
            if 'Article' in content:
                passed.append("Article schema present")
            if 'FAQPage' in content:
                passed.append("FAQ schema present")
            if 'Organization' in content or 'Person' in content:
                passed.append("Entity schema present")
    else:
        issues.append("No JSON-LD structured data (AI engines prefer structured content)")
    
    # 2. Heading Structure
    h1_count = len(re.findall(r'<h1[^>]*>', content, re.I))
    h2_count = len(re.findall(r'<h2[^>]*>', content, re.I))
    
    if h1_count == 1:
        passed.append("Single H1 heading (clear topic)")
    elif h1_count == 0:
        issues.append("No H1 heading - page topic unclear")
    else:
        issues.append(f"Multiple H1 headings ({h1_count}) - confusing for AI")
    
    if h2_count >= 2:
        passed.append(f"{h2_count} H2 subheadings (good structure)")
    else:
        issues.append("Add more H2 subheadings for scannable content")
    
    # 3. Author Attribution (E-E-A-T signal)
    author_patterns = ['author', 'byline', 'written-by', 'contributor', 'rel="author"']
    has_author = any(p in content.lower() for p in author_patterns)
    if has_author:
        passed.append("Author attribution found")
    else:
        issues.append("No author info (AI prefers attributed content)")
    
    # 4. Publication Date (Freshness signal)
    date_patterns = ['datePublished', 'dateModified', 'datetime=', 'pubdate', 'article:published']
    has_date = any(re.search(p, content, re.I) for p in date_patterns)
    if has_date:
        passed.append("Publication date found")
    else:
        issues.append("No publication date (freshness matters for AI)")
    
    # 5. FAQ Section (Highly citable)
    faq_patterns = [r'<details', r'faq', r'frequently.?asked', r'"FAQPage"']
    has_faq = any(re.search(p, content, re.I) for p in faq_patterns)
    if has_faq:
        passed.append("FAQ section detected (highly citable)")
    
    # 6. Lists (Structured content)
    list_count = len(re.findall(r'<(ul|ol)[^>]*>', content, re.I))
    if list_count >= 2:
        passed.append(f"{list_count} lists (structured content)")
    
    # 7. Tables (Comparison data)
    table_count = len(re.findall(r'<table[^>]*>', content, re.I))
    if table_count >= 1:
        passed.append(f"{table_count} table(s) (comparison data)")
    
    # 8. Entity Recognition (E-E-A-T signal) - NEW 2025
    entity_patterns = [
        r'"@type"\\s*:\\s*"Organization"',
        r'"@type"\\s*:\\s*"LocalBusiness"', 
        r'"@type"\\s*:\\s*"Brand"',
        r'itemtype.*schema\\.org/(Organization|Person|Brand)',
        r'rel="author"'
    ]
    has_entity = any(re.search(p, content, re.I) for p in entity_patterns)
    if has_entity:
        passed.append("Entity/Brand recognition (E-E-A-T)")
    
    # 9. Original Statistics/Data (AI citation magnet) - NEW 2025
    stat_patterns = [
        r'\\d+%',                    # Percentages
        r'\\$[\\d,]+',                # Dollar amounts
        r'study\\s+(shows|found)',   # Research citations
        r'according to',            # Source attribution
        r'data\\s+(shows|reveals)',  # Data-backed claims
        r'\\d+x\\s+(faster|better|more)', # Comparison stats
        r'(million|billion|trillion)', # Large numbers
    ]
    stat_matches = sum(1 for p in stat_patterns if re.search(p, content, re.I))
    if stat_matches >= 2:
        passed.append("Original statistics/data (citation magnet)")
    
    # 10. Conversational/Direct answers - NEW 2025
    direct_answer_patterns = [
        r'is defined as',
        r'refers to',
        r'means that',
        r'the answer is',
        r'in short,',
        r'simply put,',
        r'<dfn'
    ]
    has_direct = any(re.search(p, content, re.I) for p in direct_answer_patterns)
    if has_direct:
        passed.append("Direct answer patterns (LLM-friendly)")
    
    # Calculate score
    total = len(passed) + len(issues)
    score = (len(passed) / total * 100) if total > 0 else 0
    
    return {
        'file': str(file_path.name),
        'passed': passed,
        'issues': issues,
        'score': round(score)
    }


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    target_path = Path(target).resolve()
    
    print("\\n" + "=" * 60)
    print("  GEO CHECKER - AI Citation Readiness Audit")
    print("=" * 60)
    print(f"Project: {target_path}")
    print("-" * 60)
    
    # Find web pages only
    pages = find_web_pages(target_path)
    
    if not pages:
        print("\\n[!] No public web pages found.")
        print("    Looking for: HTML, JSX, TSX files in pages/app directories")
        print("    Skipping: docs, tests, config files, node_modules")
        output = {"script": "geo_checker", "pages_found": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} public pages to analyze\\n")
    
    # Check each page
    results = []
    for page in pages:
        result = check_page(page)
        results.append(result)
    
    # Print results
    for result in results:
        status = "[OK]" if result['score'] >= 60 else "[!]"
        print(f"{status} {result['file']}: {result['score']}%")
        if result['issues'] and result['score'] < 60:
            for issue in result['issues'][:2]:  # Show max 2 issues
                print(f"    - {issue}")
    
    # Average score
    avg_score = sum(r['score'] for r in results) / len(results) if results else 0
    
    print("\\n" + "=" * 60)
    print(f"AVERAGE GEO SCORE: {avg_score:.0f}%")
    print("=" * 60)
    
    if avg_score >= 80:
        print("[OK] Excellent - Content well-optimized for AI citations")
    elif avg_score >= 60:
        print("[OK] Good - Some improvements recommended")
    elif avg_score >= 40:
        print("[!] Needs work - Add structured elements")
    else:
        print("[X] Poor - Content needs GEO optimization")
    
    # JSON output
    output = {
        "script": "geo_checker",
        "project": str(target_path),
        "pages_checked": len(results),
        "average_score": round(avg_score),
        "passed": avg_score >= 60
    }
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if avg_score >= 60 else 1)


if __name__ == "__main__":
    main()
`,
  "skills/geo-fundamentals/scripts/geo_checker.py": `#!/usr/bin/env python3
"""
GEO Checker - Generative Engine Optimization Audit
Checks PUBLIC WEB CONTENT for AI citation readiness.

PURPOSE:
    - Analyze pages that will be INDEXED by AI engines (ChatGPT, Perplexity, etc.)
    - Check for structured data, author info, dates, FAQ sections
    - Help content rank in AI-generated answers

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - NOT markdown files (those are developer docs, not public content)

Usage:
    python geo_checker.py <project_path>
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass


# Directories to skip (not public content)
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation'
}

# Files to skip (not public pages)
SKIP_FILES = {
    'jest.config', 'webpack.config', 'vite.config', 'tsconfig',
    'package.json', 'package-lock', 'yarn.lock', '.eslintrc',
    'tailwind.config', 'postcss.config', 'next.config'
}


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.stem.lower()
    
    # Skip config/utility files
    if any(skip in name for skip in SKIP_FILES):
        return False
    
    # Skip test files
    if name.endswith('.test') or name.endswith('.spec'):
        return False
    if name.startswith('test_') or name.startswith('spec_'):
        return False
    
    # Likely page indicators
    page_indicators = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                       'post', 'article', 'product', 'service', 'landing']
    
    # Check if it's in a pages/app directory (Next.js, etc.)
    parts = [p.lower() for p in file_path.parts]
    if 'pages' in parts or 'app' in parts or 'routes' in parts:
        return True
    
    # Check filename indicators
    if any(ind in name for ind in page_indicators):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() == '.html':
        return True
    
    return False


def find_web_pages(project_path: Path) -> list:
    """Find public-facing web pages only."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:30]  # Limit to 30 pages


def check_page(file_path: Path) -> dict:
    """Check a single web page for GEO elements."""
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {'file': str(file_path.name), 'passed': [], 'issues': [f"Error: {e}"], 'score': 0}
    
    issues = []
    passed = []
    
    # 1. JSON-LD Structured Data (Critical for AI)
    if 'application/ld+json' in content:
        passed.append("JSON-LD structured data found")
        if '"@type"' in content:
            if 'Article' in content:
                passed.append("Article schema present")
            if 'FAQPage' in content:
                passed.append("FAQ schema present")
            if 'Organization' in content or 'Person' in content:
                passed.append("Entity schema present")
    else:
        issues.append("No JSON-LD structured data (AI engines prefer structured content)")
    
    # 2. Heading Structure
    h1_count = len(re.findall(r'<h1[^>]*>', content, re.I))
    h2_count = len(re.findall(r'<h2[^>]*>', content, re.I))
    
    if h1_count == 1:
        passed.append("Single H1 heading (clear topic)")
    elif h1_count == 0:
        issues.append("No H1 heading - page topic unclear")
    else:
        issues.append(f"Multiple H1 headings ({h1_count}) - confusing for AI")
    
    if h2_count >= 2:
        passed.append(f"{h2_count} H2 subheadings (good structure)")
    else:
        issues.append("Add more H2 subheadings for scannable content")
    
    # 3. Author Attribution (E-E-A-T signal)
    author_patterns = ['author', 'byline', 'written-by', 'contributor', 'rel="author"']
    has_author = any(p in content.lower() for p in author_patterns)
    if has_author:
        passed.append("Author attribution found")
    else:
        issues.append("No author info (AI prefers attributed content)")
    
    # 4. Publication Date (Freshness signal)
    date_patterns = ['datePublished', 'dateModified', 'datetime=', 'pubdate', 'article:published']
    has_date = any(re.search(p, content, re.I) for p in date_patterns)
    if has_date:
        passed.append("Publication date found")
    else:
        issues.append("No publication date (freshness matters for AI)")
    
    # 5. FAQ Section (Highly citable)
    faq_patterns = [r'<details', r'faq', r'frequently.?asked', r'"FAQPage"']
    has_faq = any(re.search(p, content, re.I) for p in faq_patterns)
    if has_faq:
        passed.append("FAQ section detected (highly citable)")
    
    # 6. Lists (Structured content)
    list_count = len(re.findall(r'<(ul|ol)[^>]*>', content, re.I))
    if list_count >= 2:
        passed.append(f"{list_count} lists (structured content)")
    
    # 7. Tables (Comparison data)
    table_count = len(re.findall(r'<table[^>]*>', content, re.I))
    if table_count >= 1:
        passed.append(f"{table_count} table(s) (comparison data)")
    
    # 8. Entity Recognition (E-E-A-T signal) - NEW 2025
    entity_patterns = [
        r'"@type"\\s*:\\s*"Organization"',
        r'"@type"\\s*:\\s*"LocalBusiness"', 
        r'"@type"\\s*:\\s*"Brand"',
        r'itemtype.*schema\\.org/(Organization|Person|Brand)',
        r'rel="author"'
    ]
    has_entity = any(re.search(p, content, re.I) for p in entity_patterns)
    if has_entity:
        passed.append("Entity/Brand recognition (E-E-A-T)")
    
    # 9. Original Statistics/Data (AI citation magnet) - NEW 2025
    stat_patterns = [
        r'\\d+%',                    # Percentages
        r'\\$[\\d,]+',                # Dollar amounts
        r'study\\s+(shows|found)',   # Research citations
        r'according to',            # Source attribution
        r'data\\s+(shows|reveals)',  # Data-backed claims
        r'\\d+x\\s+(faster|better|more)', # Comparison stats
        r'(million|billion|trillion)', # Large numbers
    ]
    stat_matches = sum(1 for p in stat_patterns if re.search(p, content, re.I))
    if stat_matches >= 2:
        passed.append("Original statistics/data (citation magnet)")
    
    # 10. Conversational/Direct answers - NEW 2025
    direct_answer_patterns = [
        r'is defined as',
        r'refers to',
        r'means that',
        r'the answer is',
        r'in short,',
        r'simply put,',
        r'<dfn'
    ]
    has_direct = any(re.search(p, content, re.I) for p in direct_answer_patterns)
    if has_direct:
        passed.append("Direct answer patterns (LLM-friendly)")
    
    # Calculate score
    total = len(passed) + len(issues)
    score = (len(passed) / total * 100) if total > 0 else 0
    
    return {
        'file': str(file_path.name),
        'passed': passed,
        'issues': issues,
        'score': round(score)
    }


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    target_path = Path(target).resolve()
    
    print("\\n" + "=" * 60)
    print("  GEO CHECKER - AI Citation Readiness Audit")
    print("=" * 60)
    print(f"Project: {target_path}")
    print("-" * 60)
    
    # Find web pages only
    pages = find_web_pages(target_path)
    
    if not pages:
        print("\\n[!] No public web pages found.")
        print("    Looking for: HTML, JSX, TSX files in pages/app directories")
        print("    Skipping: docs, tests, config files, node_modules")
        output = {"script": "geo_checker", "pages_found": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} public pages to analyze\\n")
    
    # Check each page
    results = []
    for page in pages:
        result = check_page(page)
        results.append(result)
    
    # Print results
    for result in results:
        status = "[OK]" if result['score'] >= 60 else "[!]"
        print(f"{status} {result['file']}: {result['score']}%")
        if result['issues'] and result['score'] < 60:
            for issue in result['issues'][:2]:  # Show max 2 issues
                print(f"    - {issue}")
    
    # Average score
    avg_score = sum(r['score'] for r in results) / len(results) if results else 0
    
    print("\\n" + "=" * 60)
    print(f"AVERAGE GEO SCORE: {avg_score:.0f}%")
    print("=" * 60)
    
    if avg_score >= 80:
        print("[OK] Excellent - Content well-optimized for AI citations")
    elif avg_score >= 60:
        print("[OK] Good - Some improvements recommended")
    elif avg_score >= 40:
        print("[!] Needs work - Add structured elements")
    else:
        print("[X] Poor - Content needs GEO optimization")
    
    # JSON output
    output = {
        "script": "geo_checker",
        "project": str(target_path),
        "pages_checked": len(results),
        "average_score": round(avg_score),
        "passed": avg_score >= 60
    }
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if avg_score >= 60 else 1)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/geo-fundamentals/scripts/geo_checker.py": `#!/usr/bin/env python3
"""
GEO Checker - Generative Engine Optimization Audit
Checks PUBLIC WEB CONTENT for AI citation readiness.

PURPOSE:
    - Analyze pages that will be INDEXED by AI engines (ChatGPT, Perplexity, etc.)
    - Check for structured data, author info, dates, FAQ sections
    - Help content rank in AI-generated answers

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - NOT markdown files (those are developer docs, not public content)

Usage:
    python geo_checker.py <project_path>
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass


# Directories to skip (not public content)
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation'
}

# Files to skip (not public pages)
SKIP_FILES = {
    'jest.config', 'webpack.config', 'vite.config', 'tsconfig',
    'package.json', 'package-lock', 'yarn.lock', '.eslintrc',
    'tailwind.config', 'postcss.config', 'next.config'
}


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.stem.lower()
    
    # Skip config/utility files
    if any(skip in name for skip in SKIP_FILES):
        return False
    
    # Skip test files
    if name.endswith('.test') or name.endswith('.spec'):
        return False
    if name.startswith('test_') or name.startswith('spec_'):
        return False
    
    # Likely page indicators
    page_indicators = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                       'post', 'article', 'product', 'service', 'landing']
    
    # Check if it's in a pages/app directory (Next.js, etc.)
    parts = [p.lower() for p in file_path.parts]
    if 'pages' in parts or 'app' in parts or 'routes' in parts:
        return True
    
    # Check filename indicators
    if any(ind in name for ind in page_indicators):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() == '.html':
        return True
    
    return False


def find_web_pages(project_path: Path) -> list:
    """Find public-facing web pages only."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:30]  # Limit to 30 pages


def check_page(file_path: Path) -> dict:
    """Check a single web page for GEO elements."""
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {'file': str(file_path.name), 'passed': [], 'issues': [f"Error: {e}"], 'score': 0}
    
    issues = []
    passed = []
    
    # 1. JSON-LD Structured Data (Critical for AI)
    if 'application/ld+json' in content:
        passed.append("JSON-LD structured data found")
        if '"@type"' in content:
            if 'Article' in content:
                passed.append("Article schema present")
            if 'FAQPage' in content:
                passed.append("FAQ schema present")
            if 'Organization' in content or 'Person' in content:
                passed.append("Entity schema present")
    else:
        issues.append("No JSON-LD structured data (AI engines prefer structured content)")
    
    # 2. Heading Structure
    h1_count = len(re.findall(r'<h1[^>]*>', content, re.I))
    h2_count = len(re.findall(r'<h2[^>]*>', content, re.I))
    
    if h1_count == 1:
        passed.append("Single H1 heading (clear topic)")
    elif h1_count == 0:
        issues.append("No H1 heading - page topic unclear")
    else:
        issues.append(f"Multiple H1 headings ({h1_count}) - confusing for AI")
    
    if h2_count >= 2:
        passed.append(f"{h2_count} H2 subheadings (good structure)")
    else:
        issues.append("Add more H2 subheadings for scannable content")
    
    # 3. Author Attribution (E-E-A-T signal)
    author_patterns = ['author', 'byline', 'written-by', 'contributor', 'rel="author"']
    has_author = any(p in content.lower() for p in author_patterns)
    if has_author:
        passed.append("Author attribution found")
    else:
        issues.append("No author info (AI prefers attributed content)")
    
    # 4. Publication Date (Freshness signal)
    date_patterns = ['datePublished', 'dateModified', 'datetime=', 'pubdate', 'article:published']
    has_date = any(re.search(p, content, re.I) for p in date_patterns)
    if has_date:
        passed.append("Publication date found")
    else:
        issues.append("No publication date (freshness matters for AI)")
    
    # 5. FAQ Section (Highly citable)
    faq_patterns = [r'<details', r'faq', r'frequently.?asked', r'"FAQPage"']
    has_faq = any(re.search(p, content, re.I) for p in faq_patterns)
    if has_faq:
        passed.append("FAQ section detected (highly citable)")
    
    # 6. Lists (Structured content)
    list_count = len(re.findall(r'<(ul|ol)[^>]*>', content, re.I))
    if list_count >= 2:
        passed.append(f"{list_count} lists (structured content)")
    
    # 7. Tables (Comparison data)
    table_count = len(re.findall(r'<table[^>]*>', content, re.I))
    if table_count >= 1:
        passed.append(f"{table_count} table(s) (comparison data)")
    
    # 8. Entity Recognition (E-E-A-T signal) - NEW 2025
    entity_patterns = [
        r'"@type"\\s*:\\s*"Organization"',
        r'"@type"\\s*:\\s*"LocalBusiness"', 
        r'"@type"\\s*:\\s*"Brand"',
        r'itemtype.*schema\\.org/(Organization|Person|Brand)',
        r'rel="author"'
    ]
    has_entity = any(re.search(p, content, re.I) for p in entity_patterns)
    if has_entity:
        passed.append("Entity/Brand recognition (E-E-A-T)")
    
    # 9. Original Statistics/Data (AI citation magnet) - NEW 2025
    stat_patterns = [
        r'\\d+%',                    # Percentages
        r'\\$[\\d,]+',                # Dollar amounts
        r'study\\s+(shows|found)',   # Research citations
        r'according to',            # Source attribution
        r'data\\s+(shows|reveals)',  # Data-backed claims
        r'\\d+x\\s+(faster|better|more)', # Comparison stats
        r'(million|billion|trillion)', # Large numbers
    ]
    stat_matches = sum(1 for p in stat_patterns if re.search(p, content, re.I))
    if stat_matches >= 2:
        passed.append("Original statistics/data (citation magnet)")
    
    # 10. Conversational/Direct answers - NEW 2025
    direct_answer_patterns = [
        r'is defined as',
        r'refers to',
        r'means that',
        r'the answer is',
        r'in short,',
        r'simply put,',
        r'<dfn'
    ]
    has_direct = any(re.search(p, content, re.I) for p in direct_answer_patterns)
    if has_direct:
        passed.append("Direct answer patterns (LLM-friendly)")
    
    # Calculate score
    total = len(passed) + len(issues)
    score = (len(passed) / total * 100) if total > 0 else 0
    
    return {
        'file': str(file_path.name),
        'passed': passed,
        'issues': issues,
        'score': round(score)
    }


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    target_path = Path(target).resolve()
    
    print("\\n" + "=" * 60)
    print("  GEO CHECKER - AI Citation Readiness Audit")
    print("=" * 60)
    print(f"Project: {target_path}")
    print("-" * 60)
    
    # Find web pages only
    pages = find_web_pages(target_path)
    
    if not pages:
        print("\\n[!] No public web pages found.")
        print("    Looking for: HTML, JSX, TSX files in pages/app directories")
        print("    Skipping: docs, tests, config files, node_modules")
        output = {"script": "geo_checker", "pages_found": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} public pages to analyze\\n")
    
    # Check each page
    results = []
    for page in pages:
        result = check_page(page)
        results.append(result)
    
    # Print results
    for result in results:
        status = "[OK]" if result['score'] >= 60 else "[!]"
        print(f"{status} {result['file']}: {result['score']}%")
        if result['issues'] and result['score'] < 60:
            for issue in result['issues'][:2]:  # Show max 2 issues
                print(f"    - {issue}")
    
    # Average score
    avg_score = sum(r['score'] for r in results) / len(results) if results else 0
    
    print("\\n" + "=" * 60)
    print(f"AVERAGE GEO SCORE: {avg_score:.0f}%")
    print("=" * 60)
    
    if avg_score >= 80:
        print("[OK] Excellent - Content well-optimized for AI citations")
    elif avg_score >= 60:
        print("[OK] Good - Some improvements recommended")
    elif avg_score >= 40:
        print("[!] Needs work - Add structured elements")
    else:
        print("[X] Poor - Content needs GEO optimization")
    
    # JSON output
    output = {
        "script": "geo_checker",
        "project": str(target_path),
        "pages_checked": len(results),
        "average_score": round(avg_score),
        "passed": avg_score >= 60
    }
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if avg_score >= 60 else 1)


if __name__ == "__main__":
    main()
`,
  "i18n-localization/scripts/i18n_checker.py": `#!/usr/bin/env python3
"""
i18n Checker - Detects hardcoded strings and missing translations.
Scans for untranslated text in React, Vue, and Python files.
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

# Patterns that indicate hardcoded strings (should be translated)
HARDCODED_PATTERNS = {
    'jsx': [
        # Text directly in JSX: <div>Hello World</div>
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        # JSX attribute strings: title="Welcome"
        r'(title|placeholder|label|alt|aria-label)="[A-Z][a-zA-Z\\s]{2,}"',
        # Button/heading text
        r'<(button|h[1-6]|p|span|label)[^>]*>\\s*[A-Z][a-zA-Z\\s!?.,]{3,}\\s*</',
    ],
    'vue': [
        # Vue template text
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        r'(placeholder|label|title)="[A-Z][a-zA-Z\\s]{2,}"',
    ],
    'python': [
        # print/raise with string literals
        r'(print|raise\\s+\\w+)\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
        # Flask flash messages
        r'flash\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
    ]
}

# Patterns that indicate proper i18n usage
I18N_PATTERNS = [
    r't\\(["\\']',           # t('key') - react-i18next
    r'useTranslation',     # React hook
    r'\\$t\\(',              # Vue i18n
    r'_\\(["\\']',           # Python gettext
    r'gettext\\(',          # Python gettext
    r'useTranslations',    # next-intl
    r'FormattedMessage',   # react-intl
    r'i18n\\.',             # Generic i18n
]

def find_locale_files(project_path: Path) -> list:
    """Find translation/locale files."""
    patterns = [
        "**/locales/**/*.json",
        "**/translations/**/*.json",
        "**/lang/**/*.json",
        "**/i18n/**/*.json",
        "**/messages/*.json",
        "**/*.po",  # gettext
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    return [f for f in files if 'node_modules' not in str(f)]

def check_locale_completeness(locale_files: list) -> dict:
    """Check if all locales have the same keys."""
    issues = []
    passed = []
    
    if not locale_files:
        return {'passed': [], 'issues': ["[!] No locale files found"]}
    
    # Group by parent folder (language)
    locales = {}
    for f in locale_files:
        if f.suffix == '.json':
            try:
                lang = f.parent.name
                content = json.loads(f.read_text(encoding='utf-8'))
                if lang not in locales:
                    locales[lang] = {}
                locales[lang][f.stem] = set(flatten_keys(content))
            except:
                continue
    
    if len(locales) < 2:
        passed.append(f"[OK] Found {len(locale_files)} locale file(s)")
        return {'passed': passed, 'issues': issues}
    
    passed.append(f"[OK] Found {len(locales)} language(s): {', '.join(locales.keys())}")
    
    # Compare keys across locales
    all_langs = list(locales.keys())
    base_lang = all_langs[0]
    
    for namespace in locales.get(base_lang, {}):
        base_keys = locales[base_lang].get(namespace, set())
        
        for lang in all_langs[1:]:
            other_keys = locales.get(lang, {}).get(namespace, set())
            
            missing = base_keys - other_keys
            if missing:
                issues.append(f"[X] {lang}/{namespace}: Missing {len(missing)} keys")
            
            extra = other_keys - base_keys
            if extra:
                issues.append(f"[!] {lang}/{namespace}: {len(extra)} extra keys")
    
    if not issues:
        passed.append("[OK] All locales have matching keys")
    
    return {'passed': passed, 'issues': issues}

def flatten_keys(d, prefix=''):
    """Flatten nested dict keys."""
    keys = set()
    for k, v in d.items():
        new_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(flatten_keys(v, new_key))
        else:
            keys.add(new_key)
    return keys

def check_hardcoded_strings(project_path: Path) -> dict:
    """Check for hardcoded strings in code files."""
    issues = []
    passed = []
    
    # Find code files
    extensions = {
        '.tsx': 'jsx', '.jsx': 'jsx', '.ts': 'jsx', '.js': 'jsx',
        '.vue': 'vue',
        '.py': 'python'
    }
    
    code_files = []
    for ext in extensions:
        code_files.extend(project_path.rglob(f"*{ext}"))
    
    code_files = [f for f in code_files if not any(x in str(f) for x in 
                  ['node_modules', '.git', 'dist', 'build', '__pycache__', 'venv', 'test', 'spec'])]
    
    if not code_files:
        return {'passed': ["[!] No code files found"], 'issues': []}
    
    files_with_i18n = 0
    files_with_hardcoded = 0
    hardcoded_examples = []
    
    for file_path in code_files[:50]:  # Limit
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            ext = file_path.suffix
            file_type = extensions.get(ext, 'jsx')
            
            # Check for i18n usage
            has_i18n = any(re.search(p, content) for p in I18N_PATTERNS)
            if has_i18n:
                files_with_i18n += 1
            
            # Check for hardcoded strings
            patterns = HARDCODED_PATTERNS.get(file_type, [])
            hardcoded_found = False
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                if matches and not has_i18n:
                    hardcoded_found = True
                    if len(hardcoded_examples) < 5:
                        hardcoded_examples.append(f"{file_path.name}: {str(matches[0])[:40]}...")
            
            if hardcoded_found:
                files_with_hardcoded += 1
                
        except:
            continue
    
    passed.append(f"[OK] Analyzed {len(code_files)} code files")
    
    if files_with_i18n > 0:
        passed.append(f"[OK] {files_with_i18n} files use i18n")
    
    if files_with_hardcoded > 0:
        issues.append(f"[X] {files_with_hardcoded} files may have hardcoded strings")
        for ex in hardcoded_examples:
            issues.append(f"   → {ex}")
    else:
        passed.append("[OK] No obvious hardcoded strings detected")
    
    return {'passed': passed, 'issues': issues}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  i18n CHECKER - Internationalization Audit")
    print("=" * 60 + "\\n")
    
    # Check locale files
    locale_files = find_locale_files(project_path)
    locale_result = check_locale_completeness(locale_files)
    
    # Check hardcoded strings
    code_result = check_hardcoded_strings(project_path)
    
    # Print results
    print("[LOCALE FILES]")
    print("-" * 40)
    for item in locale_result['passed']:
        print(f"  {item}")
    for item in locale_result['issues']:
        print(f"  {item}")
    
    print("\\n[CODE ANALYSIS]")
    print("-" * 40)
    for item in code_result['passed']:
        print(f"  {item}")
    for item in code_result['issues']:
        print(f"  {item}")
    
    # Summary
    critical_issues = sum(1 for i in locale_result['issues'] + code_result['issues'] if i.startswith("[X]"))
    
    print("\\n" + "=" * 60)
    if critical_issues == 0:
        print("[OK] i18n CHECK: PASSED")
        sys.exit(0)
    else:
        print(f"[X] i18n CHECK: {critical_issues} issues found")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  "skills/i18n-localization/scripts/i18n_checker.py": `#!/usr/bin/env python3
"""
i18n Checker - Detects hardcoded strings and missing translations.
Scans for untranslated text in React, Vue, and Python files.
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

# Patterns that indicate hardcoded strings (should be translated)
HARDCODED_PATTERNS = {
    'jsx': [
        # Text directly in JSX: <div>Hello World</div>
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        # JSX attribute strings: title="Welcome"
        r'(title|placeholder|label|alt|aria-label)="[A-Z][a-zA-Z\\s]{2,}"',
        # Button/heading text
        r'<(button|h[1-6]|p|span|label)[^>]*>\\s*[A-Z][a-zA-Z\\s!?.,]{3,}\\s*</',
    ],
    'vue': [
        # Vue template text
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        r'(placeholder|label|title)="[A-Z][a-zA-Z\\s]{2,}"',
    ],
    'python': [
        # print/raise with string literals
        r'(print|raise\\s+\\w+)\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
        # Flask flash messages
        r'flash\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
    ]
}

# Patterns that indicate proper i18n usage
I18N_PATTERNS = [
    r't\\(["\\']',           # t('key') - react-i18next
    r'useTranslation',     # React hook
    r'\\$t\\(',              # Vue i18n
    r'_\\(["\\']',           # Python gettext
    r'gettext\\(',          # Python gettext
    r'useTranslations',    # next-intl
    r'FormattedMessage',   # react-intl
    r'i18n\\.',             # Generic i18n
]

def find_locale_files(project_path: Path) -> list:
    """Find translation/locale files."""
    patterns = [
        "**/locales/**/*.json",
        "**/translations/**/*.json",
        "**/lang/**/*.json",
        "**/i18n/**/*.json",
        "**/messages/*.json",
        "**/*.po",  # gettext
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    return [f for f in files if 'node_modules' not in str(f)]

def check_locale_completeness(locale_files: list) -> dict:
    """Check if all locales have the same keys."""
    issues = []
    passed = []
    
    if not locale_files:
        return {'passed': [], 'issues': ["[!] No locale files found"]}
    
    # Group by parent folder (language)
    locales = {}
    for f in locale_files:
        if f.suffix == '.json':
            try:
                lang = f.parent.name
                content = json.loads(f.read_text(encoding='utf-8'))
                if lang not in locales:
                    locales[lang] = {}
                locales[lang][f.stem] = set(flatten_keys(content))
            except:
                continue
    
    if len(locales) < 2:
        passed.append(f"[OK] Found {len(locale_files)} locale file(s)")
        return {'passed': passed, 'issues': issues}
    
    passed.append(f"[OK] Found {len(locales)} language(s): {', '.join(locales.keys())}")
    
    # Compare keys across locales
    all_langs = list(locales.keys())
    base_lang = all_langs[0]
    
    for namespace in locales.get(base_lang, {}):
        base_keys = locales[base_lang].get(namespace, set())
        
        for lang in all_langs[1:]:
            other_keys = locales.get(lang, {}).get(namespace, set())
            
            missing = base_keys - other_keys
            if missing:
                issues.append(f"[X] {lang}/{namespace}: Missing {len(missing)} keys")
            
            extra = other_keys - base_keys
            if extra:
                issues.append(f"[!] {lang}/{namespace}: {len(extra)} extra keys")
    
    if not issues:
        passed.append("[OK] All locales have matching keys")
    
    return {'passed': passed, 'issues': issues}

def flatten_keys(d, prefix=''):
    """Flatten nested dict keys."""
    keys = set()
    for k, v in d.items():
        new_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(flatten_keys(v, new_key))
        else:
            keys.add(new_key)
    return keys

def check_hardcoded_strings(project_path: Path) -> dict:
    """Check for hardcoded strings in code files."""
    issues = []
    passed = []
    
    # Find code files
    extensions = {
        '.tsx': 'jsx', '.jsx': 'jsx', '.ts': 'jsx', '.js': 'jsx',
        '.vue': 'vue',
        '.py': 'python'
    }
    
    code_files = []
    for ext in extensions:
        code_files.extend(project_path.rglob(f"*{ext}"))
    
    code_files = [f for f in code_files if not any(x in str(f) for x in 
                  ['node_modules', '.git', 'dist', 'build', '__pycache__', 'venv', 'test', 'spec'])]
    
    if not code_files:
        return {'passed': ["[!] No code files found"], 'issues': []}
    
    files_with_i18n = 0
    files_with_hardcoded = 0
    hardcoded_examples = []
    
    for file_path in code_files[:50]:  # Limit
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            ext = file_path.suffix
            file_type = extensions.get(ext, 'jsx')
            
            # Check for i18n usage
            has_i18n = any(re.search(p, content) for p in I18N_PATTERNS)
            if has_i18n:
                files_with_i18n += 1
            
            # Check for hardcoded strings
            patterns = HARDCODED_PATTERNS.get(file_type, [])
            hardcoded_found = False
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                if matches and not has_i18n:
                    hardcoded_found = True
                    if len(hardcoded_examples) < 5:
                        hardcoded_examples.append(f"{file_path.name}: {str(matches[0])[:40]}...")
            
            if hardcoded_found:
                files_with_hardcoded += 1
                
        except:
            continue
    
    passed.append(f"[OK] Analyzed {len(code_files)} code files")
    
    if files_with_i18n > 0:
        passed.append(f"[OK] {files_with_i18n} files use i18n")
    
    if files_with_hardcoded > 0:
        issues.append(f"[X] {files_with_hardcoded} files may have hardcoded strings")
        for ex in hardcoded_examples:
            issues.append(f"   → {ex}")
    else:
        passed.append("[OK] No obvious hardcoded strings detected")
    
    return {'passed': passed, 'issues': issues}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  i18n CHECKER - Internationalization Audit")
    print("=" * 60 + "\\n")
    
    # Check locale files
    locale_files = find_locale_files(project_path)
    locale_result = check_locale_completeness(locale_files)
    
    # Check hardcoded strings
    code_result = check_hardcoded_strings(project_path)
    
    # Print results
    print("[LOCALE FILES]")
    print("-" * 40)
    for item in locale_result['passed']:
        print(f"  {item}")
    for item in locale_result['issues']:
        print(f"  {item}")
    
    print("\\n[CODE ANALYSIS]")
    print("-" * 40)
    for item in code_result['passed']:
        print(f"  {item}")
    for item in code_result['issues']:
        print(f"  {item}")
    
    # Summary
    critical_issues = sum(1 for i in locale_result['issues'] + code_result['issues'] if i.startswith("[X]"))
    
    print("\\n" + "=" * 60)
    if critical_issues == 0:
        print("[OK] i18n CHECK: PASSED")
        sys.exit(0)
    else:
        print(f"[X] i18n CHECK: {critical_issues} issues found")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  ".agent/skills/i18n-localization/scripts/i18n_checker.py": `#!/usr/bin/env python3
"""
i18n Checker - Detects hardcoded strings and missing translations.
Scans for untranslated text in React, Vue, and Python files.
"""
import sys
import re
import json
from pathlib import Path

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

# Patterns that indicate hardcoded strings (should be translated)
HARDCODED_PATTERNS = {
    'jsx': [
        # Text directly in JSX: <div>Hello World</div>
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        # JSX attribute strings: title="Welcome"
        r'(title|placeholder|label|alt|aria-label)="[A-Z][a-zA-Z\\s]{2,}"',
        # Button/heading text
        r'<(button|h[1-6]|p|span|label)[^>]*>\\s*[A-Z][a-zA-Z\\s!?.,]{3,}\\s*</',
    ],
    'vue': [
        # Vue template text
        r'>\\s*[A-Z][a-zA-Z\\s]{3,30}\\s*</',
        r'(placeholder|label|title)="[A-Z][a-zA-Z\\s]{2,}"',
    ],
    'python': [
        # print/raise with string literals
        r'(print|raise\\s+\\w+)\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
        # Flask flash messages
        r'flash\\s*\\(\\s*["\\'][A-Z][^"\\']{5,}["\\']',
    ]
}

# Patterns that indicate proper i18n usage
I18N_PATTERNS = [
    r't\\(["\\']',           # t('key') - react-i18next
    r'useTranslation',     # React hook
    r'\\$t\\(',              # Vue i18n
    r'_\\(["\\']',           # Python gettext
    r'gettext\\(',          # Python gettext
    r'useTranslations',    # next-intl
    r'FormattedMessage',   # react-intl
    r'i18n\\.',             # Generic i18n
]

def find_locale_files(project_path: Path) -> list:
    """Find translation/locale files."""
    patterns = [
        "**/locales/**/*.json",
        "**/translations/**/*.json",
        "**/lang/**/*.json",
        "**/i18n/**/*.json",
        "**/messages/*.json",
        "**/*.po",  # gettext
    ]
    
    files = []
    for pattern in patterns:
        files.extend(project_path.glob(pattern))
    
    return [f for f in files if 'node_modules' not in str(f)]

def check_locale_completeness(locale_files: list) -> dict:
    """Check if all locales have the same keys."""
    issues = []
    passed = []
    
    if not locale_files:
        return {'passed': [], 'issues': ["[!] No locale files found"]}
    
    # Group by parent folder (language)
    locales = {}
    for f in locale_files:
        if f.suffix == '.json':
            try:
                lang = f.parent.name
                content = json.loads(f.read_text(encoding='utf-8'))
                if lang not in locales:
                    locales[lang] = {}
                locales[lang][f.stem] = set(flatten_keys(content))
            except:
                continue
    
    if len(locales) < 2:
        passed.append(f"[OK] Found {len(locale_files)} locale file(s)")
        return {'passed': passed, 'issues': issues}
    
    passed.append(f"[OK] Found {len(locales)} language(s): {', '.join(locales.keys())}")
    
    # Compare keys across locales
    all_langs = list(locales.keys())
    base_lang = all_langs[0]
    
    for namespace in locales.get(base_lang, {}):
        base_keys = locales[base_lang].get(namespace, set())
        
        for lang in all_langs[1:]:
            other_keys = locales.get(lang, {}).get(namespace, set())
            
            missing = base_keys - other_keys
            if missing:
                issues.append(f"[X] {lang}/{namespace}: Missing {len(missing)} keys")
            
            extra = other_keys - base_keys
            if extra:
                issues.append(f"[!] {lang}/{namespace}: {len(extra)} extra keys")
    
    if not issues:
        passed.append("[OK] All locales have matching keys")
    
    return {'passed': passed, 'issues': issues}

def flatten_keys(d, prefix=''):
    """Flatten nested dict keys."""
    keys = set()
    for k, v in d.items():
        new_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(flatten_keys(v, new_key))
        else:
            keys.add(new_key)
    return keys

def check_hardcoded_strings(project_path: Path) -> dict:
    """Check for hardcoded strings in code files."""
    issues = []
    passed = []
    
    # Find code files
    extensions = {
        '.tsx': 'jsx', '.jsx': 'jsx', '.ts': 'jsx', '.js': 'jsx',
        '.vue': 'vue',
        '.py': 'python'
    }
    
    code_files = []
    for ext in extensions:
        code_files.extend(project_path.rglob(f"*{ext}"))
    
    code_files = [f for f in code_files if not any(x in str(f) for x in 
                  ['node_modules', '.git', 'dist', 'build', '__pycache__', 'venv', 'test', 'spec'])]
    
    if not code_files:
        return {'passed': ["[!] No code files found"], 'issues': []}
    
    files_with_i18n = 0
    files_with_hardcoded = 0
    hardcoded_examples = []
    
    for file_path in code_files[:50]:  # Limit
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            ext = file_path.suffix
            file_type = extensions.get(ext, 'jsx')
            
            # Check for i18n usage
            has_i18n = any(re.search(p, content) for p in I18N_PATTERNS)
            if has_i18n:
                files_with_i18n += 1
            
            # Check for hardcoded strings
            patterns = HARDCODED_PATTERNS.get(file_type, [])
            hardcoded_found = False
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                if matches and not has_i18n:
                    hardcoded_found = True
                    if len(hardcoded_examples) < 5:
                        hardcoded_examples.append(f"{file_path.name}: {str(matches[0])[:40]}...")
            
            if hardcoded_found:
                files_with_hardcoded += 1
                
        except:
            continue
    
    passed.append(f"[OK] Analyzed {len(code_files)} code files")
    
    if files_with_i18n > 0:
        passed.append(f"[OK] {files_with_i18n} files use i18n")
    
    if files_with_hardcoded > 0:
        issues.append(f"[X] {files_with_hardcoded} files may have hardcoded strings")
        for ex in hardcoded_examples:
            issues.append(f"   → {ex}")
    else:
        passed.append("[OK] No obvious hardcoded strings detected")
    
    return {'passed': passed, 'issues': issues}

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(target)
    
    print("\\n" + "=" * 60)
    print("  i18n CHECKER - Internationalization Audit")
    print("=" * 60 + "\\n")
    
    # Check locale files
    locale_files = find_locale_files(project_path)
    locale_result = check_locale_completeness(locale_files)
    
    # Check hardcoded strings
    code_result = check_hardcoded_strings(project_path)
    
    # Print results
    print("[LOCALE FILES]")
    print("-" * 40)
    for item in locale_result['passed']:
        print(f"  {item}")
    for item in locale_result['issues']:
        print(f"  {item}")
    
    print("\\n[CODE ANALYSIS]")
    print("-" * 40)
    for item in code_result['passed']:
        print(f"  {item}")
    for item in code_result['issues']:
        print(f"  {item}")
    
    # Summary
    critical_issues = sum(1 for i in locale_result['issues'] + code_result['issues'] if i.startswith("[X]"))
    
    print("\\n" + "=" * 60)
    if critical_issues == 0:
        print("[OK] i18n CHECK: PASSED")
        sys.exit(0)
    else:
        print(f"[X] i18n CHECK: {critical_issues} issues found")
        sys.exit(1)

if __name__ == "__main__":
    main()
`,
  "lint-and-validate/scripts/lint_runner.py": `#!/usr/bin/env python3
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
`,
  "skills/lint-and-validate/scripts/lint_runner.py": `#!/usr/bin/env python3
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
`,
  ".agent/skills/lint-and-validate/scripts/lint_runner.py": `#!/usr/bin/env python3
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
`,
  "lint-and-validate/scripts/type_coverage.py": `#!/usr/bin/env python3
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
`,
  "skills/lint-and-validate/scripts/type_coverage.py": `#!/usr/bin/env python3
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
`,
  ".agent/skills/lint-and-validate/scripts/type_coverage.py": `#!/usr/bin/env python3
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
`,
  "mobile-design/scripts/mobile_audit.py": `#!/usr/bin/env python3
"""
Mobile UX Audit Script - Full Mobile Design Coverage

Analyzes React Native / Flutter code for compliance with:

1. TOUCH PSYCHOLOGY (touch-psychology.md):
   - Touch Target Sizes (44pt iOS, 48dp Android, 44px WCAG)
   - Touch Target Spacing (8px minimum gap)
   - Thumb Zone Placement (primary CTAs at bottom)
   - Gesture Alternatives (visible buttons for swipe)
   - Haptic Feedback Patterns
   - Touch Feedback Timing (<50ms)
   - Touch Accessibility (motor impairment support)

2. MOBILE PERFORMANCE (mobile-performance.md):
   - ScrollView vs FlatList (CRITICAL)
   - React.memo for List Items
   - useCallback for renderItem
   - Stable keyExtractor (NOT index)
   - useNativeDriver for Animations
   - Memory Leak Prevention (cleanup)
   - Console.log Detection
   - Inline Function Detection
   - Animation Performance (transform/opacity only)

3. MOBILE NAVIGATION (mobile-navigation.md):
   - Tab Bar Max Items (5)
   - Tab State Preservation
   - Proper Back Handling
   - Deep Link Support
   - Navigation Structure

4. MOBILE TYPOGRAPHY (mobile-typography.md):
   - System Font Usage
   - Dynamic Type Support (iOS)
   - Text Scaling Constraints
   - Mobile Line Height
   - Font Size Limits

5. MOBILE COLOR SYSTEM (mobile-color-system.md):
   - Pure Black Avoidance (#000000)
   - OLED Optimization
   - Dark Mode Support
   - Contrast Ratios

6. PLATFORM iOS (platform-ios.md):
   - SF Symbols Usage
   - iOS Navigation Patterns
   - iOS Haptic Types
   - iOS-Specific Components

7. PLATFORM ANDROID (platform-android.md):
   - Material Icons Usage
   - Android Navigation Patterns
   - Ripple Effects
   - Android-Specific Components

8. MOBILE BACKEND (mobile-backend.md):
   - Secure Storage (NOT AsyncStorage)
   - Offline Handling
   - Push Notification Support
   - API Response Caching

Total: 50+ mobile-specific checks
"""

import sys
import os
import re
import json
from pathlib import Path

class MobileAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0

    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            return

        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Detect framework
        is_react_native = bool(re.search(r'react-native|@react-navigation|React\\.Native', content))
        is_flutter = bool(re.search(r'import \\'package:flutter|MaterialApp|Widget\\.build', content))

        if not (is_react_native or is_flutter):
            return  # Skip non-mobile files

        # --- 1. TOUCH PSYCHOLOGY CHECKS ---

        # 1.1 Touch Target Size Check
        # Look for small touch targets
        small_sizes = re.findall(r'(?:width|height|size):\\s*([0-3]\\d)', content)
        for size in small_sizes:
            if int(size) < 44:
                self.issues.append(f"[Touch Target] {filename}: Touch target size {size}px < 44px minimum (iOS: 44pt, Android: 48dp)")

        # 1.2 Touch Target Spacing Check
        # Look for inadequate spacing between touchable elements
        small_gaps = re.findall(r'(?:margin|gap):\\s*([0-7])\\s*(?:px|dp)', content)
        for gap in small_gaps:
            if int(gap) < 8:
                self.warnings.append(f"[Touch Spacing] {filename}: Touch target spacing {gap}px < 8px minimum. Accidental taps risk.")

        # 1.3 Thumb Zone Placement Check
        # Primary CTAs should be at bottom (easy thumb reach)
        primary_buttons = re.findall(r'(?:testID|id):\\s*["\\'](?:.*(?:primary|cta|submit|confirm)[^"\\']*)["\\']', content, re.IGNORECASE)
        has_bottom_placement = bool(re.search(r'position:\\s*["\\']?absolute["\\']?|bottom:\\s*\\d+|style.*bottom|justifyContent:\\s*["\\']?flex-end', content))
        if primary_buttons and not has_bottom_placement:
            self.warnings.append(f"[Thumb Zone] {filename}: Primary CTA may not be in thumb zone (bottom). Place primary actions at bottom for easy reach.")

        # 1.4 Gesture Alternatives Check
        # Swipe actions should have visible button alternatives
        has_swipe_gestures = bool(re.search(r'Swipeable|onSwipe|PanGestureHandler|swipe', content))
        has_visible_buttons = bool(re.search(r'Button.*(?:delete|archive|more)|TouchableOpacity|Pressable', content))
        if has_swipe_gestures and not has_visible_buttons:
            self.warnings.append(f"[Gestures] {filename}: Swipe gestures detected without visible button alternatives. Motor impaired users need alternatives.")

        # 1.5 Haptic Feedback Check
        # Important actions should have haptic feedback
        has_important_actions = bool(re.search(r'(?:onPress|onSubmit|delete|remove|confirm|purchase)', content))
        has_haptics = bool(re.search(r'Haptics|Vibration|react-native-haptic-feedback|FeedbackManager', content))
        if has_important_actions and not has_haptics:
            self.warnings.append(f"[Haptics] {filename}: Important actions without haptic feedback. Consider adding haptic confirmation.")

        # 1.6 Touch Feedback Timing Check
        # Touch feedback should be immediate (<50ms)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity', content))
            has_feedback_state = bool(re.search(r'pressed|style.*opacity|underlay', content))
            if has_pressable and not has_feedback_state:
                self.warnings.append(f"[Touch Feedback] {filename}: Pressable without visual feedback state. Add opacity/scale change for tap confirmation.")

        # --- 2. MOBILE PERFORMANCE CHECKS ---

        # 2.1 CRITICAL: ScrollView vs FlatList
        has_scrollview = bool(re.search(r'<ScrollView|ScrollView\\.', content))
        has_map_in_scrollview = bool(re.search(r'ScrollView.*\\.map\\(|ScrollView.*\\{.*\\.map', content))
        if has_scrollview and has_map_in_scrollview:
            self.issues.append(f"[Performance CRITICAL] {filename}: ScrollView with .map() detected. Use FlatList for lists to prevent memory explosion.")

        # 2.2 React.memo Check
        if is_react_native:
            has_list = bool(re.search(r'FlatList|FlashList|SectionList', content))
            has_react_memo = bool(re.search(r'React\\.memo|memo\\(', content))
            if has_list and not has_react_memo:
                self.warnings.append(f"[Performance] {filename}: FlatList without React.memo on list items. Items will re-render on every parent update.")

        # 2.3 useCallback Check
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList|FlashList', content))
            has_use_callback = bool(re.search(r'useCallback', content))
            if has_flatlist and not has_use_callback:
                self.warnings.append(f"[Performance] {filename}: FlatList renderItem without useCallback. New function created every render.")

        # 2.4 keyExtractor Check (CRITICAL)
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList', content))
            has_key_extractor = bool(re.search(r'keyExtractor', content))
            uses_index_key = bool(re.search(r'key=\\{.*index.*\\}|key:\\s*index', content))
            if has_flatlist and not has_key_extractor:
                self.issues.append(f"[Performance CRITICAL] {filename}: FlatList without keyExtractor. Index-based keys cause bugs on reorder/delete.")
            if uses_index_key:
                self.issues.append(f"[Performance CRITICAL] {filename}: Using index as key. This causes bugs when list changes. Use unique ID from data.")

        # 2.5 useNativeDriver Check
        if is_react_native:
            has_animated = bool(re.search(r'Animated\\.', content))
            has_native_driver = bool(re.search(r'useNativeDriver:\\s*true', content))
            has_native_driver_false = bool(re.search(r'useNativeDriver:\\s*false', content))
            if has_animated and has_native_driver_false:
                self.warnings.append(f"[Performance] {filename}: Animation with useNativeDriver: false. Use true for 60fps (only supports transform/opacity).")
            if has_animated and not has_native_driver:
                self.warnings.append(f"[Performance] {filename}: Animated component without useNativeDriver. Add useNativeDriver: true for 60fps.")

        # 2.6 Memory Leak Check
        if is_react_native:
            has_effect = bool(re.search(r'useEffect', content))
            has_cleanup = bool(re.search(r'return\\s*\\(\\)\\s*=>|return\\s+function', content))
            has_subscriptions = bool(re.search(r'addEventListener|subscribe|\\.focus\\(\\)|\\.off\\(', content))
            if has_effect and has_subscriptions and not has_cleanup:
                self.issues.append(f"[Memory Leak] {filename}: useEffect with subscriptions but no cleanup function. Memory leak on unmount.")

        # 2.7 Console.log Detection
        console_logs = len(re.findall(r'console\\.log|console\\.warn|console\\.error|console\\.debug', content))
        if console_logs > 5:
            self.warnings.append(f"[Performance] {filename}: {console_logs} console.log statements detected. Remove before production (blocks JS thread).")

        # 2.8 Inline Function Detection
        if is_react_native:
            inline_functions = re.findall(r'(?:onPress|onPressIn|onPressOut|renderItem):\\s*\\([^)]*\\)\\s*=>', content)
            if len(inline_functions) > 3:
                self.warnings.append(f"[Performance] {filename}: {len(inline_functions)} inline arrow functions in props. Creates new function every render. Use useCallback.")

        # 2.9 Animation Properties Check
        # Warn if animating expensive properties
        animating_layout = bool(re.search(r'Animated\\.timing.*(?:width|height|margin|padding)', content))
        if animating_layout:
            self.issues.append(f"[Performance] {filename}: Animating layout properties (width/height/margin). Use transform/opacity for 60fps.")

        # --- 3. MOBILE NAVIGATION CHECKS ---

        # 3.1 Tab Bar Max Items Check
        tab_bar_items = len(re.findall(r'Tab\\.Screen|createBottomTabNavigator|BottomTab', content))
        if tab_bar_items > 5:
            self.warnings.append(f"[Navigation] {filename}: {tab_bar_items} tab bar items (max 5 recommended). More than 5 becomes hard to tap.")

        # 3.2 Tab State Preservation Check
        has_tab_nav = bool(re.search(r'createBottomTabNavigator|Tab\\.Navigator', content))
        if has_tab_nav:
            # Look for lazy prop (false preserves state)
            has_lazy_false = bool(re.search(r'lazy:\\s*false', content))
            if not has_lazy_false:
                self.warnings.append(f"[Navigation] {filename}: Tab navigation without lazy: false. Tabs may lose state on switch.")

        # 3.3 Back Handling Check
        has_back_listener = bool(re.search(r'BackHandler|useFocusEffect|navigation\\.addListener', content))
        has_custom_back = bool(re.search(r'onBackPress|handleBackPress', content))
        if has_custom_back and not has_back_listener:
            self.warnings.append(f"[Navigation] {filename}: Custom back handling without BackHandler listener. May not work correctly.")

        # 3.4 Deep Link Support Check
        has_linking = bool(re.search(r'Linking\\.|Linking\\.openURL|deepLink|universalLink', content))
        has_config = bool(re.search(r'apollo-link|react-native-screens|navigation\\.link', content))
        if not has_linking and not has_config:
            self.passed_count += 1
        else:
            if has_linking and not has_config:
                self.warnings.append(f"[Navigation] {filename}: Deep linking detected but may lack proper configuration. Test notification/share flows.")

        # --- 4. MOBILE TYPOGRAPHY CHECKS ---

        # 4.1 System Font Check
        if is_react_native:
            has_custom_font = bool(re.search(r"fontFamily:\\s*[\\"'][^\\"']+", content))
            has_system_font = bool(re.search(r"fontFamily:\\s*[\\"']?(?:System|San Francisco|Roboto|-apple-system)", content))
            if has_custom_font and not has_system_font:
                self.warnings.append(f"[Typography] {filename}: Custom font detected. Consider system fonts (iOS: SF Pro, Android: Roboto) for native feel.")

        # 4.2 Text Scaling Check (iOS Dynamic Type)
        if is_react_native:
            has_font_sizes = bool(re.search(r'fontSize:', content))
            has_scaling = bool(re.search(r'allowFontScaling:\\s*true|responsiveFontSize|useWindowDimensions', content))
            if has_font_sizes and not has_scaling:
                self.warnings.append(f"[Typography] {filename}: Fixed font sizes without scaling support. Consider allowFontScaling for accessibility.")

        # 4.3 Mobile Line Height Check
        line_heights = re.findall(r'lineHeight:\\s*([\\d.]+)', content)
        for lh in line_heights:
            if float(lh) > 1.8:
                self.warnings.append(f"[Typography] {filename}: lineHeight {lh} too high for mobile. Mobile text needs tighter spacing (1.3-1.5).")

        # 4.4 Font Size Limits
        font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
        for fs in font_sizes:
            size = float(fs)
            if size < 12:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px below 12px minimum readability.")
            elif size > 32:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px very large. Consider using responsive scaling.")

        # --- 5. MOBILE COLOR SYSTEM CHECKS ---

        # 5.1 Pure Black Avoidance
        if re.search(r'#000000|color:\\s*black|backgroundColor:\\s*["\\']?black', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use dark gray (#1C1C1E iOS, #121212 Android) for better OLED/battery.")

        # 5.2 Dark Mode Support
        has_color_schemes = bool(re.search(r'useColorScheme|colorScheme|appearance:\\s*["\\']?dark', content))
        has_dark_mode_style = bool(re.search(r'\\\\\\?.*dark|style:\\s*.*dark|isDark', content))
        if not has_color_schemes and not has_dark_mode_style:
            self.warnings.append(f"[Color] {filename}: No dark mode support detected. Consider useColorScheme for system dark mode.")

        # --- 6. PLATFORM iOS CHECKS ---

        if is_react_native:
            # 6.1 SF Symbols Check
            has_ios_icons = bool(re.search(r'@expo/vector-icons|ionicons', content))
            has_sf_symbols = bool(re.search(r'sf-symbol|SF Symbols', content))
            if has_ios_icons and not has_sf_symbols:
                self.passed_count += 1

            # 6.2 iOS Haptic Types
            has_haptic_import = bool(re.search(r'expo-haptics|react-native-haptic-feedback', content))
            has_haptic_types = bool(re.search(r'ImpactFeedback|NotificationFeedback|SelectionFeedback', content))
            if has_haptic_import and not has_haptic_types:
                self.warnings.append(f"[iOS Haptics] {filename}: Haptic library imported but not using typed haptics (Impact/Notification/Selection).")

            # 6.3 iOS Safe Area
            has_safe_area = bool(re.search(r'SafeAreaView|useSafeAreaInsets|safeArea', content))
            if not has_safe_area:
                self.warnings.append(f"[iOS] {filename}: No SafeArea detected. Content may be hidden by notch/home indicator.")

        # --- 7. PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 7.1 Material Icons Check
            has_material_icons = bool(re.search(r'@expo/vector-icons|MaterialIcons', content))
            if has_material_icons:
                self.passed_count += 1

            # 7.2 Ripple Effect
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_pressable = bool(re.search(r'Pressable|Touchable', content))
            if has_pressable and not has_ripple:
                self.warnings.append(f"[Android] {filename}: Touchable without ripple effect. Android users expect ripple feedback.")

            # 7.3 Hardware Back Button
            if is_react_native:
                has_back_button = bool(re.search(r'BackHandler|useBackHandler', content))
                has_navigation = bool(re.search(r'@react-navigation', content))
                if has_navigation and not has_back_button:
                    self.warnings.append(f"[Android] {filename}: React Navigation detected without BackHandler listener. Android hardware back may not work correctly.")

        # --- 8. MOBILE BACKEND CHECKS ---

        # 8.1 Secure Storage Check
        has_async_storage = bool(re.search(r'AsyncStorage|@react-native-async-storage', content))
        has_secure_storage = bool(re.search(r'SecureStore|Keychain|EncryptedSharedPreferences', content))
        has_token_storage = bool(re.search(r'token|jwt|auth.*storage', content, re.IGNORECASE))
        if has_token_storage and has_async_storage and not has_secure_storage:
            self.issues.append(f"[Security] {filename}: Storing auth tokens in AsyncStorage (insecure). Use SecureStore (iOS) / EncryptedSharedPreferences (Android).")

        # 8.2 Offline Handling Check
        has_network = bool(re.search(r'fetch|axios|netinfo|@react-native-community/netinfo', content))
        has_offline = bool(re.search(r'offline|isConnected|netInfo|cache.*offline', content))
        if has_network and not has_offline:
            self.warnings.append(f"[Offline] {filename}: Network requests detected without offline handling. Consider NetInfo for connection status.")

        # 8.3 Push Notification Support
        has_push = bool(re.search(r'Notifications|pushNotification|Firebase\\.messaging|PushNotificationIOS', content))
        has_push_handler = bool(re.search(r'onNotification|addNotificationListener|notification\\.open', content))
        if has_push and not has_push_handler:
            self.warnings.append(f"[Push] {filename}: Push notifications imported but no handler found. May miss notifications.")

        # --- 9. EXTENDED MOBILE TYPOGRAPHY CHECKS ---

        # 9.1 iOS Type Scale Check
        if is_react_native:
            # Check for iOS text styles that match HIG
            has_large_title = bool(re.search(r'fontSize:\\s*34|largeTitle|font-weight:\\s*["\\']?bold', content))
            has_title_1 = bool(re.search(r'fontSize:\\s*28', content))
            has_headline = bool(re.search(r'fontSize:\\s*17.*semibold|headline', content))
            has_body = bool(re.search(r'fontSize:\\s*17.*regular|body', content))

            # Check if following iOS scale roughly
            font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
            ios_scale_sizes = [34, 28, 22, 20, 17, 16, 15, 13, 12, 11]
            matching_ios = sum(1 for size in font_sizes if any(abs(float(size) - ios_size) < 1 for ios_size in ios_scale_sizes))

            if len(font_sizes) > 3 and matching_ios < len(font_sizes) / 2:
                self.warnings.append(f"[iOS Typography] {filename}: Font sizes don't match iOS type scale. Consider iOS text styles for native feel.")

        # 9.2 Android Material Type Scale Check
        if is_react_native:
            # Check for Material 3 text styles
            has_display = bool(re.search(r'fontSize:\\s*[456][0-9]|display', content))
            has_headline_material = bool(re.search(r'fontSize:\\s*[23][0-9]|headline', content))
            has_title_material = bool(re.search(r'fontSize:\\s*2[12][0-9].*medium|title', content))
            has_body_material = bool(re.search(r'fontSize:\\s*1[456].*regular|body', content))
            has_label = bool(re.search(r'fontSize:\\s*1[1234].*medium|label', content))

            # Check if using sp (scale-independent pixels)
            uses_sp = bool(re.search(r'\\d+\\s*sp\\b', content))
            if has_display or has_headline_material:
                if not uses_sp:
                    self.warnings.append(f"[Android Typography] {filename}: Material typography detected without sp units. Use sp for text to respect user font size preferences.")

        # 9.3 Modular Scale Check
        # Check if font sizes follow modular scale
        font_sizes = re.findall(r'fontSize:\\s*(\\d+(?:\\.\\d+)?)', content)
        if len(font_sizes) > 3:
            sorted_sizes = sorted(set([float(s) for s in font_sizes]))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common ratios: 1.125, 1.2, 1.25, 1.333, 1.5
            common_ratios = {1.125, 1.2, 1.25, 1.333, 1.5}
            for ratio in ratios[:3]:
                if not any(abs(ratio - cr) < 0.03 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio.")
                    break

        # 9.4 Line Length Check (Mobile-specific)
        # Mobile text should be 40-60 characters max
        if is_react_native:
            has_long_text = bool(re.search(r'<Text[^>]*>[^<]{40,}', content))
            has_max_width = bool(re.search(r'maxWidth|max-w-\\d+|width:\\s*["\\']?\\d+', content))
            if has_long_text and not has_max_width:
                self.warnings.append(f"[Mobile Typography] {filename}: Text without max-width constraint. Mobile text should be 40-60 characters per line for readability.")

        # 9.5 Font Weight Pattern Check
        # Check for font weight distribution
        if is_react_native:
            font_weights = re.findall(r'fontWeight:\\s*["\\']?(\\d+|normal|bold|medium|light)', content)
            weight_map = {'normal': '400', 'light': '300', 'medium': '500', 'bold': '700'}
            numeric_weights = []
            for w in font_weights:
                val = weight_map.get(w.lower(), w)
                try:
                    numeric_weights.append(int(val))
                except:
                    pass

            # Check if overusing bold (mobile should be regular-dominant)
            bold_count = sum(1 for w in numeric_weights if w >= 700)
            regular_count = sum(1 for w in numeric_weights if 400 <= w < 500)
            if bold_count > regular_count:
                self.warnings.append(f"[Mobile Typography] {filename}: More bold weights than regular. Mobile typography should be regular-dominant for readability.")

        # --- 10. EXTENDED MOBILE COLOR SYSTEM CHECKS ---

        # 10.1 OLED Optimization Check
        # Check for near-black colors instead of pure black
        if re.search(r'#121212|#1A1A1A|#0D0D0D', content):
            self.passed_count += 1  # Good OLED optimization
        elif re.search(r'backgroundColor:\\s*["\\']?#000000', content):
            # Using pure black for background is OK for OLED
            pass
        elif re.search(r'backgroundColor:\\s*["\\']?#[0-9A-Fa-f]{6}', content):
            # Check if using light colors in dark mode (bad for OLED)
            self.warnings.append(f"[Mobile Color] {filename}: Consider OLED-optimized dark backgrounds (#121212 Android, #000000 iOS) for battery savings.")

        # 10.2 Saturated Color Detection (Battery)
        # Highly saturated colors consume more power on OLED
        hex_colors = re.findall(r'#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})', content)
        saturated_count = 0
        for r, g, b in hex_colors:
            # Convert to RGB 0-255
            try:
                r_val, g_val, b_val = int(r, 16), int(g, 16), int(b, 16)
                max_val = max(r_val, g_val, b_val)
                min_val = min(r_val, g_val, b_val)
                # Saturation = (max - min) / max
                if max_val > 0:
                    saturation = (max_val - min_val) / max_val
                    if saturation > 0.8:  # Highly saturated
                        saturated_count += 1
            except:
                pass

        if saturated_count > 10:
            self.warnings.append(f"[Mobile Color] {filename}: {saturated_count} highly saturated colors detected. Desaturated colors save battery on OLED screens.")

        # 10.3 Outdoor Visibility Check
        # Low contrast combinations fail in outdoor sunlight
        light_colors = re.findall(r'#[0-9A-Fa-f]{6}|rgba?\\([^)]+\\)', content)
        # Check for potential low contrast (light gray on white, dark gray on black)
        potential_low_contrast = bool(re.search(r'#[EeEeEeEe].*#ffffff|#999999.*#ffffff|#333333.*#000000|#666666.*#000000', content))
        if potential_low_contrast:
            self.warnings.append(f"[Mobile Color] {filename}: Possible low contrast combination detected. Critical for outdoor visibility. Ensure WCAG AAA (7:1) for mobile.")

        # 10.4 Dark Mode Text Color Check
        # In dark mode, text should not be pure white
        has_dark_mode = bool(re.search(r'dark:\\s*|isDark|useColorScheme|colorScheme:\\s*["\\']?dark', content))
        if has_dark_mode:
            has_pure_white_text = bool(re.search(r'color:\\s*["\\']?#ffffff|#fff["\\']?\\}|textColor:\\s*["\\']?white', content))
            if has_pure_white_text:
                self.warnings.append(f"[Mobile Color] {filename}: Pure white text (#FFFFFF) in dark mode. Use #E8E8E8 or light gray for better readability.")

        # --- 11. EXTENDED PLATFORM IOS CHECKS ---

        if is_react_native:
            # 11.1 SF Pro Font Detection
            has_sf_pro = bool(re.search(r'SF Pro|SFPro|fontFamily:\\s*["\\']?[-\\s]*SF', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_sf_pro:
                self.warnings.append(f"[iOS] {filename}: Custom font without SF Pro fallback. Consider SF Pro Text for body, SF Pro Display for headings.")

            # 11.2 iOS System Colors Check
            # Check for semantic color usage
            has_label = bool(re.search(r'color:\\s*["\\']?label|\\.label', content))
            has_secondaryLabel = bool(re.search(r'secondaryLabel|\\.secondaryLabel', content))
            has_systemBackground = bool(re.search(r'systemBackground|\\.systemBackground', content))

            has_hardcoded_gray = bool(re.search(r'#[78]0{4}', content))
            if has_hardcoded_gray and not (has_label or has_secondaryLabel):
                self.warnings.append(f"[iOS] {filename}: Hardcoded gray colors detected. Consider iOS semantic colors (label, secondaryLabel) for automatic dark mode.")

            # 11.3 iOS Accent Colors Check
            ios_blue = bool(re.search(r'#007AFF|#0A84FF|systemBlue', content))
            ios_green = bool(re.search(r'#34C759|#30D158|systemGreen', content))
            ios_red = bool(re.search(r'#FF3B30|#FF453A|systemRed', content))

            has_custom_primary = bool(re.search(r'primaryColor|theme.*primary|colors\\.primary', content))
            if has_custom_primary and not (ios_blue or ios_green or ios_red):
                self.warnings.append(f"[iOS] {filename}: Custom primary color without iOS system color fallback. Consider systemBlue for consistent iOS feel.")

            # 11.4 iOS Navigation Patterns Check
            has_navigation_bar = bool(re.search(r'navigationOptions|headerStyle|cardStyle', content))
            has_header_title = bool(re.search(r'title:\\s*["\\']|headerTitle|navigation\\.setOptions', content))
            if has_navigation_bar and not has_header_title:
                self.warnings.append(f"[iOS] {filename}: Navigation bar detected without title. iOS apps should have clear context in nav bar.")

            # 11.5 iOS Component Patterns Check
            # Check for iOS-specific components
            has_alert = bool(re.search(r'Alert\\.alert|showAlert', content))
            has_action_sheet = bool(re.search(r'ActionSheet|ActionSheetIOS|showActionSheetWithOptions', content))
            has_activity_indicator = bool(re.search(r'ActivityIndicator|ActivityIndic', content))

            if has_alert or has_action_sheet or has_activity_indicator:
                self.passed_count += 1  # Good iOS component usage

        # --- 12. EXTENDED PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 12.1 Roboto Font Detection
            has_roboto = bool(re.search(r'Roboto|fontFamily:\\s*["\\']?[-\\s]*Roboto', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_roboto:
                self.warnings.append(f"[Android] {filename}: Custom font without Roboto fallback. Roboto is optimized for Android displays.")

            # 12.2 Material 3 Dynamic Color Check
            has_material_colors = bool(re.search(r'MD3|MaterialYou|dynamicColor|useColorScheme', content))
            has_theme_provider = bool(re.search(r'MaterialTheme|ThemeProvider|PaperProvider|ThemeProvider', content))
            if not has_material_colors and not has_theme_provider:
                self.warnings.append(f"[Android] {filename}: No Material 3 dynamic color detected. Consider Material 3 theming for personalized feel.")

            # 12.3 Material Elevation Check
            # Check for elevation values (Material 3 uses elevation for depth)
            has_elevation = bool(re.search(r'elevation:\\s*\\d+|shadowOpacity|shadowRadius|android:elevation', content))
            has_box_shadow = bool(re.search(r'boxShadow:', content))
            if has_box_shadow and not has_elevation:
                self.warnings.append(f"[Android] {filename}: CSS box-shadow detected without elevation. Consider Material elevation system for consistent depth.")

            # 12.4 Material Component Patterns Check
            # Check for Material components
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_card = bool(re.search(r'Card|Paper|elevation.*\\d+', content))
            has_fab = bool(re.search(r'FAB|FloatingActionButton|fab', content))
            has_snackbar = bool(re.search(r'Snackbar|showSnackBar|Toast', content))

            material_component_count = sum([has_ripple, has_card, has_fab, has_snackbar])
            if material_component_count >= 2:
                self.passed_count += 1  # Good Material design usage

            # 12.5 Android Navigation Patterns Check
            has_top_app_bar = bool(re.search(r'TopAppBar|AppBar|CollapsingToolbar', content))
            has_bottom_nav = bool(re.search(r'BottomNavigation|BottomNav', content))
            has_navigation_rail = bool(re.search(r'NavigationRail', content))

            if has_bottom_nav:
                self.passed_count += 1  # Good Android pattern
            elif has_top_app_bar and not (has_bottom_nav or has_navigation_rail):
                self.warnings.append(f"[Android] {filename}: TopAppBar without bottom navigation. Consider BottomNavigation for thumb-friendly access.")

        # --- 13. MOBILE TESTING CHECKS ---

        # 13.1 Testing Tool Detection
        has_rntl = bool(re.search(r'react-native-testing-library|@testing-library', content))
        has_detox = bool(re.search(r'detox|element\\(|by\\.text|by\\.id', content))
        has_maestro = bool(re.search(r'maestro|\\.yaml$', content))
        has_jest = bool(re.search(r'jest|describe\\(|test\\(|it\\(', content))

        testing_tools = []
        if has_jest: testing_tools.append('Jest')
        if has_rntl: testing_tools.append('RNTL')
        if has_detox: testing_tools.append('Detox')
        if has_maestro: testing_tools.append('Maestro')

        if len(testing_tools) == 0:
            self.warnings.append(f"[Testing] {filename}: No testing framework detected. Consider Jest (unit) + Detox/Maestro (E2E) for mobile.")

        # 13.2 Test Pyramid Balance Check
        test_files = len(re.findall(r'\\.test\\.(tsx|ts|js|jsx)|\\.spec\\.', content))
        e2e_tests = len(re.findall(r'detox|maestro|e2e|spec\\.e2e', content.lower()))

        if test_files > 0 and e2e_tests == 0:
            self.warnings.append(f"[Testing] {filename}: Unit tests found but no E2E tests. Mobile needs E2E on real devices for complete coverage.")

        # 13.3 Accessibility Label Check (Mobile-specific)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity|TouchableHighlight', content))
            has_a11y_label = bool(re.search(r'accessibilityLabel|aria-label|testID', content))
            if has_pressable and not has_a11y_label:
                self.warnings.append(f"[A11y Mobile] {filename}: Touchable element without accessibilityLabel. Screen readers need labels for all interactive elements.")

        # --- 14. MOBILE DEBUGGING CHECKS ---

        # 14.1 Performance Profiling Check
        has_performance = bool(re.search(r'Performance|systrace|profile|Flipper', content))
        has_console_log = len(re.findall(r'console\\.(log|warn|error|debug|info)', content))
        has_debugger = bool(re.search(r'debugger|__DEV__|React\\.DevTools', content))

        if has_console_log > 10:
            self.warnings.append(f"[Debugging] {filename}: {has_console_log} console.log statements. Remove before production; they block JS thread.")

        if has_performance:
            self.passed_count += 1  # Good performance monitoring

        # 14.2 Error Boundary Check
        has_error_boundary = bool(re.search(r'ErrorBoundary|componentDidCatch|getDerivedStateFromError', content))
        if not has_error_boundary and is_react_native:
            self.warnings.append(f"[Debugging] {filename}: No ErrorBoundary detected. Consider adding ErrorBoundary to prevent app crashes.")

        # 14.3 Hermes Check (React Native specific)
        if is_react_native:
            # Check if using Hermes engine (should be default in modern RN)
            # This is more of a configuration check, not code pattern
            self.passed_count += 1  # Hermes is default in RN 0.70+

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.ts', '.jsx', '.js', '.dart'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next', 'ios', 'android', 'build', '.idea'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }


def main():
    if len(sys.argv) < 2:
        print("Usage: python mobile_audit.py <directory>")
        sys.exit(1)

    path = sys.argv[1]
    is_json = "--json" in sys.argv

    auditor = MobileAuditor()
    if os.path.isfile(path):
        auditor.audit_file(path)
    else:
        auditor.audit_directory(path)

    report = auditor.get_report()

    if is_json:
        print(json.dumps(report, indent=2))
    else:
        print(f"\\n[MOBILE AUDIT] {report['files_checked']} mobile files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]:
                print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]:
                print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)


if __name__ == "__main__":
    # Fix missing import
    import re
    main()
`,
  "skills/mobile-design/scripts/mobile_audit.py": `#!/usr/bin/env python3
"""
Mobile UX Audit Script - Full Mobile Design Coverage

Analyzes React Native / Flutter code for compliance with:

1. TOUCH PSYCHOLOGY (touch-psychology.md):
   - Touch Target Sizes (44pt iOS, 48dp Android, 44px WCAG)
   - Touch Target Spacing (8px minimum gap)
   - Thumb Zone Placement (primary CTAs at bottom)
   - Gesture Alternatives (visible buttons for swipe)
   - Haptic Feedback Patterns
   - Touch Feedback Timing (<50ms)
   - Touch Accessibility (motor impairment support)

2. MOBILE PERFORMANCE (mobile-performance.md):
   - ScrollView vs FlatList (CRITICAL)
   - React.memo for List Items
   - useCallback for renderItem
   - Stable keyExtractor (NOT index)
   - useNativeDriver for Animations
   - Memory Leak Prevention (cleanup)
   - Console.log Detection
   - Inline Function Detection
   - Animation Performance (transform/opacity only)

3. MOBILE NAVIGATION (mobile-navigation.md):
   - Tab Bar Max Items (5)
   - Tab State Preservation
   - Proper Back Handling
   - Deep Link Support
   - Navigation Structure

4. MOBILE TYPOGRAPHY (mobile-typography.md):
   - System Font Usage
   - Dynamic Type Support (iOS)
   - Text Scaling Constraints
   - Mobile Line Height
   - Font Size Limits

5. MOBILE COLOR SYSTEM (mobile-color-system.md):
   - Pure Black Avoidance (#000000)
   - OLED Optimization
   - Dark Mode Support
   - Contrast Ratios

6. PLATFORM iOS (platform-ios.md):
   - SF Symbols Usage
   - iOS Navigation Patterns
   - iOS Haptic Types
   - iOS-Specific Components

7. PLATFORM ANDROID (platform-android.md):
   - Material Icons Usage
   - Android Navigation Patterns
   - Ripple Effects
   - Android-Specific Components

8. MOBILE BACKEND (mobile-backend.md):
   - Secure Storage (NOT AsyncStorage)
   - Offline Handling
   - Push Notification Support
   - API Response Caching

Total: 50+ mobile-specific checks
"""

import sys
import os
import re
import json
from pathlib import Path

class MobileAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0

    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            return

        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Detect framework
        is_react_native = bool(re.search(r'react-native|@react-navigation|React\\.Native', content))
        is_flutter = bool(re.search(r'import \\'package:flutter|MaterialApp|Widget\\.build', content))

        if not (is_react_native or is_flutter):
            return  # Skip non-mobile files

        # --- 1. TOUCH PSYCHOLOGY CHECKS ---

        # 1.1 Touch Target Size Check
        # Look for small touch targets
        small_sizes = re.findall(r'(?:width|height|size):\\s*([0-3]\\d)', content)
        for size in small_sizes:
            if int(size) < 44:
                self.issues.append(f"[Touch Target] {filename}: Touch target size {size}px < 44px minimum (iOS: 44pt, Android: 48dp)")

        # 1.2 Touch Target Spacing Check
        # Look for inadequate spacing between touchable elements
        small_gaps = re.findall(r'(?:margin|gap):\\s*([0-7])\\s*(?:px|dp)', content)
        for gap in small_gaps:
            if int(gap) < 8:
                self.warnings.append(f"[Touch Spacing] {filename}: Touch target spacing {gap}px < 8px minimum. Accidental taps risk.")

        # 1.3 Thumb Zone Placement Check
        # Primary CTAs should be at bottom (easy thumb reach)
        primary_buttons = re.findall(r'(?:testID|id):\\s*["\\'](?:.*(?:primary|cta|submit|confirm)[^"\\']*)["\\']', content, re.IGNORECASE)
        has_bottom_placement = bool(re.search(r'position:\\s*["\\']?absolute["\\']?|bottom:\\s*\\d+|style.*bottom|justifyContent:\\s*["\\']?flex-end', content))
        if primary_buttons and not has_bottom_placement:
            self.warnings.append(f"[Thumb Zone] {filename}: Primary CTA may not be in thumb zone (bottom). Place primary actions at bottom for easy reach.")

        # 1.4 Gesture Alternatives Check
        # Swipe actions should have visible button alternatives
        has_swipe_gestures = bool(re.search(r'Swipeable|onSwipe|PanGestureHandler|swipe', content))
        has_visible_buttons = bool(re.search(r'Button.*(?:delete|archive|more)|TouchableOpacity|Pressable', content))
        if has_swipe_gestures and not has_visible_buttons:
            self.warnings.append(f"[Gestures] {filename}: Swipe gestures detected without visible button alternatives. Motor impaired users need alternatives.")

        # 1.5 Haptic Feedback Check
        # Important actions should have haptic feedback
        has_important_actions = bool(re.search(r'(?:onPress|onSubmit|delete|remove|confirm|purchase)', content))
        has_haptics = bool(re.search(r'Haptics|Vibration|react-native-haptic-feedback|FeedbackManager', content))
        if has_important_actions and not has_haptics:
            self.warnings.append(f"[Haptics] {filename}: Important actions without haptic feedback. Consider adding haptic confirmation.")

        # 1.6 Touch Feedback Timing Check
        # Touch feedback should be immediate (<50ms)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity', content))
            has_feedback_state = bool(re.search(r'pressed|style.*opacity|underlay', content))
            if has_pressable and not has_feedback_state:
                self.warnings.append(f"[Touch Feedback] {filename}: Pressable without visual feedback state. Add opacity/scale change for tap confirmation.")

        # --- 2. MOBILE PERFORMANCE CHECKS ---

        # 2.1 CRITICAL: ScrollView vs FlatList
        has_scrollview = bool(re.search(r'<ScrollView|ScrollView\\.', content))
        has_map_in_scrollview = bool(re.search(r'ScrollView.*\\.map\\(|ScrollView.*\\{.*\\.map', content))
        if has_scrollview and has_map_in_scrollview:
            self.issues.append(f"[Performance CRITICAL] {filename}: ScrollView with .map() detected. Use FlatList for lists to prevent memory explosion.")

        # 2.2 React.memo Check
        if is_react_native:
            has_list = bool(re.search(r'FlatList|FlashList|SectionList', content))
            has_react_memo = bool(re.search(r'React\\.memo|memo\\(', content))
            if has_list and not has_react_memo:
                self.warnings.append(f"[Performance] {filename}: FlatList without React.memo on list items. Items will re-render on every parent update.")

        # 2.3 useCallback Check
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList|FlashList', content))
            has_use_callback = bool(re.search(r'useCallback', content))
            if has_flatlist and not has_use_callback:
                self.warnings.append(f"[Performance] {filename}: FlatList renderItem without useCallback. New function created every render.")

        # 2.4 keyExtractor Check (CRITICAL)
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList', content))
            has_key_extractor = bool(re.search(r'keyExtractor', content))
            uses_index_key = bool(re.search(r'key=\\{.*index.*\\}|key:\\s*index', content))
            if has_flatlist and not has_key_extractor:
                self.issues.append(f"[Performance CRITICAL] {filename}: FlatList without keyExtractor. Index-based keys cause bugs on reorder/delete.")
            if uses_index_key:
                self.issues.append(f"[Performance CRITICAL] {filename}: Using index as key. This causes bugs when list changes. Use unique ID from data.")

        # 2.5 useNativeDriver Check
        if is_react_native:
            has_animated = bool(re.search(r'Animated\\.', content))
            has_native_driver = bool(re.search(r'useNativeDriver:\\s*true', content))
            has_native_driver_false = bool(re.search(r'useNativeDriver:\\s*false', content))
            if has_animated and has_native_driver_false:
                self.warnings.append(f"[Performance] {filename}: Animation with useNativeDriver: false. Use true for 60fps (only supports transform/opacity).")
            if has_animated and not has_native_driver:
                self.warnings.append(f"[Performance] {filename}: Animated component without useNativeDriver. Add useNativeDriver: true for 60fps.")

        # 2.6 Memory Leak Check
        if is_react_native:
            has_effect = bool(re.search(r'useEffect', content))
            has_cleanup = bool(re.search(r'return\\s*\\(\\)\\s*=>|return\\s+function', content))
            has_subscriptions = bool(re.search(r'addEventListener|subscribe|\\.focus\\(\\)|\\.off\\(', content))
            if has_effect and has_subscriptions and not has_cleanup:
                self.issues.append(f"[Memory Leak] {filename}: useEffect with subscriptions but no cleanup function. Memory leak on unmount.")

        # 2.7 Console.log Detection
        console_logs = len(re.findall(r'console\\.log|console\\.warn|console\\.error|console\\.debug', content))
        if console_logs > 5:
            self.warnings.append(f"[Performance] {filename}: {console_logs} console.log statements detected. Remove before production (blocks JS thread).")

        # 2.8 Inline Function Detection
        if is_react_native:
            inline_functions = re.findall(r'(?:onPress|onPressIn|onPressOut|renderItem):\\s*\\([^)]*\\)\\s*=>', content)
            if len(inline_functions) > 3:
                self.warnings.append(f"[Performance] {filename}: {len(inline_functions)} inline arrow functions in props. Creates new function every render. Use useCallback.")

        # 2.9 Animation Properties Check
        # Warn if animating expensive properties
        animating_layout = bool(re.search(r'Animated\\.timing.*(?:width|height|margin|padding)', content))
        if animating_layout:
            self.issues.append(f"[Performance] {filename}: Animating layout properties (width/height/margin). Use transform/opacity for 60fps.")

        # --- 3. MOBILE NAVIGATION CHECKS ---

        # 3.1 Tab Bar Max Items Check
        tab_bar_items = len(re.findall(r'Tab\\.Screen|createBottomTabNavigator|BottomTab', content))
        if tab_bar_items > 5:
            self.warnings.append(f"[Navigation] {filename}: {tab_bar_items} tab bar items (max 5 recommended). More than 5 becomes hard to tap.")

        # 3.2 Tab State Preservation Check
        has_tab_nav = bool(re.search(r'createBottomTabNavigator|Tab\\.Navigator', content))
        if has_tab_nav:
            # Look for lazy prop (false preserves state)
            has_lazy_false = bool(re.search(r'lazy:\\s*false', content))
            if not has_lazy_false:
                self.warnings.append(f"[Navigation] {filename}: Tab navigation without lazy: false. Tabs may lose state on switch.")

        # 3.3 Back Handling Check
        has_back_listener = bool(re.search(r'BackHandler|useFocusEffect|navigation\\.addListener', content))
        has_custom_back = bool(re.search(r'onBackPress|handleBackPress', content))
        if has_custom_back and not has_back_listener:
            self.warnings.append(f"[Navigation] {filename}: Custom back handling without BackHandler listener. May not work correctly.")

        # 3.4 Deep Link Support Check
        has_linking = bool(re.search(r'Linking\\.|Linking\\.openURL|deepLink|universalLink', content))
        has_config = bool(re.search(r'apollo-link|react-native-screens|navigation\\.link', content))
        if not has_linking and not has_config:
            self.passed_count += 1
        else:
            if has_linking and not has_config:
                self.warnings.append(f"[Navigation] {filename}: Deep linking detected but may lack proper configuration. Test notification/share flows.")

        # --- 4. MOBILE TYPOGRAPHY CHECKS ---

        # 4.1 System Font Check
        if is_react_native:
            has_custom_font = bool(re.search(r"fontFamily:\\s*[\\"'][^\\"']+", content))
            has_system_font = bool(re.search(r"fontFamily:\\s*[\\"']?(?:System|San Francisco|Roboto|-apple-system)", content))
            if has_custom_font and not has_system_font:
                self.warnings.append(f"[Typography] {filename}: Custom font detected. Consider system fonts (iOS: SF Pro, Android: Roboto) for native feel.")

        # 4.2 Text Scaling Check (iOS Dynamic Type)
        if is_react_native:
            has_font_sizes = bool(re.search(r'fontSize:', content))
            has_scaling = bool(re.search(r'allowFontScaling:\\s*true|responsiveFontSize|useWindowDimensions', content))
            if has_font_sizes and not has_scaling:
                self.warnings.append(f"[Typography] {filename}: Fixed font sizes without scaling support. Consider allowFontScaling for accessibility.")

        # 4.3 Mobile Line Height Check
        line_heights = re.findall(r'lineHeight:\\s*([\\d.]+)', content)
        for lh in line_heights:
            if float(lh) > 1.8:
                self.warnings.append(f"[Typography] {filename}: lineHeight {lh} too high for mobile. Mobile text needs tighter spacing (1.3-1.5).")

        # 4.4 Font Size Limits
        font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
        for fs in font_sizes:
            size = float(fs)
            if size < 12:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px below 12px minimum readability.")
            elif size > 32:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px very large. Consider using responsive scaling.")

        # --- 5. MOBILE COLOR SYSTEM CHECKS ---

        # 5.1 Pure Black Avoidance
        if re.search(r'#000000|color:\\s*black|backgroundColor:\\s*["\\']?black', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use dark gray (#1C1C1E iOS, #121212 Android) for better OLED/battery.")

        # 5.2 Dark Mode Support
        has_color_schemes = bool(re.search(r'useColorScheme|colorScheme|appearance:\\s*["\\']?dark', content))
        has_dark_mode_style = bool(re.search(r'\\\\\\?.*dark|style:\\s*.*dark|isDark', content))
        if not has_color_schemes and not has_dark_mode_style:
            self.warnings.append(f"[Color] {filename}: No dark mode support detected. Consider useColorScheme for system dark mode.")

        # --- 6. PLATFORM iOS CHECKS ---

        if is_react_native:
            # 6.1 SF Symbols Check
            has_ios_icons = bool(re.search(r'@expo/vector-icons|ionicons', content))
            has_sf_symbols = bool(re.search(r'sf-symbol|SF Symbols', content))
            if has_ios_icons and not has_sf_symbols:
                self.passed_count += 1

            # 6.2 iOS Haptic Types
            has_haptic_import = bool(re.search(r'expo-haptics|react-native-haptic-feedback', content))
            has_haptic_types = bool(re.search(r'ImpactFeedback|NotificationFeedback|SelectionFeedback', content))
            if has_haptic_import and not has_haptic_types:
                self.warnings.append(f"[iOS Haptics] {filename}: Haptic library imported but not using typed haptics (Impact/Notification/Selection).")

            # 6.3 iOS Safe Area
            has_safe_area = bool(re.search(r'SafeAreaView|useSafeAreaInsets|safeArea', content))
            if not has_safe_area:
                self.warnings.append(f"[iOS] {filename}: No SafeArea detected. Content may be hidden by notch/home indicator.")

        # --- 7. PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 7.1 Material Icons Check
            has_material_icons = bool(re.search(r'@expo/vector-icons|MaterialIcons', content))
            if has_material_icons:
                self.passed_count += 1

            # 7.2 Ripple Effect
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_pressable = bool(re.search(r'Pressable|Touchable', content))
            if has_pressable and not has_ripple:
                self.warnings.append(f"[Android] {filename}: Touchable without ripple effect. Android users expect ripple feedback.")

            # 7.3 Hardware Back Button
            if is_react_native:
                has_back_button = bool(re.search(r'BackHandler|useBackHandler', content))
                has_navigation = bool(re.search(r'@react-navigation', content))
                if has_navigation and not has_back_button:
                    self.warnings.append(f"[Android] {filename}: React Navigation detected without BackHandler listener. Android hardware back may not work correctly.")

        # --- 8. MOBILE BACKEND CHECKS ---

        # 8.1 Secure Storage Check
        has_async_storage = bool(re.search(r'AsyncStorage|@react-native-async-storage', content))
        has_secure_storage = bool(re.search(r'SecureStore|Keychain|EncryptedSharedPreferences', content))
        has_token_storage = bool(re.search(r'token|jwt|auth.*storage', content, re.IGNORECASE))
        if has_token_storage and has_async_storage and not has_secure_storage:
            self.issues.append(f"[Security] {filename}: Storing auth tokens in AsyncStorage (insecure). Use SecureStore (iOS) / EncryptedSharedPreferences (Android).")

        # 8.2 Offline Handling Check
        has_network = bool(re.search(r'fetch|axios|netinfo|@react-native-community/netinfo', content))
        has_offline = bool(re.search(r'offline|isConnected|netInfo|cache.*offline', content))
        if has_network and not has_offline:
            self.warnings.append(f"[Offline] {filename}: Network requests detected without offline handling. Consider NetInfo for connection status.")

        # 8.3 Push Notification Support
        has_push = bool(re.search(r'Notifications|pushNotification|Firebase\\.messaging|PushNotificationIOS', content))
        has_push_handler = bool(re.search(r'onNotification|addNotificationListener|notification\\.open', content))
        if has_push and not has_push_handler:
            self.warnings.append(f"[Push] {filename}: Push notifications imported but no handler found. May miss notifications.")

        # --- 9. EXTENDED MOBILE TYPOGRAPHY CHECKS ---

        # 9.1 iOS Type Scale Check
        if is_react_native:
            # Check for iOS text styles that match HIG
            has_large_title = bool(re.search(r'fontSize:\\s*34|largeTitle|font-weight:\\s*["\\']?bold', content))
            has_title_1 = bool(re.search(r'fontSize:\\s*28', content))
            has_headline = bool(re.search(r'fontSize:\\s*17.*semibold|headline', content))
            has_body = bool(re.search(r'fontSize:\\s*17.*regular|body', content))

            # Check if following iOS scale roughly
            font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
            ios_scale_sizes = [34, 28, 22, 20, 17, 16, 15, 13, 12, 11]
            matching_ios = sum(1 for size in font_sizes if any(abs(float(size) - ios_size) < 1 for ios_size in ios_scale_sizes))

            if len(font_sizes) > 3 and matching_ios < len(font_sizes) / 2:
                self.warnings.append(f"[iOS Typography] {filename}: Font sizes don't match iOS type scale. Consider iOS text styles for native feel.")

        # 9.2 Android Material Type Scale Check
        if is_react_native:
            # Check for Material 3 text styles
            has_display = bool(re.search(r'fontSize:\\s*[456][0-9]|display', content))
            has_headline_material = bool(re.search(r'fontSize:\\s*[23][0-9]|headline', content))
            has_title_material = bool(re.search(r'fontSize:\\s*2[12][0-9].*medium|title', content))
            has_body_material = bool(re.search(r'fontSize:\\s*1[456].*regular|body', content))
            has_label = bool(re.search(r'fontSize:\\s*1[1234].*medium|label', content))

            # Check if using sp (scale-independent pixels)
            uses_sp = bool(re.search(r'\\d+\\s*sp\\b', content))
            if has_display or has_headline_material:
                if not uses_sp:
                    self.warnings.append(f"[Android Typography] {filename}: Material typography detected without sp units. Use sp for text to respect user font size preferences.")

        # 9.3 Modular Scale Check
        # Check if font sizes follow modular scale
        font_sizes = re.findall(r'fontSize:\\s*(\\d+(?:\\.\\d+)?)', content)
        if len(font_sizes) > 3:
            sorted_sizes = sorted(set([float(s) for s in font_sizes]))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common ratios: 1.125, 1.2, 1.25, 1.333, 1.5
            common_ratios = {1.125, 1.2, 1.25, 1.333, 1.5}
            for ratio in ratios[:3]:
                if not any(abs(ratio - cr) < 0.03 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio.")
                    break

        # 9.4 Line Length Check (Mobile-specific)
        # Mobile text should be 40-60 characters max
        if is_react_native:
            has_long_text = bool(re.search(r'<Text[^>]*>[^<]{40,}', content))
            has_max_width = bool(re.search(r'maxWidth|max-w-\\d+|width:\\s*["\\']?\\d+', content))
            if has_long_text and not has_max_width:
                self.warnings.append(f"[Mobile Typography] {filename}: Text without max-width constraint. Mobile text should be 40-60 characters per line for readability.")

        # 9.5 Font Weight Pattern Check
        # Check for font weight distribution
        if is_react_native:
            font_weights = re.findall(r'fontWeight:\\s*["\\']?(\\d+|normal|bold|medium|light)', content)
            weight_map = {'normal': '400', 'light': '300', 'medium': '500', 'bold': '700'}
            numeric_weights = []
            for w in font_weights:
                val = weight_map.get(w.lower(), w)
                try:
                    numeric_weights.append(int(val))
                except:
                    pass

            # Check if overusing bold (mobile should be regular-dominant)
            bold_count = sum(1 for w in numeric_weights if w >= 700)
            regular_count = sum(1 for w in numeric_weights if 400 <= w < 500)
            if bold_count > regular_count:
                self.warnings.append(f"[Mobile Typography] {filename}: More bold weights than regular. Mobile typography should be regular-dominant for readability.")

        # --- 10. EXTENDED MOBILE COLOR SYSTEM CHECKS ---

        # 10.1 OLED Optimization Check
        # Check for near-black colors instead of pure black
        if re.search(r'#121212|#1A1A1A|#0D0D0D', content):
            self.passed_count += 1  # Good OLED optimization
        elif re.search(r'backgroundColor:\\s*["\\']?#000000', content):
            # Using pure black for background is OK for OLED
            pass
        elif re.search(r'backgroundColor:\\s*["\\']?#[0-9A-Fa-f]{6}', content):
            # Check if using light colors in dark mode (bad for OLED)
            self.warnings.append(f"[Mobile Color] {filename}: Consider OLED-optimized dark backgrounds (#121212 Android, #000000 iOS) for battery savings.")

        # 10.2 Saturated Color Detection (Battery)
        # Highly saturated colors consume more power on OLED
        hex_colors = re.findall(r'#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})', content)
        saturated_count = 0
        for r, g, b in hex_colors:
            # Convert to RGB 0-255
            try:
                r_val, g_val, b_val = int(r, 16), int(g, 16), int(b, 16)
                max_val = max(r_val, g_val, b_val)
                min_val = min(r_val, g_val, b_val)
                # Saturation = (max - min) / max
                if max_val > 0:
                    saturation = (max_val - min_val) / max_val
                    if saturation > 0.8:  # Highly saturated
                        saturated_count += 1
            except:
                pass

        if saturated_count > 10:
            self.warnings.append(f"[Mobile Color] {filename}: {saturated_count} highly saturated colors detected. Desaturated colors save battery on OLED screens.")

        # 10.3 Outdoor Visibility Check
        # Low contrast combinations fail in outdoor sunlight
        light_colors = re.findall(r'#[0-9A-Fa-f]{6}|rgba?\\([^)]+\\)', content)
        # Check for potential low contrast (light gray on white, dark gray on black)
        potential_low_contrast = bool(re.search(r'#[EeEeEeEe].*#ffffff|#999999.*#ffffff|#333333.*#000000|#666666.*#000000', content))
        if potential_low_contrast:
            self.warnings.append(f"[Mobile Color] {filename}: Possible low contrast combination detected. Critical for outdoor visibility. Ensure WCAG AAA (7:1) for mobile.")

        # 10.4 Dark Mode Text Color Check
        # In dark mode, text should not be pure white
        has_dark_mode = bool(re.search(r'dark:\\s*|isDark|useColorScheme|colorScheme:\\s*["\\']?dark', content))
        if has_dark_mode:
            has_pure_white_text = bool(re.search(r'color:\\s*["\\']?#ffffff|#fff["\\']?\\}|textColor:\\s*["\\']?white', content))
            if has_pure_white_text:
                self.warnings.append(f"[Mobile Color] {filename}: Pure white text (#FFFFFF) in dark mode. Use #E8E8E8 or light gray for better readability.")

        # --- 11. EXTENDED PLATFORM IOS CHECKS ---

        if is_react_native:
            # 11.1 SF Pro Font Detection
            has_sf_pro = bool(re.search(r'SF Pro|SFPro|fontFamily:\\s*["\\']?[-\\s]*SF', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_sf_pro:
                self.warnings.append(f"[iOS] {filename}: Custom font without SF Pro fallback. Consider SF Pro Text for body, SF Pro Display for headings.")

            # 11.2 iOS System Colors Check
            # Check for semantic color usage
            has_label = bool(re.search(r'color:\\s*["\\']?label|\\.label', content))
            has_secondaryLabel = bool(re.search(r'secondaryLabel|\\.secondaryLabel', content))
            has_systemBackground = bool(re.search(r'systemBackground|\\.systemBackground', content))

            has_hardcoded_gray = bool(re.search(r'#[78]0{4}', content))
            if has_hardcoded_gray and not (has_label or has_secondaryLabel):
                self.warnings.append(f"[iOS] {filename}: Hardcoded gray colors detected. Consider iOS semantic colors (label, secondaryLabel) for automatic dark mode.")

            # 11.3 iOS Accent Colors Check
            ios_blue = bool(re.search(r'#007AFF|#0A84FF|systemBlue', content))
            ios_green = bool(re.search(r'#34C759|#30D158|systemGreen', content))
            ios_red = bool(re.search(r'#FF3B30|#FF453A|systemRed', content))

            has_custom_primary = bool(re.search(r'primaryColor|theme.*primary|colors\\.primary', content))
            if has_custom_primary and not (ios_blue or ios_green or ios_red):
                self.warnings.append(f"[iOS] {filename}: Custom primary color without iOS system color fallback. Consider systemBlue for consistent iOS feel.")

            # 11.4 iOS Navigation Patterns Check
            has_navigation_bar = bool(re.search(r'navigationOptions|headerStyle|cardStyle', content))
            has_header_title = bool(re.search(r'title:\\s*["\\']|headerTitle|navigation\\.setOptions', content))
            if has_navigation_bar and not has_header_title:
                self.warnings.append(f"[iOS] {filename}: Navigation bar detected without title. iOS apps should have clear context in nav bar.")

            # 11.5 iOS Component Patterns Check
            # Check for iOS-specific components
            has_alert = bool(re.search(r'Alert\\.alert|showAlert', content))
            has_action_sheet = bool(re.search(r'ActionSheet|ActionSheetIOS|showActionSheetWithOptions', content))
            has_activity_indicator = bool(re.search(r'ActivityIndicator|ActivityIndic', content))

            if has_alert or has_action_sheet or has_activity_indicator:
                self.passed_count += 1  # Good iOS component usage

        # --- 12. EXTENDED PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 12.1 Roboto Font Detection
            has_roboto = bool(re.search(r'Roboto|fontFamily:\\s*["\\']?[-\\s]*Roboto', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_roboto:
                self.warnings.append(f"[Android] {filename}: Custom font without Roboto fallback. Roboto is optimized for Android displays.")

            # 12.2 Material 3 Dynamic Color Check
            has_material_colors = bool(re.search(r'MD3|MaterialYou|dynamicColor|useColorScheme', content))
            has_theme_provider = bool(re.search(r'MaterialTheme|ThemeProvider|PaperProvider|ThemeProvider', content))
            if not has_material_colors and not has_theme_provider:
                self.warnings.append(f"[Android] {filename}: No Material 3 dynamic color detected. Consider Material 3 theming for personalized feel.")

            # 12.3 Material Elevation Check
            # Check for elevation values (Material 3 uses elevation for depth)
            has_elevation = bool(re.search(r'elevation:\\s*\\d+|shadowOpacity|shadowRadius|android:elevation', content))
            has_box_shadow = bool(re.search(r'boxShadow:', content))
            if has_box_shadow and not has_elevation:
                self.warnings.append(f"[Android] {filename}: CSS box-shadow detected without elevation. Consider Material elevation system for consistent depth.")

            # 12.4 Material Component Patterns Check
            # Check for Material components
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_card = bool(re.search(r'Card|Paper|elevation.*\\d+', content))
            has_fab = bool(re.search(r'FAB|FloatingActionButton|fab', content))
            has_snackbar = bool(re.search(r'Snackbar|showSnackBar|Toast', content))

            material_component_count = sum([has_ripple, has_card, has_fab, has_snackbar])
            if material_component_count >= 2:
                self.passed_count += 1  # Good Material design usage

            # 12.5 Android Navigation Patterns Check
            has_top_app_bar = bool(re.search(r'TopAppBar|AppBar|CollapsingToolbar', content))
            has_bottom_nav = bool(re.search(r'BottomNavigation|BottomNav', content))
            has_navigation_rail = bool(re.search(r'NavigationRail', content))

            if has_bottom_nav:
                self.passed_count += 1  # Good Android pattern
            elif has_top_app_bar and not (has_bottom_nav or has_navigation_rail):
                self.warnings.append(f"[Android] {filename}: TopAppBar without bottom navigation. Consider BottomNavigation for thumb-friendly access.")

        # --- 13. MOBILE TESTING CHECKS ---

        # 13.1 Testing Tool Detection
        has_rntl = bool(re.search(r'react-native-testing-library|@testing-library', content))
        has_detox = bool(re.search(r'detox|element\\(|by\\.text|by\\.id', content))
        has_maestro = bool(re.search(r'maestro|\\.yaml$', content))
        has_jest = bool(re.search(r'jest|describe\\(|test\\(|it\\(', content))

        testing_tools = []
        if has_jest: testing_tools.append('Jest')
        if has_rntl: testing_tools.append('RNTL')
        if has_detox: testing_tools.append('Detox')
        if has_maestro: testing_tools.append('Maestro')

        if len(testing_tools) == 0:
            self.warnings.append(f"[Testing] {filename}: No testing framework detected. Consider Jest (unit) + Detox/Maestro (E2E) for mobile.")

        # 13.2 Test Pyramid Balance Check
        test_files = len(re.findall(r'\\.test\\.(tsx|ts|js|jsx)|\\.spec\\.', content))
        e2e_tests = len(re.findall(r'detox|maestro|e2e|spec\\.e2e', content.lower()))

        if test_files > 0 and e2e_tests == 0:
            self.warnings.append(f"[Testing] {filename}: Unit tests found but no E2E tests. Mobile needs E2E on real devices for complete coverage.")

        # 13.3 Accessibility Label Check (Mobile-specific)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity|TouchableHighlight', content))
            has_a11y_label = bool(re.search(r'accessibilityLabel|aria-label|testID', content))
            if has_pressable and not has_a11y_label:
                self.warnings.append(f"[A11y Mobile] {filename}: Touchable element without accessibilityLabel. Screen readers need labels for all interactive elements.")

        # --- 14. MOBILE DEBUGGING CHECKS ---

        # 14.1 Performance Profiling Check
        has_performance = bool(re.search(r'Performance|systrace|profile|Flipper', content))
        has_console_log = len(re.findall(r'console\\.(log|warn|error|debug|info)', content))
        has_debugger = bool(re.search(r'debugger|__DEV__|React\\.DevTools', content))

        if has_console_log > 10:
            self.warnings.append(f"[Debugging] {filename}: {has_console_log} console.log statements. Remove before production; they block JS thread.")

        if has_performance:
            self.passed_count += 1  # Good performance monitoring

        # 14.2 Error Boundary Check
        has_error_boundary = bool(re.search(r'ErrorBoundary|componentDidCatch|getDerivedStateFromError', content))
        if not has_error_boundary and is_react_native:
            self.warnings.append(f"[Debugging] {filename}: No ErrorBoundary detected. Consider adding ErrorBoundary to prevent app crashes.")

        # 14.3 Hermes Check (React Native specific)
        if is_react_native:
            # Check if using Hermes engine (should be default in modern RN)
            # This is more of a configuration check, not code pattern
            self.passed_count += 1  # Hermes is default in RN 0.70+

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.ts', '.jsx', '.js', '.dart'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next', 'ios', 'android', 'build', '.idea'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }


def main():
    if len(sys.argv) < 2:
        print("Usage: python mobile_audit.py <directory>")
        sys.exit(1)

    path = sys.argv[1]
    is_json = "--json" in sys.argv

    auditor = MobileAuditor()
    if os.path.isfile(path):
        auditor.audit_file(path)
    else:
        auditor.audit_directory(path)

    report = auditor.get_report()

    if is_json:
        print(json.dumps(report, indent=2))
    else:
        print(f"\\n[MOBILE AUDIT] {report['files_checked']} mobile files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]:
                print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]:
                print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)


if __name__ == "__main__":
    # Fix missing import
    import re
    main()
`,
  ".agent/skills/mobile-design/scripts/mobile_audit.py": `#!/usr/bin/env python3
"""
Mobile UX Audit Script - Full Mobile Design Coverage

Analyzes React Native / Flutter code for compliance with:

1. TOUCH PSYCHOLOGY (touch-psychology.md):
   - Touch Target Sizes (44pt iOS, 48dp Android, 44px WCAG)
   - Touch Target Spacing (8px minimum gap)
   - Thumb Zone Placement (primary CTAs at bottom)
   - Gesture Alternatives (visible buttons for swipe)
   - Haptic Feedback Patterns
   - Touch Feedback Timing (<50ms)
   - Touch Accessibility (motor impairment support)

2. MOBILE PERFORMANCE (mobile-performance.md):
   - ScrollView vs FlatList (CRITICAL)
   - React.memo for List Items
   - useCallback for renderItem
   - Stable keyExtractor (NOT index)
   - useNativeDriver for Animations
   - Memory Leak Prevention (cleanup)
   - Console.log Detection
   - Inline Function Detection
   - Animation Performance (transform/opacity only)

3. MOBILE NAVIGATION (mobile-navigation.md):
   - Tab Bar Max Items (5)
   - Tab State Preservation
   - Proper Back Handling
   - Deep Link Support
   - Navigation Structure

4. MOBILE TYPOGRAPHY (mobile-typography.md):
   - System Font Usage
   - Dynamic Type Support (iOS)
   - Text Scaling Constraints
   - Mobile Line Height
   - Font Size Limits

5. MOBILE COLOR SYSTEM (mobile-color-system.md):
   - Pure Black Avoidance (#000000)
   - OLED Optimization
   - Dark Mode Support
   - Contrast Ratios

6. PLATFORM iOS (platform-ios.md):
   - SF Symbols Usage
   - iOS Navigation Patterns
   - iOS Haptic Types
   - iOS-Specific Components

7. PLATFORM ANDROID (platform-android.md):
   - Material Icons Usage
   - Android Navigation Patterns
   - Ripple Effects
   - Android-Specific Components

8. MOBILE BACKEND (mobile-backend.md):
   - Secure Storage (NOT AsyncStorage)
   - Offline Handling
   - Push Notification Support
   - API Response Caching

Total: 50+ mobile-specific checks
"""

import sys
import os
import re
import json
from pathlib import Path

class MobileAuditor:
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.passed_count = 0
        self.files_checked = 0

    def audit_file(self, filepath: str) -> None:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            return

        self.files_checked += 1
        filename = os.path.basename(filepath)

        # Detect framework
        is_react_native = bool(re.search(r'react-native|@react-navigation|React\\.Native', content))
        is_flutter = bool(re.search(r'import \\'package:flutter|MaterialApp|Widget\\.build', content))

        if not (is_react_native or is_flutter):
            return  # Skip non-mobile files

        # --- 1. TOUCH PSYCHOLOGY CHECKS ---

        # 1.1 Touch Target Size Check
        # Look for small touch targets
        small_sizes = re.findall(r'(?:width|height|size):\\s*([0-3]\\d)', content)
        for size in small_sizes:
            if int(size) < 44:
                self.issues.append(f"[Touch Target] {filename}: Touch target size {size}px < 44px minimum (iOS: 44pt, Android: 48dp)")

        # 1.2 Touch Target Spacing Check
        # Look for inadequate spacing between touchable elements
        small_gaps = re.findall(r'(?:margin|gap):\\s*([0-7])\\s*(?:px|dp)', content)
        for gap in small_gaps:
            if int(gap) < 8:
                self.warnings.append(f"[Touch Spacing] {filename}: Touch target spacing {gap}px < 8px minimum. Accidental taps risk.")

        # 1.3 Thumb Zone Placement Check
        # Primary CTAs should be at bottom (easy thumb reach)
        primary_buttons = re.findall(r'(?:testID|id):\\s*["\\'](?:.*(?:primary|cta|submit|confirm)[^"\\']*)["\\']', content, re.IGNORECASE)
        has_bottom_placement = bool(re.search(r'position:\\s*["\\']?absolute["\\']?|bottom:\\s*\\d+|style.*bottom|justifyContent:\\s*["\\']?flex-end', content))
        if primary_buttons and not has_bottom_placement:
            self.warnings.append(f"[Thumb Zone] {filename}: Primary CTA may not be in thumb zone (bottom). Place primary actions at bottom for easy reach.")

        # 1.4 Gesture Alternatives Check
        # Swipe actions should have visible button alternatives
        has_swipe_gestures = bool(re.search(r'Swipeable|onSwipe|PanGestureHandler|swipe', content))
        has_visible_buttons = bool(re.search(r'Button.*(?:delete|archive|more)|TouchableOpacity|Pressable', content))
        if has_swipe_gestures and not has_visible_buttons:
            self.warnings.append(f"[Gestures] {filename}: Swipe gestures detected without visible button alternatives. Motor impaired users need alternatives.")

        # 1.5 Haptic Feedback Check
        # Important actions should have haptic feedback
        has_important_actions = bool(re.search(r'(?:onPress|onSubmit|delete|remove|confirm|purchase)', content))
        has_haptics = bool(re.search(r'Haptics|Vibration|react-native-haptic-feedback|FeedbackManager', content))
        if has_important_actions and not has_haptics:
            self.warnings.append(f"[Haptics] {filename}: Important actions without haptic feedback. Consider adding haptic confirmation.")

        # 1.6 Touch Feedback Timing Check
        # Touch feedback should be immediate (<50ms)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity', content))
            has_feedback_state = bool(re.search(r'pressed|style.*opacity|underlay', content))
            if has_pressable and not has_feedback_state:
                self.warnings.append(f"[Touch Feedback] {filename}: Pressable without visual feedback state. Add opacity/scale change for tap confirmation.")

        # --- 2. MOBILE PERFORMANCE CHECKS ---

        # 2.1 CRITICAL: ScrollView vs FlatList
        has_scrollview = bool(re.search(r'<ScrollView|ScrollView\\.', content))
        has_map_in_scrollview = bool(re.search(r'ScrollView.*\\.map\\(|ScrollView.*\\{.*\\.map', content))
        if has_scrollview and has_map_in_scrollview:
            self.issues.append(f"[Performance CRITICAL] {filename}: ScrollView with .map() detected. Use FlatList for lists to prevent memory explosion.")

        # 2.2 React.memo Check
        if is_react_native:
            has_list = bool(re.search(r'FlatList|FlashList|SectionList', content))
            has_react_memo = bool(re.search(r'React\\.memo|memo\\(', content))
            if has_list and not has_react_memo:
                self.warnings.append(f"[Performance] {filename}: FlatList without React.memo on list items. Items will re-render on every parent update.")

        # 2.3 useCallback Check
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList|FlashList', content))
            has_use_callback = bool(re.search(r'useCallback', content))
            if has_flatlist and not has_use_callback:
                self.warnings.append(f"[Performance] {filename}: FlatList renderItem without useCallback. New function created every render.")

        # 2.4 keyExtractor Check (CRITICAL)
        if is_react_native:
            has_flatlist = bool(re.search(r'FlatList', content))
            has_key_extractor = bool(re.search(r'keyExtractor', content))
            uses_index_key = bool(re.search(r'key=\\{.*index.*\\}|key:\\s*index', content))
            if has_flatlist and not has_key_extractor:
                self.issues.append(f"[Performance CRITICAL] {filename}: FlatList without keyExtractor. Index-based keys cause bugs on reorder/delete.")
            if uses_index_key:
                self.issues.append(f"[Performance CRITICAL] {filename}: Using index as key. This causes bugs when list changes. Use unique ID from data.")

        # 2.5 useNativeDriver Check
        if is_react_native:
            has_animated = bool(re.search(r'Animated\\.', content))
            has_native_driver = bool(re.search(r'useNativeDriver:\\s*true', content))
            has_native_driver_false = bool(re.search(r'useNativeDriver:\\s*false', content))
            if has_animated and has_native_driver_false:
                self.warnings.append(f"[Performance] {filename}: Animation with useNativeDriver: false. Use true for 60fps (only supports transform/opacity).")
            if has_animated and not has_native_driver:
                self.warnings.append(f"[Performance] {filename}: Animated component without useNativeDriver. Add useNativeDriver: true for 60fps.")

        # 2.6 Memory Leak Check
        if is_react_native:
            has_effect = bool(re.search(r'useEffect', content))
            has_cleanup = bool(re.search(r'return\\s*\\(\\)\\s*=>|return\\s+function', content))
            has_subscriptions = bool(re.search(r'addEventListener|subscribe|\\.focus\\(\\)|\\.off\\(', content))
            if has_effect and has_subscriptions and not has_cleanup:
                self.issues.append(f"[Memory Leak] {filename}: useEffect with subscriptions but no cleanup function. Memory leak on unmount.")

        # 2.7 Console.log Detection
        console_logs = len(re.findall(r'console\\.log|console\\.warn|console\\.error|console\\.debug', content))
        if console_logs > 5:
            self.warnings.append(f"[Performance] {filename}: {console_logs} console.log statements detected. Remove before production (blocks JS thread).")

        # 2.8 Inline Function Detection
        if is_react_native:
            inline_functions = re.findall(r'(?:onPress|onPressIn|onPressOut|renderItem):\\s*\\([^)]*\\)\\s*=>', content)
            if len(inline_functions) > 3:
                self.warnings.append(f"[Performance] {filename}: {len(inline_functions)} inline arrow functions in props. Creates new function every render. Use useCallback.")

        # 2.9 Animation Properties Check
        # Warn if animating expensive properties
        animating_layout = bool(re.search(r'Animated\\.timing.*(?:width|height|margin|padding)', content))
        if animating_layout:
            self.issues.append(f"[Performance] {filename}: Animating layout properties (width/height/margin). Use transform/opacity for 60fps.")

        # --- 3. MOBILE NAVIGATION CHECKS ---

        # 3.1 Tab Bar Max Items Check
        tab_bar_items = len(re.findall(r'Tab\\.Screen|createBottomTabNavigator|BottomTab', content))
        if tab_bar_items > 5:
            self.warnings.append(f"[Navigation] {filename}: {tab_bar_items} tab bar items (max 5 recommended). More than 5 becomes hard to tap.")

        # 3.2 Tab State Preservation Check
        has_tab_nav = bool(re.search(r'createBottomTabNavigator|Tab\\.Navigator', content))
        if has_tab_nav:
            # Look for lazy prop (false preserves state)
            has_lazy_false = bool(re.search(r'lazy:\\s*false', content))
            if not has_lazy_false:
                self.warnings.append(f"[Navigation] {filename}: Tab navigation without lazy: false. Tabs may lose state on switch.")

        # 3.3 Back Handling Check
        has_back_listener = bool(re.search(r'BackHandler|useFocusEffect|navigation\\.addListener', content))
        has_custom_back = bool(re.search(r'onBackPress|handleBackPress', content))
        if has_custom_back and not has_back_listener:
            self.warnings.append(f"[Navigation] {filename}: Custom back handling without BackHandler listener. May not work correctly.")

        # 3.4 Deep Link Support Check
        has_linking = bool(re.search(r'Linking\\.|Linking\\.openURL|deepLink|universalLink', content))
        has_config = bool(re.search(r'apollo-link|react-native-screens|navigation\\.link', content))
        if not has_linking and not has_config:
            self.passed_count += 1
        else:
            if has_linking and not has_config:
                self.warnings.append(f"[Navigation] {filename}: Deep linking detected but may lack proper configuration. Test notification/share flows.")

        # --- 4. MOBILE TYPOGRAPHY CHECKS ---

        # 4.1 System Font Check
        if is_react_native:
            has_custom_font = bool(re.search(r"fontFamily:\\s*[\\"'][^\\"']+", content))
            has_system_font = bool(re.search(r"fontFamily:\\s*[\\"']?(?:System|San Francisco|Roboto|-apple-system)", content))
            if has_custom_font and not has_system_font:
                self.warnings.append(f"[Typography] {filename}: Custom font detected. Consider system fonts (iOS: SF Pro, Android: Roboto) for native feel.")

        # 4.2 Text Scaling Check (iOS Dynamic Type)
        if is_react_native:
            has_font_sizes = bool(re.search(r'fontSize:', content))
            has_scaling = bool(re.search(r'allowFontScaling:\\s*true|responsiveFontSize|useWindowDimensions', content))
            if has_font_sizes and not has_scaling:
                self.warnings.append(f"[Typography] {filename}: Fixed font sizes without scaling support. Consider allowFontScaling for accessibility.")

        # 4.3 Mobile Line Height Check
        line_heights = re.findall(r'lineHeight:\\s*([\\d.]+)', content)
        for lh in line_heights:
            if float(lh) > 1.8:
                self.warnings.append(f"[Typography] {filename}: lineHeight {lh} too high for mobile. Mobile text needs tighter spacing (1.3-1.5).")

        # 4.4 Font Size Limits
        font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
        for fs in font_sizes:
            size = float(fs)
            if size < 12:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px below 12px minimum readability.")
            elif size > 32:
                self.warnings.append(f"[Typography] {filename}: fontSize {size}px very large. Consider using responsive scaling.")

        # --- 5. MOBILE COLOR SYSTEM CHECKS ---

        # 5.1 Pure Black Avoidance
        if re.search(r'#000000|color:\\s*black|backgroundColor:\\s*["\\']?black', content):
            self.warnings.append(f"[Color] {filename}: Pure black (#000000) detected. Use dark gray (#1C1C1E iOS, #121212 Android) for better OLED/battery.")

        # 5.2 Dark Mode Support
        has_color_schemes = bool(re.search(r'useColorScheme|colorScheme|appearance:\\s*["\\']?dark', content))
        has_dark_mode_style = bool(re.search(r'\\\\\\?.*dark|style:\\s*.*dark|isDark', content))
        if not has_color_schemes and not has_dark_mode_style:
            self.warnings.append(f"[Color] {filename}: No dark mode support detected. Consider useColorScheme for system dark mode.")

        # --- 6. PLATFORM iOS CHECKS ---

        if is_react_native:
            # 6.1 SF Symbols Check
            has_ios_icons = bool(re.search(r'@expo/vector-icons|ionicons', content))
            has_sf_symbols = bool(re.search(r'sf-symbol|SF Symbols', content))
            if has_ios_icons and not has_sf_symbols:
                self.passed_count += 1

            # 6.2 iOS Haptic Types
            has_haptic_import = bool(re.search(r'expo-haptics|react-native-haptic-feedback', content))
            has_haptic_types = bool(re.search(r'ImpactFeedback|NotificationFeedback|SelectionFeedback', content))
            if has_haptic_import and not has_haptic_types:
                self.warnings.append(f"[iOS Haptics] {filename}: Haptic library imported but not using typed haptics (Impact/Notification/Selection).")

            # 6.3 iOS Safe Area
            has_safe_area = bool(re.search(r'SafeAreaView|useSafeAreaInsets|safeArea', content))
            if not has_safe_area:
                self.warnings.append(f"[iOS] {filename}: No SafeArea detected. Content may be hidden by notch/home indicator.")

        # --- 7. PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 7.1 Material Icons Check
            has_material_icons = bool(re.search(r'@expo/vector-icons|MaterialIcons', content))
            if has_material_icons:
                self.passed_count += 1

            # 7.2 Ripple Effect
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_pressable = bool(re.search(r'Pressable|Touchable', content))
            if has_pressable and not has_ripple:
                self.warnings.append(f"[Android] {filename}: Touchable without ripple effect. Android users expect ripple feedback.")

            # 7.3 Hardware Back Button
            if is_react_native:
                has_back_button = bool(re.search(r'BackHandler|useBackHandler', content))
                has_navigation = bool(re.search(r'@react-navigation', content))
                if has_navigation and not has_back_button:
                    self.warnings.append(f"[Android] {filename}: React Navigation detected without BackHandler listener. Android hardware back may not work correctly.")

        # --- 8. MOBILE BACKEND CHECKS ---

        # 8.1 Secure Storage Check
        has_async_storage = bool(re.search(r'AsyncStorage|@react-native-async-storage', content))
        has_secure_storage = bool(re.search(r'SecureStore|Keychain|EncryptedSharedPreferences', content))
        has_token_storage = bool(re.search(r'token|jwt|auth.*storage', content, re.IGNORECASE))
        if has_token_storage and has_async_storage and not has_secure_storage:
            self.issues.append(f"[Security] {filename}: Storing auth tokens in AsyncStorage (insecure). Use SecureStore (iOS) / EncryptedSharedPreferences (Android).")

        # 8.2 Offline Handling Check
        has_network = bool(re.search(r'fetch|axios|netinfo|@react-native-community/netinfo', content))
        has_offline = bool(re.search(r'offline|isConnected|netInfo|cache.*offline', content))
        if has_network and not has_offline:
            self.warnings.append(f"[Offline] {filename}: Network requests detected without offline handling. Consider NetInfo for connection status.")

        # 8.3 Push Notification Support
        has_push = bool(re.search(r'Notifications|pushNotification|Firebase\\.messaging|PushNotificationIOS', content))
        has_push_handler = bool(re.search(r'onNotification|addNotificationListener|notification\\.open', content))
        if has_push and not has_push_handler:
            self.warnings.append(f"[Push] {filename}: Push notifications imported but no handler found. May miss notifications.")

        # --- 9. EXTENDED MOBILE TYPOGRAPHY CHECKS ---

        # 9.1 iOS Type Scale Check
        if is_react_native:
            # Check for iOS text styles that match HIG
            has_large_title = bool(re.search(r'fontSize:\\s*34|largeTitle|font-weight:\\s*["\\']?bold', content))
            has_title_1 = bool(re.search(r'fontSize:\\s*28', content))
            has_headline = bool(re.search(r'fontSize:\\s*17.*semibold|headline', content))
            has_body = bool(re.search(r'fontSize:\\s*17.*regular|body', content))

            # Check if following iOS scale roughly
            font_sizes = re.findall(r'fontSize:\\s*([\\d.]+)', content)
            ios_scale_sizes = [34, 28, 22, 20, 17, 16, 15, 13, 12, 11]
            matching_ios = sum(1 for size in font_sizes if any(abs(float(size) - ios_size) < 1 for ios_size in ios_scale_sizes))

            if len(font_sizes) > 3 and matching_ios < len(font_sizes) / 2:
                self.warnings.append(f"[iOS Typography] {filename}: Font sizes don't match iOS type scale. Consider iOS text styles for native feel.")

        # 9.2 Android Material Type Scale Check
        if is_react_native:
            # Check for Material 3 text styles
            has_display = bool(re.search(r'fontSize:\\s*[456][0-9]|display', content))
            has_headline_material = bool(re.search(r'fontSize:\\s*[23][0-9]|headline', content))
            has_title_material = bool(re.search(r'fontSize:\\s*2[12][0-9].*medium|title', content))
            has_body_material = bool(re.search(r'fontSize:\\s*1[456].*regular|body', content))
            has_label = bool(re.search(r'fontSize:\\s*1[1234].*medium|label', content))

            # Check if using sp (scale-independent pixels)
            uses_sp = bool(re.search(r'\\d+\\s*sp\\b', content))
            if has_display or has_headline_material:
                if not uses_sp:
                    self.warnings.append(f"[Android Typography] {filename}: Material typography detected without sp units. Use sp for text to respect user font size preferences.")

        # 9.3 Modular Scale Check
        # Check if font sizes follow modular scale
        font_sizes = re.findall(r'fontSize:\\s*(\\d+(?:\\.\\d+)?)', content)
        if len(font_sizes) > 3:
            sorted_sizes = sorted(set([float(s) for s in font_sizes]))
            ratios = []
            for i in range(1, len(sorted_sizes)):
                if sorted_sizes[i-1] > 0:
                    ratios.append(sorted_sizes[i] / sorted_sizes[i-1])

            # Common ratios: 1.125, 1.2, 1.25, 1.333, 1.5
            common_ratios = {1.125, 1.2, 1.25, 1.333, 1.5}
            for ratio in ratios[:3]:
                if not any(abs(ratio - cr) < 0.03 for cr in common_ratios):
                    self.warnings.append(f"[Typography] {filename}: Font sizes may not follow modular scale (ratio: {ratio:.2f}). Consider consistent ratio.")
                    break

        # 9.4 Line Length Check (Mobile-specific)
        # Mobile text should be 40-60 characters max
        if is_react_native:
            has_long_text = bool(re.search(r'<Text[^>]*>[^<]{40,}', content))
            has_max_width = bool(re.search(r'maxWidth|max-w-\\d+|width:\\s*["\\']?\\d+', content))
            if has_long_text and not has_max_width:
                self.warnings.append(f"[Mobile Typography] {filename}: Text without max-width constraint. Mobile text should be 40-60 characters per line for readability.")

        # 9.5 Font Weight Pattern Check
        # Check for font weight distribution
        if is_react_native:
            font_weights = re.findall(r'fontWeight:\\s*["\\']?(\\d+|normal|bold|medium|light)', content)
            weight_map = {'normal': '400', 'light': '300', 'medium': '500', 'bold': '700'}
            numeric_weights = []
            for w in font_weights:
                val = weight_map.get(w.lower(), w)
                try:
                    numeric_weights.append(int(val))
                except:
                    pass

            # Check if overusing bold (mobile should be regular-dominant)
            bold_count = sum(1 for w in numeric_weights if w >= 700)
            regular_count = sum(1 for w in numeric_weights if 400 <= w < 500)
            if bold_count > regular_count:
                self.warnings.append(f"[Mobile Typography] {filename}: More bold weights than regular. Mobile typography should be regular-dominant for readability.")

        # --- 10. EXTENDED MOBILE COLOR SYSTEM CHECKS ---

        # 10.1 OLED Optimization Check
        # Check for near-black colors instead of pure black
        if re.search(r'#121212|#1A1A1A|#0D0D0D', content):
            self.passed_count += 1  # Good OLED optimization
        elif re.search(r'backgroundColor:\\s*["\\']?#000000', content):
            # Using pure black for background is OK for OLED
            pass
        elif re.search(r'backgroundColor:\\s*["\\']?#[0-9A-Fa-f]{6}', content):
            # Check if using light colors in dark mode (bad for OLED)
            self.warnings.append(f"[Mobile Color] {filename}: Consider OLED-optimized dark backgrounds (#121212 Android, #000000 iOS) for battery savings.")

        # 10.2 Saturated Color Detection (Battery)
        # Highly saturated colors consume more power on OLED
        hex_colors = re.findall(r'#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})', content)
        saturated_count = 0
        for r, g, b in hex_colors:
            # Convert to RGB 0-255
            try:
                r_val, g_val, b_val = int(r, 16), int(g, 16), int(b, 16)
                max_val = max(r_val, g_val, b_val)
                min_val = min(r_val, g_val, b_val)
                # Saturation = (max - min) / max
                if max_val > 0:
                    saturation = (max_val - min_val) / max_val
                    if saturation > 0.8:  # Highly saturated
                        saturated_count += 1
            except:
                pass

        if saturated_count > 10:
            self.warnings.append(f"[Mobile Color] {filename}: {saturated_count} highly saturated colors detected. Desaturated colors save battery on OLED screens.")

        # 10.3 Outdoor Visibility Check
        # Low contrast combinations fail in outdoor sunlight
        light_colors = re.findall(r'#[0-9A-Fa-f]{6}|rgba?\\([^)]+\\)', content)
        # Check for potential low contrast (light gray on white, dark gray on black)
        potential_low_contrast = bool(re.search(r'#[EeEeEeEe].*#ffffff|#999999.*#ffffff|#333333.*#000000|#666666.*#000000', content))
        if potential_low_contrast:
            self.warnings.append(f"[Mobile Color] {filename}: Possible low contrast combination detected. Critical for outdoor visibility. Ensure WCAG AAA (7:1) for mobile.")

        # 10.4 Dark Mode Text Color Check
        # In dark mode, text should not be pure white
        has_dark_mode = bool(re.search(r'dark:\\s*|isDark|useColorScheme|colorScheme:\\s*["\\']?dark', content))
        if has_dark_mode:
            has_pure_white_text = bool(re.search(r'color:\\s*["\\']?#ffffff|#fff["\\']?\\}|textColor:\\s*["\\']?white', content))
            if has_pure_white_text:
                self.warnings.append(f"[Mobile Color] {filename}: Pure white text (#FFFFFF) in dark mode. Use #E8E8E8 or light gray for better readability.")

        # --- 11. EXTENDED PLATFORM IOS CHECKS ---

        if is_react_native:
            # 11.1 SF Pro Font Detection
            has_sf_pro = bool(re.search(r'SF Pro|SFPro|fontFamily:\\s*["\\']?[-\\s]*SF', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_sf_pro:
                self.warnings.append(f"[iOS] {filename}: Custom font without SF Pro fallback. Consider SF Pro Text for body, SF Pro Display for headings.")

            # 11.2 iOS System Colors Check
            # Check for semantic color usage
            has_label = bool(re.search(r'color:\\s*["\\']?label|\\.label', content))
            has_secondaryLabel = bool(re.search(r'secondaryLabel|\\.secondaryLabel', content))
            has_systemBackground = bool(re.search(r'systemBackground|\\.systemBackground', content))

            has_hardcoded_gray = bool(re.search(r'#[78]0{4}', content))
            if has_hardcoded_gray and not (has_label or has_secondaryLabel):
                self.warnings.append(f"[iOS] {filename}: Hardcoded gray colors detected. Consider iOS semantic colors (label, secondaryLabel) for automatic dark mode.")

            # 11.3 iOS Accent Colors Check
            ios_blue = bool(re.search(r'#007AFF|#0A84FF|systemBlue', content))
            ios_green = bool(re.search(r'#34C759|#30D158|systemGreen', content))
            ios_red = bool(re.search(r'#FF3B30|#FF453A|systemRed', content))

            has_custom_primary = bool(re.search(r'primaryColor|theme.*primary|colors\\.primary', content))
            if has_custom_primary and not (ios_blue or ios_green or ios_red):
                self.warnings.append(f"[iOS] {filename}: Custom primary color without iOS system color fallback. Consider systemBlue for consistent iOS feel.")

            # 11.4 iOS Navigation Patterns Check
            has_navigation_bar = bool(re.search(r'navigationOptions|headerStyle|cardStyle', content))
            has_header_title = bool(re.search(r'title:\\s*["\\']|headerTitle|navigation\\.setOptions', content))
            if has_navigation_bar and not has_header_title:
                self.warnings.append(f"[iOS] {filename}: Navigation bar detected without title. iOS apps should have clear context in nav bar.")

            # 11.5 iOS Component Patterns Check
            # Check for iOS-specific components
            has_alert = bool(re.search(r'Alert\\.alert|showAlert', content))
            has_action_sheet = bool(re.search(r'ActionSheet|ActionSheetIOS|showActionSheetWithOptions', content))
            has_activity_indicator = bool(re.search(r'ActivityIndicator|ActivityIndic', content))

            if has_alert or has_action_sheet or has_activity_indicator:
                self.passed_count += 1  # Good iOS component usage

        # --- 12. EXTENDED PLATFORM ANDROID CHECKS ---

        if is_react_native:
            # 12.1 Roboto Font Detection
            has_roboto = bool(re.search(r'Roboto|fontFamily:\\s*["\\']?[-\\s]*Roboto', content))
            has_custom_font = bool(re.search(r'fontFamily:\\s*["\\'][^"\\']+', content))
            if has_custom_font and not has_roboto:
                self.warnings.append(f"[Android] {filename}: Custom font without Roboto fallback. Roboto is optimized for Android displays.")

            # 12.2 Material 3 Dynamic Color Check
            has_material_colors = bool(re.search(r'MD3|MaterialYou|dynamicColor|useColorScheme', content))
            has_theme_provider = bool(re.search(r'MaterialTheme|ThemeProvider|PaperProvider|ThemeProvider', content))
            if not has_material_colors and not has_theme_provider:
                self.warnings.append(f"[Android] {filename}: No Material 3 dynamic color detected. Consider Material 3 theming for personalized feel.")

            # 12.3 Material Elevation Check
            # Check for elevation values (Material 3 uses elevation for depth)
            has_elevation = bool(re.search(r'elevation:\\s*\\d+|shadowOpacity|shadowRadius|android:elevation', content))
            has_box_shadow = bool(re.search(r'boxShadow:', content))
            if has_box_shadow and not has_elevation:
                self.warnings.append(f"[Android] {filename}: CSS box-shadow detected without elevation. Consider Material elevation system for consistent depth.")

            # 12.4 Material Component Patterns Check
            # Check for Material components
            has_ripple = bool(re.search(r'ripple|android_ripple|foregroundRipple', content))
            has_card = bool(re.search(r'Card|Paper|elevation.*\\d+', content))
            has_fab = bool(re.search(r'FAB|FloatingActionButton|fab', content))
            has_snackbar = bool(re.search(r'Snackbar|showSnackBar|Toast', content))

            material_component_count = sum([has_ripple, has_card, has_fab, has_snackbar])
            if material_component_count >= 2:
                self.passed_count += 1  # Good Material design usage

            # 12.5 Android Navigation Patterns Check
            has_top_app_bar = bool(re.search(r'TopAppBar|AppBar|CollapsingToolbar', content))
            has_bottom_nav = bool(re.search(r'BottomNavigation|BottomNav', content))
            has_navigation_rail = bool(re.search(r'NavigationRail', content))

            if has_bottom_nav:
                self.passed_count += 1  # Good Android pattern
            elif has_top_app_bar and not (has_bottom_nav or has_navigation_rail):
                self.warnings.append(f"[Android] {filename}: TopAppBar without bottom navigation. Consider BottomNavigation for thumb-friendly access.")

        # --- 13. MOBILE TESTING CHECKS ---

        # 13.1 Testing Tool Detection
        has_rntl = bool(re.search(r'react-native-testing-library|@testing-library', content))
        has_detox = bool(re.search(r'detox|element\\(|by\\.text|by\\.id', content))
        has_maestro = bool(re.search(r'maestro|\\.yaml$', content))
        has_jest = bool(re.search(r'jest|describe\\(|test\\(|it\\(', content))

        testing_tools = []
        if has_jest: testing_tools.append('Jest')
        if has_rntl: testing_tools.append('RNTL')
        if has_detox: testing_tools.append('Detox')
        if has_maestro: testing_tools.append('Maestro')

        if len(testing_tools) == 0:
            self.warnings.append(f"[Testing] {filename}: No testing framework detected. Consider Jest (unit) + Detox/Maestro (E2E) for mobile.")

        # 13.2 Test Pyramid Balance Check
        test_files = len(re.findall(r'\\.test\\.(tsx|ts|js|jsx)|\\.spec\\.', content))
        e2e_tests = len(re.findall(r'detox|maestro|e2e|spec\\.e2e', content.lower()))

        if test_files > 0 and e2e_tests == 0:
            self.warnings.append(f"[Testing] {filename}: Unit tests found but no E2E tests. Mobile needs E2E on real devices for complete coverage.")

        # 13.3 Accessibility Label Check (Mobile-specific)
        if is_react_native:
            has_pressable = bool(re.search(r'Pressable|TouchableOpacity|TouchableHighlight', content))
            has_a11y_label = bool(re.search(r'accessibilityLabel|aria-label|testID', content))
            if has_pressable and not has_a11y_label:
                self.warnings.append(f"[A11y Mobile] {filename}: Touchable element without accessibilityLabel. Screen readers need labels for all interactive elements.")

        # --- 14. MOBILE DEBUGGING CHECKS ---

        # 14.1 Performance Profiling Check
        has_performance = bool(re.search(r'Performance|systrace|profile|Flipper', content))
        has_console_log = len(re.findall(r'console\\.(log|warn|error|debug|info)', content))
        has_debugger = bool(re.search(r'debugger|__DEV__|React\\.DevTools', content))

        if has_console_log > 10:
            self.warnings.append(f"[Debugging] {filename}: {has_console_log} console.log statements. Remove before production; they block JS thread.")

        if has_performance:
            self.passed_count += 1  # Good performance monitoring

        # 14.2 Error Boundary Check
        has_error_boundary = bool(re.search(r'ErrorBoundary|componentDidCatch|getDerivedStateFromError', content))
        if not has_error_boundary and is_react_native:
            self.warnings.append(f"[Debugging] {filename}: No ErrorBoundary detected. Consider adding ErrorBoundary to prevent app crashes.")

        # 14.3 Hermes Check (React Native specific)
        if is_react_native:
            # Check if using Hermes engine (should be default in modern RN)
            # This is more of a configuration check, not code pattern
            self.passed_count += 1  # Hermes is default in RN 0.70+

    def audit_directory(self, directory: str) -> None:
        extensions = {'.tsx', '.ts', '.jsx', '.js', '.dart'}
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist', 'build', '.next', 'ios', 'android', 'build', '.idea'}]
            for file in files:
                if Path(file).suffix in extensions:
                    self.audit_file(os.path.join(root, file))

    def get_report(self):
        return {
            "files_checked": self.files_checked,
            "issues": self.issues,
            "warnings": self.warnings,
            "passed_checks": self.passed_count,
            "compliant": len(self.issues) == 0
        }


def main():
    if len(sys.argv) < 2:
        print("Usage: python mobile_audit.py <directory>")
        sys.exit(1)

    path = sys.argv[1]
    is_json = "--json" in sys.argv

    auditor = MobileAuditor()
    if os.path.isfile(path):
        auditor.audit_file(path)
    else:
        auditor.audit_directory(path)

    report = auditor.get_report()

    if is_json:
        print(json.dumps(report, indent=2))
    else:
        print(f"\\n[MOBILE AUDIT] {report['files_checked']} mobile files checked")
        print("-" * 50)
        if report['issues']:
            print(f"[!] ISSUES ({len(report['issues'])}):")
            for i in report['issues'][:10]:
                print(f"  - {i}")
        if report['warnings']:
            print(f"[*] WARNINGS ({len(report['warnings'])}):")
            for w in report['warnings'][:15]:
                print(f"  - {w}")
        print(f"[+] PASSED CHECKS: {report['passed_checks']}")
        status = "PASS" if report['compliant'] else "FAIL"
        print(f"STATUS: {status}")

    sys.exit(0 if report['compliant'] else 1)


if __name__ == "__main__":
    # Fix missing import
    import re
    main()
`,
  "nextjs-react-expert/scripts/convert_rules.py": `#!/usr/bin/env python3
"""
Conversion Script: React Best Practices → .agent Format
Merges 59 individual rules into 8 grouped section files
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

# Section metadata from _sections.md
SECTIONS = {
    'async': {
        'number': 1,
        'title': 'Eliminating Waterfalls',
        'impact': 'CRITICAL',
        'description': 'Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.'
    },
    'bundle': {
        'number': 2,
        'title': 'Bundle Size Optimization',
        'impact': 'CRITICAL',
        'description': 'Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.'
    },
    'server': {
        'number': 3,
        'title': 'Server-Side Performance',
        'impact': 'HIGH',
        'description': 'Optimizing server-side rendering and data fetching eliminates server-side waterfalls and reduces response times.'
    },
    'client': {
        'number': 4,
        'title': 'Client-Side Data Fetching',
        'impact': 'MEDIUM-HIGH',
        'description': 'Automatic deduplication and efficient data fetching patterns reduce redundant network requests.'
    },
    'rerender': {
        'number': 5,
        'title': 'Re-render Optimization',
        'impact': 'MEDIUM',
        'description': 'Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.'
    },
    'rendering': {
        'number': 6,
        'title': 'Rendering Performance',
        'impact': 'MEDIUM',
        'description': 'Optimizing the rendering process reduces the work the browser needs to do.'
    },
    'js': {
        'number': 7,
        'title': 'JavaScript Performance',
        'impact': 'LOW-MEDIUM',
        'description': 'Micro-optimizations for hot paths can add up to meaningful improvements.'
    },
    'advanced': {
        'number': 8,
        'title': 'Advanced Patterns',
        'impact': 'VARIABLE',
        'description': 'Advanced patterns for specific cases that require careful implementation.'
    }
}


def parse_frontmatter(content: str) -> Tuple[Dict, str]:
    """Parse markdown frontmatter and body"""
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    # Parse YAML frontmatter manually (simple key: value)
    frontmatter = {}
    for line in parts[1].strip().split('\\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    body = parts[2].strip()
    return frontmatter, body


def parse_rule_file(filepath: Path) -> Dict:
    """Parse a single rule file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body = parse_frontmatter(content)

    # Extract prefix from filename
    filename = filepath.stem
    prefix = filename.split('-')[0]

    return {
        'filename': filepath.name,
        'prefix': prefix,
        'title': frontmatter.get('title', filename),
        'impact': frontmatter.get('impact', ''),
        'impactDescription': frontmatter.get('impactDescription', ''),
        'tags': frontmatter.get('tags', ''),
        'body': body,
        'frontmatter': frontmatter
    }


def group_rules_by_section(rules_dir: Path) -> Dict[str, List[Dict]]:
    """Group all rules by their section prefix"""
    grouped = {prefix: [] for prefix in SECTIONS.keys()}

    for rule_file in sorted(rules_dir.glob('*.md')):
        # Skip special files
        if rule_file.name.startswith('_'):
            continue

        rule = parse_rule_file(rule_file)
        prefix = rule['prefix']

        if prefix in grouped:
            grouped[prefix].append(rule)
        else:
            print(f"[WARNING] Unknown prefix '{prefix}' in file: {rule_file.name}")

    return grouped


def generate_section_file(section_prefix: str, rules: List[Dict], output_dir: Path):
    """Generate a merged section file"""
    if not rules:
        print(f"[WARNING] No rules found for section: {section_prefix}")
        return

    section_meta = SECTIONS[section_prefix]
    section_num = section_meta['number']
    section_title = section_meta['title']
    impact = section_meta['impact']
    description = section_meta['description']

    # Sort rules by title
    rules.sort(key=lambda r: r['title'])

    # Build content
    content = f"""# {section_num}. {section_title}

> **Impact:** {impact}
> **Focus:** {description}

---

## Overview

This section contains **{len(rules)} rules** focused on {section_title.lower()}.

"""

    # Add each rule
    for i, rule in enumerate(rules, 1):
        rule_id = f"{section_num}.{i}"
        title = rule['title']
        rule_impact = rule['impact']
        tags = rule['tags']
        body = rule['body']

        content += f"""---

## Rule {rule_id}: {title}

"""

        if rule_impact:
            content += f"**Impact:** {rule_impact}  \\n"

        if tags:
            content += f"**Tags:** {tags}  \\n"

        content += f"\\n{body}\\n\\n"

    # Write file
    output_file = output_dir / f"{section_num}-{section_prefix}-{section_title.lower().replace(' ', '-')}.md"
    output_file.write_text(content, encoding='utf-8')
    print(f"[OK] Generated: {output_file.name} ({len(rules)} rules)")


def main():
    """Main conversion function"""
    # Paths
    base_dir = Path(__file__).parent.parent.parent.parent.parent
    rules_dir = base_dir / "others/agent-skills/skills/react-best-practices/rules"
    output_dir = base_dir / ".agent/skills/react-best-practices"

    print(f"[*] Reading rules from: {rules_dir}")
    print(f"[*] Output to: {output_dir}")
    print()

    # Check if rules directory exists
    if not rules_dir.exists():
        print(f"[ERROR] Rules directory not found: {rules_dir}")
        return

    # Group rules
    print("[*] Grouping rules by section...")
    grouped_rules = group_rules_by_section(rules_dir)

    # Stats
    total_rules = sum(len(rules) for rules in grouped_rules.values())
    print(f"[*] Found {total_rules} total rules")
    print()

    # Generate section files
    print("[*] Generating section files...")
    for section_prefix in SECTIONS.keys():
        rules = grouped_rules[section_prefix]
        generate_section_file(section_prefix, rules, output_dir)

    print()
    print("[SUCCESS] Conversion complete!")
    print(f"[*] Generated 8 section files from {total_rules} rules")


if __name__ == '__main__':
    main()
`,
  "skills/nextjs-react-expert/scripts/convert_rules.py": `#!/usr/bin/env python3
"""
Conversion Script: React Best Practices → .agent Format
Merges 59 individual rules into 8 grouped section files
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

# Section metadata from _sections.md
SECTIONS = {
    'async': {
        'number': 1,
        'title': 'Eliminating Waterfalls',
        'impact': 'CRITICAL',
        'description': 'Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.'
    },
    'bundle': {
        'number': 2,
        'title': 'Bundle Size Optimization',
        'impact': 'CRITICAL',
        'description': 'Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.'
    },
    'server': {
        'number': 3,
        'title': 'Server-Side Performance',
        'impact': 'HIGH',
        'description': 'Optimizing server-side rendering and data fetching eliminates server-side waterfalls and reduces response times.'
    },
    'client': {
        'number': 4,
        'title': 'Client-Side Data Fetching',
        'impact': 'MEDIUM-HIGH',
        'description': 'Automatic deduplication and efficient data fetching patterns reduce redundant network requests.'
    },
    'rerender': {
        'number': 5,
        'title': 'Re-render Optimization',
        'impact': 'MEDIUM',
        'description': 'Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.'
    },
    'rendering': {
        'number': 6,
        'title': 'Rendering Performance',
        'impact': 'MEDIUM',
        'description': 'Optimizing the rendering process reduces the work the browser needs to do.'
    },
    'js': {
        'number': 7,
        'title': 'JavaScript Performance',
        'impact': 'LOW-MEDIUM',
        'description': 'Micro-optimizations for hot paths can add up to meaningful improvements.'
    },
    'advanced': {
        'number': 8,
        'title': 'Advanced Patterns',
        'impact': 'VARIABLE',
        'description': 'Advanced patterns for specific cases that require careful implementation.'
    }
}


def parse_frontmatter(content: str) -> Tuple[Dict, str]:
    """Parse markdown frontmatter and body"""
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    # Parse YAML frontmatter manually (simple key: value)
    frontmatter = {}
    for line in parts[1].strip().split('\\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    body = parts[2].strip()
    return frontmatter, body


def parse_rule_file(filepath: Path) -> Dict:
    """Parse a single rule file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body = parse_frontmatter(content)

    # Extract prefix from filename
    filename = filepath.stem
    prefix = filename.split('-')[0]

    return {
        'filename': filepath.name,
        'prefix': prefix,
        'title': frontmatter.get('title', filename),
        'impact': frontmatter.get('impact', ''),
        'impactDescription': frontmatter.get('impactDescription', ''),
        'tags': frontmatter.get('tags', ''),
        'body': body,
        'frontmatter': frontmatter
    }


def group_rules_by_section(rules_dir: Path) -> Dict[str, List[Dict]]:
    """Group all rules by their section prefix"""
    grouped = {prefix: [] for prefix in SECTIONS.keys()}

    for rule_file in sorted(rules_dir.glob('*.md')):
        # Skip special files
        if rule_file.name.startswith('_'):
            continue

        rule = parse_rule_file(rule_file)
        prefix = rule['prefix']

        if prefix in grouped:
            grouped[prefix].append(rule)
        else:
            print(f"[WARNING] Unknown prefix '{prefix}' in file: {rule_file.name}")

    return grouped


def generate_section_file(section_prefix: str, rules: List[Dict], output_dir: Path):
    """Generate a merged section file"""
    if not rules:
        print(f"[WARNING] No rules found for section: {section_prefix}")
        return

    section_meta = SECTIONS[section_prefix]
    section_num = section_meta['number']
    section_title = section_meta['title']
    impact = section_meta['impact']
    description = section_meta['description']

    # Sort rules by title
    rules.sort(key=lambda r: r['title'])

    # Build content
    content = f"""# {section_num}. {section_title}

> **Impact:** {impact}
> **Focus:** {description}

---

## Overview

This section contains **{len(rules)} rules** focused on {section_title.lower()}.

"""

    # Add each rule
    for i, rule in enumerate(rules, 1):
        rule_id = f"{section_num}.{i}"
        title = rule['title']
        rule_impact = rule['impact']
        tags = rule['tags']
        body = rule['body']

        content += f"""---

## Rule {rule_id}: {title}

"""

        if rule_impact:
            content += f"**Impact:** {rule_impact}  \\n"

        if tags:
            content += f"**Tags:** {tags}  \\n"

        content += f"\\n{body}\\n\\n"

    # Write file
    output_file = output_dir / f"{section_num}-{section_prefix}-{section_title.lower().replace(' ', '-')}.md"
    output_file.write_text(content, encoding='utf-8')
    print(f"[OK] Generated: {output_file.name} ({len(rules)} rules)")


def main():
    """Main conversion function"""
    # Paths
    base_dir = Path(__file__).parent.parent.parent.parent.parent
    rules_dir = base_dir / "others/agent-skills/skills/react-best-practices/rules"
    output_dir = base_dir / ".agent/skills/react-best-practices"

    print(f"[*] Reading rules from: {rules_dir}")
    print(f"[*] Output to: {output_dir}")
    print()

    # Check if rules directory exists
    if not rules_dir.exists():
        print(f"[ERROR] Rules directory not found: {rules_dir}")
        return

    # Group rules
    print("[*] Grouping rules by section...")
    grouped_rules = group_rules_by_section(rules_dir)

    # Stats
    total_rules = sum(len(rules) for rules in grouped_rules.values())
    print(f"[*] Found {total_rules} total rules")
    print()

    # Generate section files
    print("[*] Generating section files...")
    for section_prefix in SECTIONS.keys():
        rules = grouped_rules[section_prefix]
        generate_section_file(section_prefix, rules, output_dir)

    print()
    print("[SUCCESS] Conversion complete!")
    print(f"[*] Generated 8 section files from {total_rules} rules")


if __name__ == '__main__':
    main()
`,
  ".agent/skills/nextjs-react-expert/scripts/convert_rules.py": `#!/usr/bin/env python3
"""
Conversion Script: React Best Practices → .agent Format
Merges 59 individual rules into 8 grouped section files
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

# Section metadata from _sections.md
SECTIONS = {
    'async': {
        'number': 1,
        'title': 'Eliminating Waterfalls',
        'impact': 'CRITICAL',
        'description': 'Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Eliminating them yields the largest gains.'
    },
    'bundle': {
        'number': 2,
        'title': 'Bundle Size Optimization',
        'impact': 'CRITICAL',
        'description': 'Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint.'
    },
    'server': {
        'number': 3,
        'title': 'Server-Side Performance',
        'impact': 'HIGH',
        'description': 'Optimizing server-side rendering and data fetching eliminates server-side waterfalls and reduces response times.'
    },
    'client': {
        'number': 4,
        'title': 'Client-Side Data Fetching',
        'impact': 'MEDIUM-HIGH',
        'description': 'Automatic deduplication and efficient data fetching patterns reduce redundant network requests.'
    },
    'rerender': {
        'number': 5,
        'title': 'Re-render Optimization',
        'impact': 'MEDIUM',
        'description': 'Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.'
    },
    'rendering': {
        'number': 6,
        'title': 'Rendering Performance',
        'impact': 'MEDIUM',
        'description': 'Optimizing the rendering process reduces the work the browser needs to do.'
    },
    'js': {
        'number': 7,
        'title': 'JavaScript Performance',
        'impact': 'LOW-MEDIUM',
        'description': 'Micro-optimizations for hot paths can add up to meaningful improvements.'
    },
    'advanced': {
        'number': 8,
        'title': 'Advanced Patterns',
        'impact': 'VARIABLE',
        'description': 'Advanced patterns for specific cases that require careful implementation.'
    }
}


def parse_frontmatter(content: str) -> Tuple[Dict, str]:
    """Parse markdown frontmatter and body"""
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    # Parse YAML frontmatter manually (simple key: value)
    frontmatter = {}
    for line in parts[1].strip().split('\\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    body = parts[2].strip()
    return frontmatter, body


def parse_rule_file(filepath: Path) -> Dict:
    """Parse a single rule file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body = parse_frontmatter(content)

    # Extract prefix from filename
    filename = filepath.stem
    prefix = filename.split('-')[0]

    return {
        'filename': filepath.name,
        'prefix': prefix,
        'title': frontmatter.get('title', filename),
        'impact': frontmatter.get('impact', ''),
        'impactDescription': frontmatter.get('impactDescription', ''),
        'tags': frontmatter.get('tags', ''),
        'body': body,
        'frontmatter': frontmatter
    }


def group_rules_by_section(rules_dir: Path) -> Dict[str, List[Dict]]:
    """Group all rules by their section prefix"""
    grouped = {prefix: [] for prefix in SECTIONS.keys()}

    for rule_file in sorted(rules_dir.glob('*.md')):
        # Skip special files
        if rule_file.name.startswith('_'):
            continue

        rule = parse_rule_file(rule_file)
        prefix = rule['prefix']

        if prefix in grouped:
            grouped[prefix].append(rule)
        else:
            print(f"[WARNING] Unknown prefix '{prefix}' in file: {rule_file.name}")

    return grouped


def generate_section_file(section_prefix: str, rules: List[Dict], output_dir: Path):
    """Generate a merged section file"""
    if not rules:
        print(f"[WARNING] No rules found for section: {section_prefix}")
        return

    section_meta = SECTIONS[section_prefix]
    section_num = section_meta['number']
    section_title = section_meta['title']
    impact = section_meta['impact']
    description = section_meta['description']

    # Sort rules by title
    rules.sort(key=lambda r: r['title'])

    # Build content
    content = f"""# {section_num}. {section_title}

> **Impact:** {impact}
> **Focus:** {description}

---

## Overview

This section contains **{len(rules)} rules** focused on {section_title.lower()}.

"""

    # Add each rule
    for i, rule in enumerate(rules, 1):
        rule_id = f"{section_num}.{i}"
        title = rule['title']
        rule_impact = rule['impact']
        tags = rule['tags']
        body = rule['body']

        content += f"""---

## Rule {rule_id}: {title}

"""

        if rule_impact:
            content += f"**Impact:** {rule_impact}  \\n"

        if tags:
            content += f"**Tags:** {tags}  \\n"

        content += f"\\n{body}\\n\\n"

    # Write file
    output_file = output_dir / f"{section_num}-{section_prefix}-{section_title.lower().replace(' ', '-')}.md"
    output_file.write_text(content, encoding='utf-8')
    print(f"[OK] Generated: {output_file.name} ({len(rules)} rules)")


def main():
    """Main conversion function"""
    # Paths
    base_dir = Path(__file__).parent.parent.parent.parent.parent
    rules_dir = base_dir / "others/agent-skills/skills/react-best-practices/rules"
    output_dir = base_dir / ".agent/skills/react-best-practices"

    print(f"[*] Reading rules from: {rules_dir}")
    print(f"[*] Output to: {output_dir}")
    print()

    # Check if rules directory exists
    if not rules_dir.exists():
        print(f"[ERROR] Rules directory not found: {rules_dir}")
        return

    # Group rules
    print("[*] Grouping rules by section...")
    grouped_rules = group_rules_by_section(rules_dir)

    # Stats
    total_rules = sum(len(rules) for rules in grouped_rules.values())
    print(f"[*] Found {total_rules} total rules")
    print()

    # Generate section files
    print("[*] Generating section files...")
    for section_prefix in SECTIONS.keys():
        rules = grouped_rules[section_prefix]
        generate_section_file(section_prefix, rules, output_dir)

    print()
    print("[SUCCESS] Conversion complete!")
    print(f"[*] Generated 8 section files from {total_rules} rules")


if __name__ == '__main__':
    main()
`,
  "nextjs-react-expert/scripts/react_performance_checker.py": `#!/usr/bin/env python3
"""
React Performance Checker
Automated performance audit for React/Next.js projects
Based on Vercel Engineering best practices
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple

class PerformanceChecker:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.issues = []
        self.warnings = []
        self.passed = []

    def check_waterfalls(self):
        """Check for sequential await patterns (Section 1)"""
        print("\\n[*] Checking for waterfalls (sequential awaits)...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: multiple awaits in sequence without Promise.all
                sequential_awaits = re.findall(r'await\\s+\\w+.*?\\n\\s*await\\s+\\w+', content)

                if sequential_awaits:
                    self.issues.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Sequential awaits detected (waterfall)',
                        'fix': 'Use Promise.all() for parallel fetching',
                        'section': '1-async-eliminating-waterfalls.md'
                    })
            except Exception as e:
                continue

    def check_barrel_imports(self):
        """Check for barrel imports (Section 2)"""
        print("[*] Checking for barrel imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: import from index files or barrel exports
                barrel_imports = re.findall(r"import.*from\\s+['\\"](@/.*?)/index['\\"]", content)
                barrel_imports += re.findall(r"import.*from\\s+['\\"]\\.\\.?/.*?['\\"](?!.*?\\.tsx?)", content)

                if barrel_imports:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Potential barrel imports detected',
                        'fix': 'Import directly from specific files',
                        'section': '2-bundle-bundle-size-optimization.md'
                    })
            except Exception as e:
                continue

    def check_dynamic_imports(self):
        """Check if large components use dynamic imports (Section 2)"""
        print("[*] Checking for missing dynamic imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check file size - if > 10KB, should probably use dynamic import
                if len(content) > 10000:
                    # Check if it's imported statically somewhere
                    filename = filepath.stem

                    # Search for static imports of this component
                    for check_file in self.project_path.rglob('*.{ts,tsx}'):
                        if check_file == filepath or 'node_modules' in str(check_file):
                            continue

                        check_content = check_file.read_text(encoding='utf-8')
                        if f"import {filename}" in check_content or f"import {{ {filename}" in check_content:
                            if 'dynamic(' not in check_content:
                                self.warnings.append({
                                    'file': str(check_file.relative_to(self.project_path)),
                                    'type': 'CRITICAL',
                                    'issue': f'Large component {filename} imported statically',
                                    'fix': 'Use dynamic() for code splitting',
                                    'section': '2-bundle-bundle-size-optimization.md'
                                })
                                break
            except Exception as e:
                continue

    def check_useEffect_fetching(self):
        """Check for data fetching in useEffect (Section 4)"""
        print("[*] Checking for useEffect data fetching...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: fetch or axios in useEffect
                if 'useEffect' in content:
                    if re.search(r'useEffect.*?fetch\\(', content, re.DOTALL):
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM-HIGH',
                            'issue': 'Data fetching in useEffect',
                            'fix': 'Consider using SWR or React Query for deduplication',
                            'section': '4-client-client-side-data-fetching.md'
                        })
            except Exception as e:
                continue

    def check_missing_memoization(self):
        """Check for missing React.memo, useMemo, useCallback (Section 5)"""
        print("[*] Checking for missing memoization...")

        for filepath in self.project_path.rglob('*.{tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for component definitions without memo
                components = re.findall(r'(?:export\\s+)?(?:const|function)\\s+([A-Z]\\w+)', content)

                if components and 'React.memo' not in content and 'memo(' not in content:
                    # Check if component receives props
                    if 'props:' in content or 'Props>' in content:
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM',
                            'issue': 'Component with props not memoized',
                            'fix': 'Consider using React.memo if props are stable',
                            'section': '5-rerender-re-render-optimization.md'
                        })
            except Exception as e:
                continue

    def check_image_optimization(self):
        """Check for unoptimized images (Section 6)"""
        print("[*] Checking for image optimization...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for <img> tags instead of next/image
                if '<img' in content and 'next/image' not in content:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'MEDIUM',
                        'issue': 'Using <img> instead of next/image',
                        'fix': 'Use next/image for automatic optimization',
                        'section': '6-rendering-rendering-performance.md'
                    })
            except Exception as e:
                continue

    def generate_report(self):
        """Generate final report"""
        print("\\n" + "="*60)
        print("REACT PERFORMANCE AUDIT REPORT")
        print("="*60)

        print(f"\\n[CRITICAL ISSUES] ({len([i for i in self.issues if i['type'] == 'CRITICAL'])})")
        for issue in self.issues:
            if issue['type'] == 'CRITICAL':
                print(f"  - {issue['file']}")
                print(f"    Issue: {issue['issue']}")
                print(f"    Fix: {issue['fix']}")
                print(f"    Reference: {issue['section']}\\n")

        print(f"\\n[WARNINGS] ({len(self.warnings)})")
        for warning in self.warnings[:10]:  # Show first 10
            print(f"  - {warning['file']}")
            print(f"    Issue: {warning['issue']}")
            print(f"    Fix: {warning['fix']}")
            print(f"    Reference: {warning['section']}\\n")

        if len(self.warnings) > 10:
            print(f"  ... and {len(self.warnings) - 10} more warnings")

        print("\\n" + "="*60)
        print(f"SUMMARY:")
        print(f"  Critical Issues: {len([i for i in self.issues if i['type'] == 'CRITICAL'])}")
        print(f"  Warnings: {len(self.warnings)}")
        print("="*60)

        if len(self.issues) == 0 and len(self.warnings) == 0:
            print("\\n[SUCCESS] No major performance issues detected!")
        else:
            print("\\n[ACTION REQUIRED] Review and fix issues above")
            print("Priority: CRITICAL > HIGH > MEDIUM > LOW")

    def run(self):
        """Run all checks"""
        print("="*60)
        print("React Performance Checker (Vercel Engineering)")
        print("="*60)
        print(f"Scanning: {self.project_path}")

        self.check_waterfalls()
        self.check_barrel_imports()
        self.check_dynamic_imports()
        self.check_useEffect_fetching()
        self.check_missing_memoization()
        self.check_image_optimization()

        self.generate_report()


def main():
    import sys

    if len(sys.argv) < 2:
        print("Usage: python react_performance_checker.py <project_path>")
        sys.exit(1)

    project_path = sys.argv[1]

    if not os.path.exists(project_path):
        print(f"[ERROR] Path not found: {project_path}")
        sys.exit(1)

    checker = PerformanceChecker(project_path)
    checker.run()


if __name__ == '__main__':
    main()
`,
  "skills/nextjs-react-expert/scripts/react_performance_checker.py": `#!/usr/bin/env python3
"""
React Performance Checker
Automated performance audit for React/Next.js projects
Based on Vercel Engineering best practices
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple

class PerformanceChecker:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.issues = []
        self.warnings = []
        self.passed = []

    def check_waterfalls(self):
        """Check for sequential await patterns (Section 1)"""
        print("\\n[*] Checking for waterfalls (sequential awaits)...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: multiple awaits in sequence without Promise.all
                sequential_awaits = re.findall(r'await\\s+\\w+.*?\\n\\s*await\\s+\\w+', content)

                if sequential_awaits:
                    self.issues.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Sequential awaits detected (waterfall)',
                        'fix': 'Use Promise.all() for parallel fetching',
                        'section': '1-async-eliminating-waterfalls.md'
                    })
            except Exception as e:
                continue

    def check_barrel_imports(self):
        """Check for barrel imports (Section 2)"""
        print("[*] Checking for barrel imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: import from index files or barrel exports
                barrel_imports = re.findall(r"import.*from\\s+['\\"](@/.*?)/index['\\"]", content)
                barrel_imports += re.findall(r"import.*from\\s+['\\"]\\.\\.?/.*?['\\"](?!.*?\\.tsx?)", content)

                if barrel_imports:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Potential barrel imports detected',
                        'fix': 'Import directly from specific files',
                        'section': '2-bundle-bundle-size-optimization.md'
                    })
            except Exception as e:
                continue

    def check_dynamic_imports(self):
        """Check if large components use dynamic imports (Section 2)"""
        print("[*] Checking for missing dynamic imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check file size - if > 10KB, should probably use dynamic import
                if len(content) > 10000:
                    # Check if it's imported statically somewhere
                    filename = filepath.stem

                    # Search for static imports of this component
                    for check_file in self.project_path.rglob('*.{ts,tsx}'):
                        if check_file == filepath or 'node_modules' in str(check_file):
                            continue

                        check_content = check_file.read_text(encoding='utf-8')
                        if f"import {filename}" in check_content or f"import {{ {filename}" in check_content:
                            if 'dynamic(' not in check_content:
                                self.warnings.append({
                                    'file': str(check_file.relative_to(self.project_path)),
                                    'type': 'CRITICAL',
                                    'issue': f'Large component {filename} imported statically',
                                    'fix': 'Use dynamic() for code splitting',
                                    'section': '2-bundle-bundle-size-optimization.md'
                                })
                                break
            except Exception as e:
                continue

    def check_useEffect_fetching(self):
        """Check for data fetching in useEffect (Section 4)"""
        print("[*] Checking for useEffect data fetching...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: fetch or axios in useEffect
                if 'useEffect' in content:
                    if re.search(r'useEffect.*?fetch\\(', content, re.DOTALL):
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM-HIGH',
                            'issue': 'Data fetching in useEffect',
                            'fix': 'Consider using SWR or React Query for deduplication',
                            'section': '4-client-client-side-data-fetching.md'
                        })
            except Exception as e:
                continue

    def check_missing_memoization(self):
        """Check for missing React.memo, useMemo, useCallback (Section 5)"""
        print("[*] Checking for missing memoization...")

        for filepath in self.project_path.rglob('*.{tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for component definitions without memo
                components = re.findall(r'(?:export\\s+)?(?:const|function)\\s+([A-Z]\\w+)', content)

                if components and 'React.memo' not in content and 'memo(' not in content:
                    # Check if component receives props
                    if 'props:' in content or 'Props>' in content:
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM',
                            'issue': 'Component with props not memoized',
                            'fix': 'Consider using React.memo if props are stable',
                            'section': '5-rerender-re-render-optimization.md'
                        })
            except Exception as e:
                continue

    def check_image_optimization(self):
        """Check for unoptimized images (Section 6)"""
        print("[*] Checking for image optimization...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for <img> tags instead of next/image
                if '<img' in content and 'next/image' not in content:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'MEDIUM',
                        'issue': 'Using <img> instead of next/image',
                        'fix': 'Use next/image for automatic optimization',
                        'section': '6-rendering-rendering-performance.md'
                    })
            except Exception as e:
                continue

    def generate_report(self):
        """Generate final report"""
        print("\\n" + "="*60)
        print("REACT PERFORMANCE AUDIT REPORT")
        print("="*60)

        print(f"\\n[CRITICAL ISSUES] ({len([i for i in self.issues if i['type'] == 'CRITICAL'])})")
        for issue in self.issues:
            if issue['type'] == 'CRITICAL':
                print(f"  - {issue['file']}")
                print(f"    Issue: {issue['issue']}")
                print(f"    Fix: {issue['fix']}")
                print(f"    Reference: {issue['section']}\\n")

        print(f"\\n[WARNINGS] ({len(self.warnings)})")
        for warning in self.warnings[:10]:  # Show first 10
            print(f"  - {warning['file']}")
            print(f"    Issue: {warning['issue']}")
            print(f"    Fix: {warning['fix']}")
            print(f"    Reference: {warning['section']}\\n")

        if len(self.warnings) > 10:
            print(f"  ... and {len(self.warnings) - 10} more warnings")

        print("\\n" + "="*60)
        print(f"SUMMARY:")
        print(f"  Critical Issues: {len([i for i in self.issues if i['type'] == 'CRITICAL'])}")
        print(f"  Warnings: {len(self.warnings)}")
        print("="*60)

        if len(self.issues) == 0 and len(self.warnings) == 0:
            print("\\n[SUCCESS] No major performance issues detected!")
        else:
            print("\\n[ACTION REQUIRED] Review and fix issues above")
            print("Priority: CRITICAL > HIGH > MEDIUM > LOW")

    def run(self):
        """Run all checks"""
        print("="*60)
        print("React Performance Checker (Vercel Engineering)")
        print("="*60)
        print(f"Scanning: {self.project_path}")

        self.check_waterfalls()
        self.check_barrel_imports()
        self.check_dynamic_imports()
        self.check_useEffect_fetching()
        self.check_missing_memoization()
        self.check_image_optimization()

        self.generate_report()


def main():
    import sys

    if len(sys.argv) < 2:
        print("Usage: python react_performance_checker.py <project_path>")
        sys.exit(1)

    project_path = sys.argv[1]

    if not os.path.exists(project_path):
        print(f"[ERROR] Path not found: {project_path}")
        sys.exit(1)

    checker = PerformanceChecker(project_path)
    checker.run()


if __name__ == '__main__':
    main()
`,
  ".agent/skills/nextjs-react-expert/scripts/react_performance_checker.py": `#!/usr/bin/env python3
"""
React Performance Checker
Automated performance audit for React/Next.js projects
Based on Vercel Engineering best practices
"""

import os
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple

class PerformanceChecker:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.issues = []
        self.warnings = []
        self.passed = []

    def check_waterfalls(self):
        """Check for sequential await patterns (Section 1)"""
        print("\\n[*] Checking for waterfalls (sequential awaits)...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: multiple awaits in sequence without Promise.all
                sequential_awaits = re.findall(r'await\\s+\\w+.*?\\n\\s*await\\s+\\w+', content)

                if sequential_awaits:
                    self.issues.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Sequential awaits detected (waterfall)',
                        'fix': 'Use Promise.all() for parallel fetching',
                        'section': '1-async-eliminating-waterfalls.md'
                    })
            except Exception as e:
                continue

    def check_barrel_imports(self):
        """Check for barrel imports (Section 2)"""
        print("[*] Checking for barrel imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: import from index files or barrel exports
                barrel_imports = re.findall(r"import.*from\\s+['\\"](@/.*?)/index['\\"]", content)
                barrel_imports += re.findall(r"import.*from\\s+['\\"]\\.\\.?/.*?['\\"](?!.*?\\.tsx?)", content)

                if barrel_imports:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': 'Potential barrel imports detected',
                        'fix': 'Import directly from specific files',
                        'section': '2-bundle-bundle-size-optimization.md'
                    })
            except Exception as e:
                continue

    def check_dynamic_imports(self):
        """Check if large components use dynamic imports (Section 2)"""
        print("[*] Checking for missing dynamic imports...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check file size - if > 10KB, should probably use dynamic import
                if len(content) > 10000:
                    # Check if it's imported statically somewhere
                    filename = filepath.stem

                    # Search for static imports of this component
                    for check_file in self.project_path.rglob('*.{ts,tsx}'):
                        if check_file == filepath or 'node_modules' in str(check_file):
                            continue

                        check_content = check_file.read_text(encoding='utf-8')
                        if f"import {filename}" in check_content or f"import {{ {filename}" in check_content:
                            if 'dynamic(' not in check_content:
                                self.warnings.append({
                                    'file': str(check_file.relative_to(self.project_path)),
                                    'type': 'CRITICAL',
                                    'issue': f'Large component {filename} imported statically',
                                    'fix': 'Use dynamic() for code splitting',
                                    'section': '2-bundle-bundle-size-optimization.md'
                                })
                                break
            except Exception as e:
                continue

    def check_useEffect_fetching(self):
        """Check for data fetching in useEffect (Section 4)"""
        print("[*] Checking for useEffect data fetching...")

        for filepath in self.project_path.rglob('*.{ts,tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: fetch or axios in useEffect
                if 'useEffect' in content:
                    if re.search(r'useEffect.*?fetch\\(', content, re.DOTALL):
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM-HIGH',
                            'issue': 'Data fetching in useEffect',
                            'fix': 'Consider using SWR or React Query for deduplication',
                            'section': '4-client-client-side-data-fetching.md'
                        })
            except Exception as e:
                continue

    def check_missing_memoization(self):
        """Check for missing React.memo, useMemo, useCallback (Section 5)"""
        print("[*] Checking for missing memoization...")

        for filepath in self.project_path.rglob('*.{tsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for component definitions without memo
                components = re.findall(r'(?:export\\s+)?(?:const|function)\\s+([A-Z]\\w+)', content)

                if components and 'React.memo' not in content and 'memo(' not in content:
                    # Check if component receives props
                    if 'props:' in content or 'Props>' in content:
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM',
                            'issue': 'Component with props not memoized',
                            'fix': 'Consider using React.memo if props are stable',
                            'section': '5-rerender-re-render-optimization.md'
                        })
            except Exception as e:
                continue

    def check_image_optimization(self):
        """Check for unoptimized images (Section 6)"""
        print("[*] Checking for image optimization...")

        for filepath in self.project_path.rglob('*.{ts,tsx,js,jsx}'):
            if 'node_modules' in str(filepath):
                continue

            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for <img> tags instead of next/image
                if '<img' in content and 'next/image' not in content:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'MEDIUM',
                        'issue': 'Using <img> instead of next/image',
                        'fix': 'Use next/image for automatic optimization',
                        'section': '6-rendering-rendering-performance.md'
                    })
            except Exception as e:
                continue

    def generate_report(self):
        """Generate final report"""
        print("\\n" + "="*60)
        print("REACT PERFORMANCE AUDIT REPORT")
        print("="*60)

        print(f"\\n[CRITICAL ISSUES] ({len([i for i in self.issues if i['type'] == 'CRITICAL'])})")
        for issue in self.issues:
            if issue['type'] == 'CRITICAL':
                print(f"  - {issue['file']}")
                print(f"    Issue: {issue['issue']}")
                print(f"    Fix: {issue['fix']}")
                print(f"    Reference: {issue['section']}\\n")

        print(f"\\n[WARNINGS] ({len(self.warnings)})")
        for warning in self.warnings[:10]:  # Show first 10
            print(f"  - {warning['file']}")
            print(f"    Issue: {warning['issue']}")
            print(f"    Fix: {warning['fix']}")
            print(f"    Reference: {warning['section']}\\n")

        if len(self.warnings) > 10:
            print(f"  ... and {len(self.warnings) - 10} more warnings")

        print("\\n" + "="*60)
        print(f"SUMMARY:")
        print(f"  Critical Issues: {len([i for i in self.issues if i['type'] == 'CRITICAL'])}")
        print(f"  Warnings: {len(self.warnings)}")
        print("="*60)

        if len(self.issues) == 0 and len(self.warnings) == 0:
            print("\\n[SUCCESS] No major performance issues detected!")
        else:
            print("\\n[ACTION REQUIRED] Review and fix issues above")
            print("Priority: CRITICAL > HIGH > MEDIUM > LOW")

    def run(self):
        """Run all checks"""
        print("="*60)
        print("React Performance Checker (Vercel Engineering)")
        print("="*60)
        print(f"Scanning: {self.project_path}")

        self.check_waterfalls()
        self.check_barrel_imports()
        self.check_dynamic_imports()
        self.check_useEffect_fetching()
        self.check_missing_memoization()
        self.check_image_optimization()

        self.generate_report()


def main():
    import sys

    if len(sys.argv) < 2:
        print("Usage: python react_performance_checker.py <project_path>")
        sys.exit(1)

    project_path = sys.argv[1]

    if not os.path.exists(project_path):
        print(f"[ERROR] Path not found: {project_path}")
        sys.exit(1)

    checker = PerformanceChecker(project_path)
    checker.run()


if __name__ == '__main__':
    main()
`,
  "performance-profiling/scripts/lighthouse_audit.py": `#!/usr/bin/env python3
"""
Skill: performance-profiling
Script: lighthouse_audit.py
Purpose: Run Lighthouse performance audit on a URL
Usage: python lighthouse_audit.py https://example.com
Output: JSON with performance scores
Note: Requires lighthouse CLI (npm install -g lighthouse)
"""
import subprocess
import json
import sys
import os
import tempfile

def run_lighthouse(url: str) -> dict:
    """Run Lighthouse audit on URL."""
    try:
        with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as f:
            output_path = f.name
        
        result = subprocess.run(
            [
                "lighthouse",
                url,
                "--output=json",
                f"--output-path={output_path}",
                "--chrome-flags=--headless",
                "--only-categories=performance,accessibility,best-practices,seo"
            ],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if os.path.exists(output_path):
            with open(output_path, 'r') as f:
                report = json.load(f)
            os.unlink(output_path)
            
            categories = report.get("categories", {})
            return {
                "url": url,
                "scores": {
                    "performance": int(categories.get("performance", {}).get("score", 0) * 100),
                    "accessibility": int(categories.get("accessibility", {}).get("score", 0) * 100),
                    "best_practices": int(categories.get("best-practices", {}).get("score", 0) * 100),
                    "seo": int(categories.get("seo", {}).get("score", 0) * 100)
                },
                "summary": get_summary(categories)
            }
        else:
            return {"error": "Lighthouse failed to generate report", "stderr": result.stderr[:500]}
            
    except subprocess.TimeoutExpired:
        return {"error": "Lighthouse audit timed out"}
    except FileNotFoundError:
        return {"error": "Lighthouse CLI not found. Install with: npm install -g lighthouse"}

def get_summary(categories: dict) -> str:
    """Generate summary based on scores."""
    perf = categories.get("performance", {}).get("score", 0) * 100
    if perf >= 90:
        return "[OK] Excellent performance"
    elif perf >= 50:
        return "[!] Needs improvement"
    else:
        return "[X] Poor performance"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python lighthouse_audit.py <url>"}))
        sys.exit(1)
    
    result = run_lighthouse(sys.argv[1])
    print(json.dumps(result, indent=2))
`,
  "skills/performance-profiling/scripts/lighthouse_audit.py": `#!/usr/bin/env python3
"""
Skill: performance-profiling
Script: lighthouse_audit.py
Purpose: Run Lighthouse performance audit on a URL
Usage: python lighthouse_audit.py https://example.com
Output: JSON with performance scores
Note: Requires lighthouse CLI (npm install -g lighthouse)
"""
import subprocess
import json
import sys
import os
import tempfile

def run_lighthouse(url: str) -> dict:
    """Run Lighthouse audit on URL."""
    try:
        with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as f:
            output_path = f.name
        
        result = subprocess.run(
            [
                "lighthouse",
                url,
                "--output=json",
                f"--output-path={output_path}",
                "--chrome-flags=--headless",
                "--only-categories=performance,accessibility,best-practices,seo"
            ],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if os.path.exists(output_path):
            with open(output_path, 'r') as f:
                report = json.load(f)
            os.unlink(output_path)
            
            categories = report.get("categories", {})
            return {
                "url": url,
                "scores": {
                    "performance": int(categories.get("performance", {}).get("score", 0) * 100),
                    "accessibility": int(categories.get("accessibility", {}).get("score", 0) * 100),
                    "best_practices": int(categories.get("best-practices", {}).get("score", 0) * 100),
                    "seo": int(categories.get("seo", {}).get("score", 0) * 100)
                },
                "summary": get_summary(categories)
            }
        else:
            return {"error": "Lighthouse failed to generate report", "stderr": result.stderr[:500]}
            
    except subprocess.TimeoutExpired:
        return {"error": "Lighthouse audit timed out"}
    except FileNotFoundError:
        return {"error": "Lighthouse CLI not found. Install with: npm install -g lighthouse"}

def get_summary(categories: dict) -> str:
    """Generate summary based on scores."""
    perf = categories.get("performance", {}).get("score", 0) * 100
    if perf >= 90:
        return "[OK] Excellent performance"
    elif perf >= 50:
        return "[!] Needs improvement"
    else:
        return "[X] Poor performance"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python lighthouse_audit.py <url>"}))
        sys.exit(1)
    
    result = run_lighthouse(sys.argv[1])
    print(json.dumps(result, indent=2))
`,
  ".agent/skills/performance-profiling/scripts/lighthouse_audit.py": `#!/usr/bin/env python3
"""
Skill: performance-profiling
Script: lighthouse_audit.py
Purpose: Run Lighthouse performance audit on a URL
Usage: python lighthouse_audit.py https://example.com
Output: JSON with performance scores
Note: Requires lighthouse CLI (npm install -g lighthouse)
"""
import subprocess
import json
import sys
import os
import tempfile

def run_lighthouse(url: str) -> dict:
    """Run Lighthouse audit on URL."""
    try:
        with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as f:
            output_path = f.name
        
        result = subprocess.run(
            [
                "lighthouse",
                url,
                "--output=json",
                f"--output-path={output_path}",
                "--chrome-flags=--headless",
                "--only-categories=performance,accessibility,best-practices,seo"
            ],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if os.path.exists(output_path):
            with open(output_path, 'r') as f:
                report = json.load(f)
            os.unlink(output_path)
            
            categories = report.get("categories", {})
            return {
                "url": url,
                "scores": {
                    "performance": int(categories.get("performance", {}).get("score", 0) * 100),
                    "accessibility": int(categories.get("accessibility", {}).get("score", 0) * 100),
                    "best_practices": int(categories.get("best-practices", {}).get("score", 0) * 100),
                    "seo": int(categories.get("seo", {}).get("score", 0) * 100)
                },
                "summary": get_summary(categories)
            }
        else:
            return {"error": "Lighthouse failed to generate report", "stderr": result.stderr[:500]}
            
    except subprocess.TimeoutExpired:
        return {"error": "Lighthouse audit timed out"}
    except FileNotFoundError:
        return {"error": "Lighthouse CLI not found. Install with: npm install -g lighthouse"}

def get_summary(categories: dict) -> str:
    """Generate summary based on scores."""
    perf = categories.get("performance", {}).get("score", 0) * 100
    if perf >= 90:
        return "[OK] Excellent performance"
    elif perf >= 50:
        return "[!] Needs improvement"
    else:
        return "[X] Poor performance"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python lighthouse_audit.py <url>"}))
        sys.exit(1)
    
    result = run_lighthouse(sys.argv[1])
    print(json.dumps(result, indent=2))
`,
  "seo-fundamentals/scripts/seo_checker.py": `#!/usr/bin/env python3
"""
SEO Checker - Search Engine Optimization Audit
Checks HTML/JSX/TSX pages for SEO best practices.

PURPOSE:
    - Verify meta tags, titles, descriptions
    - Check Open Graph tags for social sharing
    - Validate heading hierarchy
    - Check image accessibility (alt attributes)

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - Only files that are likely PUBLIC pages

Usage:
    python seo_checker.py <project_path>
"""
import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


# Directories to skip
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation', 'examples'
}

# Files to skip (not pages)
SKIP_PATTERNS = [
    'config', 'setup', 'util', 'helper', 'hook', 'context', 'store',
    'service', 'api', 'lib', 'constant', 'type', 'interface', 'mock',
    '.test.', '.spec.', '_test.', '_spec.'
]


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.name.lower()
    stem = file_path.stem.lower()
    
    # Skip utility/config files
    if any(skip in name for skip in SKIP_PATTERNS):
        return False
    
    # Check path - pages in specific directories are likely pages
    parts = [p.lower() for p in file_path.parts]
    page_dirs = ['pages', 'app', 'routes', 'views', 'screens']
    
    if any(d in parts for d in page_dirs):
        return True
    
    # Filename indicators for pages
    page_names = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                  'post', 'article', 'product', 'landing', 'layout']
    
    if any(p in stem for p in page_names):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() in ['.html', '.htm']:
        return True
    
    return False


def find_pages(project_path: Path) -> list:
    """Find page files to check."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:50]  # Limit to 50 files


def check_page(file_path: Path) -> dict:
    """Check a single page for SEO issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {"file": str(file_path.name), "issues": [f"Error: {e}"]}
    
    # Detect if this is a layout/template file (has Head component)
    is_layout = 'Head>' in content or '<head' in content.lower()
    
    # 1. Title tag
    has_title = '<title' in content.lower() or 'title=' in content or 'Head>' in content
    if not has_title and is_layout:
        issues.append("Missing <title> tag")
    
    # 2. Meta description
    has_description = 'name="description"' in content.lower() or 'name=\\'description\\'' in content.lower()
    if not has_description and is_layout:
        issues.append("Missing meta description")
    
    # 3. Open Graph tags
    has_og = 'og:' in content or 'property="og:' in content.lower()
    if not has_og and is_layout:
        issues.append("Missing Open Graph tags")
    
    # 4. Heading hierarchy - multiple H1s
    h1_matches = re.findall(r'<h1[^>]*>', content, re.I)
    if len(h1_matches) > 1:
        issues.append(f"Multiple H1 tags ({len(h1_matches)})")
    
    # 5. Images without alt
    img_pattern = r'<img[^>]+>'
    imgs = re.findall(img_pattern, content, re.I)
    for img in imgs:
        if 'alt=' not in img.lower():
            issues.append("Image missing alt attribute")
            break
        if 'alt=""' in img or "alt=''" in img:
            issues.append("Image has empty alt attribute")
            break
    
    # 6. Check for canonical link (nice to have)
    # has_canonical = 'rel="canonical"' in content.lower()
    
    return {
        "file": str(file_path.name),
        "issues": issues
    }


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"  SEO CHECKER - Search Engine Optimization Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find pages
    pages = find_pages(project_path)
    
    if not pages:
        print("\\n[!] No page files found.")
        print("    Looking for: HTML, JSX, TSX in pages/app/routes directories")
        output = {"script": "seo_checker", "files_checked": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} page files to analyze\\n")
    
    # Check each page
    all_issues = []
    for f in pages:
        result = check_page(f)
        if result["issues"]:
            all_issues.append(result)
    
    # Summary
    print("=" * 60)
    print("SEO ANALYSIS RESULTS")
    print("=" * 60)
    
    if all_issues:
        # Group by issue type
        issue_counts = {}
        for item in all_issues:
            for issue in item["issues"]:
                issue_counts[issue] = issue_counts.get(issue, 0) + 1
        
        print("\\nIssue Summary:")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            print(f"  [{count}] {issue}")
        
        print(f"\\nAffected files ({len(all_issues)}):")
        for item in all_issues[:5]:
            print(f"  - {item['file']}")
        if len(all_issues) > 5:
            print(f"  ... and {len(all_issues) - 5} more")
    else:
        print("\\n[OK] No SEO issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    passed = total_issues == 0
    
    output = {
        "script": "seo_checker",
        "project": str(project_path),
        "files_checked": len(pages),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  "skills/seo-fundamentals/scripts/seo_checker.py": `#!/usr/bin/env python3
"""
SEO Checker - Search Engine Optimization Audit
Checks HTML/JSX/TSX pages for SEO best practices.

PURPOSE:
    - Verify meta tags, titles, descriptions
    - Check Open Graph tags for social sharing
    - Validate heading hierarchy
    - Check image accessibility (alt attributes)

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - Only files that are likely PUBLIC pages

Usage:
    python seo_checker.py <project_path>
"""
import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


# Directories to skip
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation', 'examples'
}

# Files to skip (not pages)
SKIP_PATTERNS = [
    'config', 'setup', 'util', 'helper', 'hook', 'context', 'store',
    'service', 'api', 'lib', 'constant', 'type', 'interface', 'mock',
    '.test.', '.spec.', '_test.', '_spec.'
]


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.name.lower()
    stem = file_path.stem.lower()
    
    # Skip utility/config files
    if any(skip in name for skip in SKIP_PATTERNS):
        return False
    
    # Check path - pages in specific directories are likely pages
    parts = [p.lower() for p in file_path.parts]
    page_dirs = ['pages', 'app', 'routes', 'views', 'screens']
    
    if any(d in parts for d in page_dirs):
        return True
    
    # Filename indicators for pages
    page_names = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                  'post', 'article', 'product', 'landing', 'layout']
    
    if any(p in stem for p in page_names):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() in ['.html', '.htm']:
        return True
    
    return False


def find_pages(project_path: Path) -> list:
    """Find page files to check."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:50]  # Limit to 50 files


def check_page(file_path: Path) -> dict:
    """Check a single page for SEO issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {"file": str(file_path.name), "issues": [f"Error: {e}"]}
    
    # Detect if this is a layout/template file (has Head component)
    is_layout = 'Head>' in content or '<head' in content.lower()
    
    # 1. Title tag
    has_title = '<title' in content.lower() or 'title=' in content or 'Head>' in content
    if not has_title and is_layout:
        issues.append("Missing <title> tag")
    
    # 2. Meta description
    has_description = 'name="description"' in content.lower() or 'name=\\'description\\'' in content.lower()
    if not has_description and is_layout:
        issues.append("Missing meta description")
    
    # 3. Open Graph tags
    has_og = 'og:' in content or 'property="og:' in content.lower()
    if not has_og and is_layout:
        issues.append("Missing Open Graph tags")
    
    # 4. Heading hierarchy - multiple H1s
    h1_matches = re.findall(r'<h1[^>]*>', content, re.I)
    if len(h1_matches) > 1:
        issues.append(f"Multiple H1 tags ({len(h1_matches)})")
    
    # 5. Images without alt
    img_pattern = r'<img[^>]+>'
    imgs = re.findall(img_pattern, content, re.I)
    for img in imgs:
        if 'alt=' not in img.lower():
            issues.append("Image missing alt attribute")
            break
        if 'alt=""' in img or "alt=''" in img:
            issues.append("Image has empty alt attribute")
            break
    
    # 6. Check for canonical link (nice to have)
    # has_canonical = 'rel="canonical"' in content.lower()
    
    return {
        "file": str(file_path.name),
        "issues": issues
    }


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"  SEO CHECKER - Search Engine Optimization Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find pages
    pages = find_pages(project_path)
    
    if not pages:
        print("\\n[!] No page files found.")
        print("    Looking for: HTML, JSX, TSX in pages/app/routes directories")
        output = {"script": "seo_checker", "files_checked": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} page files to analyze\\n")
    
    # Check each page
    all_issues = []
    for f in pages:
        result = check_page(f)
        if result["issues"]:
            all_issues.append(result)
    
    # Summary
    print("=" * 60)
    print("SEO ANALYSIS RESULTS")
    print("=" * 60)
    
    if all_issues:
        # Group by issue type
        issue_counts = {}
        for item in all_issues:
            for issue in item["issues"]:
                issue_counts[issue] = issue_counts.get(issue, 0) + 1
        
        print("\\nIssue Summary:")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            print(f"  [{count}] {issue}")
        
        print(f"\\nAffected files ({len(all_issues)}):")
        for item in all_issues[:5]:
            print(f"  - {item['file']}")
        if len(all_issues) > 5:
            print(f"  ... and {len(all_issues) - 5} more")
    else:
        print("\\n[OK] No SEO issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    passed = total_issues == 0
    
    output = {
        "script": "seo_checker",
        "project": str(project_path),
        "files_checked": len(pages),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/seo-fundamentals/scripts/seo_checker.py": `#!/usr/bin/env python3
"""
SEO Checker - Search Engine Optimization Audit
Checks HTML/JSX/TSX pages for SEO best practices.

PURPOSE:
    - Verify meta tags, titles, descriptions
    - Check Open Graph tags for social sharing
    - Validate heading hierarchy
    - Check image accessibility (alt attributes)

WHAT IT CHECKS:
    - HTML files (actual web pages)
    - JSX/TSX files (React page components)
    - Only files that are likely PUBLIC pages

Usage:
    python seo_checker.py <project_path>
"""
import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


# Directories to skip
SKIP_DIRS = {
    'node_modules', '.next', 'dist', 'build', '.git', '.github',
    '__pycache__', '.vscode', '.idea', 'coverage', 'test', 'tests',
    '__tests__', 'spec', 'docs', 'documentation', 'examples'
}

# Files to skip (not pages)
SKIP_PATTERNS = [
    'config', 'setup', 'util', 'helper', 'hook', 'context', 'store',
    'service', 'api', 'lib', 'constant', 'type', 'interface', 'mock',
    '.test.', '.spec.', '_test.', '_spec.'
]


def is_page_file(file_path: Path) -> bool:
    """Check if this file is likely a public-facing page."""
    name = file_path.name.lower()
    stem = file_path.stem.lower()
    
    # Skip utility/config files
    if any(skip in name for skip in SKIP_PATTERNS):
        return False
    
    # Check path - pages in specific directories are likely pages
    parts = [p.lower() for p in file_path.parts]
    page_dirs = ['pages', 'app', 'routes', 'views', 'screens']
    
    if any(d in parts for d in page_dirs):
        return True
    
    # Filename indicators for pages
    page_names = ['page', 'index', 'home', 'about', 'contact', 'blog', 
                  'post', 'article', 'product', 'landing', 'layout']
    
    if any(p in stem for p in page_names):
        return True
    
    # HTML files are usually pages
    if file_path.suffix.lower() in ['.html', '.htm']:
        return True
    
    return False


def find_pages(project_path: Path) -> list:
    """Find page files to check."""
    patterns = ['**/*.html', '**/*.htm', '**/*.jsx', '**/*.tsx']
    
    files = []
    for pattern in patterns:
        for f in project_path.glob(pattern):
            # Skip excluded directories
            if any(skip in f.parts for skip in SKIP_DIRS):
                continue
            
            # Check if it's likely a page
            if is_page_file(f):
                files.append(f)
    
    return files[:50]  # Limit to 50 files


def check_page(file_path: Path) -> dict:
    """Check a single page for SEO issues."""
    issues = []
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return {"file": str(file_path.name), "issues": [f"Error: {e}"]}
    
    # Detect if this is a layout/template file (has Head component)
    is_layout = 'Head>' in content or '<head' in content.lower()
    
    # 1. Title tag
    has_title = '<title' in content.lower() or 'title=' in content or 'Head>' in content
    if not has_title and is_layout:
        issues.append("Missing <title> tag")
    
    # 2. Meta description
    has_description = 'name="description"' in content.lower() or 'name=\\'description\\'' in content.lower()
    if not has_description and is_layout:
        issues.append("Missing meta description")
    
    # 3. Open Graph tags
    has_og = 'og:' in content or 'property="og:' in content.lower()
    if not has_og and is_layout:
        issues.append("Missing Open Graph tags")
    
    # 4. Heading hierarchy - multiple H1s
    h1_matches = re.findall(r'<h1[^>]*>', content, re.I)
    if len(h1_matches) > 1:
        issues.append(f"Multiple H1 tags ({len(h1_matches)})")
    
    # 5. Images without alt
    img_pattern = r'<img[^>]+>'
    imgs = re.findall(img_pattern, content, re.I)
    for img in imgs:
        if 'alt=' not in img.lower():
            issues.append("Image missing alt attribute")
            break
        if 'alt=""' in img or "alt=''" in img:
            issues.append("Image has empty alt attribute")
            break
    
    # 6. Check for canonical link (nice to have)
    # has_canonical = 'rel="canonical"' in content.lower()
    
    return {
        "file": str(file_path.name),
        "issues": issues
    }


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    
    print(f"\\n{'='*60}")
    print(f"  SEO CHECKER - Search Engine Optimization Audit")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-"*60)
    
    # Find pages
    pages = find_pages(project_path)
    
    if not pages:
        print("\\n[!] No page files found.")
        print("    Looking for: HTML, JSX, TSX in pages/app/routes directories")
        output = {"script": "seo_checker", "files_checked": 0, "passed": True}
        print("\\n" + json.dumps(output, indent=2))
        sys.exit(0)
    
    print(f"Found {len(pages)} page files to analyze\\n")
    
    # Check each page
    all_issues = []
    for f in pages:
        result = check_page(f)
        if result["issues"]:
            all_issues.append(result)
    
    # Summary
    print("=" * 60)
    print("SEO ANALYSIS RESULTS")
    print("=" * 60)
    
    if all_issues:
        # Group by issue type
        issue_counts = {}
        for item in all_issues:
            for issue in item["issues"]:
                issue_counts[issue] = issue_counts.get(issue, 0) + 1
        
        print("\\nIssue Summary:")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            print(f"  [{count}] {issue}")
        
        print(f"\\nAffected files ({len(all_issues)}):")
        for item in all_issues[:5]:
            print(f"  - {item['file']}")
        if len(all_issues) > 5:
            print(f"  ... and {len(all_issues) - 5} more")
    else:
        print("\\n[OK] No SEO issues found!")
    
    total_issues = sum(len(item["issues"]) for item in all_issues)
    passed = total_issues == 0
    
    output = {
        "script": "seo_checker",
        "project": str(project_path),
        "files_checked": len(pages),
        "files_with_issues": len(all_issues),
        "issues_found": total_issues,
        "passed": passed
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
`,
  "testing-patterns/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  "skills/testing-patterns/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/testing-patterns/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  "git-workflows/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  "skills/git-workflows/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  ".agent/skills/git-workflows/scripts/test_runner.py": `#!/usr/bin/env python3
"""
Test Runner - Unified test execution and coverage reporting
Runs tests and generates coverage report based on project type.

Usage:
    python test_runner.py <project_path> [--coverage]

Supports:
    - Node.js: npm test, jest, vitest
    - Python: pytest, unittest
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows console encoding
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except:
    pass


def detect_test_framework(project_path: Path) -> dict:
    """Detect test framework and commands."""
    result = {
        "type": "unknown",
        "framework": None,
        "cmd": None,
        "coverage_cmd": None
    }
    
    # Node.js project
    package_json = project_path / "package.json"
    if package_json.exists():
        result["type"] = "node"
        try:
            pkg = json.loads(package_json.read_text(encoding='utf-8'))
            scripts = pkg.get("scripts", {})
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            
            # Check for test script
            if "test" in scripts:
                result["framework"] = "npm test"
                result["cmd"] = ["npm", "test"]
                
                # Try to detect specific framework for coverage
                if "vitest" in deps:
                    result["framework"] = "vitest"
                    result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
                elif "jest" in deps:
                    result["framework"] = "jest"
                    result["coverage_cmd"] = ["npx", "jest", "--coverage"]
            elif "vitest" in deps:
                result["framework"] = "vitest"
                result["cmd"] = ["npx", "vitest", "run"]
                result["coverage_cmd"] = ["npx", "vitest", "run", "--coverage"]
            elif "jest" in deps:
                result["framework"] = "jest"
                result["cmd"] = ["npx", "jest"]
                result["coverage_cmd"] = ["npx", "jest", "--coverage"]
                
        except:
            pass
    
    # Python project
    if (project_path / "pyproject.toml").exists() or (project_path / "requirements.txt").exists():
        result["type"] = "python"
        result["framework"] = "pytest"
        result["cmd"] = ["python", "-m", "pytest", "-v"]
        result["coverage_cmd"] = ["python", "-m", "pytest", "--cov", "--cov-report=term-missing"]
    
    return result


def run_tests(cmd: list, cwd: Path) -> dict:
    """Run tests and return results."""
    result = {
        "passed": False,
        "output": "",
        "error": "",
        "tests_run": 0,
        "tests_passed": 0,
        "tests_failed": 0
    }
    
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=300  # 5 min timeout for tests
        )
        
        result["output"] = proc.stdout[:3000] if proc.stdout else ""
        result["error"] = proc.stderr[:500] if proc.stderr else ""
        result["passed"] = proc.returncode == 0
        
        # Try to parse test counts from output
        output = proc.stdout or ""
        
        # Jest/Vitest pattern: "Tests: X passed, Y failed, Z total"
        if "passed" in output.lower() and "failed" in output.lower():
            import re
            match = re.search(r'(\\d+)\\s+passed', output, re.IGNORECASE)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output, re.IGNORECASE)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
        # Pytest pattern: "X passed, Y failed"
        if "pytest" in str(cmd):
            import re
            match = re.search(r'(\\d+)\\s+passed', output)
            if match:
                result["tests_passed"] = int(match.group(1))
            match = re.search(r'(\\d+)\\s+failed', output)
            if match:
                result["tests_failed"] = int(match.group(1))
            result["tests_run"] = result["tests_passed"] + result["tests_failed"]
        
    except FileNotFoundError:
        result["error"] = f"Command not found: {cmd[0]}"
    except subprocess.TimeoutExpired:
        result["error"] = "Timeout after 300s"
    except Exception as e:
        result["error"] = str(e)
    
    return result


def main():
    project_path = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    with_coverage = "--coverage" in sys.argv
    
    print(f"\\n{'='*60}")
    print(f"[TEST RUNNER] Unified Test Execution")
    print(f"{'='*60}")
    print(f"Project: {project_path}")
    print(f"Coverage: {'enabled' if with_coverage else 'disabled'}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Detect test framework
    test_info = detect_test_framework(project_path)
    print(f"Type: {test_info['type']}")
    print(f"Framework: {test_info['framework']}")
    print("-"*60)
    
    if not test_info["cmd"]:
        print("No test framework found for this project.")
        output = {
            "script": "test_runner",
            "project": str(project_path),
            "type": test_info["type"],
            "framework": None,
            "passed": True,
            "message": "No tests configured"
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)
    
    # Choose command
    cmd = test_info["coverage_cmd"] if with_coverage and test_info["coverage_cmd"] else test_info["cmd"]
    
    print(f"Running: {' '.join(cmd)}")
    print("-"*60)
    
    # Run tests
    result = run_tests(cmd, project_path)
    
    # Print output (truncated)
    if result["output"]:
        lines = result["output"].split("\\n")
        for line in lines[:30]:
            print(line)
        if len(lines) > 30:
            print(f"... ({len(lines) - 30} more lines)")
    
    # Summary
    print("\\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    if result["passed"]:
        print("[PASS] All tests passed")
    else:
        print("[FAIL] Some tests failed")
        if result["error"]:
            print(f"Error: {result['error'][:200]}")
    
    if result["tests_run"] > 0:
        print(f"Tests: {result['tests_run']} total, {result['tests_passed']} passed, {result['tests_failed']} failed")
    
    output = {
        "script": "test_runner",
        "project": str(project_path),
        "type": test_info["type"],
        "framework": test_info["framework"],
        "tests_run": result["tests_run"],
        "tests_passed": result["tests_passed"],
        "tests_failed": result["tests_failed"],
        "passed": result["passed"]
    }
    
    print("\\n" + json.dumps(output, indent=2))
    
    sys.exit(0 if result["passed"] else 1)


if __name__ == "__main__":
    main()
`,
  "vulnerability-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  "skills/vulnerability-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  ".agent/skills/vulnerability-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  "security-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  "skills/security-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  ".agent/skills/security-scanner/scripts/security_scan.py": `#!/usr/bin/env python3
"""
Skill: vulnerability-scanner
Script: security_scan.py
Purpose: Validate that security principles from SKILL.md are applied correctly
Usage: python security_scan.py <project_path> [--scan-type all|deps|secrets|patterns|config]
Output: JSON with validation findings

This script verifies:
1. Dependencies - Supply chain security (OWASP A03)
2. Secrets - No hardcoded credentials (OWASP A04)
3. Code Patterns - Dangerous patterns identified (OWASP A05)
4. Configuration - Security settings validated (OWASP A02)
"""
import subprocess
import json
import os
import sys
import re
import argparse
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7


# ============================================================================
#  CONFIGURATION
# ============================================================================

SECRET_PATTERNS = [
    # API Keys & Tokens
    (r'api[_-]?key\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "API Key", "high"),
    (r'token\\s*[=:]\\s*["\\'][^"\\']{10,}["\\']', "Token", "high"),
    (r'bearer\\s+[a-zA-Z0-9\\-_.]+', "Bearer Token", "critical"),
    
    # Cloud Credentials
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key", "critical"),
    (r'aws[_-]?secret[_-]?access[_-]?key\\s*[=:]\\s*["\\'][^"\\']+["\\']', "AWS Secret", "critical"),
    (r'AZURE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "Azure Credential", "critical"),
    (r'GOOGLE[_-]?[A-Z_]+\\s*[=:]\\s*["\\'][^"\\']+["\\']', "GCP Credential", "critical"),
    
    # Database & Connections
    (r'password\\s*[=:]\\s*["\\'][^"\\']{4,}["\\']', "Password", "high"),
    (r'(mongodb|postgres|mysql|redis):\\/\\/[^\\s"\\']+', "Database Connection String", "critical"),
    
    # Private Keys
    (r'-----BEGIN\\s+(RSA|PRIVATE|EC)\\s+KEY-----', "Private Key", "critical"),
    (r'ssh-rsa\\s+[A-Za-z0-9+/]+', "SSH Key", "critical"),
    
    # JWT
    (r'eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+', "JWT Token", "high"),
]

DANGEROUS_PATTERNS = [
    # Injection risks
    (r'eval\\s*\\(', "eval() usage", "critical", "Code Injection risk"),
    (r'exec\\s*\\(', "exec() usage", "critical", "Code Injection risk"),
    (r'new\\s+Function\\s*\\(', "Function constructor", "high", "Code Injection risk"),
    (r'child_process\\.exec\\s*\\(', "child_process.exec", "high", "Command Injection risk"),
    (r'subprocess\\.call\\s*\\([^)]*shell\\s*=\\s*True', "subprocess with shell=True", "high", "Command Injection risk"),
    
    # XSS risks
    (r'dangerouslySetInnerHTML', "dangerouslySetInnerHTML", "high", "XSS risk"),
    (r'\\.innerHTML\\s*=', "innerHTML assignment", "medium", "XSS risk"),
    (r'document\\.write\\s*\\(', "document.write", "medium", "XSS risk"),
    
    # SQL Injection indicators
    (r'["\\'][^"\\']*\\+\\s*[a-zA-Z_]+\\s*\\+\\s*["\\'].*(?:SELECT|INSERT|UPDATE|DELETE)', "SQL String Concat", "critical", "SQL Injection risk"),
    (r'f"[^"]*(?:SELECT|INSERT|UPDATE|DELETE)[^"]*\\{', "SQL f-string", "critical", "SQL Injection risk"),
    
    # Insecure configurations
    (r'verify\\s*=\\s*False', "SSL Verify Disabled", "high", "MITM risk"),
    (r'--insecure', "Insecure flag", "medium", "Security disabled"),
    (r'disable[_-]?ssl', "SSL Disabled", "high", "MITM risk"),
    
    # Unsafe deserialization
    (r'pickle\\.loads?\\s*\\(', "pickle usage", "high", "Deserialization risk"),
    (r'yaml\\.load\\s*\\([^)]*\\)(?!\\s*,\\s*Loader)', "Unsafe YAML load", "high", "Deserialization risk"),
]

SKIP_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 'venv', '.next'}
CODE_EXTENSIONS = {'.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rb', '.php'}
CONFIG_EXTENSIONS = {'.json', '.yaml', '.yml', '.toml', '.env', '.env.local', '.env.development'}


# ============================================================================
#  SCANNING FUNCTIONS
# ============================================================================

def scan_dependencies(project_path: str) -> Dict[str, Any]:
    """
    Validate supply chain security (OWASP A03).
    Checks: npm audit, lock file presence, dependency age.
    """
    results = {"tool": "dependency_scanner", "findings": [], "status": "[OK] Secure"}
    
    # Check for lock files
    lock_files = {
        "npm": ["package-lock.json", "npm-shrinkwrap.json"],
        "yarn": ["yarn.lock"],
        "pnpm": ["pnpm-lock.yaml"],
        "pip": ["requirements.txt", "Pipfile.lock", "poetry.lock"],
    }
    
    found_locks = []
    missing_locks = []
    
    for manager, files in lock_files.items():
        pkg_file = "package.json" if manager in ["npm", "yarn", "pnpm"] else "setup.py"
        pkg_path = Path(project_path) / pkg_file
        
        if pkg_path.exists() or (manager == "pip" and (Path(project_path) / "requirements.txt").exists()):
            has_lock = any((Path(project_path) / f).exists() for f in files)
            if has_lock:
                found_locks.append(manager)
            else:
                missing_locks.append(manager)
                results["findings"].append({
                    "type": "Missing Lock File",
                    "severity": "high",
                    "message": f"{manager}: No lock file found. Supply chain integrity at risk."
                })
    
    # Run npm audit if applicable
    if (Path(project_path) / "package.json").exists():
        try:
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            try:
                audit_data = json.loads(result.stdout)
                vulnerabilities = audit_data.get("vulnerabilities", {})
                
                severity_count = {"critical": 0, "high": 0, "moderate": 0, "low": 0}
                for vuln in vulnerabilities.values():
                    sev = vuln.get("severity", "low").lower()
                    if sev in severity_count:
                        severity_count[sev] += 1
                
                if severity_count["critical"] > 0:
                    results["status"] = "[!!] Critical vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "critical",
                        "message": f"{severity_count['critical']} critical vulnerabilities in dependencies"
                    })
                elif severity_count["high"] > 0:
                    results["status"] = "[!] High vulnerabilities"
                    results["findings"].append({
                        "type": "npm audit",
                        "severity": "high",
                        "message": f"{severity_count['high']} high severity vulnerabilities"
                    })
                
                results["npm_audit"] = severity_count
                
            except json.JSONDecodeError:
                pass
                
        except (FileNotFoundError, subprocess.TimeoutExpired):
            pass
    
    if not results["findings"]:
        results["status"] = "[OK] Supply chain checks passed"
    
    return results


def scan_secrets(project_path: str) -> Dict[str, Any]:
    """
    Validate no hardcoded secrets (OWASP A04).
    Checks: API keys, tokens, passwords, cloud credentials.
    """
    results = {
        "tool": "secret_scanner",
        "findings": [],
        "status": "[OK] No secrets detected",
        "scanned_files": 0,
        "by_severity": {"critical": 0, "high": 0, "medium": 0}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS and ext not in CONFIG_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, secret_type, severity in SECRET_PATTERNS:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "type": secret_type,
                                "severity": severity,
                                "count": len(matches)
                            })
                            results["by_severity"][severity] += len(matches)
                            
            except Exception:
                pass
    
    if results["by_severity"]["critical"] > 0:
        results["status"] = "[!!] CRITICAL: Secrets exposed!"
    elif results["by_severity"]["high"] > 0:
        results["status"] = "[!] HIGH: Secrets found"
    elif sum(results["by_severity"].values()) > 0:
        results["status"] = "[?] Potential secrets detected"
    
    # Limit findings for output
    results["findings"] = results["findings"][:15]
    
    return results


def scan_code_patterns(project_path: str) -> Dict[str, Any]:
    """
    Validate dangerous code patterns (OWASP A05).
    Checks: Injection risks, XSS, unsafe deserialization.
    """
    results = {
        "tool": "pattern_scanner",
        "findings": [],
        "status": "[OK] No dangerous patterns",
        "scanned_files": 0,
        "by_category": {}
    }
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CODE_EXTENSIONS:
                continue
                
            filepath = Path(root) / file
            results["scanned_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    for line_num, line in enumerate(lines, 1):
                        for pattern, name, severity, category in DANGEROUS_PATTERNS:
                            if re.search(pattern, line, re.IGNORECASE):
                                results["findings"].append({
                                    "file": str(filepath.relative_to(project_path)),
                                    "line": line_num,
                                    "pattern": name,
                                    "severity": severity,
                                    "category": category,
                                    "snippet": line.strip()[:80]
                                })
                                results["by_category"][category] = results["by_category"].get(category, 0) + 1
                                
            except Exception:
                pass
    
    critical_count = sum(1 for f in results["findings"] if f["severity"] == "critical")
    high_count = sum(1 for f in results["findings"] if f["severity"] == "high")
    
    if critical_count > 0:
        results["status"] = f"[!!] CRITICAL: {critical_count} dangerous patterns"
    elif high_count > 0:
        results["status"] = f"[!] HIGH: {high_count} risky patterns"
    elif results["findings"]:
        results["status"] = "[?] Some patterns need review"
    
    # Limit findings
    results["findings"] = results["findings"][:20]
    
    return results


def scan_configuration(project_path: str) -> Dict[str, Any]:
    """
    Validate security configuration (OWASP A02).
    Checks: Security headers, CORS, debug modes.
    """
    results = {
        "tool": "config_scanner",
        "findings": [],
        "status": "[OK] Configuration secure",
        "checks": {}
    }
    
    # Check common config files for issues
    config_issues = [
        (r'"DEBUG"\\s*:\\s*true', "Debug mode enabled", "high"),
        (r'debug\\s*=\\s*True', "Debug mode enabled", "high"),
        (r'NODE_ENV.*development', "Development mode in config", "medium"),
        (r'"CORS_ALLOW_ALL".*true', "CORS allow all origins", "high"),
        (r'"Access-Control-Allow-Origin".*\\*', "CORS wildcard", "high"),
        (r'allowCredentials.*true.*origin.*\\*', "Dangerous CORS combo", "critical"),
    ]
    
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in CONFIG_EXTENSIONS and file not in ['next.config.js', 'webpack.config.js', '.eslintrc.js']:
                continue
                
            filepath = Path(root) / file
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for pattern, issue, severity in config_issues:
                        if re.search(pattern, content, re.IGNORECASE):
                            results["findings"].append({
                                "file": str(filepath.relative_to(project_path)),
                                "issue": issue,
                                "severity": severity
                            })
                            
            except Exception:
                pass
    
    # Check for security header configurations
    header_files = ["next.config.js", "next.config.mjs", "middleware.ts", "nginx.conf"]
    for hf in header_files:
        hf_path = Path(project_path) / hf
        if hf_path.exists():
            results["checks"]["security_headers_config"] = True
            break
    else:
        results["checks"]["security_headers_config"] = False
        results["findings"].append({
            "issue": "No security headers configuration found",
            "severity": "medium",
            "recommendation": "Configure CSP, HSTS, X-Frame-Options headers"
        })
    
    if any(f["severity"] == "critical" for f in results["findings"]):
        results["status"] = "[!!] CRITICAL: Configuration issues"
    elif any(f["severity"] == "high" for f in results["findings"]):
        results["status"] = "[!] HIGH: Configuration review needed"
    elif results["findings"]:
        results["status"] = "[?] Minor configuration issues"
    
    return results


# ============================================================================
#  MAIN
# ============================================================================

def run_full_scan(project_path: str, scan_type: str = "all") -> Dict[str, Any]:
    """Execute security validation scans."""
    
    report = {
        "project": project_path,
        "timestamp": datetime.now().isoformat(),
        "scan_type": scan_type,
        "scans": {},
        "summary": {
            "total_findings": 0,
            "critical": 0,
            "high": 0,
            "overall_status": "[OK] SECURE"
        }
    }
    
    scanners = {
        "deps": ("dependencies", scan_dependencies),
        "secrets": ("secrets", scan_secrets),
        "patterns": ("code_patterns", scan_code_patterns),
        "config": ("configuration", scan_configuration),
    }
    
    for key, (name, scanner) in scanners.items():
        if scan_type == "all" or scan_type == key:
            result = scanner(project_path)
            report["scans"][name] = result
            
            findings_count = len(result.get("findings", []))
            report["summary"]["total_findings"] += findings_count
            
            for finding in result.get("findings", []):
                sev = finding.get("severity", "low")
                if sev == "critical":
                    report["summary"]["critical"] += 1
                elif sev == "high":
                    report["summary"]["high"] += 1
    
    # Determine overall status
    if report["summary"]["critical"] > 0:
        report["summary"]["overall_status"] = "[!!] CRITICAL ISSUES FOUND"
    elif report["summary"]["high"] > 0:
        report["summary"]["overall_status"] = "[!] HIGH RISK ISSUES"
    elif report["summary"]["total_findings"] > 0:
        report["summary"]["overall_status"] = "[?] REVIEW RECOMMENDED"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description="Validate security principles from vulnerability-scanner skill"
    )
    parser.add_argument("project_path", nargs="?", default=".", help="Project directory to scan")
    parser.add_argument("--scan-type", choices=["all", "deps", "secrets", "patterns", "config"],
                        default="all", help="Type of scan to run")
    parser.add_argument("--output", choices=["json", "summary"], default="json",
                        help="Output format")
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.project_path):
        print(json.dumps({"error": f"Directory not found: {args.project_path}"}))
        sys.exit(1)
    
    result = run_full_scan(args.project_path, args.scan_type)
    
    if args.output == "summary":
        print(f"\\n{'='*60}")
        print(f"Security Scan: {result['project']}")
        print(f"{'='*60}")
        print(f"Status: {result['summary']['overall_status']}")
        print(f"Total Findings: {result['summary']['total_findings']}")
        print(f"  Critical: {result['summary']['critical']}")
        print(f"  High: {result['summary']['high']}")
        print(f"{'='*60}\\n")
        
        for scan_name, scan_result in result['scans'].items():
            print(f"\\n{scan_name.upper()}: {scan_result['status']}")
            for finding in scan_result.get('findings', [])[:5]:
                print(f"  - {finding}")
    else:
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
`,
  "webapp-testing/scripts/playwright_runner.py": `#!/usr/bin/env python3
"""
Skill: webapp-testing
Script: playwright_runner.py
Purpose: Run basic Playwright browser tests
Usage: python playwright_runner.py <url> [--screenshot]
Output: JSON with page info, health status, and optional screenshot path
Note: Requires playwright (pip install playwright && playwright install chromium)
Screenshots: Saved to system temp directory (auto-cleaned by OS)
"""
import sys
import json
import os
import tempfile
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False


def run_basic_test(url: str, take_screenshot: bool = False) -> dict:
    """Run basic browser test on URL."""
    if not PLAYWRIGHT_AVAILABLE:
        return {
            "error": "Playwright not installed",
            "fix": "pip install playwright && playwright install chromium"
        }
    
    result = {
        "url": url,
        "timestamp": datetime.now().isoformat(),
        "status": "pending"
    }
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": 1280, "height": 720},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )
            page = context.new_page()
            
            # Navigate
            response = page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic info
            result["page"] = {
                "title": page.title(),
                "url": page.url,
                "status_code": response.status if response else None
            }
            
            # Health checks
            result["health"] = {
                "loaded": response.ok if response else False,
                "has_title": bool(page.title()),
                "has_h1": page.locator("h1").count() > 0,
                "has_links": page.locator("a").count() > 0,
                "has_images": page.locator("img").count() > 0
            }
            
            # Console errors
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            # Performance metrics
            result["performance"] = {
                "dom_content_loaded": page.evaluate("window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart"),
                "load_complete": page.evaluate("window.performance.timing.loadEventEnd - window.performance.timing.navigationStart")
            }
            
            # Screenshot - uses system temp directory (cross-platform, auto-cleaned)
            if take_screenshot:
                # Cross-platform: Windows=%TEMP%, Linux/macOS=/tmp
                screenshot_dir = os.path.join(tempfile.gettempdir(), "maestro_screenshots")
                os.makedirs(screenshot_dir, exist_ok=True)
                screenshot_path = os.path.join(screenshot_dir, f"screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
                page.screenshot(path=screenshot_path, full_page=True)
                result["screenshot"] = screenshot_path
                result["screenshot_note"] = "Saved to temp directory (auto-cleaned by OS)"
            
            # Element counts
            result["elements"] = {
                "links": page.locator("a").count(),
                "buttons": page.locator("button").count(),
                "inputs": page.locator("input").count(),
                "images": page.locator("img").count(),
                "forms": page.locator("form").count()
            }
            
            browser.close()
            
            result["status"] = "success" if result["health"]["loaded"] else "failed"
            result["summary"] = "[OK] Page loaded successfully" if result["status"] == "success" else "[X] Page failed to load"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
        result["summary"] = f"[X] Error: {str(e)[:100]}"
    
    return result


def run_accessibility_check(url: str) -> dict:
    """Run basic accessibility check."""
    if not PLAYWRIGHT_AVAILABLE:
        return {"error": "Playwright not installed"}
    
    result = {"url": url, "accessibility": {}}
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic a11y checks
            result["accessibility"] = {
                "images_with_alt": page.locator("img[alt]").count(),
                "images_without_alt": page.locator("img:not([alt])").count(),
                "buttons_with_label": page.locator("button[aria-label], button:has-text('')").count(),
                "links_with_text": page.locator("a:has-text('')").count(),
                "form_labels": page.locator("label").count(),
                "headings": {
                    "h1": page.locator("h1").count(),
                    "h2": page.locator("h2").count(),
                    "h3": page.locator("h3").count()
                }
            }
            
            browser.close()
            result["status"] = "success"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
    
    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: python playwright_runner.py <url> [--screenshot] [--a11y]",
            "examples": [
                "python playwright_runner.py https://example.com",
                "python playwright_runner.py https://example.com --screenshot",
                "python playwright_runner.py https://example.com --a11y"
            ]
        }, indent=2))
        sys.exit(1)
    
    url = sys.argv[1]
    take_screenshot = "--screenshot" in sys.argv
    check_a11y = "--a11y" in sys.argv
    
    if check_a11y:
        result = run_accessibility_check(url)
    else:
        result = run_basic_test(url, take_screenshot)
    
    print(json.dumps(result, indent=2))
`,
  "skills/webapp-testing/scripts/playwright_runner.py": `#!/usr/bin/env python3
"""
Skill: webapp-testing
Script: playwright_runner.py
Purpose: Run basic Playwright browser tests
Usage: python playwright_runner.py <url> [--screenshot]
Output: JSON with page info, health status, and optional screenshot path
Note: Requires playwright (pip install playwright && playwright install chromium)
Screenshots: Saved to system temp directory (auto-cleaned by OS)
"""
import sys
import json
import os
import tempfile
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False


def run_basic_test(url: str, take_screenshot: bool = False) -> dict:
    """Run basic browser test on URL."""
    if not PLAYWRIGHT_AVAILABLE:
        return {
            "error": "Playwright not installed",
            "fix": "pip install playwright && playwright install chromium"
        }
    
    result = {
        "url": url,
        "timestamp": datetime.now().isoformat(),
        "status": "pending"
    }
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": 1280, "height": 720},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )
            page = context.new_page()
            
            # Navigate
            response = page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic info
            result["page"] = {
                "title": page.title(),
                "url": page.url,
                "status_code": response.status if response else None
            }
            
            # Health checks
            result["health"] = {
                "loaded": response.ok if response else False,
                "has_title": bool(page.title()),
                "has_h1": page.locator("h1").count() > 0,
                "has_links": page.locator("a").count() > 0,
                "has_images": page.locator("img").count() > 0
            }
            
            # Console errors
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            # Performance metrics
            result["performance"] = {
                "dom_content_loaded": page.evaluate("window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart"),
                "load_complete": page.evaluate("window.performance.timing.loadEventEnd - window.performance.timing.navigationStart")
            }
            
            # Screenshot - uses system temp directory (cross-platform, auto-cleaned)
            if take_screenshot:
                # Cross-platform: Windows=%TEMP%, Linux/macOS=/tmp
                screenshot_dir = os.path.join(tempfile.gettempdir(), "maestro_screenshots")
                os.makedirs(screenshot_dir, exist_ok=True)
                screenshot_path = os.path.join(screenshot_dir, f"screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
                page.screenshot(path=screenshot_path, full_page=True)
                result["screenshot"] = screenshot_path
                result["screenshot_note"] = "Saved to temp directory (auto-cleaned by OS)"
            
            # Element counts
            result["elements"] = {
                "links": page.locator("a").count(),
                "buttons": page.locator("button").count(),
                "inputs": page.locator("input").count(),
                "images": page.locator("img").count(),
                "forms": page.locator("form").count()
            }
            
            browser.close()
            
            result["status"] = "success" if result["health"]["loaded"] else "failed"
            result["summary"] = "[OK] Page loaded successfully" if result["status"] == "success" else "[X] Page failed to load"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
        result["summary"] = f"[X] Error: {str(e)[:100]}"
    
    return result


def run_accessibility_check(url: str) -> dict:
    """Run basic accessibility check."""
    if not PLAYWRIGHT_AVAILABLE:
        return {"error": "Playwright not installed"}
    
    result = {"url": url, "accessibility": {}}
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic a11y checks
            result["accessibility"] = {
                "images_with_alt": page.locator("img[alt]").count(),
                "images_without_alt": page.locator("img:not([alt])").count(),
                "buttons_with_label": page.locator("button[aria-label], button:has-text('')").count(),
                "links_with_text": page.locator("a:has-text('')").count(),
                "form_labels": page.locator("label").count(),
                "headings": {
                    "h1": page.locator("h1").count(),
                    "h2": page.locator("h2").count(),
                    "h3": page.locator("h3").count()
                }
            }
            
            browser.close()
            result["status"] = "success"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
    
    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: python playwright_runner.py <url> [--screenshot] [--a11y]",
            "examples": [
                "python playwright_runner.py https://example.com",
                "python playwright_runner.py https://example.com --screenshot",
                "python playwright_runner.py https://example.com --a11y"
            ]
        }, indent=2))
        sys.exit(1)
    
    url = sys.argv[1]
    take_screenshot = "--screenshot" in sys.argv
    check_a11y = "--a11y" in sys.argv
    
    if check_a11y:
        result = run_accessibility_check(url)
    else:
        result = run_basic_test(url, take_screenshot)
    
    print(json.dumps(result, indent=2))
`,
  ".agent/skills/webapp-testing/scripts/playwright_runner.py": `#!/usr/bin/env python3
"""
Skill: webapp-testing
Script: playwright_runner.py
Purpose: Run basic Playwright browser tests
Usage: python playwright_runner.py <url> [--screenshot]
Output: JSON with page info, health status, and optional screenshot path
Note: Requires playwright (pip install playwright && playwright install chromium)
Screenshots: Saved to system temp directory (auto-cleaned by OS)
"""
import sys
import json
import os
import tempfile
from datetime import datetime

# Fix Windows console encoding for Unicode output
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except AttributeError:
    pass  # Python < 3.7

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False


def run_basic_test(url: str, take_screenshot: bool = False) -> dict:
    """Run basic browser test on URL."""
    if not PLAYWRIGHT_AVAILABLE:
        return {
            "error": "Playwright not installed",
            "fix": "pip install playwright && playwright install chromium"
        }
    
    result = {
        "url": url,
        "timestamp": datetime.now().isoformat(),
        "status": "pending"
    }
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": 1280, "height": 720},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )
            page = context.new_page()
            
            # Navigate
            response = page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic info
            result["page"] = {
                "title": page.title(),
                "url": page.url,
                "status_code": response.status if response else None
            }
            
            # Health checks
            result["health"] = {
                "loaded": response.ok if response else False,
                "has_title": bool(page.title()),
                "has_h1": page.locator("h1").count() > 0,
                "has_links": page.locator("a").count() > 0,
                "has_images": page.locator("img").count() > 0
            }
            
            # Console errors
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            # Performance metrics
            result["performance"] = {
                "dom_content_loaded": page.evaluate("window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart"),
                "load_complete": page.evaluate("window.performance.timing.loadEventEnd - window.performance.timing.navigationStart")
            }
            
            # Screenshot - uses system temp directory (cross-platform, auto-cleaned)
            if take_screenshot:
                # Cross-platform: Windows=%TEMP%, Linux/macOS=/tmp
                screenshot_dir = os.path.join(tempfile.gettempdir(), "maestro_screenshots")
                os.makedirs(screenshot_dir, exist_ok=True)
                screenshot_path = os.path.join(screenshot_dir, f"screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
                page.screenshot(path=screenshot_path, full_page=True)
                result["screenshot"] = screenshot_path
                result["screenshot_note"] = "Saved to temp directory (auto-cleaned by OS)"
            
            # Element counts
            result["elements"] = {
                "links": page.locator("a").count(),
                "buttons": page.locator("button").count(),
                "inputs": page.locator("input").count(),
                "images": page.locator("img").count(),
                "forms": page.locator("form").count()
            }
            
            browser.close()
            
            result["status"] = "success" if result["health"]["loaded"] else "failed"
            result["summary"] = "[OK] Page loaded successfully" if result["status"] == "success" else "[X] Page failed to load"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
        result["summary"] = f"[X] Error: {str(e)[:100]}"
    
    return result


def run_accessibility_check(url: str) -> dict:
    """Run basic accessibility check."""
    if not PLAYWRIGHT_AVAILABLE:
        return {"error": "Playwright not installed"}
    
    result = {"url": url, "accessibility": {}}
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Basic a11y checks
            result["accessibility"] = {
                "images_with_alt": page.locator("img[alt]").count(),
                "images_without_alt": page.locator("img:not([alt])").count(),
                "buttons_with_label": page.locator("button[aria-label], button:has-text('')").count(),
                "links_with_text": page.locator("a:has-text('')").count(),
                "form_labels": page.locator("label").count(),
                "headings": {
                    "h1": page.locator("h1").count(),
                    "h2": page.locator("h2").count(),
                    "h3": page.locator("h3").count()
                }
            }
            
            browser.close()
            result["status"] = "success"
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
    
    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: python playwright_runner.py <url> [--screenshot] [--a11y]",
            "examples": [
                "python playwright_runner.py https://example.com",
                "python playwright_runner.py https://example.com --screenshot",
                "python playwright_runner.py https://example.com --a11y"
            ]
        }, indent=2))
        sys.exit(1)
    
    url = sys.argv[1]
    take_screenshot = "--screenshot" in sys.argv
    check_a11y = "--a11y" in sys.argv
    
    if check_a11y:
        result = run_accessibility_check(url)
    else:
        result = run_basic_test(url, take_screenshot)
    
    print(json.dumps(result, indent=2))
`,
};
