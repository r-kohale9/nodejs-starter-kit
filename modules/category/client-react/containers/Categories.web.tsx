import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import _ from 'lodash';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import {
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  withEditCategory
} from './CategoryOpertations';
import CategoriesView from '../components/CategoriesView.web';
import { subscribeToCategories } from './CategorySubscriptions';

// types
import {
  FilterCategoryInput,
  EditCategoryInput,
  OrderByCategoryInput
} from '../../../../packages/server/__generated__/globalTypes';
import { categories_categories as CategoriesEdge } from '../graphql/__generated__/categories';

export interface CategoriesProps {
  loading: boolean;
  categories: CategoriesEdge;
  filter: FilterCategoryInput;
  orderBy: OrderByCategoryInput;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  editCategory: (input: EditCategoryInput) => boolean | null;
  onSearchTextChange: (serachText: string) => void;
  onIsActiveChange: (active: boolean) => void;
  onFiltersRemove: (filter: FilterCategoryInput, orderBy: OrderByCategoryInput) => void;
  onModalNameChange: (modalName: string) => void;
  onOrderBy: (orderBy: OrderByCategoryInput) => void;
  loadData: (endCursor: number, action: string) => void;
  deleteCategory: (id: number) => void;
  t: TranslateFunction;
}

const Categories: React.FC<CategoriesProps> = props => {
  const { subscribeToMore, editCategory } = props;
  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  const handleToggle = (field: string, value: boolean, id: number) => {
    const input: EditCategoryInput = { id };
    _.set(input, field, value);
    try {
      editCategory(input);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <CategoriesView onToggle={handleToggle} filter={{}} {...props} />;
};

export default compose(
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  withEditCategory,
  translate('category')
)(Categories);
