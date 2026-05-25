export function getFrameworkSection(framework: string, isVi: boolean): string {
  if (isVi) {
    if (framework === "nextjs-app") {
      return `- **Kiến trúc App Router trong Next.js:** Luôn ưu tiên Server Components để tải dữ liệu từ xa. Giữ cho các component phi trạng thái (stateless) nhiều nhất có thể.
- **Giảm thiểu Waterfalls:** Thực hiện các truy vấn cơ sở dữ liệu hoặc API song song bằng cách sử dụng Promise.all().
- **An toàn Hydration:** Tránh lỗi không khớp dữ liệu hiển thị (hydration mismatch). Không chèn các đoạn kiểm tra ngày/tháng hoặc window trong hàm render máy chủ đầu tiên.`;
    } else if (framework === "react-vite") {
      return `- **Mô hình Custom Hooks chức năng:** Dựa hoàn toàn vào các custom hooks chuẩn để xử lý side-effects. Giữ logic nghiệp vụ tách biệt hoàn toàn khỏi layout giao diện component.
- **Kiểm soát Render:** Bao bọc các tính toán nặng bên trong useMemo. Hạn chế tối đa việc re-render do thay đổi trạng thái context liên tục.`;
    } else {
      return `- **Xử lý I/O không chặn (Non-Blocking):** Viết các hàm controller xử lý bất đồng bộ async/await sạch sẽ. Phân tách rõ ràng file xử lý định tuyến (routing) và database.
- **Middleware Bảo mật:** Áp dụng rate-limiting, cấu hình an toàn CORS, và mã hóa các JSON headers bảo mật tại cổng API.`;
    }
  } else {
    if (framework === "nextjs-app") {
      return `- **Next.js App Router Architecture:** Always prefer Server Components for remote data fetching. Keep components stateless when possible.
- **Minimize Waterfalls:** Fetch database queries or API queries in parallel via Promise.all().
- **Hydration Safe:** Avoid hydration mismatches. Do not write date/window checks in initial server renders.`;
    } else if (framework === "react-vite") {
      return `- **Functional Hooks Pattern:** Rely exclusively on standard custom hooks for side effects. Keep business logic separate from component layouts.
- **Render Control:** Wrap heavy computations inside useMemo. Avoid excessive context state triggers.`;
    } else {
      return `- **Non-Blocking IO:** Write clean async/await controller actions. Keep routing handlers and database controller files separated.
- **Security Middleware:** Enforce rate-limiting, CORS protections, and secure JSON headers at API gates.`;
    }
  }
}

export function getLanguageSection(language: string, isVi: boolean): string {
  if (isVi) {
    if (language === "typescript") {
      return `- **Kiểm tra kiểu dữ liệu nghiêm ngặt:** Cấm hoàn toàn từ khóa 'any'. Định nghĩa và export các cấu trúc interface/type rõ ràng và chuẩn xác.
- **Chữ ký hàm chuẩn chỉ:** Khai báo tường minh tất cả kiểu dữ liệu của tham số đầu vào và kiểu trả về của hàm.`;
    } else if (language === "javascript") {
      return `- **Cú pháp ES6 hiện đại:** Giải cấu trúc (destructure) thuộc tính đối tượng gọn gàng. Tránh lỗi hoisting do dùng từ khóa 'var'.
- **Phòng thủ an toàn:** Đảm bảo kiểm tra thuộc tính an toàn bằng optional chaining (?.) và nullish coalescing (??).`;
    } else if (language === "python") {
      return `- **Gợi ý kiểu (Type Hinting):** Khai báo rõ ràng kiểu dữ liệu cho biến và tham số. Trả về cấu trúc Union/Optional tường minh.
- **Tuân thủ PEP 8:** Đảm bảo khoảng cách chuẩn, sử dụng tên biến kiểu snake_case, và sắp xếp import gọn gàng.
- **Môi trường ảo:** Quản lý thư viện phụ thuộc nghiêm ngặt thông qua UV hoặc Poetry.`;
    } else if (language === "go") {
      return `- **Lập trình Go chuẩn mực:** Bắt buộc kiểm tra lỗi tường minh ngay sau mỗi tác vụ thực thi ('if err != nil'). Tuyệt đối không bỏ qua lỗi.
- **Mô hình đồng thời (Concurrency):** Sử dụng goroutines và channels an sau. Hạn chế sử dụng khóa locks. Tối ưu hóa phân bổ struct.`;
    } else if (language === "rust") {
      return `- **An toàn quyền sở hữu (Ownership):** Tuân thủ nghiêm ngặt lifetime của biến và các giới hạn borrow checker. Tránh clone dữ liệu vô tội vạ.
- **Xử lý lỗi Monad:** Khớp mẫu và xử lý triệt để Option/Result. Không dùng hàm .unwrap() trong môi trường production.`;
    } else {
      return `- **Kích hoạt Nullable:** Bật chỉ thị '#nullable enable' trên toàn dự án để phòng tránh ngoại lệ tham chiếu null.
- **Tối ưu hóa LINQ:** Không chặn luồng đồng bộ bằng các tác vụ bất đồng bộ (không dùng .Result hoặc .Wait()). Tối ưu truy vấn dữ liệu với LINQ.
- **Tiêm phụ thuộc (Dependency Injection):** Áp dụng DI qua constructor một cách nhất quán trong toàn bộ kiến trúc ứng dụng.`;
    }
  } else {
    if (language === "typescript") {
      return `- **Strict Compiler Type Checks:** Banned 'any' keyword completely. Export precise, clean typescript interface/type structures.
- **Proper Signatures:** Explicitly declare all parameter types and function return signatures.`;
    } else if (language === "javascript") {
      return `- **Modern ES6 syntax:** Destructure object keys cleanly. Avoid classic 'var' hoisting bugs.
- **Defensive guards:** Ensure safe property checks using optional chaining (?.) and nullish coalescing (??).`;
    } else if (language === "python") {
      return `- **Type Hinting:** Annotate variable and parameter types explicitly. Return precise Union/Optional structures.
- **PEP 8 Compliance:** Strictly follow PEP 8 spacing, snake_case variable names, and clean import sorting.
- **Virtual Env:** Manage dependencies strictly via UV or Poetry.`;
    } else if (language === "go") {
      return `- **Idiomatic Go:** Enforce explicit error checking right after executions (\`if err != nil\`). Do not ignore errors.
- **Concurrent Patterns:** Safely use goroutines and channels. Avoid locks. Keep struct allocations optimized.`;
    } else if (language === "rust") {
      return `- **Ownership Safety:** Respect lifetime variables and strict borrow checking limits. Avoid unnecessary cloning.
- **Monad Errors:** Handle error states strictly using Option/Result matching. Keep unwrapping out of production source code.`;
    } else {
      return `- **Nullable Enablers:** Turn on \`#nullable enable\` globally. Prevent unexpected null reference exceptions.
- **LINQ optimization:** Avoid blocking async-over-sync tasks (no \`.Result\` or \`.Wait()\`). Optimize collections with LINQ.
- **Dependency Injection:** Enforce clear constructor dependency injection patterns throughout the application architecture.`;
    }
  }
}

export function getDatabaseSection(database: string, isVi: boolean): string {
  if (isVi) {
    if (database === "postgres") {
      return `- **Chỉ mục PostgreSQL:** Tạo chỉ mục chính xác cho mọi khóa ngoại phục vụ truy vấn. Tuyệt đối không quét toàn bảng (table scans).
- **Giao dịch an toàn:** Bao bọc các thay đổi dữ liệu nhiều bước trong Transaction. Giải phóng kết nối (connection pool) ngay sau khi xong.`;
    } else if (database === "mongodb") {
      return `- **Thiết kế Schema tối giản:** Thiết kế các tài liệu Mongoose gọn gàng. Hạn chế lồng tài liệu quá sâu để tránh làm chậm pipeline tổng hợp.
- **Chống lỗi chèn tham số NoSQL:** Làm sạch và kiểm tra chặt chẽ các tham số từ client đầu vào.`;
    } else if (database === "sqlite") {
      return `- **Chế độ đồng thời WAL:** Bật tính năng Write-Ahead Logging (WAL) để đảm bảo an toàn khi ghi đồng thời.
- **Ghi tuần tự an toàn:** Đảm bảo thực hiện tuần tự hóa các tác vụ ghi cơ sở dữ liệu để chống lỗi khóa DB hoàn toàn.`;
    } else if (database === "mysql") {
      return `- **Công cụ InnoDB:** Đảm bảo tính toàn vẹn quan hệ chặt chẽ bằng khóa ngoại. Tối ưu hóa các mệnh đề JOIN an toàn.`;
    } else {
      return `- **Không gian tên Key có cấu trúc:** Phân tách rõ ràng key bằng dấu hai chấm chuẩn: domain:id:field (ví dụ: user:1026:profile).
- **Thời hạn TTL bắt buộc:** Đặt thời gian sống (TTL) cụ thể cho mọi key để tránh rò rỉ bộ nhớ đệm RAM.`;
    }
  } else {
    if (database === "postgres") {
      return `- **PostgreSQL Indexing:** Write precise indexes for every foreign key query. Never run massive table scans.
- **Clean Transactions:** Explicitly wrap multi-step entity changes inside transactional boundaries. Release connection pool clients cleanly.`;
    } else if (database === "mongodb") {
      return `- **Document Schema Design:** Design lean, clean Mongoose documents. Avoid deep nesting to prevent slow aggregation query pipelines.
- **Anti-NoSQL Injections:** Sanitize raw client parameters to prevent query injection attacks.`;
    } else if (database === "sqlite") {
      return `- **WAL Concurrency Mode:** Enforce Write-Ahead Logging (WAL) mode for simultaneous write safety.
- **Single-Thread Safety:** Ensure sequential database writers to completely prevent database locks.`;
    } else if (database === "mysql") {
      return `- **InnoDB Engine:** Keep relational referential integrity tight using foreign keys. Optimize JOIN statements safely.`;
    } else {
      return `- **Structured Key Namespaces:** Enforce key standard colon separation: \`domain:id:field\` (e.g. \`user:1026:profile\`).
- **TTL Enforcements:** Every cache key must have a precise, well-reasoned Time-to-Live (TTL) expiration set to prevent RAM bloat.`;
    }
  }
}

export function getStylingSection(styling: string, isVi: boolean): string {
  if (isVi) {
    if (styling === "tailwind-v4") {
      return `- **Token CSS-First:** Định nghĩa và kế thừa các token thiết kế Tailwind CSS v4 ngay trong stylesheet chính của bạn.
- **Không dùng Inline Styles:** Tuyệt đối dùng các class Tailwind thay vì viết inline styles trực tiếp.`;
    } else if (styling === "shadcn") {
      return `- **Thành phần Radix dễ tiếp cận:** Giữ các phần tử shadcn tùy biến cao, lắp ghép linh hoạt và tương thích tốt với trình đọc màn hình.
- **Hàm gộp cn() chuẩn:** Luôn bao bọc tất cả các style có điều kiện bên trong helper \`cn(...)\`.`;
    } else if (styling === "antd") {
      return `- **Token thiết kế chuyên nghiệp:** Tùy biến màu sắc thương hiệu và layout đồng nhất thông qua ConfigProvider tokens.`;
    } else {
      return `- **MUI Theme Đồng nhất:** Sử dụng cấu hình từ ThemeProvider. Tránh khai báo thủ công mã màu hoặc khoảng cách tùy tiện.`;
    }
  } else {
    if (styling === "tailwind-v4") {
      return `- **CSS-First Tokens:** Apply Tailwind CSS v4 design tokens within your main stylesheet config.
- **No Inline Styles:** Use Tailwind classes rather than inline style objects. Keep styles clean and responsive.`;
    } else if (styling === "shadcn") {
      return `- **Accessible Radix Primitives:** Keep shadcn elements customizable, composable, and accessible via screen readers.
- **Clean cn() Merging:** Wrap all conditional styles inside the utility helper \`cn(...)\`.`;
    } else if (styling === "antd") {
      return `- **Corporate Design Tokens:** Adjust branding colors strictly using ConfigProvider tokens. Keep markup clean.`;
    } else {
      return `- **MUI Theme Alignment:** Rely on ThemeProvider. Avoid hardcoded theme variables. Keep elements responsive.`;
    }
  }
}
