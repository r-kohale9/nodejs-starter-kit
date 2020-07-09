import React from 'react';
import { PageLayout } from '@gqlapp/look-client-react';
import AddressFormComponent from './AddressFormComponent';

const EditAddressView = props => {
  const { address, addOrEditAddresses, currentUser, t } = props;
  return (
    <PageLayout>
      <div align="center">
        <AddressFormComponent
          cardTitle="Edit Address"
          t={t}
          address={address}
          onSubmit={addOrEditAddresses}
          currentUser={currentUser}
        />
      </div>
    </PageLayout>
  );
};

export default EditAddressView;
