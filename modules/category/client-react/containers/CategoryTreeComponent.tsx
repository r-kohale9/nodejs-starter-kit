import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';

import CategoryTreeComponentView from '../components/CategoryTreeComponentView';
import { withCategories } from './CategoryOpertations';
import { subscribeToCategories } from './CategorySubscriptions';

// types
import { FilterCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { categories_categories as CategoriesEdge } from '../graphql/__generated__/categories';

export interface CategoryTreeComponentProps {
  loading: boolean;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  categories: CategoriesEdge;
  filter: FilterCategoryInput;
}

const CategoryTreeComponent: React.FunctionComponent<CategoryTreeComponentProps> = props => {
  const { subscribeToMore, categories, loading } = props;

  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  // console.log(props);
  return (
    <>
      {loading && <Spinner size="small" />}
      {!loading && categories && categories.totalCount > 0 ? (
        <CategoryTreeComponentView {...props} />
      ) : (
        !loading && <div style={{ paddingTop: '10px' }}>Their are no categories!</div>
      )}
    </>
  );
};

export default compose(withCategories)(CategoryTreeComponent);
