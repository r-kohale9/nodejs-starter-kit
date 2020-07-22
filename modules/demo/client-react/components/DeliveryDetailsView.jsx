import React from 'react';
import { List, Button, Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import OrderDetailsItemComponent from './OrderDetailsItemComponent';
import { Text, StatusText, Number } from './StyledComponents';

const totalAmount = item => {
  let price = item && item.unit * (item && item.listing && item.listing.listingCost && item.listing.listingCost.cost);
  return price;
};
const DeliveryDetailsView = props => {
  const { history, order, currentUser } = props;
  return (
    <PageLayout history={history} title="Delivery Details" showMenuBar={true} selectedTab="PROFILE">
      {order && (
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
                  <StatusText status={order.state}>{order.state}</StatusText>
                </Row>
              </Col>
            </Row>
          </Col>
          {/* <Col span={24}>{order.orderDetails.length} items</Col> */}
          <Col span={24}>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3
              }}
              dataSource={
                order &&
                order.orderDetails &&
                order.orderDetails.length > 0 &&
                order.orderDetails.filter(oD => oD.listing.userId === currentUser.id)
              }
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
              {order.shippingAddress && (
                <Col span={14}>
                  <b>
                    <p>
                      {`${order.shippingAddress.shippingAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pinCode}`}
                    </p>
                  </b>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" align="middle" justify="center">
              <Col span={10}>
                <Text>Payment method:</Text>
              </Col>
              <Col span={14}>
                {order.paymentMethod && (
                  <Number>{`**** **** **** ${order.paymentMethod.cardNumber.substr(
                    order.paymentMethod.cardNumber.length - 4
                  )}`}</Number>
                )}
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
                <b>{totalAmount(order)}</b>
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
      )}
    </PageLayout>
  );
};

export default DeliveryDetailsView;
