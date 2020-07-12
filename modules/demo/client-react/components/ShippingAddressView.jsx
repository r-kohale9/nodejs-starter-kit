import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import PageLayout from './PageLayout';
import RenderAddress from './RenderAddress';

const ShippingAddressView = props => {
  const { loading, addresses, history, toggleDefault } = props;
  return (
    <PageLayout history={history} title="Shipping Addresses">
      {!loading && addresses.length > 0 && (
        <RenderAddress label="addresses" addresses={addresses} history={history} toggleDefault={toggleDefault} />
      )}
    </PageLayout>
  );
};

ShippingAddressView.propTypes = {
  addresses: PropTypes.array,
  history: PropTypes.object
};

export default ShippingAddressView;
