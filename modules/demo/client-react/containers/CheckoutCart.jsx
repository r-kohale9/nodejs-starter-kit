import React from 'react';

import CheckoutCartView from '../components/CheckoutCartView';
import Product from '../Icons/product1.svg';
import Discount from '../Icons/discount.png';

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
  shippingAddress: {
    streetAddress1: '22nd Cross Rd',
    streetAddress2: 'Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102'
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

const PROMOCODES = [
  {
    id: 1,
    thumbnail: Discount,
    title: 'Personal offer',
    promocode: 'mypromocode2020',
    validity: '6 days remaining'
  },
  {
    id: 2,
    thumbnail: Discount,
    title: 'Mealting summer',
    promocode: 'summer2020',
    validity: '23 days remaining'
  }
];
const CheckoutCart = props => {
  return <CheckoutCartView {...props} getCart={CART} promocodes={PROMOCODES} />;
};

export default CheckoutCart;
