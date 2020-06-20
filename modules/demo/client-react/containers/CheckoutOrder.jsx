import React from 'react';

import CheckoutOrderView from '../components/CheckoutOrderView';
import Product from '../Icons/product1.svg';

const CART = {
  id: 1947034,
  // deliveryDate: '05-02-2020',
  trackingNumber: '',
  quantity: 3,
  totalAmount: 1400,
  status: 'STALE',
  paymentMethod: '',
  deliveryMethod: '',
  discount: '',
  delivery: 0,
  shippingAddress: {
    addressName: 'katrina',
    address: '22nd Cross Rd Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102'
  },
  payment: {
    id: 1,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe'
  },
  orderDetails: [
    {
      id: 1,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 1,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 3,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 6,
      price: 700
    }
  ]
};

const CheckoutOrder = props => {
  return <CheckoutOrderView {...props} getCart={CART} />;
};

export default CheckoutOrder;
