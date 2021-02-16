import React from 'react';
import { compose } from '@gqlapp/core-common';

import OrderStatusMailView from '../components/OrderStatusMailView';
import { withOrderStatusMail } from './OrderOperations';

interface OrderStatusMailProps {
  orderStatusMail: (orderId: number, note: string) => void;
}

const OrderStatusMail: React.FunctionComponent<OrderStatusMailProps> = props => {
  const { orderStatusMail } = props;

  const handleSubmit = (orderId: number, note: string) => {
    try {
      orderStatusMail(orderId, note);
    } catch (e) {
      throw new Error(e);
    }
  };
  // console.log('props', props);
  return <OrderStatusMailView onSubmit={handleSubmit} {...props} />;
};

export default compose(withOrderStatusMail)(OrderStatusMail);
