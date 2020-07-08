import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import PromoCodeFormComponent from './PromoCodeFormComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddPromoCodeView = ({ t, loading, addPromoCode, currentUser }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <PromoCodeFormComponent cardTitle="Add PromoCode" t={t} onSubmit={addPromoCode} currentUser={currentUser} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddPromoCodeView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addPromoCode: PropTypes.func
};

export default AddPromoCodeView;
