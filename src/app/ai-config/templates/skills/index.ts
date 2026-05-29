import { getApiPatternsTemplate } from "./api-patterns";
import { getAppBuilderTemplate } from "./app-builder";
import { getArchitectureTemplate } from "./architecture";
import { getBashLinuxTemplate } from "./bash-linux";
import { getBatchOperationsTemplate } from "./batch-operations";
import { getBehavioralModesTemplate } from "./behavioral-modes";
import { getBrainstormingTemplate } from "./brainstorming";
import { getCleanCodeTemplate } from "./clean-code";
import { getCodeReviewChecklistTemplate } from "./code-review-checklist";
import { getCodeReviewGraphTemplate } from "./code-review-graph";
import { getContextCompressionTemplate } from "./context-compression";
import { getCoordinatorModeTemplate } from "./coordinator-mode";
import { getDatabaseDesignTemplate } from "./database-design";
import { getDeploymentProceduresTemplate } from "./deployment-procedures";
import { getDocumentationTemplatesTemplate } from "./documentation-templates";
import { getFrontendDesignTemplate } from "./frontend-design";
import { getGameDevelopmentTemplate } from "./game-development";
import { getGeoFundamentalsTemplate } from "./geo-fundamentals";
import { getGitWorkflowsTemplate } from "./git-workflows";
import { getI18nLocalizationTemplate } from "./i18n-localization";
import { getIntelligentRoutingTemplate } from "./intelligent-routing";
import { getLintAndValidateTemplate } from "./lint-and-validate";
import { getMcpBuilderTemplate } from "./mcp-builder";
import { getMemorySystemTemplate } from "./memory-system";
import { getMobileDesignTemplate } from "./mobile-design";
import { getNextjsReactExpertTemplate } from "./nextjs-react-expert";
import { getNodejsBestPracticesTemplate } from "./nodejs-best-practices";
import { getParallelAgentsTemplate } from "./parallel-agents";
import { getPerformanceProfilingTemplate } from "./performance-profiling";
import { getPlanWritingTemplate } from "./plan-writing";
import { getPowershellWindowsTemplate } from "./powershell-windows";
import { getPythonPatternsTemplate } from "./python-patterns";
import { getRedTeamTacticsTemplate } from "./red-team-tactics";
import { getRustProTemplate } from "./rust-pro";
import { getSecurityScannerTemplate } from "./security-scanner";
import { getSeoFundamentalsTemplate } from "./seo-fundamentals";
import { getServerManagementTemplate } from "./server-management";
import { getSimplifyCodeTemplate } from "./simplify-code";
import { getSkillifyTemplate } from "./skillify";
import { getSystematicDebuggingTemplate } from "./systematic-debugging";
import { getTailwindPatternsTemplate } from "./tailwind-patterns";
import { getTddWorkflowTemplate } from "./tdd-workflow";
import { getVerifyChangesTemplate } from "./verify-changes";
import { getWebDesignGuidelinesTemplate } from "./web-design-guidelines";
import { getWebappTestingTemplate } from "./webapp-testing";

export function getSkillTemplate(
  skillSlug: string,
  formattedSlug: string,
  languageLabel: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  switch (skillSlug) {
    case "api-patterns":
      return getApiPatternsTemplate(formattedSlug, language, metadata, isVi);
    case "app-builder":
      return getAppBuilderTemplate(formattedSlug, language, metadata, isVi);
    case "architecture":
      return getArchitectureTemplate(formattedSlug, language, metadata, isVi);
    case "bash-linux":
      return getBashLinuxTemplate(formattedSlug, language, metadata, isVi);
    case "batch-operations":
      return getBatchOperationsTemplate(formattedSlug, language, metadata, isVi);
    case "behavioral-modes":
      return getBehavioralModesTemplate(formattedSlug, language, metadata, isVi);
    case "brainstorming":
      return getBrainstormingTemplate(formattedSlug, language, metadata, isVi);
    case "clean-code":
      return getCleanCodeTemplate(formattedSlug, languageLabel, language, metadata);
    case "code-review-checklist":
      return getCodeReviewChecklistTemplate(formattedSlug, language, metadata, isVi);
    case "code-review-graph":
      return getCodeReviewGraphTemplate(formattedSlug, language, metadata, isVi);
    case "context-compression":
      return getContextCompressionTemplate(formattedSlug, language, metadata, isVi);
    case "coordinator-mode":
      return getCoordinatorModeTemplate(formattedSlug, language, metadata, isVi);
    case "database-design":
      return getDatabaseDesignTemplate(formattedSlug, language, metadata, isVi);
    case "deployment-procedures":
      return getDeploymentProceduresTemplate(formattedSlug, language, metadata, isVi);
    case "documentation-templates":
      return getDocumentationTemplatesTemplate(formattedSlug, language, metadata, isVi);
    case "frontend-design":
      return getFrontendDesignTemplate(formattedSlug, language, metadata, isVi);
    case "game-development":
      return getGameDevelopmentTemplate(formattedSlug, language, metadata, isVi);
    case "geo-fundamentals":
      return getGeoFundamentalsTemplate(formattedSlug, language, metadata, isVi);
    case "git-workflows":
      return getGitWorkflowsTemplate(formattedSlug, languageLabel, isVi);
    case "i18n-localization":
      return getI18nLocalizationTemplate(formattedSlug, language, metadata, isVi);
    case "intelligent-routing":
      return getIntelligentRoutingTemplate(formattedSlug, language, metadata, isVi);
    case "lint-and-validate":
      return getLintAndValidateTemplate(formattedSlug, language, metadata, isVi);
    case "mcp-builder":
      return getMcpBuilderTemplate(formattedSlug, language, metadata, isVi);
    case "memory-system":
      return getMemorySystemTemplate(formattedSlug, language, metadata, isVi);
    case "mobile-design":
      return getMobileDesignTemplate(formattedSlug, language, metadata, isVi);
    case "nextjs-react-expert":
      return getNextjsReactExpertTemplate(formattedSlug, language, metadata, isVi);
    case "nodejs-best-practices":
      return getNodejsBestPracticesTemplate(formattedSlug, language, metadata, isVi);
    case "parallel-agents":
      return getParallelAgentsTemplate(formattedSlug, language, metadata, isVi);
    case "performance-profiling":
      return getPerformanceProfilingTemplate(formattedSlug, language, metadata, isVi);
    case "plan-writing":
      return getPlanWritingTemplate(formattedSlug, language, metadata, isVi);
    case "powershell-windows":
      return getPowershellWindowsTemplate(formattedSlug, languageLabel, isVi);
    case "python-patterns":
      return getPythonPatternsTemplate(formattedSlug, language, metadata, isVi);
    case "red-team-tactics":
      return getRedTeamTacticsTemplate(formattedSlug, language, metadata, isVi);
    case "rust-pro":
      return getRustProTemplate(formattedSlug, language, metadata, isVi);
    case "security-scanner":
      return getSecurityScannerTemplate(formattedSlug, language, metadata, isVi);
    case "seo-fundamentals":
      return getSeoFundamentalsTemplate(formattedSlug, language, metadata, isVi);
    case "server-management":
      return getServerManagementTemplate(formattedSlug, language, metadata, isVi);
    case "simplify-code":
      return getSimplifyCodeTemplate(formattedSlug, language, metadata, isVi);
    case "skillify":
      return getSkillifyTemplate(formattedSlug, language, metadata, isVi);
    case "systematic-debugging":
      return getSystematicDebuggingTemplate(formattedSlug, language, metadata, isVi);
    case "tailwind-patterns":
      return getTailwindPatternsTemplate(formattedSlug, language, metadata, isVi);
    case "tdd-workflow":
      return getTddWorkflowTemplate(formattedSlug, language, metadata, isVi);
    case "verify-changes":
      return getVerifyChangesTemplate(formattedSlug, language, metadata, isVi);
    case "web-design-guidelines":
      return getWebDesignGuidelinesTemplate(formattedSlug, language, metadata, isVi);
    case "webapp-testing":
      return getWebappTestingTemplate(formattedSlug, language, metadata, isVi);
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

## 7. Mẫu Code Ví tế chuẩn Production
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
        return metadata + `# Professional Agent Skill Specification (&{formattedSlug})

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
