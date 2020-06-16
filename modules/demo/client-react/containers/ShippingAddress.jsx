import React from 'react';

import ShippingAddressView from '../components/ShippingAddressView';

const ADDRESSES = [
  {
    id: 1,
    addressName: 'Katrina',
    address: '22nd Cross Rd, Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: true
  },
  {
    id: 2,
    addressName: 'Katrina1',
    address: '22nd Cross Rd, Sector 2 HSR Layout',

    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: false
  },
  {
    id: 3,
    addressName: 'Katrina2',
    address: '22nd Cross Rd, Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: false
  }
];

const ShippingAddress = props => {
  return <ShippingAddressView {...props} addresses={ADDRESSES} />;
};

export default ShippingAddress;
