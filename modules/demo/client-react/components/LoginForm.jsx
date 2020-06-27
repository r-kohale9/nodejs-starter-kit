import React from 'react';
import styled from 'styled-components';
import { Icon, Row, Col } from 'antd';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, minLength, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';
import { GoogleButton, FacebookButton } from '@gqlapp/authentication-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';

const LoginBtn = styled(Button)`
  height: 48px;
  box-shadow: 0px 4px 8px rgba(252, 76, 76, 0.25);
  border-radius: 25px;
`;

const ForgetPass = styled(Link)`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #222222;
`;

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(settings.auth.password.minLength)]
};

const { facebook, google } = settings.auth.social;

const renderSocialButtons = (buttonsLength, t) => {
  return (
    <div style={{ minWidth: 200 }}>
      <Col span={12}>
        <Row type="flex" justify="center">
          <div style={{ fontSize: '34px', color: '#c43832' }}>
            <GoogleButton type="icon" />
          </div>
        </Row>
      </Col>
      <Col span={12}>
        <Row type="flex" justify="center">
          <div style={{ fontSize: '34px', color: '#3b5998' }}>
            <FacebookButton type="icon" />
          </div>
        </Row>
      </Col>
    </div>
  );
};
const LoginForm = props => {
  const { handleSubmit, values, t, submitting, errors } = props;
  const buttonsLength = [facebook.enabled, google.enabled].filter(button => button).length;
  console.log('errros', errors);

  return (
    <Row type="flex" justify="center">
      <Form name="login" onSubmit={handleSubmit}>
        <Col span={24}>
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
            <Row type="flex" justify="end" align="middle">
              <ForgetPass to="/demo/forgotpassword">Forget your password?</ForgetPass>
              <Icon type="arrow-right" style={{ fontSize: '10px', paddingLeft: '5px', color: '#fc4c4c' }} />
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
            <LoginBtn block color="danger" type="submit" disabled={submitting}>
              Login
            </LoginBtn>
            <div style={{ paddingTop: '75px' }}>
              <p>Or login with social account</p>
              {renderSocialButtons(buttonsLength, t)}
            </div>
          </div>
        </Col>
      </Form>
    </Row>
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
