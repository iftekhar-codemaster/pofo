import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed AdminUser
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: { username: 'admin', passwordHash },
  });
  console.log('Admin user ready:', admin.username);

  // 2. Seed Certificates (All 10 verified from identity.md)
  await prisma.certificate.deleteMany();
  const certificates = [
    {
      title: 'Career Essentials in Generative AI',
      issuer: 'Microsoft and LinkedIn',
      date: 'Jul 2026',
      credentialId: 'ms-linkedin-genai-2026-ce',
      skills: 'Prompt Engineering, Generative AI',
      category: 'Generative AI',
      url: 'https://www.linkedin.com/learning/certificates/career-essentials-generative-ai',
    },
    {
      title: 'Everyday AI Concepts',
      issuer: 'LinkedIn',
      date: 'Jul 2026',
      credentialId: 'linkedin-everyday-ai-2026',
      skills: 'AI Concepts, AI Literacy',
      category: 'Generative AI',
      url: 'https://www.linkedin.com/learning/certificates/everyday-ai-concepts',
    },
    {
      title: 'Ethics in the Age of Generative AI',
      issuer: 'NASBA',
      date: 'Jul 2026',
      credentialId: '2de1c85e6540296a62a199d3de606cfcf7e73b5442b520f69cf94f6e3ae6ac22',
      skills: 'Responsible AI, AI Ethics',
      category: 'AI Ethics',
      url: 'https://www.linkedin.com/learning/certificates/ethics-generative-ai-nasba',
    },
    {
      title: 'Ethics in the Age of Generative AI',
      issuer: 'Project Management Institute (PMI)',
      date: 'Jul 2026',
      credentialId: '811168be5d1298cb8e6716332769bd06b51e43938f82cf7b7d94829d3882e1fe',
      skills: 'Responsible AI, Computer Ethics, Project Management',
      category: 'AI Ethics',
      url: 'https://www.linkedin.com/learning/certificates/ethics-generative-ai-pmi',
    },
    {
      title: 'Ethics in the Age of Generative AI',
      issuer: 'LinkedIn',
      date: 'Jul 2026',
      credentialId: 'linkedin-ethics-genai-2026',
      skills: 'Computer Ethics, Responsible AI',
      category: 'AI Ethics',
      url: 'https://www.linkedin.com/learning/certificates/ethics-generative-ai-linkedin',
    },
    {
      title: 'Learning Microsoft 365 Copilot for Work',
      issuer: 'LinkedIn',
      date: 'Jul 2026',
      credentialId: 'linkedin-copilot-work-2026',
      skills: 'Microsoft Copilot, AI for Business, AI Productivity',
      category: 'AI Productivity',
      url: 'https://www.linkedin.com/learning/certificates/learning-microsoft-365-copilot-work',
    },
    {
      title: 'Your Top AI Questions Answered: AI Literacy for Everyone',
      issuer: 'LinkedIn',
      date: 'Jul 2026',
      credentialId: 'linkedin-ai-literacy-2026',
      skills: 'AI Literacy, Generative AI',
      category: 'Generative AI',
      url: 'https://www.linkedin.com/learning/certificates/ai-literacy-everyone',
    },
    {
      title: 'Certificate of Participation: JOTA-JOTI 2024',
      issuer: 'World Organization of the Scout Movement (WOSM)',
      date: 'Oct 2024',
      credentialId: 'wosm-joti-jota-2024',
      skills: 'Digital Literacy, Community Engagement, Teamwork, Sustainable Development',
      category: 'Scouting & Leadership',
      url: 'https://www.jotajoti.info/',
    },
    {
      title: 'What is Generative AI?',
      issuer: 'NASBA',
      date: 'Jul 2026',
      credentialId: '52fa441d490fcc0d00e6ae31e0e1a0e569186884e6892c2a15d3b400d6cc3bce',
      skills: 'Artificial Intelligence (AI), Generative AI',
      category: 'Generative AI',
      url: 'https://www.linkedin.com/learning/certificates/what-is-generative-ai-nasba',
    },
    {
      title: 'What Is Generative AI?',
      issuer: 'LinkedIn',
      date: 'Jul 2026',
      credentialId: 'linkedin-what-is-genai-2026',
      skills: 'Generative AI Tools, Artificial Intelligence (AI)',
      category: 'Generative AI',
      url: 'https://www.linkedin.com/learning/certificates/what-is-generative-ai-linkedin',
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log(`Seeded ${certificates.length} certificates.`);

  // 3. Seed Projects (GitHub Projects)
  await prisma.project.deleteMany();
  const projects = [
    {
      title: 'nexacraft',
      description: 'Built with TypeScript; focuses on modular web application structures and component architecture.',
      repoUrl: 'https://github.com/iftekhar-codemaster/nexacraft',
      liveUrl: 'https://nexacraft.vercel.app',
      techStack: JSON.stringify(['TypeScript', 'React', 'Next.js', 'Tailwind CSS']),
      featured: true,
    },
    {
      title: 'aponananna.github.io',
      description: 'Titled "My Simple Web"; lightweight personal website template hosted on GitHub Pages.',
      repoUrl: 'https://github.com/iftekhar-codemaster/aponananna.github.io',
      liveUrl: 'https://aponananna.github.io',
      techStack: JSON.stringify(['HTML5', 'CSS3', 'JavaScript']),
      featured: true,
    },
    {
      title: 'Comapny-Landing-page',
      description: 'Corporate/SaaS product landing page template hosted on GitHub Pages featuring hero sections and responsive layouts.',
      repoUrl: 'https://github.com/iftekhar-codemaster/Comapny-Landing-page.github.io',
      liveUrl: 'https://iftekhar-codemaster.github.io/Comapny-Landing-page',
      techStack: JSON.stringify(['HTML5', 'Tailwind CSS', 'JavaScript']),
      featured: true,
    },
    {
      title: 'dxbazar',
      description: 'E-commerce / storefront user interface project ("DX Bazar").',
      repoUrl: 'https://github.com/iftekhar-codemaster/dxbazar',
      liveUrl: 'https://dxbazar.vercel.app',
      techStack: JSON.stringify(['PHP', 'JavaScript', 'Tailwind CSS', 'MySQL']),
      featured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`Seeded ${projects.length} projects.`);

  // 4. Seed Movies
  await prisma.movie.deleteMany();
  const movies = [
    {
      title: 'Interstellar',
      tmdbId: '157336',
      posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.7,
      synopsis: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      category: 'favorites',
    },
    {
      title: 'Oppenheimer',
      tmdbId: '872585',
      posterPath: '/8Gxv8gSFCU0XGDykEGvC2z9qjC9.jpg',
      rating: 8.1,
      synopsis: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
      category: 'watched',
    },
    {
      title: 'Inception',
      tmdbId: '27205',
      posterPath: '/oYuLEW9WwB15B26h89jN2uBqRwq.jpg',
      rating: 8.4,
      synopsis: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life in exchange for a task considered impossible: "inception".',
      category: 'favorites',
    },
    {
      title: 'Dune: Part Two',
      tmdbId: '693134',
      posterPath: '/1pdfLPoL6VFi8zPjLSpwWaSIerm.jpg',
      rating: 8.3,
      synopsis: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
      category: 'watching',
    },
    {
      title: 'The Dark Knight',
      tmdbId: '155',
      posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 8.5,
      synopsis: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
      category: 'watched',
    },
  ];

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }
  console.log(`Seeded ${movies.length} movies.`);

  // 5. Seed Gallery Items
  await prisma.galleryItem.deleteMany();
  const galleryItems = [
    {
      title: 'Thakurgaon Sunset',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      category: 'Nature',
      exifData: JSON.stringify({
        camera: 'Sony A7 IV',
        lens: '24-70mm f/2.8',
        iso: 100,
        aperture: 'f/4.0',
        shutterSpeed: '1/500s',
      }),
    },
    {
      title: 'Tech Workspace Neon',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      category: 'Workspace',
      exifData: JSON.stringify({
        camera: 'Canon EOS R5',
        lens: '35mm f/1.4',
        iso: 400,
        aperture: 'f/2.0',
        shutterSpeed: '1/125s',
      }),
    },
    {
      title: 'AmarEvents Conference 2025',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      category: 'Events',
      exifData: JSON.stringify({
        camera: 'Fujifilm X-T4',
        lens: '16-55mm f/2.8',
        iso: 800,
        aperture: 'f/2.8',
        shutterSpeed: '1/200s',
      }),
    },
    {
      title: 'Minimalist Code Environment',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      category: 'Technology',
      exifData: JSON.stringify({
        camera: 'Sony A7R V',
        lens: '50mm f/1.2',
        iso: 200,
        aperture: 'f/1.8',
        shutterSpeed: '1/250s',
      }),
    },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log(`Seeded ${galleryItems.length} gallery items.`);

  // 6. Seed YouTubeChannels
  await prisma.youTubeChannel.deleteMany();
  const channels = [
    {
      name: 'Draxy Gaming',
      handle: '@Draxy.Gaming',
      subscribers: '11.2K',
      videoCount: '199+',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'DRAXY ML',
      handle: '@DraxyML',
      subscribers: '520',
      videoCount: '45+',
      avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'XxHyper',
      handle: '@XxHyper',
      subscribers: '2.17K',
      videoCount: '80+',
      avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
  ];
  for (const ch of channels) {
    await prisma.youTubeChannel.create({ data: ch });
  }
  console.log(`Seeded ${channels.length} YouTube channels.`);

  // 7. Seed YouTubeVideos
  await prisma.youTubeVideo.deleteMany();
  const ytVideos = [
    {
      title: 'Midas SMP Survival #1: Building the Ultimate Neon Castle',
      youtubeId: 'dQw4w9WgXcQ',
      seriesTag: 'Minecraft',
      views: '14.5K',
      duration: '18:42',
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Minecraft Nerf World: Epic Parkour & TNT Survival Challenge',
      youtubeId: 'nerf_world_01',
      seriesTag: 'Nerf World',
      views: '11.2K',
      duration: '14:20',
      url: 'https://youtube.com/watch?v=nerf_world_01',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Level Devil Impossible Stage 25 Speedrun Challenge',
      youtubeId: 'level_devil_25',
      seriesTag: 'Level Devil',
      views: '8.9K',
      duration: '12:15',
      url: 'https://youtube.com/watch?v=level_devil_25',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'DRAXY ML: Mobile Legends Mythic Rank Solo Carry Gameplay',
      youtubeId: 'mlbb_mythic_01',
      seriesTag: 'Mobile Legends',
      views: '6.4K',
      duration: '16:05',
      url: 'https://youtube.com/watch?v=mlbb_mythic_01',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Meet Dexter: Custom AI Voice & PC Assistant Showcase',
      youtubeId: 'meet_dexter_ai',
      seriesTag: 'Meet Dexter',
      views: '22.1K',
      duration: '15:30',
      url: 'https://youtube.com/watch?v=meet_dexter_ai',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    },
  ];
  for (const v of ytVideos) {
    await prisma.youTubeVideo.create({ data: v });
  }
  console.log(`Seeded ${ytVideos.length} YouTube videos.`);

  // 8. Seed TimelineItems
  await prisma.timelineItem.deleteMany();
  const timelineItems = [
    {
      year: '2025 - Present',
      title: 'Chief Marketing Officer & Deputy CTO',
      org: 'AmarEvents',
      category: 'career',
      description: 'Leading digital strategy and tech modernization for event management in Bangladesh.',
      order: 1,
    },
    {
      year: 'Jul 2026',
      title: 'Generative AI & Ethics Certifications',
      org: 'Microsoft, NASBA, PMI, LinkedIn',
      category: 'certifications',
      description: 'Completed 10 verified certifications in Prompt Engineering, AI Ethics, and Responsible AI.',
      order: 2,
    },
    {
      year: '2024 - Present',
      title: 'Content Creation & Gaming Media',
      org: 'Draxy Gaming Network',
      category: 'content',
      description: 'Built a creator brand with ~11.2K subscribers and 199+ video showcases across 3 channels.',
      order: 3,
    },
    {
      year: 'Oct 2024',
      title: 'JOTA-JOTI 2024 Scout Participation',
      org: 'World Organization of the Scout Movement (WOSM)',
      category: 'certifications',
      description: 'Engaged in global digital literacy, teamwork, and sustainable development initiatives.',
      order: 4,
    },
    {
      year: '2018 - May 2026',
      title: 'Secondary School Certificate (SSC), Science',
      org: 'Thakurgaon Govt. Boys\' High School',
      category: 'education',
      description: 'Core focus areas in Physics and Mathematics, SCOUT leader, and active bookworm society member.',
      order: 5,
    },
  ];
  for (const t of timelineItems) {
    await prisma.timelineItem.create({ data: t });
  }
  console.log(`Seeded ${timelineItems.length} timeline items.`);

  // 9. Seed SocialLinks
  await prisma.socialLink.deleteMany();
  const socials = [
    {
      platform: 'LinkedIn',
      handle: 'Md Iftekhar Ferdous',
      url: 'https://www.linkedin.com/in/iftekhar-ferdous',
      brandColor: '#0a66c2',
      followersCount: '500+ Connections',
      icon: 'Linkedin',
    },
    {
      platform: 'GitHub',
      handle: 'iftekhar-codemaster',
      url: 'https://github.com/iftekhar-codemaster',
      brandColor: '#ffffff',
      followersCount: 'Public Repos',
      icon: 'Github',
    },
    {
      platform: 'YouTube',
      handle: '@Draxy.Gaming',
      url: 'https://youtube.com/@Draxy.Gaming',
      brandColor: '#ff0000',
      followersCount: '11.2K Subscribers',
      icon: 'Youtube',
    },
    {
      platform: 'Email',
      handle: 'business.draxy@yahoo.com',
      url: 'mailto:business.draxy@yahoo.com',
      brandColor: '#00f3ff',
      followersCount: 'Direct Contact',
      icon: 'Mail',
    },
  ];
  for (const s of socials) {
    await prisma.socialLink.create({ data: s });
  }
  console.log(`Seeded ${socials.length} social links.`);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
