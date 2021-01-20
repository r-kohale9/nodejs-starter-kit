import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import { PLATFORM, removeTypename, log } from '@gqlapp/core-common';
import settings from '@gqlapp/config';

// Query
import USERS_STATE_QUERY from '../graphql/UsersStateQuery.client.graphql';
import USERS_QUERY from '../graphql/UsersQuery.graphql';
import USER_LIST_QUERY from '../graphql/UserListQuery.graphql';
import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';

// Mutation
import DELETE_USER from '../graphql/DeleteUser.graphql';

// Filter
import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';
import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';

// types
import { OrderByUserInput, FilterUserInput } from '../../../../packages/server/__generated__/globalTypes';
import { currentUser as currentUserResponse } from '../graphql/__generated__/currentUser';
import { users_users as User, users as usersResponse, usersVariables } from '../graphql/__generated__/users';
import {
  userList_userList as UserList,
  userList_userList_edges as UserListEdges,
  userList as userListResponse,
  userListVariables
} from '../graphql/__generated__/userList';
import { deleteUser as deleteUserResponse, deleteUserVariables } from '../graphql/__generated__/deleteUser';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withCurrentUser = (Component: FunctionComponent) =>
  graphql<{}, currentUserResponse, {}, {}>(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, currentUser };
    }
  })(Component);

export const withUsersState = (Component: FunctionComponent) =>
  graphql(USERS_STATE_QUERY, {
    props({ data: { usersState } }) {
      return removeTypename(usersState);
    }
  })(Component);

export const withUsers = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByUserInput;
      filter: FilterUserInput;
    },
    usersResponse,
    usersVariables,
    {}
  >(USERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { orderBy, filter }
      };
    },
    props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        users,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })(Component);

export const withUserList = (Component: FunctionComponent) =>
  graphql<
    {
      orderBy: OrderByUserInput;
      filter: FilterUserInput;
    },
    userListResponse,
    userListVariables,
    {}
  >(USER_LIST_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, userList, fetchMore, updateQuery, subscribeToMore } = data;
      const users = userList;
      // console.log("ops", users);
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userList.totalCount;
            const newEdges = fetchMoreResult.userList.edges;
            const pageInfo = fetchMoreResult.userList.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.userList.edges, ...newEdges] : newEdges;

            return {
              userList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'UserList'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error.message);
      }
      return { loading, users, loadData, updateQuery, subscribeToMore };
    }
  })(Component);

export const withUsersDeleting = (Component: FunctionComponent) =>
  graphql<{}, deleteUserResponse, deleteUserVariables, {}>(DELETE_USER, {
    props: ({ mutate }) => ({
      deleteUser: async (id: number) => {
        try {
          await mutate({
            variables: { id }
          });
        } catch (e) {
          log.error(e);
        }
      }
    })
  })(Component);

export const withOrderByUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrderBy: (orderBy: OrderByUserInput) => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withFilterUpdating = (Component: FunctionComponent) =>
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText: string) {
        mutate({ variables: { filter: { searchText } } });
      },
      onRoleChange(role: string) {
        mutate({ variables: { filter: { role } } });
      },
      onIsActiveChange(isActive: boolean) {
        mutate({ variables: { filter: { isActive } } });
      }
    })
  })(Component);

export const updateUsersState = (
  usersUpdated: {
    mutation: string;
    node: User;
  },
  updateQuery
) => {
  const { mutation, node } = usersUpdated;
  updateQuery((prev: { users: UserList }) => {
    switch (mutation) {
      case 'CREATED':
        return addUser(prev, node);
      case 'DELETED':
        return deleteUser(prev, node.id);
      case 'UPDATED':
        return deleteUser(prev, node.id);
      default:
        return prev;
    }
  });
};

function addUser(prev: { users: UserList }, node: User) {
  // check if it is duplicate
  if (prev.users.edges.some(user => user.node.id === node.id)) {
    return prev;
  }
  const edge: UserListEdges = {
    cursor: node.id,
    node,
    __typename: 'UserEdges'
  };

  return update(prev, {
    users: {
      edges: {
        $set: [...prev.users.edges, edge]
      }
    }
  });
}

function deleteUser(prev: { users: UserList }, id: number) {
  const index = prev.users.edges.findIndex(user => user.node.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    users: {
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}
