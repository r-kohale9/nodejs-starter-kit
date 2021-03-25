/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onMyListingsBookmarkUpdated
// ====================================================

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth {
  __typename: "UserAuth";
  certificate: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_certificate | null;
  facebook: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_facebook | null;
  google: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_google | null;
  github: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_github | null;
  linkedin: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth_linkedin | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_profile | null;
  auth: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user_auth | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category_subCategories | null)[] | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node {
  __typename: "Listing";
  id: number | null;
  user: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_category | null;
  listingFlags: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingFlags | null;
  listingHighlight: (onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingHighlight | null)[] | null;
  listingOptions: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingOptions | null;
  listingDetail: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingDetail | null;
  listingMedia: (onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingMedia | null)[] | null;
  listingCostArray: (onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface onMyListingsBookmarkUpdated_listingsBookmarkUpdated {
  __typename: "UpdateListingPayload";
  mutation: string;
  node: onMyListingsBookmarkUpdated_listingsBookmarkUpdated_node | null;
}

export interface onMyListingsBookmarkUpdated {
  listingsBookmarkUpdated: onMyListingsBookmarkUpdated_listingsBookmarkUpdated | null;
}

export interface onMyListingsBookmarkUpdatedVariables {
  endCursor?: number | null;
}
