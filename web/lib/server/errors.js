import { NextResponse } from 'next/server';
import { t } from './locale';

export class ApiError extends Error {
  constructor(status, code, detail) {
    super(code);
    this.status = status;
    this.code = code;
    this.detail = detail;
  }
}

export function jsonError(status, code, language) {
  return NextResponse.json(
    {
      message: t(language, code),
      error: code
    },
    { status }
  );
}

export function handleRouteError(error, language) {
  if (error instanceof ApiError) {
    return jsonError(error.status, error.code, language);
  }

  if (error && error.code === 'P2002') {
    return jsonError(409, 'error.auth.email_registered', language);
  }

  console.error('[api-error]', error);
  return jsonError(500, 'error.server.unexpected', language);
}
