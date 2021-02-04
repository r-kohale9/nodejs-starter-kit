import { useState, useEffect } from 'react';
import { UpdateQueryOptions, SubscribeToMoreOptions } from 'apollo-client';
import update from 'immutability-helper';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { HOME_ROUTES } from '@gqlapp/home-client-react';

import ROUTES from '../routes';

import ORDER_SUBSCRIPTION from '../graphql/OrderSubscription.graphql';
import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';

// types
import { FilterOrderInput } from '../../../../packages/server/__generated__/globalTypes';
import { orders_orders as Orders, orders_orders_edges as OrderEdges } from '../graphql/__generated__/orders';
import { getCart_getCart as GetCart } from '../graphql/__generated__/getCart';
import { order_order as Order } from '../graphql/__generated__/order';

export const subscribeToCart = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  orderId: number,
  history: History
) =>
  subscribeToMore({
    document: ORDER_SUBSCRIPTION,
    variables: { id: orderId },
    updateQuery: (
      prev: { getCart: GetCart },
      {
        subscriptionData: {
          data: {
            orderUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { orderUpdated: { mutation: string; node: GetCart } } } }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditCart(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteCart(history);
      }
      return newResult;
    }
  });

function onEditCart(prev: { getCart: GetCart }, node: GetCart) {
  return update(prev, {
    getCart: {
      $set: node
    }
  });
}

const onDeleteCart = (history: History) => {
  Message.info('This cart has been deleted!');
  Message.warn('Redirecting to my orders');
  if (history) {
    return history.push(`${ROUTES.myOrder}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};

export const subscribeToOrder = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  orderId: number,
  history: History
) =>
  subscribeToMore({
    document: ORDER_SUBSCRIPTION,
    variables: { id: orderId },
    updateQuery: (
      prev: { order: Order },
      {
        subscriptionData: {
          data: {
            orderUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { orderUpdated: { mutation: string; node: Order } } } }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditOrder(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteOrder(history);
      }
      return newResult;
    }
  });

function onEditOrder(prev: { order: Order }, node: Order) {
  return update(prev, {
    order: {
      $set: node
    }
  });
}

const onDeleteOrder = (history: History) => {
  Message.info('This cart has been deleted!');
  Message.warn('Redirecting to my orders');
  if (history) {
    return history.push(`${ROUTES.myOrder}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};

export const subscribeToOrders = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterOrderInput
) =>
  subscribeToMore({
    document: ORDERS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { orders: Orders },
      {
        subscriptionData: {
          data: {
            ordersUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { ordersUpdated: { mutation: string; node: Order } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddOrders(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditOrders(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrders(prev, node.id);
      }
      return newResult;
    }
  });

export const SubscribeToOrdersForMyOrders = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterOrderInput
) => {
  const [ordersUpdated, setOrdersUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToOrderss();
    return () => subscribe();
  });

  const subscribeToOrderss = () => {
    return subscribeToMore({
      document: ORDERS_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev: { orders: Orders },
        {
          subscriptionData: {
            data: { ordersUpdated: newData }
          }
        }: { subscriptionData: { data: { ordersUpdated: { mutation: string; node: Order } } } }
      ) => {
        setOrdersUpdated(newData);
      }
    });
  };

  return ordersUpdated;
};

export const updateOrdersState = (
  OrdersUpdated: { mutation: string; node: Order },
  updateQuery: (mapFn: (previousQueryResult: any, options: UpdateQueryOptions<any>) => any) => void
) => {
  const { mutation, node } = OrdersUpdated;
  updateQuery((prev: { orders: Orders }) => {
    switch (mutation) {
      case 'CREATED':
        return onAddOrders(prev, node);
      case 'DELETED':
        return onDeleteOrders(prev, node.id);
      case 'UPDATED':
        return onEditOrders(prev, node);
      default:
        return prev;
    }
  });
};

function onAddOrders(prev: { orders: Orders }, node: Order) {
  if (prev.orders && prev.orders.edges.some(order => node.id === order.cursor)) {
    return update(prev, {
      orders: {
        totalCount: {
          $set: prev.orders.totalCount - 1
        },
        edges: {
          $set: prev.orders.edges
        }
      }
    });
  }

  if (prev.orders) {
    const filteredOrders = prev.orders.edges.filter(order => order.node.id !== null);
    const edge: OrderEdges = {
      cursor: node.id,
      node,
      __typename: 'OrderEdges'
    };
    return update(prev, {
      orders: {
        totalCount: {
          $set: prev.orders.totalCount + 1
        },
        edges: {
          $set: [edge, ...filteredOrders]
        }
      }
    });
  }
}

function onEditOrders(prev: { orders: Orders }, node: Order) {
  const index = prev.orders.edges.findIndex(x => x.node.id === node.id);
  const edge: OrderEdges = {
    cursor: node.id,
    node,
    __typename: 'OrderEdges'
  };
  if (index) {
    // console.log('index', index);
    prev.orders.edges.splice(index, 1, edge);
    // console.log(prev.orders.edges);
    return update(prev, {
      orders: {
        edges: {
          $set: [...prev.orders.edges]
        }
      }
    });
  }
}

const onDeleteOrders = (prev: { orders: Orders }, id: number) => {
  // console.log('called', id);
  const index = prev.orders.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    orders: {
      totalCount: {
        $set: prev.orders.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
