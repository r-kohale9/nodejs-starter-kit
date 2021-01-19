import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";

import QuestionAddView from "../components/QuestionAddView";

import { withAddQuestion } from "./QuestionOperations";

const Questions = (props) => {
  const { t, addQuestion, history } = props;
  // const filter = { isActive: true };

  const onSubmit = async (values) => {
    // values.id = question && question.id;
    console.log("values", values);
    await addQuestion(values);
    history.push("/question/admin");
  };

  console.log("questionsadd", props);
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
      <QuestionAddView {...props} onSubmit={onSubmit} />
    </>
  );
};

Questions.propTypes = {
  // usersUpdated: PropTypes.object,
  // updateQuery: PropTypes.func,
  // t: PropTypes.func,
  // subscribeToMore: PropTypes.func,
  // filter: PropTypes.object
};

export default compose(withAddQuestion)(translate("quiz")(Questions));
