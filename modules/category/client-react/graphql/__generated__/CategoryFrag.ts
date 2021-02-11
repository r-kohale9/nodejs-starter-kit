/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryFrag
// ====================================================

export interface CategoryFrag_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface CategoryFrag {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: CategoryFrag_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}
