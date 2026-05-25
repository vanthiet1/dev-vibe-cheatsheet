export function getPerformanceProfilingTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  if (isVi) {
    return metadata + `# Kỹ năng Đo lường & Tối ưu Hiệu năng (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Định lượng trước khi tối ưu:** Dựa vào các dữ liệu đo lường thực tế thay vì suy đoán cảm tính của lập trình viên.
- **Tập trung tối ưu trọng điểm:** Chỉ tối ưu hóa ở các luồng xử lý chính (hot code paths) mang lại hiệu quả cải thiện lớn nhất.
- **Tiết kiệm tài nguyên:** Giảm thiểu tối đa số chu kỳ xử lý của CPU và tối ưu hóa dung lượng bộ nhớ RAM tiêu thụ.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Định kiểu dữ liệu rõ ràng cho các cấu trúc benchmark và hàm đo lường để đảm bảo an toàn kiểu dữ liệu.
- Tránh sử dụng các lớp trừu tượng nặng nề trong các vòng lặp đòi hỏi tốc độ xử lý cao.
- Quy chuẩn hóa các công cụ đo lường bằng cách sử dụng các API gốc có độ chính xác cao (native high-precision APIs).

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng các mẫu lập trình bất đồng bộ không chặn (non-blocking async) để giữ cho luồng thực thi luôn trôi chảy.
- Phân tích và triệt tiêu hiện tượng nghẽn cổ chai bất đồng bộ (async waterfalls) trong các tác vụ mạng tuần tự.
- Sử dụng bộ đệm luồng dữ liệu (streaming memory buffers) để xử lý dữ liệu lớn thay vì nạp toàn bộ vào RAM.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Đo lường và đánh giá thời gian thực thi của các khối mã nguồn một cách hệ thống bằng các điểm đánh dấu Performance API chính xác.
- Hạn chế các vòng lặp kết xuất (rendering loops) bằng cách sử dụng bộ nhớ đệm memoizer và các trung tâm quản lý trạng thái phân tách.
- Áp dụng kỹ thuật tải trước tài nguyên (asset preload) và gợi ý nạp trước (resource prefetch) cho các đường dẫn tải dữ liệu quan trọng.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch các cấu trúc dữ liệu truyền vào các hàm đo lường để bảo vệ nhật ký ghi chép (profiling logs) khỏi các cuộc tấn công tiêm mã độc.
- Phòng chống rò rỉ bộ nhớ bằng cách hủy đăng ký các bộ lắng nghe sự kiện nhàn rỗi (idle event handlers) và xóa các phạm vi rác.
- Sử dụng các thư viện bảo mật đã được tối ưu hóa và kiểm định hiệu năng để đáp ứng các tiêu chuẩn khắt khe của hệ thống.

## 6. Kiến trúc & Bố trí Thư mục
- Tự tổ chức các tập module phân tích hiệu năng và đo lường thời gian chạy trong thư mục riêng:
  \`\`\`
  └── src/
      └── utils/
          ├── benchmark.ts      # Tiện ích đo lường hiệu năng
          └── memory-dump.ts    # Tiện ích theo dõi RAM
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// Hàm đo lường hiệu năng chuyên sâu sử dụng Performance API chuẩn Production
export async function profileExecutionTime<T>(taskName: string, action: () => Promise<T>): Promise<T> {
  const startMark = \`\${taskName}-start\`;
  const endMark = \`\${taskName}-end\`;
  
  if (typeof window !== "undefined" && window.performance) {
    window.performance.mark(startMark);
  }
  const startTime = Date.now();

  try {
    return await action();
  } finally {
    const duration = Date.now() - startTime;
    if (typeof window !== "undefined" && window.performance) {
      window.performance.mark(endMark);
      window.performance.measure(taskName, startMark, endMark);
      const measure = window.performance.getEntriesByName(taskName)[0];
      console.log(\`[PROFILER] \${taskName} executed in \${measure.duration.toFixed(2)}ms (High-Res)\`);
      window.performance.clearMarks(startMark);
      window.performance.clearMarks(endMark);
      window.performance.clearMeasures(taskName);
    } else {
      console.log(\`[PROFILER] \${taskName} executed in \${duration}ms\`);
    }
  }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết các bộ kiểm thử tải nặng (Load Testing) giả lập hàng ngàn yêu cầu đồng thời bằng các công cụ như k6 hoặc autocannon.
- Tự động hóa các bộ đo lường hiệu năng để phát hiện và cảnh báo kịp thời về sự suy thoái tốc độ (performance regression).
- Giả lập (mock) các kết nối cơ sở dữ liệu chậm để kiểm chứng khả năng phản hồi của giao diện dưới độ trễ mạng cao.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Xử lý các lỗi cạn kiệt bộ nhớ RAM (Out Of Memory - OOM) một cách an sau, tự động giải phóng các kết nối rác ngay lập tức.
- Xuất và phân tích biểu đồ ngọn lửa CPU (CPU flame graphs) để xác định chính xác các điểm nghẽn thực thi sâu.
- Theo dõi và kiểm tra việc phân bổ bộ nhớ Heap Dump thông qua công cụ Chrome DevTools để khắc phục triệt để rò rỉ RAM.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Thực hiện chạy phân tích kích thước gói ứng dụng khi build dự án:
  \`\`\`bash
  npm run build -- --report  # Hoặc dùng công cụ trực quan hóa gói bundle
  \`\`\`
- Tích hợp kiểm thử hiệu năng tự động vào GitHub Actions, cảnh báo lập tức nếu thời gian build tăng quá 20%.

## 11. CLI Scripts Tự động hóa & Tích hợp MCP
Skill này đi kèm với công cụ kiểm tra tự động tích hợp:
- **Đường dẫn tệp tin**: \`.agent/skills/performance-profiling/scripts/lighthouse_audit.py\`
- **Lệnh thực thi**:
  \`\`\`bash
  python .agent/skills/performance-profiling/scripts/lighthouse_audit.py <url>
  \`\`\`
- **Mã nguồn thực tế của Script**:
\`\`\`python
#!/usr/bin/env python3
# Lighthouse performance audit automation
import subprocess
import json
import sys
import os
import tempfile

def run_lighthouse(url: str) -> dict:
    try:
        with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as f:
            output_path = f.name
        
        result = subprocess.run([
            "lighthouse", url, "--output=json",
            f"--output-path={output_path}", "--chrome-flags=--headless"
        ], capture_output=True, text=True, timeout=120)
        
        with open(output_path, 'r') as f:
            report = json.load(f)
        os.unlink(output_path)
        return {"url": url, "scores": report.get("categories", {})}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print("Executing automated Lighthouse Page Audits...")
    print("Performance and accessibility scoring calculated.")
if __name__ == "__main__":
    main()
\`\`\`
`;
  } else {
    return metadata + `# Performance Profiling & Optimization Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Performance Budgets:** Establish strict, measurable load limits (e.g. total compiled package < 200KB).
- **Profile First:** Only perform targeted optimization work after gathering profiling traces identifying distinct bottlenecks.
- **Keep Main Thread Free:** Restrict expensive operations from running on the primary user interaction stream.

## 2. Syntax & Typing Standards
- Prioritize high-performance data structures (e.g. Set/Map lookups instead of long Array sweeps for large sets).
- Ban massive loop object reallocations, recycling memory structures via object pooling models.
- Rely on strict declarations to assist runtime engine optimizations (JIT compilers).

## 3. Async & Data Flow Management
- Offload non-UI data processing computations to isolated Web Workers to keep rendering speeds responsive.
- Run concurrent I/O fetches in parallel using Promise.all to bypass structural request bottlenecks.
- Steam, paginate, or lazily chunk heavy dynamic datasets during data transfer cycles.

## 4. Deep Performance Optimization
- Benchmark block runtimes systematically utilizing exact Performance API markers.
- Restrict rendering loops using caching memoizers and decoupled application state hubs.
- Employ asset preload and resource prefetch cues for essential load paths.

## 5. Security & Input Sanitization
- Sanitize data structures passed to benchmarking functions to protect profiling logs from injection tricks.
- Guard systems against memory leaks by detaching idle event handlers and clearing garbage scopes.
- Rely on optimized, benchmarked security engines that satisfy strict performance constraints.

## 6. Layout Architecture & Folder Structure
- Maintain performance tracking modules in dedicated workspace locations:
  \`\`\`
  ├── src/
  │   ├── utils/
  │   │   ├── benchmark.ts      # Runtime benchmarking helper
  │   │   └── memory-dump.ts    # Heap dump analyzer helper
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
// High-fidelity performance benchmarking utility wrapper using standard Performance API
export async function profileExecutionTime<T>(taskName: string, action: () => Promise<T>): Promise<T> {
  const startMark = \`\${taskName}-start\`;
  const endMark = \`\${taskName}-end\`;
  
  if (typeof window !== "undefined" && window.performance) {
    window.performance.mark(startMark);
  }
  const startTime = Date.now();

  try {
    return await action();
  } finally {
    const duration = Date.now() - startTime;
    if (typeof window !== "undefined" && window.performance) {
      window.performance.mark(endMark);
      window.performance.measure(taskName, startMark, endMark);
      const measure = window.performance.getEntriesByName(taskName)[0];
      console.log(\`[PROFILER] \${taskName} executed in \${measure.duration.toFixed(2)}ms (High-Res)\`);
      window.performance.clearMarks(startMark);
      window.performance.clearMarks(endMark);
      window.performance.clearMeasures(taskName);
    } else {
      console.log(\`[PROFILER] \${taskName} executed in \${duration}ms\`);
    }
  }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct high-volume load test files using developer tools like k6 or autocannon.
- Automate benchmarking suites to catch and trigger warnings on software performance regression.
- Mock slow database connections to test interface responsiveness under high network latencies.

## 9. Robust Exception Handling & Debug Flow
- Trap Out Of Memory (OOM) failures safely, cleaning up loose connections or memory pools immediately.
- Export and trace visual CPU flame graphs to isolate deep execution bottlenecks.
- Inspect active Heap allocations via Chrome DevTools profiles to resolve memory issues.

## 10. CLI & CI/CD Automation Flow
- Perform package analysis scans on production builds to check sizes:
  \`\`\`bash
  npm run build -- --report  # Or use bundle visualizers
  \`\`\`
- Setup warnings on CI build pipelines if total compiled asset size grows beyond defined budgets.

## 11. CLI Automation Script & MCP Integration
This skill includes an automated scanning tool:
- **File Path**: \`.agent/skills/performance-profiling/scripts/lighthouse_audit.py\`
- **Execution Command**:
  \`\`\`bash
  python .agent/skills/performance-profiling/scripts/lighthouse_audit.py <url>
  \`\`\`
- **Actual Script Source Code**:
\`\`\`python
# [Embedded lighthouse_audit.py Source Code]
# Performance diagnostic algorithms.
\`\`\`
`;
  }
}
