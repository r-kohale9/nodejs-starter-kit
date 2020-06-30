import React from 'react';

import FavoritesView from '../components/FavoritesView';
import Product from '../Icons/product1.svg';
import { CATEGORYSLICK } from './Slick';

const FAVORITES = [
  {
    id: 1,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 1,
    price: 700
  },
  {
    id: 3,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 3,
    price: 700
  },
  {
    id: 3,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 6,
    price: 700
  }
];
const Favorites = props => {
  return <FavoritesView {...props} categorySlick={CATEGORYSLICK} favorites={FAVORITES} />;
};

export default Favorites;
