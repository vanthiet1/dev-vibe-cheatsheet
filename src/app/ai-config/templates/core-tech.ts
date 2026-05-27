export function getFrameworkSection(framework: string, isVi: boolean): string {
  if (isVi) {
    if (framework === "nextjs-app") {
      return `- **Kiến trúc App Router trong Next.js:** Luôn ưu tiên Server Components để tải dữ liệu từ xa. Giữ cho các component phi trạng thái (stateless) nhiều nhất có thể.
- **Giảm thiểu Waterfalls:** Thực hiện các truy vấn cơ sở dữ liệu hoặc API song song bằng cách sử dụng Promise.all().
- **An toàn Hydration:** Tránh lỗi không khớp dữ liệu hiển thị (hydration mismatch). Không chèn các đoạn kiểm tra ngày/tháng hoặc window trong hàm render máy chủ đầu tiên.`;
    } else if (framework === "react-vite") {
      return `- **Mô hình Custom Hooks chức năng:** Dựa hoàn toàn vào các custom hooks chuẩn để xử lý side-effects. Giữ logic nghiệp vụ tách biệt hoàn toàn khỏi layout giao diện component.
- **Kiểm soát Render:** Bao bọc các tính toán nặng bên trong useMemo. Hạn chế tối đa việc re-render do thay đổi trạng thái context liên tục.`;
    } else if (framework === "springboot") {
      return `- **Tiêm phụ thuộc Constructor:** Luôn tiêm Bean phụ thuộc qua Constructor thay vì dùng @Autowired trực tiếp trên trường.
- **Quản lý Giao dịch:** Sử dụng annotation @Transactional ở tầng Service chuẩn mực. Cấu hình rollbackFor cho các ngoại lệ kiểm tra.
- **Chuẩn hóa REST API:** Trả về định dạng ResponseEntity thống nhất, cấu hình bộ xử lý ngoại lệ toàn cục bằng @ControllerAdvice.`;
    } else if (framework === "laravel") {
      return `- **Bảo mật Eloquent ORM:** Tránh truy vấn lặp dữ liệu (N+1 query problem) bằng cách nạp trước quan hệ với hàm 'with()'.
- **Xác thực dữ liệu:** Sử dụng các lớp Form Request riêng biệt để kiểm tra tính hợp lệ của client đầu vào trước khi vào Controller.
- **Tập trung hóa cấu hình:** Tuyệt đối không gọi hàm env() trực tiếp bên ngoài file config/*. Hãy gọi config() sau khi đã khai báo trong config.`;
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
    } else if (framework === "springboot") {
      return `- **Constructor Dependency Injection:** Inject required Beans via Class Constructors instead of field \`@Autowired\` annotations.
- **Transaction Control:** Apply \`@Transactional\` rules at Service layers. Configure proper rollbackFor classes for validation failures.
- **Standardized REST API:** Return unified ResponseEntity packages, register global controller advisors using \`@ControllerAdvice\`.`;
    } else if (framework === "laravel") {
      return `- **Eloquent ORM Safety:** Avoid heavy N+1 database queries by pre-fetching relationships using dynamic 'with()' statements.
- **Form Request Validations:** Isolate payload checks using custom Form Request classes instead of raw inline validators.
- **Configuration Centralization:** Banned invoking env() directly inside models or controllers. Always load values using config() helpers.`;
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
    } else if (language === "react") {
      return `- **Functional Component & Hooks:** Sử dụng Hooks chuẩn (useState, useEffect, v.v.). Logic nghiệp vụ phức tạp nên được đóng gói vào Custom Hooks.
- **State tối thiểu:** Chỉ lưu trữ những dữ liệu trạng thái thực sự cần thiết trong State, tính toán các dữ liệu phái sinh trực tiếp khi render.
- **Khóa Key duy nhất:** Luôn cung cấp thuộc tính 'key' duy nhất và ổn định khi lặp render danh sách phần tử.`;
    } else if (language === "java") {
      return `- **Quy tắc OOP & SOLID:** Đảm bảo viết code tuân thủ các nguyên lý SOLID. Sử dụng các Design Patterns thông dụng (Singleton, Factory, Builder, v.v.).
- **Quản lý biệt lệ (Exceptions):** Bắt buộc xử lý hoặc ném các checked/unchecked exception hợp lý. Tránh bắt lỗi chung chung kiểu 'catch (Exception e)'.
- **Thread Safety:** Sử dụng các cấu trúc đồng thời an toàn (ConcurrentHashMap, Atomic variables) thay vì đồng bộ hóa thủ công bất cứ khi nào có thể.`;
    } else if (language === "php") {
      return `- **Định kiểu nghiêm ngặt (Strict Types):** Bắt buộc khai báo 'declare(strict_types=1)' ở đầu mỗi file PHP. Khai báo kiểu cho tham số và kiểu trả về.
- **Tuân thủ PSR:** Đỉnh cao là chuẩn viết code PSR-12. Sắp xếp autoloading gọn gàng theo chuẩn PSR-4.
- **Phòng chống SQL Injection:** Sử dụng Prepared Statements qua PDO để bảo mật truy vấn dữ liệu tuyệt đối.`;
    } else if (language === "react-native") {
      return `- **Hiệu năng Native:** Tránh thực hiện các tính toán nặng trên luồng chính UI thread. Sử dụng useMemo và useCallback để tối ưu render.
- **Quản lý Hình ảnh:** Sử dụng các thư viện tối ưu như FastImage để lưu bộ nhớ đệm và hiển thị hình ảnh hiệu quả.
- **Layout Responsive:** Sử dụng Flexbox linh hoạt kết hợp với Dimensions/PixelRatio để hỗ trợ tương thích đa màn hình thiết bị.`;
    } else if (language === "flutter") {
      return `- **Widget phân rã nguyên tử:** Giữ các file Widget ngắn gọn và tập trung vào một nhiệm vụ hiển thị duy nhất. Tách nhỏ Widget thay vì viết hàm trả về Widget.
- **Quản lý State:** Áp dụng mô hình chuẩn (Provider, Riverpod, Bloc, v.v.) một cách thống nhất để tách biệt logic giao diện.
- **Sử dụng Const Constructor:** Khai báo const cho các Widget tĩnh để Flutter bỏ qua bước re-build giúp tối ưu hóa FPS tối đa.`;
    } else if (language === "swift") {
      return `- **Tránh Strong Reference Cycles:** Sử dụng '[weak self]' hoặc '[unowned self]' trong closures để ngăn ngừa lỗi rò rỉ bộ nhớ (memory leaks).
- **Cú pháp Hiện đại:** Tận dụng Swift concurrency (async/await), struct (value types) và pattern matching gọn gàng.
- **Gói Optionals an toàn:** Tránh dùng dấu chấm than unwrapping '!'. Luôn dùng 'if let', 'guard let' hoặc coalescing '??'.`;
    } else if (language === "kotlin") {
      return `- **An toàn Null Safety:** Khai báo rõ ràng thuộc tính nullable (?) và non-null. Sử dụng toán tử an toàn (?.let) hoặc Elvis (?:).
- **Tận dụng Coroutines:** Sử dụng Kotlin Coroutines để xử lý tác vụ bất đồng bộ trên các Dispatchers (IO, Default, Main) chuẩn chỉ.
- **Sử dụng Data Class:** Lưu trữ thực thể dữ liệu bằng 'data class' để tự động sinh các hàm equals, hashCode, toString miễn phí.`;
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
    } else if (language === "react") {
      return `- **Functional Components & Hooks:** Write clean hooks (useState, useEffect). Extract complex custom hooks to encapsulate reusable stateful logic.
- **Minimal State:** Keep React state minimal. Derive values dynamically during render instead of storing derived state.
- **Stabilized Keys:** Always provide stable, unique 'key' props when rendering lists of elements.`;
    } else if (language === "java") {
      return `- **OOP & SOLID Principles:** Strictly follow SOLID design rules. Leverage standard Design Patterns (Singleton, Factory, Builder, etc.).
- **Exception Management:** Properly catch or throw checked/unchecked exceptions. Avoid catching generic 'Exception' class.
- **Thread Safety:** Use safe concurrent structures (ConcurrentHashMap, Atomic variables) instead of manual locks/synchronization where possible.`;
    } else if (language === "php") {
      return `- **Strict Types:** Enforce strict typing by declaring 'declare(strict_types=1)' at the very top of each PHP file. Annotate parameter and return types.
- **PSR Compliance:** Strictly adhere to PSR-12 coding standard. Manage clean autoloading via PSR-4 conventions.
- **Prevent SQL Injections:** Leverage Prepared Statements via PDO strictly to secure database queries against attacks.`;
    } else if (language === "react-native") {
      return `- **Native Performance:** Avoid running complex synchronous tasks on the main JS/UI thread. Wrap hooks inside useMemo and useCallback.
- **Image Caching:** Use optimized third-party components like FastImage to manage caching and efficient memory usage.
- **Responsive Layouts:** Rely on Flexbox grid layouts. Utilize Dimensions and PixelRatio to dynamically support multiple device viewports.`;
    } else if (language === "flutter") {
      return `- **Atomic Widget Refactoring:** Keep Widget files small, focused on single visual tasks. Prefer creating child classes over functional helpers.
- **State Management:** Enforce modular architecture pattern (Provider, Riverpod, BLoC) to decouple logic and presentation.
- **Const Constructors:** Use const constructor prefixes for static elements to completely bypass redundant engine paint steps.`;
    } else if (language === "swift") {
      return `- **Strong Reference Cycles prevention:** Explicitly write '[weak self]' or '[unowned self]' within closure blocks to avoid memory leaks.
- **Modern Syntax:** Leverage Swift native concurrency (async/await), structs (value types), and elegant pattern matching.
- **Safe Optionals unwrapping:** Ban force-unwrapping symbol '!'. Rely strictly on 'if let', 'guard let', or nil-coalescing '??'.`;
    } else if (language === "kotlin") {
      return `- **Null Safety:** Explicitly distinguish between nullable (?) and non-null types. Utilize safe-calls (?.let) or the Elvis operator (?:).
- **Coroutines Concurrency:** Leverage Kotlin Coroutines properly using context dispatchers (IO, Default, Main) for asynchronous tasks.
- **Data Classes:** Encapsulate entities with 'data class' definitions to generate equals, hashCode, and toString automatically.`;
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
