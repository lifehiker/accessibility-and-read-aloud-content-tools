# FORGE PRD TASKS

## Status Legend
- [ ] Not started
- [x] Complete
- [~] In progress

---

## Phase 1: Foundation

- [x] package.json with all deps (Prisma 7, Next.js 15, NextAuth v5, Stripe, Resend, OpenAI)
- [x] tsconfig.json
- [x] next.config.ts (output: standalone)
- [x] tailwind.config.ts + postcss.config.mjs
- [x] .gitignore
- [x] .env.example
- [x] prisma/schema.prisma (SQLite, User/AssetJob/AssetFile/UsageLedger/Subscription)
- [x] prisma.config.ts (Prisma 7 pattern)
- [x] src/lib/db.ts (PrismaClient with better-sqlite3 adapter)
- [x] src/lib/utils.ts (cn helper)
- [x] src/auth.ts (NextAuth v5 Credentials + JWT)
- [x] src/middleware.ts (protect /dashboard, /admin)

## Phase 2: UI Components

- [x] shadcn/ui base components (button, card, input, textarea, label, badge, tabs, dialog, table, progress, select, separator, toaster, form, dropdown-menu, sheet, avatar, accordion, alert, checkbox)
- [x] src/app/globals.css (CSS variables for shadcn)
- [x] src/app/layout.tsx (root layout with Toaster)
- [x] src/components/layout/navbar.tsx
- [x] src/components/layout/footer.tsx
- [x] src/components/layout/dashboard-nav.tsx

## Phase 3: Auth Pages

- [x] src/app/login/page.tsx
- [x] src/app/signup/page.tsx
- [x] src/app/api/auth/[...nextauth]/route.ts
- [x] src/app/api/auth/signup/route.ts

## Phase 4: Marketing / SEO Pages

- [x] src/app/page.tsx (homepage)
- [x] src/app/pricing/page.tsx
- [x] src/app/alt-text-generator/page.tsx
- [x] src/app/alt-text-generator-for-ecommerce/page.tsx
- [x] src/app/bulk-alt-text-generator-for-images/page.tsx
- [x] src/app/alt-text-generator-for-instagram/page.tsx
- [x] src/app/read-pdf-aloud/page.tsx
- [x] src/app/read-screenshots-aloud/page.tsx
- [x] src/app/text-to-speech-reader-no-subscription/page.tsx
- [x] src/app/tools/image-alt-text-generator/page.tsx
- [x] src/app/tools/pdf-to-speech/page.tsx
- [x] src/app/compare/speechify-alternative/page.tsx
- [x] src/app/compare/naturalreader-alternative/page.tsx
- [x] src/app/compare/canva-alt-text-alternative/page.tsx
- [x] src/app/sitemap.ts
- [x] src/app/robots.ts

## Phase 5: Core App (Authenticated)

- [x] src/app/(app)/layout.tsx (auth gate)
- [x] src/app/(app)/dashboard/page.tsx (dashboard home)
- [x] src/app/(app)/dashboard/alt-text/page.tsx (batch alt text UI)
- [x] src/app/(app)/dashboard/read-aloud/page.tsx (OCR + TTS UI)
- [x] src/app/(app)/dashboard/history/page.tsx (job history)
- [x] src/app/(app)/dashboard/billing/page.tsx (subscription management)
- [x] src/app/(app)/admin/page.tsx (admin dashboard)

## Phase 6: Upload Components

- [x] Upload dropzone built inline in dashboard/alt-text/page.tsx (drag-drop, file select, preview)
- [x] PDF upload built inline in dashboard/read-aloud/page.tsx
- [x] Screenshot upload built inline in dashboard/read-aloud/page.tsx
- [x] Paste text tab built inline in dashboard/read-aloud/page.tsx

## Phase 7: Feature Components

- [x] Alt text results table built inline in dashboard/alt-text/page.tsx (thumbnail, edit, copy, CSV export)
- [x] Audio player built inline in dashboard/read-aloud/page.tsx (Web Speech API, play/pause/stop, speed, voice)
- [x] src/components/usage/usage-meter.tsx
- [x] src/components/shared/upgrade-cta.tsx

## Phase 8: API Routes

- [x] src/app/api/jobs/alt-text/route.ts (OpenAI vision)
- [x] src/app/api/jobs/extract-text/route.ts (PDF parse + OpenAI OCR)
- [x] src/app/api/stripe/checkout/route.ts
- [x] src/app/api/stripe/customer-portal/route.ts
- [x] src/app/api/webhooks/stripe/route.ts
- [x] src/app/api/admin/stats/route.ts

## Phase 9: Lib Utilities

- [x] src/lib/billing/entitlements.ts (plan limits enforcement)
- [x] src/lib/usage/track-usage.ts (credit deduction)
- [x] src/lib/email.ts (Resend wrapper)
- [x] src/lib/export/csv.ts (CSV export)

## Phase 10: Email Templates

- [x] sendWelcomeEmail in src/lib/email.ts (HTML email, no external template file needed)
- [x] sendUsageReminderEmail in src/lib/email.ts
- [x] sendUpgradePromptEmail in src/lib/email.ts
- [x] All emails skip gracefully when RESEND_API_KEY not set

## Phase 11: Build + QA

- [x] npm run build passes
- [x] Dev server starts
- [x] Login/signup flow works
- [x] Alt text generation works (or graceful fallback)
- [x] Read-aloud works (Web Speech API)
- [x] Stripe checkout flow works
- [x] CSV export works
- [x] Admin dashboard accessible to admin users

## Phase 12: Deployment Docs

- [x] Dockerfile fixed (--ignore-scripts, openssl, full node_modules, runtime db push, no public dir copy)
- [x] FORGE_COMPLETION_AUDIT.md
- [x] HUMAN_INPUT_NEEDED.md
