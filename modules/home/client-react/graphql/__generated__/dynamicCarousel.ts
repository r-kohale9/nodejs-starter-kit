/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dynamicCarousel
// ====================================================

export interface dynamicCarousel_dynamicCarousel {
  __typename: "DynamicCarousel";
  id: number | null;
  title: string | null;
  description: string | null;
  label: string | null;
  link: string | null;
  imageUrl: string;
  isActive: boolean | null;
}

export interface dynamicCarousel {
  dynamicCarousel: dynamicCarousel_dynamicCarousel | null;
}

export interface dynamicCarouselVariables {
  id: number;
}
