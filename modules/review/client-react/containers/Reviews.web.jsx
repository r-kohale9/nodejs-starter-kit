import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import ReviewsView from '../components/ReviewsView';

import ALL_REVIEWS_QUERY from '../graphql/AllReviewsQuery.graphql';
import ADD_REVIEW from '../graphql/AddReview.graphql';
import DELETE_REVIEW from '../graphql/DeleteReview.graphql';

// import { useReviewsWithSubscription } from './withSubscriptions';
// import { withReviews, withReviewsDeleting, updateReviewsState, withToogleReviewActive } from './ReviewOperations';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const Review = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  // const reviewsUpdated = useReviewsWithSubscription(subscribeToMore, filter);

  // useEffect(() => {
  //   if (reviewsUpdated) {
  //     updateReviewsState(reviewsUpdated, updateQuery);
  //   }
  // });
  console.log('props', props);
  return <ReviewsView {...props} />;
};

Review.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(
  graphql(ALL_REVIEWS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, allReviews, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.allReviews.totalCount;
            const newEdges = fetchMoreResult.allReviews.edges;
            const pageInfo = fetchMoreResult.allReviews.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.allReviews.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              allReviews: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Review'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, allReviews, subscribeToMore, loadData, updateQuery };
    }
  }),

  graphql(DELETE_REVIEW, {
    props: ({ mutate }) => ({
      deleteReview: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteReview: {
              id: id,
              __typename: 'Review'
            }
          }
          //   ,
          //   update: (cache, { data: { deleteReview } }) => {
          //     // Get previous reviews from cache
          //     const prevReviews = cache.readQuery({
          //       query: REVIEWS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       }
          //     });

          //     const newListReviews = onDeleteListing(prevReviews, deleteListing.id);

          //     // Write reviews to cache
          //     cache.writeQuery({
          //       query: REVIEWS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       },
          //       data: {
          //         reviews: {
          //           ...newListReviews.reviews,
          //           __typename: 'Reviews'
          //         }
          //       }
          //     });
          //   }
        });
        message.warning('Review deleted.');
      }
    })
  }),
  translate('Review')
)(Review);
