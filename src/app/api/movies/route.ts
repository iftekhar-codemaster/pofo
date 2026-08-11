import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { fallbackMovies } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const totalCount = await prisma.movie.count();
    if (totalCount > 0) {
      const whereCondition = category ? { category } : {};
      const dbMovies = await prisma.movie.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(dbMovies);
    }
  } catch (error) {
    console.warn('Prisma lookup failed in movies route, using fallback:', error);
  }

  const filteredMock = category
    ? fallbackMovies.filter((m) => m.category === category)
    : fallbackMovies;

  return NextResponse.json(filteredMock);
}

