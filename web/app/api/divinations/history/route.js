import { NextResponse } from 'next/server';
import { requireAuthUser } from '../../../../lib/server/auth';
import { handleRouteError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { prisma } from '../../../../lib/server/prisma';
import { toHistoryItem } from '../../../../lib/server/serializers';

export const runtime = 'nodejs';

export async function GET(request) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    const records = await prisma.divinationRecord.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return NextResponse.json(records.map(toHistoryItem));
  } catch (error) {
    return handleRouteError(error, language);
  }
}

export async function DELETE(request) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    const result = await prisma.divinationRecord.deleteMany({ where: { userId: user.id } });
    return NextResponse.json({ deletedCount: result.count });
  } catch (error) {
    return handleRouteError(error, language);
  }
}
