/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByDynamicCarouselInput, FilterDynamicCarouselInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: dynamicCarousels
// ====================================================

export interface dynamicCarousels_dynamicCarousels_edges_node {
  __typename: "DynamicCarousel";
  id: number | null;
  title: string | null;
  description: string | null;
  label: string | null;
  link: string | null;
  imageUrl: string;
  isActive: boolean | null;
}

export interface dynamicCarousels_dynamicCarousels_edges {
  __typename: "DynamicCarouselEdges";
  cursor: number | null;
  node: dynamicCarousels_dynamicCarousels_edges_node | null;
}

export interface dynamicCarousels_dynamicCarousels_pageInfo {
  __typename: "DynamicCarouselPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface dynamicCarousels_dynamicCarousels {
  __typename: "DynamicCarousels";
  totalCount: number | null;
  edges: (dynamicCarousels_dynamicCarousels_edges | null)[] | null;
  pageInfo: dynamicCarousels_dynamicCarousels_pageInfo | null;
}

export interface dynamicCarousels {
  dynamicCarousels: dynamicCarousels_dynamicCarousels | null;
}

export interface dynamicCarouselsVariables {
  limit?: number | null;
  after?: number | null;
  orderBy?: OrderByDynamicCarouselInput | null;
  filter?: FilterDynamicCarouselInput | null;
}
