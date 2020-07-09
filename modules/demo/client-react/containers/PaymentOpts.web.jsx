import React from 'react';
import { PLATFORM, removeTypename, compose } from '@gqlapp/core-common';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';

import { message } from 'antd';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
// import ADD_PAYMENT_OPT from '../graphql/AddPaymentOpts.graphql';
// import EDIT_PAYMENT_OPT from '../graphql/EditPaymentOpts.graphql';
import DELETE_PAYMENT_OPT from '../graphql/DeletePaymentOpts.graphql';
import PAYMENT_OPTS_QUERY from '../graphql/PaymentOptsQuery.graphql';

import PaymentOptsView from '../components/PaymentOptsView';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const PaymentOpts = props => {
  const handleSubmit = (values, type) => {
    console.log('values', values, type);
    try {
      switch (type) {
        case 'ADD':
          values.userId = props.currentUser.id;
          return props.addPaymentOpts(values);
        case 'DELETE':
          return props.deletePaymentOpts(values);
        case 'EDIT':
          return props.editPaymentOpts(values);
        default:
          return true;
      }
    } catch (e) {
      throw Error(e);
    }
  };
  console.log('props', props);
  return <PaymentOptsView {...props} onSubmit={handleSubmit} />;
};

PaymentOpts.propTypes = {
  currentUser: PropTypes.object,
  addPaymentOpts: PropTypes.func
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(PAYMENT_OPTS_QUERY, {
    options: ({ orderBy, filter, currentUser }) => {
      return {
        variables: {
          userId: currentUser && currentUser.id,
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, paymentOpts, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.paymentOpts.totalCount;
            const newEdges = fetchMoreResult.paymentOpts.edges;
            const pageInfo = fetchMoreResult.paymentOpts.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.paymentOpts.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              paymentOpts: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'PaymentOpts'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, paymentOpts, subscribeToMore, loadData, updateQuery };
    }
  }),
  // graphql(ADD_PAYMENT_OPT, {
  //   props: ({ ownProps: { history }, mutate }) => ({
  //     addPaymentOpts: async values => {
  //       console.log('addreivewq', values);
  //       message.destroy();
  //       message.loading('Please wait...', 0);
  //       try {
  //         await mutate({
  //           variables: {
  //             input: values
  //           },
  //           optimisticResponse: {
  //             __typename: 'Mutation',
  //             addPaymentOpts: {
  //               __typename: 'PaymentOpts',
  //               ...values
  //             }
  //           }
  //         });

  //         message.destroy();
  //         message.success('Payment Opts added.');
  //         // console.log('addreview', values);
  //         history.push('/demo/paymentopts');
  //       } catch (e) {
  //         message.destroy();
  //         message.error("Couldn't perform the action");
  //         console.error(e);
  //       }
  //     }
  //   })
  // }),
  // graphql(EDIT_PAYMENT_OPT, {
  //   props: ({
  //     ownProps: {
  //       history,
  //       navigation
  //       // currentUser: { role }
  //     },
  //     mutate
  //   }) => ({
  //     editPaymentOpts: async values => {
  //       message.destroy();
  //       message.loading('Please wait...', 0);
  //       try {
  //         const input = removeTypename(values);
  //         input.reviewImages = Object.values(input.reviewImages);

  //         console.log('input', input);
  //         await mutate({
  //           variables: {
  //             input: input
  //           }
  //         });
  //         message.destroy();
  //         message.success('Changes Saved.');
  //         // if (history) {
  //         //   if (role === 'admin') return history.push('/demo/review');
  //         //   else return history.push('/my-paymentOpts');
  //         // }
  //         // if (navigation) {
  //         //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
  //         //   else return navigation.navigate('MyPaymentOpts');
  //         // }
  //       } catch (e) {
  //         message.destroy();
  //         message.error("Couldn't perform the action");
  //         console.error(e);
  //       }
  //     }
  //   })
  // }),
  graphql(DELETE_PAYMENT_OPT, {
    props: ({ mutate }) => ({
      deletePaymentOpts: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deletePaymentOpts: {
              id: id,
              __typename: 'PaymentOpts'
            }
          }
          //   ,
          //   update: (cache, { data: { deletePaymentOpts } }) => {
          //     // Get previous paymentOpts from cache
          //     const prevPaymentOpts = cache.readQuery({
          //       query: PAYMENT_OPTS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       }
          //     });

          //     const newListPaymentOpts = onDeleteListing(prevPaymentOpts, deleteListing.id);

          //     // Write paymentOpts to cache
          //     cache.writeQuery({
          //       query: PAYMENT_OPTS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       },
          //       data: {
          //         paymentOpts: {
          //           ...newListPaymentOpts.paymentOpts,
          //           __typename: 'PaymentOpts'
          //         }
          //       }
          //     });
          //   }
        });
        message.warning('PaymentOpts deleted.');
      }
    })
  })
)(PaymentOpts);
