import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card, Rate } from 'antd';
import { withFormik } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, Button } from '@gqlapp/look-client-react';

const addressFormSchema = {
  addressName: [required],
  shippingAddress: [required],
  city: [required],
  state: [required],
  pinCode: [required]
};
const AddressFormComponent = props => {
  const { dirty, cardTitle, values, handleSubmit } = props;
  return (
    <Card
      title={
        <h1>
          <strong>{cardTitle}</strong>
        </h1>
      }
    >
      <Form onSubmit={handleSubmit}>
        <Field
          name="addressName"
          component={RenderField}
          type="text"
          // label="Address name"
          value={values.addressName}
        />
        <Field
          name="shippingAddress"
          component={RenderField}
          type="text"
          label="Address"
          value={values.shippingAddress}
        />
        <Field name="city" component={RenderField} type="text" label="City" value={values.city} />
        <Field name="state" component={RenderField} type="text" label="State/Province/Region" value={values.state} />
        <Field
          name="pinCode"
          component={RenderField}
          type="text"
          label="Zip Code (Postal Code)"
          value={values.pinCode}
        />
        <Field name="country" component={RenderField} type="text" label="Country" value={values.country} />
        <Button color="primary" type="submit" disabled={!dirty}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

AddressFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const AddressWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.address && props.address.id ? props.address.id : null,
    userId: (props.address && props.address.userId) || '',
    addressName: (props.address && props.address.addressName) || '',
    shippingAddress: (props.address && props.address.shippingAddress) || '',
    city: (props.address && props.address.city) || '',
    state: (props.address && props.address.state) || '',
    pinCode: (props.address && props.address.pinCode) || '',
    country: (props.address && props.address.country) || ''
  }),
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    console.log('on submit called');
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, addressFormSchema),
  displayName: 'Address Form' // helps with React DevTools
});

export default AddressWithFormik(AddressFormComponent);
