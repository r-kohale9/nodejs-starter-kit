import React from 'react';
import { Form, Row, Col, Radio } from 'antd';
import { PropTypes } from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import PaymentCardComponent from './PaymentCardComponent';

const RadioGroup = Radio.Group;

const RenderPaymentCards = props => {
  const { paymentOpts, values } = props;
  console.log('props', props);
  return (
    <RadioGroup
      size="large"
      buttonStyle="solid"
      // defaultValue={paymentOpts.findIndex(pO => pO.defaultCard === true)}
    >
      {paymentOpts.map((payOpt, index) => {
        return (
          <Row>
            <Col span={24}>
              <Col span={24}>
                <PaymentCardComponent card={payOpt} />
              </Col>
              <Col span={24}>
                <Radio
                  key={index}
                  name={`paymentOpts[${index}].defaultCard`}
                  checked={values.paymentOpts[index].defaultCard}
                  value={index}
                >
                  {console.log('valeus', values)}
                  Use as default payment method
                </Radio>
              </Col>
            </Col>
          </Row>
        );
      })}
    </RadioGroup>
  );
};

RenderPaymentCards.propTypes = {
  paymentOpts: PropTypes.array,
  values: PropTypes.object
};

const RenderPaymentCardsWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: values => {
    const { paymentOpts } = values;
    function getpayOpt(payOpt) {
      return {
        defaultCard: payOpt.defaultCard
      };
    }

    return {
      paymentOpts: paymentOpts && paymentOpts.length !== 0 ? paymentOpts.map(getpayOpt) : []
    };
  },
  async handleSubmit(values) {
    console.log('values', values);
  },
  displayName: 'RenderPaymentCards' // helps with React DevTools
});

export default RenderPaymentCardsWithFormik(RenderPaymentCards);
