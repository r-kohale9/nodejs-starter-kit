import React, { useState } from 'react';

import { PageLayout, MetaTags, Spinner, Steps, Step } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ListingFormComponent from './ListingFormComponent.web';

// types
import { EditListingInput } from '../../../../packages/server/__generated__/globalTypes';
import { EditListingProps } from '../containers/EditListing.web';

export interface EditListingViewProps extends EditListingProps {
  onSubmit: (values: EditListingInput) => void;
}

const EditListingView: React.FC<EditListingViewProps> = props => {
  const { t, listing, loading, onSubmit, currentUser } = props;
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: t('listing.steps.title1')
    },
    {
      title: t('listing.steps.title2')
    },
    {
      title: t('listing.steps.title3')
    }
  ];

  return (
    <PageLayout type="forms">
      <MetaTags title={t('listing.title')} description={`${settings.app.name} - ${t('listing.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <Steps current={step}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <br />
          <br />
          <div align="center">
            <ListingFormComponent
              step={step}
              setStep={setStep}
              cardTitle={t('listing.cardTitle')}
              t={t}
              listing={listing}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default EditListingView;
