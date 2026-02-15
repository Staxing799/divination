import { ApiError } from './errors';
import { validateProvidedSpread } from './ai/tarot';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DIVINATION_TYPES = ['TAROT'];

export function normalizeLocale(value) {
  const input = String(value || '').trim().toLowerCase();
  if (input.startsWith('zh')) return 'zh';
  if (input.startsWith('es')) return 'es';
  if (input.startsWith('ja')) return 'ja';
  return 'en';
}

export function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, 'validation.email.invalid');
  }
  return email;
}

export function validateRegisterPayload(payload) {
  const displayName = String(payload?.displayName || '').trim();
  if (displayName.length < 2 || displayName.length > 80) {
    throw new ApiError(400, 'validation.display_name.length');
  }

  const password = String(payload?.password || '');
  if (password.length < 8 || password.length > 128) {
    throw new ApiError(400, 'validation.password.length');
  }

  const age18Confirmed = payload?.age18Confirmed === true;
  const entertainmentOnlyAccepted = payload?.entertainmentOnlyAccepted === true;
  const advisoryNoticeAccepted = payload?.advisoryNoticeAccepted === true;

  if (!age18Confirmed) {
    throw new ApiError(400, 'validation.legal.age18_required');
  }
  if (!entertainmentOnlyAccepted) {
    throw new ApiError(400, 'validation.legal.entertainment_required');
  }
  if (!advisoryNoticeAccepted) {
    throw new ApiError(400, 'validation.legal.advisory_required');
  }

  return {
    displayName,
    email: normalizeEmail(payload?.email),
    password,
    locale: normalizeLocale(payload?.locale),
    age18Confirmed,
    entertainmentOnlyAccepted,
    advisoryNoticeAccepted
  };
}

export function validateLoginPayload(payload) {
  const password = String(payload?.password || '');
  if (password.length < 8 || password.length > 128) {
    throw new ApiError(400, 'validation.password.length');
  }

  return {
    email: normalizeEmail(payload?.email),
    password
  };
}

export function validateLegalConsentPayload(payload) {
  const age18Confirmed = payload?.age18Confirmed === true;
  const entertainmentOnlyAccepted = payload?.entertainmentOnlyAccepted === true;
  const advisoryNoticeAccepted = payload?.advisoryNoticeAccepted === true;

  if (!age18Confirmed) {
    throw new ApiError(400, 'validation.legal.age18_required');
  }
  if (!entertainmentOnlyAccepted) {
    throw new ApiError(400, 'validation.legal.entertainment_required');
  }
  if (!advisoryNoticeAccepted) {
    throw new ApiError(400, 'validation.legal.advisory_required');
  }

  return {
    age18Confirmed,
    entertainmentOnlyAccepted,
    advisoryNoticeAccepted
  };
}

export function validateDivinationPayload(payload) {
  const type = 'TAROT';
  if (payload?.type && String(payload.type).trim() !== 'TAROT') {
    throw new ApiError(400, 'validation.type.required');
  }

  const question = String(payload?.question || '').trim();
  if (question.length < 3 || question.length > 500) {
    throw new ApiError(400, 'validation.question.length');
  }

  const spread = validateProvidedSpread(payload?.spread);
  if (payload?.spread && !spread) {
    throw new ApiError(400, 'validation.required');
  }

  return {
    type,
    question,
    birthDate: null,
    locale: normalizeLocale(payload?.locale),
    spread
  };
}

export function parseRecordId(idText) {
  const id = Number(idText);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, 'validation.required');
  }
  return id;
}
