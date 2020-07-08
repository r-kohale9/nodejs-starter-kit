import withAuth from 'graphql-auth';
import { PromoCodes, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: PromoCodes & Identifier;
}

interface PromoCodeInputWithId {
  input: PromoCodes & Identifier;
}

interface PromoCodeInput {
  input: PromoCodes;
}

interface Edges {
  cursor: number;
  node: PromoCodes & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async getPromoCodes(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, promoCodes } = await context.Demo.promoCodesPagination(limit, after, orderBy, filter);
      // console.log(await context.Demo.promoCodesPagination(limit, after, orderBy, filter));

      const hasNextPage = total > after + limit;

      promoCodes.map((promoCode: PromoCodes & Identifier, index: number) => {
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
    },
    async promoCode(obj: any, { id }: Identifier, context: any) {
      return context.Demo.promoCode(id);
    }
  },
  Mutation: {
    addPromoCode: withAuth(
      // ["stripe:*"],
      async (obj: any, { input }: PromoCodeInput, context: any) => {
        try {
          const id = await context.Demo.addPromoCode(input);
          const promoCode = await context.Demo.promoCode(id);
          return promoCode;
        } catch (e) {
          return e;
        }
      }
    ),
    editPromoCode: withAuth(async (obj: any, { input }: PromoCodeInputWithId, context: any) => {
      try {
        await context.Demo.editPromoCode(input);
        // const promoCode = await context.Demo.promoCode(input.id);
        return true;
      } catch (e) {
        return e;
      }
    }),
    deletePromoCode: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      // const promoCode = await context.Demo.promoCode(id);
      // promoCode.userId = null;
      const isDeleted = await context.Demo.deletePromoCode(id);
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
