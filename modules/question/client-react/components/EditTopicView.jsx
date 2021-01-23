import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { PageLayout /* MetaTags */ /*  Spinner */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import TopicFormComponent from './TopicFormComponent';

const EditTopicView = (props) => {
  const { loading, t, onSubmit, topic } = props;
  return (
    <PageLayout type="forms">
      {/* <MetaTags title={t('subjectEdit.title')} description={`${settings.app.name} - ${t('subjectEdit.meta')}`} /> */}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <TopicFormComponent cardTitle={t('subjectEdit.cardTitle')} topic={topic} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditTopicView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditTopicView;
