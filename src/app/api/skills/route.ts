import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePathParam = searchParams.get('path');

    if (!filePathParam) {
      return NextResponse.json({ success: false, error: 'Path parameter is required' }, { status: 400 });
    }

    // Prevent directory traversal
    const normalizedPath = path.normalize(filePathParam).replace(/^(\.\.(\/|\\))+/, '');
    
    // Ensure the path is within the allowed workspaces folders (.agent or .gemini)
    if (!normalizedPath.startsWith('.agent') && !normalizedPath.startsWith('.gemini')) {
      return NextResponse.json({ success: false, error: 'Access denied: Out of bound path' }, { status: 403 });
    }

    // Resolve the absolute path in the workspace
    const workspaceRoot = path.resolve(process.cwd());
    const absolutePath = path.join(workspaceRoot, normalizedPath);

    // Verify it doesn't escape the root workspace directory
    if (!absolutePath.startsWith(workspaceRoot)) {
      return NextResponse.json({ success: false, error: 'Access denied: Directory traversal' }, { status: 403 });
    }

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(absolutePath, 'utf8');

    return NextResponse.json({
      success: true,
      content: fileContent
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
