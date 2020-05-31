import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, Card, CardTitle, Icon } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ForgotPasswordForm from './ForgotPasswordForm';

const LeftAction = styled.div`
  /* Left Action */
  /* position: absolute; */
  height: 44px;
  /* left: 0%; */
  /* right: 0%; */
  /* top: 44px; */
`;
const Login = styled.div`
  width: 283px;
  height: 40px;

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  margin-bottom: 40px;

  /* Black */

  color: #222222;
`;

const BackIcon = styled.div`
  /*icon */

  position: relative;
  width: 24px;
  height: 24px;
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
    />
  );

  return (
    <div style={{ margin: '20px' }}>
      {renderMetaData()}
      <LeftAction>
        <BackIcon>
          <Icon type="left" />
        </BackIcon>
      </LeftAction>
      <Login>Forgot Password</Login>
      <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
    </div>
  );
};

ForgotPasswordView.propTypes = {
  onSubmit: PropTypes.func,
  forgotPassword: PropTypes.func,
  sent: PropTypes.bool,
  t: PropTypes.func
};

export default ForgotPasswordView;
