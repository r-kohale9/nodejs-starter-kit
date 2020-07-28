import React, { useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Empty } from 'antd';
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
  const { listings, loading, t, baker, filter, categorySlick, history, onCategoryChange } = props;

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
      {baker && <UserDisplayDetailComponent history={history} user={baker} />}
      <div style={{ margin: '35px 0px 27px 0px' }}>
        <CategorySlick data={categorySlick} setCategory={onCategoryChange} filter={filter} />
      </div>
      <div style={{ height: '36px', width: '100%' }} />
      {loading && <Spin />}
      {listings && listings.totalCount > 0 ? <RenderReviews /> : <Empty />}
    </PageLayout>
  );
};

BakerView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  listings: PropTypes.object,
  baker: PropTypes.object,
  categorySlick: PropTypes.array
};

export default BakerView;
