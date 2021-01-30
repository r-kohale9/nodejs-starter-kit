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
import { listings_listings as Listings } from '../graphql/__generated__/listings';
import {
  FilterListInput,
  EditListingInput,
  OrderByListInput
} from '../../../../packages/server/__generated__/globalTypes';

export interface ListingProps {
  loading: boolean;
  loadingState: boolean;
  listings: Listings;
  history: History;
  filter: FilterListInput;
  orderBy: OrderByListInput;
  loadData: (endCursor: number, action: string) => void;
  deleteListing: (id: number) => void;
  editListing: (input: EditListingInput) => boolean | null;
  duplicateListing: (id: number) => boolean | null;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
  onLowerCostChange: (cost: number) => void;
  onUpperCostChange: (cost: number) => void;
  onCategoryChange: ({ categoryId, allSubCategory }: { categoryId: number; allSubCategory: boolean }) => void;
  onFiltersRemove: (filter: FilterListInput, orderBy: OrderByListInput) => void;
  onBrandChange: (brand: string[]) => void;
  onSearchTextChange: (serachText: string) => void;
  onRoleChange: (role: string) => void;
  onIsActiveChange: (active: boolean) => void;
  onDiscountChange: (discount: number) => void;
  onRatedChange: (rated: number) => void;
  onOrderBy: (orderBy: OrderByListInput) => void;
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
      showCategoryFilter={true}
      showIsActive={true}
      affix={false}
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
