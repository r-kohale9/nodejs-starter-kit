import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';

import PageLayout from './PageLayout';
import ForgotPasswordForm from './ForgotPasswordForm';
import { PgTitle } from './StyledComponents';

const ForgotPasswordView = ({ onSubmit, t, sent }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('forgotPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('forgotPass.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout showMobNav={true}>
      {renderMetaData()}
      <PgTitle>Forgot Password</PgTitle>
      <div style={{ margin: '16px', marginTop: '80px' }}>
        <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
      </div>
    </PageLayout>
  );
};

ForgotPasswordView.propTypes = {
  onSubmit: PropTypes.func,
  forgotPassword: PropTypes.func,
  sent: PropTypes.bool,
  t: PropTypes.func
};

export default ForgotPasswordView;
