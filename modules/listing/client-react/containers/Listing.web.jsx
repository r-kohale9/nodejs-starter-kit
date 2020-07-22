import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';
import ListingView from '../components/ListingView';

import { useListingsWithSubscription } from './withSubscriptions';
import { withListings, withListingsDeleting, updateListingsState, withToogleListingActive } from './ListingOperations';

const Listing = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  const listingsUpdated = useListingsWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (listingsUpdated) {
      updateListingsState(listingsUpdated, updateQuery);
    }
  });

  return <ListingView {...props} />;
};

Listing.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(withListings, withListingsDeleting, withToogleListingActive, translate('listing'))(Listing);