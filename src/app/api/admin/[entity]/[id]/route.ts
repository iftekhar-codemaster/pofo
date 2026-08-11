import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getModelDelegate, sanitizeEntityData } from '@/lib/adminEntityHelper';

export async function GET(
  request: NextRequest,
  { params }: { params: { entity: string; id: string } }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity, id } = params;
    const model = getModelDelegate(entity);

    if (!model) {
      return NextResponse.json({ error: `Invalid entity type: ${entity}` }, { status: 400 });
    }

    // @ts-ignore
    const item = await model.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error(`Error fetching entity ${params.entity}/${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { entity: string; id: string } }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity, id } = params;
    const model = getModelDelegate(entity);

    if (!model) {
      return NextResponse.json({ error: `Invalid entity type: ${entity}` }, { status: 400 });
    }

    const body = await request.json();
    const cleanedData = sanitizeEntityData(entity, body);

    // @ts-ignore
    const updatedItem = await model.update({
      where: { id },
      data: cleanedData,
    });

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error(`Error updating entity ${params.entity}/${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { entity: string; id: string } }
) {
  return PUT(request, { params });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { entity: string; id: string } }
) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity, id } = params;
    const model = getModelDelegate(entity);

    if (!model) {
      return NextResponse.json({ error: `Invalid entity type: ${entity}` }, { status: 400 });
    }

    // @ts-ignore
    await model.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting entity ${params.entity}/${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
