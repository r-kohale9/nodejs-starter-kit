/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterOrderInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: onOrdersUpdated
// ====================================================

export interface onOrdersUpdated_ordersUpdated_node_consumer_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer_auth {
  __typename: "UserAuth";
  certificate: onOrdersUpdated_ordersUpdated_node_consumer_auth_certificate | null;
  facebook: onOrdersUpdated_ordersUpdated_node_consumer_auth_facebook | null;
  google: onOrdersUpdated_ordersUpdated_node_consumer_auth_google | null;
  github: onOrdersUpdated_ordersUpdated_node_consumer_auth_github | null;
  linkedin: onOrdersUpdated_ordersUpdated_node_consumer_auth_linkedin | null;
}

export interface onOrdersUpdated_ordersUpdated_node_consumer {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onOrdersUpdated_ordersUpdated_node_consumer_profile | null;
  auth: onOrdersUpdated_ordersUpdated_node_consumer_auth | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth {
  __typename: "UserAuth";
  certificate: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_certificate | null;
  facebook: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_facebook | null;
  google: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_google | null;
  github: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_github | null;
  linkedin: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth_linkedin | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_vendor {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_profile | null;
  auth: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor_auth | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_orderOptions {
  __typename: "OrderOption";
  id: number | null;
  quantity: number | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_orderDelivery_address {
  __typename: "Address";
  id: number | null;
  userId: number;
  streetAddress1: string | null;
  streetAddress2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: number | null;
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  isDefault: boolean | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_orderDelivery {
  __typename: "OrderDelivery";
  id: number | null;
  address: onOrdersUpdated_ordersUpdated_node_orderDetails_orderDelivery_address | null;
  type: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface onOrdersUpdated_ordersUpdated_node_orderDetails {
  __typename: "OrderDetail";
  id: number;
  vendor: onOrdersUpdated_ordersUpdated_node_orderDetails_vendor | null;
  modalName: string | null;
  modalId: number | null;
  title: string | null;
  imageUrl: string | null;
  cost: number | null;
  orderOptions: onOrdersUpdated_ordersUpdated_node_orderDetails_orderOptions | null;
  orderDelivery: onOrdersUpdated_ordersUpdated_node_orderDetails_orderDelivery | null;
  orderState: onOrdersUpdated_ordersUpdated_node_orderDetails_orderState | null;
}

export interface onOrdersUpdated_ordersUpdated_node {
  __typename: "Order";
  id: number | null;
  consumer: onOrdersUpdated_ordersUpdated_node_consumer | null;
  trackingId: string | null;
  orderState: onOrdersUpdated_ordersUpdated_node_orderState | null;
  orderDetails: (onOrdersUpdated_ordersUpdated_node_orderDetails | null)[] | null;
  createdAt: string | null;
}

export interface onOrdersUpdated_ordersUpdated {
  __typename: "UpdateOrderPayload";
  mutation: string;
  node: onOrdersUpdated_ordersUpdated_node | null;
}

export interface onOrdersUpdated {
  ordersUpdated: onOrdersUpdated_ordersUpdated | null;
}

export interface onOrdersUpdatedVariables {
  endCursor?: number | null;
  filter?: FilterOrderInput | null;
}
