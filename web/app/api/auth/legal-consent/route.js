import { NextResponse } from 'next/server';
import { requireAuthUser } from '../../../../lib/server/auth';
import { handleRouteError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { prisma } from '../../../../lib/server/prisma';
import { toUserProfile } from '../../../../lib/server/serializers';
import { validateLegalConsentPayload } from '../../../../lib/server/validators';
import { readJson } from '../../../../lib/server/http';

export const runtime = 'nodejs';

export async function POST(request) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    const payload = validateLegalConsentPayload(await readJson(request));

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        age18Confirmed: payload.age18Confirmed,
        entertainmentOnlyAccepted: payload.entertainmentOnlyAccepted,
        advisoryNoticeAccepted: payload.advisoryNoticeAccepted,
        legalConsentAcceptedAt: new Date()
      }
    });

    return NextResponse.json(toUserProfile(updated));
  } catch (error) {
    return handleRouteError(error, language);
  }
}
