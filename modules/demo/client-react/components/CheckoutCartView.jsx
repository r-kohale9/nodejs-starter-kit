import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button, List } from 'antd';
import { withFormik } from 'formik';
import { PropTypes } from 'prop-types';

import { minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';
import CartItemComponent from './CartItemComponent';
import PromoCodeForm from './PromoCodeForm';
import PageLayout from './PageLayout';

import { PgTitle } from './StyledComponents';

const totalAmount = (orderDetails, values) => {
  let price = 0;
  orderDetails.map((item, indx) => {
    price = price + item.price * values.orderDetails[indx].units;
  });
  return price;
};

const Text = styled.span`
  font-size: 14px;
  line-height: 20px;
  padding-right: 10px;
  color: #9b9b9b;
`;

const CheckoutCartView = props => {
  const { getCart, history, promocodes, handleSubmit, setFieldValue, values } = props;
  return (
    <PageLayout history={history} showMenuBar={true}>
      <Col span={24}>
        <PgTitle>My Cart</PgTitle>
        <div style={{ margin: '12px 0px' }} />
      </Col>
      <Col span={24}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3
          }}
          dataSource={getCart && getCart.orderDetails && getCart.orderDetails.length !== 0 && getCart.orderDetails}
          renderItem={(item, indx) => (
            <List.Item>
              <CartItemComponent name={`orderDetails[${indx}].units`} item={item} onChange={setFieldValue} />
            </List.Item>
          )}
        />
      </Col>

      <Col span={24}>
        <PromoCodeForm promocodes={promocodes} />
      </Col>
      <Col span={24} style={{ marginTop: '28px' }}>
        <Row type="flex" align="middle" justify="center">
          <Col span={10}>
            <Text>Total Amount:</Text>
          </Col>
          <Col span={14}>
            <Row type="flex" align="end">
              Rs. {totalAmount(getCart.orderDetails, values)}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <div style={{ padding: '24px 0px 50px 0px' }}>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            // onClick={() => history.push('/demo/checkout-order')}
          >
            CHECK OUT
          </Button>
        </div>
      </Col>
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  getCart: PropTypes.object,
  history: PropTypes.object,
  promocodes: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object
};
const CheckoutCartFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const { getCart } = props;
    function getOrderDetails(item) {
      return {
        listingId: item.id,
        units: item.units
      };
    }

    return {
      orderDetails: getCart && getCart.orderDetails.length !== 0 ? getCart.orderDetails.map(getOrderDetails) : []
    };
  },
  handleSubmit(values, { props: { onSubmit, history } }) {
    // console.log('values1', values);
    onSubmit(values);
    history.push('/demo/checkout-order');
  },
  displayName: 'CheckoutCartForms' // helps with React DevTools
});

export default CheckoutCartFormWithFormik(CheckoutCartView);
