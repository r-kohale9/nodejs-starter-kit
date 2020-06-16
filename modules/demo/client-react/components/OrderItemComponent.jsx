import React from 'react';
import styled from 'styled-components';
import { Card, Button, Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

const DetailsBtn = styled(Button)`
  border: 1px solid #222222;
  box-sizing: border-box;
  border-radius: 24px;
`;

const Text = styled.span`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding-right: 10px;
  /* identical to box height, or 143% */

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
  /* identical to box height */

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

const OrderItemComponent = props => {
  const { order, history } = props;
  return (
    <Card
      style={{
        marginBottom: '24px',
        // width: '164px',
        height: '164px',
        borderWidth: '0px',
        borderRadius: '8px'
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
                <BoldText>Order &#8470; {order.id}</BoldText>
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
            <Text>Tracking number:</Text> {order.trackingNumber}
          </p>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row type="flex" justify="start">
                {' '}
                <p style={{ display: 'flex' }}>
                  <Text>Quantity:</Text> <BoldText>{order.quantity}</BoldText>
                </p>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <p style={{ display: 'flex' }}>
                  <Text>Total Amount:</Text> <BoldText>{order.totalAmount}</BoldText>
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={12}>
              <Row type="flex" justify="start" align="middle">
                <DetailsBtn onClick={() => history.push(`/demo/order-details/${order.id}`)}>Details</DetailsBtn>
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
