import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { withOrdersState, withFilterUpdating, withOrderStates, withOrders } from './OrderOperations';
import { subscribeToOrders } from './OrderSubscriptions';

import MyOrdersView from '../components/MyOrdersView';
import { MyOrdersProps, MyOrdersContainerProps } from './MyOrder';

export interface MyDeliveryContainerProps extends MyOrdersContainerProps {
  //
}

const MyDeliveryContainer: React.SFC<MyDeliveryContainerProps> = compose(withOrders)(props => {
  const { ordersSubscribeToMore, refetch } = props;
  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    refetch();
    return () => subscribe();
  }, [ordersSubscribeToMore, props.filter, refetch]);

  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

export interface MyDeliveryProps extends MyOrdersProps {
  //
}

const MyDelivery: React.FC<MyDeliveryProps> = props => {
  const { currentUser, filter, currentUserLoading, t } = props;

  // console.log('props', props);
  return (
    !currentUserLoading && (
      <MyDeliveryContainer filter={{ vendorId: currentUser && currentUser.id, ...filter }} {...props}>
        <MyOrdersView title={{ icon: 'SolutionOutlined', text: t('myDeliveries') }} {...props} />
      </MyDeliveryContainer>
    )
  );
};

export default compose(
  withCurrentUser,
  withOrdersState,
  withFilterUpdating,
  withOrderStates,
  translate('order')
)(MyDelivery);
