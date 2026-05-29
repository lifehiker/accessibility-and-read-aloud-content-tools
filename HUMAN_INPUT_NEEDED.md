# HUMAN INPUT NEEDED

The app builds and runs with zero environment variables configured. The following optional credentials unlock specific features:

## OpenAI API Key
**Variable:** `OPENAI_API_KEY`

**Effect without it:** Alt text generation returns demo results. Screenshot OCR is unavailable.
**Get it:** https://platform.openai.com/api-keys

## Stripe Keys
**Variables:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_PRICE_ID`, `STRIPE_TEAM_PRICE_ID`

**Effect without it:** Upgrade buttons show an error toast. All other functionality works.
**Get it:** https://dashboard.stripe.com/apikeys

**Setup steps for Stripe:**
1. Create two products: "Pro" ($19/month) and "Team" ($49/month) recurring prices
2. Copy the price IDs into `STRIPE_PRO_PRICE_ID` and `STRIPE_TEAM_PRICE_ID`
3. Set up a webhook endpoint at `https://yourdomain.com/api/webhooks/stripe` for events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Resend Email API
**Variables:** `RESEND_API_KEY`, `EMAIL_FROM`

**Effect without it:** Emails (welcome, usage reminder, upgrade prompt) are silently skipped.
**Get it:** https://resend.com/api-keys

## Production Auth Secret
**Variable:** `AUTH_SECRET`

**Effect without it:** A default is provided in `.env.local` for development. For production, generate a secure secret:
```bash
openssl rand -base64 32
```

## Production App URL
**Variable:** `NEXT_PUBLIC_APP_URL`

**Effect without it:** Email links point to `https://accessitools.app` (default). Set this to your actual domain.

## To Create an Admin User
After deployment, run this in a Prisma Studio session or via a one-time script:
```sql
UPDATE "User" SET "isAdmin" = true WHERE email = 'your@email.com';
```
