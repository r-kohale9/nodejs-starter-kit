/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByCategoryInput, FilterCategoryInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: categories
// ====================================================

export interface categories_categories_edges_node_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface categories_categories_edges_node_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface categories_categories_edges_node_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: categories_categories_edges_node_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface categories_categories_edges_node {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: categories_categories_edges_node_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (categories_categories_edges_node_subCategories | null)[] | null;
}

export interface categories_categories_edges {
  __typename: "CategoryEdges";
  cursor: number | null;
  node: categories_categories_edges_node | null;
}

export interface categories_categories_pageInfo {
  __typename: "CategoryPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface categories_categories {
  __typename: "Categories";
  totalCount: number | null;
  edges: (categories_categories_edges | null)[] | null;
  pageInfo: categories_categories_pageInfo | null;
}

export interface categories {
  categories: categories_categories | null;
}

export interface categoriesVariables {
  limit: number;
  after: number;
  orderBy?: OrderByCategoryInput | null;
  filter?: FilterCategoryInput | null;
}
