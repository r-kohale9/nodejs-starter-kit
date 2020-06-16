import React from 'react';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import AddressForm from './AddressForm';

const AddShippingAddressView = props => {
  const { history } = props;
  return (
    <PageLayout history={history}>
      <AddressForm />
    </PageLayout>
  );
};

AddShippingAddressView.propTypes = {
  history: PropTypes.object
};

export default AddShippingAddressView;
