import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import ReviewFormComponent from './ReviewFormComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddReviewView = ({ t, loading, addReview, currentUser }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <ReviewFormComponent cardTitle="Add Review" t={t} onSubmit={addReview} currentUser={currentUser} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

AddReviewView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addReview: PropTypes.func
};

export default AddReviewView;
