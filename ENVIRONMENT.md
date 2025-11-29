Environment variables (local & Vercel)

This file documents the exact environment variable names used by this project and recommendations for Vercel.

Local development
- Create `.env.local` at the repo root. Do NOT commit this file.
- Copy the sample file included in the repo:

  cp .env.local.example .env.local

Required (server-side)
- SUMUP_API_CLIENT_ID
  - Description: OAuth application client id from SumUp.
- SUMUP_API_CLIENT_SECRET
  - Description: OAuth application client secret from SumUp.
- SUMUP_MERCHANT_CODE
  - Description: Merchant code (used when requesting merchant public id / creating checkouts).
- BASE_HOST
  - Description: Public host used for return/redirect URLs (include protocol), e.g. `https://ismit2026.com`.

Required (public/client)
- NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY
  - Description: SumUp public merchant key used by client-side SDKs.

Optional / development
- NEXT_PUBLIC_PREVIEW_MOCK
  - Use `1` to enable preview/mock mode which returns a fake external checkout URL for local UI testing.

Vercel setup
1. In your Vercel project settings, add the following Environment Variables (Production):
   - SUMUP_API_CLIENT_ID
   - SUMUP_API_CLIENT_SECRET
   - SUMUP_MERCHANT_CODE
   - NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY
   - BASE_HOST (set to `https://ismit2026.com` for production)
2. For testing on preview/staging, you may set NEXT_PUBLIC_PREVIEW_MOCK=1 if you want the UI to redirect to a fake external URL instead of the real SumUp flow.

Security
- Do not commit `SUMUP_API_CLIENT_SECRET` or `.env.local`.
- Prefer the Vercel Environment Variables UI to store your secrets.

Common issues
- If checkouts redirect back to your domain instead of SumUp-hosted pages, check that `SUMUP_MERCHANT_CODE` and OAuth app redirect URIs are configured correctly in the SumUp dashboard.
- If the server returns 400 when requesting tokens, ensure `SUMUP_API_CLIENT_ID` and `SUMUP_API_CLIENT_SECRET` are set and correct.

