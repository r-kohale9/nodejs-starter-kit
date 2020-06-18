import React from 'react';
import moment from 'moment';
import { Row, Col, Form, DatePicker, Switch } from 'antd';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderCheckBox, RenderField } from '@gqlapp/look-client-react';
// import { minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';

import { PropTypes } from 'prop-types';
import PageLayout from './PageLayout';
import PasswordChangeModal from './PasswordChangeModal';

const SettingsView = props => {
  const { values } = props;
  const onChange = value => {
    values.dateOfBirth = value.format('DD-MM-YYYY');
  };

  const onOk = value => {
    values.dateOfBirth = value._d.toDateString();
  };
  return (
    <PageLayout>
      <Row type="flex">
        <Col span={24}>
          <h1>Settings</h1>
        </Col>
        <Col span={24}>
          <h3>Personal Information</h3>
          <Form>
            <Field
              name="fullName "
              component={RenderField}
              type="text"
              placeholder="Full name"
              // label="Full name"
              value={values.fullName}
            />
            <DatePicker
              showTime
              format="DD-MM-YYYY"
              placeholder={moment(`${values.dateOfBirth}`, 'DD-MM-YYYY')._i}
              onChange={onChange}
              onOk={onOk}
              // defaultValue={moment(`${values.dateOfBirth}`, 'DD-MM-YYYY')}
            />
            <Row>
              <Col span={12}>
                <Row type="flex" justify="start">
                  <h3>Password</h3>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end">
                  <PasswordChangeModal />
                </Row>
              </Col>
              <Col span={24}>
                <Field
                  name="password"
                  component={RenderField}
                  type="password"
                  placeholder="Password"
                  // label="Password"
                  value={values.password}
                />
              </Col>
            </Row>
            <Col span={24}>
              <h3>Notifications</h3>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={20}>
                  <Row type="flex" justify="start">
                    Offers
                  </Row>
                </Col>
                <Col span={4}>
                  <Row type="flex" justify="end">
                    <Switch size="small" defaultChecked />
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={20}>
                  <Row type="flex" justify="start">
                    New Bakers/Item Launch
                  </Row>
                </Col>
                <Col span={4}>
                  <Row type="flex" justify="end">
                    <Switch size="small" />
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={20}>
                  <Row type="flex" justify="start">
                    Delivery status changes
                  </Row>
                </Col>
                <Col span={4}>
                  <Row type="flex" justify="end">
                    <Switch size="small" />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  );
};

SettingsView.propTypes = {
  values: PropTypes.object
};

const SettingsViewWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.personalInfo && props.personalInfo.id ? props.personalInfo.id : null,
    fullName: (props.personalInfo && props.personalInfo.fullName) || '',
    dateOfBirth: (props.personalInfo && props.personalInfo.dateOfBirth) || ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values1', values);
    // onSubmit();
  },
  // validate: values => validate(values, SettingsViewFormSchema),
  displayName: 'Forms' // helps with React DevTools
});

export default SettingsViewWithFormik(SettingsView);
