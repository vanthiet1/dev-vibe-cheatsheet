export function getWebappTestingTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  // Static compilation fallback
  return metadata + `# Web App Testing

> Discover and test everything. Leave no route untested.

## 🔧 Runtime Scripts

**Execute these for automated browser testing:**

| Script | Purpose | Usage |
|--------|---------|-------|
| \`scripts/playwright_runner.py\` | Basic browser test | \`python scripts/playwright_runner.py https://example.com\` |
| | With screenshot | \`python scripts/playwright_runner.py <url> --screenshot\` |
| | Accessibility check | \`python scripts/playwright_runner.py <url> --a11y\` |

**Requires:** \`pip install playwright && playwright install chromium\`

---

## 1. Deep Audit Approach

### Discovery First

| Target | How to Find |
|--------|-------------|
| Routes | Scan app/, pages/, router files |
| API endpoints | Grep for HTTP methods |
| Components | Find component directories |
| Features | Read documentation |

### Systematic Testing

1. **Map** - List all routes/APIs
2. **Scan** - Verify they respond
3. **Test** - Cover critical paths

---

## 2. Testing Pyramid for Web

\`\`\`
        /\\          E2E (Few)
       /  \\         Critical user flows
      /----\\
     /      \\       Integration (Some)
    /--------\\      API, data flow
   /          \\
  /------------\\    Component (Many)
                    Individual UI pieces
\`\`\`

---

## 3. E2E Test Principles

### What to Test

| Priority | Tests |
|----------|-------|
| 1 | Happy path user flows |
| 2 | Authentication flows |
| 3 | Critical business actions |
| 4 | Error handling |

### E2E Best Practices

| Practice | Why |
|----------|-----|
| Use data-testid | Stable selectors |
| Wait for elements | Avoid flaky tests |
| Clean state | Independent tests |
| Avoid implementation details | Test user behavior |

---

## 4. Playwright Principles

### Core Concepts

| Concept | Use |
|---------|-----|
| Page Object Model | Encapsulate page logic |
| Fixtures | Reusable test setup |
| Assertions | Built-in auto-wait |
| Trace Viewer | Debug failures |

### Configuration

| Setting | Recommendation |
|---------|----------------|
| Retries | 2 on CI |
| Trace | on-first-retry |
| Screenshots | on-failure |
| Video | retain-on-failure |

---

## 5. Visual Testing

### When to Use

| Scenario | Value |
|----------|-------|
| Design system | High |
| Marketing pages | High |
| Component library | Medium |
| Dynamic content | Lower |

### Strategy

- Baseline screenshots
- Compare on changes
- Review visual diffs
- Update intentional changes

---

## 6. API Testing Principles

### Coverage Areas

| Area | Tests |
|------|-------|
| Status codes | 200, 400, 404, 500 |
| Response shape | Matches schema |
| Error messages | User-friendly |
| Edge cases | Empty, large, special chars |

---

## 7. Test Organization

### File Structure

\`\`\`
tests/
├── e2e/           # Full user flows
├── integration/   # API, data
├── component/     # UI units
└── fixtures/      # Shared data
\`\`\`

### Naming Convention

| Pattern | Example |
|---------|---------|
| Feature-based | \`login.spec.ts\` |
| Descriptive | \`user-can-checkout.spec.ts\` |

---

## 8. CI Integration

### Pipeline Steps

1. Install dependencies
2. Install browsers
3. Run tests
4. Upload artifacts (traces, screenshots)

### Parallelization

| Strategy | Use |
|----------|-----|
| Per file | Playwright default |
| Sharding | Large suites |
| Workers | Multiple browsers |

---

## 9. Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Test implementation | Test behavior |
| Hardcode waits | Use auto-wait |
| Skip cleanup | Isolate tests |
| Ignore flaky tests | Fix root cause |

---

> **Remember:** E2E tests are expensive. Use them for critical paths only.

## CLI Automation Script & MCP Integration
This skill includes automated checker scripts:

- **File Path**: \`.agent/skills/webapp-testing/scripts/playwright_runner.py\`
- **Execution Command**: \`python .agent/skills/webapp-testing/scripts/playwright_runner.py <project_path>\`
- **Actual Script Source Code**:
\`\`\`python
#!/usr/bin/env python3
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

\`\`\`
`;
}
