import React from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ORDER_QUERY from '@gqlapp/order-client-react/graphql/OrderQuery.graphql';
import DeliveryDetailsView from '../components/DeliveryDetailsView';

const DeliveryDetails = props => {
  console.log('props', props);
  return <DeliveryDetailsView {...props} />;
};
export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(ORDER_QUERY, {
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
    props({ data: { loading, error, order, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, order, subscribeToMore, updateQuery };
    }
  })
)(DeliveryDetails);
