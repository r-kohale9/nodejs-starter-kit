import React from 'react';

import ContactView from '../components/ContactView';
import Avatar from '../Icons/userimage.svg';

const USER = {
  id: 1,
  name: 'Riya Rodriguez',
  thumbnail: Avatar,
  // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  rating: 4.6,
  distance: 3,
  menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
  mail: 'riya@homebakers.com',
  phone: '+91 88888 9999',
  watsapp: '+91 88888 99999',
  details:
    "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
};

const ADDRESS = {
  id: 1,
  addressName: 'Katrina',
  address: '22nd Cross Rd, Sector 2 HSR Layout',
  city: 'Bengaluru',
  state: 'Karnataka',
  pinCode: '560102',
  country: 'India',
  shippingAddress: true
};

const Contact = props => {
  return <ContactView {...props} user={USER} address={ADDRESS} />;
};

export default Contact;
