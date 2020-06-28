import React from 'react';
import { List, Button, Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import OrderDetailsItemComponent from './OrderDetailsItemComponent';

import { Text, StatusText } from './StyledComponents';

// const ReorderBtn = styled(Button)`
//   border: 1px solid #222222;
//   box-sizing: border-box;
//   border-radius: 24px;
// `;

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
    <PageLayout history={history} title="Order Details" showMenuBar={true} selectedTab="PROFILE">
      <Row type="flex" justify="center" align="middle" gutter={[0, 8]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row type="flex" justify="start">
                <h3>
                  <strong>Order &#8470; {order.id}</strong>
                </h3>
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
            <Col span={18}>
              <p style={{ display: '-webkit-box' }}>
                <Text>Tracking number:</Text> {order.trackingNumber}
              </p>
            </Col>
            <Col span={6}>
              <Row type="flex" justify="end" align="middle">
                <StatusText status={order.status}>{order.status}</StatusText>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>{order.quantity} items</Col>
        <Col span={24}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3
            }}
            dataSource={order && order.orderDetails && order.orderDetails.length !== 0 && order.orderDetails}
            renderItem={item => (
              <List.Item>
                <OrderDetailsItemComponent item={item} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={24}>
          <b>Order information</b>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Shipping address:</Text>
            </Col>
            <Col span={14}>
              <b>
                <p>
                  {`${order.shippingAddresses.streetAddress1}, ${order.shippingAddresses.streetAddress2}, ${order.shippingAddresses.city}, ${order.shippingAddresses.state}, ${order.shippingAddresses.pinCode}`}
                </p>
              </b>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Payment method:</Text>
            </Col>
            <Col span={14}>
              <b>{order.paymentMethod}</b>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Delivery method:</Text>
            </Col>
            <Col span={14}>
              <b>{order.deliveryMethod}</b>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Discount:</Text>
            </Col>
            <Col span={14}>
              <b>{order.discount}</b>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <Text>Total Amount:</Text>
            </Col>
            <Col span={14}>
              <b>{totalAmount(order.orderDetails)}</b>
            </Col>
          </Row>
        </Col>
        <div style={{ padding: '24px 0px 50px 0px', width: '100%' }}>
          <Col span={24}>
            <Row type="flex" justify="center" gutter={16}>
              <Col span={12}>
                <Button type="tertiary" block>
                  Reorder
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block>
                  Leave Feedback
                </Button>
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
