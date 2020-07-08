import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import PromoCodesListComponent from './PromoCodesListComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const PromoCodesView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <Helmet
        title={`${settings.app.name} - ${t('demo.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('demo.meta')}`
          }
        ]}
      />
      <h2>{t('demo.subTitle')}</h2>
      <Link to="/new/promocode">
        <Button color="primary">{t('demo.btn.add')}</Button>
      </Link>
      {/* <hr />
      <PromoCodesFilterComponent {...props} /> */}
      <hr />
      <PromoCodesListComponent {...props} />
    </PageLayout>
  );
};

export default PromoCodesView;
