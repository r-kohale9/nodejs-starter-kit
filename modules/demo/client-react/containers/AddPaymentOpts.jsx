import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_REVIEW from '../graphql/AddPaymentOpt.graphql';

import AddPaymentOptView from '../components/AddPaymentOptView.web';
// import { withAddPaymentOpt } from './PaymentOptOperations';

const AddPaymentOpt = props => {
  console.log('props', props);
  return <AddPaymentOptView {...props} />;
};

export default compose(
  // withAddPaymentOpt,
  graphql(ADD_REVIEW, {
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
  translate('demo')
)(AddPaymentOpt);
