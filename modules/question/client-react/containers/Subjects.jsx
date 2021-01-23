import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  // withSubjectsState,
  withSubjects
  // withFilterUpdating,
  // withOrderByUpdating,
  // withSubjectDeleting,
  // withEditSubject,
} from './QuestionOperations';
import SubjectsView from '../components/SubjectsView';
// import { subscribeToSubjects } from './SubjectSubscriptions';

const Subjects = props => {
  const { subscribeToMore, editSubject } = props;
  // useEffect(() => {
  //   const subscribe = subscribeToSubjects(subscribeToMore, props.filter);
  //   return () => subscribe();
  // });
  const handleToggle = (field, value, id) => {
    const input = {};
    input.id = id;
    _.set(input, field, value);
    try {
      editSubject(input);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <SubjectsView onToggle={handleToggle} filter={{}} {...props} />;
};
Subjects.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  editSubject: PropTypes.func
};

export default compose(
  // withSubjectsState,
  withSubjects,
  // withFilterUpdating,
  // withOrderByUpdating,
  // withSubjectDeleting,
  // withEditSubject,
  translate('question')
)(Subjects);
