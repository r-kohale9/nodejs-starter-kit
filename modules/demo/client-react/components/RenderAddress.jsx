import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Card, Row, Col, Button, Modal } from 'antd';
import { FieldArray, withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderCheckBox } from '@gqlapp/look-client-react';

import AddressForm from './AddressForm';

const RenderAddress = props => {
  const { addresses, values, history } = props;
  // const [visible, setVisible] = useState(addresses.map(() => false));

  // const handleShippingAddress = index => {
  //   values.addresses.map(address => (address.shippingAddress = false));
  //   console.log('index', values.addresses);
  //   values.addresses[index].shippingAddress = true;
  // };

  return (
    <Row>
      <Col span={24}>
        {addresses.map((address, index) => {
          return (
            <Card
              style={{
                marginBottom: '24px',
                // width: '164px',
                height: '140px',
                borderWidth: '0px',
                borderRadius: '8px'
              }}
              hoverable
              bodyStyle={{
                padding: '18px 23px 18px 28px'
              }}
            >
              <Row>
                <Col span={24}>
                  <Row type="flex" align="middle">
                    <Col span={16}>
                      <Row type="flex" justify="start">
                        {address.addressName}
                      </Row>
                    </Col>
                    {/* {console.log('visible', (visible[index] = true) && visible)} */}
                    <Col span={8}>
                      <Row type="flex" justify="end">
                        <Button
                          type="link"
                          style={{ color: '#DB3022' }}
                          onClick={() => history.push(`/demo/edit-shipping-address/${address.id}`)}
                          // onClick={() => setVisible(addresses.map((add, i) => i === index))}
                        >
                          Edit
                        </Button>
                        {/* <Modal
                          visible={visible[index]}
                          title={address.addressName}
                          okText="Save"
                          onCancel={() => setVisible(addresses.map(() => false))}
                          onOk={() => setVisible(addresses.map(() => false))}
                        >
                          <AddressForm values={values.addresses[index]} index={index} />
                        </Modal> */}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <p>{`${address.address}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
                </Col>
                <Col span={24}>
                  <Field
                    name={`addresses[${index}].shippingAddress`}
                    component={RenderCheckBox}
                    labelText="Use as the shipping address"
                    // onChange={() => handleShippingAddress(index)}
                    checked={values.addresses[index].shippingAddress}
                  />
                </Col>
              </Row>
            </Card>
          );
        })}
      </Col>
      {/* <div style={{ padding: '24px 0px 50px 0px', width: '100%' }}> */}
      <Col span={24}>
        <Row type="flex" justify="end">
          <Button
            shape="circle"
            icon="plus"
            type="primary"
            onClick={() => history.push('/demo/add-shipping-address')}
          />
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
        shippingAddress: address.shippingAddress
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
