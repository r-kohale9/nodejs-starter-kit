import React from 'react';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags, Col, Row, Steps, Step, Spinner } from '@gqlapp/look-client-react';

import ListingFormComponent from './ListingFormComponent.web';

// types
import { AddListingProps } from '../containers/AddListing.web';
import { EditListingInput } from '../../../../packages/server/__generated__/globalTypes';
import { listing_listing as Listing } from '../graphql/__generated__/listing';

export interface AddListingViewProps extends AddListingProps {
  onSubmit: (values: EditListingInput) => void;
}

const AddListingView: React.FC<AddListingViewProps> = props => {
  const { t, loading, onSubmit, currentUser } = props;
  const [step, setStep] = React.useState(0);
  // const listing: { isActive: boolean } = { isActive: true };
  const listing: Listing = {};
  listing.isActive = true;
  const steps = [
    {
      title: t('listAdd.steps.title1')
    },
    {
      title: t('listAdd.steps.title2')
    },
    {
      title: t('listAdd.steps.title3')
    }
  ];
  return (
    <PageLayout type="forms">
      <MetaTags title={t('listAdd.title')} description={`${settings.app.name} - ${t('listAdd.meta')}`} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <br />
          <br />
          <Row justify="center">
            <Col
              xl={{ span: 24, offset: 0 }}
              lg={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 6 }}
            >
              <Steps current={step}>
                {steps.map((item: { title: string }) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
          </Row>
          <br />
          <br />
          <div align="center">
            <ListingFormComponent
              step={step}
              setStep={(s: number) => setStep(s)}
              cardTitle={t('listAdd.cardTitle')}
              listing={listing}
              t={t}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default AddListingView;
