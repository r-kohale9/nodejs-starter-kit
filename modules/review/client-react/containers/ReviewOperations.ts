import { FunctionComponent } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { History } from 'history';

import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import settings from '@gqlapp/config';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

// Query
import REVIEW_QUERY from '../graphql/ReviewQuery.graphql';
import REVIEWS_QUERY from '../graphql/ReviewsQuery.graphql';
import RATING_QUERY from '../graphql/RatingQuery.graphql';
import REVIEW_HELPFUL_STATUS from '../graphql/reviewHelpfulStatus.graphql';

// Mutation
import ADD_REVIEW from '../graphql/AddReview.graphql';
import EDIT_REVIEW from '../graphql/EditReview.graphql';
import DELETE_REVIEW from '../graphql/DeleteReview.graphql';
import TOOGLE_REVIEW_HELPFUL from '../graphql/ToggleReviewHelpful.graphql';

// Subscription
import REVIEWS_SUBSCRIPTION from '../graphql/ReviewSubscription.graphql';

// Filter
import UPDATE_REVIEWS_FILTER from '../graphql/UpdateReviewsFilter.client.graphql';
import REVIEWS_STATE_QUERY from '../graphql/ReviewsStateQuery.client.graphql';
import UPDATE_REVIEWS_ORDER_BY from '../graphql/UpdateReviewsOrderBy.client.graphql';

import ROUTES from '../routes';

// types
import {
  OrderByReviewInput,
  FilterReviewInput,
  AddReviewInput,
  AddModalReviewInput,
  EditReviewInput
} from '../../../../packages/server/__generated__/globalTypes';

import { review as reviewResponse, review_review as Review, reviewVariables } from '../graphql/__generated__/review';
import { ratingAverage as ratingAverageResponse, ratingAverageVariables } from '../graphql/__generated__/ratingAverage';
import {
  reviews as reviewsResponse,
  reviews_reviews_edges as ReviewsEdges,
  reviews_reviews as Reviews,
  reviewsVariables
} from '../graphql/__generated__/reviews';
import { deleteReview as deleteReviewResponse, deleteReviewVariables } from '../graphql/__generated__/deleteReview';
import { addReview as addReviewResponse, addReviewVariables } from '../graphql/__generated__/addReview';
import { editReview as editReviewResponse, editReviewVariables } from '../graphql/__generated__/editReview';
import {
  reviewHelpfulStatus as reviewHelpfulStatusResponse,
  reviewHelpfulStatusVariables
} from '../graphql/__generated__/reviewHelpfulStatus';
import {
  addOrRemoveReviewHelpful as addOrRemoveReviewHelpfulResponse,
  addOrRemoveReviewHelpfulVariables
} from '../graphql/__generated__/addOrRemoveReviewHelpful';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withRating = (Component: FunctionComponent) =>
  graphql<{ filter: FilterReviewInput }, ratingAverageResponse, ratingAverageVariables, {}>(RATING_QUERY, {
    options: ({ filter }) => {
      // console.log('filter', filter);
      return {
        variables: {
          modalName: filter.modalName,
          modalId: filter.modalId
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, ratingAverage, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, ratingAverage, subscribeToMore, updateQuery };
    }
  })(Component);

export const withReview = (Component: FunctionComponent) =>
  graphql<
    {
      match: Match<{ id: string }>;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    },
    reviewResponse,
    reviewVariables,
    {}
  >(REVIEW_QUERY, {
    options: props => {
      let id = '0';
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, review, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, review, subscribeToMore, updateQuery };
    }
  })(Component);

export const withReviews = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByReviewInput;
      filter: FilterReviewInput;
    },
    reviewsResponse,
    reviewsVariables,
    {}
  >(REVIEWS_QUERY, {
    options: ({ orderBy, filter }) => {
      // console.log('filter', filter);
      return {
        variables: {
          limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, reviews, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
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
                __typename: 'Reviews'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return { loading, reviews, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

// Mutation
export const withReviewsDeleting = (Component: FunctionComponent) =>
  graphql<{}, deleteReviewResponse, deleteReviewVariables, {}>(DELETE_REVIEW, {
    props: ({ mutate }) => ({
      deleteReview: (id: number) => {
        mutate({
          variables: { id }
        });
        Message.error('Review deleted.');
      }
    })
  })(Component);

export const withReviewAdding = (Component: FunctionComponent) =>
  graphql<{ history: History }, addReviewResponse, addReviewVariables, {}>(ADD_REVIEW, {
    props: ({ ownProps: { history }, mutate }) => ({
      addReview: async (values: AddReviewInput & AddModalReviewInput) => {
        const input = {
          modalName: values.modalName,
          modalId: values.modalId,
          review: {
            userId: values.userId,
            rating: values.rating,
            feedback: values.feedback,
            reviewMedia: values.reviewMedia
          }
        };
        // console.log(input);
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input
            }
          });

          Message.destroy();
          Message.success('Review added.');
          // console.log('addreview', values);
          if (history) {
            history.push(ROUTES.adminPanel);
          }
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withReviewEditing = (Component: FunctionComponent) =>
  graphql<{}, editReviewResponse, editReviewVariables, {}>(EDIT_REVIEW, {
    props: ({ mutate }) => ({
      editReview: async (input: EditReviewInput) => {
        await mutate({
          variables: {
            input
          }
        });
      }
    })
  })(Component);

// export const subscribeToReviews = (
//   subscribeToMore: ({
//     document,
//     variables: { filter },
//     updateQuery
//   }: {
//     document: string;
//     variables: { filter: FilterReviewInput };
//     updateQuery;
//   }) => Reviews,
//   filter: FilterReviewInput
// ) =>
export const subscribeToReviews = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterReviewInput
) =>
  subscribeToMore({
    document: REVIEWS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { reviews: Reviews },
      {
        subscriptionData: {
          data: {
            reviewUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { reviewUpdated: { mutation: string; node: Review } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddReviews(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditReviews(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteReviews(prev, node.id);
      }
      return newResult;
    }
  });

function onAddReviews(prev: { reviews: Reviews }, node: Review) {
  // console.log('prev', prev, node);
  if (prev.reviews.edges.some(review => node.id === review.cursor)) {
    return update(prev, {
      reviews: {
        totalCount: {
          $set: prev.reviews.totalCount - 1
        },
        edges: {
          $set: prev.reviews.edges
        }
      }
    });
  }

  const filteredReviews = prev.reviews.edges.filter(review => review.node.id !== null);

  const edge: ReviewsEdges = {
    cursor: node.id,
    node,
    __typename: 'ReviewEdges'
  };

  return update(prev, {
    reviews: {
      totalCount: {
        $set: prev.reviews.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredReviews]
      }
    }
  });
}

function onEditReviews(prev: { reviews: Reviews }, node: Review) {
  const index = prev.reviews.edges.findIndex((x: { node: Review }) => x.node.id === node.id);
  const edge: ReviewsEdges = {
    cursor: node.id,
    node,
    __typename: 'ReviewEdges'
  };
  if (index) {
    prev.reviews.edges.splice(index, 1, edge);
    return update(prev, {
      reviews: {
        edges: {
          $set: [...prev.reviews.edges]
        }
      }
    });
  }
}

const onDeleteReviews = (prev: { reviews: Reviews }, id: number) => {
  // console.log('called', id);
  const index = prev.reviews.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    reviews: {
      totalCount: {
        $set: prev.reviews.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToReview = (subscribeToMore: (options: SubscribeToMoreOptions) => () => void, history: History) =>
  subscribeToMore({
    document: REVIEWS_SUBSCRIPTION,
    updateQuery: (
      prev: { review: Review },
      {
        subscriptionData: {
          data: {
            reviewUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { reviewUpdated: { mutation: string; node: Review } } } }
    ) => {
      let newResult = prev;
      // if (mutation === 'CREATED') {
      //   newResult = onAddReview(prev, node);
      // } else
      if (mutation === 'UPDATED') {
        newResult = onEditReview(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteReview(history);
      }
      return newResult;
    }
  });

function onEditReview(prev: { review: Review }, node: Review) {
  // console.log(prev);
  return update(prev, {
    review: {
      $set: node
    }
  });
}

const onDeleteReview = (history: History) => {
  Message.error('Review was deleted!');
  return history.push(ROUTES.adminPanel);
};

// Filter
export const withReviewsStateQuery = (Component: FunctionComponent) =>
  graphql(REVIEWS_STATE_QUERY, {
    props({ data: { reviewsState } }) {
      return removeTypename(reviewsState);
    }
  })(Component);

export const withReviewsOrderByUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_REVIEWS_ORDER_BY, {
    props: ({ mutate }) => ({
      onReviewsOrderBy: (orderBy: OrderByReviewInput) => {
        // console.log('orderBy', orderBy);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withUpdateReviewsFilter = (Component: FunctionComponent) =>
  graphql(UPDATE_REVIEWS_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText: string) {
        mutate({ variables: { filter: { searchText } } });
      },
      onIsActiveChange(isActive: boolean) {
        mutate({ variables: { filter: { isActive } } });
      },
      onModalNameChange(modalName: string) {
        mutate({ variables: { filter: { modalName } } });
      },
      onFiltersRemove(filter: FilterReviewInput, orderBy: OrderByReviewInput) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);

export const withReviewHelpfulStatus = (Component: FunctionComponent) =>
  graphql<
    {
      review: Review;
      currentUser: CurrentUser;
    },
    reviewHelpfulStatusResponse,
    reviewHelpfulStatusVariables,
    {}
  >(REVIEW_HELPFUL_STATUS, {
    options: props => {
      return {
        variables: {
          reviewId: Number(props.review && props.review.id),
          userId: props.currentUser && props.currentUser.id
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, reviewHelpfulStatus } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, reviewHelpfulStatus };
    }
  })(Component);

export const withToogleReviewHelpful = (Component: FunctionComponent) =>
  graphql<{}, addOrRemoveReviewHelpfulResponse, addOrRemoveReviewHelpfulVariables, {}>(TOOGLE_REVIEW_HELPFUL, {
    props: ({ mutate }) => ({
      addOrRemoveReviewHelpful: async (reviewId: number, userId: number) => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          // console.log(reviewId, userId);
          const {
            data: { addOrRemoveReviewHelpful }
          } = await mutate({
            variables: { reviewId, userId }
          });

          Message.destroy();
          Message.success(addOrRemoveReviewHelpful);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
