// 1. Kiểm tra API Key bảo mật từ headers hoặc URL parameters
export function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key') || new URL(request.url).searchParams.get('apiKey');
  const expectedKey = process.env.ADMIN_API_KEY || 'dev-vibe-super-secret-key-2026';
  return apiKey === expectedKey;
}

// 2. Chống tấn công CSRF bằng cách so khớp Origin / Referer với Host hiện tại
export function validateCsrf(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (origin && host) {
    // Loại bỏ giao thức http:// hoặc https:// để so sánh chuẩn
    const cleanOrigin = origin.replace(/^https?:\/\//, '');
    
    // Nếu origin khác host và không phải là môi trường local dev
    if (cleanOrigin !== host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      return false;
    }
  }
  return true;
}

// 3. Làm sạch input chống tấn công XSS, loại bỏ các tag script/iframe chèn mã độc
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return input;
  
  // Loại bỏ mã script và iframe chèn trái phép
  const clean = input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/onerror\s*=/gi, '');
    
  // Mã hóa các ký tự HTML cơ bản để ngăn chặn hiển thị sai cấu trúc
  return clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// 4. Đệ quy làm sạch toàn bộ các thuộc tính của một object đầu vào (body)
export function sanitizeObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)) as unknown as T;
  }
  
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

// 5. Mã hóa Response trả về dạng Base64
export function encodeResponse(data: unknown): string {
  const jsonStr = JSON.stringify(data);
  return Buffer.from(jsonStr).toString('base64');
}

// 6. Giải mã payload từ Client hoặc Server (hỗ trợ cả Node.js và trình duyệt)
export function decodePayload(base64Str: string): unknown {
  try {
    if (typeof window === 'undefined') {
      const jsonStr = Buffer.from(base64Str, 'base64').toString('utf8');
      return JSON.parse(jsonStr);
    } else {
      const binaryString = window.atob(base64Str);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decoder = new TextDecoder('utf-8');
      const jsonStr = decoder.decode(bytes);
      return JSON.parse(jsonStr);
    }
  } catch {
    return null;
  }
}
