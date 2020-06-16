import React from 'react';
import { Row, Col, Button } from 'antd';
import { PropTypes } from 'prop-types';

import AddPaymentOpt from './AddPaymentOpt';

import PageLayout from './PageLayout';
import RenderPaymentCards from './RenderPaymentCards';

const PaymentMethodsView = props => {
  const { paymentOpts, history } = props;
  return (
    <PageLayout history={history}>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <h2>Your payment cards</h2>
        </Col>
        <Col span={24}>
          <RenderPaymentCards paymentOpts={paymentOpts} />
        </Col>
        <div style={{ padding: '2px 0px 100px 0px', width: '100%' }}>
          <Col span={24}>
            <Row type="flex" justify="end">
              <AddPaymentOpt />
            </Row>
          </Col>
        </div>
      </Row>
    </PageLayout>
  );
};

PaymentMethodsView.propTypes = {
  paymentOpts: PropTypes.array,
  history: PropTypes.object
};

export default PaymentMethodsView;
