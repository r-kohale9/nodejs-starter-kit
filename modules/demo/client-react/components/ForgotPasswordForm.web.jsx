import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, RenderField, Button, Alert, Icon } from '@gqlapp/look-client-react';
import { required, email, validate } from '@gqlapp/validation-common-react';

const SendBtn = styled(Button)`
  background: #fc4c4c;
  box-shadow: 0px 4px 8px rgba(252, 76, 76, 0.25);
  border-radius: 25px;
`;

const Text = styled.p`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Black */

  color: #222222;
`;

const forgotPasswordFormSchema = {
  email: [required, email]
};

const ForgotPasswordForm = ({ handleSubmit, errors, sent, values, t }) => {
  return (
    <Form name="forgotPassword" onSubmit={handleSubmit}>
      {sent && <Alert color="success">{t('forgotPass.form.submitMsg')}</Alert>}
      <Text>Please, enter your email address. You will recieve a link to create a new password via email.</Text>
      <Field
        name="email"
        component={RenderField}
        type="email"
        label="Email"
        // label={t('forgotPass.form.fldEmail')}
        value={values.email}
      />
      <div className="text-center">
        {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
        <SendBtn block={true} size="lg" color="primary" type="submit">
          Send
        </SendBtn>
      </div>
    </Form>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  sent: PropTypes.bool,
  values: PropTypes.object,
  t: PropTypes.func
};

const ForgotPasswordFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({ email: '' }),
  async handleSubmit(values, { setErrors, resetForm, props: { onSubmit } }) {
    await onSubmit(values)
      .then(() => resetForm())
      .catch(e => {
        if (isFormError(e)) {
          setErrors(e.errors);
        } else {
          throw e;
        }
      });
  },
  validate: values => validate(values, forgotPasswordFormSchema),
  displayName: 'ForgotPasswordForm' // helps with React DevTools
});

export default translate('user')(ForgotPasswordFormWithFormik(ForgotPasswordForm));
