/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByDiscountInput, FilterDiscountInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: discounts
// ====================================================

export interface discounts_discounts_edges_node_discountDuration {
  __typename: "DiscountDuration";
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean | null;
}

export interface discounts_discounts_edges_node {
  __typename: "Discount";
  id: number | null;
  modalId: number | null;
  modalName: string | null;
  discountPercent: number | null;
  discountDuration: discounts_discounts_edges_node_discountDuration | null;
  isActive: boolean | null;
}

export interface discounts_discounts_edges {
  __typename: "DiscountEdges";
  cursor: number | null;
  node: discounts_discounts_edges_node | null;
}

export interface discounts_discounts_pageInfo {
  __typename: "DiscountPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface discounts_discounts {
  __typename: "Discounts";
  totalCount: number | null;
  edges: (discounts_discounts_edges | null)[] | null;
  pageInfo: discounts_discounts_pageInfo | null;
}

export interface discounts {
  discounts: discounts_discounts | null;
}

export interface discountsVariables {
  limit: number;
  after: number;
  orderBy?: OrderByDiscountInput | null;
  filter?: FilterDiscountInput | null;
}
