import React from 'react';

import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import CategoryFormComponent from './CategoryFormComponent';

// types
import { EditCategoryProps } from '../containers/EditCategory';
import { EditCategoryInput } from '../../../../packages/server/__generated__/globalTypes';

interface EditCategoryViewProps extends EditCategoryProps {
  t: TranslateFunction;
  onSubmit: (values: EditCategoryInput) => void;
}

const EditCategoryView: React.FunctionComponent<EditCategoryViewProps> = props => {
  const { loading, t, onSubmit, category } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('categoryEdit.title')} description={`${settings.app.name} - ${t('categoryEdit.meta')}`} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div align="center">
            <CategoryFormComponent
              category={category}
              cardTitle={t('categoryEdit.cardTitle')}
              onSubmit={onSubmit}
              t={t}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default EditCategoryView;
