import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Row } from 'antd';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';
import { match, minLength, required, validate } from '@gqlapp/validation-common-react';
import settings from '@gqlapp/config';

import ModalComponent from './ModalComponent';
import { LinkGrey } from './StyledComponents';

const PasswordChangeModalFormSchema = {
  oldPassword: [required],
  newPassword: [required, minLength(settings.auth.password.minLength)],
  repeatOldPassword: [required, match('newPassword'), minLength(settings.auth.password.minLength)]
};

const PasswordChangeModal = props => {
  const [visible, setVisible] = useState(false);
  const { values, handleSubmit } = props;

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        <LinkGrey>Change</LinkGrey>
      </Button>
      <ModalComponent
        title="Password Change"
        // visible={true}
        visible={visible}
        handleVisible={() => setVisible(false)}
      >
        <Form>
          <Field
            name="oldPassword"
            component={RenderField}
            type="text"
            placeholder="Old password"
            // label="Old password"
            value={values.oldPassword}
          />
          <Row type="flex" justify="end" align="top">
            <LinkGrey to="/demo/forgotpassword">Forgot password?</LinkGrey>
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
            <Button type="primary" size="lg" block onClick={handleSubmit}>
              SAVE PASSWORD
            </Button>
          </div>
        </Form>
      </ModalComponent>
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
    // console.log('values1', values);
    onSubmit(values);
  },
  validate: values => validate(values, PasswordChangeModalFormSchema),
  displayName: 'PasswordChangeModalForm' // helps with React DevTools
});

export default PasswordChangeModalWithFormik(PasswordChangeModal);
