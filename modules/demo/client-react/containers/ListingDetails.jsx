import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { message } from 'antd';

import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';

import {
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withListingBookmarkStatus,
  updateListingState
} from '@gqlapp/listing-client-react/containers/ListingOperations';

import { useListingWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import ADD_TO_CART from '@gqlapp/order-client-react/graphql/AddToCart.graphql';

import ListingDetailsView from '../components/ListingDetailsView';

import { FLAVOURS, WEIGHTS } from './Constants';

const ListingDetails = props => {
  const { updateQuery, subscribeToMore, listing, history, currentUser } = props;
  const listingsUpdated = useListingWithSubscription(subscribeToMore, listing && listing.id);

  useEffect(() => {
    if (listingsUpdated) {
      updateListingState(listingsUpdated, updateQuery, history);
    }
  });

  const bookmarkListing = async id => {
    try {
      await props.addOrRemoveListingBookmark(id, currentUser.id);
    } catch (e) {
      throw Error(e);
    }
  };

  const handleSubmit = async values => {
    console.log('values', values);
    const obj = {
      consumerId: 1,
      orderDetail: {
        // flavour: values.flavour,
        weight: values.weight,
        unit: values.unit,
        listingId: values.listingId
      }
    };
    try {
      await props.addToCart(obj);
    } catch (e) {
      message.error('Failed!');
      console.log(e);
      // throw new FormError('Failed!', e);
    }

    // Add Message
    message.success('Success! Complete your Order.');
  };
  console.log('props', props);
  return (
    <ListingDetailsView
      {...props}
      handleBookmark={bookmarkListing}
      flavours={FLAVOURS}
      weights={WEIGHTS}
      onSubmit={handleSubmit}
    />
  );
};

ListingDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  navigation: PropTypes.object,
  addOrRemoveListingBookmark: PropTypes.func
};

export default compose(
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withListingBookmarkStatus,
  graphql(USER_QUERY, {
    options: props => {
      let id = 0;
      id = props.listing ? props.listing.userId : id;
      return {
        variables: { id: id }
      };
    },
    props({ data: { loading, error, user } }) {
      if (error) throw new Error(error);
      return { loading, user };
    }
  }),
  graphql(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: async values => {
        console.log('mutation start', values);
        await mutate({
          variables: {
            input: values
          }
        });
        console.log(values, 'mutation called');
      }
    })
  })
)(ListingDetails);
