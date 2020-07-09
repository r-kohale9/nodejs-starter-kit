import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';

// import { withAddress, withCurrentUser, withEditAddress, updateAddressState } from './AddressOperations';

import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';
import EditAddressView from '../components/EditAddressView.web';
// import { useAddressWithSubscription } from './withSubscriptions';
import ADDRESS_QUERY from '../graphql/AddressQuery.graphql';

const EditAddress = props => {
  const { updateQuery, subscribeToMore, address, history } = props;
  // const addresssUpdated = useAddressWithSubscription(subscribeToMore, address && address.id);

  // useEffect(() => {
  //   if (addresssUpdated) {
  //     updateAddressState(addresssUpdated, updateQuery, history);
  //   }
  // });
  console.log('props', props);
  return <EditAddressView {...props} />;
};

EditAddress.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  address: PropTypes.object,
  history: PropTypes.object
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
)(EditAddress);
