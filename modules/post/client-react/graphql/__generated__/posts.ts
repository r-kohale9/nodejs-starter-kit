/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: posts
// ====================================================

export interface posts_posts_edges_node {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
}

export interface posts_posts_edges {
  __typename: "PostEdges";
  cursor: number | null;
  node: posts_posts_edges_node | null;
}

export interface posts_posts_pageInfo {
  __typename: "PostPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface posts_posts {
  __typename: "Posts";
  totalCount: number | null;
  edges: (posts_posts_edges | null)[] | null;
  pageInfo: posts_posts_pageInfo | null;
}

export interface posts {
  posts: posts_posts | null;
}

export interface postsVariables {
  limit: number;
  after?: number | null;
}
