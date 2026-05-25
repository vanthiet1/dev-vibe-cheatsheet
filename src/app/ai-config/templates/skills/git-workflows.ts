export function getGitWorkflowsTemplate(
  formattedSlug: string,
  languageLabel: string,
  isVi: boolean
): string {
  if (isVi) {
    return `# Kỹ năng Git Workflow & Quản lý Nhánh (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Trunk-Based / Git Flow:** Áp dụng chiến lược phân nhánh rõ ràng. Phát triển tính năng mới trên nhánh feature, chỉ merge vào main khi qua kiểm thử.
- **Conventional Commits:** Định dạng tiêu chuẩn cho mọi thông điệp commit (ví dụ: \`feat: add auth\`, \`fix: resolve memory leak\`).
- **Lịch sử Git sạch đẹp:** Khuyến khích rebase hoặc squash commits trước khi merge để giữ lịch sử git rõ ràng.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Tên nhánh chuẩn chỉnh: \`feature/name\`, \`bugfix/name\`, \`hotfix/name\`.
- Đảm bảo file \`.gitignore\` được định nghĩa chính xác cho ${languageLabel}, loại bỏ file tạm, tệp bảo mật \`.env\`.
- Sử dụng Conventional Commits giúp việc sinh tự động changelog hiệu quả.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Đồng bộ hóa các luồng công việc từ local lên remote repository an toàn qua push/pull.
- Thực thi quy trình kiểm tra bất đồng bộ thông qua Pull Request, khóa merge trực tiếp cho đến khi CI pass.
- Phân biệt rõ rệt việc rebase (đồng bộ tuyến tính) và merge (lưu lại điểm tích hợp).

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Sử dụng Git LFS (Large File Storage) để quản lý các tệp nhị phân lớn, tránh làm phình dung lượng repository.
- Dọn dẹp cục bộ định kỳ bằng các lệnh pruning các nhánh tracking rác để giải phóng tài nguyên.
- Hạn chế clone toàn bộ lịch sử bằng tính năng shallow clone (\`--depth 1\`) trong CI/CD.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Tuyệt đối nghiêm cấm commit mật khẩu, khóa SSH, API Keys, tệp cấu hình chứa thông tin nhạy cảm.
- Tự động quét và phát hiện secrets trước khi commit bằng Husky kết hợp GitLeaks hooks.
- Ký commits bằng mã khóa GPG để chứng thực danh tính lập trình viên đóng góp mã nguồn.

## 6. Kiến trúc & Bố trí Thư mục
- Đặt các cấu hình tự động hóa và hooks trong thư mục chuyên biệt:
  \`\`\`
  ├── .github/
  │   └── workflows/
  │       └── ci.yml        # Kịch bản CI tự động hóa
  ├── .husky/               # Cấu hình Git Hooks
  └── .gitignore            # Danh sách loại trừ Git
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`bash
#!/bin/sh
# File hook pre-commit (.husky/pre-commit) tự động kiểm tra định dạng và linter trước khi cho phép commit
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit quality gates..."

# 1. Chạy static type check và linter
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint checking failed. Commit aborted."
  exit 1
fi

# 2. Chạy test suite nhanh
npm run test:related
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ All quality gates passed! Commit proceeding..."
exit 0
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết kịch bản tự động hóa luồng PR kiểm thử chất lượng code (GitHub Actions runner).
- Tích hợp kiểm tra chất lượng code qua SonarCloud / CodeCov sau mỗi lần merge PR.
- Mock môi trường staging cục bộ để kiểm tra các hook hoạt động trước khi deploy.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Giải xung đột merge (Merge Conflicts) một cách hệ thống bằng các công cụ so sánh trực quan tiêu chuẩn.
- Sử dụng \`git reflog\` và các thao tác reset an toàn để khôi phục các commit nhánh vô tình bị xóa.
- Sử dụng \`git rebase --abort\` để hủy bỏ an toàn các tiến trình rebase thất bại mà không làm mất công sức viết mã cục bộ.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Bắt buộc xác thực pre-commit bằng các công cụ như Husky để rà soát mã nguồn tại máy cục bộ.
- Xây dựng luồng xác thực tự động bằng GitHub Actions chạy các trình kiểm tra cú pháp và bộ kiểm thử khi đẩy mã.
- Thiết lập quy tắc bảo vệ nhánh để ngăn chặn đẩy mã trực tiếp lên nhánh production và yêu cầu các bản dựng phải thành công.`;
  } else {
    return `# Git Workflow & Branch Management Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Trunk-Based / Git Flow:** Enforce clean branching models, developing on isolated feature branches and only merging once verified.
- **Conventional Commits:** Standardize commit messages semantic structures (e.g. \`feat: add auth\`, \`fix: resolve memory leak\`).
- **Pristine History:** Encourage squash merges or rebase workflows to maintain a flat, linear git history tree.

## 2. Syntax & Typing Standards
- Enforce strict branch naming conventions: \`feature/name\`, \`bugfix/name\`, \`hotfix/name\`.
- Keep the \`.gitignore\` configuration accurate for ${languageLabel}, banning local temp assets or secrets \dots files.
- Leverage Conventional Commits specifications to automate software changelog compiler engines.

## 3. Async & Data Flow Management
- Sync repository files safely via secure upstream push and pull streams.
- Control active integration workflows on PR boundaries, locking merges until automated testing flows pass.
- Maintain clear boundaries between fast-forward rebase updates and merge integration nodes.

## 4. Deep Performance Optimization
- Track heavy static binaries safely via Git LFS (Large File Storage) configurations to prevent clone lag.
- Run local git garbage collection prune routines to sweep dead reference logs periodically.
- Configure thin shallow checkouts (\`--depth 1\`) on remote build pipelines to optimize CI runtimes.

## 5. Security & Input Sanitization
- Strictly forbid check-ins containing local secrets, private keys, API endpoints, or database settings.
- Implement Husky pre-commit hooks combined with GitLeaks engines to intercept leaks proactively.
- Sign commit assertions using valid private GPG keys to authenticate author identities.

## 6. Layout Architecture & Folder Structure
- Host repository workflow pipelines in standard module locations:
  \`\`\`
  ├── .github/
  │   └── workflows/
  │       └── ci.yml        # CI build workflows
  ├── .husky/               # Pre-commit trigger hooks
  └── .gitignore            # Git exclusion manifest
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`bash
#!/bin/sh
# Husky pre-commit hook validation script ensuring lints and tests pass before commit proceeding
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit quality gates..."

# 1. Static typing and formatting analysis check
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint checking failed. Commit aborted."
  exit 1
fi

# 2. Run related unit test targets
npm run test:related
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ All quality gates passed! Commit proceeding..."
exit 0
\`\`\`

## 8. Testing & Mocking Strategy
- Construct pipeline integration assertions checking PR branch compilation quality.
- Feed automated test indicators to repository status reports using coverage hooks (e.g. CodeCov).
- Validate git hook triggers locally in local sandbox workspaces before pushing active configs.

## 9. Robust Exception Handling & Debug Flow
- Direct branch merge conflicts carefully via high-fidelity visual tools, banning blind resolution commits.
- Leverage \`git revert\` to undo problematic main branch changes instead of force-pushing rewritten histories.
- Trace missing or orphaned commits safely using git's reference log utility \`git reflog\`.

## 10. CLI & CI/CD Automation Flow
- Perform branch cleaning automation queries in local shells:
  \`\`\`
  git fetch -p && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d
  \`\`\`
- Keep commit-msg hooks aligned withConventional Commits patterns to block non-conforming messages.`;
  }
}
