import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
import { USER_ROUTES } from '@gqlapp/user-client-react';
import { MODAL } from '@gqlapp/review-common';
import { withModalDiscount, subscribeToDiscount } from '@gqlapp/discount-client-react';

import AddToCartView from '../components/AddToCartView';
import { withAddToCart, withGetCart, withDeleteCartItem } from './OrderOperations';

import ROUTES from '../routes';
import { subscribeToCart } from './OrderSubscriptions';

// types
import { modalDiscount_modalDiscount as ModalDiscount } from '@gqlapp/discount-client-react/graphql/__generated__/modalDiscount';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';
import { listing_listing as Listing } from '@gqlapp/listing-client-react/graphql/__generated__/listing';
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';
import { AddToCartInput } from '../../../../packages/server/__generated__/globalTypes';
import { AddToCartFormValues } from '../components/AddToCartForm';

export interface AddToCartProps {
  cartLoading: boolean;
  modalId: number;
  history: History;
  currentUser?: CurrentUser;
  listing: Listing;
  getCart: GetCart;
  modalDiscount: ModalDiscount;
  addToCart: (input: AddToCartInput) => void;
  deleteOrderDetail: (orderDetailId: number) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  discountSubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const AddToCart: React.FC<AddToCartProps> = props => {
  const {
    history,
    currentUser,
    listing,
    addToCart,
    deleteOrderDetail,
    subscribeToMore,
    discountSubscribeToMore,
    getCart,
    modalDiscount,
    modalId
  } = props;

  useEffect(() => {
    const subscribeDiscount = subscribeToDiscount(discountSubscribeToMore, modalId);
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      subscribe();
      subscribeDiscount();
    };
  });

  const onSubmit = (values: AddToCartFormValues, redirect: boolean = false): any => {
    const max = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
    const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
    const now = new Date().toISOString();
    const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
    const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
    const isDiscountPercent =
      startDate && endDate
        ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
        : modalDiscount && modalDiscount.discountPercent > 0;
    const discountPercent = isDiscountPercent ? modalDiscount && modalDiscount.discountPercent : null;
    const isDiscount = (listing && listing.listingFlags && listing.listingFlags.isDiscount) || isDiscountPercent;
    const discount =
      (listing &&
        listing.listingCostArray &&
        listing.listingCostArray.length > 0 &&
        listing.listingCostArray[0].discount) ||
      discountPercent;

    const image = listing && listing.listingMedia && listing.listingMedia.filter(lM => lM.type === 'image');
    const imageUrl = (image && image.length > 0 && image[0].url) || NO_IMG;

    if (!currentUser) {
      history.push(`${USER_ROUTES.login}?redirectBack=${history && history.location && history.location.pathname}`);
      return null;
    }

    if (values.quantity > max || values.quantity <= 0) {
      Message.error('Invalid quantity!');
      return null;
    }
    if (values.quantity <= max && values.quantity > 0) {
      const input: AddToCartInput = {
        consumerId: currentUser && currentUser.id,
        orderDetail: {
          vendorId: listing && listing.user && listing.user.id,
          modalName: MODAL[1].value,
          modalId: listing && listing.id,

          title: listing && listing.title,
          imageUrl,
          // tslint:disable-next-line:radix
          cost: isDiscount ? parseInt(cost && (cost - cost * (discount / 100)).toFixed()) : parseInt(cost.toFixed(2)),
          orderOptions: {
            quantity: values.quantity
          }
        }
      };

      try {
        // console.log('input', input);
        addToCart(input);
        if (redirect) {
          history.push(`${ROUTES.checkoutCart}`);
        }
      } catch (e) {
        Message.error('Failed!');
        throw new Error(e);
      }

      // Add Message
      Message.success('Success! Complete your Order.');
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

  // console.log('AddToCart, props', props);
  return <AddToCartView onSubmit={onSubmit} onDelete={handleDelete} {...props} />;
};

export default compose(
  withAddToCart,
  withGetCart,
  withDeleteCartItem,
  withModalDiscount,
  translate('orders')
)(AddToCart);
