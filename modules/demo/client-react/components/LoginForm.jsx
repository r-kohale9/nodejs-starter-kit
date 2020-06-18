import React from 'react';
import styled from 'styled-components';
import { Icon, Row, Col } from 'antd';
import { withFormik } from 'formik';
import { NavLink, Link } from 'react-router-dom';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, minLength, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Alert, Button } from '@gqlapp/look-client-react';
import { GoogleButton, FacebookButton } from '@gqlapp/authentication-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';

const LoginBtn = styled(Button)`
  background: #fc4c4c;
  box-shadow: 0px 4px 8px rgba(252, 76, 76, 0.25);
  border-radius: 25px;
`;

const ForgetPass = styled(Link)`
  /* position: absolute;
  width: 159px;
  height: 20px;
  left: 173px;
  top: 365px; */

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  text-align: right;

  /* Black */

  color: #222222;
`;

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(settings.auth.password.minLength)]
};

const { facebook, google } = settings.auth.social;

const renderSocialButtons = (buttonsLength, t) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 200
      }}
    >
      {console.log('facebook', facebook)}
      <div className="text-center">
        <GoogleButton text={t('login.googleBtn')} type={'icon'} />
      </div>
      <div className="text-center">
        <FacebookButton text={t('login.fbBtn')} type={'icon'} style={{ width: '100px', height: '100px' }} />
      </div>
    </div>
  );
};
const LoginForm = props => {
  const { handleSubmit, values, t, submitting, errors } = props;
  const buttonsLength = [facebook.enabled, google.enabled].filter(button => button).length;
  console.log('errros', errors);

  return (
    <Form name="login" onSubmit={handleSubmit}>
      <Field
        name="usernameOrEmail"
        component={RenderField}
        type="text"
        label="Email"
        // label={t('login.form.field.usernameOrEmail')}
        value={values.usernameOrEmail}
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label="Password"
        // label={t('login.form.field.pass')}
        value={values.password}
      />
      {/* <div className="text-center">{errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}</div> */}
      <div style={{ paddingBottom: '20px' }}>
        <Row>
          <Col xs={12} md={18} lg={18} />
          <Col xs={12} md={6} lg={6}>
            <ForgetPass to="/demo/forgotpassword">Forget your password?</ForgetPass>
            <Icon type="arrow-right" style={{ height: '6px', width: '15px' }} />
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LoginBtn block={true} size="lg" color="primary" type="submit" disabled={submitting}>
          Login
        </LoginBtn>
        <div style={{ paddingTop: '75px' }}>
          <p>Or login with social account</p>
          {renderSocialButtons(buttonsLength, t)}
        </div>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
  submitting: PropTypes.bool
};

const LoginFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({ usernameOrEmail: '', password: '' }),

  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, loginFormSchema),
  displayName: 'LoginForm' // helps with React DevTools
});

export default LoginFormWithFormik(LoginForm);
