/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByListInput, FilterOrderInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: orders
// ====================================================

export interface orders_orders_edges_node_consumer_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface orders_orders_edges_node_consumer_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface orders_orders_edges_node_consumer_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_consumer_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_consumer_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_consumer_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_consumer_auth {
  __typename: "UserAuth";
  certificate: orders_orders_edges_node_consumer_auth_certificate | null;
  facebook: orders_orders_edges_node_consumer_auth_facebook | null;
  google: orders_orders_edges_node_consumer_auth_google | null;
  github: orders_orders_edges_node_consumer_auth_github | null;
  linkedin: orders_orders_edges_node_consumer_auth_linkedin | null;
}

export interface orders_orders_edges_node_consumer {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: orders_orders_edges_node_consumer_profile | null;
  auth: orders_orders_edges_node_consumer_auth | null;
}

export interface orders_orders_edges_node_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface orders_orders_edges_node_orderDetails_vendor_auth {
  __typename: "UserAuth";
  certificate: orders_orders_edges_node_orderDetails_vendor_auth_certificate | null;
  facebook: orders_orders_edges_node_orderDetails_vendor_auth_facebook | null;
  google: orders_orders_edges_node_orderDetails_vendor_auth_google | null;
  github: orders_orders_edges_node_orderDetails_vendor_auth_github | null;
  linkedin: orders_orders_edges_node_orderDetails_vendor_auth_linkedin | null;
}

export interface orders_orders_edges_node_orderDetails_vendor {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: orders_orders_edges_node_orderDetails_vendor_profile | null;
  auth: orders_orders_edges_node_orderDetails_vendor_auth | null;
}

export interface orders_orders_edges_node_orderDetails_orderOptions {
  __typename: "OrderOption";
  id: number | null;
  quantity: number | null;
}

export interface orders_orders_edges_node_orderDetails_orderDelivery_address {
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

export interface orders_orders_edges_node_orderDetails_orderDelivery {
  __typename: "OrderDelivery";
  id: number | null;
  address: orders_orders_edges_node_orderDetails_orderDelivery_address | null;
  type: string | null;
}

export interface orders_orders_edges_node_orderDetails_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface orders_orders_edges_node_orderDetails {
  __typename: "OrderDetail";
  id: number;
  vendor: orders_orders_edges_node_orderDetails_vendor | null;
  modalName: string | null;
  modalId: number | null;
  title: string | null;
  imageUrl: string | null;
  cost: number | null;
  orderOptions: orders_orders_edges_node_orderDetails_orderOptions | null;
  orderDelivery: orders_orders_edges_node_orderDetails_orderDelivery | null;
  orderState: orders_orders_edges_node_orderDetails_orderState | null;
}

export interface orders_orders_edges_node {
  __typename: "Order";
  id: number | null;
  consumer: orders_orders_edges_node_consumer | null;
  trackingId: string | null;
  orderState: orders_orders_edges_node_orderState | null;
  orderDetails: (orders_orders_edges_node_orderDetails | null)[] | null;
  createdAt: string | null;
}

export interface orders_orders_edges {
  __typename: "OrderEdges";
  cursor: number | null;
  node: orders_orders_edges_node | null;
}

export interface orders_orders_pageInfo {
  __typename: "OrderPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface orders_orders {
  __typename: "Orders";
  totalCount: number | null;
  edges: (orders_orders_edges | null)[] | null;
  pageInfo: orders_orders_pageInfo | null;
}

export interface orders {
  orders: orders_orders | null;
}

export interface ordersVariables {
  limit: number;
  after: number;
  orderBy?: OrderByListInput | null;
  filter?: FilterOrderInput | null;
}
