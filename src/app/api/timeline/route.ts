import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mockTimeline } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await prisma.timelineItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (items.length > 0) {
      return NextResponse.json(items);
    }
  } catch (error) {
    console.warn('DB query failed for timeline, returning mock data:', error);
  }
  return NextResponse.json(mockTimeline);
}
