import { FunctionComponent } from 'react';
import { graphql } from 'react-apollo';

import { Message } from '@gqlapp/look-client-react';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

// Query
import GET_DEFAULT_ADDRESS_ID_QUERY from '../graphql/GetDefaultAddressIdQuery.graphql';
import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';

// Mutation
import SET_DEFAULT_ADDRESS from '../graphql/SetDefaultAddress.graphql';
import ADD_OR_EDIT_ADDRESS from '../graphql/AddOrEditAddress.graphql';
import DELETE_ADDRESS from '../graphql/DeleteAddress.graphql';

// types
import { AddressInput } from '../../../../packages/server/__generated__/globalTypes';
import {
  getDefaultAddressId as getDefaultAddressIdResponse,
  getDefaultAddressIdVariables
} from '../graphql/__generated__/getDefaultAddressId';
import { addresses as addressesResponse, addressesVariables } from '../graphql/__generated__/addresses';
import {
  addOrEditAddress as addOrEditAddressResponse,
  addOrEditAddressVariables
} from '../graphql/__generated__/addOrEditAddress';
import {
  setDefaultAddress as setDefaultAddressResponse,
  setDefaultAddressVariables
} from '../graphql/__generated__/setDefaultAddress';
import { deleteAddress as deleteAddressResponse, deleteAddressVariables } from '../graphql/__generated__/deleteAddress';

// Query
export const withGetDefaultAddressId = (Component: FunctionComponent) =>
  graphql<{ currentUser: CurrentUser }, getDefaultAddressIdResponse, getDefaultAddressIdVariables, {}>(
    GET_DEFAULT_ADDRESS_ID_QUERY,
    {
      options: props => {
        return { variables: { userId: props.currentUser && props.currentUser.id } };
      },
      props({ data: { loading, error, getDefaultAddressId, subscribeToMore } }) {
        if (error) {
          throw new Error(error.message);
        }
        return { loading, getDefaultAddressId, subscribeToMore };
      }
    }
  )(Component);

export const withAddresses = (Component: FunctionComponent) =>
  graphql<{ currentUser: CurrentUser }, addressesResponse, addressesVariables, {}>(ADDRESSES_QUERY, {
    options: props => {
      return { variables: { id: props.currentUser && props.currentUser.id } };
    },
    props({ data: { loading, error, addresses, subscribeToMore } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, addresses, subscribeToMore };
    }
  })(Component);

// Mutation
export const withAddOrEditAddress = (Component: FunctionComponent) =>
  graphql<{ currentUser: CurrentUser }, addOrEditAddressResponse, addOrEditAddressVariables, {}>(ADD_OR_EDIT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      addOrEditAddresses: async (values: AddressInput) => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          values.userId = currentUser && currentUser.id;
          values.pinCode = Number(values.pinCode);
          const {
            data: { addOrEditAddress }
          } = await mutate({
            variables: {
              input: values
            }
          });
          Message.destroy();
          Message.success(addOrEditAddress);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withSetDefaultAddress = (Component: FunctionComponent) =>
  graphql<{ currentUser: CurrentUser }, setDefaultAddressResponse, setDefaultAddressVariables, {}>(
    SET_DEFAULT_ADDRESS,
    {
      props: ({ mutate, ownProps: { currentUser } }) => ({
        setDefaultAddress: async (id: number) => {
          Message.destroy();
          Message.loading('Please wait...', 0);
          try {
            await mutate({
              variables: {
                userId: currentUser && currentUser.id,
                id
              }
            });
            Message.destroy();
            Message.success('Default Changed!');
          } catch (e) {
            Message.destroy();
            Message.error("Couldn't perform the action");
            console.error(e);
          }
        }
      })
    }
  )(Component);

export const withDeleteAddress = (Component: FunctionComponent) =>
  graphql<{}, deleteAddressResponse, deleteAddressVariables, {}>(DELETE_ADDRESS, {
    props: ({ mutate }) => ({
      deleteAddress: (id: number) => {
        mutate({
          variables: { id }
        });
        Message.warning('Address deleted.');
      }
    })
  })(Component);
