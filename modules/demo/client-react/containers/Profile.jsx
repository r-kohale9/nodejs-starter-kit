import React from 'react';

import ProfileView from '../components/ProfileView';

import Avatar from '../Icons/userimage.svg';

const USER = {
  name: 'Katrina',
  email: 'muffin.sweet@gmail.com',
  thumbnail: Avatar
};

const MENU = [
  {
    id: 1,
    title: 'My orders',
    details: '12 orders',
    link: '/demo/my-orders'
  },
  {
    id: 2,
    title: 'Delivery addresses',
    details: '3 ddresses',
    link: '/demo/shipping-address'
  },
  {
    id: 3,
    title: 'Payment methods',
    details: 'Visa **34',
    link: '/demo/payment-methods'
  },
  {
    id: 4,
    title: 'Promocodes',
    details: 'You have special promocodes',
    link: '/demo/promocodes'
  },
  {
    id: 5,
    title: 'My reviews',
    details: 'Reviews for 4 items',
    link: '/demo/reviews'
  },
  {
    id: 6,
    title: 'Settings',
    details: 'Notifications, password',
    link: '/demo/settings'
  }
];

const Profile = props => {
  return <ProfileView {...props} user={USER} menu={MENU} />;
};

export default Profile;
