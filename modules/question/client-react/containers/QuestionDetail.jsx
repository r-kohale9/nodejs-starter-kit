import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { translate } from "@gqlapp/i18n-client-react";

import QuestionDetailView from "../components/QuestionDetailView";
import CURRENT_USER_QUERY from "@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql";

import { useQuestionWithSubscription } from "./withSubscription";
import { withQuestion, withQuestionEditing } from "./QuestionOperations";

const Questions = (props) => {
  const { t, updateQuery, subscribeToMore, question, editQuestion } = props;
  // const filter = { isActive: true };
  useEffect(() => {
    if (props.question) {
      const {
        subscribeToMore,
        question: { id },
        history,
        navigation,
      } = props;
      const subscribe = useQuestionWithSubscription(subscribeToMore, id);
      return () => subscribe();
    }
  });



  console.log("questionsedit", props);
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
      <QuestionDetailView {...props}  />
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

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    },
  }),
  withQuestion,
  withQuestionEditing
)(translate("quiz")(Questions));
