/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByListInput, FilterListInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: listings
// ====================================================

export interface listings_listings_edges_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface listings_listings_edges_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface listings_listings_edges_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface listings_listings_edges_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface listings_listings_edges_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface listings_listings_edges_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface listings_listings_edges_node_user_auth {
  __typename: "UserAuth";
  certificate: listings_listings_edges_node_user_auth_certificate | null;
  facebook: listings_listings_edges_node_user_auth_facebook | null;
  google: listings_listings_edges_node_user_auth_google | null;
  github: listings_listings_edges_node_user_auth_github | null;
  linkedin: listings_listings_edges_node_user_auth_linkedin | null;
}

export interface listings_listings_edges_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: listings_listings_edges_node_user_profile | null;
  auth: listings_listings_edges_node_user_auth | null;
}

export interface listings_listings_edges_node_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface listings_listings_edges_node_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface listings_listings_edges_node_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: listings_listings_edges_node_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface listings_listings_edges_node_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: listings_listings_edges_node_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (listings_listings_edges_node_category_subCategories | null)[] | null;
}

export interface listings_listings_edges_node_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface listings_listings_edges_node_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface listings_listings_edges_node_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface listings_listings_edges_node_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface listings_listings_edges_node_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface listings_listings_edges_node_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface listings_listings_edges_node {
  __typename: "Listing";
  id: number | null;
  user: listings_listings_edges_node_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: listings_listings_edges_node_category | null;
  listingFlags: listings_listings_edges_node_listingFlags | null;
  listingHighlight: (listings_listings_edges_node_listingHighlight | null)[] | null;
  listingOptions: listings_listings_edges_node_listingOptions | null;
  listingDetail: listings_listings_edges_node_listingDetail | null;
  listingMedia: (listings_listings_edges_node_listingMedia | null)[] | null;
  listingCostArray: (listings_listings_edges_node_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface listings_listings_edges {
  __typename: "ListingEdges";
  cursor: number | null;
  node: listings_listings_edges_node | null;
}

export interface listings_listings_pageInfo {
  __typename: "ListingPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface listings_listings_rangeValues {
  __typename: "RangeValues";
  maxCost: number | null;
  minCost: number | null;
}

export interface listings_listings {
  __typename: "Listings";
  totalCount: number | null;
  edges: (listings_listings_edges | null)[] | null;
  pageInfo: listings_listings_pageInfo | null;
  rangeValues: listings_listings_rangeValues | null;
}

export interface listings {
  listings: listings_listings | null;
}

export interface listingsVariables {
  limit: number;
  after: number;
  orderBy?: OrderByListInput | null;
  filter?: FilterListInput | null;
  ids?: (number | null)[] | null;
}
