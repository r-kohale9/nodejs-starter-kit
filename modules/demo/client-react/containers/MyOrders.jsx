import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import MY_ORDERS_QUERY from '@gqlapp/order-client-react/graphql/MyOrdersQuery.graphql';
import ORDERS_SUBSCRIPTION from '@gqlapp/order-client-react/graphql/OrdersSubscription.graphql';

import MyOrdersView from '../components/MyOrdersView';
import { ORDER_STATUS } from './Constants';

const MyOrders = props => {
  useEffect(() => {
    const subscribe = subscribeToOrders(props.subscribeToMore);
    props.refetch();
    return () => subscribe();
  });
  console.log('props', props);
  return <MyOrdersView {...props} orderStatusSlick={ORDER_STATUS} />;
};

const onAddOrder = (prev, node) => {
  console.log('subscription add', prev, node);
  // ignore if duplicate
  // if (prev.blogs.some(item => node.id === item.id)) {
  //   return prev;
  // }
  return update(prev, {
    userOrders: {
      $push: [node]
    }
  });
};

const onDeleteOrder = (prev, node) => {
  console.log('subscription deleted');

  // ignore if not found
  if (prev.id !== node.id) {
    return prev;
  }

  return update(prev, {
    getCart: {
      $set: node
    }
  });
};

const subscribeToOrders = subscribeToMore =>
  subscribeToMore({
    document: ORDERS_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            ordersUpdated: { mutation, node }
          }
        }
      }
    ) => {
      console.log('subscribed');
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrder(prev, node);
      }
      return newResult;
    }
  });

// Orders.propTypes = {
//   usersUpdated: PropTypes.object,
//   updateQuery: PropTypes.func,
//   t: PropTypes.func,
//   subscribeToMore: PropTypes.func,
//   filter: PropTypes.object
// };

export default compose(
  graphql(MY_ORDERS_QUERY, {
    props({ data: { loading, error, userOrders, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, userOrders, subscribeToMore, refetch };
    }
  }),
  translate('demo')
)(MyOrders);
