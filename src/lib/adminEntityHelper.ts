import prisma from '@/lib/prisma';

export function getModelDelegate(entity: string) {
  const norm = entity.toLowerCase().replace(/[-_]/g, '');
  if (norm === 'projects' || norm === 'project') return prisma.project;
  if (norm === 'movies' || norm === 'movie') return prisma.movie;
  if (norm === 'certificates' || norm === 'certificate') return prisma.certificate;
  if (norm === 'gallery' || norm === 'galleryitems' || norm === 'galleryitem') return prisma.galleryItem;
  if (norm === 'youtube' || norm === 'youtubevideos' || norm === 'youtubevideo') return prisma.youTubeVideo;
  if (norm === 'youtubechannels' || norm === 'youtubechannel') return prisma.youTubeChannel;
  if (norm === 'timeline' || norm === 'timelinenodes' || norm === 'timelineitem') return prisma.timelineItem;
  if (norm === 'socials' || norm === 'sociallinks' || norm === 'sociallink') return prisma.socialLink;
  return null;
}

export function sanitizeEntityData(entity: string, data: Record<string, any>) {
  const norm = entity.toLowerCase().replace(/[-_]/g, '');
  const cleaned: Record<string, any> = { ...data };

  delete cleaned.id;
  delete cleaned.createdAt;
  delete cleaned.updatedAt;

  if (norm === 'projects' || norm === 'project') {
    if (cleaned.featured !== undefined) {
      cleaned.featured = typeof cleaned.featured === 'boolean' ? cleaned.featured : cleaned.featured === 'true' || cleaned.featured === 1;
    }
  } else if (norm === 'movies' || norm === 'movie') {
    if (cleaned.rating !== undefined) {
      cleaned.rating = parseFloat(cleaned.rating) || 0;
    }
  } else if (norm === 'timeline' || norm === 'timelinenodes' || norm === 'timelineitem') {
    if (cleaned.order !== undefined) {
      cleaned.order = parseInt(cleaned.order, 10) || 0;
    }
  }

  return cleaned;
}
