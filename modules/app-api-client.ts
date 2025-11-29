import axios from 'axios';

export default {
  createCheckout: ({
    paymentType: payment_type,
    amount,
    currency,
  }: {
    paymentType?: string;
    amount: string;
    currency: string;
  }) =>
    axios
      .post<CheckoutCreated>(
        '/api/create-checkout',
        { payment_type, amount, currency },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      )
      .then(({ data }) => data),

  createSubscription: () =>
    axios
      .post<CheckoutCreated>(
        '/api/create-subscription',
        { },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      )
      .then(({ data }) => data),

  listPaymentInstruments: ({ onlyActive = false }: { onlyActive: boolean }) =>
    axios
      .get<PaymentInstrument>(
        '/api/payment-instruments',
        { 
          params: { filterActive: onlyActive ? 1 : undefined },
        },
      )
      .then(({ data }) => data),
};
