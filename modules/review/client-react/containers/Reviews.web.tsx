import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewsView from '../components/ReviewsView';
import {
  withReviewsStateQuery,
  withReviewsOrderByUpdating,
  withUpdateReviewsFilter,
  withReviews,
  withReviewsDeleting,
  subscribeToReviews
} from './ReviewOperations';

// types
import { reviews_reviews as Reviews } from '../graphql/__generated__/reviews';
import { OrderByReviewInput, FilterReviewInput } from './../../../../packages/server/__generated__/globalTypes';

export interface ReviewProps {
  loading: boolean;
  reviews: Reviews;
  orderBy: OrderByReviewInput;
  filter: FilterReviewInput;
  deleteReview: (id: number) => void;
  onSearchTextChange: (serachText: string) => void;
  onIsActiveChange: (active: boolean) => void;
  onFiltersRemove: (filter: FilterReviewInput, orderBy: OrderByReviewInput) => void;
  onModalNameChange: (modalName: string) => void;
  onReviewsOrderBy: (orderBy: OrderByReviewInput) => void;
  loadData: (endCursor: number, action: string) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const Review: React.FC<ReviewProps> = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToReviews(subscribeToMore, props.filter);
    return () => subscribe();
  });

  // console.log('props', props);
  return <ReviewsView filter={{}} {...props} />;
};

export default compose(
  withReviewsStateQuery,
  withReviewsOrderByUpdating,
  withUpdateReviewsFilter,
  withReviews,
  withReviewsDeleting,
  translate('Review')
)(Review);
