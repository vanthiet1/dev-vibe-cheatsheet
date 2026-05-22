import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';
import { getClientIp, rateLimit } from '@/lib/rateLimiter';

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(ip, 'search', 30, 60 * 1000);

    const rlHeaders = {
      'X-RateLimit-Limit': limitResult.limit.toString(),
      'X-RateLimit-Remaining': limitResult.remaining.toString(),
      'X-RateLimit-Reset': limitResult.resetTime.toString(),
    };

    if (!limitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Tìm kiếm quá nhanh! Vui lòng thử lại sau vài giây.' },
        { status: 429, headers: rlHeaders }
      );
    }
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      const popularCommands = await Command.find({})
        .sort({ viewCount: -1 })
        .limit(10)
        .lean();
      return NextResponse.json({ success: true, data: popularCommands }, { headers: rlHeaders });
    }

    const filter: Record<string, unknown> = {
      $text: { $search: query }
    };

    const results = await Command.find(
      filter,
      { score: { $meta: 'textScore' } }
    )
      .sort({
        score: { $meta: 'textScore' },
        viewCount: -1
      })
      .limit(10)
      .lean();

    return NextResponse.json({ success: true, data: results }, { headers: rlHeaders });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
