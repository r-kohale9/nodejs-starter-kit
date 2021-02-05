import React /* , { useEffect } */ from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount } from './DiscountOperations';
import DiscountComponentView from '../components/DiscountComponentView';

// types
import { modalDiscount_modalDiscount as ModalDiscount } from '../graphql/__generated__/modalDiscount';

export interface DiscountComponentProps {
  modalId: number;
  modalName: string;
  cost?: number;
  loading?: boolean;
  modalDiscount?: ModalDiscount;
}

const DiscountComponent: React.FC<DiscountComponentProps> = props => {
  const { modalDiscount /* , modalId, discountSubscribeToMore  */ } = props;
  const now = new Date().toISOString();
  const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
  const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
  const isDiscountPercent =
    startDate && endDate
      ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
      : modalDiscount && modalDiscount.discountPercent > 0;
  const discountPercent = isDiscountPercent
    ? modalDiscount && modalDiscount.discountPercent > 0 && modalDiscount.discountPercent
    : null;

  // useEffect(() => {
  //   const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
  //   return () => subscribe();
  // }, [discountSubscribeToMore, modalId]);

  // console.log('props', props);
  return <DiscountComponentView isDiscount={isDiscountPercent} discount={discountPercent} {...props} />;
};

export default compose(withModalDiscount, translate('discount'))(DiscountComponent);
