import React, { useEffect } from 'react';
import { SubscribeToMoreOptions } from 'apollo-client';

import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';
import { withListing } from '@gqlapp/listing-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { withModalDiscount, subscribeToDiscount } from '@gqlapp/discount-client-react';

import AddToCartView from './AddToCartView';
// types
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';
import { listing_listing as Listing } from '@gqlapp/listing-client-react/graphql/__generated__/listing';
import { modalDiscount_modalDiscount as ModalDiscount } from '@gqlapp/discount-client-react/graphql/__generated__/modalDiscount';
import { OrderOptionsInput } from '../../../../packages/server/__generated__/globalTypes';
import { order_order_orderDetails as OrderDetails } from '../graphql/__generated__/order';
import { AddToCartFormValues } from './AddToCartForm';

interface EditCartProps {
  t: TranslateFunction;
  loading: boolean;
  currentUser: CurrentUser;
  modalId: number;
  listing: Listing;
  discountSubscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  hideModal: () => void;
  modalDiscount: ModalDiscount;
  onEdit: (id: number, optionsId: number, listingCost: number, values: OrderOptionsInput) => void;
  item?: OrderDetails;
}

const EditCart: React.FunctionComponent<EditCartProps> = props => {
  const {
    t,
    loading,
    listing,
    currentUser,
    modalId,
    discountSubscribeToMore,
    onEdit,
    item,
    hideModal,
    modalDiscount
  } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  const handleSubmit = (values: AddToCartFormValues) => {
    const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
    const now = new Date().toISOString();
    const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
    const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
    const isDiscountPercent =
      startDate && endDate
        ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
        : modalDiscount && modalDiscount.discountPercent > 0;
    const discountPercent = isDiscountPercent ? modalDiscount && modalDiscount.discountPercent : null;
    const isDiscount = (listing && listing.listingFlags && listing.listingFlags.isDiscount) || isDiscountPercent;
    const discount =
      (listing &&
        listing.listingCostArray &&
        listing.listingCostArray.length > 0 &&
        listing.listingCostArray[0].discount) ||
      discountPercent;
    onEdit(
      item.id,
      item.orderOptions && item.orderOptions.id,
      // tslint:disable-next-line:radix
      isDiscount ? parseInt(cost && (cost - cost * (discount / 100)).toFixed()) : parseInt(cost.toFixed(2)),
      values
    );
    hideModal();
  };

  // console.log(('props editcart', props));
  return (
    <>
      {loading && <Spinner size="small" />}
      {listing && (
        <AddToCartView
          t={t}
          currentUser={currentUser}
          onSubmit={handleSubmit}
          showBtn={false}
          listing={listing}
          item={item}
        />
      )}
    </>
  );
};

export default compose(withListing, withModalDiscount)(EditCart);
