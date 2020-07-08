import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import PromoCodesView from '../components/PromoCodesView.web';

import PROMOCODES_QUERY from '../graphql/PromoCodesQuery.graphql';
// import ADD_PROMOCODE from '../graphql/AddPromoCode.graphql';
import DELETE_PROMOCODES from '../graphql/DeletePromoCode.graphql';

// import { usePromoCodesWithSubscription } from './withSubscriptions';
// import { withPromoCodes, withPromoCodesDeleting, updatePromoCodesState, withTooglePromoCodeActive } from './PromoCodeOperations';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const PromoCodes = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  // const promoCodesUpdated = usePromoCodesWithSubscription(subscribeToMore, filter);

  // useEffect(() => {
  //   if (promoCodesUpdated) {
  //     updatePromoCodesState(promoCodesUpdated, updateQuery);
  //   }
  // });
  console.log('props', props);
  return <PromoCodesView {...props} />;
};

PromoCodes.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
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

  graphql(DELETE_PROMOCODES, {
    props: ({ mutate }) => ({
      deletePromoCode: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deletePromoCode: {
              id: id,
              __typename: 'PromoCodes'
            }
          }
          //   ,
          //   update: (cache, { data: { deletePromoCode } }) => {
          //     // Get previous promoCodes from cache
          //     const prevPromoCodes = cache.readQuery({
          //       query: PROMOCODES_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       }
          //     });

          //     const newListPromoCodes = onDeleteListing(prevPromoCodes, deleteListing.id);

          //     // Write promoCodes to cache
          //     cache.writeQuery({
          //       query: PROMOCODES_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       },
          //       data: {
          //         promoCodes: {
          //           ...newListPromoCodes.promoCodes,
          //           __typename: 'PromoCodes'
          //         }
          //       }
          //     });
          //   }
        });
        message.warning('PromoCodes deleted.');
      }
    })
  }),
  translate('PromoCodes')
)(PromoCodes);
