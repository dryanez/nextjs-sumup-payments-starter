const defaultConfigs = {
  payment_widget_sdk: 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js',
};

export default {
  payment_widget_sdk:
    process.env.NEXT_PUBLIC_SUMUP_PAYMENT_WIDGET_SDK ||
    defaultConfigs.payment_widget_sdk,
};
