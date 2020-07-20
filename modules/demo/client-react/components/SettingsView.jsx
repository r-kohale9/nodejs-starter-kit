import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { Row, Col, Form, DatePicker, Switch } from 'antd';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';

import PageLayout from './PageLayout';
import PasswordChangeModal from './PasswordChangeModal';

import { PgTitle } from './StyledComponents';

const SettingsView = props => {
  const { values, onSubmit, currentUser } = props;
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
          <PgTitle>Settings</PgTitle>
        </Col>
        <Col span={24} style={{ padding: '5px 0px 10px 0px' }}>
          <h3>
            <strong>Personal Information</strong>
          </h3>
        </Col>
        <Col span={24}>
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
            <Row style={{ marginTop: '54px' }}>
              <Col span={12}>
                <Row type="flex" justify="start">
                  <h3>
                    <strong>Password</strong>
                  </h3>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end">
                  <PasswordChangeModal onSubmit={onSubmit} currentUser={currentUser} />
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
            <Col span={24} style={{ marginBottom: '24px' }}>
              <h3>
                <strong>Notifications</strong>
              </h3>
            </Col>
            <Col span={24} style={{ marginBottom: '24px' }}>
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
            <Col span={24} style={{ marginBottom: '24px' }}>
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
            <Col span={24} style={{ marginBottom: '24px' }}>
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
  values: PropTypes.object,
  onSubmit: PropTypes.func
};

const SettingsViewWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    id: props.currentUser && props.currentUser.id ? props.currentUser.id : null,
    fullName: (props.currentUser && props.currentUser.profile && props.currentUser.profile.fullName) || '',
    dateOfBirth: (props.currentUser && props.currentUser.profile && props.currentUser.profile.dateOfBirth) || ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values1', values);
    // onSubmit();
  },
  // validate: values => validate(values, SettingsViewFormSchema),
  displayName: 'Forms' // helps with React DevTools
});

export default SettingsViewWithFormik(SettingsView);
