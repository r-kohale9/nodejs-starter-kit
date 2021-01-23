import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import ROUTES from '../routes';
import EditChapterView from '../components/EditChapterView';
import { withEditChapter, withChapter } from './QuestionOperations';
// import { subscribeToChapter } from './ChapterSubscriptions';

const ChapterEdit = props => {
  const { editChapter, history, subscribeToMore, chapter } = props;
  // useEffect(() => {
  //   const subscribe = subscribeToChapter(subscribeToMore, chapter && chapter.id, history);
  //   return () => subscribe();
  // });

  const handleSubmit = values => {
    try {
      message.destroy();
      message.loading('Please wait...', 0);
      console.log(values);
      editChapter(values);
      message.destroy();
      message.success('Chapter edited.');
      history.push('/question/chapter/admin-panel');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditChapterView onSubmit={handleSubmit} {...props} />;
};

ChapterEdit.propTypes = {
  editChapter: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object,
  chapter: PropTypes.object
};

export default compose(
  withEditChapter,
  withChapter,
  translate('question')
)(ChapterEdit);
