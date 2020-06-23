import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, List, Divider, Spin } from 'antd';
import settings from '@gqlapp/config';
import PageLayout from './PageLayout';

// import ListingItemComponent from './ListingItemComponent';
import UserDisplayDetailComponent from './UserDisplayDetailComponent';
// import ProfileComponenet from './ProfileComponenet';
// import ProfileMenuItem from './ProfileMenuItem';
// import UserDisplayComponent from './UserDisplayComponent';
// import HomeSlick from './HomeSlick';
// import CategoryIconSlick from './CategoryIconSlick';
import CategorySlick from './CategorySlick';
// import Cakes from '../Icons/cakes.svg';
// import MenuBar from './MenuBar';
import RelatedCardComponent from './ListingItemComponent';

const Profile = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  /* Black */

  color: #222222;
`;
const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    link={[{ href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap', rel: 'stylesheet' }]}
  />
);

const BakerView = props => {
  const { loading, listings, t, users, user, homeSlick, categorySlick, profileList, history } = props;

  return (
    <PageLayout history={history}>
      {renderMetaData(t)}
      <UserDisplayDetailComponent history={history} user={user} />
      <CategorySlick data={categorySlick} />
      <div style={{ height: '36px', width: '100%' }} />
      {listings && (
        <List
          grid={{
            gutter: 24,
            xxs: 1,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 6
          }}
          dataSource={listings}
          renderItem={item => (
            <List.Item key={item.id}>
              <RelatedCardComponent key={item.id} listing={item} />
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  );
};

BakerView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  listings: PropTypes.object
};

export default BakerView;

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
