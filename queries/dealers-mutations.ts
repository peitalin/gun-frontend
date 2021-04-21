import gql from "graphql-tag";
import { UserPrivateFragment, DealerFragment } from "./fragments";


export const CREATE_NEW_DEALER = gql`
  mutation createNewDealer(
    $name: String!
    $address: String
    $city: String
    $postCode: String
    $state: String
    $licenseNumber: String!
  ) {
    createNewDealer(
      name: $name,
      address: $address
      city: $city
      state: $state
      postCode: $postCode
      licenseNumber: $licenseNumber
    ) {
      status
      dealer {
        ...DealerFragment
      }
    }
  }
  ${DealerFragment}
`;

export const CREATE_DEALER_FOR_USER = gql`
  mutation createDealerForUser(
    $dealerUserId: String!
    $name: String!
    $address: String
    $city: String
    $postCode: String
    $state: String
    $licenseNumber: String!
  ) {
    createDealerForUser(
      dealerUserId: $dealerUserId
      name: $name,
      address: $address
      city: $city
      state: $state
      postCode: $postCode
      licenseNumber: $licenseNumber
    ) {
      user {
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;


export const EDIT_DEALER = gql`
  mutation editDealer(
    $name: String
    $address: String
    $city: String
    $state: String
    $postCode: String
    $licenseNumber: String!
  ) {
    editDealer(
      name: $name
      address: $address
      city: $city
      state: $state
      postCode: $postCode
      licenseNumber: $licenseNumber
    ) {
      user {
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const SET_DEALER_ID_FOR_USER = gql`
  mutation setDealerIdForUser(
    $dealerUserIdOrEmail: String!
    $dealerId: String
  ) {
    setDealerIdForUser(
      dealerUserIdOrEmail: $dealerUserIdOrEmail
      dealerId: $dealerId
    ) {
      user {
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const UNLINK_USERS_FOR_DEALER = gql`
  mutation unlinkUsersForDealerId(
    $dealerId: String!
  ) {
    unlinkUsersForDealerId(
      dealerId: $dealerId
    ) {
      status
      dealer {
        ...DealerFragment
      }
    }
  }
  ${DealerFragment}
`;


export const DELETE_DEALER = gql`
  mutation deleteDealerAsAdmin($dealerId: String!) {
    deleteDealerAsAdmin(dealerId: $dealerId) {
      status
      dealer {
        ...DealerFragment
      }
    }
  }
  ${DealerFragment}
`;