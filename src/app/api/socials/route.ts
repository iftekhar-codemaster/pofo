import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mockSocials } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const socials = await prisma.socialLink.findMany();
    if (socials.length > 0) {
      return NextResponse.json(socials);
    }
  } catch (error) {
    console.warn('DB query failed for socials, returning mock data:', error);
  }
  return NextResponse.json(mockSocials);
}
