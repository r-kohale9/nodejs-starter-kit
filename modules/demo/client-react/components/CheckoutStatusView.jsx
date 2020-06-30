import React from 'react';
import { Row, Col, Button } from 'antd';

import { PropTypes } from 'prop-types';
import Bags from '../Icons/bags.svg';
import PageLayout from './PageLayout';

import { PgTitle } from './StyledComponents';

const CheckoutStatusView = props => {
  const { history } = props;
  return (
    <PageLayout history={history} showMobNav={false} showMenuBar={false}>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <Row type="flex" justify="center">
            <img alt="" src={Bags} />
          </Row>
        </Col>
        <Col span={24} style={{ paddingTop: '50px' }}>
          <Row type="flex" justify="center">
            <PgTitle>Success!</PgTitle>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={16}>
              <strong>Your order will be delivered soon. Thank you for choosing HomeBakers!</strong>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {/* <div style={{ padding: '24px 0px 50px 0px' }}> */}
          {/* </div> */}
        </Col>
      </Row>
      <Row type="flex" align="bottom" style={{ height: '55vw' }}>
        <Button type="primary" size="large" block onClick={() => history.push('/demo/home')}>
          CONTINUE SHOPPING
        </Button>
      </Row>
    </PageLayout>
  );
};

CheckoutStatusView.propTypes = {
  history: PropTypes.object
};

export default CheckoutStatusView;
