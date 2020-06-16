import React from 'react';

import OrderDetailsView from '../components/OrderDetailsView';

import Product from '../Icons/product1.svg';

const ORDER = {
  id: 1947034,
  date: '05-02-2020',
  trackingNumber: 'DZ089223878',
  quantity: 3,
  totalAmount: 1400,
  status: 'Delivered',
  paymentMethod: '',
  deliveryMethod: 'Self pickup',
  discount: '10% personal promo code',
  shippingAddresses: {
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
      units: 1,
      price: 700
    }
  ]
};

const OrderDetails = props => {
  return <OrderDetailsView {...props} order={ORDER} />;
};

export default OrderDetails;
