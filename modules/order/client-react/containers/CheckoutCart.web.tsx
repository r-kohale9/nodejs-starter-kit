import React, { useEffect } from 'react';
import { History } from 'history';
import { SubscribeToMoreOptions } from 'apollo-client';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { TranslateFunction, translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import CheckoutCartView from '../components/CheckoutCartView';
import { withGetCart, withDeleteCartItem, withEditOrderDetail } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
// types
import { getCart_getCart as GetCart } from '../graphql/__generated__/getCart';
import { EditOrderDetailInput, OrderOptionsInput } from '../../../../packages/server/__generated__/globalTypes';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

export interface CheckoutCartProps {
  history: History;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  getCart: GetCart;
  deleteOrderDetail: (id: number) => void;
  editOrderDetail: (input: EditOrderDetailInput) => void;
  onDelete: (id: number) => void;
  t: TranslateFunction;
  onEdit: (id: number, optionsId: number, listingCost: number, values: OrderOptionsInput) => void;
  cartLoading: boolean;
  currentUser: CurrentUser;
  onSubmit: (value: any) => void;
}

const CheckoutCart: React.FunctionComponent<CheckoutCartProps> = props => {
  const { getCart, deleteOrderDetail, editOrderDetail, subscribeToMore, history } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const handleEdit = (id: number, optionsId: number, listingCost: number, values: OrderOptionsInput) => {
    try {
      const input = {
        id,
        listingCost,
        orderOptions: {
          id: optionsId,
          quantity: values.quantity
        }
      };
      // console.log(input);
      const output = editOrderDetail(input);
      if (output != null) {
        return Message.success('Edited successfully');
      } else {
        return Message.error('Try again');
      }
      // output ? Message.success('Edited successfully') : Message.error('Try again');
    } catch (e) {
      throw Error(e);
    }
  };

  const handleDelete = (id: number) => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <CheckoutCartView onEdit={handleEdit} onDelete={handleDelete} {...props} />;
};

export default compose(
  withCurrentUser,
  withGetCart,
  withDeleteCartItem,
  withEditOrderDetail,
  translate('order')
)(CheckoutCart);
