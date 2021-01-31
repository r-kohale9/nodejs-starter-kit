import React from 'react';

import { PageLayout, MetaTags, Divider } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import CategoriesFilterComponent from './CategoriesFilterComponent';
import CategoriesListComponent from './CategoriesListComponent';

// types
import { CategoriesProps } from '../containers/Categories.web';

export interface CategoriesViewProps extends CategoriesProps {
  onToggle: (field: string, value: boolean, id: number) => void;
}

const CategoriesView: React.FC<CategoriesViewProps> = props => {
  const { t } = props;
  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />
      <CategoriesFilterComponent {...props} />
      <Divider />
      <CategoriesListComponent {...props} />
    </PageLayout>
  );
};

export default CategoriesView;
