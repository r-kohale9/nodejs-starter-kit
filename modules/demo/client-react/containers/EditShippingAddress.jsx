import React from 'react';

import EditShippingAddressView from '../components/EditShippingAddressView';
import { ADDRESS } from './Data';

const EditShippingAddress = props => {
  return <EditShippingAddressView {...props} address={ADDRESS} />;
};

export default EditShippingAddress;
