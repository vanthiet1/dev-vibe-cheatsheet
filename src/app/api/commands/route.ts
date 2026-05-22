import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';
import { getCachedCommands, setCachedCommands, invalidateCache } from '@/lib/dataCache';
import { getClientIp, rateLimit } from '@/lib/rateLimiter';
import { ICommand } from '@/types';
import { validateApiKey, validateCsrf, sanitizeObject, encodeResponse } from '@/lib/security';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const tag = searchParams.get('tag');

    let commands = getCachedCommands();
    if (!commands) {
      await dbConnect();
      const dbCommands = await Command.find({}).sort({ createdAt: 1 }).lean() as unknown as ICommand[];
      
      // Ensure all ObjectIds are converted to strings if lean() returns them as ObjectIds
      commands = dbCommands.map(cmd => ({
        ...cmd,
        _id: cmd._id.toString(),
      }));
      
      setCachedCommands(commands);
    }

    // Perform sub-millisecond in-memory filtering on the cached array
    let filtered = commands;
    if (categoryId) {
      filtered = filtered.filter(cmd => cmd.categoryId === categoryId);
    }
    if (tag) {
      filtered = filtered.filter(cmd => cmd.tags.includes(tag));
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(ip, 'post_command', 5, 60 * 1000);

    const rlHeaders = {
      'X-RateLimit-Limit': limitResult.limit.toString(),
      'X-RateLimit-Remaining': limitResult.remaining.toString(),
      'X-RateLimit-Reset': limitResult.resetTime.toString(),
    };

    if (!limitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Thao tác quá nhanh! Vui lòng thử lại sau 1 phút.' },
        { status: 429, headers: rlHeaders }
      );
    }

    // 1. Kiểm tra tấn công CSRF
    if (!validateCsrf(request)) {
      return NextResponse.json(
        { success: false, error: 'Yêu cầu bị chặn bởi chính sách CSRF!' },
        { status: 403, headers: rlHeaders }
      );
    }

    // 2. Xác thực API Key ngăn chặn thao tác bậy ngoài ý muốn
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: API Key không hợp lệ hoặc bị thiếu!' },
        { status: 401, headers: rlHeaders }
      );
    }

    await dbConnect();
    const rawBody = await request.json();

    // 3. Làm sạch input chống chèn script XSS độc hại trước khi xử lý
    const body = sanitizeObject(rawBody);

    const requiredFields = ['categoryId', 'title', 'slug', 'command', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Trường '${field}' là bắt buộc.` }, { status: 400 });
      }
    }

    const newCommand = await Command.create(body);
    
    // Invalidate categories and commands cache on any new creation
    invalidateCache();

    // 4. Chuẩn hóa dữ liệu trả về và mã hóa an toàn (securePayload)
    const responsePayload = {
      success: true,
      data: newCommand,
      securePayload: encodeResponse(newCommand)
    };

    return NextResponse.json(responsePayload, { status: 201, headers: rlHeaders });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

