import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Command } from '@/models/Command';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    // If query is empty, return top 10 most viewed/popular commands
    if (!query || query.trim() === '') {
      const popularCommands = await Command.find({})
        .sort({ viewCount: -1 })
        .limit(10)
        .lean();
      return NextResponse.json({ success: true, data: popularCommands });
    }

    const filter: Record<string, unknown> = {
      $text: { $search: query }
    };

    // Perform text search, fetch textScore and sort by score and popularity
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

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
