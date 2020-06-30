import React from 'react';

import PromocodesView from '../components/PromocodesView';
import Discount from '../Icons/discount.png';

const PROMOCODES = [
  {
    id: 1,
    thumbnail: Discount,
    title: 'Personal offer',
    promocode: 'mypromocode2020',
    validity: '6 days remaining'
  },
  {
    id: 2,
    thumbnail: Discount,
    title: 'Mealting summer',
    promocode: 'summer2020',
    validity: '23 days remaining'
  }
];

const Promocodes = props => {
  const handleSubmit = value => {
    console.log('promo', value);
  };
  return <PromocodesView {...props} promocodes={PROMOCODES} onSubmit={handleSubmit} />;
};

export default Promocodes;
