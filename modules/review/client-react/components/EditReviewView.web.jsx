import React from 'react';
import { PageLayout } from '@gqlapp/look-client-react';
import ReviewFormComponent from './ReviewFormComponent';

const EditReviewView = props => {
  const { review, editReview, currentUser, t } = props;
  return (
    <PageLayout>
      <div align="center">
        <ReviewFormComponent
          cardTitle="Edit Review"
          t={t}
          review={review}
          onSubmit={editReview}
          currentUser={currentUser}
        />
      </div>
    </PageLayout>
  );
};

export default EditReviewView;
