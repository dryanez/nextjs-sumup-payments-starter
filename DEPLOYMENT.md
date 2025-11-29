Deployment checklist for ismit2026 SumUp checkout

1) SumUp app settings
- Register an OAuth app at https://developer.sumup.com/protected/oauth-apps/
- Set redirect URIs to include: https://ismit2026.com/payment/success
- Note the SUMUP_API_CLIENT_ID and SUMUP_API_CLIENT_SECRET
- Note the merchant code from SumUp (merchant code used for creating checkouts)

2) Vercel environment variables
Add the following to your Vercel project settings (Environment Variables):
- SUMUP_API_CLIENT_ID
- SUMUP_API_CLIENT_SECRET
- SUMUP_MERCHANT_CODE
- NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY
- BASE_HOST (set to https://ismit2026.com)

3) Local development
- Create `.env.local` with the same keys for local testing (do not commit secrets).
- To test without real SumUp: set `NEXT_PUBLIC_PREVIEW_MOCK=1` or call `/api/create-checkout?mock=1`.

4) Vercel configuration
- In your Vercel project, add the environment variables from step 2 under Project Settings -> Environment Variables. Use the Production environment for real payments.
- Add `ismit2026.com` as a custom domain and ensure HTTPS is enabled.

5) Local test commands
- Start dev server:
	- Install deps: `npm install`
	- Start: `npm run dev`
- Mocked checkout test (no real payment):
	- `curl -sS -X POST 'http://localhost:3000/api/create-checkout?mock=1' -H 'Content-Type: application/json' -d '{"amount":"50.00","currency":"EUR"}' | jq .`
	- You should see a `redirect_url` and `checkoutUrl` pointing to a mock external URL.

6) Production test
- Deploy to Vercel and open https://ismit2026.com/registration.
- Click Buy and the client should redirect to SumUp's hosted checkout. After payment complete, SumUp will redirect back to `https://ismit2026.com/payment/success`.

7) Vercel step-by-step (production)
- Create a GitHub repo and push your code (do NOT commit `.env.local`).
- In Vercel, "New Project" -> Import Git Repository -> select your repo.
- In Project Settings -> Environment Variables, add (Production):
	- SUMUP_API_CLIENT_ID
	- SUMUP_API_CLIENT_SECRET
	- SUMUP_MERCHANT_CODE
	- NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY
	- BASE_HOST = https://ismit2026.com
	- Ensure NEXT_PUBLIC_PREVIEW_MOCK is unset or set to 0
- Add your custom domain `ismit2026.com` in Vercel and follow the DNS instructions; wait for HTTPS to be issued.
- Deploy the project. Visit https://ismit2026.com/registration and test a real payment (or SumUp test mode if SumUp supports it in the account).

8) If payments still redirect to the site instead of SumUp-hosted checkout
- Confirm the SumUp `createCheckout` response includes `redirect_url` pointing to SumUp domain. If not, check server logs for token and checkout creation errors.
- Check that `SUMUP_MERCHANT_CODE` is correct for the account that owns the registered redirect URI.

4) Deploy
- Push to GitHub and connect the repo to Vercel.
- Deploy and then run an end-to-end test on https://ismit2026.com/registration

5) Troubleshooting
- If SumUp returns a `redirect_url` that points to your domain, the client will redirect to the external SumUp-hosted checkout only if the returned URL is a non-local host.
- Check server logs for the token exchange and checkout creation responses.
