import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import {
  withOrdersOrderByUpdating,
  withOrdersStateQuery,
  withUpdateOrdersFilter,
  withOrders
} from './OrdersOperations';

import OrdersListView from '../components/OrdersListView';
import OrdersFilterView from '../components/OrdersFilterView';

const Orders = props => {
  // const { t, updateQuery, subscribeToMore } = props;
  const filter = {};
  // const filter = { isActive: true };
  // const usersUpdated = useOrdersWithSubscription(subscribeToMore, filter);
  // console.log('users', props);
  // useEffect(() => {
  //   if (usersUpdated) {
  //     updateOrdersState(usersUpdated, updateQuery);
  //   }
  // });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${'Orders-Admin'}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${'View and edit Orders'}`
        }
      ]}
    />
  );
  console.log('props', props);
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>Orders</h2>
      {/* <Link to="/users/new">
        <Button color="primary">{t('users.btn.add')}</Button>
      </Link> */}
      <hr />
      <OrdersFilterView {...props} filter={filter} />
      <hr />
      <OrdersListView {...props} />
    </PageLayout>
  );
};

// Orders.propTypes = {
//   usersUpdated: PropTypes.object,
//   updateQuery: PropTypes.func,
//   t: PropTypes.func,
//   subscribeToMore: PropTypes.func,
//   filter: PropTypes.object
// };

export default compose(
  withOrdersStateQuery,
  withOrdersOrderByUpdating,
  withUpdateOrdersFilter,
  withOrders,
  translate('order')
)(Orders);
