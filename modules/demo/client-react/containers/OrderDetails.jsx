import React from 'react';

import OrderDetailsView from '../components/OrderDetailsView';

import { ORDER } from './Data';

const OrderDetails = props => {
  return <OrderDetailsView {...props} order={ORDER} />;
};

export default OrderDetails;
