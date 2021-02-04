import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { Message } from '@gqlapp/look-client-react';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import settings from '@gqlapp/config';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

// Query
import ORDER_QUERY from '../graphql/OrderQuery.graphql';
import ORDERS_STATE_QUERY from '../graphql/OrdersStateQuery.client.graphql';
import ORDERS_QUERY from '../graphql/OrdersQuery.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';
import ORDER_STATES from '../graphql/OrderStatesQuery.graphql';

// Mutation
import ADD_TO_CART from '../graphql/AddToCart.graphql';
import EDIT_ORDERDETAIL from '../graphql/EditOrderDetail.graphql';
import DELETE_CART_ITEM from '../graphql/DeleteCartItem.graphql';
import DELETE_ORDER from '../graphql/DeleteOrder.graphql';
import PATCH_ORDER_STATE from '../graphql/PatchOrderState.graphql';
import PATCH_ADDRESS from '../graphql/PatchAddress.graphql';
import COMPLETED_MAIL from '../graphql/OrderStatusMail.graphql';

// Filter
import UPDATE_ORDER_BY_ORDER from '../graphql/UpdateOrderByOrder.client.graphql';
import UPDATE_ORDER_FILTER from '../graphql/UpdateOrderFilter.client.graphql';

// types
import {
  OrderByListInput,
  FilterOrderInput,
  AddToCartInput,
  EditOrderDetailInput
} from '../../../../packages/server/__generated__/globalTypes';
import { order as orderResponse, orderVariables } from '../graphql/__generated__/order';
import { orders as ordersResponse, ordersVariables } from '../graphql/__generated__/orders';
import {
  getCart_getCart as GetCart,
  getCart as getCartResponse,
  getCartVariables
} from '../graphql/__generated__/getCart';
import { orderStates as orderStatesResponse } from '../graphql/__generated__/orderStates';
import { addToCart as addToCartResponse, addToCartVariables } from '../graphql/__generated__/addToCart';
import {
  editOrderDetail as editOrderDetailResponse,
  editOrderDetailVariables
} from '../graphql/__generated__/editOrderDetail';
import {
  deleteOrderDetail as deleteOrderDetailResponse,
  deleteOrderDetailVariables
} from '../graphql/__generated__/deleteOrderDetail';
import { deleteOrder as deleteOrderResponse, deleteOrderVariables } from '../graphql/__generated__/deleteOrder';
import {
  patchOrderState as patchOrderStateResponse,
  patchOrderStateVariables
} from '../graphql/__generated__/patchOrderState';
import { patchAddress as patchAddressResponse, patchAddressVariables } from '../graphql/__generated__/patchAddress';
import {
  orderStatusMail as orderStatusMailResponse,
  orderStatusMailVariables
} from '../graphql/__generated__/orderStatusMail';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withOrdersState = (Component: FunctionComponent) =>
  graphql(ORDERS_STATE_QUERY, {
    props({ data: { ordersState, loading } }) {
      return { ...removeTypename(ordersState), loadingState: loading };
    }
  })(Component);

export const withOrder = (Component: FunctionComponent) =>
  graphql<
    {
      match: Match<{ id: string }>;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    },
    orderResponse,
    orderVariables,
    {}
  >(ORDER_QUERY, {
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
    props({ data: { loading, error, order, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, order, subscribeToMore, updateQuery };
    }
  })(Component);

export const withOrders = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByListInput;
      filter: FilterOrderInput;
    },
    ordersResponse,
    ordersVariables,
    {}
  >(ORDERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, orders, fetchMore, subscribeToMore, updateQuery, refetch } = data;
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
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
                __typename: 'Orders'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return { loading, orders, ordersSubscribeToMore: subscribeToMore, loadData, updateQuery, refetch };
    }
  })(Component);

export const withGetCart = (Component: FunctionComponent) =>
  graphql<{ currentUser: CurrentUser }, getCartResponse, getCartVariables, {}>(GET_CART_QUERY, {
    options: ({ currentUser }) => {
      return {
        variables: { userId: currentUser && currentUser.id },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  })(Component);

export const withOrderStates = (Component: FunctionComponent) =>
  graphql<{}, orderStatesResponse, {}, {}>(ORDER_STATES, {
    props({ data: { loading, error, orderStates, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { orderStatesLoading: loading, orderStates, subscribeToMore, refetch };
    }
  })(Component);

// Mutation
export const withAddToCart = (Component: FunctionComponent) =>
  graphql<{}, addToCartResponse, addToCartVariables, {}>(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: async (input: AddToCartInput) => {
        await mutate({
          variables: {
            input
          }
        });
      }
    })
  })(Component);

export const withEditOrderDetail = (Component: FunctionComponent) =>
  graphql<{}, editOrderDetailResponse, editOrderDetailVariables, {}>(EDIT_ORDERDETAIL, {
    props: ({ mutate }) => ({
      editOrderDetail: async (input: EditOrderDetailInput) => {
        const {
          data: { editOrderDetail }
        } = await mutate({
          variables: { input }
        });

        return editOrderDetail;
      }
    })
  })(Component);

export const withDeleteCartItem = (Component: FunctionComponent) =>
  graphql<{}, deleteOrderDetailResponse, deleteOrderDetailVariables, {}>(DELETE_CART_ITEM, {
    props: ({ mutate }) => ({
      deleteOrderDetail: (id: number) => {
        mutate({
          variables: { id }
        });
      }
    })
  })(Component);

export const withDeleteOrder = (Component: FunctionComponent) =>
  graphql<{}, deleteOrderResponse, deleteOrderVariables, {}>(DELETE_ORDER, {
    props: ({ mutate }) => ({
      deleteOrder: (id: number) => {
        mutate({
          variables: { id }
        });
      }
    })
  })(Component);

export const withPatchOrderState = (Component: FunctionComponent) =>
  graphql<{}, patchOrderStateResponse, patchOrderStateVariables, {}>(PATCH_ORDER_STATE, {
    props: ({ mutate }) => ({
      patchOrderState: async (orderId: number, state: string) => {
        const {
          data: { patchOrderState }
        } = await mutate({
          variables: {
            orderId,
            state
          }
        });
        return patchOrderState;
      }
    })
  })(Component);

export const withPatchAddress = (Component: FunctionComponent) =>
  graphql<{ getCart: GetCart }, patchAddressResponse, patchAddressVariables, {}>(PATCH_ADDRESS, {
    props: ({ mutate, ownProps: { getCart } }) => ({
      patchAddress: async (addressId: number) => {
        // console.log('mutation start', id);
        const {
          data: { patchAddress }
        } = await mutate({
          variables: {
            cartId: getCart && getCart.id,
            addressId
          }
        });
        Message.destroy();
        return patchAddress && Message.success('Address updated') && patchAddress;
      }
    })
  })(Component);

export const withOrderStatusMail = (Component: FunctionComponent) =>
  graphql<{}, orderStatusMailResponse, orderStatusMailVariables, {}>(COMPLETED_MAIL, {
    props: ({ mutate }) => ({
      orderStatusMail: async (orderId: number, note: string) => {
        // console.log('mutation start', note);
        const {
          data: { orderStatusMail }
        } = await mutate({
          variables: {
            orderId,
            note
          }
        });
        Message.destroy();
        return orderStatusMail ? Message.success('Mail sent.') : Message.error('Please try again.');
      }
    })
  })(Component);

// Filter
export const withOrderByUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_ORDER_BY_ORDER, {
    props: ({ mutate }) => ({
      onOrderBy: (orderBy: OrderByListInput) => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withFilterUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_ORDER_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText: string) {
        // console.log("searchtext", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onStateChange(state: string) {
        mutate({ variables: { filter: { state } } });
      },
      onUserStateChange(consumerId: number, state: string) {
        // console.log('consumerId, state', consumerId, state);
        mutate({ variables: { filter: { consumerId, state } } });
      },
      onFiltersRemove(filter: FilterOrderInput, orderBy: OrderByListInput) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);
