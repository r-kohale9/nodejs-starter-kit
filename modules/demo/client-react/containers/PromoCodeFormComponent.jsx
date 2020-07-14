import React from 'react';
import { compose, PLATFORM } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import { translate } from '@gqlapp/i18n-client-react';
import { PropTypes } from 'prop-types';
import PROMOCODES_QUERY from '../graphql/PromoCodesQuery.graphql';

import PromoCodeForm from '../components/PromoCodeForm';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const PromoCodeFormComponent = props => {
  return <PromoCodeForm {...props} />;
};

PromoCodeFormComponent.propTypes = {
  getCart: PropTypes.object,
  deleteOrderDetail: PropTypes.func,
  editOrder: PropTypes.func
};
export default compose(
  graphql(PROMOCODES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, getPromoCodes, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.getPromoCodes.totalCount;
            const newEdges = fetchMoreResult.getPromoCodes.edges;
            const pageInfo = fetchMoreResult.getPromoCodes.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.getPromoCodes.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              getPromoCodes: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'PromoCodes'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, getPromoCodes, subscribeToMore, loadData, updateQuery };
    }
  }),
  translate('orders')
)(PromoCodeFormComponent);
