import update from 'immutability-helper';

import ADDRESSES_SUBSCRIPTION from '../graphql/AddressesSubscription.graphql';

// types
import { addresses_addresses as Addresses } from '../graphql/__generated__/addresses';
import { AddressInfo as Address } from '../graphql/__generated__/AddressInfo';

// eslint-disable-next-line import/prefer-default-export
export const subscribeToAddresses = (subscribeToMore, userId: number) =>
  subscribeToMore({
    document: ADDRESSES_SUBSCRIPTION,
    variables: { userId },
    updateQuery: (
      prev: { addresses: Addresses[] },
      {
        subscriptionData: {
          data: {
            addressesUpdated: { mutation, node }
          }
        }
      }: { subscriptionData: { data: { addressesUpdated: { mutation: string; node: Address } } } }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddAddresses(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditAddresses(prev, node);
      } else if (mutation === 'DEFAULT_UPDATED') {
        newResult = onDefualtAddress(prev, node);
      } else if (mutation === 'DELETED') {
        onDeleteAddresses(prev, node.id);
      }
      return newResult;
    }
  });

function onAddAddresses(prev: { addresses: Addresses[] }, node: Address) {
  // console.log('prev', prev, node);
  const filteredAddresses = prev.addresses.filter(address => address.id !== null);

  return update(prev, {
    addresses: {
      $set: [node, ...filteredAddresses]
    }
  });
}

function onEditAddresses(prev: { addresses: Addresses[] }, node: Address) {
  const index = prev.addresses.findIndex(x => x.id === node.id);

  if (index) {
    prev.addresses.splice(index, 1, node);
    return update(prev, {
      addresses: {
        $set: [...prev.addresses]
      }
    });
  }
}

function onDefualtAddress(prev: { addresses: Addresses[] }, node: Address) {
  const indexForTrue = prev.addresses.findIndex(x => x.id === node.id);
  const indexForFalse = prev.addresses.findIndex(x => x.isDefault);

  const falseNode = prev.addresses[indexForFalse];
  falseNode.isDefault = false;

  if (indexForTrue) {
    prev.addresses.splice(indexForTrue, 1, node);
    prev.addresses.splice(indexForFalse, 1, falseNode);
    return update(prev, {
      addresses: {
        $set: [...prev.addresses]
      }
    });
  }
}

const onDeleteAddresses = (prev: { addresses: Addresses[] }, id: number) => {
  // console.log('called', id);
  const index = prev.addresses.findIndex(x => x.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    addresses: {
      $splice: [[index, 1]]
    }
  });
};
