/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Row, Col, Button, Result } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import { default as HOME_ROUTES } from '@gqlapp/home-client-react/routes';
import { default as USER_ROUTES } from '@gqlapp/user-client-react/routes';

const LOGOUT_PAGE_GIF =
  'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1601824605/cwy15kfennovwu6j4noe.webp';

const LogoutPageView = props => {
  const { history } = props;
  return (
    <PageLayout>
      <div align="center">
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>
        <Result
          icon={
            <Row type="flex">
              <Col xs={0} sm={0} md={24} lg={24} align="center">
                <img src={LOGOUT_PAGE_GIF} height="200px" />
              </Col>
              <Col span={24} md={0} lg={0} align="center">
                <img src={LOGOUT_PAGE_GIF} height="100px" />
              </Col>
            </Row>
          }
          title={
            <>
              <Row justify="center">
                <Col lg={24} md={24} sm={24} xs={0}>
                  Successfully Logged Out
                </Col>
                <Col lg={0} md={0} xs={24}>
                  Successfully
                </Col>
                <Col lg={0} md={0} xs={24}>
                  Logged Out
                </Col>
              </Row>
            </>
          }
          subTitle="Hey awesome manager, it was a pleasure having you here. And see you again soon! Go to HomeSignIn"
          extra={
            <>
              {/* <Row justify="center" type="flex"> */}
              <div
                style={{
                  // display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Col lg={{ offset: 10, span: 4 }} md={{ offset: 10, span: 6 }} sm={{ offset: 10, span: 6 }} xs={24}>
                  <Button type="primary" block={true} key="console" onClick={() => history.push(`${HOME_ROUTES.home}`)}>
                    <HomeOutlined /> Go To Home
                  </Button>
                </Col>
                <Col lg={{ offset: 10, span: 4 }} md={{ offset: 10, span: 6 }} sm={{ offset: 10, span: 6 }} xs={24}>
                  <div style={{ width: '100%' }}>
                    <Button
                      key="signIn"
                      block={true}
                      style={{ marginTop: '10px' }}
                      onClick={() => history.push(`${USER_ROUTES.login}`)}
                    >
                      <LoginOutlined />
                      SignIn
                    </Button>
                  </div>
                </Col>
              </div>
            </>
          }
        />
      </div>
    </PageLayout>
  );
};

LogoutPageView.propTypes = {
  history: PropTypes.object
};

export default LogoutPageView;
