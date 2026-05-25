export function getCleanArchitectureTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  if (isVi) {
    return metadata + `# Kỹ năng Kiến trúc Sạch - Clean Architecture (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Dependency Rule:** Mã nguồn đi từ ngoài vào trong. Lõi nghiệp vụ (Domain) hoàn toàn độc lập, không phụ thuộc vào framework, database, hay UI.
- **Tách biệt nghiệp vụ (Separation of Concerns):** Phân chia ứng dụng thành các lớp riêng biệt có ranh giới rõ ràng.
- **Kiến trúc cắm (Plugin Architecture):** Các thành phần hạ tầng (Database, UI, CDN) có thể dễ dàng thay đổi mà không ảnh hưởng tới lõi nghiệp vụ.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo và sử dụng Interfaces/Contracts cho mọi cổng giao tiếp ngoài (Repository interfaces, Gateway contracts).
- Sử dụng Data Transfer Objects (DTO) để chuyển nhận dữ liệu giữa các lớp một cách an toàn và tường minh.
- Cấm hoàn toàn việc import trực tiếp thư viện hoặc DB clients vào trong các Use Case hay Entities.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Quy trình luân chuyển dữ liệu: Controller nhận request -> DTO -> UseCase xử lý -> Repository lưu trữ -> DTO trả về Controller.
- Sử dụng cơ chế async/await đồng bộ các hoạt động I/O qua các Use Case.
- Áp dụng các Mapper để chuyển đổi cấu trúc Model DB sang Domain Entity độc lập.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tách biệt hoàn toàn tầng ghi (Command) và tầng đọc dữ liệu (Query) qua mô hình CQRS để tối ưu hóa hiệu năng truy vấn DB.
- Trừu tượng hóa lớp cache (Caching layer) ở tầng hạ tầng để tăng tốc phản hồi mà không làm bẩn logic nghiệp vụ.
- Thiết lập lazy loading cho các thực thể quan hệ dữ liệu lớn chỉ khi có yêu cầu.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thực hiện kiểm tra tính toàn vẹn và phân quyền dữ liệu ngay tại ranh giới của tầng Use Case để đảm bảo an toàn tối đa.
- Không để lộ các thông tin Entity chi tiết của DB trực tiếp ra Client, chỉ truyền dữ liệu qua các lớp DTO.
- Dependency Inversion ngăn chặn các thư viện độc hại bên ngoài ảnh hưởng vào nghiệp vụ cốt lõi.

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức thư mục dự án theo cấu trúc Clean Architecture tiêu chuẩn phân lớp khoa học:
  \`\`\`
  ├── src/
  │   ├── domain/           # Thực thể (Entities) & Nghiệp vụ cốt lõi
  │   ├── use-cases/        # Quy trình xử lý nghiệp vụ (Use Cases)
  │   ├── infrastructure/   # Hạ tầng (Database, WebServer, API Client)
  │   └── presentation/     # Giao diện hiển thị (Controllers, Views)
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// 1. Domain Interface (Contract)
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// 2. Use Case (Business Logic độc lập hoàn toàn với Framework/DB)
export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, email: string): Promise<boolean> {
    const existingUser = await this.userRepo.findById(userId);
    if (existingUser) {
      throw new Error("User already exists inside the system");
    }

    const newUser = new User(userId, email);
    await this.userRepo.save(newUser);
    return true;
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết Unit Tests kiểm thử hoàn chỉnh Use Cases mà không cần kết nối DB thực tế nhờ việc Mock Repository interfaces dễ dàng.
- Tốc độ chạy test suites lõi cực kỳ nhanh (dưới 1 giây) nhờ ranh giới độc lập hoàn hảo.
- Xác định và kiểm chứng tất cả các ca kiểm thử biên của nghiệp vụ.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Định nghĩa các lỗi nghiệp vụ riêng biệt (Domain Exceptions) và xử lý chuyển đổi thành lỗi HTTP thân thiện ở tầng presentation.
- Sử dụng kiến trúc Error Boundaries hoặc Global Error Handler ở tầng ngoài cùng để bắt toàn bộ các exception chưa được kiểm soát.
- Đảm bảo tính toàn vẹn dữ liệu (Transactions) khi Use Case gọi nhiều repository ghi dữ liệu.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Xây dựng CLI Scaffolding script giúp sinh nhanh cấu trúc file Clean Architecture chuẩn chỉ:
  \`\`\`bash
  npm run generate -- --type=usecase --name=RegisterUser
  \`\`\`
- Chạy kiểm tra quy tắc phụ thuộc (Dependency checking) tự động qua CI/CD để ngăn việc import sai lớp từ ngoài vào trong.`;
  } else {
    return metadata + `# Clean Architecture & Decoupled Domain Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Dependency Rule:** All source dependencies flow inward. The core Domain logic must remain pristine, completely decoupled from databases, UI, and external frameworks.
- **Separation of Concerns:** Partition features into discrete layers with highly explicit boundary controls.
- **Plug-and-Play Adaptability:** Infrastructure components (e.g. database engines, API libraries) should act as replaceable plugins.

## 2. Syntax & Typing Standards
- Enforce explicit contracts and interfaces for every external driver gateway (e.g. Repository patterns).
- Use strict Data Transfer Objects (DTOs) to safely marshal parameters across boundaries.
- Strictly ban direct imports of framework utilities or database clients inside core Domain entities or Use Cases.

## 3. Async & Data Flow Management
- Route actions systematically: Controller receives parameters -> DTO -> UseCase runs logic -> Repository writes -> DTO returns.
- Employ clean async/await signatures to carry domain actions through boundary adapters.
- Use mapping functions to transform raw database layouts into clean Domain Entities.

## 4. Deep Performance Optimization
- Separate data query models from write models using CQRS patterns to unlock performance gains.
- Abstract expensive database fetch routines behind caching proxies at the infrastructure boundary.
- Employ lazy-loading patterns for massive relational structures to keep load-times optimized.

## 5. Security & Input Sanitization
- Enforce parameters validation and privilege checks right at the entrance of Use Cases to block unauthorized inputs.
- Keep structural database entities isolated, never exposing raw schema models directly to public REST/GraphQL clients.
- Leverage Dependency Inversion to shield core business domains from vendor library updates.

## 6. Layout Architecture & Folder Structure
- Maintain strict folder organization mirroring Clean Architecture divisions:
  \`\`\`
  ├── src/
  │   ├── domain/           # Core Entities & rules
  │   ├── use-cases/        # Business logic routines
  │   ├── infrastructure/   # DB drivers, server, API adaptors
  │   └── presentation/     # Controllers, views, styling
  └── ...
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// 1. Decoupled Repository Interface Contract
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// 2. Pure Domain Use Case independent of infrastructure and frameworks
export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, email: string): Promise<boolean> {
    const existingUser = await this.userRepo.findById(userId);
    if (existingUser) {
      throw new Error("User already exists inside the system");
    }

    const newUser = new User(userId, email);
    await this.userRepo.save(newUser);
    return true;
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Compose pure, robust Use Case unit tests, mocking database gateways without spinning up live instances.
- Maintain rapid test execution runtimes (under 1 second) by isolating business logic from filesystem or database delays.
- Assert on negative edge-cases and domain boundary errors to guarantee robustness.

## 9. Robust Exception Handling & Debug Flow
- Design specialized Domain Exceptions representing business rule failures, converting them at presentation boundaries.
- Utilize global exception handlers at presentation layers to intercept unexpected system failures cleanly.
- Ensure state integrity through transactional boundaries when Use Cases invoke multiple repository mutations.

## 10. CLI & CI/CD Automation Flow
- Build scaffolding templates to generate structured Clean Architecture code files:
  \`\`\`bash
  npm run generate -- --type=usecase --name=RegisterUser
  \`\`\`
- Integrate dependency check utilities (like dependency-cruiser) in CI pipelines to block illegal imports flowing from inner to outer layers.`;
  }
}
