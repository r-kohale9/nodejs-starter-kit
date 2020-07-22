import React from 'react';
import { RenderAutoComplete } from '@gqlapp/look-client-react';
import debounce from 'lodash/debounce';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { graphql } from 'react-apollo';
import { PLATFORM, compose, removeTypename } from '@gqlapp/core-common';

import UPDATE_FILTER from '@gqlapp/user-client-react/graphql/UpdateFilter.client.graphql';
import USER_LIST_QUERY from '@gqlapp/user-client-react/graphql/UserListQuery.graphql';
import USERS_STATE_QUERY from '@gqlapp/user-client-react/graphql/UsersStateQuery.client.graphql';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const UserAutoCompleteComponent = props => {
  const { name, setValue, label, value, onSearchTextChange } = props;
  const handleUserSelect = value => {
    setValue(props.userList.edges.filter(i => i.node.profile.fullName === value)[0].node.id);
  };
  return (
    <Field
      name={name}
      dataSource={props.userList && props.userList.edges.map(item => item.node.profile && item.node.profile.fullName)}
      component={RenderAutoComplete}
      label={label}
      type="text"
      defaultValue={value}
      // value={value}
      onSelect={handleUserSelect}
      onSearch={debounce(onSearchTextChange, 300)}
    />
  );
};

UserAutoCompleteComponent.propTypes = {
  name: PropTypes.string,
  userList: PropTypes.object,
  setValue: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  onSearchTextChange: PropTypes.func
};

export default compose(
  graphql(USERS_STATE_QUERY, {
    props({ data }) {
      return removeTypename(data.usersState);
    }
  }),
  graphql(USER_LIST_QUERY, {
    options: ({ orderBy, filter, userType }) => {
      filter.role = userType;
      return {
        // eslint-disable-next-line prettier/prettier
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
      const { loading, error, userList, fetchMore, updateQuery, subscribeToMore } = data;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
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
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        userList,
        loadData,
        updateQuery,
        subscribeToMore
      };
    }
  }),
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onRoleChange(role) {
        mutate({ variables: { filter: { role } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      }
    })
  })
)(translate('review')(UserAutoCompleteComponent));