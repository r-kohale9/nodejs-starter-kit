import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';

// Query
import ORDERS_QUERY from '../graphql/OrdersQuery.graphql';

// Filter
import UPDATE_ORDERS_FILTER from '../graphql/UpdateOrdersFilter.client.graphql';
import ORDERS_STATE_QUERY from '../graphql/OrdersStateQuery.client.graphql';
import UPDATE_ORDERS_ORDER_BY from '../graphql/UpdateOrdersOrderBy.client.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server' ? settings.pagination.web.itemsNumber : settings.pagination.mobile.itemsNumber;

const withOrders = Component =>
  graphql(ORDERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only',
      };
    },
    props: ({ data }) => {
      const { loading, error, orders, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.orders.totalCount;
            const newEdges = fetchMoreResult.orders.edges;
            const pageInfo = fetchMoreResult.orders.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.orders.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              orders: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Orders',
              },
            };
          },
        });
      };
      if (error) throw new Error(error);
      return { loading, orders, subscribeToMore, loadData, updateQuery };
    },
  })(Component);

// Filter
const withOrdersStateQuery = Component =>
  graphql(ORDERS_STATE_QUERY, {
    props({ data: { ordersState } }) {
      return removeTypename(ordersState);
    },
  })(Component);

const withUpdateOrdersFilter = Component =>
  graphql(UPDATE_ORDERS_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onUsernameChange(username) {
        mutate({ variables: { filter: { username } } });
      },
      onStateChange(state) {
        mutate({ variables: { filter: { state } } });
      },
    }),
  })(Component);

const withOrdersOrderByUpdating = Component =>
  graphql(UPDATE_ORDERS_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrdersOrderBy: orderBy => {
        console.log('orderBy', orderBy);
        mutate({ variables: { orderBy } });
      },
    }),
  })(Component);

export {
  withOrders,
  //Filter,
  withOrdersStateQuery,
  withUpdateOrdersFilter,
  withOrdersOrderByUpdating,
};
