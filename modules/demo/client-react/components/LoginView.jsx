import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Card, CardGroup, CardTitle, CardText, Button } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import LoginForm from './LoginForm';
import PageLayout from './PageLayout';

const Login = styled.div`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;
  padding-bottom: 58px;
  color: #222222;
`;

const LoginView = ({ onSubmit, t, isRegistered, hideModal }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('login.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('login.meta')}`
        }
      ]}
      link={[
        {
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap',
          rel: 'stylesheet'
        }
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: 'center' }}>
        <CardTitle>{t('reg.successRegTitle')}</CardTitle>
        <CardText>{t('reg.successRegBody')}</CardText>
        <CardText>
          <Button style={{ minWidth: '320px' }} color="primary" onClick={hideModal}>
            {t('login.form.btnSubmit')}
          </Button>
        </CardText>
      </CardGroup>
    </Card>
  );

  const renderContent = () => (
    <>
      {isRegistered ? (
        renderConfirmationModal()
      ) : (
        <PageLayout showMobNav={true}>
          <div style={{ padding: '16px' }}>
            <Login>Login</Login>
            <LoginForm onSubmit={onSubmit} t={t} />
          </div>
        </PageLayout>
      )}
    </>
  );

  return (
    <>
      {renderMetaData()}
      {renderContent()}
    </>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
  isRegistered: PropTypes.bool,
  hideModal: PropTypes.func
};

export default LoginView;
