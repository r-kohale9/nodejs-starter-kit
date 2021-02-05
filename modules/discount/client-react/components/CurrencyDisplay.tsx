import React from 'react';

import { Statistic } from '@gqlapp/look-client-react';

const symbols = {
  INR: <>&#8377;</>,
  USD: '$',
  GBP: <>&#163;</>,
  AUD: '$',
  EUR: <>&#8364;</>,
  RUB: <>&#8381;</>
};

export interface CurrencyDisplayComponentProps {
  precision: number;
  input: string;
  valueStyle: object;
  style?: object;
}

const CurrencyDisplayComponent: React.FC<CurrencyDisplayComponentProps> = props => {
  const { /* value, currency, */ precision = 2, input, valueStyle, style } = props;

  const displayAmount = Number(input) * 1;
  const currentCurrency = symbols.INR;
  return (
    <Statistic
      title=""
      precision={precision}
      valueStyle={valueStyle}
      value={displayAmount}
      prefix={currentCurrency}
      style={{ ...style, display: 'inline' }}
    />
  );
};

export default CurrencyDisplayComponent;
