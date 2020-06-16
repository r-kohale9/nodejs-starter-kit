import React from 'react';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import OrderStatusSlick from './slickcomponents/OrderStatusSlick';
import OrderItemComponent from './OrderItemComponent';

const MyOrdersView = props => {
  const { orders, history, orderStatusSlick } = props;
  console.log('props', props);
  return (
    <PageLayout history={history}>
      <h1>My orders</h1>
      <OrderStatusSlick data={orderStatusSlick} />
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
