import React from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import GET_CART_QUERY from '@gqlapp/order-client-react/graphql/GetCartQuery.graphql';
import PATCH_ORDER from '@gqlapp/order-client-react/graphql/PatchOrder.graphql';

import CheckoutOrderView from '../components/CheckoutOrderView';
import { CART } from './Data';

const CheckoutOrder = props => {
  const onSubmit = async () => {
    const { history, navigation } = props;
    try {
      await props.patchOrder({
        id: props.getCart.id,
        state: 'INITIATED'
      });
      history.push('/demo/checkout-status');
    } catch (e) {
      message.error('Failed!');
      console.log(e);
    }

    // Redirect
    if (history) {
      return history.push('/my-orders/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  };
  console.log('props', props);
  return <CheckoutOrderView {...props} onSubmit={onSubmit} />;
};

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
  graphql(PATCH_ORDER, {
    props: ({ mutate }) => ({
      patchOrder: async values => {
        await mutate({
          variables: {
            input: values
          }
        });
      }
    })
  })
)(CheckoutOrder);
