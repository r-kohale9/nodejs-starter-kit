/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: report
// ====================================================

export interface report_report {
  __typename: "Report";
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface report {
  report: (report_report | null)[] | null;
}
