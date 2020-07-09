import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import PaymentOptFormComponent from './PaymentOptFormComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddPaymentOptView = ({ t, loading, addPaymentOpt, currentUser }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <PaymentOptFormComponent
              cardTitle="Add PaymentOpt"
              t={t}
              onSubmit={addPaymentOpt}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddPaymentOptView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addPaymentOpt: PropTypes.func
};

export default AddPaymentOptView;
