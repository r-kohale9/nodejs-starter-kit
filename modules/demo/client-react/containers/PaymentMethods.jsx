import React from 'react';

import PaymentMethodsView from '../components/PaymentMethodsView';
import { PAYMENT_OPTS } from './Data';

const PaymentMethods = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return <PaymentMethodsView {...props} paymentOpts={PAYMENT_OPTS} onSubmit={handleSubmit} />;
};

export default PaymentMethods;
