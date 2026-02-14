import { handleRouteError, ApiError } from '../../../../lib/server/errors';
import { resolveRequestLanguage } from '../../../../lib/server/locale';

export const runtime = 'nodejs';

export async function POST(request) {
  const language = resolveRequestLanguage(request);
  try {
    throw new ApiError(410, 'error.billing.stripe_checkout_disabled');
  } catch (error) {
    return handleRouteError(error, language);
  }
}
