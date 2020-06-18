import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { Row, Col, DatePicker, Button, Icon } from 'antd';

import ModalComponent from './ModalComponent';

const Divider = styled.div`
  margin: 16px 0px 16px 0px;
  width: 100%;
  opacity: 0.25;
  border: 0.4px solid #9b9b9b;
`;

const PreOrderComponent = props => {
  const { visible, handleVisible, values, info } = props;
  const onChange = value => {
    values.availability = value.format('DD-MM-YYYY');
  };

  const onOk = value => {
    values.availability = value._d.toDateString();
  };
  return (
    <ModalComponent
      title="Pre-Order"
      // visible={true}
      visible={visible}
      handleVisible={handleVisible}
    >
      <Row type="flex" align="middle" gutter={[0, 24]}>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={8}>
              <Row type="flex" justify="start">
                Availability:
              </Row>
            </Col>
            <Col span={16}>
              <Row type="flex" justify="end">
                <DatePicker
                  showTime
                  format="DD-MM-YYYY"
                  placeholder={moment(`${values.availability}`, 'DD-MM-YYYY')._i || 'Select Date'}
                  onChange={onChange}
                  onOk={onOk}
                  // defaultValue={moment(`${values.dateOfBirth}`, 'DD-MM-YYYY')}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row type="flex" align="middle">
            <Col span={9}>
              <Row type="flex" justify="start">
                Weight :
              </Row>
            </Col>
            <Col span={15}>
              <Row type="flex" justify="end">
                <Button block>Select Cake Weight</Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row type="flex" align="middle">
        <Col span={20}>
          <Row type="flex" justify="start">
            {info}
          </Row>
        </Col>
        <Col span={4}>
          <Row type="flex" justify="end">
            <Icon type="right" />
          </Row>
        </Col>
      </Row>
      <Divider />
      <div style={{ padding: '45px' }} />
    </ModalComponent>
  );
};

PreOrderComponent.propTypes = {
  visible: PropTypes.bool,
  handleVisible: PropTypes.func,
  values: PropTypes.object,
  info: PropTypes.string
};

const PreOrderComponentWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    availability: '',
    weight: ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values1', values);
    // onSubmit();
  },
  // validate: values => validate(values, PreOrderComponentFormSchema),
  displayName: 'PreOrderComponentForms' // helps with React DevTools
});

export default PreOrderComponentWithFormik(PreOrderComponent);
