import React from 'react';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import AddressForm from './AddressForm';

const EditShippingAddressView = props => {
  const { history, address, onSubmit } = props;
  return (
    <PageLayout history={history} title="Editing Shipping Addresses">
      <AddressForm address={address} onSubmit={onSubmit} />
    </PageLayout>
  );
};

EditShippingAddressView.propTypes = {
  history: PropTypes.object,
  address: PropTypes.object
};

export default EditShippingAddressView;