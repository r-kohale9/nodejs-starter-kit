import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Card, Rate, Row, Col } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderCheckBox, Button } from '@gqlapp/look-client-react';

const AddPaymentOptFormSchema = {
  owner: [required],
  cardNumber: [required],
  expiryDate: [required]
};
const PaymentOptFormComponent = props => {
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
          name="owner"
          component={RenderField}
          type="text"
          placeholder="Name on card"
          // label="Name on card"
          value={values.owner}
        />
        <Field
          name="cardNumber"
          component={RenderField}
          type="text"
          placeholder="Card number"
          // label="Card number"
          value={values.cardNumber}
        />
        <Field
          name="expiryDate"
          component={RenderField}
          type="text"
          placeholder="Expiry date"
          // label="Expiry date"
          value={values.expiryDate}
        />
        <Row type="flex" justify="start">
          <Field
            name="default"
            component={RenderCheckBox}
            labelText="Use as the shipping address"
            // onChange={() => handleShippingAddress(index)}
            checked={values.default}
          />
        </Row>
        <Button color="primary" type="submit" disabled={!dirty}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

PaymentOptFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const PaymentOptWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: props.paymentOpt && props.paymentOpt.id ? props.paymentOpt.id : null,
      owner: (props.paymentOpt && props.paymentOpt.owner) || '',
      cardNumber: (props.paymentOpt && props.paymentOpt.cardNumber) || '',
      expiryDate: (props.paymentOpt && props.paymentOpt.expiryDate) || '',
      default: (props.paymentOpt && props.paymentOpt.default) || false
    };
  },
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
  validate: values => validate(values, AddPaymentOptFormSchema),
  displayName: 'PaymentOpt Form' // helps with React DevTools
});

export default PaymentOptWithFormik(PaymentOptFormComponent);
