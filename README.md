This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stripe Payment Setup

This project includes:
- Promo/voucher-aware checkout (`/checkout`)
- Optional promo code support (leave empty if none)
- Saved card support for future payments (via Stripe customer + payment methods)
- Server-side amount calculation to prevent client tampering

Add these variables to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
IYZICO_API_KEY=sandbox-xxx
IYZICO_SECRET_KEY=sandbox-xxx
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
REVOLUT_SECRET_KEY=rk_test_xxx
REVOLUT_API_BASE_URL=https://sandbox-merchant.revolut.com/api
REVOLUT_API_VERSION=2024-09-01
```

Important security note:
- Never store raw card number/CVV in your database.
- Card entry is handled by Stripe Elements.

Company bank account payouts:
- Funds are collected by Stripe and paid out to your connected business bank account configured in Stripe Dashboard.
- Configure payout schedule in Stripe Dashboard -> Settings -> Payouts.

Webhook endpoint:
- `POST /api/payments/webhook`
- Add this endpoint in Stripe Dashboard -> Developers -> Webhooks.
- Subscribe at minimum to:
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`

iyzico endpoints:
- Checkout init: `POST /api/checkout`
- Payment callback/webhook: `POST /api/webhooks/payment`

Revolut endpoint:
- Hosted checkout order create: `POST /api/payments/revolut/create-order`

## Production Go-Live (Real Customers)

1. Complete Stripe business verification (KYC) and connect your company bank account.
2. Switch to live API keys (`pk_live_...`, `sk_live_...`) and live webhook secret.
3. Keep card collection inside Stripe Elements only (never store raw PAN/CVV).
4. Implement idempotent order creation on `payment_intent.succeeded` in webhook handler.
5. Publish legal pages on your website:
   - Terms of Service
   - Privacy Policy
   - Refund/Cancellation Policy
6. Test full flow in Stripe test mode before going live:
   - Successful payment
   - Failed payment
   - Webhook retry behavior
