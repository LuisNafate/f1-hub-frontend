import { type NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const targetPath = `/api/f1/${path.join('/')}`;
  const search = request.nextUrl.search;
  const url = `${BACKEND_URL}${targetPath}${search}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
