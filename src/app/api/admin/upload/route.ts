import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = (formData.get('file') || formData.get('image')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ];

    if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
      // Allow anyway if extension is valid
      const ext = path.extname(file.name).toLowerCase();
      const allowedExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
      if (!allowedExts.includes(ext)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PNG, JPG, WebP, GIF, SVG allowed.' },
          { status: 400 }
        );
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileExt = path.extname(file.name) || '.png';
    const sanitizedBaseName = path
      .basename(file.name, fileExt)
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${Date.now()}-${sanitizedBaseName}${fileExt}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${uniqueFileName}`;

    return NextResponse.json(
      {
        success: true,
        url,
        filename: uniqueFileName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image file' },
      { status: 500 }
    );
  }
}
