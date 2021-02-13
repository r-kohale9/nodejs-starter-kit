import React from 'react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import CategoryFormComponent from './CategoryFormComponent';
// types
import { AddCategoryInput } from '../../../../packages/server/__generated__/globalTypes';
import { AddCategoryProps } from '../containers/AddCategory';
interface AddCategoryViewProps extends AddCategoryProps {
  loading: boolean;
  t: TranslateFunction;
  onSubmit: (values: AddCategoryInput) => void;
}

const AddCategoryView: React.FunctionComponent<AddCategoryViewProps> = props => {
  const { loading, t, onSubmit } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('categoryAdd.title')} description={`${settings.app.name} - ${t('categoryAdd.meta')}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div align="center">
            <CategoryFormComponent cardTitle={t('categoryAdd.cardTitle')} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default AddCategoryView;
