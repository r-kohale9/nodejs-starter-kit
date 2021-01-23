import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { PageLayout /* MetaTags */ /*  Spinner */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import SubjectFormComponent from './SubjectFormComponent';

const SubjectAddView = (props) => {
  const { loading, t, onSubmit } = props;
  return (
    <PageLayout type="forms">
      {/* <MetaTags title={t('subjectAdd.title')} description={`${settings.app.name} - ${t('subjectAdd.meta')}`} /> */}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <SubjectFormComponent cardTitle={t('subjectAdd.cardTitle')} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

SubjectAddView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SubjectAddView;