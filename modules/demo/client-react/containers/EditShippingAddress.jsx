import React from 'react';

import EditShippingAddressView from '../components/EditShippingAddressView';

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

const EditShippingAddress = props => {
  return <EditShippingAddressView {...props} address={ADDRESS} />;
};

export default EditShippingAddress;
