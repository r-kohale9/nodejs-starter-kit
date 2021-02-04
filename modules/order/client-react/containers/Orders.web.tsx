import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import OrdersView from '../components/OrdersView';
import {
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates,
  withDeleteOrder,
  withPatchOrderState
} from './OrderOperations';
import { subscribeToOrders } from './OrderSubscriptions';

// types
import { orders_orders as OrdersEdges } from '../graphql/__generated__/orders';
import { orderStates_orderStates as OrderStates } from '../graphql/__generated__/orderStates';
import { OrderByListInput, FilterOrderInput } from '../../../../packages/server/__generated__/globalTypes';

export interface OrdersProps {
  loading: boolean;
  filter: FilterOrderInput;
  orderBy: OrderByListInput;
  orders: OrdersEdges;
  orderStates: OrderStates[];
  onSearchTextChange: (serachText: string) => void;
  onFiltersRemove: (filter: FilterOrderInput, orderBy: OrderByListInput) => void;
  onStateChange: (state: string) => void;
  onOrderBy: (orderBy: OrderByListInput) => void;
  loadData: (endCursor: number, action: string) => void;
  ordersSubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  patchOrderState: (orderId: number, state: string) => void;
  deleteOrder: (id: number) => void;
  t: TranslateFunction;
}

const Orders: React.FC<OrdersProps> = props => {
  const { ordersSubscribeToMore, patchOrderState } = props;

  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
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

  return <OrdersView onPatchOrderState={handlePatchOrderState} filter={{}} {...props} />;
};

export default compose(
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates,
  withDeleteOrder,
  withPatchOrderState,
  translate('order')
)(Orders);
