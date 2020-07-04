import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingListWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import {
  withUserListing,
  updateMyListingsState,
  withCurrentUser
} from '@gqlapp/listing-client-react/containers/ListingOperations';

import BakerView from '../components/BakerView';

import { CATEGORYICONSLICK, HOMESLICK } from './Slick';

import { USER, USERS, PROFILELIST } from './Data';

const Baker = props => {
  const { updateQuery, subscribeToMore } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return (
    <BakerView
      {...props}
      listings={props.userListings}
      homeSlick={HOMESLICK}
      users={USERS}
      user={USER}
      profileList={PROFILELIST}
      categorySlick={CATEGORYICONSLICK}
    />
  );
};

Baker.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  userListings: PropTypes.object
};

export default compose(withCurrentUser, withUserListing, translate('demo'))(Baker);
