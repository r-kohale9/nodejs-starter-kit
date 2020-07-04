import React from 'react';

import ShippingAddressView from '../components/ShippingAddressView';
import { ADDRESSES } from './Data';

const ShippingAddress = props => {
  return <ShippingAddressView {...props} addresses={ADDRESSES} />;
};

export default ShippingAddress;
