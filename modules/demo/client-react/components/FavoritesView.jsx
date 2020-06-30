import React from 'react';
import styled from 'styled-components';
import { Row, Col, Icon } from 'antd';
import { PropTypes } from 'prop-types';

import CategorySlick from './CategorySlick';
import FavoriteItemComponent from './FavoriteItemComponent';
import PageLayout from './PageLayout';
import { PgTitle } from './StyledComponents';

const Header = styled.div`
  width: 500%;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  width: 500%;
  margin: -200% 0 0 -200%;
  padding: 200% 200% 0 200%;
`;

const FavoritesView = props => {
  const { history, categorySlick, favorites } = props;
  return (
    <PageLayout history={history} showMenuBar={true}>
      <Header>
        <PgTitle>Favorites</PgTitle>
        <div style={{ margin: '12px 0px 24px 0px' }}>
          <CategorySlick data={categorySlick} />
        </div>
        <div onClick={() => history.push('/demo/filters')}>
          <p style={{ display: 'inline-flex' }}>
            <Icon type="filter" style={{ fontSize: '20px', paddingRight: '5px' }} />
            Filters
          </p>
        </div>
      </Header>
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
