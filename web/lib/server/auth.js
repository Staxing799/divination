import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { appConfig, ensureJwtSecret } from './config';
import { ApiError } from './errors';
import { prisma } from './prisma';

function secretBytes() {
  ensureJwtSecret();
  return new TextEncoder().encode(appConfig.jwtSecret);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export async function issueToken(userId) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + appConfig.jwtExpirationSeconds)
    .sign(secretBytes());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretBytes());
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid token payload');
    }
    return id;
  } catch {
    throw new ApiError(401, 'error.auth.unauthorized');
  }
}

function extractBearerToken(request) {
  const authorization = request.headers.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new ApiError(401, 'error.auth.unauthorized');
  }
  return token;
}

export async function requireAuthUser(request) {
  const token = extractBearerToken(request);
  const userId = await verifyToken(token);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(401, 'error.user.not_found');
  }
  return user;
}
