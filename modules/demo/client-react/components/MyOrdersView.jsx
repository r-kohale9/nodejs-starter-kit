import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button, Empty, Spin } from 'antd';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import OrderItemComponent from './OrderItemComponent';
import SuggestedListComponent from './SuggestedListComponent';

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

const MyOrdersView = props => {
  const { userOrders, loading, history, orderStatusSlick, onStateChange } = props;
  const [status, setStatus] = useState('Delivered');
  const handleFilterChange = stat => {
    onStateChange(stat);
    setStatus(stat);
  };
  const renderFunc = (key, item) => (
    <OrderItemComponent key={key} order={item} detailRoute={e => history.push(`/demo/order-details/${e}`)} />
  );
  const RenderOrders = () => (
    <div>
      <SuggestedListComponent items={userOrders} {...props} renderFunc={renderFunc} />
    </div>
  );
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="PROFILE">
      {/* {renderMetaData(t)} */}
      <PgTitle>My orders</PgTitle>
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
                  <StatusNtActvBtn block type="link" onClick={() => handleFilterChange(ordStat)}>
                    {ordStat}
                  </StatusNtActvBtn>
                )}
              </Col>
            ))}
        </Row>
      </div>
      {/* {userOrders && userOrders.totalCount ? <RenderOrders /> : !loading ? <Spin /> : null} */}

      {loading ? (
        <div align="center">
          <Spin />
        </div>
      ) : userOrders && userOrders.totalCount > 0 ? (
        <RenderOrders />
      ) : (
        <Empty />
      )}
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  userOrders: PropTypes.array,
  orderStatusSlick: PropTypes.array,
  history: PropTypes.object
};

export default MyOrdersView;
