import React from 'react';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';

import ReviewFilterComponent from './ReviewFilterComponent.web';
import ReviewListComponent from './ReviewListComponent.web';

// types
import { ReviewProps } from '../containers/Reviews.web';

export interface ReviewViewProps extends ReviewProps {
  //
}

const ReviewsView: React.FC<ReviewViewProps> = props => {
  const { t } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={t('meta')} />

      <ReviewFilterComponent {...props} />
      <ReviewListComponent {...props} />
    </PageLayout>
  );
};

export default translate('review')(ReviewsView);
