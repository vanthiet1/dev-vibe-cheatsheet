import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';
import { getCachedCommands, setCachedCommands, invalidateCache } from '@/lib/dataCache';
import { ICommand } from '@/types';
import { encodeResponse } from '@/lib/security';
import { withApiGuards } from '@/lib/apiHandler';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const tag = searchParams.get('tag');

    let commands = getCachedCommands();
    if (!commands) {
      await dbConnect();
      const dbCommands = await Command.find({}).sort({ createdAt: 1 }).lean() as unknown as ICommand[];
      
      commands = dbCommands.map(cmd => ({
        ...cmd,
        _id: cmd._id.toString(),
      }));
      
      setCachedCommands(commands);
    }

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

export const POST = withApiGuards<any>(
  async (request, body, rlHeaders) => {
    const requiredFields = ['categoryId', 'title', 'slug', 'command', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Trường '${field}' là bắt buộc.` }, { status: 400 });
      }
    }

    const newCommand = await Command.create(body);
    
    invalidateCache();

    const responsePayload = {
      success: true,
      data: newCommand,
      securePayload: encodeResponse(newCommand)
    };

    return NextResponse.json(responsePayload, { status: 201, headers: rlHeaders });
  },
  { rateLimitKey: 'post_command' }
);


