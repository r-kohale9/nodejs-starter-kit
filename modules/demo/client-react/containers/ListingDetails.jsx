import React from 'react';

import ListingDetailsView from '../components/ListingDetailsView';

import { FLAVOURS, WEIGHTS } from './Constants';
import { LISTING } from './Data';

const ListingDetails = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return (
    <ListingDetailsView {...props} listing={LISTING} flavours={FLAVOURS} weights={WEIGHTS} onSubmit={handleSubmit} />
  );
};

export default ListingDetails;
