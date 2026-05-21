import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';
import { getCachedCommands, setCachedCommands, invalidateCache } from '@/lib/dataCache';
import { ICommand } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const tag = searchParams.get('tag');

    let commands = getCachedCommands();
    if (!commands) {
      await dbConnect();
      const dbCommands = await Command.find({}).sort({ createdAt: -1 }).lean() as unknown as ICommand[];
      
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
    await dbConnect();
    const body = await request.json();

    const requiredFields = ['categoryId', 'title', 'slug', 'command', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Field '${field}' is required.` }, { status: 400 });
      }
    }

    const newCommand = await Command.create(body);
    
    // Invalidate categories and commands cache on any new creation
    invalidateCache();

    return NextResponse.json({ success: true, data: newCommand }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
