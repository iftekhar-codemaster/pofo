import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mockYouTubeData } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const channels = await prisma.youTubeChannel.findMany();
    const videos = await prisma.youTubeVideo.findMany();
    if (channels.length > 0 || videos.length > 0) {
      return NextResponse.json({ channels, videos });
    }
  } catch (error) {
    console.warn('DB query failed for YouTube, returning mock data:', error);
  }
  return NextResponse.json(mockYouTubeData);
}
