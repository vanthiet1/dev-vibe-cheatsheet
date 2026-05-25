import { getCleanCodeTemplate } from "./clean-code";
import { getSecurityScannerTemplate } from "./security-scanner";
import { getSeoFundamentalsTemplate } from "./seo-fundamentals";
import { getI18nLocalizationTemplate } from "./i18n-localization";
import { getPerformanceProfilingTemplate } from "./performance-profiling";
import { getPowershellWindowsTemplate } from "./powershell-windows";
import { getGitWorkflowsTemplate } from "./git-workflows";
import { getCleanArchitectureTemplate } from "./clean-architecture";

export function getSkillTemplate(
  skillSlug: string,
  formattedSlug: string,
  languageLabel: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  switch (skillSlug) {
    case "clean-code":
      return getCleanCodeTemplate(formattedSlug, languageLabel, language, metadata);
    
    case "security-scanner":
      return getSecurityScannerTemplate(formattedSlug, language, metadata, isVi);
    
    case "seo-fundamentals":
      return getSeoFundamentalsTemplate(formattedSlug, language, metadata, isVi);
    
    case "i18n-localization":
      return getI18nLocalizationTemplate(formattedSlug, language, metadata, isVi);
    
    case "performance-profiling":
      return getPerformanceProfilingTemplate(formattedSlug, language, metadata, isVi);
    
    case "powershell-windows":
      return getPowershellWindowsTemplate(formattedSlug, languageLabel, isVi);
    
    case "git-workflows":
      return getGitWorkflowsTemplate(formattedSlug, languageLabel, isVi);
    
    case "clean-architecture":
      return getCleanArchitectureTemplate(formattedSlug, language, metadata, isVi);

    default:
      if (isVi) {
        return metadata + `# Kỹ năng Agent Chuyên nghiệp (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- Xây dựng kiến trúc mô-đun hóa, đảm bảo tính dễ đọc, bảo trì và mở rộng cao đối với ${formattedSlug}.
- Áp dụng các mẫu thiết kế tối ưu nhất phù hợp với môi trường dự án.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Định kiểu dữ liệu chặt chẽ cho toàn bộ cấu trúc biến và chữ ký hàm để loại bỏ lỗi runtime không đáng có.
- Tuân thủ quy chuẩn định dạng code chuẩn của cộng đồng phát triển.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Xử lý bất đồng bộ không chặn luồng chính, kiểm soát tài nguyên hệ thống an toàn.
- Quản lý luồng dữ liệu vào ra nhất quán, tránh lỗi rò rỉ dữ liệu hoặc deadlock.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Đo lường và tối ưu hóa thời gian chạy, bộ nhớ RAM tiêu thụ của các thuật toán lõi.
- Thiết lập bộ nhớ đệm thông minh đối với các truy vấn hoặc tính toán lặp đi lặp lại.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thực hiện cơ chế lọc dữ liệu đầu vào nghiêm ngặt trước khi xử lý sâu hơn hoặc ghi cơ sở dữ liệu.
- Phòng chống các lỗ hổng bảo mật phổ biến bằng cách mã hóa dữ liệu đầu ra an toàn.

## 6. Kiến trúc & Bố trí Thư mục
- Sắp xếp và tổ chức tệp tin dự án khoa học theo mô hình Clean Layout phổ biến.
- Sơ đồ cấu trúc cây thư mục khuyến nghị:
  \`\`\`
  ├── src/
  │   ├── core/         # Logic nghiệp vụ lõi
  │   ├── adapters/     # Bộ kết nối ngoài
  │   └── config/       # Cấu hình môi trường
  └── ...
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Đoạn code mẫu chuẩn hóa, an toàn dữ liệu và tối ưu hiệu năng
export async function executeModuleTask(payload: any) {
  if (!payload) {
    throw new Error("Payload is required for action execution");
  }
  
  try {
    const result = await coreService.process(payload);
    return { success: true, result };
  } catch (error) {
    console.error("Task failed to execute", error);
    return { success: false, message: error.message };
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết unit tests kiểm chứng hành vi của các module logic biệt lập bằng Vitest/Playwright.
- Mock đầy đủ các kết nối hoặc dịch vụ bên thứ ba để đảm bảo tốc độ chạy test suite dưới 1 giây.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Đảm bảo bọc các logic nghiệp vụ nhạy cảm trong khối try-catch an toàn.
- Ghi nhận thông tin lỗi chi tiết, không làm rò rỉ thông tin nhạy cảm của hệ thống ra bên ngoài.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra chất lượng và chất lượng mã nguồn tự động thông qua dòng lệnh:
  \`\`\`bash
  npm run test && npm run lint
  \`\`\`
- Đồng bộ hóa các quy trình xác minh này trực tiếp vào hệ thống kiểm thử tự động CI/CD.`;
      } else {
        return metadata + `# Professional Agent Skill Specification (${formattedSlug})

## 1. Core Design Principles
- Guarantee clean, modular, and extensible software structures optimized for ${formattedSlug}.
- Leverage industry-standard design patterns to construct maintainable layers.

## 2. Syntax & Typing Standards
- Enforce strict typing on all method signatures and variables to avoid runtime exceptions.
- Adhere to community-vetted style guides and standard formatting templates.

## 3. Async & Data Flow Management
- Perform asynchronous and non-blocking actions efficiently to keep memory consumption low.
- Design clean data pipelines, blocking deadlocks and memory corruption.

## 4. Deep Performance Optimization
- Benchmark core algorithms and memory consumption patterns continuously.
- Abstract expensive operations behind cached service interfaces to eliminate overhead.

## 5. Security & Input Sanitization
- Strictly sanitize all client-supplied parameters prior to persistence or execution.
- Prevent security threats by output-encoding strings globally.

## 6. Layout Architecture & Folder Structure
- Maintain clean, decoupled file distributions following architectural guidelines:
  \`\`\`
  ├── src/
  │   ├── core/         # Core business domain
  │   ├── adapters/     # Boundary gateways
  │   └── config/       # Environment setups
  └── ...
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// High-fidelity production-ready boilerplate code
export async function executeModuleTask(payload: any) {
  if (!payload) {
    throw new Error("Payload is required for action execution");
  }
  
  try {
    const result = await coreService.process(payload);
    return { success: true, result };
  } catch (error) {
    console.error("Task failed to execute", error);
    return { success: false, message: error.message };
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct atomic unit tests validating code logic branches under testing frameworks.
- Abstract external infrastructure dependencies behind mock interfaces.

## 9. Robust Exception Handling & Debug Flow
- Trap errors gracefully using clean Try-Catch blocks.
- Maintain comprehensive logging setups without disclosing sensitive server keys.

## 10. CLI & CI/CD Automation Flow
- Formulate static syntax checks and test suite validation commands:
  \`\`\`bash
  npm run test && npm run lint
  \`\`\`
- Enforce automated quality control tests on server commits.`;
      }
  }
}
