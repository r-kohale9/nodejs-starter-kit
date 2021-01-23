import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename, log } from '@gqlapp/core-common';
import update from 'immutability-helper';
import { message } from 'antd';

// import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import SUBJECTS_QUERY from '../graphql/SubjectsQuery.graphql';
import SUBJECT_QUERY from '../graphql/SubjectQuery.graphql';
import QUESTION_LIST_QUERY from '../graphql/QuestionListQuery.graphql';
import UPDATE_QUESTION_LIST_FILTER from '../graphql/UpdateQuestionListFilter.client.graphql';
import QUESTION_LIST_STATE_QUERY from '../graphql/QuestionListStateQuery.client.graphql';
// import UPDATE_ORDER_BY from "../graphql/UpdateOrderBy.client.graphql";
import QUESTION_EDIT from '../graphql/QuestionEdit.graphql';
import DELETE_QUESTION from '../graphql/DeleteQuestion.graphql';
import ADD_QUESTION from '../graphql/AddQuestion.graphql';
import ADD_SUBJECT from '../graphql/AddSubject.graphql';
import EDIT_SUBJECT from '../graphql/EditSubject.graphql';
import ADD_CHAPTER from '../graphql/AddChapter.graphql';
import ADD_TOPIC from '../graphql/AddTopic.graphql';
import QUESTION_QUERY from '../graphql/QuestionQuery.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const withQuestionListState = Component =>
  graphql(QUESTION_LIST_STATE_QUERY, {
    props({ data }) {
      const questionListState = removeTypename(data.questionListState);
      return { ...questionListState, stateLoading: data.loading };
    }
  })(Component);

// const withFeaturedQuestionList = (Component) =>
//   graphql(QUESTION_LIST_QUERY, {
//     options: () => {
//       return {
//         // eslint-disable-next-line prettier/prettier
//         variables: {
//           limit: 10,
//           filter: { isFeatured: "true" },
//         },
//         fetchPolicy: "network-only",
//       };
//     },
//     props: ({ data }) => {
//       const { loading, error, questionList } = data;
//       // console.log("ops", profiles);
//       if (error) throw new Error(error);
//       return { loading, questionList };
//     },
//   })(Component);

const withAdminQuestionList = Component =>
  graphql(QUESTION_LIST_QUERY, {
    options: ({ orderBy, filter }) => {
      const filterss = filter;
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { filter: filterss, after: 0, limit: limit, orderBy },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, questionList, fetchMore, updateQuery, subscribeToMore } = data;
      // console.log("ops", profiles);
      const loadDataQuestionList = async (after, dataDelivery) => {
        return await fetchMore({
          variables: {
            after: after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.questionList.totalCount;
            const newEdges = fetchMoreResult.questionList.edges;
            const pageInfo = fetchMoreResult.questionList.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.questionList.edges, ...newEdges] : newEdges;
            return {
              questionList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        questionList,
        loadDataQuestionList,
        updateQuery,
        subscribeToMore
      };
    }
  })(Component);

// const withCardQuestionList = (Component) =>
//   graphql(QUESTION_LIST_QUERY, {
//     options: ({ orderBy, filter, currentUser }) => {
//       // filter.today = true;
//       console.log('cardQuestionList', currentUser);
//       return {
//         // eslint-disable-next-line prettier/prettier
//         variables: {
//           filter,
//           limit,
//           after: 0,
//           orderBy,
//           userId: currentUser && currentUser.id,
//         },
//         fetchPolicy: "network-only",
//       };
//     },
//     props: ({ data }) => {
//       const {
//         loading,
//         error,
//         questionList,
//         fetchMore,
//         updateQuery,
//         subscribeToMore,
//       } = data;
//       // console.log("ops", profiles);
//       const loadDataQuestionList = async (after, dataDelivery) => {
//         return await fetchMore({
//           variables: {
//             after: after,
//           },

//           updateQuery: (previousResult, { fetchMoreResult }) => {
//             const totalCount = fetchMoreResult.questionList.totalCount;
//             const newEdges = fetchMoreResult.questionList.edges;
//             const pageInfo = fetchMoreResult.questionList.pageInfo;
//             const displayedEdges =
//               dataDelivery === "add"
//                 ? [...previousResult.questionList.edges, ...newEdges]
//                 : newEdges;
//             return {
//               questionList: {
//                 // By returning `cursor` here, we update the `fetchMore` function
//                 // to the new cursor.

//                 totalCount,
//                 edges: displayedEdges,
//                 pageInfo,
//                 __typename: "Profiles",
//               },
//             };
//           },
//         });
//       };
//       if (error) throw new Error(error);
//       return {
//         loading,
//         questionList,
//         loadDataQuestionList,
//         updateQuery,
//         subscribeToMore,
//       };
//     },
//   })(Component);

const withFilterUpdating = Component =>
  graphql(UPDATE_QUESTION_LIST_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      }
    })
  })(Component);

// const withOrderByUpdating = (Component) =>
//   graphql(UPDATE_ORDER_BY, {
//     props: ({ mutate }) => ({
//       onOrderBy: (orderBy) => {
//         mutate({ variables: { orderBy } });
//       },
//     }),
//   })(Component);

const updateQuestionListState = (questionListUpdated, updateQuery) => {
  const { mutation, node } = questionListUpdated;
  console.log('updatedFaqsState', mutation, node);
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return addQuestionItem(prev, node);
      case 'DELETED':
        return deleteQuestionItem(prev, node.id);
      case 'UPDATED':
        return updateQuestionItem(prev, node);
      default:
        return prev;
    }
  });
};

function addQuestionItem(prev, node) {
  // check if it is duplicate
  if (prev.questionList.edges.some(x => x.node.id === node.id)) {
    return prev;
  }
  return update(prev, {
    questionList: {
      $set: [...prev.questionList.edges, node]
    }
  });
}

function updateQuestionItem(prev, node) {
  // check if it is duplicate
  if (prev.questionList.edges.some(x => x.node.id === node.id)) {
    return prev;
  }
  var data = prev;
  const index = prev.questionList.edges.indexOf(x => x.node.id === node.id);
  data.questionList.edges[index] = node;
  return update(prev, {
    questionList: {
      $set: [...data.questionList.edges]
    }
  });
}

function deleteQuestionItem(prev, id) {
  const index = prev.questionList.edges.findIndex(x => x.node.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    questionList: {
      totalCount: {
        $set: prev.questionList.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

// const onUpdateProfile = (prev, id) => {
//   const index = prev.profiles.edges.findIndex((x) => x.node.id === id);

//   // ignore if not found
//   if (index < 0) {
//     return prev;
//   }

//   return update(prev, {
//     faqs: {
//       totalCount: {
//         $set: prev.profiles.totalCount - 1,
//       },
//       edges: {
//         $splice: [[index, 1]],
//       },
//     },
//   });
// };

const withQuestionEditing = Component =>
  graphql(QUESTION_EDIT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editQuestion: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let questionData = await mutate({
            variables: {
              input: values
            }
          });
          message.destroy();
          message.success('Question edited.');
          return questionData;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

const withQuestionDeleting = Component =>
  graphql(DELETE_QUESTION, {
    props: ({ mutate }) => ({
      deleteQuestion: async id => {
        try {
          const {
            data: { deleteQuestion }
          } = await mutate({
            variables: { id }
          });
          message.destroy();
          message.success('Question deleted.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

const withAddQuestion = Component =>
  graphql(ADD_QUESTION, {
    props: ({ mutate }) => ({
      addQuestion: async values => {
        try {
          const {
            data: { addQuestion }
          } = await mutate({
            variables: { input: values }
          });
          message.destroy();
          message.success('Question Added.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

const withQuestion = Component =>
  graphql(QUESTION_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, question, refetch, updateQuery, subscribeToMore } }) {
      if (error) throw new Error(error);
      return {
        questionLoading: loading,
        question,
        refetch,
        updateQuery,
        subscribeToMore
      };
    }
  })(Component);

export const withAddSubject = Component =>
  graphql(ADD_SUBJECT, {
    props: ({ mutate }) => ({
      addSubject: async values => {
        try {
          const {
            data: { addSubject: id }
          } = await mutate({
            variables: {
              input: values
            }
          });
          return id;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
export const withAddChapter = Component =>
  graphql(ADD_CHAPTER, {
    props: ({ mutate }) => ({
      addChapter: async values => {
        try {
          const {
            data: { addChapter: id }
          } = await mutate({
            variables: {
              input: values
            }
          });
          return id;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
export const withAddTopic = Component =>
  graphql(ADD_TOPIC, {
    props: ({ mutate }) => ({
      addTopic: async values => {
        try {
          const {
            data: { addTopic: id }
          } = await mutate({
            variables: {
              input: values
            }
          });
          return id;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withSubjects = Component =>
  graphql(SUBJECTS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, subjects, fetchMore, updateQuery, subscribeToMore } = data;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.subjects.totalCount;
            const newEdges = fetchMoreResult.subjects.edges;
            const pageInfo = fetchMoreResult.subjects.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.subjects.edges, ...newEdges] : newEdges;

            return {
              subjects: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        subjects,
        loadData,
        updateQuery,
        subscribeToMore
      };
    }
  })(Component);

export const withSubject = Component =>
  graphql(SUBJECT_QUERY, {
    options: props => {
      let id = '0';
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id: Number(id) || props.modalId }
      };
    },
    props({ data: { loading, error, subject, subscribeToMore, updateQuery } }) {
      if (error) {
        throw new Error(error.message);
      }
      return { loading, subject, subscribeToMore, updateQuery };
    }
  })(Component);

export const withEditSubject = Component =>
  graphql(EDIT_SUBJECT, {
    props: ({ mutate }) => ({
      editSubject: async input => {
        try {
          await mutate({
            variables: {
              input
            }
          });
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export {
  withQuestionListState,
  // withCardQuestionList,
  withAdminQuestionList,
  // withFeaturedQuestionList,
  withFilterUpdating,
  updateQuestionListState,
  withQuestionEditing,
  withQuestionDeleting,
  withAddQuestion,
  withQuestion
  // withOrderByUpdating,
};
// export { updateListingsState };
