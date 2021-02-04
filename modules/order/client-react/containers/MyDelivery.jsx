import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { withOrdersState, withFilterUpdating, withOrderStates, withOrders } from './OrderOperations';
import { subscribeToOrders } from './OrderSubscriptions';

import MyOrdersView from '../components/MyOrdersView';

const MyDeliveryContainer = compose(withOrders)((props) => {
  const { ordersSubscribeToMore, refetch } = props;
  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    refetch();
    return () => subscribe();
  }, [ordersSubscribeToMore, props.filter, refetch]);

  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

const MyDelivery = (props) => {
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

MyDelivery.propTypes = {
  currentUserLoading: PropTypes.bool,
  filter: PropTypes.object,
  currentUser: PropTypes.object,
  t: PropTypes.func,
};

export default compose(withCurrentUser, withOrdersState, withFilterUpdating, withOrderStates, translate('order'))(MyDelivery);
