import React from 'react';
import { Row, Col, Button } from 'antd';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

interface DemoViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const DemoView = (props: DemoViewProps) => {
  const { history, t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <Button type="primary" block onClick={() => history.push('/demo/forgotpassword')}>
            Forget Pass
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/home')}>
            ListingCatalogue
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/listing-detail/32')}>
            ListingDetails
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/baker')}>
            Baker
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/login')}>
            Login
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/my-orders')}>
            MyOrders
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/order-details/23')}>
            OrderDetails
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/shipping-address')}>
            ShippingAddress
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/edit-shipping-address/234')}>
            EditShippingAddress
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/add-shipping-address')}>
            AddShippingAddress
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/payment-methods')}>
            PaymentMethods
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/settings')}>
            Settings
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/promocodes')}>
            Promocodes
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/checkout-cart')}>
            CheckoutCart
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/checkout-order')}>
            CheckoutOrder
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/checkout-status')}>
            CheckoutStatus
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/favorites')}>
            Favorites
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/filters')}>
            Filters
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/contact')}>
            Contact
          </Button>
        </Col>
        <Col span={24}>
          <Button block onClick={() => history.push('/demo/reviews')}>
            Reviews
          </Button>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default DemoView;
