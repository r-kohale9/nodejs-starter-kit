/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onMessagesUpdated
// ====================================================

export interface onMessagesUpdated_messagesUpdated_node_quotedMessage {
  __typename: "QuotedMessage";
  id: number | null;
  text: string | null;
  username: string | null;
  path: string | null;
  filename: string | null;
}

export interface onMessagesUpdated_messagesUpdated_node {
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
  quotedMessage: onMessagesUpdated_messagesUpdated_node_quotedMessage | null;
}

export interface onMessagesUpdated_messagesUpdated {
  __typename: "UpdateMessagesPayload";
  mutation: string;
  node: onMessagesUpdated_messagesUpdated_node;
}

export interface onMessagesUpdated {
  messagesUpdated: onMessagesUpdated_messagesUpdated | null;
}

export interface onMessagesUpdatedVariables {
  endCursor: number;
}
