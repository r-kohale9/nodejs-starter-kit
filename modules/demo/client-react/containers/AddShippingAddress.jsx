import React from 'react';

import AddShippingAddressView from '../components/AddShippingAddressView';

const AddShippingAddress = props => {
  const handleSubmit = values => {
    console.log('values', values);
  };

  return <AddShippingAddressView {...props} onSubmit={handleSubmit} />;
};

export default AddShippingAddress;
