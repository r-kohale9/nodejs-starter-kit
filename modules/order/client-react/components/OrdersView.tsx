import React from 'react';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import OrderFilterComponent from './OrderFilterComponent.web';
import OrderListComponent from './OrderListComponent.web';

// types
import { OrdersProps } from '../containers/Orders.web';

export interface OrderViewProps extends OrdersProps {
  onPatchOrderState: (orderId: number, state: string) => void;
  onDelete: (id: number) => void;
}

const OrderView: React.FC<OrderViewProps> = props => {
  const { t } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${'meta'}`} />

      <OrderFilterComponent {...props} />
      <OrderListComponent {...props} />
    </PageLayout>
  );
};

export default OrderView;
