import React, { useEffect } from 'react';
import { History } from 'history';
import { match as Match } from 'react-router-dom';
import { SubscribeToMoreOptions } from 'apollo-client';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { subscribeToListings } from './ListingSubscriptions';
import { withListings, withFilterUpdating, withListingsState, withOrderByUpdating } from './ListingOperations';
import ROUTES from '../routes';
import RenderCatalogue from '../components/RenderCatalogue';

// types
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';
import { listings_listings as Listings } from '../graphql/__generated__/listings';
import { FilterListInput } from '../../../../packages/server/__generated__/globalTypes';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

export interface ListingsCatalogueProps {
  loading: boolean;
  cartLoading: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  history: History;
  match: Match<{ id: string }>;
  filter: FilterListInput;
  currentUser: CurrentUser;
  getCart: GetCart;
  listings: Listings;
  deleteOrderDetail: (id: number) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  loadData: (endCursor: number, action: string) => { data: { listings: Listings } };
  t: TranslateFunction;
}

const ListingsCatalogue: React.FC<ListingsCatalogueProps> = props => {
  const { subscribeToMore, filter, deleteOrderDetail, getCart } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    const subscribeCart = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      subscribe();
      subscribeCart();
    };
  });

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
    <RenderCatalogue
      layout={'vertical'}
      onDelete={handleDelete}
      emptyLink={`${ROUTES.add}`}
      showFilter={true}
      {...props}
    />
  );
};

export default compose(
  withListingsState,
  withGetCart,
  withCurrentUser,
  withFilterUpdating,
  withOrderByUpdating,
  withListings,
  withDeleteCartItem,
  translate('listing')
)(ListingsCatalogue);
