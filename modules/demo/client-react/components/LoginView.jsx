// import React from 'react';
import styled from 'styled-components';

// const renderMetaData = t => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

// const LoginView = props => {
//   const { t } = props;
//   return (
//     // <PageLayout>
//     <div style={{ padding: '20px' }}>
//       {renderMetaData(t)}
// <LeftAction>
//   <BackIcon>
//     <Icon type="left" />
//   </BackIcon>
// </LeftAction>
// <Login>Login</Login>
//       <LoginForm {...props} />
//     </div>
//     // </PageLayout>
//   );
// };

// LoginView.propTypes = {
//   t: PropTypes.func
// };

// export default LoginView;
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, Card, CardGroup, CardTitle, CardText, Button, Icon } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import LoginForm from './LoginForm';
// import { PropTypes } from 'prop-types';
// import Helmet from 'react-helmet';
// import { Icon } from 'antd';

// import settings from '@gqlapp/config';
// import PageLayout from './PageLayout';
// import LoginForm from './LoginForm';

const Login = styled.div`
  /* Headline */

  /* position: absolute; */
  width: 93px;
  height: 49px;
  /* left: 14px; */
  /* top: 106px; */

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  /* Black */

  color: #222222;
`;

const LeftAction = styled.div`
  /* Left Action */
  /* position: absolute; */
  height: 44px;
  /* left: 0%; */
  /* right: 0%; */
  /* top: 44px; */
`;

const BackIcon = styled.div`
  /*icon */

  position: relative;
  width: 24px;
  height: 24px;
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
        <div style={{ padding: '16px' }}>
          <LeftAction>
            <BackIcon>
              <Icon type="left" />
            </BackIcon>
          </LeftAction>
          <Login>Login</Login>
          <LoginForm onSubmit={onSubmit} t={t} />
        </div>
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
