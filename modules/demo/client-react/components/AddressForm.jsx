import React from 'react';
import { Form, Card, Row, Col, Button } from 'antd';
import { withFormik } from 'formik';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { PropTypes } from 'prop-types';

const addressFormSchema = {
  addressName: [required],
  shippingAddress: [required],
  city: [required],
  state: [required],
  pinCode: [required]
};

const AddressForm = props => {
  const { values, handleSubmit } = props;
  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '70px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              // height: '64px',
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field
              name="addressName"
              component={RenderField}
              type="text"
              // label="Address name"
              value={values.addressName}
            />
          </Card>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '100px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field
              name="shippingAddress"
              component={RenderField}
              type="text"
              label="Address"
              value={values.shippingAddress}
            />
          </Card>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '100px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field name="city" component={RenderField} type="text" label="City" value={values.city} />
          </Card>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '100px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field
              name="state"
              component={RenderField}
              type="text"
              label="State/Province/Region"
              value={values.state}
            />
          </Card>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '100px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field
              name="pinCode"
              component={RenderField}
              type="text"
              label="Zip Code (Postal Code)"
              value={values.pinCode}
            />
          </Card>
          <Card
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
              marginBottom: '20px',
              height: '100px',
              borderWidth: '0px',
              borderRadius: '4px'
            }}
            bodyStyle={{
              padding: '14px 20px 14px 20px'
            }}
          >
            <Field name="country" component={RenderField} type="text" label="Country" value={values.country} />
          </Card>
        </Form>
      </Col>
      <div style={{ padding: '20px 0px 80px 0px', width: '100%' }}>
        <Col span={24}>
          <Button type="primary" size="lg" block onClick={() => handleSubmit(values)}>
            SAVE ADDRESS
          </Button>
        </Col>
      </div>
    </Row>
  );
};

AddressForm.propTypes = {
  values: PropTypes.object,
  address: PropTypes.object,
  handleSubmit: PropTypes.func
};

const AddressFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.address && props.address.id ? props.address.id : null,
    addressName: (props.address && props.address.addressName) || '',
    shippingAddress: (props.address && props.address.shippingAddress) || '',
    city: (props.address && props.address.city) || '',
    state: (props.address && props.address.state) || '',
    pinCode: (props.address && props.address.pinCode) || '',
    country: (props.address && props.address.country) || ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  validate: values => validate(values, addressFormSchema),
  displayName: 'Forms' // helps with React DevTools
});

export default AddressFormWithFormik(AddressForm);
