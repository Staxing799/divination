import { NextResponse } from 'next/server';
import { issueToken, verifyPassword } from '../../../../lib/server/auth';
import { ApiError, handleRouteError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { prisma } from '../../../../lib/server/prisma';
import { toUserProfile } from '../../../../lib/server/serializers';
import { validateLoginPayload } from '../../../../lib/server/validators';
import { readJson } from '../../../../lib/server/http';

export const runtime = 'nodejs';

export async function POST(request) {
  const language = resolveRequestLanguage(request);

  try {
    const payload = validateLoginPayload(await readJson(request));
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      throw new ApiError(401, 'error.auth.invalid_credentials');
    }

    const passwordValid = await verifyPassword(payload.password, user.passwordHash);
    if (!passwordValid) {
      throw new ApiError(401, 'error.auth.invalid_credentials');
    }

    const token = await issueToken(user.id);
    return NextResponse.json({ token, user: toUserProfile(user) });
  } catch (error) {
    return handleRouteError(error, language);
  }
}
