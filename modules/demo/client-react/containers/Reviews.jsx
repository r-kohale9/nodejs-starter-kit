import React from 'react';

import ReviewsView from '../components/ReviewsView';
import Product from '../Icons/product.svg';
import Avatar from '../Icons/userimage.svg';

const REVIEWS = [
  {
    id: 1,
    name: 'Helene',
    thumbnail: Avatar,
    review:
      'Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.',
    rating: '4',
    date: 'June 4, 2020',
    images: [
      {
        id: 1,
        image: Product
      },
      {
        id: 2,
        image: Product
      }
    ]
  },
  {
    id: 2,
    name: 'Helene',
    thumbnail: Avatar,
    review:
      'Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.',
    rating: '4',
    date: 'June 4, 2020',
    images: [
      {
        id: 1,
        image: Product
      },
      {
        id: 2,
        image: Product
      }
    ]
  }
];

const Reviews = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return <ReviewsView {...props} reviews={REVIEWS} onSubmit={handleSubmit} />;
};

export default Reviews;
