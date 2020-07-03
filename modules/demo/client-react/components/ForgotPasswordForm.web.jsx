import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { Form, RenderField, Button, Alert } from '@gqlapp/look-client-react';
import { required, email, validate } from '@gqlapp/validation-common-react';

const forgotPasswordFormSchema = {
  email: [required, email]
};

const ForgotPasswordForm = ({ handleSubmit, errors, sent, values, t }) => {
  return (
    <Row type="flex" justify="center">
      <Form name="forgotPassword" onSubmit={handleSubmit}>
        {sent && <Alert color="success">{t('forgotPass.form.submitMsg')}</Alert>}
        <p>Please, enter your email address. You will recieve a link to create a new password via email.</p>
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={24} style={{ maxWidth: '300px' }}>
              <Field
                name="email"
                component={RenderField}
                type="email"
                label="Email"
                // label={t('forgotPass.form.fldEmail')}
                value={values.email}
              />
              <div style={{ paddingTop: '55px' }} className="text-center">
                {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
                <Button size="lg" color="primary" block type="submit">
                  <b>SEND</b>
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Form>
    </Row>
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
