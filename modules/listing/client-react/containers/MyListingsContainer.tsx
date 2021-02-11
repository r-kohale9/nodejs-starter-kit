import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withListings,
  withFilterUpdating,
  withListingsState,
  withOrderByUpdating,
  withListingsDeleting
} from './ListingOperations';
import { subscribeToListings } from './ListingSubscriptions';

// types
import { listings_listings as Listings } from '../graphql/__generated__/listings';
import { SubscribeToMoreOptions } from 'apollo-client';
import { FilterListInput } from '../../../../packages/server/__generated__/globalTypes';
import { MyListingsProps } from './MyListings';
import MyListingsView from '../components/MyListingsView';

export interface MyListingsContainerProps extends MyListingsProps {
  loading: boolean;
  listings: Listings;
  filter: FilterListInput;
  deleteListing: (id: number) => void;
  loadData: (endCursor: number, action: string) => { data: { listings: Listings } };
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
}

const MyListingsContainer: React.FC<MyListingsContainerProps> = props => {
  const { subscribeToMore, deleteListing, filter } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    return () => subscribe();
  });

  const handleDelete = async (id: number) => {
    try {
      await await deleteListing(id);
    } catch (e) {
      throw e;
    }
  };

  // console.log('props', props);
  // return React.cloneElement(props.children as React.ReactElement<any>, { ...props, onDelete: handleDelete });
  return <MyListingsView onDelete={handleDelete} {...props} />;
};

export default compose(
  withListingsState,
  withListings,
  withFilterUpdating,
  withOrderByUpdating,
  withListingsDeleting,
  translate('listing')
)(MyListingsContainer);
