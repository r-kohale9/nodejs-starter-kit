import React from 'react';
import { PageLayout, MetaTags, Row, Col, Card, Divider, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import AddressItemComponent from '@gqlapp/addresses-client-react/components//AddressItemComponent';

import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';

// types
import { OrderDetailsProps } from '../containers/OrderDetails.web';

export interface OrderDetailsViewProps extends OrderDetailsProps {
  onPatchOrderState: (orderId: number, state: string) => void;
}

const OrderDetailsView: React.FC<OrderDetailsViewProps> = props => {
  const { order, loading, t, orderStates, onPatchOrderState } = props;
  const address =
    order &&
    order.orderDetails &&
    order.orderDetails.length > 0 &&
    order.orderDetails[0].orderDelivery &&
    order.orderDetails[0].orderDelivery.address;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${'meta'}`} />

      {loading && <Spinner />}
      {!loading && order && (
        <Row gutter={24}>
          <Col span={24} align="left">
            {order && (
              <h2>
                {t('orderDetails.id')}
                {order.id}
              </h2>
            )}
            <br />
            <hr />
            <br />
          </Col>
          <Col lg={22} md={22} xs={24}>
            <Row gutter={24}>
              <Col lg={10} md={10} xs={24}>
                <Row>
                  {order && (
                    <Row gutter={24}>
                      <Col span={24}>
                        <OrderTrackCardComponent
                          t={t}
                          // orderPayment={order.orderPayment}
                          orderStatus={order.orderState.state}
                          // status={state.status}
                          completed={3}
                        />
                        <Divider />
                      </Col>
                      <Col span={24}>
                        <Card>
                          <h4>{t('orderDetails.addressText')}</h4>
                          <hr />
                          {address && <AddressItemComponent active={address.id} address={address} t={t} />}
                        </Card>
                      </Col>
                    </Row>
                  )}
                </Row>
              </Col>
              <Col lg={14} md={14} xs={24}>
                {!loading && order && (
                  <CheckoutCardComponent
                    t={t}
                    order={order}
                    product={3}
                    showState={true}
                    showBtn={false}
                    paid={true}
                    orderStates={orderStates}
                    onPatchOrderState={onPatchOrderState}
                    buttonText={'View All Orders'}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </PageLayout>
  );
};

export default OrderDetailsView;
