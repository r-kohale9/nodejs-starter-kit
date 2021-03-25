import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import {
  withListing,
  withToogleListingBookmark,
  withCanUserReview,
  withShareListingByEmail
} from './ListingOperations';

import ListingDetailView from '../components/ListingDetailView';
import { subscribeToListing, subscribeToListingReview } from './ListingSubscriptions';

// types
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';
import { listing_listing as Listing } from '../graphql/__generated__/listing';
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';
import { ShareListingByEmailInput } from '../../../../packages/server/__generated__/globalTypes';

export interface ListingDetailProps {
  getCart: GetCart;
  currentUser: CurrentUser;
  loading: boolean;
  listing: Listing;
  history: History;
  location: Location;
  canUserReview: boolean;
  shareListingByEmail: (values: ShareListingByEmailInput) => void;
  addOrRemoveListingBookmark: (listingId: number, userId: number) => void;
  canUserReviewsubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  deleteOrderDetail: (id: number) => void;
  t: TranslateFunction;
}

const ListingDetail: React.FC<ListingDetailProps> = props => {
  const {
    subscribeToMore,
    listing,
    history,
    location,
    shareListingByEmail,
    addOrRemoveListingBookmark,
    canUserReviewsubscribeToMore,
    getCart,
    deleteOrderDetail
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    const subscribeAddReview = subscribeToListingReview(canUserReviewsubscribeToMore, listing && listing.id);
    const subscribeCart = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      subscribe();
      subscribeAddReview();
      subscribeCart();
    };
  }, [history, subscribeToMore, listing, location, canUserReviewsubscribeToMore, getCart]);

  const bookmarkListing = async (id: number, userId: number) => {
    try {
      await addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  const handleShare = async (values: ShareListingByEmailInput) => {
    try {
      await shareListingByEmail(values);
    } catch (e) {
      Message.destroy();
      Message.error('Message sending failed');
      throw new Error(e);
    }
    Message.destroy();
    Message.success('Email sent!');
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
  return (
    <ListingDetailView onDelete={handleDelete} onShare={handleShare} handleBookmark={bookmarkListing} {...props} />
  );
};

export default compose(
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withCanUserReview,
  withShareListingByEmail,
  withGetCart,
  withDeleteCartItem,
  translate('listing')
)(ListingDetail);
