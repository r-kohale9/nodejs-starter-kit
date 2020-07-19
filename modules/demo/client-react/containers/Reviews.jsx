import React from 'react';
import { PLATFORM, removeTypename, compose } from '@gqlapp/core-common';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';

import { message } from 'antd';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_REVIEW from '@gqlapp/review-client-react/graphql/AddReview.graphql';
import EDIT_REVIEW from '@gqlapp/review-client-react/graphql/EditReview.graphql';
import DELETE_REVIEW from '@gqlapp/review-client-react/graphql/DeleteReview.graphql';
import REVIEWS_QUERY from '@gqlapp/review-client-react/graphql/ReviewsQuery.graphql';
import RATINGS_QUERY from '@gqlapp/review-client-react/graphql/RatingsQuery.graphql';

import ReviewsView from '../components/ReviewsView';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const Reviews = props => {
  const handleSubmit = (values, type) => {
    console.log('values', values, type);
    try {
      switch (type) {
        case 'ADD':
          values.userId = props.currentUser.id;
          return props.addReview(values);
        case 'DELETE':
          return props.deleteReview(values);
        case 'EDIT':
          return props.editReview(values);
        default:
          return true;
      }
    } catch (e) {
      throw Error(e);
    }
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

Reviews.propTypes = {
  currentUser: PropTypes.object,
  addReview: PropTypes.func
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(REVIEWS_QUERY, {
    options: ({ orderBy, filter, match, navigation }) => {
      let id = 0;
      if (match) {
        id = match.params.id;
      } else if (navigation) {
        id = navigation.state.params.id;
      }
      return {
        variables: {
          userId: Number(id),
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
                __typename: 'Review'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, reviews, subscribeToMore, loadData, updateQuery };
    }
  }),
  graphql(ADD_REVIEW, {
    props: ({ ownProps: { match, navigation, history }, mutate }) => ({
      addReview: async values => {
        let id = 0;
        if (match) {
          id = match.params.id;
        } else if (navigation) {
          id = navigation.state.params.id;
        }
        values.bakerId = Number(id);
        values.rating = Number(values.rating);
        console.log('values', values);
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addReview: {
                __typename: 'Review',
                ...values
              }
            }
            // ,
            // update: (cache, { data: { addReview } }) => {
            //   // Get previous listings from cache
            //   const { reviews } = cache.readQuery({
            //     query: REVIEWS_QUERY,
            //     variables: {
            //       userId: Number(id),
            //       limit: limit,
            //       after: 0
            //     }
            //   });
            //   if (reviews.edges.some((review) => review.node.id === addReview.id)) {
            //     return reviews;
            //   }

            //   // Write listings to cache
            //   cache.writeQuery({
            //     query: REVIEWS_QUERY,
            //     variables: {
            //       limit,
            //       after: 0
            //     },
            //     data: {
            //       reviews: {
            //         node {

            //         }
            //       }
            //     }
            //   });
            // }
          });

          message.destroy();
          message.success('Review added.');
          // console.log('addreview', values);
          history.push(`/demo/reviews/${id}`);
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(EDIT_REVIEW, {
    props: ({
      ownProps: {
        history,
        navigation
        // currentUser: { role }
      },
      mutate
    }) => ({
      editReview: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const input = removeTypename(values);
          input.reviewImages = Object.values(input.reviewImages);

          console.log('input', input);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          // if (history) {
          //   if (role === 'admin') return history.push('/demo/review');
          //   else return history.push('/my-reviews');
          // }
          // if (navigation) {
          //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
          //   else return navigation.navigate('MyReviews');
          // }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
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
  graphql(RATINGS_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { bakerId: Number(id) }
      };
    },
    props({ data: { loading, error, ratings, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, ratings, subscribeToMore, updateQuery };
    }
  })
)(Reviews);
