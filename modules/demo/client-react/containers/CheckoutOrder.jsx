import React from 'react';

import CheckoutOrderView from '../components/CheckoutOrderView';
import { CART } from './Data';

const CheckoutOrder = props => {
  return <CheckoutOrderView {...props} getCart={CART} />;
};

export default CheckoutOrder;
