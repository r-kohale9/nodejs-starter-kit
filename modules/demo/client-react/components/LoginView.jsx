import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Card, CardGroup, CardTitle, CardText, Button } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import LoginForm from './LoginForm';
import PageLayout from './PageLayout';
import { PgTitle } from './StyledComponents';

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
          <PgTitle>Login</PgTitle>
          <div style={{ padding: '16px', marginTop: '30px' }}>
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
