import React from 'react';

import MyOrdersView from '../components/MyOrdersView';
import { ORDER_STATUS } from './Constants';

const ORDERS = [
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Delivered'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Delivered'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Processing'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  }
];

const MyOrders = props => {
  return <MyOrdersView {...props} orderStatusSlick={ORDER_STATUS} orders={ORDERS} />;
};

export default MyOrders;
