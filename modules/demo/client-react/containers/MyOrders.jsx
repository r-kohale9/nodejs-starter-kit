import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { removeTypename, PLATFORM, compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import MY_ORDERS_QUERY from '@gqlapp/order-client-react/graphql/MyOrdersQuery.graphql';
// import ORDERS_SUBSCRIPTION from '@gqlapp/order-client-react/graphql/OrdersSubscription.graphql';
import UPDATE_ORDER_FILTER from '@gqlapp/order-client-react/graphql/UpdateOrderFilter.client.graphql';
import ORDERS_STATE_QUERY from '@gqlapp/order-client-react/graphql/OrdersStateQuery.client.graphql';

import MyOrdersView from '../components/MyOrdersView';
import { ORDER_STATUS } from './Constants';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const MyOrders = props => {
  // useEffect(() => {
  //   const subscribe = subscribeToOrders(props.subscribeToMore);
  //   props.refetch();
  //   return () => subscribe();
  // });
  console.log('props', props);
  return <MyOrdersView {...props} orderStatusSlick={ORDER_STATUS} />;
};

// const onAddOrder = (prev, node) => {
//   console.log('subscription add', prev, node);
//   // ignore if duplicate
//   // if (prev.blogs.some(item => node.id === item.id)) {
//   //   return prev;
//   // }
//   return update(prev, {
//     userOrders: {
//       $push: [node]
//     }
//   });
// };

// const onDeleteOrder = (prev, node) => {
//   console.log('subscription deleted');

//   // ignore if not found
//   if (prev.id !== node.id) {
//     return prev;
//   }

//   return update(prev, {
//     getCart: {
//       $set: node
//     }
//   });
// };

// const subscribeToOrders = subscribeToMore =>
//   subscribeToMore({
//     document: ORDERS_SUBSCRIPTION,
//     updateQuery: (
//       prev,
//       {
//         subscriptionData: {
//           data: {
//             ordersUpdated: { mutation, node }
//           }
//         }
//       }
//     ) => {
//       console.log('subscribed');
//       let newResult = prev;
//       if (mutation === 'CREATED') {
//         newResult = onAddOrder(prev, node);
//       } else if (mutation === 'UPDATED') {
//         newResult = onAddOrder(prev, node);
//       } else if (mutation === 'DELETED') {
//         newResult = onDeleteOrder(prev, node);
//       }
//       return newResult;
//     }
//   });

MyOrders.propTypes = {
  subscribeToMore: PropTypes.func,
  updateQuery: PropTypes.func,
  refetch: PropTypes.func
};

export default compose(
  graphql(ORDERS_STATE_QUERY, {
    props({ data: { ordersState } }) {
      return removeTypename(ordersState);
    }
  }),
  graphql(UPDATE_ORDER_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onStateChange(state) {
        mutate({ variables: { filter: { state } } });
      }
    })
  }),
  graphql(MY_ORDERS_QUERY, {
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
      const { loading, error, userOrders, fetchMore, subscribeToMore, updateQuery, refetch } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userOrders.totalCount;
            const newEdges = fetchMoreResult.userOrders.edges;
            const pageInfo = fetchMoreResult.userOrders.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.userOrders.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              userOrders: {
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
        userOrders,
        subscribeToMore,
        loadData,
        updateQuery,
        refetch
      };
    }
  }),
  translate('demo')
)(MyOrders);
