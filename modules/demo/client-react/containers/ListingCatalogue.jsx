import React from 'react';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { useListingsWithSubscription } from '@gqlapp/listing-client-react/containers/withSubscriptions';
import {
  withListings,
  updateListingsState,
  withCurrentUser
} from '@gqlapp/listing-client-react/containers/ListingOperations';
import { withUsers } from '@gqlapp/user-client-react/containers/UserOperations';

import ListingCatalogueView from '../components/ListingCatalogueView';

import Avatar from '../Icons/userimage.svg';

import Banner from '../Icons/MangoCakes.svg';
import Cakes from '../Icons/cakes.svg';
import Cupcakes from '../Icons/cupcakes.svg';
import Pastries from '../Icons/pastries.svg';
import Bread from '../Icons/bread.svg';
import Chocolate from '../Icons/chocolate.svg';

const HOMESLICK = [
  {
    thumbnail: Banner
  },
  {
    thumbnail: Banner
  },
  {
    thumbnail: Banner
  }
];

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

const CATEGORYSLICK = [
  {
    icon: Cakes,
    category: 'Cakes'
  },
  {
    icon: Cupcakes,
    category: 'Cupcakes'
  },
  {
    icon: Pastries,
    category: 'Pastries'
  },
  {
    icon: Bread,
    category: 'Bread'
  },
  {
    icon: Chocolate,
    category: 'Chocolate'
  }
];

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
      categorySlick={CATEGORYSLICK}
      profileList={PROFILELIST}
    />
  );
};

export default compose(withCurrentUser, withUsers, withListings, translate('demo'))(ListingCatalogue);
