import React from 'react';
import styled from 'styled-components';
import { Row, Col, List, Icon } from 'antd';
import { PropTypes } from 'prop-types';

import CategorySlick from './CategorySlick';
import FavoriteItemComponent from './FavoriteItemComponent';
import PageLayout from './PageLayout';
import { PgTitle } from './StyledComponents';
import SuggestedListComponent from './SuggestedListComponent';

const Header = styled.div`
  width: 500%;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  width: 500%;
  margin: -200% 0 0 -200%;
  padding: 200% 200% 0 200%;
`;

const NoMyListingsBookmarkMessage = ({ t }) => <div className="text-center">No Listing Bookmarked</div>;
NoMyListingsBookmarkMessage.propTypes = { t: PropTypes.func };

const FavoritesView = props => {
  const { history, loading, categorySlick, t, myListingsBookmark, onBookmark } = props;
  const renderFunc = (key, item) => <FavoriteItemComponent key={key} item={item} onBookmark={onBookmark} />;
  const RenderMyListingsBookmarkCodes = () => (
    <div>
      <SuggestedListComponent items={myListingsBookmark} {...props} renderFunc={renderFunc} />
    </div>
  );
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="FAVORITES">
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
        {myListingsBookmark && myListingsBookmark.totalCount ? (
          <RenderMyListingsBookmarkCodes />
        ) : !loading ? (
          <NoMyListingsBookmarkMessage t={t} />
        ) : null}
      </div>
    </PageLayout>
  );
};

FavoritesView.propTypes = {
  history: PropTypes.object,
  categorySlick: PropTypes.array,
  myListingsBookmark: PropTypes.object
};

export default FavoritesView;
