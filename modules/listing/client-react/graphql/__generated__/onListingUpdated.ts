/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onListingUpdated
// ====================================================

export interface onListingUpdated_listingUpdated_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onListingUpdated_listingUpdated_node_user_auth {
  __typename: "UserAuth";
  certificate: onListingUpdated_listingUpdated_node_user_auth_certificate | null;
  facebook: onListingUpdated_listingUpdated_node_user_auth_facebook | null;
  google: onListingUpdated_listingUpdated_node_user_auth_google | null;
  github: onListingUpdated_listingUpdated_node_user_auth_github | null;
  linkedin: onListingUpdated_listingUpdated_node_user_auth_linkedin | null;
}

export interface onListingUpdated_listingUpdated_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onListingUpdated_listingUpdated_node_user_profile | null;
  auth: onListingUpdated_listingUpdated_node_user_auth | null;
}

export interface onListingUpdated_listingUpdated_node_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onListingUpdated_listingUpdated_node_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onListingUpdated_listingUpdated_node_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onListingUpdated_listingUpdated_node_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface onListingUpdated_listingUpdated_node_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onListingUpdated_listingUpdated_node_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (onListingUpdated_listingUpdated_node_category_subCategories | null)[] | null;
}

export interface onListingUpdated_listingUpdated_node_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface onListingUpdated_listingUpdated_node_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface onListingUpdated_listingUpdated_node_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface onListingUpdated_listingUpdated_node_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface onListingUpdated_listingUpdated_node_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface onListingUpdated_listingUpdated_node_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface onListingUpdated_listingUpdated_node {
  __typename: "Listing";
  id: number | null;
  user: onListingUpdated_listingUpdated_node_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: onListingUpdated_listingUpdated_node_category | null;
  listingFlags: onListingUpdated_listingUpdated_node_listingFlags | null;
  listingHighlight: (onListingUpdated_listingUpdated_node_listingHighlight | null)[] | null;
  listingOptions: onListingUpdated_listingUpdated_node_listingOptions | null;
  listingDetail: onListingUpdated_listingUpdated_node_listingDetail | null;
  listingMedia: (onListingUpdated_listingUpdated_node_listingMedia | null)[] | null;
  listingCostArray: (onListingUpdated_listingUpdated_node_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface onListingUpdated_listingUpdated {
  __typename: "UpdateListingPayload";
  mutation: string;
  id: number | null;
  node: onListingUpdated_listingUpdated_node | null;
}

export interface onListingUpdated {
  listingUpdated: onListingUpdated_listingUpdated | null;
}

export interface onListingUpdatedVariables {
  id?: number | null;
}
