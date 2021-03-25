/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByListInput, FilterListInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: myListingsBookmark
// ====================================================

export interface myListingsBookmark_myListingsBookmark_edges_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user_auth {
  __typename: "UserAuth";
  certificate: myListingsBookmark_myListingsBookmark_edges_node_user_auth_certificate | null;
  facebook: myListingsBookmark_myListingsBookmark_edges_node_user_auth_facebook | null;
  google: myListingsBookmark_myListingsBookmark_edges_node_user_auth_google | null;
  github: myListingsBookmark_myListingsBookmark_edges_node_user_auth_github | null;
  linkedin: myListingsBookmark_myListingsBookmark_edges_node_user_auth_linkedin | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: myListingsBookmark_myListingsBookmark_edges_node_user_profile | null;
  auth: myListingsBookmark_myListingsBookmark_edges_node_user_auth | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: myListingsBookmark_myListingsBookmark_edges_node_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: myListingsBookmark_myListingsBookmark_edges_node_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (myListingsBookmark_myListingsBookmark_edges_node_category_subCategories | null)[] | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface myListingsBookmark_myListingsBookmark_edges_node {
  __typename: "Listing";
  id: number | null;
  user: myListingsBookmark_myListingsBookmark_edges_node_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: myListingsBookmark_myListingsBookmark_edges_node_category | null;
  listingFlags: myListingsBookmark_myListingsBookmark_edges_node_listingFlags | null;
  listingHighlight: (myListingsBookmark_myListingsBookmark_edges_node_listingHighlight | null)[] | null;
  listingOptions: myListingsBookmark_myListingsBookmark_edges_node_listingOptions | null;
  listingDetail: myListingsBookmark_myListingsBookmark_edges_node_listingDetail | null;
  listingMedia: (myListingsBookmark_myListingsBookmark_edges_node_listingMedia | null)[] | null;
  listingCostArray: (myListingsBookmark_myListingsBookmark_edges_node_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface myListingsBookmark_myListingsBookmark_edges {
  __typename: "ListingEdges";
  cursor: number | null;
  node: myListingsBookmark_myListingsBookmark_edges_node | null;
}

export interface myListingsBookmark_myListingsBookmark_pageInfo {
  __typename: "ListingPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface myListingsBookmark_myListingsBookmark_rangeValues {
  __typename: "RangeValues";
  maxCost: number | null;
  minCost: number | null;
}

export interface myListingsBookmark_myListingsBookmark {
  __typename: "Listings";
  totalCount: number | null;
  edges: (myListingsBookmark_myListingsBookmark_edges | null)[] | null;
  pageInfo: myListingsBookmark_myListingsBookmark_pageInfo | null;
  rangeValues: myListingsBookmark_myListingsBookmark_rangeValues | null;
}

export interface myListingsBookmark {
  myListingsBookmark: myListingsBookmark_myListingsBookmark | null;
}

export interface myListingsBookmarkVariables {
  userId?: number | null;
  limit?: number | null;
  after?: number | null;
  orderBy?: OrderByListInput | null;
  filter?: FilterListInput | null;
}
