import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category } from '@/models/Category';
import { getCachedCategories, setCachedCategories, invalidateCache } from '@/lib/dataCache';
import { ICategory } from '@/types';
import { encodeResponse } from '@/lib/security';
import { withApiGuards } from '@/lib/apiHandler';

export async function GET() {
  try {
    const cached = getCachedCategories();
    if (cached) {
      return NextResponse.json({ success: true, data: cached });
    }

    await dbConnect();
    const categories = await Category.find({}).sort({ parentId: 1, order: 1 }).lean() as unknown as ICategory[];
    
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

export const POST = withApiGuards<any>(
  async (request, body, rlHeaders) => {
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required fields.' }, { status: 400 });
    }

    const newCategory = await Category.create(body);
    
    invalidateCache();
    
    const responsePayload = {
      success: true,
      data: newCategory,
      securePayload: encodeResponse(newCategory)
    };

    return NextResponse.json(responsePayload, { status: 201, headers: rlHeaders });
  },
  { rateLimitKey: 'post_category' }
);

