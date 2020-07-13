import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withToogleListingBookmark,
  withCurrentUser,
  withMyListingsBookmark,
  updateMyListingsBookmarkState
} from '@gqlapp/listing-client-react/containers/ListingOperations';
import { useMyListingBookmarkWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';

import FavoritesView from '../components/FavoritesView';

import { CATEGORYSLICK } from './Slick';

const Favorites = props => {
  const { updateQuery, subscribeToMore, currentUser } = props;
  const listingsUpdated = useMyListingBookmarkWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsBookmarkState(listingsUpdated, updateQuery);
    }
  });

  const bookmarkListing = async id => {
    try {
      await props.addOrRemoveListingBookmark(id, currentUser.id);
    } catch (e) {
      throw Error(e);
    }
  };
  console.log('props', props);
  return <FavoritesView {...props} categorySlick={CATEGORYSLICK} onBookmark={bookmarkListing} />;
};

Favorites.propTypes = {
  subscribeToMore: PropTypes.func,
  myListingsBookmark: PropTypes.object,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(
  withCurrentUser,
  withToogleListingBookmark,
  withMyListingsBookmark,
  translate('demo')
)(Favorites);
