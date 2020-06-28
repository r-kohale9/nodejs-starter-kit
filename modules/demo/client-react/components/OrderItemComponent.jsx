import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PropTypes } from 'prop-types';

import { Text, StatusText } from './StyledComponents';

const OrderItemComponent = props => {
  const { order, history } = props;
  return (
    <Card
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 24px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
        marginBottom: '24px',
        borderWidth: '0px'
      }}
      hoverable
      bodyStyle={{
        padding: '20px 18px 20px 14px'
      }}
    >
      <Row type="flex" justify="space-between" align="middle" gutter={[0, 8]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row type="flex" justify="start" style={{ padding: '5px 0px 0px 5px' }}>
                <h3>
                  <strong>Order &#8470; {order.id}</strong>
                </h3>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end" style={{ padding: '8px 0px 0px 0px' }}>
                <Text>{order.date}</Text>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <p style={{ display: 'flex' }}>
            <Text>Tracking number:</Text>
            <h3>{order.trackingNumber}</h3>
          </p>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row type="flex" justify="start">
                <p style={{ display: 'flex' }}>
                  <Text>Quantity:</Text>
                  <h3>
                    <strong>{order.quantity}</strong>
                  </h3>
                </p>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <p style={{ display: 'flex' }}>
                  <Text>Total Amount:</Text>
                  <h3>
                    <strong>{order.totalAmount}</strong>
                  </h3>
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={12}>
              <Row type="flex" justify=", Buttonstart" align="middle">
                <Button type="tertiary" onClick={() => history.push(`/demo/order-details/${order.id}`)}>
                  Details
                </Button>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end" align="middle">
                <StatusText status={order.status}>{order.status}</StatusText>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

OrderItemComponent.propTypes = {
  order: PropTypes.object,
  history: PropTypes.object
};

export default OrderItemComponent;
