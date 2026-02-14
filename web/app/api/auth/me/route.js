import { NextResponse } from 'next/server';
import { requireAuthUser } from '../../../../lib/server/auth';
import { handleRouteError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { toUserProfile } from '../../../../lib/server/serializers';

export const runtime = 'nodejs';

export async function GET(request) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    return NextResponse.json(toUserProfile(user));
  } catch (error) {
    return handleRouteError(error, language);
  }
}
