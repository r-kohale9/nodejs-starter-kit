import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import AddressListComponent from './AddressListComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const AddressView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <Helmet
        title={`${settings.app.name} - ${t('address.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('address.meta')}`
          }
        ]}
      />
      <h2>{t('address.subTitle')}</h2>
      <Link to="/new/address">
        <Button color="primary">{t('address.btn.add')}</Button>
      </Link>
      {/* <hr />
      <AddressFilterComponent {...props} /> */}
      <hr />
      <AddressListComponent {...props} />
    </PageLayout>
  );
};

export default AddressView;
