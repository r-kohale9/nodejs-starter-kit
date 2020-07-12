import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import TOGGLE_DEFAULT_ADDRESS from '@gqlapp/addresses-client-react/graphql/ToggleDefaultAddress.graphql';
import MY_ADDRESS_QUERY from '@gqlapp/addresses-client-react/graphql/MyAddressQuery.graphql';

import ShippingAddressView from '../components/ShippingAddressView';

const ShippingAddress = props => {
  console.log('props', props);
  return <ShippingAddressView {...props} />;
};

export default compose(
  graphql(MY_ADDRESS_QUERY, {
    props({ data: { loading, error, userAddress, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, addresses: userAddress, subscribeToMore, refetch };
    }
  }),
  graphql(TOGGLE_DEFAULT_ADDRESS, {
    props: ({ mutate }) => ({
      toggleDefault: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            toggleDefault: {
              id,
              __typename: 'Addresses'
            }
          },
          update: store => {
            // Get previous addresses from cache
            const { userAddress } = store.readQuery({
              query: MY_ADDRESS_QUERY,
              variables: { id }
            });
            // Write addresses to cache
            userAddress[userAddress.indexOf(userAddress.filter(ad => ad.default === true)[0])].default = false;
            userAddress[userAddress.indexOf(userAddress.filter(ad => ad.id === id)[0])].default = true;
            store.writeQuery({
              query: MY_ADDRESS_QUERY,
              data: {
                userAddress,
                __typename: 'Address'
              }
            });
          }
        });
        message.warning('Default changed');
      }
    })
  }),
  translate('demo')
)(ShippingAddress);
