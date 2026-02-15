import { NextResponse } from 'next/server';
import { requireAuthUser } from '../../../../../lib/server/auth';
import { ApiError, handleRouteError } from '../../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../../lib/server/locale';
import { prisma } from '../../../../../lib/server/prisma';
import { parseRecordId } from '../../../../../lib/server/validators';

export const runtime = 'nodejs';

export async function DELETE(request, context) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    const params = await context?.params;
    const id = parseRecordId(params?.id);

    const result = await prisma.divinationRecord.deleteMany({
      where: {
        id,
        userId: user.id
      }
    });

    if (result.count === 0) {
      throw new ApiError(404, 'error.divination.history_not_found');
    }

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return handleRouteError(error, language);
  }
}
