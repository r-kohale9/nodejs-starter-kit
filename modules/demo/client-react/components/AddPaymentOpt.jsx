import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import { withFormik } from 'formik';

import { required, validate } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderCheckBox, RenderField } from '@gqlapp/look-client-react';

import ModalComponent from './ModalComponent';

const AddPaymentOptFormSchema = {
  nameOnCard: [required],
  cardNumber: [required],
  expireDate: [required],
  cvv: [required]
};

const AddPaymentOpt = props => {
  const [visible, setVisible] = useState(false);
  const { values, handleSubmit } = props;
  return (
    <>
      <Button type="black" shape="circle" icon="plus" onClick={() => setVisible(true)} />
      <ModalComponent
        title="Add new card"
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Field
              name="nameOnCard"
              component={RenderField}
              type="text"
              placeholder="Name on card"
              // label="Name on card"
              value={values.nameOnCard}
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
              name="expireDate"
              component={RenderField}
              type="text"
              placeholder="Expiry date"
              // label="Expiry date"
              value={values.expireDate}
            />
            <Field
              name="cvv"
              component={RenderField}
              type="text"
              placeholder="CVV"
              // label="CVV"
              value={values.cvv}
            />
            <Row type="flex" justify="start">
              <Field
                name="defaultCard"
                component={RenderCheckBox}
                labelText="Use as the shipping address"
                // onChange={() => handleShippingAddress(index)}
                checked={values.defaultCard}
              />
            </Row>
            <div style={{ paddingBottom: '50px' }}>
              <Button type="primary" size="lg" block onClick={handleSubmit}>
                ADD CARD
              </Button>
            </div>
          </Form>
        </Col>
      </ModalComponent>
    </>
  );
};

AddPaymentOpt.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func
};

const AddPaymentOptWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.paymentOpts && props.paymentOpts.id ? props.paymentOpts.id : null,
    nameOnCard: (props.paymentOpts && props.paymentOpts.nameOnCard) || '',
    cardNumber: (props.paymentOpts && props.paymentOpts.cardNumber) || '',
    expireDate: (props.paymentOpts && props.paymentOpts.expireDate) || '',
    cvv: (props.paymentOpts && props.paymentOpts.cvv) || '',
    defaultCard: (props.paymentOpts && props.paymentOpts.defaultCard) || false
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    // console.log('values1', values);
    onSubmit(values);
  },
  validate: values => validate(values, AddPaymentOptFormSchema),
  displayName: 'AddPaymentOptForms' // helps with React DevTools
});

export default AddPaymentOptWithFormik(AddPaymentOpt);
