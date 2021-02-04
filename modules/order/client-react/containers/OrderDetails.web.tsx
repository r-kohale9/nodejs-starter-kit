import React from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { compose } from '@gqlapp/core-common';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import OrderDetailsView from '../components/OrderDetailsView';

import { withOrder, withOrderStates, withPatchOrderState } from './OrderOperations';
import { subscribeToOrder } from './OrderSubscriptions';

// types
import { order_order as Order } from '../graphql/__generated__/order';
import { orderStates_orderStates } from '../graphql/__generated__/orderStates';
import { Message } from '@gqlapp/look-client-react';

export interface OrderDetailsProps {
  loading: boolean;
  history: History;
  orderStates: orderStates_orderStates[];
  order: Order;
  patchOrderState: (orderId: number, state: string) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const OrderDetails: React.FC<OrderDetailsProps> = props => {
  const { order, subscribeToMore, history, patchOrderState } = props;

  React.useEffect(() => {
    const subscribe = subscribeToOrder(subscribeToMore, order && order.id, history);
    return () => subscribe();
  });

  const handlePatchOrderState = (orderId: number, state: string) => {
    try {
      Message.destroy();
      Message.error('Processing.');
      patchOrderState(orderId, state);
      Message.destroy();
      Message.success(`State change to ${state}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return <OrderDetailsView onPatchOrderState={handlePatchOrderState} {...props} />;
};

export default compose(withOrder, withOrderStates, withPatchOrderState, translate('order'))(OrderDetails);
