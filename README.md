# iSMIT 2026 Registration & Payments

A Next.js application for conference registration with SumUp payment integration.

## Features

- Conference ticket registration
- SumUp card payment integration
- Payment success confirmation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your SumUp credentials:
```
SUMUP_API_CLIENT_ID=your_client_id
SUMUP_API_CLIENT_SECRET=your_client_secret
SUMUP_MERCHANT_CODE=your_merchant_code
BASE_HOST=https://your-domain.com
```

3. Run the development server:
```bash
npm run dev
```

## Deployment

Deploy to Vercel and set the environment variables in the Vercel dashboard.

## Pages

- `/registration` - Main registration page with ticket selection
- `/payment/success` - Payment confirmation page
