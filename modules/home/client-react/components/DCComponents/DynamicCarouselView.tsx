import React from 'react';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import DynamicCarouselFilterComponent from './DynamicCarouselFilterComponent';
import DynamicCarouselListView from './DynamicCarouselListView';

// types
import { DynamicCarouselProps } from '../../containers/DCComponents/DynamicCarousel.web';

export interface DynamicCarouselViewProps extends DynamicCarouselProps {
  //
}

const DynamicCarouselView: React.FC<DynamicCarouselViewProps> = props => {
  return (
    <PageLayout>
      <MetaTags
        title="DynamicCarousel - Admin"
        description={`${settings.app.name} - ${'View and edit DynamicCarousel'}`}
      />

      <DynamicCarouselFilterComponent {...props} />
      <DynamicCarouselListView {...props} />
    </PageLayout>
  );
};

export default DynamicCarouselView;
