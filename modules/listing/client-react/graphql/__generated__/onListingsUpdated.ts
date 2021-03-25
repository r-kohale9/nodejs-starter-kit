/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterListInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: onListingsUpdated
// ====================================================

export interface onListingsUpdated_listingsUpdated_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_user_auth {
  __typename: "UserAuth";
  certificate: onListingsUpdated_listingsUpdated_node_user_auth_certificate | null;
  facebook: onListingsUpdated_listingsUpdated_node_user_auth_facebook | null;
  google: onListingsUpdated_listingsUpdated_node_user_auth_google | null;
  github: onListingsUpdated_listingsUpdated_node_user_auth_github | null;
  linkedin: onListingsUpdated_listingsUpdated_node_user_auth_linkedin | null;
}

export interface onListingsUpdated_listingsUpdated_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onListingsUpdated_listingsUpdated_node_user_profile | null;
  auth: onListingsUpdated_listingsUpdated_node_user_auth | null;
}

export interface onListingsUpdated_listingsUpdated_node_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onListingsUpdated_listingsUpdated_node_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface onListingsUpdated_listingsUpdated_node_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onListingsUpdated_listingsUpdated_node_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (onListingsUpdated_listingsUpdated_node_category_subCategories | null)[] | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface onListingsUpdated_listingsUpdated_node_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface onListingsUpdated_listingsUpdated_node {
  __typename: "Listing";
  id: number | null;
  user: onListingsUpdated_listingsUpdated_node_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: onListingsUpdated_listingsUpdated_node_category | null;
  listingFlags: onListingsUpdated_listingsUpdated_node_listingFlags | null;
  listingHighlight: (onListingsUpdated_listingsUpdated_node_listingHighlight | null)[] | null;
  listingOptions: onListingsUpdated_listingsUpdated_node_listingOptions | null;
  listingDetail: onListingsUpdated_listingsUpdated_node_listingDetail | null;
  listingMedia: (onListingsUpdated_listingsUpdated_node_listingMedia | null)[] | null;
  listingCostArray: (onListingsUpdated_listingsUpdated_node_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface onListingsUpdated_listingsUpdated {
  __typename: "UpdateListingPayload";
  mutation: string;
  node: onListingsUpdated_listingsUpdated_node | null;
}

export interface onListingsUpdated {
  listingsUpdated: onListingsUpdated_listingsUpdated | null;
}

export interface onListingsUpdatedVariables {
  endCursor?: number | null;
  filter?: FilterListInput | null;
}
