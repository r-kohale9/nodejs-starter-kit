import React from 'react';
import { PLATFORM, compose, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import { translate } from '@gqlapp/i18n-client-react';

import UPDATE_ORDERS_FILTER from '@gqlapp/order-client-react/graphql/UpdateOrdersFilter.client.graphql';
import ORDERS_STATE_QUERY from '@gqlapp/order-client-react/graphql/OrdersStateQuery.client.graphql';
import MY_DELIVERIES_QUERY from '../graphql/MyDeliveriesQuery.graphql';

import MyDeliveriesView from '../components/MyDeliveriesView';
import { ORDER_STATUS } from './Constants';
import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const MyDeliveries = props => {
  console.log('props', props);
  return <MyDeliveriesView {...props} orderStatusSlick={ORDER_STATUS} />;
};

export default compose(
  graphql(ORDERS_STATE_QUERY, {
    props({ data: { ordersState } }) {
      return removeTypename(ordersState);
    }
  }),
  graphql(UPDATE_ORDERS_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onStateChange(state) {
        // console.log('state', state);
        mutate({ variables: { filter: { state } } });
      }
    })
  }),
  graphql(MY_DELIVERIES_QUERY, {
    options: ({ orderBy, filter, currentUser }) => {
      return {
        variables: {
          userId: currentUser && currentUser.id,
          limit: limit,
          after: 0,
          orderBy,
          filter: filter.state === '' ? { state: 'Delivered' } : filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, userDeliveries, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userDeliveries.totalCount;
            const newEdges = fetchMoreResult.userDeliveries.edges;
            const pageInfo = fetchMoreResult.userDeliveries.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.userDeliveries.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              userDeliveries: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        userDeliveries,
        subscribeToMore,
        loadData,
        updateQuery
      };
    }
  }),
  translate('demo')
)(MyDeliveries);
