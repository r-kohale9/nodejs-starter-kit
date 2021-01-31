import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import DynamicCarouselView from '../../components/DCComponents/DynamicCarouselView';

import {
  withDynamicCarouselState,
  withDynamicCarousels,
  withDeleteDynamicCarousel,
  withDynamicCarouselOrderByUpdating,
  withDynamicCarouselFilterUpdating,
  subscribeToDynamicCarousels
} from './DynamicCarouselOperations';

// types
import {
  OrderByDynamicCarouselInput,
  FilterDynamicCarouselInput
} from './../../../../../packages/server/__generated__/globalTypes';
import { dynamicCarousels_dynamicCarousels as DynamicCarousels } from '../../graphql/__generated__/dynamicCarousels';

export interface DynamicCarouselProps {
  loading: boolean;
  dynamicCarousels: DynamicCarousels;
  filter: FilterDynamicCarouselInput;
  orderBy: OrderByDynamicCarouselInput;
  onSearchTextChange: (serachText: string) => void;
  onIsActiveChange: (active: boolean) => void;
  onFiltersRemove: (filter: FilterDynamicCarouselInput, orderBy: OrderByDynamicCarouselInput) => void;
  onLabelChange: (label: string) => void;
  onDynamicCarouselOrderBy: (orderBy: OrderByDynamicCarouselInput) => void;
  deleteDynamicCarousel: (id: number) => void;
  loadData: (endCursor: number, action: string) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const DynamicCarousel: React.FC<DynamicCarouselProps> = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToDynamicCarousels(subscribeToMore);
    return () => subscribe();
  });

  // console.log('props', props);
  return <DynamicCarouselView {...props} />;
};

export default compose(
  withDynamicCarouselState,
  withDynamicCarousels,
  withDeleteDynamicCarousel,
  withDynamicCarouselOrderByUpdating,
  withDynamicCarouselFilterUpdating,
  translate('home')
)(DynamicCarousel);
