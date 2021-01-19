/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderInfo
// ====================================================

export interface OrderInfo_consumer_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface OrderInfo_consumer_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface OrderInfo_consumer_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface OrderInfo_consumer_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface OrderInfo_consumer_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface OrderInfo_consumer_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface OrderInfo_consumer_auth {
  __typename: "UserAuth";
  certificate: OrderInfo_consumer_auth_certificate | null;
  facebook: OrderInfo_consumer_auth_facebook | null;
  google: OrderInfo_consumer_auth_google | null;
  github: OrderInfo_consumer_auth_github | null;
  linkedin: OrderInfo_consumer_auth_linkedin | null;
}

export interface OrderInfo_consumer {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: OrderInfo_consumer_profile | null;
  auth: OrderInfo_consumer_auth | null;
}

export interface OrderInfo_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface OrderInfo_orderDetails_vendor_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface OrderInfo_orderDetails_vendor_auth {
  __typename: "UserAuth";
  certificate: OrderInfo_orderDetails_vendor_auth_certificate | null;
  facebook: OrderInfo_orderDetails_vendor_auth_facebook | null;
  google: OrderInfo_orderDetails_vendor_auth_google | null;
  github: OrderInfo_orderDetails_vendor_auth_github | null;
  linkedin: OrderInfo_orderDetails_vendor_auth_linkedin | null;
}

export interface OrderInfo_orderDetails_vendor {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: OrderInfo_orderDetails_vendor_profile | null;
  auth: OrderInfo_orderDetails_vendor_auth | null;
}

export interface OrderInfo_orderDetails_orderOptions {
  __typename: "OrderOption";
  id: number | null;
  quantity: number | null;
}

export interface OrderInfo_orderDetails_orderDelivery_address {
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

export interface OrderInfo_orderDetails_orderDelivery {
  __typename: "OrderDelivery";
  id: number | null;
  address: OrderInfo_orderDetails_orderDelivery_address | null;
  type: string | null;
}

export interface OrderInfo_orderDetails_orderState {
  __typename: "OrderState";
  id: number | null;
  state: string | null;
}

export interface OrderInfo_orderDetails {
  __typename: "OrderDetail";
  id: number;
  vendor: OrderInfo_orderDetails_vendor | null;
  modalName: string | null;
  modalId: number | null;
  title: string | null;
  imageUrl: string | null;
  cost: number | null;
  orderOptions: OrderInfo_orderDetails_orderOptions | null;
  orderDelivery: OrderInfo_orderDetails_orderDelivery | null;
  orderState: OrderInfo_orderDetails_orderState | null;
}

export interface OrderInfo {
  __typename: "Order";
  id: number | null;
  consumer: OrderInfo_consumer | null;
  trackingId: string | null;
  orderState: OrderInfo_orderState | null;
  orderDetails: (OrderInfo_orderDetails | null)[] | null;
  createdAt: string | null;
}
