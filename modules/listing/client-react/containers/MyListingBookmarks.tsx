import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import ListingCatalogueView from '../components/ListingCatalogueView.web';
import {
  withMyListingsBookmark,
  withFilterUpdating,
  withOrderByUpdating,
  withListingsState
} from './ListingOperations';
import { subscribeToListingsBookmark } from './ListingSubscriptions';
import ROUTES from '../routes';

// types
import { listings_listings as Listings } from '../graphql/__generated__/listings';
import { FilterListInput } from '../../../../packages/server/__generated__/globalTypes';

export interface MyListingsBookmarkProps {
  filter: FilterListInput;
  myListingsBookmark: Listings;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
}

const MyListingsBookmark: React.FC<MyListingsBookmarkProps> = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToListingsBookmark(subscribeToMore, props.filter);
    return () => subscribe();
  });

  // console.log('props', props);
  return (
    <ListingCatalogueView
      title={'My Bookmarks'}
      showFilter={true}
      emptyLink={`${ROUTES.listingCatalogue}`}
      listings={props.myListingsBookmark}
      {...props}
    />
  );
};

export default compose(
  withCurrentUser,
  withListingsState,
  withMyListingsBookmark,
  withFilterUpdating,
  withOrderByUpdating,
  translate('listing')
)(MyListingsBookmark);
