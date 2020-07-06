import React from 'react';
import { compose, removeTypename, PLATFORM } from '@gqlapp/core-common';

import { graphql } from 'react-apollo';

import PromocodesView from '../components/PromocodesView';
import PROMOCODES_QUERY from '../graphql/PromoCodesQuery.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const Promocodes = props => {
  const handleSubmit = value => {
    console.log('promo', value);
  };
  console.log('props', props);
  return <PromocodesView {...props} onSubmit={handleSubmit} />;
};

export default compose(
  graphql(PROMOCODES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, getPromoCodes, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.getPromoCodes.totalCount;
            const newEdges = fetchMoreResult.getPromoCodes.edges;
            const pageInfo = fetchMoreResult.getPromoCodes.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.getPromoCodes.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              getPromoCodes: {
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
      return { loading, getPromoCodes, subscribeToMore, loadData, updateQuery };
    }
  })
)(Promocodes);
