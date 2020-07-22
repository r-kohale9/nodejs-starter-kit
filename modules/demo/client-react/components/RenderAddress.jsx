import React from 'react';
import { PropTypes } from 'prop-types';
import { List, Row, Col, Button } from 'antd';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

import { RenderCheckBox } from '@gqlapp/look-client-react';

import AddressCardComponent from './AddressCardComponent';

const RenderAddress = props => {
  const { addresses, values, history, toggleDefault } = props;

  const handleShippingAddress = id => {
    try {
      toggleDefault(id);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3
          }}
          dataSource={addresses && addresses.length !== 0 && addresses}
          renderItem={(address, index) => (
            <List.Item>
              <AddressCardComponent
                address={address}
                index={index}
                btnTitle="Edit"
                handleBtn={() => history.push(`/demo/edit-shipping-address/${address.id}`)}
                extra={
                  <Field
                    name={`addresses[${index}].default`}
                    component={RenderCheckBox}
                    labelText="Use as the shipping address"
                    onChange={() => handleShippingAddress(address.id)}
                    checked={values.addresses[index].default}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Col>
      {/* <div style={{ padding: '24px 0px 50px 0px', width: '100%' }}> */}
      <Col span={24}>
        <Row type="flex" justify="end">
          <Button shape="circle" icon="plus" type="black" onClick={() => history.push('/demo/add-shipping-address')} />
        </Row>
      </Col>
      {/* </div> */}
    </Row>
  );
};

RenderAddress.propTypes = {
  addresses: PropTypes.array,
  values: PropTypes.object,
  history: PropTypes.object
};

const RenderAddressWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: values => {
    const { addresses } = values;
    function getAddresses(address) {
      return {
        default: address.default
      };
    }

    return {
      addresses: addresses && addresses.length !== 0 ? addresses.map(getAddresses) : []
    };
  },
  async handleSubmit(
    values // , { props: { addOrEditAddresses } }
  ) {
    console.log('values', values);
    // try {
    //   await addOrEditAddresses(values);
    // } catch (e) {
    //   console.log(e);
    // }
  },
  displayName: 'RenderAddress ' // helps with React DevTools
});

export default RenderAddressWithFormik(RenderAddress);