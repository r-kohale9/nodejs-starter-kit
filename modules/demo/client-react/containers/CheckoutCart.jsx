import React from 'react';

import CheckoutCartView from '../components/CheckoutCartView';

import { CART, PROMOCODES } from './Data';

const CheckoutCart = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return <CheckoutCartView {...props} getCart={CART} promocodes={PROMOCODES} onSubmit={handleSubmit} />;
};

export default CheckoutCart;
