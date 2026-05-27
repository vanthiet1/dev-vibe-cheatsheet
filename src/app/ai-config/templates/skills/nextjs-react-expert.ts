export function getNextjsReactExpertTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  // Static compilation fallback
  return metadata + `# Next.js & React Performance Expert

> **From Vercel Engineering** - 57 optimization rules prioritized by impact
> **Philosophy:** Eliminate waterfalls first, optimize bundles second, then micro-optimize.

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check the content map below and load what you need.

> 🔴 **For performance reviews: Start with CRITICAL sections (1-2), then move to HIGH/MEDIUM.**

---

## 📑 Content Map

| File                                    | Impact             | Rules    | When to Read                                                    |
| --------------------------------------- | ------------------ | -------- | --------------------------------------------------------------- |
| \`1-async-eliminating-waterfalls.md\`     | 🔴 **CRITICAL**    | 5 rules  | Slow page loads, sequential API calls, data fetching waterfalls |
| \`2-bundle-bundle-size-optimization.md\`  | 🔴 **CRITICAL**    | 5 rules  | Large bundle size, slow Time to Interactive, First Load issues  |
| \`3-server-server-side-performance.md\`   | 🟠 **HIGH**        | 7 rules  | Slow SSR, API route optimization, server-side waterfalls        |
| \`4-client-client-side-data-fetching.md\` | 🟡 **MEDIUM-HIGH** | 4 rules  | Client data management, SWR patterns, deduplication             |
| \`5-rerender-re-render-optimization.md\`  | 🟡 **MEDIUM**      | 12 rules | Excessive re-renders, React performance, memoization            |
| \`6-rendering-rendering-performance.md\`  | 🟡 **MEDIUM**      | 9 rules  | Rendering bottlenecks, virtualization, image optimization       |
| \`7-js-javascript-performance.md\`        | ⚪ **LOW-MEDIUM**  | 12 rules | Micro-optimizations, caching, loop performance                  |
| \`8-advanced-advanced-patterns.md\`       | 🔵 **VARIABLE**    | 3 rules  | Advanced React patterns, useLatest, init-once                   |
| \`9-cache-components.md\`                | 🔴 **CRITICAL**    | 4 sections | **Next.js 16+ Only**: \`use cache\`, \`cacheLife\`, PPR, \`cacheTag\` |

**Total: 57 rules across 8 categories**

---

## 🚀 Quick Decision Tree

**What's your performance issue?**

\`\`\`
🐌 Slow page loads / Long Time to Interactive
  → Read Section 1: Eliminating Waterfalls
  → Read Section 2: Bundle Size Optimization

📦 Large bundle size (> 200KB)
  → Read Section 2: Bundle Size Optimization
  → Check: Dynamic imports, barrel imports, tree-shaking

🖥️ Slow Server-Side Rendering
  → Read Section 3: Server-Side Performance
  → Check: Parallel data fetching, streaming

🔄 Too many re-renders / UI lag
  → Read Section 5: Re-render Optimization
  → Check: React.memo, useMemo, useCallback

🎨 Rendering performance issues
  → Read Section 6: Rendering Performance
  → Check: Virtualization, layout thrashing

🌐 Client-side data fetching problems
  → Read Section 4: Client-Side Data Fetching
  → Check: SWR deduplication, localStorage

✨ Need advanced patterns
  → Read Section 8: Advanced Patterns

🚀 **Next.js 16+ Performance (Caching & PPR)**
  → Read Section 9: Cache Components
\`\`\`

---

## 📊 Impact Priority Guide

**Use this order when doing comprehensive optimization:**

\`\`\`
1️⃣ CRITICAL (Biggest Gains - Do First):
   ├─ Section 1: Eliminating Waterfalls
   │  └─ Each waterfall adds full network latency (100-500ms+)
   └─ Section 2: Bundle Size Optimization
      └─ Affects Time to Interactive and Largest Contentful Paint

2️⃣ HIGH (Significant Impact - Do Second):
   └─ Section 3: Server-Side Performance
      └─ Eliminates server-side waterfalls, faster response times

3️⃣ MEDIUM (Moderate Gains - Do Third):
   ├─ Section 4: Client-Side Data Fetching
   ├─ Section 5: Re-render Optimization
   └─ Section 6: Rendering Performance

4️⃣ LOW (Polish - Do Last):
   ├─ Section 7: JavaScript Performance
   └─ Section 8: Advanced Patterns

🔥 **MODERN (Next.js 16+):**
   └─ Section 9: Cache Components (Replaces most traditional revalidation)
\`\`\`

---

## 🔗 Related Skills

| Need                    | Skill                             |
| ----------------------- | --------------------------------- |
| API design patterns     | \`@[skills/api-patterns]\`          |
| Database optimization   | \`@[skills/database-design]\`       |
| Testing strategies      | \`@[skills/testing-patterns]\`      |
| UI/UX design principles | \`@[skills/frontend-design]\`       |
| TypeScript patterns     | \`@[skills/typescript-expert]\`     |
| Deployment & DevOps     | \`@[skills/deployment-procedures]\` |

---

## ✅ Performance Review Checklist

Before shipping to production:

**Critical (Must Fix):**

- [ ] No sequential data fetching (waterfalls eliminated)
- [ ] Bundle size < 200KB for main bundle
- [ ] No barrel imports in app code
- [ ] Dynamic imports used for large components
- [ ] Parallel data fetching where possible

**High Priority:**

- [ ] Server components used where appropriate
- [ ] API routes optimized (no N+1 queries)
- [ ] Suspense boundaries for data fetching
- [ ] Static generation used where possible

**Medium Priority:**

- [ ] Expensive computations memoized
- [ ] List rendering virtualized (if > 100 items)
- [ ] Images optimized with next/image
- [ ] No unnecessary re-renders

**Low Priority (Polish):**

- [ ] Hot path loops optimized
- [ ] RegExp patterns hoisted
- [ ] Property access cached in loops

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Use sequential \`await\` for independent operations
- ❌ Import entire libraries when you need one function
- ❌ Use barrel exports (\`index.ts\` re-exports) in app code
- ❌ Skip dynamic imports for large components/libraries
- ❌ Fetch data in useEffect without deduplication
- ❌ Forget to memoize expensive computations
- ❌ Use client components when server components work

**DO:**

- ✅ Fetch data in parallel with \`Promise.all()\`
- ✅ Use dynamic imports: \`const Comp = dynamic(() => import('./Heavy'))\`
- ✅ Import directly: \`import { specific } from 'library/specific'\`
- ✅ Use Suspense boundaries for better UX
- ✅ Leverage React Server Components
- ✅ Measure performance before optimizing
- ✅ Use Next.js built-in optimizations (next/image, next/font)

---

## 🎯 How to Use This Skill

### For New Features:

1. Check **Section 1 & 2** while building (prevent waterfalls, keep bundle small)
2. Use server components by default (Section 3)
3. Apply memoization for expensive operations (Section 5)

### For Performance Reviews:

1. Start with **Section 1** (waterfalls = biggest impact)
2. Then **Section 2** (bundle size)
3. Then **Section 3** (server-side)
4. Finally other sections as needed

### For Debugging Slow Performance:

1. Identify the symptom (slow load, lag, etc.)
2. Use Quick Decision Tree above
3. Read relevant section
4. Apply fixes in priority order

---

## 📚 Learning Path

**Beginner (Focus on Critical):**
→ Section 1: Eliminating Waterfalls
→ Section 2: Bundle Size Optimization

**Intermediate (Add High Priority):**
→ Section 3: Server-Side Performance
→ Section 5: Re-render Optimization

**Advanced (Full Optimization):**
→ All sections + Section 8: Advanced Patterns

---

## 🔍 Validation Script

| Script                                 | Purpose                     | Command                                                      |
| -------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| \`scripts/react_performance_checker.py\` | Automated performance audit | \`python scripts/react_performance_checker.py <project_path>\` |

---

## 📖 Section Details

### Section 1: Eliminating Waterfalls (CRITICAL)

**Impact:** Each waterfall adds 100-500ms+ latency
**Key Concepts:** Parallel fetching, Promise.all(), Suspense boundaries, preloading

### Section 2: Bundle Size Optimization (CRITICAL)

**Impact:** Directly affects Time to Interactive, Largest Contentful Paint
**Key Concepts:** Dynamic imports, tree-shaking, barrel import avoidance

### Section 3: Server-Side Performance (HIGH)

**Impact:** Faster server responses, better SEO
**Key Concepts:** Parallel server fetching, streaming, API route optimization

### Section 4: Client-Side Data Fetching (MEDIUM-HIGH)

**Impact:** Reduces redundant requests, better UX
**Key Concepts:** SWR deduplication, localStorage caching, event listeners

### Section 5: Re-render Optimization (MEDIUM)

**Impact:** Smoother UI, less wasted computation
**Key Concepts:** React.memo, useMemo, useCallback, component structure

### Section 6: Rendering Performance (MEDIUM)

**Impact:** Better rendering efficiency
**Key Concepts:** Virtualization, image optimization, layout thrashing

### Section 7: JavaScript Performance (LOW-MEDIUM)

**Impact:** Incremental improvements in hot paths
**Key Concepts:** Loop optimization, caching, RegExp hoisting

### Section 8: Advanced Patterns (VARIABLE)

**Impact:** Specific use cases
**Key Concepts:** useLatest hook, init-once patterns, event handler refs

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Measure first** - Use React DevTools Profiler, Chrome DevTools
2. **Biggest impact first** - Waterfalls → Bundle → Server → Micro
3. **Don't over-optimize** - Focus on real bottlenecks
4. **Use platform features** - Next.js has optimizations built-in
5. **Think about users** - Real-world conditions matter

**Performance Mindset:**

- Every \`await\` in sequence = potential waterfall
- Every \`import\` = potential bundle bloat
- Every re-render = wasted computation (if unnecessary)
- Server components = less JavaScript to ship
- Measure, don't guess

---

**Source:** Vercel Engineering
**Date:** January 2026
**Version:** 1.0.0
**Total Rules:** 57 across 8 categories

## CLI Automation Script & MCP Integration
This skill includes automated checker scripts:

- **File Path**: \`.agent/skills/nextjs-react-expert/scripts/convert_rules.py\`
- **Execution Command**: \`python .agent/skills/nextjs-react-expert/scripts/convert_rules.py <project_path>\`
- **Actual Script Source Code**:
\`\`\`python
#!/usr/bin/env python3
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

\`\`\`

- **File Path**: \`.agent/skills/nextjs-react-expert/scripts/react_performance_checker.py\`
- **Execution Command**: \`python .agent/skills/nextjs-react-expert/scripts/react_performance_checker.py <project_path>\`
- **Actual Script Source Code**:
\`\`\`python
#!/usr/bin/env python3
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

\`\`\`
`;
}
