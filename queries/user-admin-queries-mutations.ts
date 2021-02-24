import gql from "graphql-tag";
import { UserPrivateFragment, StorePrivateFragment } from "./fragments";


export const ADMIN_APPROVE_USER_LICENSE = gql`
  mutation adminApproveUserLicense(
    $userId: String!
    $verified: Boolean!
  ) {
    adminApproveUserLicense(
      userId: $userId
      verified: $verified
    ) {
      ... on UserMutationResponse {
        user {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;


export const USER_BY_EMAIL_OR_ID_ADMIN_ONLY = gql`
  query userByEmailOrIdAdminOnly(
    $userIdOrEmail: String!
  ) {
    userByEmailOrIdAdminOnly(
      userIdOrEmail: $userIdOrEmail
    ) {
      ...UserPrivateFragment
    }
  }
  ${UserPrivateFragment}
`;


export const GET_RECENT_USERS = gql`
  query getRecentUsers($limit: Int!, $offset: Int!) {
    getRecentUsers(limit: $limit, offset: $offset) {
      ...UserPrivateFragment
    }
  }
  ${UserPrivateFragment}
`;