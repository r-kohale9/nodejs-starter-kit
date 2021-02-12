import React from 'react';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';

import DiscountFormComponent from './DiscountFormComponent.web';
import { EditDiscountProps } from '../containers/EditDiscount.web';
import { EditDiscountInput } from '../../../../packages/server/__generated__/globalTypes';
import { modalDiscount_modalDiscount as ModalDiscount } from '../graphql/__generated__/modalDiscount';

interface EditDiscountViewProps extends EditDiscountProps {
  onSubmit: (values: EditDiscountInput) => void;
  modalDiscount?: ModalDiscount;
}

const EditDiscountView: React.FunctionComponent<EditDiscountViewProps> = props => {
  const { t, loading, onSubmit, modalDiscount } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('discountEdit.title')} description={`${settings.app.name} - ${t('discountEdit.meta')}`} />
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
            <DiscountFormComponent
              cardTitle={t('discountEdit.cardTitle')}
              t={t}
              onSubmit={onSubmit}
              modalDiscount={modalDiscount}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default EditDiscountView;
