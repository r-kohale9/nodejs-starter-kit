import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

const QUESTIONS_SUBSCRIPTION = 'questions_subscription';
const QUESTION_SUBSCRIPTION = 'quiz_subscription';
// const QUIZ_WITH_ANSWERS_SUBSCRIPTION = "quiz_with_answers_subscription";

import { Subject as Subjects, Chapter as Chapters, Topic as Topics, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Subjects & Identifier;
}

interface SubjectInput {
  input: Subjects;
}
interface ChapterInput {
  input: Chapters;
}
interface TopicInput {
  input: Topics;
}

interface SubjectInputWithId {
  input: Subjects & Identifier;
}
interface ChapterInputWithId {
  input: Chapters & Identifier;
}
interface TopicInputWithId {
  input: Topics & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async questionList(obj: any, { filter, limit, after, orderBy }: any, context: any) {
      const questionOutput = await context.Question.getQuestionList(filter, limit, after, orderBy);
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

      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
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

    async subjects(obj: any, { limit, after, orderBy, filter }: any, { Question, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, subjects } = await Question.subjectsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      subjects.map((subject: Subjects & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: subject,
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },
    async chapters(obj: any, { limit, after, orderBy, filter }: any, { Question, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, chapters } = await Question.chaptersPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      chapters.map((chapter: Subjects & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: chapter,
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },
    async topics(obj: any, { limit, after, orderBy, filter }: any, { Question, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, topics } = await Question.topicsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      topics.map((topic: Subjects & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: topic,
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },
    async subject(obj: any, { id }: Identifier, context: any) {
      return context.Question.subject(id);
    },
    async chapter(obj: any, { id }: Identifier, context: any) {
      return context.Question.chapter(id);
    },
    async topic(obj: any, { id }: Identifier, context: any) {
      return context.Question.topic(id);
    },
  },
  Mutation: {
    async addQuestion(obj: any, { input }: any, { Question }: any) {
      const id = await Question.addQuestion(input);
      let newQuestion = await Question.getQuestion(id);
      pubsub.publish(QUESTIONS_SUBSCRIPTION, {
        questionsUpdated: {
          mutation: 'CREATED',
          node: newQuestion,
        },
      });
      if (id) {
        return newQuestion;
      } else {
        return null;
      }
    },

    deleteQuestion: withAuth(async (obj: any, { id }: any, { Question }: any) => {
      try {
        const data = await Question.getQuestion(id);
        await Question.deleteQuestion(id);
        pubsub.publish(QUESTIONS_SUBSCRIPTION, {
          questionsUpdated: {
            mutation: 'DELETED',
            node: data,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    }),

    editQuestion: withAuth(async (obj: any, { input }: any, { Question }: any) => {
      try {
        const inputId = input && input.id;
        await Question.updateQuestion(input);
        let item = await Question.getQuestion(inputId);
        pubsub.publish(QUESTIONS_SUBSCRIPTION, {
          questionsUpdated: {
            mutation: 'UPDATED',
            node: item,
          },
        });
        pubsub.publish(QUESTION_SUBSCRIPTION, {
          questionUpdated: {
            mutation: 'UPDATED',
            id: item && item.id,
            node: item,
          },
        });
        return item;
      } catch (e) {
        return e;
      }
    }),

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

    addSubject: withAuth(async (obj: any, { input }: SubjectInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.req.identity.id;
        }
        const id = await context.Question.addSubject(input);
        // const subject = await context.Question.subject(id);
        // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'CREATED',
        //     id,
        //     node: subject
        //   }
        // });
        return id;
      } catch (e) {
        return e;
      }
    }),
    addChapter: withAuth(async (obj: any, { input }: ChapterInput, context: any) => {
      try {
        const id = await context.Question.addChapter(input);
        // const chapter = await context.Question.chapter(id);
        // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'CREATED',
        //     id,
        //     node: chapter
        //   }
        // });
        return id;
      } catch (e) {
        return e;
      }
    }),
    addTopic: withAuth(async (obj: any, { input }: TopicInput, context: any) => {
      try {
        const id = await context.Question.addTopic(input);
        // const topic = await context.Question.topic(id);
        // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'CREATED',
        //     id,
        //     node: topic
        //   }
        // });
        return id;
      } catch (e) {
        return e;
      }
    }),
    editSubject: withAuth(async (obj: any, { input }: SubjectInputWithId, { Question }: any) => {
      try {
        // const listing = await Question.listing(input.id);
        await Question.editSubject(input);
        // const newListing = await Question.listing(input.id);
        // if (listing) {
        //   // publish for listing list
        //   pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //     listingsUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        //   // publish for edit listing page
        //   pubsub.publish(LISTING_SUBSCRIPTION, {
        //     listingUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        // }
        return true;
      } catch (e) {
        return e;
      }
    }),
    editChapter: withAuth(async (obj: any, { input }: ChapterInputWithId, { Question }: any) => {
      try {
        // const listing = await Question.listing(input.id);
        await Question.editChapter(input);
        // const newListing = await Question.listing(input.id);
        // if (listing) {
        //   // publish for listing list
        //   pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //     listingsUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        //   // publish for edit listing page
        //   pubsub.publish(LISTING_SUBSCRIPTION, {
        //     listingUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        // }
        return true;
      } catch (e) {
        return e;
      }
    }),
    editTopic: withAuth(async (obj: any, { input }: TopicInputWithId, { Question }: any) => {
      try {
        // const listing = await Question.listing(input.id);
        await Question.editTopic(input);
        // const newListing = await Question.listing(input.id);
        // if (listing) {
        //   // publish for listing list
        //   pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //     listingsUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        //   // publish for edit listing page
        //   pubsub.publish(LISTING_SUBSCRIPTION, {
        //     listingUpdated: {
        //       mutation: 'UPDATED',
        //       id: newListing.id,
        //       node: newListing
        //     }
        //   });
        // }
        return true;
      } catch (e) {
        return e;
      }
    }),
    deleteSubject: withAuth(async (obj: any, { id }: Identifier, { Question }: any) => {
      // const listing = await Listing.listing(id);
      const isDeleted = await Question.deleteSubject(id);
      if (isDeleted) {
        // // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'DELETED',
        //     id,
        //     node: listing
        //   }
        // });
        // // publish for edit listing page
        // pubsub.publish(LISTING_SUBSCRIPTION, {
        //   listingUpdated: {
        //     mutation: 'DELETED',
        //     id, // import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
        //     node: listing
        //   }
        // });
        return true;
      } else {
        return false;
      }
    }),
    deleteChapter: withAuth(async (obj: any, { id }: Identifier, { Question }: any) => {
      // const listing = await Listing.listing(id);
      const isDeleted = await Question.deleteChapter(id);
      if (isDeleted) {
        // // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'DELETED',
        //     id,
        //     node: listing
        //   }
        // });
        // // publish for edit listing page
        // pubsub.publish(LISTING_SUBSCRIPTION, {
        //   listingUpdated: {
        //     mutation: 'DELETED',
        //     id, // import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
        //     node: listing
        //   }
        // });
        return true;
      } else {
        return false;
      }
    }),
    deleteTopic: withAuth(async (obj: any, { id }: Identifier, { Question }: any) => {
      // const listing = await Listing.listing(id);
      const isDeleted = await Question.deleteTopic(id);
      if (isDeleted) {
        // // publish for listing list
        // pubsub.publish(LISTINGS_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'DELETED',
        //     id,
        //     node: listing
        //   }
        // });
        // // publish for edit listing page
        // pubsub.publish(LISTING_SUBSCRIPTION, {
        //   listingUpdated: {
        //     mutation: 'DELETED',
        //     id, // import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
        //     node: listing
        //   }
        // });
        return true;
      } else {
        return false;
      }
    }),
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
            (!searchText || node.description.toUpperCase().includes(searchText.toUpperCase()));
          switch (mutation) {
            case 'DELETED':
              return true;
            case 'CREATED':
              return checkByFilter;
            case 'UPDATED':
              return !checkByFilter;
          }
        }
      ),
    },
    questionUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUESTION_SUBSCRIPTION),
        (payload, variables) => {
          return payload && payload.questionUpdated && payload.questionUpdated.id === variables.id;
        }
      ),
    },
  },
});
