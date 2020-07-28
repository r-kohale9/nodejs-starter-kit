import update from 'immutability-helper';

import LISTINGS_STATE_QUERY from '../graphql/ListingsStateQuery.client.graphql';

const TYPE_LISTINGS_STATE = 'ListingsState';
const TYPE_LISTINGS_STATE_FILTER = 'FilterListInput';
const TYPE_LISTINGS_STATE_FILTER_PRICE_RANGE = 'PriceRangeInput';
const TYPE_LISTINGS_STATE_ORDER_BY = 'OrderByListInput';

const defaults = {
  listingsState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_LISTINGS_STATE_ORDER_BY
    },
    filter: {
      default: true,
      priceRange: {
        min: 100,
        max: 1000,
        __typename: TYPE_LISTINGS_STATE_FILTER_PRICE_RANGE
      },
      weights: [],
      flavours: [],
      categories: [],
      searchText: '',
      isActive: true,
      category: '',
      __typename: TYPE_LISTINGS_STATE_FILTER
    },
    __typename: TYPE_LISTINGS_STATE
  }
};

const resolvers = {
  Mutation: {
    updateListingsOrderBy: (_, { orderBy }, { cache }) => {
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
    updateListingsFilter: (_, { filter }, { cache }) => {
      const { listingsState } = cache.readQuery({ query: LISTINGS_STATE_QUERY });
      console.log('listingsState', listingsState, filter);
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
