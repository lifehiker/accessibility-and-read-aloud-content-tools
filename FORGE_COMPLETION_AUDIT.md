# FORGE COMPLETION AUDIT

## Build Status
- `npm run build`: PASSED
- TypeScript: No errors
- Standalone output: `.next/standalone` exists
- Database: SQLite `dev.db` created via `prisma db push`

## PRD Requirements → Implementation Mapping

### Data Models
| Model | File |
|-------|------|
| User | `prisma/schema.prisma` |
| AssetJob | `prisma/schema.prisma` |
| AssetFile | `prisma/schema.prisma` |
| UsageLedger | `prisma/schema.prisma` |
| Subscription | `prisma/schema.prisma` |

### Authentication
| Requirement | Implementation |
|-------------|----------------|
| Email/password auth | `src/auth.ts` — NextAuth v5 Credentials provider |
| Password hashing | bcryptjs in `src/app/api/auth/signup/route.ts` |
| JWT sessions | `session: { strategy: "jwt" }` in `src/auth.ts` |
| trustHost: true | Set in `src/auth.ts` |
| Signup API | `src/app/api/auth/signup/route.ts` |
| Auth routes | `src/app/api/auth/[...nextauth]/route.ts` |
| Middleware protection | `src/middleware.ts` — protects `/dashboard/*` and `/admin/*` |

### Core Features
| Feature | Implementation |
|---------|----------------|
| Alt text generation | `src/app/api/jobs/alt-text/route.ts` |
| 3 variants (concise/descriptive/ecommerce) | OpenAI GPT-4o vision prompt in alt-text route |
| Demo mode without auth | Returns demo result if !session |
| Text extraction | `src/app/api/jobs/extract-text/route.ts` |
| PDF text extraction | pdf-parse in extract-text route |
| Image OCR | OpenAI vision in extract-text route |
| Read aloud (client-side) | Web Speech API in `src/app/(app)/dashboard/read-aloud/page.tsx` |
| CSV export | `src/lib/export/csv.ts` |
| Inline editing | `src/app/(app)/dashboard/alt-text/page.tsx` |

### Usage & Billing
| Feature | Implementation |
|---------|----------------|
| Plan limits | `src/lib/billing/entitlements.ts` |
| Usage tracking | `src/lib/usage/track-usage.ts` |
| Usage meter UI | `src/components/usage/usage-meter.tsx` |
| Upgrade CTA | `src/components/shared/upgrade-cta.tsx` |
| Stripe checkout | `src/app/api/stripe/checkout/route.ts` |
| Stripe customer portal | `src/app/api/stripe/customer-portal/route.ts` |
| Stripe webhooks | `src/app/api/webhooks/stripe/route.ts` |

### Email
| Email | Implementation |
|-------|----------------|
| Welcome email | `src/lib/email.ts` — sendWelcomeEmail() |
| Usage reminder | `src/lib/email.ts` — sendUsageReminderEmail() |
| Upgrade prompt | `src/lib/email.ts` — sendUpgradePromptEmail() |

### Pages
| Page | File |
|------|------|
| Homepage | `src/app/page.tsx` |
| Login | `src/app/login/page.tsx` |
| Signup | `src/app/signup/page.tsx` |
| Pricing | `src/app/pricing/page.tsx` |
| Dashboard | `src/app/(app)/dashboard/page.tsx` |
| Alt Text | `src/app/(app)/dashboard/alt-text/page.tsx` |
| Read Aloud | `src/app/(app)/dashboard/read-aloud/page.tsx` |
| History | `src/app/(app)/dashboard/history/page.tsx` |
| Billing | `src/app/(app)/dashboard/billing/page.tsx` |
| Admin | `src/app/(app)/admin/page.tsx` |

### SEO Landing Pages
| Page | File |
|------|------|
| /alt-text-generator | `src/app/alt-text-generator/page.tsx` |
| /alt-text-generator-for-ecommerce | `src/app/alt-text-generator-for-ecommerce/page.tsx` |
| /bulk-alt-text-generator-for-images | `src/app/bulk-alt-text-generator-for-images/page.tsx` |
| /alt-text-generator-for-instagram | `src/app/alt-text-generator-for-instagram/page.tsx` |
| /read-pdf-aloud | `src/app/read-pdf-aloud/page.tsx` |
| /read-screenshots-aloud | `src/app/read-screenshots-aloud/page.tsx` |
| /text-to-speech-reader-no-subscription | `src/app/text-to-speech-reader-no-subscription/page.tsx` |
| /tools/image-alt-text-generator | `src/app/tools/image-alt-text-generator/page.tsx` |
| /tools/pdf-to-speech | `src/app/tools/pdf-to-speech/page.tsx` |
| /compare/speechify-alternative | `src/app/compare/speechify-alternative/page.tsx` |
| /compare/naturalreader-alternative | `src/app/compare/naturalreader-alternative/page.tsx` |
| /compare/canva-alt-text-alternative | `src/app/compare/canva-alt-text-alternative/page.tsx` |

### SEO Technical
| Feature | Implementation |
|---------|----------------|
| Metadata per page | Exported `metadata` in each page file |
| Sitemap | `src/app/sitemap.ts` |
| Robots.txt | `src/app/robots.ts` |
| FAQ sections | Accordion components on homepage and landing pages |
| Internal linking | Cross-page links on all landing pages |

### Components
| Component | File |
|-----------|------|
| Public navbar | `src/components/layout/navbar.tsx` |
| Footer | `src/components/layout/footer.tsx` |
| Dashboard sidebar | `src/components/layout/dashboard-nav.tsx` |
| Usage meter | `src/components/usage/usage-meter.tsx` |
| Upgrade CTA | `src/components/shared/upgrade-cta.tsx` |

### UI Components
All in `src/components/ui/`: button, card, input, label, textarea, badge, progress, tabs, dialog, select, separator, accordion, avatar, dropdown-menu

### Config
| File | Purpose |
|------|---------|
| `next.config.ts` | output: "standalone" |
| `prisma/schema.prisma` | SQLite schema, no url in datasource |
| `prisma.config.ts` | Prisma 7 url config |
| `src/lib/db.ts` | PrismaClient with PrismaBetterSqlite3 adapter |
| `tailwind.config.ts` | Tailwind CSS config |
| `.env.local` | Local dev environment |
| `.env.example` | Environment variable template |
