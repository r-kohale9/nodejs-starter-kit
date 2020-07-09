import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import DELETE_ADDRESS from '@gqlapp/addresses-client-react/graphql/DeleteAddress.graphql';
import AddressView from '../components/AddressView';

import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';

// import { useAddressWithSubscription } from './withSubscriptions';
// import { withAddress, withAddressDeleting, updateAddressState, withToogleReviewActive } from './ReviewOperations';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const Address = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  // const reviewsUpdated = useAddressWithSubscription(subscribeToMore, filter);

  // useEffect(() => {
  //   if (reviewsUpdated) {
  //     updateAddressState(reviewsUpdated, updateQuery);
  //   }
  // });
  console.log('props', props);
  return <AddressView {...props} />;
};

Address.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(
  graphql(ADDRESSES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, addresses, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.addresses.totalCount;
            const newEdges = fetchMoreResult.addresses.edges;
            const pageInfo = fetchMoreResult.addresses.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.addresses.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              addresses: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Address'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, addresses, subscribeToMore, loadData, updateQuery };
    }
  }),
  graphql(DELETE_ADDRESS, {
    props: ({ mutate }) => ({
      deleteAddress: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteAddress: {
              id,
              __typename: 'Addresses'
            }
          }
          // ,

          // update: store => {
          //   // Get previous events from cache
          //   const prevEvents = store.readQuery({ query: EVENTS_QUERY });
          //   // Write events to cache

          //   store.writeQuery({
          //     query: EVENTS_QUERY,
          //     data: { events: prevEvents.events.filter(event => event.id !== id), __typename: 'Events' }
          //   });
          // }
        });
        message.warning('Address deleted.');
      }
    })
  }),
  translate('demo')
)(Address);
