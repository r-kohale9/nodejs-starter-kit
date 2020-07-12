import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';

// import { withAddress, withCurrentUser, withEditAddress, updateAddressState } from './AddressOperations';

import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';
import ADDRESS_QUERY from '../graphql/AddressQuery.graphql';

import EditShippingAddressView from '../components/EditShippingAddressView';

const EditShippingAddress = props => {
  const handleSubmit = async values => {
    try {
      await props.addOrEditAddresses(values);
    } catch (e) {
      throw Error(e);
    }
  };
  console.log('props', props);
  return <EditShippingAddressView {...props} onSubmit={handleSubmit} />;
};

export default compose(
  graphql(ADDRESS_QUERY, {
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
    props({ data: { loading, error, address, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, address, subscribeToMore, updateQuery };
    }
  }),
  graphql(ADD_OR_EDIT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      addOrEditAddresses: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          values.pinCode = Number(values.pinCode);
          let input = removeTypename(values);
          input.id = values.id;
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
)(EditShippingAddress);
