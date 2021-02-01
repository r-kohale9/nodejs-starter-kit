import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';
import { match as Match } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import settings from '@gqlapp/config';

// Query
import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
import CATEGORIES_QUERY from '../graphql/CategoriesQuery.graphql';
import CATEGORIES_STATE_QUERY from '../graphql/CategoriesStateQuery.client.graphql';

// Mutation
import ADD_CATEGORY from '../graphql/AddCategory.graphql';
import EDIT_CATEGORY from '../graphql/EditCategory.graphql';
import DELETE_CATEGORY from '../graphql/DeleteCategory.graphql';

// Filter
import UPDATE_ORDER_BY_CATEGORIES from '../graphql/UpdateOrderByCategories.client.graphql';
import UPDATE_CATEGORIES_FILTER from '../graphql/UpdateCategoriesFilter.client.graphql';

// types
import {
  OrderByCategoryInput,
  FilterCategoryInput,
  AddCategoryInput,
  EditCategoryInput
} from '../../../../packages/server/__generated__/globalTypes';
import { categories as categoriesResponse, categoriesVariables } from '../graphql/__generated__/categories';
import { category as categoryResponse, categoryVariables } from '../graphql/__generated__/category';
import { addCategory as addCategoryResponse, addCategoryVariables } from '../graphql/__generated__/addCategory';
import {
  deleteCategory as deleteCategoryResponse,
  deleteCategoryVariables
} from '../graphql/__generated__/deleteCategory';
import { editCategory as editCategoryResponse, editCategoryVariables } from '../graphql/__generated__/editCategory';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withCategoriesState = (Component: FunctionComponent) =>
  graphql(CATEGORIES_STATE_QUERY, {
    props({ data: { categoriesState, loading } }) {
      return { ...removeTypename(categoriesState), loadingState: loading };
    }
  })(Component);

export const withCategories = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByCategoryInput;
      filter: FilterCategoryInput;
    },
    categoriesResponse,
    categoriesVariables,
    {}
  >(CATEGORIES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, categories, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.categories.totalCount;
            const newEdges = fetchMoreResult.categories.edges;
            const pageInfo = fetchMoreResult.categories.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.categories.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              categories: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Categories'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return { loading, categories, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withCategory = (Component: FunctionComponent) =>
  graphql<
    {
      modalId: number;
      match: Match<{ cid: string }>;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    },
    categoryResponse,
    categoryVariables,
    {}
  >(CATEGORY_QUERY, {
    options: props => {
      let id = '0';
      if (props.match) {
        id = props.match.params.cid;
      } else if (props.navigation) {
        id = props.navigation.state.params.cid;
      }
      return {
        variables: { id: Number(id) || props.modalId }
      };
    },
    props({ data: { loading, error, category, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, category, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withAddCategory = (Component: FunctionComponent) =>
  graphql<{}, addCategoryResponse, addCategoryVariables, {}>(ADD_CATEGORY, {
    props: ({ mutate }) => ({
      addCategory: async (values: AddCategoryInput) => {
        try {
          await mutate({
            variables: {
              input: values
            }
          });
          return true;
        } catch (e) {
          console.error(e);
        }
      }
    })
  })(Component);

export const withCategoryDeleting = (Component: FunctionComponent) =>
  graphql<{}, deleteCategoryResponse, deleteCategoryVariables, {}>(DELETE_CATEGORY, {
    props: ({ mutate }) => ({
      deleteCategory: (id: number) => {
        mutate({
          variables: { id }
        });
      }
    })
  })(Component);

export const withEditCategory = (Component: FunctionComponent) =>
  graphql<{}, editCategoryResponse, editCategoryVariables, {}>(EDIT_CATEGORY, {
    props: ({ mutate }) => ({
      editCategory: async (input: EditCategoryInput) => {
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

// Filter
export const withFilterUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_CATEGORIES_FILTER, {
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
      onFiltersRemove(filter: FilterCategoryInput, orderBy: OrderByCategoryInput) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);

export const withOrderByUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_ORDER_BY_CATEGORIES, {
    props: ({ mutate }) => ({
      onOrderBy: (orderBy: OrderByCategoryInput) => {
        // console.log('orderby', mutate);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);
