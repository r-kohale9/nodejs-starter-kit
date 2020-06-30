import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingsWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import {
  withListings,
  updateListingsState,
  withCurrentUser
} from '@gqlapp/listing-client-react/containers/ListingOperations';
// import { USERS_QUERY } from '@gqlapp/user-client-react/graphql/UsersQuery.graphql';
import { withUsers } from '@gqlapp/user-client-react/containers/UserOperations';

import ListingCatalogueView from '../components/ListingCatalogueView';

import Avatar from '../Icons/userimage.svg';

import { HOMESLICK, CATEGORYICONSLICK } from './Slick';

const USER = {
  id: 1,
  name: 'Riya Rodriguez',
  email: 'muffin.sweet@gmail.com',
  thumbnail: Avatar,
  // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  ratting: 4.6,
  distance: 3,
  menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
  details:
    "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
};

const PROFILELIST = [
  {
    id: 1,
    title: 'My orders',
    details: '12 orders'
  },
  {
    id: 2,
    title: 'Delivery addresses',
    details: '3 ddresses'
  },
  {
    id: 3,
    title: 'Payment methods',
    details: 'Visa **34'
  },
  {
    id: 4,
    title: 'Promocodes',
    details: 'You have special promocodes'
  },
  {
    id: 5,
    title: 'My reviews',
    details: 'Reviews for 4 items'
  },
  {
    id: 6,
    title: 'Settings',
    details: 'Notifications, password'
  }
];

const ListingCatalogue = props => {
  console.log('props', props);

  return (
    <ListingCatalogueView
      {...props}
      user={USER}
      homeSlick={HOMESLICK}
      categorySlick={CATEGORYICONSLICK}
      profileList={PROFILELIST}
    />
  );
};

export default compose(
  // graphql(USERS_QUERY, {
  //   options: ({ orderBy, filter }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       variables: { orderBy, filter }
  //     };
  //   },
  //   props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
  //     return {
  //       loading,
  //       users,
  //       refetch,
  //       subscribeToMore,
  //       updateQuery,
  //       errors: error ? error.graphQLErrors : null
  //     };
  //   }
  // }),
  withCurrentUser,
  withUsers,
  translate('demo')
)(ListingCatalogue);
