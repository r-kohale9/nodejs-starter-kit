import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';

// Query
import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
import CATEGORIES_QUERY from '../graphql/CategoriesQuery.graphql';

import ROUTES from '../routes';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withCategories = Component =>
  graphql(CATEGORIES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, categories, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
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
      if (error) throw new Error(error);
      return { loading, categories, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withCategory = Component =>
  graphql(CATEGORY_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) || props.modalId }
      };
    },
    props({ data: { loading, error, category, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, category, subscribeToMore, updateQuery };
    }
  })(Component);