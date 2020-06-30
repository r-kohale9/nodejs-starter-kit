import React from 'react';

import ListingDetailsView from '../components/ListingDetailsView';
import Product from '../Icons/product.svg';

import { FLAVORS, WEIGHTS } from './Constants';

const LISTING = {
  id: 1,
  listingImages: [
    {
      id: 1,
      imageUrl: Product
    },
    {
      id: 1,
      imageUrl: Product
    }
  ],
  title: 'Barbir Floral Cake',
  description:
    'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.',
  price: '1200',
  category: 'Custom Cake',
  rating: 5
};

const ListingDetails = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return (
    <ListingDetailsView {...props} listing={LISTING} flavors={FLAVORS} weights={WEIGHTS} onSubmit={handleSubmit} />
  );
};

export default ListingDetails;
