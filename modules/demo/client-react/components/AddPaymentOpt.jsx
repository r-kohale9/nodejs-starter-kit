import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Row, Col } from 'antd';
import { Modal } from 'antd-mobile';
import { withFormik } from 'formik';

import { minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderCheckBox, RenderField } from '@gqlapp/look-client-react';

const AddCardbtn = styled(Button)`
  box-shadow: 0px 4px 8px rgba(252, 76, 76, 0.25);
  border-radius: 25px;
  height: 50px;
`;

const ModalBar = styled.div`
  margin: 15px 0px 24px 0px;
  width: 60px;
  height: 6px;
  background: #9b9b9b;
  border-radius: 3px;
`;

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
      <Button shape="circle" icon="plus" type="primary" onClick={() => setVisible(true)} />
      <Modal
        popup
        // wrapClassName="modal paymentOpt-height"
        visible={visible}
        onClose={() => setVisible(false)}
        animationType="slide-up"
        // afterClose={() => }
      >
        <Row type="flex" justify="center">
          <Col span={24}>
            <Row type="flex" justify="center">
              <ModalBar />
            </Row>
          </Col>
          <Col span={24}>
            <h3>Add new card</h3>
          </Col>
          <Col span={24} style={{ padding: '15px 16px 0px 16px' }}>
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
                <AddCardbtn type="danger" block onClick={handleSubmit}>
                  ADD CARD
                </AddCardbtn>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

AddPaymentOpt.propTypes = {
  values: PropTypes.object
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
    console.log('values1', values);
    // onSubmit();
  },
  validate: values => validate(values, AddPaymentOptFormSchema),
  displayName: 'AddPaymentOptForms' // helps with React DevTools
});

export default AddPaymentOptWithFormik(AddPaymentOpt);
