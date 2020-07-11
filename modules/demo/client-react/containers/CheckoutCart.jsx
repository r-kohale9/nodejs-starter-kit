import React, { useEffect } from 'react';
import { compose, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import GET_CART_QUERY from '@gqlapp/order-client-react/graphql/GetCartQuery.graphql';
import DELETE_CART_ITEM from '@gqlapp/order-client-react/graphql/DeleteCartItem.graphql';
import ORDERS_SUBSCRIPTION from '@gqlapp/order-client-react/graphql/OrdersSubscription.graphql';
import EDIT_ORDER from '@gqlapp/order-client-react/graphql/EditOrder.graphql';

import { PropTypes } from 'prop-types';
import CheckoutCartView from '../components/CheckoutCartView';

import { CART, PROMOCODES } from './Data';

const CheckoutCart = props => {
  const { getCart, editOrder, deleteOrderDetail, history } = props;
  useEffect(() => {
    const subscribe = subscribeToOrders(props.subscribeToMore);
    props.refetch();
    return () => subscribe();
  });

  const handleDelete = async id => {
    try {
      await deleteOrderDetail(id);
    } catch (e) {
      throw Error(e);
    }
  };

  const handleSubmit = async values => {
    console.log('values', Object.values(removeTypename(values.orderDetails)));
    try {
      await editOrder({
        id: getCart.id,
        consumerId: getCart.consumerId,
        trackingNumber: getCart.trackingNumber,
        paymentMethodId: 1,
        shippingAddressId: 1,
        deliveryMethod: getCart.deliveryMethod,
        discount: getCart.discount,
        state: getCart.state,
        orderDetails: Object.values(removeTypename(values.orderDetails))
      });
    } catch (e) {
      throw Error(e);
    }
    history.push('/demo/checkout-order');
  };
  console.log('props', props);
  return <CheckoutCartView {...props} onDelete={handleDelete} promocodes={PROMOCODES} onSubmit={handleSubmit} />;
};

CheckoutCart.propTypes = {
  getCart: PropTypes.object,
  deleteOrderDetail: PropTypes.func,
  editOrder: PropTypes.func
};

const onAddOrder = (prev, node) => {
  // ignore if duplicate
  // if (prev.blogs.some(item => node.id === item.id)) {
  //   return prev;
  // }
  return update(prev, {
    getCart: {
      $set: node
    }
  });
};

const onDeleteOrder = (prev, node) => {
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
      let newResult = prev;
      console.log('prev', prev, 'node', node);
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
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  }),
  graphql(EDIT_ORDER, {
    props: ({ mutate }) => ({
      editOrder: async input => {
        const {
          data: { editOrder }
        } = await mutate({
          variables: { input }
        });

        return editOrder;
      }
    })
  }),
  graphql(DELETE_CART_ITEM, {
    props: ({ mutate }) => ({
      deleteOrderDetail: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteOrderDetail: {
              id: id,
              __typename: 'Order'
            }
          },
          update: (cache, { data: { deleteOrderDetail } }) => {
            // Get previous getCart from cache
            const prevCartItem = cache.readQuery({
              query: GET_CART_QUERY
            });

            const node = {
              id: prevCartItem.id,
              state: prevCartItem.state,
              orderDetails: prevCartItem.getCart.orderDetails.filter(item => item.id !== deleteOrderDetail.id)
            };

            const newCartItem = onDeleteOrder(prevCartItem, node);

            // Write getCart to cache
            cache.writeQuery({
              query: GET_CART_QUERY,
              data: {
                getCart: {
                  ...newCartItem,
                  __typename: 'Order'
                }
              }
            });
          }
        });
        message.warning('Item deleted.');
      }
    })
  }),
  translate('orders')
)(CheckoutCart);
