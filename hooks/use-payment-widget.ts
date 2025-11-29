import { useEffect, useState } from 'react';
import configs from '../modules/sumup/configs-public';
import injectScript from '../modules/sdk-script-injector';

export default () => {
  const [paymentWidget, setPaymentWidget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    injectScript({
      scriptSrc: configs.payment_widget_sdk,
    })
      .then(({ SumUpCard }) => {
        console.log('SumUp Card SDK loaded:', !!SumUpCard);
        setPaymentWidget(SumUpCard);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load SumUp Card SDK:', err);
        setIsLoading(false);
      });
  }, []);

  return [paymentWidget, isLoading];
};
