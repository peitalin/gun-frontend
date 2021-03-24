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
      ...DealerFragment
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
    $dealerUserId: String!
    $dealerId: String
  ) {
    setDealerIdForUser(
      dealerUserId: $dealerUserId
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

