import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingListWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import {
  updateMyListingsState,
  withCurrentUser,
  withListingsStateQuery,
  withUserListingPagination,
  withUpdateListingsFilter
} from '@gqlapp/listing-client-react/containers/ListingOperations';

import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';

import BakerView from '../components/BakerView';

import { CATEGORYICONSLICK } from './Slick';

const Baker = props => {
  const { updateQuery, subscribeToMore } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <BakerView {...props} categorySlick={CATEGORYICONSLICK} />;
};

Baker.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  userListings: PropTypes.object
};

export default compose(
  withCurrentUser,
  withListingsStateQuery,
  withUpdateListingsFilter,
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
    props({ data: { loading, error, user } }) {
      if (error) throw new Error(error);
      return { loading, baker: user && user.user };
    }
  }),
  withUserListingPagination,
  translate('demo')
)(Baker);
