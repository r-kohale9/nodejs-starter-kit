import { Reviews, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Reviews & Identifier;
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

      reviews.map((listing: Reviews & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
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
    }
  },
  Mutation: {},
  Subscription: {}
});
