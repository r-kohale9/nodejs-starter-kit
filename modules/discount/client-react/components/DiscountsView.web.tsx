import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import { DiscountsProps } from '../containers/Discounts.web';

import DiscountsFilterComponent from './DiscountsFilterComponent';
import DiscountsListComponent from './DiscountsListComponent';

export interface DiscountsViewProps extends DiscountsProps {
  // t: TranslateFunction;
}

const DiscountsView: React.FC<DiscountsViewProps> = props => {
  const { t } = props;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <DiscountsFilterComponent showIsActive={true} {...props} />
      <DiscountsListComponent {...props} />
    </PageLayout>
  );
};

DiscountsView.propTypes = {
  t: PropTypes.func
};

export default DiscountsView;
