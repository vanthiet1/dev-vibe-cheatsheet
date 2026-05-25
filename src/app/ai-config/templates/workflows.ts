export function getWorkflowTemplate(
  activeFileCheck: string,
  frameworkLabel: string,
  languageLabel: string,
  testingLabel: string,
  language: string,
  testing: string,
  isVi: boolean
): string {
  if (isVi) {
    switch (activeFileCheck) {
      case "workflows/debug.md":
        return `# Quy trình Gỡ lỗi Socratic (workflows/debug.md)
# Công nghệ: ${frameworkLabel} & ${languageLabel}

Quy trình này hướng dẫn Agent phân tích để xác định nguyên nhân gốc rễ (Root Cause) của lỗi hệ thống.

## 1. Bước 1: Phân tích & Thu thập chứng cứ
- Đọc kỹ log lỗi và toàn bộ thông tin stack trace.
- Sử dụng các công cụ rà soát biến số và kết nối cơ sở dữ liệu.
- Bắt buộc đưa ra ít nhất 2 giả thuyết nguyên nhân khả dĩ trước khi thay đổi bất kỳ file nguồn nào.

## 2. Bước 2: Khắc phục & Chạy vòng lặp kiểm tra
- Thực hiện một chỉnh sửa tối giản, tập trung chính xác vào điểm lỗi.
- Xác thực xem mã nguồn có biên dịch thành công hay không bằng câu lệnh:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`
`;

      case "workflows/test.md":
        return `# Quy trình Phát triển hướng Kiểm thử TDD (workflows/test.md)
# Framework áp dụng: ${testingLabel}

Quy trình này hướng dẫn chu trình TDD khép kín để phát triển tính năng an toàn.

## 1. Giai đoạn Đỏ (Red Phase)
- Viết một ca kiểm thử (unit test hoặc integration test) mô tả chính xác yêu cầu nghiệp vụ mới.
- Thực hiện chạy thử nghiệm để chứng minh bài test này biên dịch được nhưng sẽ thất bại (fail) như kỳ vọng.

## 2. Giai đoạn Xanh (Green Phase)
- Viết mã nguồn tối giản nhất có thể để vượt qua bài kiểm thử vừa viết.
- Xác thực xem tất cả các ca kiểm thử trong hệ thống đã chạy qua thành công (pass).

## 3. Giai đoạn Tái cấu trúc (Refactor Phase)
- Dọn dẹp mã nguồn, tối ưu cấu trúc file, loại bỏ thuật toán lặp hoặc style dư thừa.
- Chạy lại toàn bộ test suite để đảm bảo không xảy ra bất kỳ lỗi suy thoái (regression) nào.
`;

      case "workflows/verify.md":
        return `# Quy trình Xác thực tự động (workflows/verify.md)

Tài liệu này xác định các quy tắc tự động xác minh trước khi đóng gói hoặc triển khai mã nguồn.

## 1. Xác thực biên dịch (Build Verification)
- Chạy lệnh biên dịch tĩnh bắt buộc:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`

## 2. Xác thực bộ kiểm thử (Test Verification)
- Chạy kiểm thử tự động toàn diện:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;

      case "workflows/coordinate.md":
        return `# Quy trình Phân phối Đa Agent (workflows/coordinate.md)

Quy trình điều phối các tác vụ phức tạp giữa nhiều vai trò Agent độc lập.

## 1. Phân chia trách nhiệm rõ ràng (Separation of Concerns)
- Chia nhỏ các yêu cầu phát triển tính năng phức tạp thành các giai đoạn độc lập và tuần tự.
- Phân phối các nhiệm vụ nhỏ hơn cho các Agent chuyên môn (frontend, backend, security) xử lý.

## 2. Điểm kiểm soát an toàn tích hợp (Integration Checkpoints)
- Thực hiện biên dịch tĩnh tại mỗi bước bàn giao mã nguồn giữa các Agent.
- Chạy quét bảo mật tự động trước khi hợp nhất cập nhật lên nhánh chính.
`;

      default:
        return "";
    }
  } else {
    switch (activeFileCheck) {
      case "workflows/debug.md":
        return `# Socratic Debugging Workflow (workflows/debug.md)
# Stack: ${frameworkLabel} & ${languageLabel}

This file guides the agent through systematic root cause identification.

## 1. Analysis Phase
- Read error logs and full trace information.
- Inspect system states, variables, and database connections.
- Formulate at least 2 potential causes before changing any files.

## 2. Fixing & Verification Loop
- Apply a minimal pinpoint change.
- Verify the build compiles safely via:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`
`;

      case "workflows/test.md":
        return `# Test-Driven Development Workflow (workflows/test.md)
# Framework: ${testingLabel}

This file outlines the closed-loop TDD cycle.

## 1. Red Phase
- Write a failing unit or integration test defining the target feature requirement.
- Verify the test compiles and fails as expected.

## 2. Green Phase
- Write the minimal code required to satisfy the failing test.
- Verify the tests pass successfully.

## 3. Refactor Phase
- Clean up any messy styles, duplicated algorithms, or variables.
- Rerun tests to ensure no regressions occur.
`;

      case "workflows/verify.md":
        return `# Automated Verification Workflow (workflows/verify.md)

This file defines the pre-flight verification checks.

## 1. Build Verification
- Execute:
  \`\`\`bash
  ${
    language === "typescript" ? "npx tsc --noEmit" :
    language === "python" ? "python -m mypy ." :
    language === "go" ? "go vet ./..." :
    language === "rust" ? "cargo check" : "dotnet build"
  }
  \`\`\`

## 2. Test Verification
- Run tests:
  \`\`\`bash
  ${testing === "jest" ? "npm run test" : "npx playwright test"}
  \`\`\`
`;

      case "workflows/coordinate.md":
        return `# Multi-Agent Coordination Workflow (workflows/coordinate.md)

This file defines the orchestrator coordination patterns.

## 1. Separation of Concerns
- Divide complex feature requests into atomic, independent phases.
- Assign specific tasks to domain agents.

## 2. Safe Integration Checkpoints
- Run compiler type checks at each boundary integration.
- Run security scanners before deploying any updates.
`;

      default:
        return "";
    }
  }
}
