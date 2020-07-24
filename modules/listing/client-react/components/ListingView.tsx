import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import ListingFilterComponent from './ListingFilterComponent.web.jsx';
import ListingListComponent from './ListingListComponent.web';

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ListingView = props => {
  const { t } = props;
  const filter = { isActive: true };

  return (
    <PageLayout>
      {renderMetaData(t)}
      <h2>{t('list.subTitle')}</h2>
      <Link to="/new/listing">
        <Button color="primary">{t('list.btn.add')}</Button>
      </Link>
      <hr />
      <ListingFilterComponent {...props} filter={filter} />
      <hr />
      <ListingListComponent {...props} />
    </PageLayout>
  );
};

export default ListingView;
