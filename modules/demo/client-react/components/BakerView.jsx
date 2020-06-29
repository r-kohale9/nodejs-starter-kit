import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { List } from 'antd';
import settings from '@gqlapp/config';
import PageLayout from './PageLayout';

import UserDisplayDetailComponent from './UserDisplayDetailComponent';
import CategorySlick from './CategorySlick';
import RelatedCardComponent from './ListingItemComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const BakerView = props => {
  const { listings, t, user, categorySlick, history } = props;

  return (
    <PageLayout history={history} showMobNav={false} showMenuBar={true}>
      {renderMetaData(t)}
      <UserDisplayDetailComponent history={history} user={user} />
      <div style={{ margin: '35px 0px 27px 0px' }}>
        <CategorySlick data={categorySlick} />
      </div>
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
  listings: PropTypes.object,
  user: PropTypes.object,
  categorySlick: PropTypes.array
};

export default BakerView;

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
