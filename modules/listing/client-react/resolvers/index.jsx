import update from 'immutability-helper';

import LISTINGS_STATE_QUERY from '../graphql/ListingsStateQuery.client.graphql';

const TYPE_LISTINGS_STATE = 'ListingsState';
const TYPE_LISTINGS_STATE_FILTER = 'FilterListInput';
const TYPE_LISTINGS_STATE_ORDER_BY = 'OrderByListInput';

const defaults = {
  listingsState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_LISTINGS_STATE_ORDER_BY
    },
    filter: {
      userId: 0,
      searchText: '',

      lowerCost: 0,
      upperCost: 0,

      // isFeatured: false,
      // isNew: false,
      // isDiscount: false,
      isActive: true,

      __typename: TYPE_LISTINGS_STATE_FILTER
    },
    __typename: TYPE_LISTINGS_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderByListing: (_, { orderBy }, { cache }) => {
      console.log('updateOrderBy', orderBy);
      const { listingsState } = cache.readQuery({ query: LISTINGS_STATE_QUERY });

      const newListingsState = update(listingsState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          listingsState: newListingsState,
          __type: TYPE_LISTINGS_STATE
        }
      });

      return null;
    },
    updateFilterListing: (_, { filter }, { cache }) => {
      console.log('updateFilter', filter);
      const { listingsState } = cache.readQuery({ query: LISTINGS_STATE_QUERY });

      const newListingsState = update(listingsState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          listingsState: newListingsState,
          __type: TYPE_LISTINGS_STATE
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};