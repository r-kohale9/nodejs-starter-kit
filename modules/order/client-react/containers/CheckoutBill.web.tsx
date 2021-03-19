import React from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';
import { History } from 'history';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import ROUTES from '../routes';
import CheckoutBillView from '../components/CheckoutBillView';
import { withGetCart, withPatchAddress } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';
// types
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';

export interface CheckoutBillProps {
  history: History;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  getCart: GetCart;
  patchAddress: (addressId: number) => boolean;
}

const CheckoutBill: React.FunctionComponent<CheckoutBillProps> = props => {
  const { history, patchAddress, subscribeToMore, getCart } = props;
  const [addressId, setAddressId] = React.useState(0);

  React.useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  async function onSubmit() {
    try {
      const addressMutation = await patchAddress(addressId);
      if (history && addressMutation) {
        return history.push(`${ROUTES.checkoutOrderLink}${props.getCart.id}`);
      } else {
        Message.error('Try again!!');
      }
    } catch (e) {
      throw Error(e);
    }
  }
  // console.log('props', props);
  return <CheckoutBillView onSubmit={onSubmit} btnDisabled={addressId === 0} onSelect={setAddressId} {...props} />;
};

export default compose(withCurrentUser, withGetCart, withPatchAddress)(translate('order')(CheckoutBill));
