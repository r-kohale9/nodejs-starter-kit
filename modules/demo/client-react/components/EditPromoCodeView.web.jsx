import React from 'react';
import { PageLayout } from '@gqlapp/look-client-react';
import PromoCodeFormComponent from './PromoCodeFormComponent';

const EditPromoCodeView = props => {
  const { promoCode, editPromoCode, currentUser, t } = props;
  return (
    <PageLayout>
      <div align="center">
        <PromoCodeFormComponent
          cardTitle="Edit PromoCode"
          t={t}
          promoCode={promoCode}
          onSubmit={editPromoCode}
          currentUser={currentUser}
        />
      </div>
    </PageLayout>
  );
};

export default EditPromoCodeView;
