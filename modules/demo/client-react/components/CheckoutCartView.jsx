import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button, Empty, List } from 'antd';
import { withFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import { minLength, required, validate, maxLength } from '@gqlapp/validation-common-react';
import CartItemComponent from './CartItemComponent';
import PromoCodeForm from './PromoCodeForm';
import PageLayout from './PageLayout';

import { PgTitle } from './StyledComponents';

const totalAmount = (orderDetails, values) => {
  let price = 0;
  orderDetails.map((item, indx) => {
    price =
      price +
      Number(item && item.listing.listingCost.cost) *
        Number(values && values.orderDetails[indx] && values.orderDetails[indx].unit);
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
  const { loading, getCart, history, promocodes, onDelete, setFieldValue, values, onSubmit } = props;
  return (
    <PageLayout history={history} showMenuBar={true} selectedTab="CART">
      {!loading && getCart && getCart.orderDetails && getCart.orderDetails.length > 0 ? (
        <>
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
                  <CartItemComponent
                    name={`orderDetails[${indx}].unit`}
                    item={item}
                    onChange={setFieldValue}
                    onDelete={onDelete}
                  />
                </List.Item>
              )}
            />
          </Col>

          <Col span={24}>
            <PromoCodeForm promocodes={promocodes} setValue={setFieldValue} value={values.discount} />
          </Col>
          <Col span={24} style={{ marginTop: '28px' }}>
            <Row type="flex" align="middle" justify="center">
              <Col span={10}>
                <Text>Total Amount:</Text>
              </Col>
              <Col span={14}>
                <Row type="flex" align="end">
                  {values &&
                    values.orderDetails &&
                    values.orderDetails !== 0 &&
                    `Rs. ${totalAmount(getCart.orderDetails, values)}`}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div style={{ padding: '24px 0px 50px 0px' }}>
              <Button type="primary" size="large" block onClick={() => onSubmit(values)}>
                CHECK OUT
              </Button>
            </div>
          </Col>
        </>
      ) : (
        <div className="width100 centerAlign marginT30">
          <Empty description="You have no items in your Cart">
            <Link to="/demo/home">
              <Button style={{ width: 'fit-content' }} type="primary">
                Add some products
              </Button>
            </Link>
          </Empty>
        </div>
      )}
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  getCart: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
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
        id: item.id,
        weight: item.weight,
        unit: item.unit,
        listingId: item.listing.id
      };
    }

    return {
      discount: '',
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
