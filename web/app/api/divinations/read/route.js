import { NextResponse } from 'next/server';
import { requireAuthUser } from '../../../../lib/server/auth';
import { generateDivinationText } from '../../../../lib/server/ai/engine';
import { ApiError, handleRouteError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';
import { prisma } from '../../../../lib/server/prisma';
import { hasRequiredLegalConsents, toDivinationResponse } from '../../../../lib/server/serializers';
import { normalizeLocale, validateDivinationPayload } from '../../../../lib/server/validators';
import { readJson } from '../../../../lib/server/http';

export const runtime = 'nodejs';

export async function POST(request) {
  const language = resolveRequestLanguage(request);

  try {
    const user = await requireAuthUser(request);
    if (!hasRequiredLegalConsents(user)) {
      throw new ApiError(403, 'error.legal.consent_required');
    }

    const payload = validateDivinationPayload(await readJson(request));
    const locale = normalizeLocale(payload.locale || user.locale);

    const resultText = await generateDivinationText({
      type: payload.type,
      question: payload.question,
      birthDate: payload.birthDate,
      locale
    });

    const record = await prisma.divinationRecord.create({
      data: {
        userId: user.id,
        type: payload.type,
        consumedFrom: 'ONE_OFF',
        question: payload.question,
        birthDate: payload.birthDate,
        locale,
        resultText
      }
    });

    return NextResponse.json(toDivinationResponse(record));
  } catch (error) {
    return handleRouteError(error, language);
  }
}
