import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ADD_PROMOCODE from '../graphql/AddPromoCode.graphql';

import AddPromoCodeView from '../components/AddPromoCodeView.web';
// import { withAddPromoCode } from './PromoCodeOperations';

const AddPromoCode = props => {
  console.log('props', props);
  return <AddPromoCodeView {...props} />;
};

export default compose(
  // withAddPromoCode,
  graphql(ADD_PROMOCODE, {
    props: ({ ownProps: { history }, mutate }) => ({
      addPromoCode: async values => {
        console.log('addreview', values);

        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addPromoCode: {
                __typename: 'PromoCode',
                ...values
              }
            }
          });

          message.destroy();
          message.success('PromoCode added.');
          history.push('/demo/promocodes');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('demo')
)(AddPromoCode);
