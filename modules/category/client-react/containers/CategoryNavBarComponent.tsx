import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';

import { withCategories } from './CategoryOpertations';
import { subscribeToCategories } from './CategorySubscriptions';

import CategoryNavBarComponentView from '../components/CategoryNavBarComponentView';

// types
import { FilterCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { categories_categories as CategoriesEdge } from '../graphql/__generated__/categories';

export interface CategoryNavBarComponentProps {
  loading: boolean;
  categories: CategoriesEdge;
  filter: FilterCategoryInput;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
}

const CategoryNavBarComponent: React.FC<CategoryNavBarComponentProps> = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  return <CategoryNavBarComponentView {...props} />;
};

export default compose(withCategories)(CategoryNavBarComponent);
