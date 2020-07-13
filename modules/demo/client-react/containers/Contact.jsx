import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';

import MY_ADDRESS_QUERY from '@gqlapp/addresses-client-react/graphql/MyAddressQuery.graphql';
import ContactView from '../components/ContactView';
import { USER, ADDRESS } from './Data';

const Contact = props => {
  console.log('props', props);
  return <ContactView {...props} />;
};

export default compose(
  graphql(MY_ADDRESS_QUERY, {
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
    props({ data: { loading, error, userAddress, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, addresses: userAddress, subscribeToMore, refetch };
    }
  }),
  graphql(USER_QUERY, {
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
    props({ data: { loading, user } }) {
      const userPayload = user ? { user: user.user } : {};
      return {
        loading,
        ...userPayload
      };
    }
  })
)(Contact);
