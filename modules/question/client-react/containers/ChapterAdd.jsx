import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ChapterAddView from '../components/ChapterAddView';

import { withAddChapter } from './QuestionOperations';

const ChapterAdd = (props) => {
  const { t, addChapter, history } = props;
  // const filter = { isActive: true };

  const onSubmit = async (values) => {
    // values.id = question && question.id;
    delete values.id;
    console.log('values', values);
    await addChapter(values);
    history.push('/question/admin');
  };

  console.log('props', props);
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
      <ChapterAddView {...props} onSubmit={onSubmit} />
    </>
  );
};

ChapterAdd.propTypes = {
  // usersUpdated: PropTypes.object,
  // updateQuery: PropTypes.func,
  // t: PropTypes.func,
  // subscribeToMore: PropTypes.func,
  // filter: PropTypes.object
};

export default compose(withAddChapter)(translate('question')(ChapterAdd));
