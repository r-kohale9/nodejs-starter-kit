/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: messages
// ====================================================

export interface messages_messages_edges_node_quotedMessage {
  __typename: "QuotedMessage";
  id: number | null;
  text: string | null;
  username: string | null;
  path: string | null;
  filename: string | null;
}

export interface messages_messages_edges_node {
  __typename: "Message";
  id: number;
  text: string | null;
  userId: number | null;
  username: string | null;
  createdAt: string | null;
  uuid: string | null;
  quotedId: number | null;
  filename: string | null;
  path: string | null;
  quotedMessage: messages_messages_edges_node_quotedMessage | null;
}

export interface messages_messages_edges {
  __typename: "MessageEdges";
  cursor: number | null;
  node: messages_messages_edges_node | null;
}

export interface messages_messages_pageInfo {
  __typename: "MessagePageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface messages_messages {
  __typename: "Messages";
  totalCount: number | null;
  edges: (messages_messages_edges | null)[] | null;
  pageInfo: messages_messages_pageInfo | null;
}

export interface messages {
  messages: messages_messages | null;
}

export interface messagesVariables {
  limit: number;
  after?: number | null;
}
