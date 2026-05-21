import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category } from '@/models/Category';
import { getCachedCategories, setCachedCategories, invalidateCache } from '@/lib/dataCache';
import { getClientIp, rateLimit } from '@/lib/rateLimiter';
import { ICategory } from '@/types';

export async function GET() {
  try {
    const cached = getCachedCategories();
    if (cached) {
      return NextResponse.json({ success: true, data: cached });
    }

    await dbConnect();
    const categories = await Category.find({}).sort({ parentId: 1, order: 1 }).lean() as unknown as ICategory[];
    
    // Ensure all ObjectIds are converted to strings if lean() returns them as ObjectIds
    const serializedCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString(),
    }));

    setCachedCategories(serializedCategories);
    return NextResponse.json({ success: true, data: serializedCategories });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(ip, 'post_category', 5, 60 * 1000);

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
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required fields.' }, { status: 400 });
    }

    const newCategory = await Category.create(body);
    
    // Invalidate categories and commands cache on any new creation
    invalidateCache();
    
    return NextResponse.json({ success: true, data: newCategory }, { status: 201, headers: rlHeaders });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
