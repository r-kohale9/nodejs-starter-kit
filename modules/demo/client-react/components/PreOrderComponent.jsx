import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';
import { Row, Col, DatePicker, Icon } from 'antd';

import ModalComponent from './ModalComponent';
import SelectModal from './SelectModal';
import { Divider } from './StyledComponents';

const PreOrderComponent = props => {
  const { visible, handleVisible, values, info, setFieldValue } = props;
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
                <SelectModal
                  name="weight"
                  title="Select Cake Weight"
                  fields={['.5 Kg', '1 Kg', '1.5 Kg', '2 Kg', '2.5 Kg']}
                  value={values.weight}
                  info="Weight info"
                  handleField={setFieldValue}
                />
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
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  info: PropTypes.string
};

const PreOrderComponentWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    availability: '',
    weight: ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    // console.log('values1', values);
    onSubmit(values);
  },
  // validate: values => validate(values, PreOrderComponentFormSchema),
  displayName: 'PreOrderComponentForms' // helps with React DevTools
});

export default PreOrderComponentWithFormik(PreOrderComponent);
