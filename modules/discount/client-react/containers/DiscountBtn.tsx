import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';

import DiscountBtnView from '../components/DiscountBtnView';
import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount } from './DiscountOperations';

import { modalDiscount_modalDiscount as ModalDiscount } from '../graphql/__generated__/modalDiscount';

export interface DiscountBtnProps {
  discountSubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  modalId: number;
  loading: boolean;
  modalDiscount: ModalDiscount;
  modalName: string;
}

const DiscountBtn: React.FunctionComponent<DiscountBtnProps> = props => {
  const { discountSubscribeToMore, modalId } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  // console.log('props', props);
  return <DiscountBtnView {...props} />;
};

export default compose(withModalDiscount)(DiscountBtn);
