import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Rate } from '@gqlapp/look-client-react';

import { withRating } from './ReviewOperations';
import { avgRating } from '../components/AvgRatingComponent';

// types
import { ratingAverage_ratingAverage as RatingAverage } from '../graphql/__generated__/ratingAverage';
import { FilterListInput } from '../../../../packages/server/__generated__/globalTypes';

export interface ReviewStarProps {
  filter: FilterListInput;
  loading?: boolean;
  ratingAverage?: RatingAverage;
  suffix?: string;
}

const ReviewStar: React.FC<ReviewStarProps> = props => {
  const { loading, ratingAverage, suffix } = props;
  const one = ratingAverage && ratingAverage.one;
  const two = ratingAverage && ratingAverage.two;
  const three = ratingAverage && ratingAverage.three;
  const four = ratingAverage && ratingAverage.four;
  const five = ratingAverage && ratingAverage.five;
  const totalRatings = one + two + three + four + five;

  return !loading ? (
    <>
      <Rate disabled allowHalf defaultValue={avgRating(five, four, three, two, one, totalRatings)} /> &nbsp;{' '}
      {suffix ? `(${totalRatings} ${suffix})` : `(${totalRatings})`}
    </>
  ) : (
    <br />
  );
};

export default compose(withRating, translate('review'))(ReviewStar);
