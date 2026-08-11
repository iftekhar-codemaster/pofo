import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { fallbackMovies } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const apiKey = process.env.TMDB_API_KEY;

  // Try DB first if populated
  try {
    const whereCondition = category ? { category } : {};
    const dbMovies = await prisma.movie.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
    });
    if (dbMovies && dbMovies.length > 0) {
      return NextResponse.json(dbMovies);
    }
  } catch (error) {
    console.warn('Prisma lookup failed in TMDB route, falling back to external/mock:', error);
  }

  // If TMDB_API_KEY exists, attempt live TMDB API call
  if (apiKey) {
    try {
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      if (tmdbRes.ok) {
        const tmdbData = await tmdbRes.json();
        const formattedMovies = tmdbData.results.map((m: any) => ({
          id: String(m.id),
          title: m.title,
          tmdbId: String(m.id),
          posterPath: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : '/placeholder-movie.jpg',
          rating: m.vote_average,
          synopsis: m.overview,
          category: category || 'watched',
        }));
        return NextResponse.json(formattedMovies);
      }
    } catch (e) {
      console.warn('TMDB API fetch failed, falling back to mock dataset:', e);
    }
  }

  // Fallback to mock dataset
  const filteredMock = category
    ? fallbackMovies.filter((m) => m.category === category)
    : fallbackMovies;

  return NextResponse.json(filteredMock);
}
