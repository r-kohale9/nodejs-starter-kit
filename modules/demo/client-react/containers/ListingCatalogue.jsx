import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingsWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import {
  withListings,
  updateListingsState,
  withCurrentUser
} from '@gqlapp/listing-client-react/containers/ListingOperations';
// import { USERS_QUERY } from '@gqlapp/user-client-react/graphql/UsersQuery.graphql';
import { withUsers } from '@gqlapp/user-client-react/containers/UserOperations';

import ListingCatalogueView from '../components/ListingCatalogueView';

import { HOMESLICK, CATEGORYICONSLICK } from './Slick';
import { USER, PROFILELIST } from './Data';

const ListingCatalogue = props => {
  console.log('props', props);

  return (
    <ListingCatalogueView
      {...props}
      user={USER}
      homeSlick={HOMESLICK}
      categorySlick={CATEGORYICONSLICK}
      profileList={PROFILELIST}
    />
  );
};

export default compose(
  // graphql(USERS_QUERY, {
  //   options: ({ orderBy, filter }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       variables: { orderBy, filter }
  //     };
  //   },
  //   props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
  //     return {
  //       loading,
  //       users,
  //       refetch,
  //       subscribeToMore,
  //       updateQuery,
  //       errors: error ? error.graphQLErrors : null
  //     };
  //   }
  // }),
  withCurrentUser,
  withUsers,
  translate('demo')
)(ListingCatalogue);
