import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import { PageLayout } from '@gqlapp/look-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';
import ADD_OR_EDIT_ADDRESS from '../graphql/AddOrEditAddress.graphql';
import DELETE_ADDRESS from '../graphql/DeleteAddress.graphql';

import AddressesView from '../components/AddressesView';

// const addresses = [
//   {
//     id: 1,
//     streetAddress1: 'Devgiri boys hostel',
//     streetAddress2: 'Sinhgad central library',
//     city: 'Pune',
//     state: 'Maharashtra',
//     pinCode: 411041
//   },
//   {
//     id: 2,
//     streetAddress1: 'Devgiri boys hostel',
//     streetAddress2: 'Sinhgad central library',
//     city: 'Pune',
//     state: 'Maharashtra',
//     pinCode: 411041
//   }
// ];

class Addresses extends React.Component {
  render() {
    console.log('props', this.props);
    return <PageLayout>{!this.props.loading && <AddressesView {...this.props} />}</PageLayout>;
  }
}

Addresses.propTypes = {
  loading: PropTypes.bool
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
  graphql(ADDRESSES_QUERY, {
    options: props => {
      return { variables: { id: props.currentUser && props.currentUser.id } };
    },
    props({ data: { loading, error, addresses } }) {
      if (error) throw new Error(error);
      return { loading, addresses };
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
          const input = removeTypename(values);
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
  graphql(DELETE_ADDRESS, {
    props: ({ mutate }) => ({
      deleteAddress: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteAddress: {
              id,
              __typename: 'Addresses'
            }
          }
          // ,

          // update: store => {
          //   // Get previous events from cache
          //   const prevEvents = store.readQuery({ query: EVENTS_QUERY });
          //   // Write events to cache

          //   store.writeQuery({
          //     query: EVENTS_QUERY,
          //     data: { events: prevEvents.events.filter(event => event.id !== id), __typename: 'Events' }
          //   });
          // }
        });
        message.warning('Address deleted.');
      }
    })
  }),
  translate('addresses')
)(Addresses);
