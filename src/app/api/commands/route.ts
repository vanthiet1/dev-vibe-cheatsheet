import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const platform = searchParams.get('platform');
    const tag = searchParams.get('tag');

    const filter: Record<string, unknown> = {};
    if (categoryId) filter.categoryId = categoryId;
    if (platform) filter.platforms = platform;
    if (tag) filter.tags = tag;

    const commands = await Command.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: commands });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const requiredFields = ['categoryId', 'title', 'slug', 'command', 'description', 'platforms'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Field '${field}' is required.` }, { status: 400 });
      }
    }

    const newCommand = await Command.create(body);
    return NextResponse.json({ success: true, data: newCommand }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
