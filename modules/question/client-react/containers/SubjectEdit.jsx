import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import ROUTES from '../routes';
import EditSubjectView from '../components/EditSubjectView';
import { withEditSubject, withSubject } from './QuestionOperations';
// import { subscribeToSubject } from './SubjectSubscriptions';

const SubjectEdit = (props) => {
  const { editSubject, history, subscribeToMore, subject } = props;
  // useEffect(() => {
  //   const subscribe = subscribeToSubject(subscribeToMore, subject && subject.id, history);
  //   return () => subscribe();
  // });

  const handleSubmit = (values) => {
    try {
      message.destroy();
      message.loading('Please wait...', 0);
      console.log(values);
      editSubject(values);
      message.destroy();
      message.success('Subject edited.');
      history.push('/question/subject/admin-panel');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditSubjectView onSubmit={handleSubmit} {...props} />;
};

SubjectEdit.propTypes = {
  editSubject: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object,
  subject: PropTypes.object,
};

export default compose(
  withEditSubject,
  withSubject,
  translate('subject')
)(SubjectEdit);
