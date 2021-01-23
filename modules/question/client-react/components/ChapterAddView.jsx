import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { PageLayout /* MetaTags */ /*  Spinner */ } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ChapterFormComponent from './ChapterFormComponent';

const ChapterAddView = props => {
  const { loading, t, onSubmit } = props;
  return (
    <PageLayout type="forms">
      {/* <MetaTags title={t('chapterAdd.title')} description={`${settings.app.name} - ${t('chapterAdd.meta')}`} /> */}
      {loading ? (
        <Spin />
      ) : (
        <>
          <div align="center">
            <ChapterFormComponent cardTitle={t('chapterAdd.cardTitle')} onSubmit={onSubmit} t={t} />
          </div>
        </>
      )}
    </PageLayout>
  );
};

ChapterAddView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ChapterAddView;
