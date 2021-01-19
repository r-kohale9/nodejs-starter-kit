/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCart
// ====================================================

export interface getCart_getCart_consumer_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface getCart_getCart_consumer_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface getCart_getCart_consumer_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_consumer_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_consumer_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_consumer_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_consumer_auth {
  __typename: "UserAuth";
  certificate: getCart_getCart_consumer_auth_certificate | null;
  facebook: getCart_getCart_consumer_auth_facebook | null;
  google: getCart_getCart_consumer_auth_google | null;
  github: getCart_getCart_consumer_auth_github | null;
  linkedin: getCart_getCart_consumer_auth_linkedin | null;
}

export interface getCart_getCart_consumer {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: getCart_getCart_consumer_profile | null;
  auth: getCart_getCart_consumer_auth | null;
}

export interface getCart_getCart_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface getCart_getCart_orderDetails_vendor_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface getCart_getCart_orderDetails_vendor_auth {
  __typename: "UserAuth";
  certificate: getCart_getCart_orderDetails_vendor_auth_certificate | null;
  facebook: getCart_getCart_orderDetails_vendor_auth_facebook | null;
  google: getCart_getCart_orderDetails_vendor_auth_google | null;
  github: getCart_getCart_orderDetails_vendor_auth_github | null;
  linkedin: getCart_getCart_orderDetails_vendor_auth_linkedin | null;
}

export interface getCart_getCart_orderDetails_vendor {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: getCart_getCart_orderDetails_vendor_profile | null;
  auth: getCart_getCart_orderDetails_vendor_auth | null;
}

export interface getCart_getCart_orderDetails_orderOptions {
  __typename: "OrderOption";
  id: number | null;
  quantity: number | null;
}

export interface getCart_getCart_orderDetails_orderDelivery_address {
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

export interface getCart_getCart_orderDetails_orderDelivery {
  __typename: "OrderDelivery";
  id: number | null;
  address: getCart_getCart_orderDetails_orderDelivery_address | null;
  type: string | null;
}

export interface getCart_getCart_orderDetails_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface getCart_getCart_orderDetails {
  __typename: "OrderDetail";
  id: number;
  vendor: getCart_getCart_orderDetails_vendor | null;
  modalName: string | null;
  modalId: number | null;
  title: string | null;
  imageUrl: string | null;
  cost: number | null;
  orderOptions: getCart_getCart_orderDetails_orderOptions | null;
  orderDelivery: getCart_getCart_orderDetails_orderDelivery | null;
  orderState: getCart_getCart_orderDetails_orderState | null;
}

export interface getCart_getCart {
  __typename: "Order";
  id: number | null;
  consumer: getCart_getCart_consumer | null;
  trackingId: string | null;
  orderState: getCart_getCart_orderState | null;
  orderDetails: (getCart_getCart_orderDetails | null)[] | null;
  createdAt: string | null;
}

export interface getCart {
  getCart: getCart_getCart | null;
}

export interface getCartVariables {
  userId?: number | null;
}
