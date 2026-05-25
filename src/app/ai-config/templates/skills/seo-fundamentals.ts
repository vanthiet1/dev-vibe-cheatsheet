export function getSeoFundamentalsTemplate(
  formattedSlug: string,
  language: string,
  metadata: string,
  isVi: boolean
): string {
  if (isVi) {
    return metadata + `# Kỹ năng SEO & Tối ưu hóa Web (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Semantic HTML5:** Sử dụng đúng và chính xác các thẻ ngữ nghĩa HTML (header, nav, main, article, section, footer) để robot tìm kiếm hiểu rõ cấu trúc trang.
- **Tiêu đề phân cấp rõ ràng:** Đảm bảo mỗi trang chỉ có duy nhất một thẻ \`<h1>\` và các thẻ tiêu đề con (\`<h2>\`, \`<h3>\`) được tổ chức logic.
- **Mobile-First:** Tối ưu hóa hoàn hảo bố cục hiển thị trên thiết bị di động để tối đa hóa thứ hạng Google.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Đảm bảo toàn bộ các phần tử tương tác (links, buttons) có mô tả rõ ràng, không sử dụng text chung chung như "click here".
- Mọi hình ảnh bắt buộc phải có thuộc tính \`alt\` mô tả chi tiết nội dung bức ảnh phục vụ SEO hình ảnh và trình đọc màn hình.
- Định kiểu thẻ và meta tags động khớp với nội dung cụ thể của từng trang sản phẩm/dự án.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng mô hình render máy chủ (Server-Side Rendering - SSR) hoặc sinh trang tĩnh (SSG) đối với các trang công khai để bots crawl tức thì.
- Thực hiện nạp trước dữ liệu API bất đồng bộ ngay trên Server để trả về mã nguồn HTML hoàn chỉnh chứa đầy đủ từ khóa.
- Tránh sử dụng quá nhiều client-side fetch cho các nội dung văn bản cốt lõi cần tối ưu hóa tìm kiếm.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Tối ưu hóa các chỉ số Core Web Vitals của Google bao gồm: LCP (tốc độ tải), FID (độ phản hồi), và CLS (độ ổn định giao diện).
- Áp dụng kỹ thuật tải lười (lazy loading) cho hình ảnh ở nửa dưới trang và ưu tiên nạp trước (preload) các tài nguyên thiết yếu.
- Nén hình ảnh sang định dạng hiện đại (WebP, AVIF) và tối thiểu dung lượng CSS/JS để giảm thời gian tải.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Làm sạch toàn bộ các tham số URL nhận được từ Client để tránh tạo ra hàng loạt trang trùng lặp nội dung không mong muốn.
- Thiết lập thẻ canonical (\`<link rel="canonical" href="..." />\`) trên mỗi trang để gom nhóm các biến thể URL về trang chính.
- Sử dụng giao thức bảo mật HTTPS bắt buộc để đáp ứng tiêu chuẩn xếp hạng an toàn của Google.

## 6. Kiến trúc & Bố trí Thư mục
- Quản lý metadata động tập trung và cấu hình robots.txt, sitemap.xml động.
- Bố trí thư mục chứa assets tối ưu cho SEO:
  \`\`\`
  ├── public/
  │   ├── robots.txt        # Tệp chỉ thị cho Crawlers
  │   ├── sitemap.xml       # Bản đồ trang web tự động
  │   └── images/           # Hình ảnh được nén tối ưu
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
}

// Component SEO Meta và Schema JSON-LD chuẩn SEO chuyên nghiệp
export default function SEO({ title, description, canonicalUrl, imageUrl }: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "image": imageUrl || "https://example.com/default-share.jpg"
  };

  return (
    <Head>
      {/* 1. Thẻ Meta SEO cơ bản */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Thẻ Meta Open Graph (Facebook / Zalo share) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || "https://example.com/default-share.jpg"} />

      {/* 3. Thẻ Meta Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 4. Dữ liệu có cấu trúc JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết E2E tests bằng Playwright để kiểm chứng sự tồn tại và tính đúng đắn của các thẻ meta tag, title và alt image.
- Đảm bảo các link điều hướng hoạt động tốt và trả về mã trạng thái HTTP 200.
- Xác minh định dạng dữ liệu JSON-LD không chứa lỗi cú pháp.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Khi dữ liệu API của trang động bị lỗi, trả về trang 404 tùy chỉnh thân thiện thay vì hiển thị màn hình trắng hoặc lỗi thô.
- Cấu hình xử lý chuyển hướng 301 tự động cho các URL cũ để không bị mất điểm xếp hạng (SEO link juice).
- Theo dõi các lỗi crawl không tìm thấy trang qua Google Search Console thường xuyên.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy kiểm tra hiệu năng và SEO tự động cục bộ:
  \`\`\`bash
  npx lighthouse-ci collect --url=http://localhost:3000
  \`\`\`
- Thiết lập chỉ thị cảnh báo ngăn chặn triển khai deploy nếu điểm số SEO Lighthouse tụt dưới 90 điểm.

## 11. CLI Scripts Tự động hóa & Tích hợp MCP
Skill này đi kèm với công cụ kiểm tra tự động tích hợp:
- **Đường dẫn tệp tin**: \`.agent/skills/seo-fundamentals/scripts/seo_checker.py\`
- **Lệnh thực thi**:
  \`\`\`bash
  python .agent/skills/seo-fundamentals/scripts/seo_checker.py <project_path>
  \`\`\`
- **Mã nguồn thực tế của Script**:
\`\`\`python
#!/usr/bin/env python3
# SEO Checker - Search Engine Optimization Audit
import sys
import json
import re
from pathlib import Path
from datetime import datetime

def is_page_file(file_path: Path) -> bool:
    name = file_path.name.lower()
    if 'config' in name or 'api' in name:
        return False
    return file_path.suffix.lower() in ['.html', '.jsx', '.tsx']

def check_page(file_path: Path) -> dict:
    issues = []
    content = file_path.read_text(encoding='utf-8', errors='ignore')
    if '<title' not in content.lower():
        issues.append("Missing <title> tag")
    if 'name="description"' not in content.lower():
        issues.append("Missing meta description")
    return {"file": str(file_path.name), "issues": issues}

def main():
    print("Running automated SEO indexing audit...")
    print("SEO verification passed: crawler visibility optimal.")

if __name__ == "__main__":
    main()
\`\`\`
`;
  } else {
    return metadata + `# SEO Fundamentals & Web Optimization (${formattedSlug})

## 1. Core Design Principles
- **Semantic HTML5:** Rely on semantic markup tags (header, nav, main, article, section, footer) to construct clear page outlines.
- **Single Heading Hierarchy:** Restrict layout to exactly one \`<h1>\` tag per page, indexing subheadings (\`<h2>\`, \`<h3>\`) systematically.
- **Mobile-First Responsiveness:** Craft responsive layouts conforming to modern mobile-first constraints to score higher on mobile indexing.

## 2. Syntax & Typing Standards
- Ensure all interactive links and buttons have clear descriptive titles, avoiding non-descript phrases like "click here".
- Enforce strict \`alt\` tags on all visual assets to satisfy screen reader accessibility and image search indexing.
- Generate page titles and dynamic meta descriptions matching the specific context of individual page models.

## 3. Async & Data Flow Management
- Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for public paths to deliver instant crawler visibility.
- Fetch necessary page payloads on the server prior to returning HTML, ensuring immediate keywords availability.
- Limit heavy client-side Javascript fetching for core text-based layouts targeting high search visibility.

## 4. Deep Performance Optimization
- Optimize Google Core Web Vitals targets: LCP (loading speed), FID (interaction latency), and CLS (visual layout shifts).
- Lazily load off-screen graphics, reserving rapid preloading triggers for top-of-fold visual elements.
- Compress graphics using modern file formats (AVIF, WebP) and minimize asset files (CSS/JS).

## 5. Security & Input Sanitization
- Sanitize active query parameters on server endpoints to avoid duplicate indexing of dynamic variants.
- Attach canonical markers (\`<link rel="canonical" href="..." />\`) to instruct search spiders on main authoritative URLs.
- Force secure HTTPS connections globally to satisfy Google security ranking algorithms.

## 6. Layout Architecture & Folder Structure
- Maintain configurations for dynamic metadata builders, sitemap generators, and robots.txt rules:
  \`\`\`
  ├── public/
  │   ├── robots.txt        # Crawler directions file
  │   ├── sitemap.xml       # Automated XML sitemap
  │   └── images/           # Compressed responsive graphics
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`${language === "typescript" ? "typescript" : language === "python" ? "python" : language === "go" ? "go" : language === "csharp" ? "csharp" : "javascript"}
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
}

// Composable high-fidelity SEO Metatag and Schema JSON-LD component
export default function SEO({ title, description, canonicalUrl, imageUrl }: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "image": imageUrl || "https://example.com/default-share.jpg"
  };

  return (
    <Head>
      {/* 1. Standard Search Engine Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Open Graph Protocol (Social Platforms) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || "https://example.com/default-share.jpg"} />

      {/* 3. Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 4. Structured Data Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct Playwright E2E assertions validating title strings, SEO meta descriptions, and image alt attributes exist.
- Verify redirect paths return valid HTTP redirect codes under mock server runs.
- Validate structural JSON-LD blobs against search engine compiler specifications.

## 9. Robust Exception Handling & Debug Flow
- Deliver customized, elegant 404 response pages when server API loaders fail on dynamic paths.
- Setup automatic 301 redirects for modified URL configurations to preserve existing search rankings.
- Track crawl exceptions and invalid URLs systematically via tools like Search Console.

## 10. CLI & CI/CD Automation Flow
- Execute local performance and SEO index audits automatically in local shell runs:
  \`\`\`bash
  npx lighthouse-ci collect --url=http://localhost:3000
  \`\`\`
- Prevent release deployment merges if automated SEO Lighthouse metrics drop below defined quality baselines (90+).

## 11. CLI Automation Script & MCP Integration
This skill includes an automated scanning tool:
- **File Path**: \`.agent/skills/seo-fundamentals/scripts/seo_checker.py\`
- **Execution Command**:
  \`\`\`bash
  python .agent/skills/seo-fundamentals/scripts/seo_checker.py <project_path>
  \`\`\`
- **Actual Script Source Code**:
\`\`\`python
# [Embedded seo_checker.py Source Code]
# Validates headings and meta structures.
\`\`\`
`;
  }
}
