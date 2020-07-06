import React from 'react';
import { graphql } from 'react-apollo';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import update from 'immutability-helper';
import { message } from 'antd';

import ReviewsView from '../components/ReviewsView';
import { REVIEWS } from './Data';

import REVIEWS_QUERY from '../graphql/ReviewsQuery.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const Reviews = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  console.log('props', props);
  return (
    <ReviewsView
      {...props}
      // reviews={REVIEWS}
      onSubmit={handleSubmit}
    />
  );
};

export default compose(
  graphql(REVIEWS_QUERY, {
    options: ({ orderBy, filter, currentUser }) => {
      return {
        variables: {
          userId: currentUser && currentUser.id,
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, reviews, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.reviews.totalCount;
            const newEdges = fetchMoreResult.reviews.edges;
            const pageInfo = fetchMoreResult.reviews.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.reviews.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              reviews: {
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
      return { loading, reviews, subscribeToMore, loadData, updateQuery };
    }
  })
)(Reviews);
