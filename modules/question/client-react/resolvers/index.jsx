import update from 'immutability-helper';

import QUESTION_LIST_STATE_QUERY from '../graphql/QuestionListStateQuery.client.graphql';
import SUBJECT_STATE_QUERY from '../graphql/SubjectsStateQuery.client.graphql';
import CHAPTER_STATE_QUERY from '../graphql/ChaptersStateQuery.client.graphql';

const TYPE_QUESTION_LIST_STATE = 'QuestionListState';
const TYPE_QUESTION_LIST_STATE_FILTER = 'FilterQuestionInput';

const TYPE_SUBJECT_STATE = 'SubjectsState';
const TYPE_SUBJECT_STATE_FILTER = 'SubjectsInput';

const TYPE_CHAPTER_STATE = 'ChaptersState';
const TYPE_CHAPTER_STATE_FILTER = 'ChaptersInput';

const defaults = {
  questionListState: {
    filter: {
      searchText: '',
      isActive: false,
      __typename: TYPE_QUESTION_LIST_STATE_FILTER
    },
    __typename: TYPE_QUESTION_LIST_STATE
  },
  subjectsState: {
    filter: {
      searchText: '',
      isActive: true,
      __typename: TYPE_SUBJECT_STATE
    },
    __typename: TYPE_SUBJECT_STATE_FILTER
  },
  chaptersState: {
    filter: {
      searchText: '',
      isActive: true,
      __typename: TYPE_CHAPTER_STATE
    },
    __typename: TYPE_CHAPTER_STATE_FILTER
  }
};

const resolvers = {
  Mutation: {
    updateQuestionListFilter: (_, { filter }, { cache }) => {
      const { questionListState } = cache.readQuery({
        query: QUESTION_LIST_STATE_QUERY
      });

      const newQuestionListState = update(questionListState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          questionListState: newQuestionListState,
          __type: TYPE_QUESTION_LIST_STATE
        }
      });

      return null;
    },
    updateSubjectFilter: (_, { filter }, { cache }) => {
      const { subjectsState } = cache.readQuery({
        query: SUBJECT_STATE_QUERY
      });

      const newQuestionListState = update(subjectsState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          subjectsState: newQuestionListState,
          __type: TYPE_SUBJECT_STATE_FILTER
        }
      });

      return null;
    },
    updateChapterFilter: (_, { filter }, { cache }) => {
      const { chaptersState } = cache.readQuery({
        query: CHAPTER_STATE_QUERY
      });
      const newQuestionListState = update(chaptersState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          chaptersState: newQuestionListState,
          __type: TYPE_CHAPTER_STATE_FILTER
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
