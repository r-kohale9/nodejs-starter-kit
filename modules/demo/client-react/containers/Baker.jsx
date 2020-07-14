import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingListWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import { updateMyListingsState, withCurrentUser } from '@gqlapp/listing-client-react/containers/ListingOperations';
import USER_LISTINGS from '@gqlapp/listing-client-react/graphql/UserListingsQuery.graphql';

import BakerView from '../components/BakerView';

import { CATEGORYICONSLICK, HOMESLICK } from './Slick';

import { USER, USERS, PROFILELIST } from './Data';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

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

export default compose(
  withCurrentUser,
  graphql(USER_LISTINGS, {
    options: ({ orderBy, filter, match, navigation }) => {
      let id = 0;
      if (match) {
        id = match.params.id;
      } else if (navigation) {
        id = navigation.state.params.id;
      }
      return {
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter,
          userId: Number(id)
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, userListings, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userListings.totalCount;
            const newEdges = fetchMoreResult.userListings.edges;
            const pageInfo = fetchMoreResult.userListings.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.userListings.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              userListings: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, listings: userListings, subscribeToMore, loadData, updateQuery };
    }
  }),
  translate('demo')
)(Baker);
