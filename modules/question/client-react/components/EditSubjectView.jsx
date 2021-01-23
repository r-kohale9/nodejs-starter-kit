import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { PageLayout /* MetaTags */ /*  Spinner */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import SubjectFormComponent from './SubjectFormComponent';

const EditSubjectView = (props) => {
  const { loading, t, onSubmit, subject } = props;
  return (
    <PageLayout type="forms">
      {/* <MetaTags title={t('subjectEdit.title')} description={`${settings.app.name} - ${t('subjectEdit.meta')}`} /> */}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <SubjectFormComponent cardTitle={t('subjectEdit.cardTitle')} subject={subject} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditSubjectView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditSubjectView;
