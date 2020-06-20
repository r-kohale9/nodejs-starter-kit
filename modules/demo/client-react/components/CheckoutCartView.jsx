import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { PropTypes } from 'prop-types';

import CartItemComponent from './CartItemComponent';
import PromoCodeForm from './PromoCodeForm';
import PageLayout from './PageLayout';

const totalAmount = orderDetails => {
  let price = 0;
  orderDetails.map(item => {
    price = price + item.price * item.units;
  });
  return price;
};

const Text = styled.span`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding-right: 10px;

  display: flex;
  align-items: center;
  text-align: right;

  /* Gray */
  color: #9b9b9b;
`;

const Checkoutbtn = styled(Button)`
  height: 48px;
  box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
  border-radius: 25px;
`;

const CheckoutCartView = props => {
  const { getCart, history, promocodes } = props;

  return (
    <PageLayout history={history} showMenuBar={true}>
      <h1>My Cart</h1>
      {getCart &&
        getCart.orderDetails &&
        getCart.orderDetails.length !== 0 &&
        getCart.orderDetails.map(item => <CartItemComponent item={item} />)}
      <Col span={24}>
        <PromoCodeForm promocodes={promocodes} />
      </Col>
      <Col span={24}>
        <Row type="flex" align="middle" justify="center">
          <Col span={10}>
            <Text>Total Amount:</Text>
          </Col>
          <Col span={14}>
            <Row type="flex" align="end">
              Rs. {totalAmount(getCart.orderDetails)}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <div style={{ padding: '24px 0px 50px 0px' }}>
          <Checkoutbtn type="danger" block onClick={() => history.push('/demo/checkout-order')}>
            CHECK OUT
          </Checkoutbtn>
        </div>
      </Col>
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  getCart: PropTypes.object,
  history: PropTypes.object
};

export default CheckoutCartView;
