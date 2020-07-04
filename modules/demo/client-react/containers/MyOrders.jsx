import React from 'react';

import MyOrdersView from '../components/MyOrdersView';
import { ORDER_STATUS } from './Constants';
import { ORDERS } from './Data';

const MyOrders = props => {
  return <MyOrdersView {...props} orderStatusSlick={ORDER_STATUS} orders={ORDERS} />;
};

export default MyOrders;
