/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onOrderUpdated
// ====================================================

export interface onOrderUpdated_orderUpdated_node_consumer_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer_auth {
  __typename: "UserAuth";
  certificate: onOrderUpdated_orderUpdated_node_consumer_auth_certificate | null;
  facebook: onOrderUpdated_orderUpdated_node_consumer_auth_facebook | null;
  google: onOrderUpdated_orderUpdated_node_consumer_auth_google | null;
  github: onOrderUpdated_orderUpdated_node_consumer_auth_github | null;
  linkedin: onOrderUpdated_orderUpdated_node_consumer_auth_linkedin | null;
}

export interface onOrderUpdated_orderUpdated_node_consumer {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onOrderUpdated_orderUpdated_node_consumer_profile | null;
  auth: onOrderUpdated_orderUpdated_node_consumer_auth | null;
}

export interface onOrderUpdated_orderUpdated_node_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth {
  __typename: "UserAuth";
  certificate: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_certificate | null;
  facebook: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_facebook | null;
  google: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_google | null;
  github: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_github | null;
  linkedin: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth_linkedin | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_vendor {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onOrderUpdated_orderUpdated_node_orderDetails_vendor_profile | null;
  auth: onOrderUpdated_orderUpdated_node_orderDetails_vendor_auth | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_orderOptions {
  __typename: "OrderOption";
  id: number | null;
  quantity: number | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_orderDelivery_address {
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

export interface onOrderUpdated_orderUpdated_node_orderDetails_orderDelivery {
  __typename: "OrderDelivery";
  id: number | null;
  address: onOrderUpdated_orderUpdated_node_orderDetails_orderDelivery_address | null;
  type: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface onOrderUpdated_orderUpdated_node_orderDetails {
  __typename: "OrderDetail";
  id: number;
  vendor: onOrderUpdated_orderUpdated_node_orderDetails_vendor | null;
  modalName: string | null;
  modalId: number | null;
  title: string | null;
  imageUrl: string | null;
  cost: number | null;
  orderOptions: onOrderUpdated_orderUpdated_node_orderDetails_orderOptions | null;
  orderDelivery: onOrderUpdated_orderUpdated_node_orderDetails_orderDelivery | null;
  orderState: onOrderUpdated_orderUpdated_node_orderDetails_orderState | null;
}

export interface onOrderUpdated_orderUpdated_node {
  __typename: "Order";
  id: number | null;
  consumer: onOrderUpdated_orderUpdated_node_consumer | null;
  trackingId: string | null;
  orderState: onOrderUpdated_orderUpdated_node_orderState | null;
  orderDetails: (onOrderUpdated_orderUpdated_node_orderDetails | null)[] | null;
  createdAt: string | null;
}

export interface onOrderUpdated_orderUpdated {
  __typename: "UpdateOrderPayload";
  mutation: string;
  id: number | null;
  node: onOrderUpdated_orderUpdated_node | null;
}

export interface onOrderUpdated {
  orderUpdated: onOrderUpdated_orderUpdated | null;
}

export interface onOrderUpdatedVariables {
  id?: number | null;
}
