import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import {
  withDiscountsState,
  withDiscounts,
  withFilterUpdating,
  withOrderByUpdating,
  withDiscountDeleting
  // withEditDiscount,
} from './DiscountOperations';
import DiscountsView from '../components/DiscountsView.web';
import { subscribeToDiscounts } from './DiscountSubscriptions';

// types
import { FilterDiscountInput, OrderByDiscountInput } from '../../../../packages/server/__generated__/globalTypes';
import { discounts_discounts as DiscountsEdge } from '../graphql/__generated__/discounts';

export interface DiscountsProps {
  loading: boolean;
  orderBy: OrderByDiscountInput;
  filter: FilterDiscountInput;
  discounts: DiscountsEdge;
  loadData: (endCursor: number, action: string) => void;
  deleteDiscount: (id: number) => void;
  onDiscountsOrderBy: (orderBy: OrderByDiscountInput) => void;
  onSearchTextChange: (serachText: string) => void;
  onIsActiveChange: (active: boolean) => void;
  onModalNameChange: (modalName: string) => void;
  onFiltersRemove: (filter: FilterDiscountInput, orderBy: OrderByDiscountInput) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const Discounts: React.FC<DiscountsProps> = props => {
  const { subscribeToMore /* editDiscount */ } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscounts(subscribeToMore, props.filter);
    return () => subscribe();
  });

  // const handleToggle = (field, value, id) => {
  //   const input = {};
  //   input.id = id;
  //   _.set(input, field, value);
  //   try {
  //     editDiscount(input);
  //   } catch (e) {
  //     throw Error(e);
  //   }
  // };

  // console.log('props', props);
  return <DiscountsView /* onToggle={handleToggle} */ filter={{}} {...props} />;
};

export default compose(
  withDiscountsState,
  withDiscounts,
  withFilterUpdating,
  withOrderByUpdating,
  withDiscountDeleting,
  // withEditDiscount,
  translate('discount')
)(Discounts);
