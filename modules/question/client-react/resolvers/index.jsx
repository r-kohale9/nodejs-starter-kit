import update from "immutability-helper";

import QUESTION_LIST_STATE_QUERY from "../graphql/QuestionListStateQuery.client.graphql";

const TYPE_QUESTION_LIST_STATE = "QuestionListState";
const TYPE_QUESTION_LIST_STATE_FILTER = "FilterQuestionInput";

const defaults = {
  questionListState: {
    filter: {
      searchText: "",
      isActive: false,
      __typename: TYPE_QUESTION_LIST_STATE_FILTER,
    },
    __typename: TYPE_QUESTION_LIST_STATE,
  },
};

const resolvers = {
  Mutation: {
    updateQuestionListFilter: (_, { filter }, { cache }) => {
      const { questionListState } = cache.readQuery({
        query: QUESTION_LIST_STATE_QUERY,
      });

      const newQuestionListState = update(questionListState, {
        filter: { $merge: filter },
      });

      cache.writeData({
        data: {
          questionListState: newQuestionListState,
          __type: TYPE_QUESTION_LIST_STATE,
        },
      });

      return null;
    },
  },
};

export default {
  defaults,
  resolvers,
};
