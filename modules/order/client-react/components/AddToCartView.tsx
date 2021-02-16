import React from 'react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';

import AddToCartForm from './AddToCartForm';

// types
import { order_order_orderDetails as OrderDetails } from '../graphql/__generated__/order';
import { AddToCartFormValues } from './AddToCartForm';
import { getCart_getCart as GetCart } from '@gqlapp/order-client-react/graphql/__generated__/getCart';
import { listing_listing as Listing } from '@gqlapp/listing-client-react/graphql/__generated__/listing';
import { currentUser_currentUser as CurrentUser } from '@gqlapp/user-client-react/graphql/__generated__/currentUser';

export interface AddToCartViewProps {
  t: TranslateFunction;
  cartLoading?: boolean;
  currentUser?: CurrentUser;
  listing: Listing;
  showBtn?: boolean;
  catalogueCard?: boolean;
  item?: OrderDetails;
  onSubmit: (values: AddToCartFormValues, redirect?: boolean) => void;
  onDelete?: (id: number) => void;
  getCart?: GetCart;
}

const AddToCartView: React.FC<AddToCartViewProps> = props => {
  const { currentUser, listing, onSubmit, onDelete, showBtn, item, getCart, cartLoading, t, catalogueCard } = props;
  const listingOwned = (listing && listing.user && listing.user.id) === (currentUser && currentUser.id);
  const cartItemArray = getCart ? getCart.orderDetails.filter(oD => oD.modalId === listing.id) : [];
  // console.log(listing, cartItemArray);
  return (
    <AddToCartForm
      t={t}
      currentUser={currentUser}
      onSubmit={onSubmit}
      max={
        (listing &&
          listing.listingOptions &&
          listing.listingOptions.fixedQuantity !== -1 &&
          listing.listingOptions.fixedQuantity) ||
        (listing && listing.listingDetail && listing.listingDetail.inventoryCount)
      }
      // fixedQuantity={listing && listing.listingOptions && listing.listingOptions.fixedQuantity}
      listingOwned={listingOwned}
      showBtn={showBtn}
      item={item}
      inCart={cartItemArray.length === 0}
      loading={cartLoading}
      catalogueCard={catalogueCard}
      onDelete={() => onDelete(cartItemArray[0].id)}
    />
  );
};

export default AddToCartView;
