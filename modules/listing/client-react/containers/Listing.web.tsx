import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';
import _ from 'lodash';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import ListingView from '../components/ListingView';

import { subscribeToListings } from './ListingSubscriptions';
import {
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing,
  withDulicateListing
} from './ListingOperations';

// types
import { FilterListInput, EditListingInput } from '../../../../packages/server/__generated__/globalTypes';

interface ListingProps {
  loading: boolean;
  history: History;
  filter: FilterListInput;
  t: TranslateFunction;
  editListing: (input: EditListingInput) => boolean | null;
  duplicateListing: (id: number) => boolean | null;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
}

const Listing: React.FC<ListingProps> = props => {
  const { subscribeToMore, editListing, duplicateListing, history } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, props.filter);
    return () => subscribe();
  });

  const handleToggle = (
    field: string,
    value: boolean | { id: number; isNew: boolean } | { id: number; isFeatured: boolean },
    id: number
  ) => {
    const input: EditListingInput = {
      id
    };
    _.set(input, field, value);
    try {
      editListing(input);
    } catch (e) {
      throw Error(e);
    }
  };
  const handleDuplicate = async (id: number) => {
    try {
      const newListingId = await duplicateListing(id);
      if (newListingId) {
        history.push(`${ROUTES.editLink}${newListingId}`);
      }
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return (
    <ListingView
      onToggle={handleToggle}
      onDuplicate={handleDuplicate}
      filter={{ categoryFilter: {} }}
      orderBy={{}}
      {...props}
    />
  );
};

export default compose(
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing,
  withDulicateListing,
  translate('listing')
)(Listing);
