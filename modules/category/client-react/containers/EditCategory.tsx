import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import EditCategoryView from '../components/EditCategoryView';
import { withEditCategory, withCategory } from './CategoryOpertations';
import { subscribeToCategory } from './CategorySubscriptions';

// types
import { EditCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { category_category as Category } from '../graphql/__generated__/category';

export interface EditCategoryProps {
  loading: boolean;
  editCategory: (values: EditCategoryInput) => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  history: History;
  category: Category;
  t: TranslateFunction;
}

const EditCategory: React.FunctionComponent<EditCategoryProps> = props => {
  const { editCategory, history, subscribeToMore, category } = props;
  useEffect(() => {
    const subscribe = subscribeToCategory(subscribeToMore, category && category.id, history);
    return () => subscribe();
  });

  const handleSubmit = (values: EditCategoryInput) => {
    try {
      Message.destroy();
      Message.loading('Please wait...', 0);
      if (values.parentCategoryId === 0) {
        values.parentCategoryId = null;
      }
      // console.log(values);
      editCategory(values);
      Message.destroy();
      Message.success('Category edited.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditCategoryView onSubmit={handleSubmit} {...props} />;
};

export default compose(withEditCategory, withCategory, translate('category'))(EditCategory);
