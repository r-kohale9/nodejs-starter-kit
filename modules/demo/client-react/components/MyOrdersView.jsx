import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';

import PageLayout from './PageLayout';
// import OrderStatusSlick from './slickcomponents/OrderStatusSlick';
import OrderItemComponent from './OrderItemComponent';

const StatusActvBtn = styled(Button)`
  background: #222222;
  border-radius: 29px;
`;

const StatusNtActvBtn = styled(Button)`
  background: #222222;
  border-radius: 29px;
`;

const MyOrdersView = props => {
  const { orders, history, t, orderStatusSlick } = props;
  const [status, setStatus] = useState('Delivered');

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('forgotPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('forgotPass.meta')}`
        }
      ]}
    />
  );

  console.log('props', props);
  return (
    <PageLayout history={history}>
      {renderMetaData()}
      <h1>My orders</h1>
      <Row type="flex" justify="space-between" align="center">
        {/* {orderStatusSlick &&
          orderStatusSlick.length !== 0 &&
          orderStatusSlick.map((ordStat, index) => (
            <Col span={24 / orderStatusSlick && orderStatusSlick.length}>
              {status === ordStat ? (
                <StatusActvBtn block>{ordStat}</StatusActvBtn>
              ) : (
                <StatusNtActvBtn block type="link" onclick={() => setStatus(ordStat)}>
                  {ordStat}
                </StatusNtActvBtn>
              )}
            </Col>
          ))} */}
        <Col span={8}>
          {status === 'Delivered' ? (
            <StatusActvBtn block>Delivered</StatusActvBtn>
          ) : (
            <StatusNtActvBtn block type="link" onclick={() => setStatus('Delivered')}>
              Delivered
            </StatusNtActvBtn>
          )}
        </Col>
        <Col span={8}>
          {status === 'Processing' ? (
            <StatusActvBtn block>Processing</StatusActvBtn>
          ) : (
            <StatusNtActvBtn block type="link" onclick={() => setStatus('Processing')}>
              Processing
            </StatusNtActvBtn>
          )}
        </Col>
        <Col span={8}>
          {status === 'Cancelled' ? (
            <StatusActvBtn block>Cancelled</StatusActvBtn>
          ) : (
            <StatusNtActvBtn block type="link" onclick={() => setStatus('Cancelled')}>
              Cancelled
            </StatusNtActvBtn>
          )}
        </Col>
      </Row>
      {console.log('status', status)}
      {/* <OrderStatusSlick data={orderStatusSlick} /> */}
      {orders &&
        orders.map(order => {
          return <OrderItemComponent order={order} history={history} />;
        })}
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  orders: PropTypes.array,
  orderStatusSlick: PropTypes.array,
  history: PropTypes.object
};

export default MyOrdersView;
