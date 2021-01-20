import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import { removeTypename, PLATFORM } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';

// Query
import MODAL_DISCOUNT_QUERY from '../graphql/ModalDiscountQuery.graphql';
import DISCOUNTS_QUERY from '../graphql/DiscountsQuery.graphql';
import DISCOUNTS_STATES_QUERY from '../graphql/DiscountsStateQuery.client.graphql';

// Mutation
import ADD_DISCOUNT from '../graphql/AddDiscount.graphql';
import EDIT_DISCOUNT from '../graphql/EditDiscount.graphql';
import DELETE_DISCOUNT from '../graphql/DeleteDiscount.graphql';

// Filter
import UPDATE_ORDER_BY_DISCOUNT from '../graphql/UpdateOrderByDiscount.client.graphql';
import UPDATE_DISCOUNT_FILTER from '../graphql/UpdateDiscountFilter.client.graphql';

// types
import {
  OrderByDiscountInput,
  FilterDiscountInput,
  AddDiscountInput,
  EditDiscountInput
} from '../../../../packages/server/__generated__/globalTypes';
import { modalDiscount as modalDiscountResponse, modalDiscountVariables } from '../graphql/__generated__/modalDiscount';
import { discounts as discountsResponse, discountsVariables } from '../graphql/__generated__/discounts';
import { addDiscount as addDiscountResponse, addDiscountVariables } from '../graphql/__generated__/addDiscount';
import { editDiscount as editDiscountResponse, editDiscountVariables } from '../graphql/__generated__/editDiscount';
import {
  deleteDiscount as deleteDiscountResponse,
  deleteDiscountVariables
} from '../graphql/__generated__/deleteDiscount';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withModalDiscount = (Component: FunctionComponent) =>
  graphql<
    {
      modalId: number;
      modalName: string;
      match: Match<{ id: string; modalName: string }>;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    },
    modalDiscountResponse,
    modalDiscountVariables,
    {}
  >(MODAL_DISCOUNT_QUERY, {
    options: ({ modalId, modalName, match, navigation }) => {
      return {
        variables: {
          modalId: modalId || (match ? Number(match.params.id) : Number(navigation.state.params.id)),
          modalName: modalName || (match ? match.params.modalName : navigation.state.params.modalName)
        }
      };
    },
    props({ data: { loading, error, modalDiscount, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, modalDiscount, discountSubscribeToMore: subscribeToMore, updateQuery };
    }
  })(Component);

export const withDiscounts = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByDiscountInput;
      filter: FilterDiscountInput;
    },
    discountsResponse,
    discountsVariables,
    {}
  >(DISCOUNTS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, discounts, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after: number, dataDelivery: string | null) => {
        return fetchMore({
          variables: {
            after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.discounts.totalCount;
            const newEdges = fetchMoreResult.discounts.edges;
            const pageInfo = fetchMoreResult.discounts.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.discounts.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              discounts: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Discounts'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return { loading, discounts, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withDiscountsState = (Component: FunctionComponent) =>
  graphql(DISCOUNTS_STATES_QUERY, {
    props({ data: { discountState, loading } }) {
      return { ...removeTypename(discountState), loadingState: loading };
    }
  })(Component);

// Mutation
export const withAddDiscount = (Component: FunctionComponent) =>
  graphql<{}, addDiscountResponse, addDiscountVariables, {}>(ADD_DISCOUNT, {
    props: ({ mutate }) => ({
      addDiscount: async (values: AddDiscountInput) => {
        try {
          await mutate({
            variables: {
              input: values
            }
          });
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withEditDiscount = (Component: FunctionComponent) =>
  graphql<{}, editDiscountResponse, editDiscountVariables, {}>(EDIT_DISCOUNT, {
    props: ({ mutate }) => ({
      editDiscount: async (input: EditDiscountInput) => {
        try {
          await mutate({
            variables: {
              input
            }
          });
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withDiscountDeleting = (Component: FunctionComponent) =>
  graphql<{}, deleteDiscountResponse, deleteDiscountVariables, {}>(DELETE_DISCOUNT, {
    props: ({ mutate }) => ({
      deleteDiscount: (id: number) => {
        mutate({
          variables: { id }
        });
        Message.warning('Discount deleted.');
      }
    })
  })(Component);

// Filter
export const withOrderByUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_ORDER_BY_DISCOUNT, {
    props: ({ mutate }) => ({
      onDiscountsOrderBy: (orderBy: OrderByDiscountInput) => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withFilterUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_DISCOUNT_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText: string) {
        // console.log("searchtext", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onIsActiveChange(isActive: boolean) {
        mutate({ variables: { filter: { isActive } } });
      },
      onModalNameChange(modalName: string) {
        mutate({ variables: { filter: { modalName } } });
      },
      // onCategoryChange(categoryFilter) {
      //   // console.log(categoryFilter);
      //   mutate({
      //     variables: {
      //       filter: {
      //         categoryFilter: {
      //           categoryId: categoryFilter.categoryId,
      //           allSubCategory: categoryFilter.allSubCategory,
      //           __typename: 'CategoryFilter',
      //         },
      //       },
      //     },
      //   });
      // },
      onFiltersRemove(filter: FilterDiscountInput, orderBy: OrderByDiscountInput) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);
