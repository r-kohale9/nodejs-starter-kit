import React from 'react';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';

import DiscountFormComponent from './DiscountFormComponent.web';
import { AddDiscountProps } from '../containers/AddDiscount.web';

// types
import { EditDiscountInput } from '../../../../packages/server/_generated_/globalTypes';

export interface AddDiscountViewProps extends AddDiscountProps {
  onSubmit: (values: EditDiscountInput) => void;
}

const AddDiscountView: React.FC<AddDiscountViewProps> = props => {
  const { t, loading, onSubmit } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('discountAdd.title')} description={`${settings.app.name} - ${t('discountAdd.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div align="center">
            <DiscountFormComponent cardTitle={t('discountAdd.cardTitle')} t={t} onSubmit={onSubmit} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default AddDiscountView;
