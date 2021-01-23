import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import TopicAddView from '../components/TopicAddView';

import { withAddTopic } from './QuestionOperations';

const TopicAdd = props => {
  const { t, addTopic, history } = props;
  // const filter = { isActive: true };

  const onSubmit = async values => {
    // values.id = question && question.id;
    delete values.id;
    delete values.subjectId;
    console.log('values', values);
    await addTopic(values);
    history.push('/question/admin');
  };

  // console.log('props', props);
  return (
    <>
      {/* {renderMetaData()}
      <h2>Questions</h2>
      <Link to="/question/add">
        <Button color="primary">{"Add Quiz"}</Button>
      </Link>
      <hr /> */}

      {/* <QuestionsFilterView {...props} filter={filter} />
      <hr />*/}
      <TopicAddView {...props} onSubmit={onSubmit} />
    </>
  );
};

TopicAdd.propTypes = {
  // usersUpdated: PropTypes.object,
  // updateQuery: PropTypes.func,
  // t: PropTypes.func,
  // subscribeToMore: PropTypes.func,
  // filter: PropTypes.object
};

export default compose(withAddTopic)(translate('question')(TopicAdd));
