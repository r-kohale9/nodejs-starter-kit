import React, { useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { Icon, Row, Col, Badge } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';

const NavItemCart = props => {
  const { subscribeToMore, currentUserLoading, currentUser, refetch, getCart } = props;

  useEffect(() => {
    console.log('use effect', subscribeToMore);
    const subscribe = subscribeToOrders(subscribeToMore);
    refetch();
    return () => subscribe();
  });

  console.log('props nav', getCart && getCart.orderDetails && getCart.orderDetails.length);
  return (
    <>
      {!currentUserLoading && currentUser && (
        <Row type="flex" align="middle">
          <Col span={8}>
            <Icon type="shopping-cart" /> Cart
          </Col>
          <Col span={16}>
            <Badge count={getCart && getCart.orderDetails && getCart.orderDetails.length} />
            {/* <Badge>
              <p>{getCart && getCart.orderDetails && getCart.orderDetails.length}</p>
            </Badge> */}
          </Col>
        </Row>
      )}
    </>
  );
};

const onAddOrder = (prev, node) => {
  console.log('subscription add', prev, node);
  return update(prev, {
    getCart: {
      $set: node
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

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        currentUserLoading: loading,
        currentUser
      };
    }
  }),
  graphql(GET_CART_QUERY, {
    options: props => {
      return {
        variables: { id: props.currentUser ? props.currentUser.id : null }
      };
    },
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  }),
  translate('order')
)(NavItemCart);
