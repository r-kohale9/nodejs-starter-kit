import React from 'react';
import { graphql } from 'react-apollo';
import { PLATFORM, compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import USER_LIST_QUERY from '@gqlapp/user-client-react/graphql/UserListQuery.graphql';
import { withCurrentUser } from '@gqlapp/listing-client-react/containers/ListingOperations';
// import { withUsers } from '@gqlapp/user-client-react/containers/UserOperations';

import ListingCatalogueView from '../components/ListingCatalogueView';

import settings from '../../../../settings';

import { HOMESLICK, CATEGORYICONSLICK } from './Slick';
import { USER, PROFILELIST } from './Data';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

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
  graphql(USER_LIST_QUERY, {
    options: ({ orderBy }) => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { limit: limit, after: 0, orderBy, filter: { role: 'baker' } },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, userList, fetchMore, updateQuery, subscribeToMore } = data;
      const users = userList;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userList.totalCount;
            const newEdges = fetchMoreResult.userList.edges;
            const pageInfo = fetchMoreResult.userList.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.userList.edges, ...newEdges] : newEdges;

            return {
              userList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      console.log('users ops', data);
      if (error) throw new Error(error);
      return { loading, users, loadData, updateQuery, subscribeToMore };
    }
  }),
  withCurrentUser,
  translate('demo')
)(ListingCatalogue);
