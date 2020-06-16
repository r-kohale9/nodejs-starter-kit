import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import PageLayout from './PageLayout';
import RenderAddress from './RenderAddress';

const ShippingAddressView = props => {
  const { addresses, history } = props;
  return (
    <PageLayout history={history}>
      <RenderAddress label="addresses" addresses={addresses} history={history} />
    </PageLayout>
  );
};

ShippingAddressView.propTypes = {
  addresses: PropTypes.array,
  history: PropTypes.object
};

export default ShippingAddressView;
