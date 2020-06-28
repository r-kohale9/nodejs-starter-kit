import React from 'react';
import { Row, Col } from 'antd';
import { PropTypes } from 'prop-types';

import PageLayout from './PageLayout';
import AddressForm from './AddressForm';

const AddShippingAddressView = props => {
  const { history, onSubmit } = props;
  return (
    <PageLayout history={history} title="Adding Shipping Addresses">
      <Row type="flex" justify="center">
        <Col span={24} style={{ maxWidth: '300px' }}>
          <AddressForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </PageLayout>
  );
};

AddShippingAddressView.propTypes = {
  history: PropTypes.object,
  onSubmit: PropTypes.func
};

export default AddShippingAddressView;
