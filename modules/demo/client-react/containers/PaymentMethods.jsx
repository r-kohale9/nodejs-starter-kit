import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import TOGGLE_DEFAULT_PAYMENT_OPT from '../graphql/ToggleDefaultPaymentOpt.graphql';
import MY_PAYMENT_OPT_QUERY from '../graphql/MyPaymentOptQuery.graphql';

import ADD_PAYMENT_OPT from '../graphql/AddPaymentOpt.graphql';

import PaymentMethodsView from '../components/PaymentMethodsView';

const PaymentMethods = props => {
  const handleSubmit = values => {
    try {
      props.addPaymentOpt(values);
    } catch (e) {
      throw Error(e);
    }
    console.log('values', values);
  };
  console.log('props', props);
  return <PaymentMethodsView {...props} onSubmit={handleSubmit} />;
};

export default compose(
  graphql(MY_PAYMENT_OPT_QUERY, {
    props({ data: { loading, error, userPaymentOpt, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, paymentOpts: userPaymentOpt, subscribeToMore, refetch };
    }
  }),
  graphql(ADD_PAYMENT_OPT, {
    props: ({ ownProps: { history }, mutate }) => ({
      addPaymentOpt: async values => {
        console.log('adddemo', values);

        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addPaymentOpt: {
                __typename: 'Payment Opt',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Payment Opt added.');
          // console.log('adddemo', values);
          history.push('/demo/paymentopts');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  graphql(TOGGLE_DEFAULT_PAYMENT_OPT, {
    props: ({ mutate }) => ({
      toggleDefaultPaymentOpt: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            toggleDefaultPaymentOpt: {
              id,
              __typename: 'PaymentOpt'
            }
          },
          update: store => {
            // Get previous addresses from cache
            const { userPaymentOpt } = store.readQuery({
              query: MY_PAYMENT_OPT_QUERY,
              variables: { id }
            });
            // Write addresses to cache
            userPaymentOpt[userPaymentOpt.indexOf(userPaymentOpt.filter(ad => ad.default === true)[0])].default = false;
            userPaymentOpt[userPaymentOpt.indexOf(userPaymentOpt.filter(ad => ad.id === id)[0])].default = true;
            store.writeQuery({
              query: MY_PAYMENT_OPT_QUERY,
              data: {
                userPaymentOpt,
                __typename: 'PaymentOpt'
              }
            });
          }
        });
        message.success('Default changed');
      }
    })
  }),
  translate('demo')
)(PaymentMethods);
