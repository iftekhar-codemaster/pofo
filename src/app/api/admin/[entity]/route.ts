import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getModelDelegate, sanitizeEntityData } from '@/lib/adminEntityHelper';

export async function GET(
  request: NextRequest,
  { params }: { params: { entity: string } }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity } = params;
    const model = getModelDelegate(entity);

    if (!model) {
      return NextResponse.json({ error: `Invalid entity type: ${entity}` }, { status: 400 });
    }

    // @ts-ignore
    const items = await model.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: items, count: items.length });
  } catch (error) {
    console.error(`Error fetching entity ${params.entity}:`, error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { entity: string } }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity } = params;
    const model = getModelDelegate(entity);

    if (!model) {
      return NextResponse.json({ error: `Invalid entity type: ${entity}` }, { status: 400 });
    }

    const body = await request.json();
    const cleanedData = sanitizeEntityData(entity, body);

    // @ts-ignore
    const newItem = await model.create({
      data: cleanedData,
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error(`Error creating entity ${params.entity}:`, error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
