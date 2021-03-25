import React from 'react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { NextButton, MetaTags, PageLayout, Row, Col, Spinner, Tooltip } from '@gqlapp/look-client-react';
import SelectAddress from '@gqlapp/addresses-client-react/containers/SelectAddress';
import AddAddressBtn from '@gqlapp/addresses-client-react/containers/AddAddressBtn';
import settings from '@gqlapp/config';

import CheckoutLayout from './CheckoutLayout';
import OrderSummary from './OrderSummary';
// types
import { CheckoutBillProps } from '../containers/CheckoutBill.web';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

interface CheckoutBillViewProps extends CheckoutBillProps {
  t: TranslateFunction;
  cartLoading: boolean;
  currentUser: CurrentUser;
  loading: boolean;
  onSubmit: () => void;
  btnDisabled: boolean;
  onSelect: (addressId: number) => void;
}

const CheckoutBillView: React.FunctionComponent<CheckoutBillViewProps> = props => {
  const { t, onSelect, onSubmit, cartLoading, currentUser, btnDisabled } = props;
  const getCart = !props.loading && props.getCart;

  return (
    <PageLayout>
      <MetaTags title="Bill" description={`${settings.app.name} - ${'meta'}`} />
      {cartLoading && <Spinner />}

      {!cartLoading && (
        <CheckoutLayout
          t={t}
          step={1}
          title={'Select Address'}
          extra={<AddAddressBtn currentUser={currentUser} t={t} />}
          loading={getCart && getCart.orderDetails.length > 0}
          Col1={
            <Row>
              <Col span={1} />
              <Col span={23}>
                <SelectAddress onSelect={onSelect} currentUser={currentUser} />
              </Col>
            </Row>
          }
          Col2={
            <OrderSummary
              getCart={getCart}
              btn={
                <Tooltip title={btnDisabled && 'Select delivery address.'}>
                  <NextButton onClick={onSubmit} loading={cartLoading} disabled={btnDisabled} size="lg">
                    Continue
                  </NextButton>
                </Tooltip>
              }
            />
          }
        />
      )}
    </PageLayout>
  );
};

export default CheckoutBillView;
