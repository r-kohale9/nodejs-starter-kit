import { PromoCode, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: PromoCode & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async getPromoCodes(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, promoCodes } = await context.Demo.promoCodesPagination(limit, after, orderBy, filter);
      // console.log(await context.Demo.promoCodesPagination(limit, after, orderBy, filter));

      const hasNextPage = total > after + limit;

      promoCodes.map((promoCode: PromoCode & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: promoCode
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
