import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Row, Col } from 'antd';
import { Modal } from 'antd-mobile';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';
import { match, minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';

import settings from '@gqlapp/config';

const ForgetPass = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  color: #9b9b9b;
`;

const SavePassbtn = styled(Button)`
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

const PasswordChangeModalFormSchema = {
  oldPassword: [required],
  newPassword: [required, minLength(settings.auth.password.minLength)],
  repeatOldPassword: [required, match('New password'), minLength(settings.auth.password.minLength)]
};

const PasswordChangeModal = props => {
  const [visible, setVisible] = useState(false);
  const { values, handleSubmit } = props;

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        Change
      </Button>
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
            <h3>Password Change</h3>
          </Col>
          <Col span={24} style={{ padding: '15px 16px 0px 16px' }}>
            <Form>
              <Field
                name="oldPassword"
                component={RenderField}
                type="text"
                placeholder="Old password"
                // label="Old password"
                value={values.oldPassword}
              />
              <Row type="flex" justify="end">
                <ForgetPass to="/demo/forgotpassword">Forget password?</ForgetPass>
              </Row>
              <Field
                name="newPassword"
                component={RenderField}
                type="text"
                placeholder="New password"
                // label="New password"
                value={values.newPassword}
              />
              <Field
                name="repeatOldPassword"
                component={RenderField}
                type="text"
                placeholder="Repeat new password"
                // label="Repeat new password"
                value={values.repeatOldPassword}
              />
              <div style={{ paddingBottom: '50px' }}>
                <SavePassbtn type="danger" block onClick={handleSubmit}>
                  SAVE PASSWORD
                </SavePassbtn>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

PasswordChangeModal.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func
};

const PasswordChangeModalWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.paymentOpts && props.paymentOpts.id ? props.paymentOpts.id : null,
    oldPassword: (props.paymentOpts && props.paymentOpts.oldPassword) || '',
    newPassword: (props.paymentOpts && props.paymentOpts.newPassword) || '',
    repeatOldPassword: (props.paymentOpts && props.paymentOpts.repeatOldPassword) || ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values1', values);
    // onSubmit();
  },
  validate: values => validate(values, PasswordChangeModalFormSchema),
  displayName: 'PasswordChangeModalForm' // helps with React DevTools
});

export default PasswordChangeModalWithFormik(PasswordChangeModal);
