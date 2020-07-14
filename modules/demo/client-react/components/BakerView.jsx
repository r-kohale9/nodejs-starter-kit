import React, { useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import settings from '@gqlapp/config';
import PageLayout from './PageLayout';

import UserDisplayDetailComponent from './UserDisplayDetailComponent';
import CategorySlick from './CategorySlick';
import RelatedCardComponent from './ListingItemComponent';
import SuggestedListComponent from './SuggestedListComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const BakerView = props => {
  const { listings, loading, t, user, categorySlick, history } = props;
  const [items, setItems] = useState(listings);
  const handleChange = category => {
    setItems(listings.filter(item => item.category === category));
  };
  const renderFunc = (key, item) => <RelatedCardComponent key={item.id} listing={item} />;
  const RenderReviews = () => (
    <div>
      <SuggestedListComponent
        grid={{
          gutter: 24,
          xs: 2,
          sm: 3,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6
        }}
        items={listings}
        {...props}
        renderFunc={renderFunc}
      />
    </div>
  );
  return (
    <PageLayout history={history} showMobNav={false} showMenuBar={true}>
      {renderMetaData(t)}
      <UserDisplayDetailComponent history={history} user={user} />
      <div style={{ margin: '35px 0px 27px 0px' }}>
        <CategorySlick data={categorySlick} setCategory={handleChange} />
      </div>
      <div style={{ height: '36px', width: '100%' }} />
      {console.log('listings', listings && listings.totalCount)}
      {listings && listings.totalCount ? <RenderReviews /> : !loading ? <Spin /> : null}
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
