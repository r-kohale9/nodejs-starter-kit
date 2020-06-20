import React from 'react';
import { Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import CategorySlick from './CategorySlick';
import FavoriteItemComponent from './FavoriteItemComponent';
import PageLayout from './PageLayout';

const FavoritesView = props => {
  const { history, categorySlick, favorites } = props;
  return (
    <PageLayout history={history} showMenuBar={true}>
      <h1>Favorites</h1>
      <CategorySlick data={categorySlick} />
      <div style={{ paddingTop: '16px' }}>
        {favorites && favorites.map(item => <FavoriteItemComponent item={item} />)}
      </div>
    </PageLayout>
  );
};

FavoritesView.propTypes = {
  history: PropTypes.object,
  categorySlick: PropTypes.array,
  favorites: PropTypes.object
};

export default FavoritesView;
