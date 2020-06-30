import React, { useState } from 'react';
import { Row, Col, Icon, Form, Button } from 'antd';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';
import { minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';

import ModalComponent from './ModalComponent';
import PromoCardComponent from './PromoCardComponent';

const PromoCodeFormSchema = {
  promoCode: []
};

const PromoCodeForm = props => {
  const { values, handleSubmit, promocodes, setFieldValue } = props;
  const [visible, setVisible] = useState(false);

  const handleApply = value => {
    setFieldValue('promoCode', value);
    setVisible(false);
  };

  return (
    <>
      <Row type="flex" align="middle">
        <Col span={24}>
          <Button style={{ textAlign: 'left' }} block onClick={() => setVisible(true)}>
            {values.promoCode !== '' ? values.promoCode : 'Enter your promocode'}
            <Button
              style={{ position: 'absolute', top: '-1px', right: '0' }}
              type="black"
              shape="circle"
              icon="arrow-right"
              onClick={() => setVisible(true)}
            />
          </Button>
          <ModalComponent
            // visible={true}
            visible={visible}
            handleVisible={() => setVisible(false)}
          >
            <Row type="flex" justify="start" align="middle">
              <Col span={24}>
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="promoCode"
                    component={RenderField}
                    type="text"
                    placeholder="Enter your promo code"
                    value={values.promoCode}
                  />
                  <Button
                    style={{ position: 'absolute', top: '5px', right: '0px' }}
                    type="black"
                    shape="circle"
                    icon="arrow-right"
                    onClick={() => handleSubmit(values)}
                  />
                </Form>
              </Col>
              <Col span={24}>
                <h3>Your Promo Codes</h3>
              </Col>
              <Col span={24}>
                {promocodes.map(promocode => (
                  <PromoCardComponent promocode={promocode} setValue={setFieldValue} onApply={handleApply} />
                ))}
              </Col>
            </Row>
          </ModalComponent>
        </Col>
      </Row>
    </>
  );
};

PromoCodeForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  promocodes: PropTypes.object,
  setFieldValue: PropTypes.func
};

const PromoCodeFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    promoCode: ''
  }),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values1', values);
    // onSubmit();
  },
  validate: values => validate(values, PromoCodeFormSchema),
  displayName: 'PromoCodeForms' // helps with React DevTools
});

export default PromoCodeFormWithFormik(PromoCodeForm);
