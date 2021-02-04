import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { NO_IMG } from '@gqlapp/listing-common';
import { displayDataCheck, useImageLoaded } from '@gqlapp/listing-client-react';
import { Row, Col, Card, Skeleton } from '@gqlapp/look-client-react';
import { TotalPrice } from './function';
import ROUTES from '../routes';

const Price = styled(Row)`
  height: 100%;
  color: white;
  background-color: #1890ff;
`;
const StatusText = styled.div`
  color: ${props => props.status === 'completed' && '#2aa952'};
  color: ${props => props.status === 'initiated' && '#F79E1B'};
  color: ${props => props.status === 'cancelled' && 'red'};
`;

const OrderItemComponent = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const {
    item,
    t
    // edit,
  } = props;
  const order_img = (item.orderDetails && item.orderDetails[0] && item.orderDetails[0].imageUrl) || NO_IMG;
  return (
    <Link to={`${ROUTES.orderDetailLink}${item.id}`}>
      {!loaded && <OrderItemSkeleton />}
      <Card
        style={{
          marginBottom: '24px',
          display: !loaded && 'none'
        }}
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
      >
        <Row type="flex">
          <Col span={24} align="center" style={{ height: 'fit-content' /* , overflow: 'hidden' */ }}>
            <img
              ref={ref}
              onLoad={onLoad}
              src={order_img}
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col span={18}>
            <div
              style={{
                padding: '10px 15px'
              }}
            >
              <Row>
                <Col span={24}>
                  <h2>
                    {t('orders.orderId')}
                    {item.id}
                  </h2>
                </Col>
                <Col span={12}>
                  <Row type="flex" justify="start">
                    <h3>
                      {t('orders.items')}
                      {item.orderDetails && displayDataCheck(item.orderDetails.length)}
                    </h3>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row type="flex" justify="end">
                    <h4>
                      <StatusText status={item.orderState && item.orderState.state.toLowerCase()}>
                        {item.orderState && displayDataCheck(item.orderState.state)}
                      </StatusText>
                    </h4>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <Price type="flex" justify="center" align="middle">
              <span>
                <strong>
                  &#8377;
                  {TotalPrice(displayDataCheck(item.orderDetails))}
                </strong>
                <br />
                <span>{t('orders.total')}</span>
              </span>
            </Price>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

OrderItemComponent.propTypes = {
  item: PropTypes.object,
  deleteProduct: PropTypes.func,
  t: PropTypes.func
};

export default OrderItemComponent;

const OrderItemSkeleton = props => {
  const { componentStyle } = props;
  return (
    <Card
      align="left"
      style={componentStyle}
      bodyStyle={{ margin: '0px' }}
      hoverable
      cover={
        <div
          style={{
            overflow: 'hidden',
            height: '230px',
            borderRadius: '8px 8px 0px 0px',
            background: 'linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)',
            animation: 'ant-skeleton-loading 1.4s ease infinite'
          }}
          align="center"
        ></div>
      }
    >
      <Row type="flex" gutter={24}>
        <Col span={18}>
          <Skeleton active title={{ width: '80%' }} paragraph={false} />
          <Row type="flex" gutter={24}>
            <Col span={12}>
              <Skeleton active title={{ width: '100%' }} paragraph={false} />
            </Col>
            <Col span={12}>
              <Skeleton active title={{ width: '100%' }} paragraph={false} />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
          <Skeleton active title={{ width: '100%' }} paragraph={false} />
        </Col>
      </Row>
    </Card>
  );
};

OrderItemSkeleton.propTypes = {
  componentStyle: PropTypes.object
};
