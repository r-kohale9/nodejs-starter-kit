import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { PageLayout /* MetaTags */ /*  Spinner */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ChapterFormComponent from './ChapterFormComponent';

const EditChapterView = props => {
  const { loading, t, onSubmit, chapter } = props;
  return (
    <PageLayout type="forms">
      {/* <MetaTags title={t('chapterEdit.title')} description={`${settings.app.name} - ${t('chapterEdit.meta')}`} /> */}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <ChapterFormComponent cardTitle={t('chapterEdit.cardTitle')} chapter={chapter} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

EditChapterView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default EditChapterView;
