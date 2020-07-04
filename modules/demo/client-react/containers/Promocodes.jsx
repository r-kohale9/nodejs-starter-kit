import React from 'react';

import PromocodesView from '../components/PromocodesView';
import { PROMOCODES } from './Data';

const Promocodes = props => {
  const handleSubmit = value => {
    console.log('promo', value);
  };
  return <PromocodesView {...props} promocodes={PROMOCODES} onSubmit={handleSubmit} />;
};

export default Promocodes;
