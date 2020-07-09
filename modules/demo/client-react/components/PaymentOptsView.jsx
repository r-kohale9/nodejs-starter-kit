import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import PaymentOptsListComponent from './PaymentOptsListComponent.web';

const PaymentOptsView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {/* <Helmet
        title={`${settings.app.name} - ${t('demo.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('demo.meta')}`
          }
        ]}
      /> */}
      <h2>demo.subTitle</h2>
      <Link to="/new/paymentopts">
        <Button color="primary">demo.btn.add</Button>
      </Link>
      {/* <hr />
      <PaymentOptsFilterComponent {...props} /> */}
      <hr />
      <PaymentOptsListComponent {...props} />
    </PageLayout>
  );
};

export default PaymentOptsView;
