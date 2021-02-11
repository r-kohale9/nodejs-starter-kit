import React, { useEffect } from 'react';
import { match as Match } from 'react-router-dom';
import { SubscribeToMoreOptions } from 'apollo-client';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { History } from 'history';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { withCategory } from '@gqlapp/category-client-react/containers/CategoryOpertations';
import { subscribeToCategory } from '@gqlapp/category-client-react/containers/CategorySubscriptions';

import CategoryCatalogueView from '../components/CategoryCatalogueView';

// types
import { category_category as Category } from '@gqlapp/category-client-react/graphql/__generated__/category';

export interface CategoryCatalogueProps {
  loading: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  history: History;
  match: Match<{ id: string }>;
  category: Category;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  t: TranslateFunction;
}

const CategoryCatalogue: React.FC<CategoryCatalogueProps> = props => {
  const { history, subscribeToMore, category } = props;

  useEffect(() => {
    const subscribe = subscribeToCategory(subscribeToMore, category && category.id, history);
    return () => subscribe();
  });

  // console.log('props', props);
  return <CategoryCatalogueView {...props} />;
};

export default compose(withCategory, translate('category'))(CategoryCatalogue);
