import React from 'react';

import ReviewsView from '../components/ReviewsView';
import { REVIEWS } from './Data';

const Reviews = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return <ReviewsView {...props} reviews={REVIEWS} onSubmit={handleSubmit} />;
};

export default Reviews;
