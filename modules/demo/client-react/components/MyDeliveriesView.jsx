import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button, Empty, Spin } from 'antd';
import { PropTypes } from 'prop-types';
import SuggestedListComponent from './SuggestedListComponent';

import PageLayout from './PageLayout';
// import OrderItemComponent from './DeliveriesItemComponent';
import OrderItemComponent from './OrderItemComponent';

import { PgTitle } from './StyledComponents';

const StatusNtActvBtn = styled(Button)`
  color: #222;
  width: fit-content;
  & :hover {
    color: white;
    border-radius: 24px;
    background-color: #222222;
    border: 1px solid #222222;
  }
`;

const MyDeliveriesView = props => {
  const { userDeliveries, history, orderStatusSlick, loading } = props;
  const [status, setStatus] = useState('Delivered');
  const renderFunc = (key, item) => (
    <OrderItemComponent key={key} order={item} detailRoute={e => history.push(`/demo/delivery-details/${e}`)} />
  );
  const RenderDeliveries = () => (
    <div>
      <SuggestedListComponent items={userDeliveries} {...props} renderFunc={renderFunc} />
    </div>
  );
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="PROFILE">
      {/* {renderMetaData(t)} */}
      <PgTitle>My deliveries</PgTitle>
      <div style={{ marginTop: '24px', marginBottom: '30px', maxWidth: '300px' }}>
        <Row type="flex" justify="space-between" align="center">
          {orderStatusSlick &&
            orderStatusSlick.length !== 0 &&
            orderStatusSlick.map((ordStat, index) => (
              <Col key={index} span={24 / (orderStatusSlick && orderStatusSlick.length)}>
                {status === ordStat ? (
                  <Button type="black" block style={{ width: 'fit-content' }}>
                    {ordStat}
                  </Button>
                ) : (
                  <StatusNtActvBtn block type="link" onClick={() => setStatus(ordStat)}>
                    {ordStat}
                  </StatusNtActvBtn>
                )}
              </Col>
            ))}
        </Row>
      </div>
      {loading ? <Spin /> : userDeliveries && userDeliveries.totalCount > 0 ? <RenderDeliveries /> : <Empty />}

      {/* {userDeliveries && (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3
          }}
          dataSource={userDeliveries && userDeliveries.filter(ord => ord.order && ord.order.state === status)}
          renderItem={item => (
            <List.Item>
              <OrderItemComponent order={item.order} item={item} history={history} />
            </List.Item>
          )}
        />
      )} */}
    </PageLayout>
  );
};

MyDeliveriesView.propTypes = {
  userDeliveries: PropTypes.array,
  orderStatusSlick: PropTypes.array,
  history: PropTypes.object
};

export default MyDeliveriesView;
