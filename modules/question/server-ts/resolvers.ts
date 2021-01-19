import withAuth from "graphql-auth";
import { withFilter } from "graphql-subscriptions";

const QUESTIONS_SUBSCRIPTION = "questions_subscription";
const QUESTION_SUBSCRIPTION = "quiz_subscription";
// const QUIZ_WITH_ANSWERS_SUBSCRIPTION = "quiz_with_answers_subscription";

export default (pubsub: any) => ({
  Query: {
    async questionList(
      obj: any,
      { filter, limit, after, orderBy }: any,
      context: any
    ) {
      const questionOutput = await context.Question.getQuestionList(
        filter,
        limit,
        after,
        orderBy
      );
      const { questions, total } = questionOutput;
        console.log('questions', total, questions);
      const hasNextPage = total > after + limit;

      const edgesArray: any = [];
      questions.map((item: any, i: number) => {
        edgesArray.push({
          cursor: after + i,
          node: item,
        });
      });

      const endCursor =
        edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },

    async question(obj: any, { id }: any, context: any) {
      return context.Question.getQuestion(id);
    },
  },
  Mutation: {
    async addQuestion(obj: any, { input }: any, { Question }: any) {
      const id = await Question.addQuestion(input);
      var newQuestion = await Question.getQuestion(id);
      pubsub.publish(QUESTIONS_SUBSCRIPTION, {
        questionsUpdated: {
          mutation: "CREATED",
          node: newQuestion,
        },
      });
      if (id) {
        return newQuestion;
      } else {
        return null;
      }
    },

    deleteQuestion: withAuth(
      async (obj: any, { id }: any, { Question }: any) => {
        try {
          const data = await Question.getQuestion(id);
          await Question.deleteQuestion(id);
          pubsub.publish(QUESTIONS_SUBSCRIPTION, {
            questionsUpdated: {
              mutation: "DELETED",
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),

    editQuestion: withAuth(
      async (obj: any, { input }: any, { Question }: any) => {
        try {
          const inputId = input && input.id;
          await Question.updateQuestion(input);
          var item = await Question.getQuestion(inputId);
          pubsub.publish(QUESTIONS_SUBSCRIPTION, {
            questionsUpdated: {
              mutation: "UPDATED",
              node: item,
            },
          });
          pubsub.publish(QUESTION_SUBSCRIPTION, {
            questionUpdated: {
              mutation: "UPDATED",
              id: item && item.id,
              node: item,
            },
          });
          return item;
        } catch (e) {
          return e;
        }
      }
    ),

    // duplicateQuiz: withAuth(
    //   async (
    //     obj: any,
    //     input: { userId: number; quizId: number },
    //     context: any
    //   ) => {
    //     try {
    //       const res = await context.Quiz.duplicateQuiz(
    //         input.userId,
    //         input.quizId
    //       );
    //       const getQuiz = await context.Quiz.getQuiz(res.id);
    //       // const getUser = await context.User.getUserForQuizSubscription(res.userId)
    //       // res.user = getUser;
    //       pubsub.publish(QUESTIONS_SUBSCRIPTION, {
    //         questionsUpdated: {
    //           mutation: "CREATED",
    //           node: getQuiz,
    //         },
    //       });
    //       return res;
    //     } catch (e) {
    //       return e;
    //     }
    //   }
    // ),
  },
  Subscription: {
    questionsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUESTIONS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.questionsUpdated;
          console.log('serverSubsssssssssssssssssssssssssssss', variables);
          const {
            filter: { searchText, isActive },
          } = variables;
          const checkByFilter =
            (!isActive || isActive === node.isActive.name) &&
            (!searchText ||
              node.description
                .toUpperCase()
                .includes(searchText.toUpperCase()));
          switch (mutation) {
            case "DELETED":
              return true;
            case "CREATED":
              return checkByFilter;
            case "UPDATED":
              return !checkByFilter;
          }
        }
      ),
    },
    questionUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUESTION_SUBSCRIPTION),
        (payload, variables) => {
          return (
            payload &&
            payload.questionUpdated &&
            payload.questionUpdated.id === variables.id
          );
        }
      ),
    },
  },
});
