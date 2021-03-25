import React from 'react';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import AddCategoryView from '../components/AddCategoryView';
import { withAddCategory } from './CategoryOpertations';
import { AddCategoryInput, EditCategoryInput } from '../../../../packages/server/__generated__/globalTypes';

export interface AddCategoryProps {
  history: History;
  addCategory: (values: AddCategoryInput) => void;
}

const AddCategory: React.FunctionComponent<AddCategoryProps> = props => {
  const { addCategory, history } = props;
  const handleSubmit = (values: EditCategoryInput) => {
    // console.log(values);
    try {
      Message.destroy();
      Message.loading('Please wait...', 0);
      delete values.id;
      if (values.parentCategoryId === null) {
        delete values.parentCategoryId;
      }
      addCategory(values);
      Message.destroy();
      Message.success('Category added.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <AddCategoryView onSubmit={handleSubmit} {...props} />;
};

export default compose(withAddCategory, translate('category'))(AddCategory);
