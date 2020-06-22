import React from 'react';
import styled from 'styled-components';
import { Card, Button, Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import OrderDetailsItemComponent from './OrderDetailsItemComponent';
import PageLayout from './PageLayout';

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

const BoldText = styled.div`
  font-family: Metropolis;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  display: flex;
  align-items: center;
  text-align: center;

  /* Black */

  color: #222222;
`;

const StatusText = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  display: flex;
  align-items: center;
  text-align: center;

  /* Success */

  color: ${props => props.status === 'Delivered' && '#2aa952'};
  color: ${props => props.status === 'Processing' && '#F79E1B'};
  color: ${props => props.status === 'Cancelled' && 'red'};
`;

const ReorderBtn = styled(Button)`
  border: 1px solid #222222;
  box-sizing: border-box;
  border-radius: 24px;
`;

const FeedbackBtn = styled(Button)`
  /* background: #fc4c4c; */
  box-shadow: 0px 4px 8px rgba(252, 76, 76, 0.25);
  border-radius: 25px;
`;

const totalAmount = orderDetails => {
  let price = 0;
  orderDetails.map(item => {
    price = price + item.price * item.units;
  });
  return price;
};

const OrderDetailsView = props => {
  const { order, history } = props;
  console.log('props', props);
  return (
    <PageLayout history={history} title="Order Details">
      <Row type="flex" justify="space-between" align="middle" gutter={[0, 8]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row type="flex" justify="start">
                <BoldText>Order &#8470; {order.id}</BoldText>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <Text>{order.date}</Text>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={16}>
              <p style={{ display: '-webkit-box' }}>
                <Text>Tracking number:</Text> {order.trackingNumber}
              </p>
            </Col>
            <Col span={8}>
              <Row type="flex" justify="end" align="middle">
                <StatusText status={order.status}>{order.status}</StatusText>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>{order.quantity} items</Col>
        <Col span={24}>
          {order &&
            order.orderDetails &&
            order.orderDetails.length !== 0 &&
            order.orderDetails.map(item => {
              return <OrderDetailsItemComponent item={item} />;
            })}
        </Col>
        Order information
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Shipping address:</Text>
            </Col>
            <Col span={14}>
              <p>
                {`${order.shippingAddresses.streetAddress1}, ${order.shippingAddresses.streetAddress2}, ${order.shippingAddresses.city}, ${order.shippingAddresses.state}, ${order.shippingAddresses.pinCode}`}
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Payment method:</Text>
            </Col>
            <Col span={14}>{order.paymentMethod}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Delivery method:</Text>
            </Col>
            <Col span={14}>{order.deliveryMethod}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Discount:</Text>
            </Col>
            <Col span={14}>{order.discount}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Total Amount:</Text>
            </Col>
            <Col span={14}>{totalAmount(order.orderDetails)}</Col>
          </Row>
        </Col>
        <div style={{ padding: '24px 0px 50px 0px', width: '100%' }}>
          <Col span={24}>
            <Row type="flex" justify="center" gutter={16}>
              <Col span={12}>
                <ReorderBtn block>Reorder</ReorderBtn>
              </Col>
              <Col span={12}>
                <FeedbackBtn type="danger" block>
                  Leave Feedback
                </FeedbackBtn>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </PageLayout>
  );
};

OrderDetailsView.propTypes = {
  order: PropTypes.array,
  history: PropTypes.object
};

export default OrderDetailsView;
