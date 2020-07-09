import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';

// import { withPaymentOpt, withCurrentUser, withEditPaymentOpt, updatePaymentOptState } from './PaymentOptOperations';

import EditPaymentOptView from '../components/EditPaymentOptView.web';
// import { usePaymentOptWithSubscription } from './withSubscriptions';
import PAYMENT_OPT_QUERY from '../graphql/PaymentOptQuery.graphql';
import EDIT_PAYMENT_OPT from '../graphql/EditPaymentOpt.graphql';

const EditPaymentOpt = props => {
  const { updateQuery, subscribeToMore, paymentOpt, history } = props;
  // const paymentOptUpdated = usePaymentOptWithSubscription(subscribeToMore, paymentOpt && paymentOpt.id);

  // useEffect(() => {
  //   if (paymentOptUpdated) {
  //     updatePaymentOptState(paymentOptUpdated, updateQuery, history);
  //   }
  // });
  console.log('props', props);
  return <EditPaymentOptView {...props} />;
};

EditPaymentOpt.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  paymentOpt: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  graphql(PAYMENT_OPT_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, paymentOpt, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, paymentOpt, subscribeToMore, updateQuery };
    }
  }),
  graphql(EDIT_PAYMENT_OPT, {
    props: ({
      ownProps: {
        history,
        navigation
        // currentUser: { role }
      },
      mutate
    }) => ({
      editPaymentOpt: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          // if (history) {
          //   if (role === 'admin') return history.push('/demo/paymentOpt');
          //   else return history.push('/my-paymentOpts');
          // }
          // if (navigation) {
          //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
          //   else return navigation.navigate('MyPaymentOpts');
          // }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  // withCurrentUser, withPaymentOpt, withEditPaymentOpt,
  translate('demo')
)(EditPaymentOpt);
