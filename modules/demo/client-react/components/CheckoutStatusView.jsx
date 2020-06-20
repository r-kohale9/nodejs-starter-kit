import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';

import { PropTypes } from 'prop-types';
import Bags from '../Icons/bags.svg';
import PageLayout from './PageLayout';

const Checkoutbtn = styled(Button)`
  height: 48px;
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
`;

const CheckoutStatusView = props => {
  const { history } = props;
  return (
    <PageLayout history={history} showMenuBar={false}>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <Row type="flex" justify="center">
            <img alt="" src={Bags} />
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <h1>Success!</h1>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={16}>Your order will be delivered soon. Thank you for choosing HomeBakers!</Col>
          </Row>
        </Col>
        <Col span={24}>
          {/* <div style={{ padding: '24px 0px 50px 0px' }}> */}
          {/* </div> */}
        </Col>
      </Row>
      <Row type="flex" align="bottom" style={{ height: '55vw' }}>
        <Checkoutbtn type="danger" block onClick={() => history.push('/demo/checkout-status')}>
          CONTINUE SHOPPING
        </Checkoutbtn>
      </Row>
    </PageLayout>
  );
};

CheckoutStatusView.propTypes = {
  history: PropTypes.object
};

export default CheckoutStatusView;
