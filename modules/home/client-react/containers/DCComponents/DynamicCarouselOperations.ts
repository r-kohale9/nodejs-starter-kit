import { FunctionComponent } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { removeTypename, PLATFORM } from '@gqlapp/core-common';
import settings from '@gqlapp/config';

// Query
import DYNAMIC_CAROUSEL_QUERY from '../../graphql/DynamicCarouselQuery.graphql';
import DYNAMIC_CAROUSELS_QUERY from '../../graphql/DynamicCarouselsQuery.graphql';

// Mutation
import ADD_DYNAMIC_CAROUSEL from '../../graphql/AddDynamicCarousel.graphql';
import DELETE_DYNAMIC_CAROUSEL from '../../graphql/DeleteDynamicCarousel.graphql';
import EDIT_DYNAMIC_CAROUSEL from '../../graphql/EditDynamicCarousel.graphql';

// Subscription
import DYNAMIC_CAROUSEL_SUBSCRIPTION from '../../graphql/DynamicCarouselSubscription.graphql';

// Filters
import DYNAMIC_CAROUSEL_STATE_QUERY from '../../graphql/DynamicCarouselStateQuery.client.graphql';
import DYNAMIC_CAROUSEL_UPDATE_FILTER from '../../graphql/DynamicCarouselUpdateFilter.client.graphql';
import DYNAMIC_CAROUSEL_ORDER_BY from '../../graphql/UpdateOrderByDynamiceCarousel.client.graphql';

import ROUTES from '../../routes';

// types
import {
  OrderByDynamicCarouselInput,
  FilterDynamicCarouselInput,
  AddDynamicCarouselInput,
  EditDynamicCarouselInput
} from '../../../../../packages/server/__generated__/globalTypes';
import {
  dynamicCarousels_dynamicCarousels as DynamicCarousels,
  dynamicCarousels_dynamicCarousels_edges as DynamicCarouselsEdges,
  dynamicCarousels as dynamicCarouselsResponse,
  dynamicCarouselsVariables
} from '../../graphql/__generated__/dynamicCarousels';
import {
  dynamicCarousel_dynamicCarousel as DynamicCarousel,
  dynamicCarousel as dynamicCarouselResponse,
  dynamicCarouselVariables
} from '../../graphql/__generated__/dynamicCarousel';
import {
  deleteDynamicCarousel as deleteDynamicCarouselResponse,
  deleteDynamicCarouselVariables
} from '../../graphql/__generated__/deleteDynamicCarousel';
import {
  addDynamicCarousel as addDynamicCarouselResponse,
  addDynamicCarouselVariables
} from '../../graphql/__generated__/addDynamicCarousel';
import {
  editDynamicCarousel as editDynamicCarouselResponse,
  editDynamicCarouselVariables
} from '../../graphql/__generated__/editDynamicCarousel';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withDynamicCarousels = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByDynamicCarouselInput;
      filter: FilterDynamicCarouselInput;
    },
    dynamicCarouselsResponse,
    dynamicCarouselsVariables,
    {}
  >(DYNAMIC_CAROUSELS_QUERY, {
    options: ({ orderBy, filter }) => {
      // console.log(filter);
      return {
        fetchPolicy: 'network-only',
        variables: { limit, after: 0, orderBy, filter }
      };
    },
    props: ({ data }) => {
      const { loading, error, dynamicCarousels, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.dynamicCarousels.totalCount;
            const newEdges = fetchMoreResult.dynamicCarousels.edges;
            const pageInfo = fetchMoreResult.dynamicCarousels.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.dynamicCarousels.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              dynamicCarousels: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'DynamicCarousels'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return {
        loading,
        dynamicCarousels,
        subscribeToMore,
        loadData,
        updateQueryListings: updateQuery
      };
    }
  })(Component);

export const withDynamicCarousel = (Component: FunctionComponent) =>
  graphql<
    {
      match: Match<{ id: string }>;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    },
    dynamicCarouselResponse,
    dynamicCarouselVariables,
    {}
  >(DYNAMIC_CAROUSEL_QUERY, {
    options: props => {
      // console.log(props);
      let id = '0';
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, dynamicCarousel, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, dynamicCarousel, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withDeleteDynamicCarousel = (Component: FunctionComponent) =>
  graphql<{}, deleteDynamicCarouselResponse, deleteDynamicCarouselVariables, {}>(DELETE_DYNAMIC_CAROUSEL, {
    props: ({ mutate }) => ({
      deleteDynamicCarousel: async (id: number) => {
        const {
          data: { deleteDynamicCarousel }
        } = await mutate({
          variables: { id }
        });
        if (deleteDynamicCarousel) {
          Message.warning('Banner deleted.');
        } else {
          Message.warning('Try again!');
        }
      }
    })
  })(Component);

export const withAddDynamicCarousel = (Component: FunctionComponent) =>
  graphql<{ history: History }, addDynamicCarouselResponse, addDynamicCarouselVariables, {}>(ADD_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      addDynamicCarousel: async (values: AddDynamicCarouselInput) => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            }
          });

          Message.destroy();
          Message.success('Banner added.');
          history.push(`${ROUTES.adminPanel}`);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withEditDynamicCarousel = (Component: FunctionComponent) =>
  graphql<{ history: History }, editDynamicCarouselResponse, editDynamicCarouselVariables, {}>(EDIT_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      editDynamicCarousel: async (values: EditDynamicCarouselInput) => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          // console.log('input', input);
          await mutate({
            variables: {
              input: values
            }
          });
          Message.destroy();
          Message.success('Changes Saved.');
          history.push(`${ROUTES.adminPanel}`);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

// Subscription
export const subscribeToDynamicCarousels = (subscribeToMore: (options: SubscribeToMoreOptions) => () => void) =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev: { dynamicCarousels: DynamicCarousels },
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { dynamicCarouselUpdated: { mutation: string; node: DynamicCarousel } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddDynamicCarousels(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousels(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDynamicCarousels(prev, node.id);
      }
      return newResult;
    }
  });

function onAddDynamicCarousels(prev: { dynamicCarousels: DynamicCarousels }, node: DynamicCarousel) {
  // console.log('prev', prev, node);
  if (prev.dynamicCarousels.edges.some(dC => node.id === dC.cursor)) {
    return update(prev, {
      dynamicCarousels: {
        totalCount: {
          $set: prev.dynamicCarousels.totalCount - 1
        },
        edges: {
          $set: prev.dynamicCarousels.edges
        }
      }
    });
  }

  const filteredListings = prev.dynamicCarousels.edges.filter(dC => dC.node.id !== null);

  const edge: DynamicCarouselsEdges = {
    cursor: node.id,
    node,
    __typename: 'DynamicCarouselEdges'
  };

  return update(prev, {
    dynamicCarousels: {
      totalCount: {
        $set: prev.dynamicCarousels.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditDynamicCarousels(prev: { dynamicCarousels: DynamicCarousels }, node: DynamicCarousel) {
  const index = prev.dynamicCarousels.edges.findIndex(x => x.node.id === node.id);
  const edge: DynamicCarouselsEdges = {
    cursor: node.id,
    node,
    __typename: 'DynamicCarouselEdges'
  };
  if (index) {
    prev.dynamicCarousels.edges.splice(index, 1, edge);
    return update(prev, {
      dynamicCarousels: {
        edges: {
          $set: [...prev.dynamicCarousels.edges]
        }
      }
    });
  }
}

const onDeleteDynamicCarousels = (prev: { dynamicCarousels: DynamicCarousels }, id: number) => {
  const index = prev.dynamicCarousels.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    dynamicCarousels: {
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToDynamicCarousel = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  history: History
) =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev: { dynamicCarousel: DynamicCarousel },
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { dynamicCarouselUpdated: { mutation: string; node: DynamicCarousel } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousel(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteDynamicCarousel(prev, node.id, history);
      }
      return newResult;
    }
  });

function onEditDynamicCarousel(prev: { dynamicCarousel: DynamicCarousel }, node: DynamicCarousel) {
  return update(prev, {
    dynamicCarousel: {
      $set: node
    }
  });
}

const onDeleteDynamicCarousel = (prev: { dynamicCarousel: DynamicCarousel }, id: number, history: History) => {
  if (prev.dynamicCarousel.id === id) {
    Message.error('Banner was deleted');
    history.push(`${ROUTES.adminPanel}`);
  }
};

// Filters
export const withDynamicCarouselState = (Component: FunctionComponent) =>
  graphql(DYNAMIC_CAROUSEL_STATE_QUERY, {
    props({ data: { dynamicCarouselState } }) {
      return { ...removeTypename(dynamicCarouselState) };
    }
  })(Component);

export const withDynamicCarouselFilterUpdating = (Component: FunctionComponent) =>
  graphql(DYNAMIC_CAROUSEL_UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText: string) {
        mutate({ variables: { filter: { searchText } } });
      },
      onLabelChange(label: string) {
        mutate({ variables: { filter: { label } } });
      },
      onIsActiveChange(isActive: boolean) {
        // console.log(isActive);
        mutate({ variables: { filter: { isActive } } });
      },
      onFiltersRemove(filter: FilterDynamicCarouselInput, orderBy: OrderByDynamicCarouselInput) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);

export const withDynamicCarouselOrderByUpdating = (Component: FunctionComponent) =>
  graphql(DYNAMIC_CAROUSEL_ORDER_BY, {
    props: ({ mutate }) => ({
      onDynamicCarouselOrderBy: (orderBy: OrderByDynamicCarouselInput) => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);
