import type { NextApiRequest, NextApiResponse } from 'next';

import apiInit from '../../modules/sumup/api-client';
import configs from '../../modules/sumup/configs';

const api = apiInit({ apiUrl: configs.api_url });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { payment_type, amount: bodyAmount, currency: bodyCurrency, mock } = req.body;
  const previewMock = process.env.NEXT_PUBLIC_PREVIEW_MOCK === '1' || req.query.mock === '1' || mock === true;

  // If preview/mock mode is active, return a fake external checkout URL so the
  // frontend can redirect to it for testing without contacting SumUp.
  if (previewMock) {
    const fake = {
      amount: Number(bodyAmount || configs.donation_amount || '1.00'),
      checkout_reference: `mock-checkout-${Math.random()}`,
      id: `mock-${Date.now()}`,
      redirect_url: 'https://checkout.sumup.mock/checkout/abcdef123456',
      return_url: 'https://ismit2026.com/payment/success',
      status: 'PENDING',
    };
    res.status(200).json(fake);
    return;
  }

  const { client_id, client_secret } = configs;
  let token = null as any;
  try {
    token = await api.auth.fetchAccessToken({
      client_id,
      client_secret,
      grant_type: 'client_credentials',
      scope: 'payments',
    });
  } catch (err: any) {
    // Log full error server-side for debugging (do not leak secrets)
    console.error('create-checkout: token fetch failed', {
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
    });

    const status = err?.response?.status || 500;
    const message = err?.response?.data?.error_description || err?.response?.data?.error || err?.message || 'Failed to fetch access token';
    res.status(status).json({ error: message });
    return;
  }

  try {
    // Prefer an explicit BASE_HOST (including protocol) for production deployments.
    // Fallback to VERCEL_URL (older pattern) or localhost for local dev.
    const baseHost = process.env.BASE_HOST
      ? process.env.BASE_HOST.replace(/\/$/, '')
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    // Build payload: prefer merchant_code but fall back to pay_to_email (merchant email)
    const payload: any = {
      checkout_reference: `checkout-ref-${Math.random()}`,
      // Use `/payment/success` as the return/redirect path so it matches the
      // production redirect URI registered with SumUp (e.g. https://ismit2026.com/payment/success).
      return_url: `${baseHost}/payment/success`,
      redirect_url: `${baseHost}/payment/success`,
      // allow overriding the amount and currency via the request body
      amount: bodyAmount || configs.donation_amount,
      payment_type,
      currency: bodyCurrency || configs.currency,
    };

    if (configs.merchant_code) {
      payload.merchant_code = configs.merchant_code;
    } else if (configs.merchant_email) {
      // SumUp accepts either merchant_code or pay_to_email (merchant email)
      payload.pay_to_email = configs.merchant_email;
    }

    let response: any = null;
    try {
      response = await api.checkouts.createCheckout({
        access_token: token.access_token,
        payload,
      });
    } catch (err: any) {
      console.error('create-checkout: createCheckout failed', {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        payload,
      });

      const status = err?.response?.status || 500;
      const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to create checkout';
      res.status(status).json({ error: message });
      return;
    }

    // If the SumUp response includes a redirect_url that points to an external
    // SumUp-hosted checkout, expose it as `checkoutUrl` so the client can
    // redirect reliably.
    const redirect = response?.redirect_url || response?.url || response?.checkout_url;
    let checkoutUrl = undefined;
    try {
      if (redirect && /^(https?:)?\/\//.test(redirect)) {
        const u = new URL(redirect.startsWith('//') ? `https:${redirect}` : redirect);
        if (!/localhost|127\.0\.0\.1/.test(u.hostname)) {
          checkoutUrl = redirect;
        }
      }
    } catch (e) {
      // ignore malformed redirect
      console.warn('create-checkout: invalid redirect URL on response', { redirect });
    }

    res.status(200).json({ ...response, ...(checkoutUrl ? { checkoutUrl } : {}) });
  } catch (err) {
    console.error('create-checkout: unexpected error', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};
