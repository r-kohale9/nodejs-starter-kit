import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import ROUTES from '../routes';
import EditTopicView from '../components/EditTopicView';
import { withEditTopic, withTopic } from './QuestionOperations';
// import { subscribeToTopic } from './TopicSubscriptions';

const TopicEdit = (props) => {
  const { editTopic, history, subscribeToMore, subject } = props;
  // useEffect(() => {
  //   const subscribe = subscribeToTopic(subscribeToMore, subject && subject.id, history);
  //   return () => subscribe();
  // });

  const handleSubmit = (values) => {
    try {
      message.destroy();
      message.loading('Please wait...', 0);
      console.log(values);
      editTopic(values);
      message.destroy();
      message.success('Topic edited.');
      history.push('/question/subject/admin-panel');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditTopicView onSubmit={handleSubmit} {...props} />;
};

TopicEdit.propTypes = {
  editTopic: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object,
  subject: PropTypes.object,
};

export default compose(
  withEditTopic,
  withTopic,
  translate('subject')
)(TopicEdit);
