import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

import { withListing, withEditListing } from './ListingOperations';
import EditListingView from '../components/EditListingView.web';
import { subscribeToListing } from './ListingSubscriptions';
// import { removeEmpty } from '../components/functions';

// types
import { listing_listing as Listing } from '../graphql/__generated__/listing';
import { EditListingInput } from '../../../../packages/server/__generated__/globalTypes';

export interface EditListingProps {
  loading: boolean;
  listing: Listing;
  history: History;
  currentUser: CurrentUser;
  editListing: (input: EditListingInput) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const EditListing: React.FC<EditListingProps> = props => {
  const { subscribeToMore, listing, history, editListing } = props;

  useEffect(() => {
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    return () => subscribe();
  });

  const handleSubmit = (values: EditListingInput) => {
    // console.log(removeEmpty(values));
    try {
      editListing(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return listing ? <EditListingView onSubmit={handleSubmit} {...props} /> : null;
};

export default compose(withCurrentUser, withListing, withEditListing, translate('listing'))(EditListing);
