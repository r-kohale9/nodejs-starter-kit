import withAuth from 'graphql-auth';
import { PromoCodes, Identifier } from './sql';
import { PaymentOpts } from './sql';

interface Edges {
  cursor: number;
  node: PromoCodes & Identifier;
}
interface PaymentOptsEdges {
  cursor: number;
  node: PaymentOpts & Identifier;
}

interface PromoCodeInputWithId {
  input: PromoCodes & Identifier;
}

interface PromoCodeInput {
  input: PromoCodes;
}

interface PaymentOptInputWithId {
  input: PaymentOpts & Identifier;
}

interface PaymentOptInput {
  input: PaymentOpts;
}

export default (pubsub: any) => ({
  Query: {
    async getPromoCodes(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, promoCodes } = await context.Demo.promoCodesPagination(limit, after, orderBy, filter);

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
    },

    async paymentOpts(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: PaymentOptsEdges[] = [];
      const { total, paymentOpts } = await context.Demo.paymentOptsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      paymentOpts.map((paymentOpt: PaymentOpts & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: paymentOpt
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
    async paymentOpt(obj: any, { id }: Identifier, context: any) {
      return context.Demo.paymentOpt(id);
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
    }),

    addPaymentOpt: withAuth(
      // ["stripe:*"],
      async (obj: any, { input }: PaymentOptInput, context: any) => {
        try {
          const id = await context.Demo.addPaymentOpt(input);
          const paymentOpt = await context.Demo.paymentOpt(id);
          return paymentOpt;
        } catch (e) {
          return e;
        }
      }
    ),
    editPaymentOpt: withAuth(async (obj: any, { input }: PaymentOptInputWithId, context: any) => {
      try {
        await context.Demo.editPaymentOpt(input);
        // const paymentOpt = await context.Demo.paymentOpt(input.id);
        return true;
      } catch (e) {
        return e;
      }
    }),
    deletePaymentOpt: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      // const paymentOpt = await context.Demo.paymentOpt(id);
      // paymentOpt.userId = null;
      const isDeleted = await context.Demo.deletePaymentOpt(id);
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
