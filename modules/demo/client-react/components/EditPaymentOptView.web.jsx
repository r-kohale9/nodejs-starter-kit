import React from 'react';
import { PageLayout } from '@gqlapp/look-client-react';
import PaymentOptFormComponent from './PaymentOptFormComponent';

const EditPaymentOptView = props => {
  const { paymentOpt, editPaymentOpt, currentUser, t } = props;
  return (
    <PageLayout>
      <div align="center">
        <PaymentOptFormComponent
          cardTitle="Edit PaymentOpt"
          t={t}
          paymentOpt={paymentOpt}
          onSubmit={editPaymentOpt}
          currentUser={currentUser}
        />
      </div>
    </PageLayout>
  );
};

export default EditPaymentOptView;
