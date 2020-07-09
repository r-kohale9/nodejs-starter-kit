import withAuth from 'graphql-auth';
import { Address, Identifier } from './sql';

interface AddressInput {
  input: Address;
}

export default (pubsub: any) => ({
  Query: {
    async addresses(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, addresses } = await context.Addresses.addresses(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      addresses.map((address: Address & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: address
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
    async address(obj: any, { id }: Identifier, context: any) {
      return context.Addresses.address(id);
    }
  },
  Mutation: {
    addAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        await context.Addresses.addAddress(input);
        return true;
      } catch (e) {
        return e;
      }
    }),
    addOrEditAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        return await context.Addresses.addOrEditAddress(input);
      } catch (e) {
        return e;
      }
    }),
    deleteAddress: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      try {
        await context.Addresses.deleteAddress(id);
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
