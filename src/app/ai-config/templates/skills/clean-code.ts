export function getCleanCodeTemplate(
  formattedSlug: string,
  languageLabel: string,
  language: string,
  metadata: string
): string {
  return metadata + `# Kỹ năng Clean Code & Tiêu chuẩn hóa mã nguồn (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **SOLID & KISS:** Đảm bảo mỗi class, module, hay hàm chỉ thực hiện duy nhất một trách nhiệm được xác định rõ ràng (Single Responsibility). Thiết kế logic đơn giản, trực diện và dễ hiểu cho các lập trình viên khác.
- **DRY (Don't Repeat Yourself):** Loại bỏ triệt để việc lặp lại mã nguồn bằng cách trừu tượng hóa các hàm dùng chung vào thư mục tiện ích.
- **Tự giải thích (Self-Documenting):** Code viết ra phải rõ ràng đến mức không cần hoặc chỉ cần rất ít dòng chú thích.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Tuân thủ quy tắc định kiểu của ${languageLabel}. Định cấu hình ESLint/Prettier đồng bộ.
- Khai báo kiểu dữ liệu tường minh, cấm hoàn toàn kiểu mập mờ hoặc 'any' trong mã nguồn.
- Sử dụng tên biến có nghĩa, tránh viết tắt tùy tiện hoặc đặt tên chung chung như 'data', 'temp', 'info'.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Viết các hàm controller xử lý bất đồng bộ async/await sạch sẽ, phòng tránh callback hell.
- Kiểm soát tiến trình song song an toàn bằng Promise.all() hoặc Task.WhenAll() để tăng tốc độ phản hồi.
- Luôn kiểm soát vòng đời luồng dữ liệu (Streams, Observables) và giải phóng tài nguyên.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tránh tính toán trùng lặp, lưu bộ nhớ đệm (caching) các tác vụ nặng hoặc truy vấn DB.
- Tránh re-render không đáng có bằng useMemo/useCallback hoặc tối ưu hóa cấp phát bộ nhớ.
- Giảm thiểu kích thước gói bundle (bundle size) bằng kỹ thuật tree-shaking và dynamic imports.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch và kiểm tra chặt chẽ mọi dữ liệu gửi từ phía Client trước khi xử lý sâu hơn.
- Ngăn chặn lỗi chèn mã độc HTML/JS bằng cách mã hóa các ký tự đặc biệt (Sanitization/Escaping).
- Sử dụng cơ chế truyền tham số an toàn (Parameterized queries) để phòng chống SQL Injection.

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức tệp cấu trúc rõ ràng theo cấu trúc phân rã chức năng (feature-based).
- Tách biệt rõ ràng phần giao diện hiển thị (Presentation Layer) và phần xử lý nghiệp vụ (Business Logic).
- Sơ đồ cây thư mục tiêu chuẩn khuyến nghị:
  \`\`\`
  ├── src/
  │   ├── components/       # Thành phần UI tái sử dụng
  │   ├── hooks/            # Custom React Hooks
  │   ├── services/         # Tương tác API/Cơ sở dữ liệu
  │   └── utils/            # Hàm tiện ích dùng chung
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Hàm xử lý nghiệp vụ chuẩn chỉ, tự giải thích và an toàn dữ liệu
export async function fetchUserDashboardData(userId: string) {
  if (!userId) {
    throw new Error("User ID is required for dashboard compilation");
  }
  
  try {
    // Chạy song song các truy vấn bất đồng bộ độc lập để loại bỏ waterfalls
    const [profile, preferences] = await Promise.all([
      db.getUserProfile(userId),
      db.getUserPreferences(userId)
    ]);
    
    return {
      success: true,
      data: {
        id: profile.id,
        fullName: \`\${profile.firstName} \${profile.lastName}\`,
        theme: preferences.theme || "dark",
        notificationsEnabled: preferences.notificationsEnabled ?? true
      }
    };
  } catch (error) {
    logger.error("Failed to compile dashboard data", { userId, error });
    throw new DomainException("Dashboard compiling failed, please retry later");
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Áp dụng mô hình chuẩn AAA (Arrange-Act-Assert) để xây dựng các test suites chất lượng.
- Mock đầy đủ các dịch vụ API bên ngoài và cơ sở dữ liệu để kiểm thử unit độc lập.
- Duy trì tỷ lệ bao phủ kiểm thử (Test Coverage) ở mức tối thiểu 80% đối với core logic.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Sử dụng cơ chế ném lỗi tùy chỉnh (Custom Exceptions) để biểu diễn các trạng thái lỗi nghiệp vụ rõ ràng.
- Đảm bảo bọc toàn bộ mã nguồn xử lý I/O hoặc API ngoài trong khối try-catch an toàn.
- Ghi nhật ký lỗi (Logging) chi tiết kèm theo thông tin ngữ cảnh để hỗ trợ phân tích nguyên nhân gốc rễ.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra định dạng và phân tích mã nguồn tĩnh cục bộ:
  \`\`\`bash
  npm run lint && npm run format
  \`\`\`
- Đồng bộ hóa các quy tắc kiểm tra này trực tiếp vào luồng GitHub Actions kiểm thử trước khi merge PR.`;
}
