import { NextResponse } from 'next/server';
import { hashPassword, issueToken } from '../../../../lib/server/auth';
import { handleRouteError, ApiError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { prisma } from '../../../../lib/server/prisma';
import { toUserProfile } from '../../../../lib/server/serializers';
import { validateRegisterPayload } from '../../../../lib/server/validators';
import { readJson } from '../../../../lib/server/http';

export const runtime = 'nodejs';

export async function POST(request) {
  const language = resolveRequestLanguage(request);

  try {
    const payload = validateRegisterPayload(await readJson(request));
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      throw new ApiError(409, 'error.auth.email_registered');
    }

    const now = new Date();
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        passwordHash: await hashPassword(payload.password),
        displayName: payload.displayName,
        locale: payload.locale,
        age18Confirmed: payload.age18Confirmed,
        entertainmentOnlyAccepted: payload.entertainmentOnlyAccepted,
        advisoryNoticeAccepted: payload.advisoryNoticeAccepted,
        legalConsentAcceptedAt: now
      }
    });

    const token = await issueToken(user.id);
    return NextResponse.json({ token, user: toUserProfile(user) });
  } catch (error) {
    return handleRouteError(error, language);
  }
}
