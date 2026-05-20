import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category } from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ parentId: 1, order: 1 }).lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required fields.' }, { status: 400 });
    }

    const newCategory = await Category.create(body);
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
