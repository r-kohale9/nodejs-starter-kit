import withAuth from 'graphql-auth';
import { Reviews, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Reviews & Identifier;
}

interface ReviewInputWithId {
  input: Reviews & Identifier;
}

interface ReviewInput {
  input: Reviews;
}
export default (pubsub: any) => ({
  Query: {
    async reviews(obj: any, { limit, after, orderBy, filter, userId }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, reviews } = await context.Review.reviewsPagination(
        limit,
        after,
        orderBy,
        filter,
        userId || context.req.identity.id
      );

      const hasNextPage = total > after + limit;

      reviews.map((review: Reviews & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: review
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    },
    async allReviews(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, reviews } = await context.Review.allReviewsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      reviews.map((review: Reviews & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: review
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    },
    async review(obj: any, { id }: Identifier, context: any) {
      return context.Review.review(id);
    }
  },
  Mutation: {
    addReview: withAuth(
      // ["stripe:*"],
      async (obj: any, { input }: ReviewInput, context: any) => {
        try {
          if (!input.userId) {
            input.userId = context.req.identity.id;
          }
          const id = await context.Review.addReview(input);
          const review = await context.Review.review(id);
          return review;
        } catch (e) {
          return e;
        }
      }
    ),
    editReview: withAuth(async (obj: any, { input }: ReviewInputWithId, context: any) => {
      try {
        await context.Review.editReview(input);
        // const review = await context.Review.review(input.id);
        return true;
      } catch (e) {
        return e;
      }
    }),
    deleteReview: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      // const review = await context.Review.review(id);
      // review.userId = null;
      const isDeleted = await context.Review.deleteReview(id);
      if (isDeleted) {
        return true;
      } else {
        // return { id: null };
        return false;
      }
    })
  },
  Subscription: {}
});
