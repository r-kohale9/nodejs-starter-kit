import React, { useEffect } from 'react';
import { SubscribeToMoreOptions, ApolloQueryResult } from 'apollo-client';
import { History } from 'history';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { withOrdersState, withFilterUpdating, withOrderStates, withOrders } from './OrderOperations';

import MyOrdersView from '../components/MyOrdersView';
import { subscribeToOrders } from './OrderSubscriptions';

// types
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';
import { FilterOrderInput } from '../../../../packages/server/__generated__/globalTypes';
import { orders as ordersResponse, ordersVariables } from '../graphql/__generated__/orders';
import { orders_orders as OrdersEdges } from '../graphql/__generated__/orders';
import { orderStates_orderStates as OrderStates } from '../graphql/__generated__/orderStates';

export interface MyOrdersContainerProps /* extends MyOrdersProps */ {
  loading?: boolean;
  orders?: OrdersEdges;
  filter: FilterOrderInput;
  ordersSubscribeToMore?: (options: SubscribeToMoreOptions) => () => void;
  refetch?: (variables?: ordersVariables) => Promise<ApolloQueryResult<ordersResponse>>;
}

const MyOrdersContainer: React.FC<MyOrdersContainerProps> = compose(withOrders)(props => {
  const { ordersSubscribeToMore, refetch } = props;

  // const listingsUpdated = SubscribeToOrdersForMyOrders(ordersSubscribeToMore, props.filter);

  // useEffect(() => {
  //   if (listingsUpdated) {
  //     updateOrdersState(listingsUpdated, updateOrdersQuery);
  //   }
  // });

  useEffect(() => {
    // setDidMount(true);
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    // console.log(subscribe);
    refetch();
    // console.log(subscribe);
    // () => ;
    // setDidMount(false);
    return () => subscribe();
  }, [ordersSubscribeToMore, props.filter, refetch]);

  // if (!didMount) {
  //   return null;
  // }

  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

export interface MyOrdersProps {
  title: { text: string; icon: string };
  history: History;
  currentUserLoading: boolean;
  orderStates: OrderStates[];
  currentUser: CurrentUser;
  filter: FilterOrderInput;
  onUserStateChange: (currentUserId: number, state: string) => void;
  t: TranslateFunction;
}

const MyOrders: React.FC<MyOrdersProps> = props => {
  const { currentUser, filter, currentUserLoading, t } = props;

  // console.log('props', props);
  return (
    !currentUserLoading && (
      <MyOrdersContainer filter={{ consumerId: currentUser && currentUser.id, ...filter }}>
        <MyOrdersView title={{ icon: 'FileOutlined', text: t('myOrders') }} {...props} />
      </MyOrdersContainer>
    )
  );
};

export default compose(
  withCurrentUser,
  withOrdersState,
  withFilterUpdating,
  withOrderStates,
  translate('order')
)(MyOrders);
