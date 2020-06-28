import React from 'react';

import PaymentMethodsView from '../components/PaymentMethodsView';

const PAYMENT_OPTS = [
  {
    id: 1,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: true
  },
  {
    id: 2,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: false
  },
  {
    id: 3,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: false
  }
];

const PaymentMethods = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return <PaymentMethodsView {...props} paymentOpts={PAYMENT_OPTS} onSubmit={handleSubmit} />;
};

export default PaymentMethods;
