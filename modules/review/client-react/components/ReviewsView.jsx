import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ReviewListComponent from './ReviewListComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ReviewView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <Helmet
        title={`${settings.app.name} - ${t('review.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('review.meta')}`
          }
        ]}
      />
      <h2>{t('review.subTitle')}</h2>
      <Link to="/new/review">
        <Button color="primary">{t('review.btn.add')}</Button>
      </Link>
      {/* <hr />
      <ReviewFilterComponent {...props} /> */}
      <hr />
      <ReviewListComponent {...props} />
    </PageLayout>
  );
};

export default ReviewView;
