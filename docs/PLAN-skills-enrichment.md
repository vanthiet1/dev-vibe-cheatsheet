# PLAN: Expanded AI Rules Hub - Language Capitalization, 8 Advanced Skills, and High-Fidelity Copyable Sections (## 1. to ## 10.)

This plan details the capitalization of programming language options, the addition of 8 major advanced skills into both CLI and IDE tabs, and the generation of highly detailed contents from `## 1.` up to `## 10.` for all skills.

## 1. Goal
To provide clean capitalized language names in the UI, integrate 8 robust developer skills, and supply extremely detailed developer manuals featuring exactly 10 comprehensive sections (`## 1.` to `## 10.`) for maximum copy-paste utility.

## 2. Selected Tech Stack Options
*   **Languages:** TypeScript, JavaScript, Python, Go, Rust, C#
*   **Grid Adjustment:** restyle from `grid-cols-3` to `grid-cols-2` to support full capitalized labels comfortably.

## 3. List of 8 Skills to Add
These will be active in BOTH Antigravity IDE and CLI modes and render in the Workspace Tree sidebar:
1.  **Clean Code** (`skills/clean-code/SKILL.md`)
2.  **Security Scanner** (`skills/security-scanner/SKILL.md`)
3.  **SEO Fundamentals** (`skills/seo-fundamentals/SKILL.md`)
4.  **I18n Localization** (`skills/i18n-localization/SKILL.md`)
5.  **PowerShell Windows** (`skills/powershell-windows/SKILL.md`)
6.  **Git Workflows** (`skills/git-workflows/SKILL.md`)
7.  **Performance Profiling** (`skills/performance-profiling/SKILL.md`)
8.  **Clean Architecture** (`skills/clean-architecture/SKILL.md`)

## 4. Structure of Sections (## 1. to ## 10.) for All Skills
Each generated skill will have exactly 10 extensive sections containing system directives, detailed best practices, and code blocks tailored to the selected programming language:
*   **## 1.** Nguyên lý Thiết kế Cốt lõi / Core Design Principles
*   **## 2.** Tiêu chuẩn Cú pháp & Định kiểu / Syntax & Typing Standards
*   **## 3.** Xử lý Bất đồng bộ & Luồng Dữ liệu / Async & Data Flow Management
*   **## 4.** Tối ưu hóa Hiệu năng Chuyên sâu / Deep Performance Optimization
*   **## 5.** Cơ chế Bảo mật & Làm sạch Đầu vào / Security & Input Sanitization
*   **## 6.** Kiến trúc & Bố trí Thư mục / Layout Architecture & Folder Structure
*   **## 7.** Mẫu Code Ví dụ Thực tế chuẩn Production / Production-Ready Code Example
*   **## 8.** Quy trình Kiểm thử & Mocking / Testing & Mocking Strategy
*   **## 9.** Kiểm soát Ngoại lệ & Sửa lỗi / Robust Exception Handling & Debug Flow
*   **## 10.** Tự động hóa qua Dòng lệnh CLI & CI/CD / CLI & CI/CD Automation Flow

---

## 5. Proposed Code Changes

### A. UI Configuration Update
*   **File:** [page.tsx](file:///d:/dev-cheatsheet/src/app/ai-config/page.tsx)
    *   Change language grid class: `grid-cols-3` -> `grid-cols-2`.
    *   Rename labels: `TS` -> `TypeScript`, `JS` -> `JavaScript`, `Py` -> `Python`.
    *   Push all 8 skills dynamically into `dynamicSkills` list inside the `filesByTab` helper:
        *   `clean-code/SKILL.md`
        *   `security-scanner/SKILL.md`
        *   `seo-fundamentals/SKILL.md`
        *   `i18n-localization/SKILL.md`
        *   `powershell-windows/SKILL.md`
        *   `git-workflows/SKILL.md`
        *   `performance-profiling/SKILL.md`
        *   `clean-architecture/SKILL.md`

### B. Core Generation Logic Update
*   **File:** [rules-templates.ts](file:///d:/dev-cheatsheet/src/app/ai-config/rules-templates.ts)
    *   Implement dedicated matching blocks for all 8 skill files.
    *   Flesh out rich, specialized templates for both Vietnamese and English, generating the 10 detailed sections containing copyable guidelines and actual code blocks.

---

## 6. Verification Plan

### Automated Verification
*   `npx tsc --noEmit` (0 Type Errors)
*   `npm run build` (Successful Next.js static generation compiling all routes)

### Manual Verification
1.  Open `/ai-config` in the browser.
2.  Confirm that the language grid displays full capitalized labels.
3.  Click through all 8 skills in the Workspace Tree.
4.  Verify that each page preview renders a deep 10-section layout (`## 1.` through `## 10.`) containing direct copyable resources.
