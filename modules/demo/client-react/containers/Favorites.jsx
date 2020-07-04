import React from 'react';

import FavoritesView from '../components/FavoritesView';

import { CATEGORYSLICK } from './Slick';
import { FAVORITES } from './Data';

const Favorites = props => {
  return <FavoritesView {...props} categorySlick={CATEGORYSLICK} favorites={FAVORITES} />;
};

export default Favorites;
