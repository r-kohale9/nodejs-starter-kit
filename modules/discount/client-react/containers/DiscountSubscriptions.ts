import update from 'immutability-helper';
import { SubscribeToMoreOptions } from 'apollo-client';

import { Message } from '@gqlapp/look-client-react';

import DISCOUNT_SUBSCRIPTION from '../graphql/DiscountSubscription.graphql';
import DISCOUNTS_SUBSCRIPTION from '../graphql/DiscountsSubscription.graphql';

// types
import { FilterDiscountInput } from '../../../../packages/server/__generated__/globalTypes';
import {
  discounts_discounts as Discounts,
  discounts_discounts_edges as DiscountEdges
} from '../graphql/__generated__/discounts';
import { modalDiscount_modalDiscount as ModalDiscount } from '../graphql/__generated__/modalDiscount';

export const subscribeToDiscount = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  modalId: number
) =>
  subscribeToMore({
    document: DISCOUNT_SUBSCRIPTION,
    variables: { modalId },
    updateQuery: (
      prev: { modalDiscount: ModalDiscount },
      {
        subscriptionData: {
          data: {
            discountUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { discountUpdated: { mutation: string; node: ModalDiscount } } } }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditDiscount(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDiscount(prev);
      }
      return newResult;
    }
  });

function onEditDiscount(prev: { modalDiscount: ModalDiscount }, node: ModalDiscount) {
  // console.log(prev, node);
  return update(prev, {
    modalDiscount: {
      $set: node
    }
  });
}

const onDeleteDiscount = (prev: { modalDiscount: ModalDiscount }) => {
  Message.info('This discount has been expired!');
  return update(prev, {
    modalDiscount: {
      $set: null
    }
  });
};

export const subscribeToDiscounts = (
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void,
  filter: FilterDiscountInput
) =>
  subscribeToMore({
    document: DISCOUNTS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev: { discounts: Discounts },
      {
        subscriptionData: {
          data: {
            discountsUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { discountsUpdated: { mutation: string; node: ModalDiscount } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddDiscounts(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditDiscounts(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDiscounts(prev, node.id);
      }
      return newResult;
    }
  });
function onAddDiscounts(prev: { discounts: Discounts }, node: ModalDiscount) {
  if (prev.discounts.edges.some(discount => node.id === discount.cursor)) {
    return update(prev, {
      discounts: {
        totalCount: {
          $set: prev.discounts.totalCount - 1
        },
        edges: {
          $set: prev.discounts.edges
        }
      }
    });
  }

  const filtereddiscounts = prev.discounts.edges.filter(discount => discount.node.id !== null);

  const edge: DiscountEdges = {
    cursor: node.id,
    node,
    __typename: 'DiscountEdges'
  };

  return update(prev, {
    discounts: {
      totalCount: {
        $set: prev.discounts.totalCount + 1
      },
      edges: {
        $set: [edge, ...filtereddiscounts]
      }
    }
  });
}

function onEditDiscounts(prev: { discounts: Discounts }, node: ModalDiscount) {
  const index = prev.discounts.edges.findIndex(x => x.node.id === node.id);
  const edge: DiscountEdges = {
    cursor: node.id,
    node,
    __typename: 'DiscountEdges'
  };
  if (index) {
    prev.discounts.edges.splice(index, 1, edge);
    return update(prev, {
      discounts: {
        edges: {
          $set: [...prev.discounts.edges]
        }
      }
    });
  }
}

const onDeleteDiscounts = (prev: { discounts: Discounts }, id: number) => {
  // console.log('called', id);
  const index = prev.discounts.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    discounts: {
      totalCount: {
        $set: prev.discounts.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
