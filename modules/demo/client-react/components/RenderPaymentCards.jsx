import React from 'react';
import { Col, List } from 'antd';
import { PropTypes } from 'prop-types';
import { withFormik } from 'formik';

import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderCheckBox } from '@gqlapp/look-client-react';

import PaymentCardComponent from './PaymentCardComponent';

const RenderPaymentCards = props => {
  const { paymentOpts, values } = props;
  return (
    <Col span={24}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3
        }}
        dataSource={paymentOpts && paymentOpts.length !== 0 && paymentOpts}
        renderItem={(payOpt, index) => (
          <List.Item>
            <PaymentCardComponent
              card={payOpt}
              extra={
                <Field
                  name={`paymentOpts[${index}].defaultCard`}
                  component={RenderCheckBox}
                  labelText="Use as default payment method"
                  // onChange={() => handlePaymentOption(index)}
                  checked={values.paymentOpts[index].defaultCard}
                />
              }
            />
          </List.Item>
        )}
      />
    </Col>
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
