import apiInit from './sumup/api-client';
import configs from './sumup/configs';
import publicConfigs from './sumup/configs-public';

const sumupApi = apiInit({ apiUrl: configs.api_url });

// Allow a quick preview mode that doesn't require real SumUp credentials.
// Set NEXT_PUBLIC_PREVIEW_MOCK=1 in your .env.local to use this.
export default async (): Promise<DonationDetails> => {
  // Preview mock: return demo values so the UI can be explored locally.
  if (process.env.NEXT_PUBLIC_PREVIEW_MOCK === '1') {
    return {
      merchantPublicKey:
        publicConfigs.merchant_public_key || 'pk_live_demo_merchant_public_key',
      donationAmount: configs.donation_amount || '5.00',
    };
  }

  // We recommend caching this information on your own backend since once generated
  // it will not change anymore. But it's possible to fetch it on demand.
  if (publicConfigs.merchant_public_key) {
    return {
      merchantPublicKey: publicConfigs.merchant_public_key,
  donationAmount: configs.donation_amount || '5.00',
    };
  }

  const { client_id, client_secret, merchant_code } = configs;
  try {
    const { access_token } = await sumupApi.auth.fetchAccessToken({
      client_id,
      client_secret,
      grant_type: 'client_credentials',
      scope: 'payments',
    });

    const publicId = await sumupApi.merchants.fetchPublicId({
      access_token,
      merchant_code,
    });

    return {
      merchantPublicKey: publicId.public_api_key,
  donationAmount: configs.donation_amount || '5.00',
    };
  } catch (err: any) {
    // Dev-only: log a masked error (don't print secrets)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[dev] SumUp API error:', {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });
    }

    // Fallback to public merchant key if provided, otherwise a demo key.
    return {
      merchantPublicKey:
        publicConfigs.merchant_public_key || 'pk_test_fallback_merchant_public_key',
  donationAmount: configs.donation_amount || '5.00',
    };
  }
};
