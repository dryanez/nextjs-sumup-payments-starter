import { NextPage } from 'next';
import Link from 'next/link';
import {
  Card,
  Headline,
  Body,
  cx,
  spacing,
  center,
} from '@sumup/circuit-ui';

const PaymentSuccess: NextPage = () => {
  return (
    <main>
      <Card css={cx(center, spacing({ top: 'giga', bottom: 'giga' }))}>
        <Headline as="h2" css={cx(center, spacing({ bottom: 'giga' }))}>
          Payment successful
        </Headline>
        <Body css={cx(center, spacing({ bottom: 'giga' }))}>
          Thank you — your payment was received and is being processed.
        </Body>
        <Body css={cx(center)}>
          <Link href="/">Back to home</Link>
        </Body>
      </Card>
    </main>
  );
};

export default PaymentSuccess;
