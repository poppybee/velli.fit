import { NextRequest, NextResponse } from 'next/server';
import { getPagesData, savePagesData } from '@/lib/pages';

export async function GET() {
  const data = getPagesData();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  savePagesData(data);
  return NextResponse.json({ ok: true });
}
