import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Subscription } from "react-apollo";

import QUESTIONS_SUBSCRIPTION from "../graphql/QuestionsSubscription.graphql";
import QUESTION_SUBSCRIPTION from "../graphql/QuestionSubscription.graphql";

export const useQuestionsWithSubscription = (subscribeToMore, filter) => {
  const [questionsUpdated, setQuestionsUpdated] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToQuestions();
    return () => unsubscribe();
  });

  const subscribeToQuestions = () => {
    return subscribeToMore({
      document: QUESTIONS_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { questionsUpdated: newData },
          },
        }
      ) => {
        setQuestionsUpdated(newData);
      },
    });
  };

  return questionsUpdated;
};

export const useQuestionWithSubscription = (subscribeToMore, questionId) =>
  subscribeToMore({
    document: QUESTION_SUBSCRIPTION,
    variables: { id: questionId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            questionUpdated: { mutation, node },
          },
        },
      }
    ) => {
      if (mutation === "UPDATED") {
        return { question: node };
      }
      return prev;
    },
  });

export default (Component) => {
  const QuestionsWithSubscription = (props) => {
    const { filter } = props;
    return (
      <Subscription
        subscription={QUESTIONS_SUBSCRIPTION}
        variables={{ filter }}
      >
        {({ data, loading }) => {
          if (!loading && data.questionsUpdated) {
            return (
              <Component {...props} questionsUpdated={data.questionsUpdated} />
            );
          }

          return <Component {...props} />;
        }}
      </Subscription>
    );
  };

  QuestionsWithSubscription.propTypes = {
    filter: PropTypes.object,
  };

  return QuestionsWithSubscription;
};
