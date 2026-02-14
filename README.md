# Nebula Arcana (Next.js + Supabase)

Production-ready international divination app for Vercel deployment.

## Stack

- `web`: Next.js full-stack app (UI + API routes)
- DB: Supabase Postgres via Prisma
- Auth: app-level JWT (`jose`) + password hash (`bcryptjs`)
- AI: OpenRouter/OpenAI-compatible free model first, paid model switch-ready
- i18n: `en`, `zh`, `es`, `ja`
- Legal safeguards: 18+ confirmation, entertainment-only notice, professional-advice limitation

## Architecture (business closed loop)

1. User signs up/signs in and gets JWT.
2. User completes legal consent gate (or provides it at sign-up).
3. User submits a Tarot divination request.
4. Backend generates AI reading (fallback if provider fails).
5. Result is persisted and shown in history.
6. User can view, delete one record, or clear all history.

## Local development

```bash
cd web
cp .env.example .env.local
npm install
npm run db:push
npm run dev
```

App URL: `http://localhost:5173`

## Required env vars (`web/.env.local`)

```bash
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_SITE_URL=https://your-domain.com

DATABASE_URL=postgresql://postgres:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres

APP_JWT_SECRET=<very-long-random-secret-at-least-32-chars>
APP_JWT_EXPIRATION_SECONDS=2592000

APP_AI_ENABLED=true
APP_AI_PROVIDER=openrouter
APP_AI_BASE_URL=https://openrouter.ai/api/v1/chat/completions
APP_AI_API_KEY=<your-openrouter-key>
APP_AI_MODEL=meta-llama/llama-3.1-8b-instruct:free
APP_AI_TEMPERATURE=0.8
APP_AI_MAX_TOKENS=700
APP_AI_TIMEOUT_MS=15000
```

## Vercel deployment

1. Import this repo into Vercel and set Root Directory to `web`.
2. Add all env vars above in Vercel Project Settings.
3. Build command: `npm run build`
4. Install command: `npm install`
5. Output: Next.js default

## Supabase setup

1. Create a Supabase project.
2. Go to `Project Settings -> Database` and copy connection string.
3. Put pooler string into `DATABASE_URL`, and direct string into `DIRECT_URL`.
4. Run once:
   - local: `npm run db:push`
   - or with Vercel deploy hook using same command

No local file DB is used.

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/legal-consent`
- `POST /api/divinations/read`
- `GET /api/divinations/history`
- `DELETE /api/divinations/history/:id`
- `DELETE /api/divinations/history`
- `POST /api/billing/checkout-session` (`410` disabled)
- `POST /api/billing/webhook` (`410` disabled)

## Notes

- Backend is fully implemented with Next.js Route Handlers in `web/app/api`.
- Free mode is enabled (no payment deduction, no usage ledger)
