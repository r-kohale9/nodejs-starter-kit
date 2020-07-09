import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose, removeTypename } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';

import AddAddressView from '../components/AddAddressView.web';
// import { withAddAddress } from './AddressOperations';

const AddAddress = props => {
  console.log('props', props);
  return <AddAddressView {...props} />;
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  graphql(ADD_OR_EDIT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      addOrEditAddresses: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          values.userId = currentUser && currentUser.id;
          values.pinCode = Number(values.pinCode);
          let input = removeTypename(values);
          input.id = Object.keys(input.id).length === 0 && null;
          console.log('values', input);
          const {
            data: { addOrEditAddress }
          } = await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success(addOrEditAddress);
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('demo')
)(AddAddress);
