import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';

import PageLayout from './PageLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

const Login = styled.div`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 10vw;
  line-height: 13vw;
  margin-bottom: 25vw;
  color: #222222;
`;

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
      link={[{ href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap', rel: 'stylesheet' }]}
    />
  );

  return (
    <PageLayout showMobNav={true}>
      <div style={{ margin: '16px' }}>
        {renderMetaData()}
        <Login>Forgot Password</Login>
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
