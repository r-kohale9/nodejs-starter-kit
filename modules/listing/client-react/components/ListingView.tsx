import React from 'react';

import { MetaTags, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ListingFilterComponent from './ListingFilterComponent.web';
import ListingListComponent from './ListingListComponent.web';

// types
import { ListingProps } from '../containers/Listing.web';

export interface ListingViewProps extends ListingProps {
  showCategoryFilter: boolean;
  showIsActive: boolean;
  affix: boolean;
  onToggle: (
    field: string,
    value: boolean | { id: number; isNew: boolean } | { id: number; isFeatured: boolean },
    id: number
  ) => void;
  onDuplicate: (id: number) => void;
}

const ListingView: React.FC<ListingViewProps> = props => {
  const { t } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <ListingFilterComponent {...props} />
      <ListingListComponent {...props} />
    </PageLayout>
  );
};

export default ListingView;
