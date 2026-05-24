import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getClientIp, rateLimit } from "@/lib/rateLimiter";
import { validateApiKey, validateCsrf, sanitizeObject } from "@/lib/security";

interface ApiGuardOptions {
  rateLimitKey: string;
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
  requireAuth?: boolean;
  requireCsrf?: boolean;
}

export function withApiGuards<T = Record<string, any>>(
  handler: (request: Request, body: T, rlHeaders: Record<string, string>) => Promise<NextResponse>,
  options: ApiGuardOptions
) {
  const {
    rateLimitKey,
    rateLimitMax = 5,
    rateLimitWindowMs = 60 * 1000,
    requireAuth = true,
    requireCsrf = true,
  } = options;

  return async (request: Request): Promise<NextResponse> => {
    try {
      // 1. Rate Limiting
      const ip = getClientIp(request);
      const limitResult = rateLimit(ip, rateLimitKey, rateLimitMax, rateLimitWindowMs);

      const rlHeaders = {
        "X-RateLimit-Limit": limitResult.limit.toString(),
        "X-RateLimit-Remaining": limitResult.remaining.toString(),
        "X-RateLimit-Reset": limitResult.resetTime.toString(),
      };

      if (!limitResult.success) {
        return NextResponse.json(
          { success: false, error: "Thao tác quá nhanh! Vui lòng thử lại sau 1 phút." },
          { status: 429, headers: rlHeaders }
        );
      }

      // 2. CSRF protection
      if (requireCsrf && !validateCsrf(request)) {
        return NextResponse.json(
          { success: false, error: "Yêu cầu bị chặn bởi chính sách CSRF!" },
          { status: 403, headers: rlHeaders }
        );
      }

      // 3. API key validation
      if (requireAuth && !validateApiKey(request)) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: API Key không hợp lệ hoặc bị thiếu!" },
          { status: 401, headers: rlHeaders }
        );
      }

      // 4. Auto DB connection
      await dbConnect();

      // 5. Parse and sanitize body
      let body: T = {} as T;
      if (request.body) {
        try {
          const rawBody = await request.json();
          body = sanitizeObject(rawBody) as T;
        } catch {
          // Body parsing could fail for empty requests
        }
      }

      // 6. Invoke the main handler
      return await handler(request, body, rlHeaders);
    } catch (error) {
      const err = error as Error;
      return NextResponse.json(
        { success: false, error: err.message || "An unexpected error occurred." },
        { status: 500 }
      );
    }
  };
}
