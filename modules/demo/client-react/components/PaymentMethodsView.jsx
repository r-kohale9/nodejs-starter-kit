import React from 'react';
import { Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import AddPaymentOpt from './AddPaymentOpt';

import PageLayout from './PageLayout';
import RenderPaymentCards from './RenderPaymentCards';

const PaymentMethodsView = props => {
  const { loading, paymentOpts, history, onSubmit, toggleDefaultPaymentOpt } = props;
  return (
    <PageLayout history={history} title="Payment methods">
      <Row type="flex" justify="center" align="middle">
        <Col span={24}>
          <h3>
            <strong>Your payment cards</strong>
          </h3>
        </Col>
        <Col span={24}>
          {!loading && paymentOpts && paymentOpts.length > 0 && (
            <RenderPaymentCards paymentOpts={paymentOpts} toggleDefaultPaymentOpt={toggleDefaultPaymentOpt} />
          )}
        </Col>
        <div style={{ padding: '2px 0px 100px 0px', width: '100%' }}>
          <Col span={24}>
            <Row type="flex" justify="end">
              <AddPaymentOpt onSubmit={onSubmit} />
            </Row>
          </Col>
        </div>
      </Row>
    </PageLayout>
  );
};

PaymentMethodsView.propTypes = {
  paymentOpts: PropTypes.array,
  history: PropTypes.object,
  onSubmit: PropTypes.func
};

export default PaymentMethodsView;
