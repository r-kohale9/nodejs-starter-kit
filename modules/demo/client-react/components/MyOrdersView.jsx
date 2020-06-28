import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button, List } from 'antd';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import OrderItemComponent from './OrderItemComponent';

import { PgTitle } from './StyledComponents';

const StatusNtActvBtn = styled(Button)`
  color: #222;
  & :hover {
    color: white;
    border-radius: 24px;
    background-color: #222222;
    border: 1px solid #222222;
  }
`;

const MyOrdersView = props => {
  const { orders, history, orderStatusSlick } = props;
  const [status, setStatus] = useState('Delivered');

  console.log('props', props);
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="PROFILE">
      {/* {renderMetaData(t)} */}
      <PgTitle>My orders</PgTitle>
      <div style={{ marginTop: '24px', marginBottom: '30px', maxWidth: '300px' }}>
        <Row type="flex" justify="space-between" align="center">
          {orderStatusSlick &&
            orderStatusSlick.length !== 0 &&
            orderStatusSlick.map((ordStat, index) => (
              <Col key={index} span={24 / orderStatusSlick && orderStatusSlick.length}>
                {status === ordStat ? (
                  <Button type="black" block>
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
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3
        }}
        dataSource={orders && orders.filter(ord => ord.status === status)}
        renderItem={item => (
          <List.Item>
            <OrderItemComponent order={item} history={history} />
          </List.Item>
        )}
      />
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  orders: PropTypes.array,
  orderStatusSlick: PropTypes.array,
  history: PropTypes.object
};

export default MyOrdersView;
