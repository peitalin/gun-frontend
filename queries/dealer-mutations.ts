import gql from "graphql-tag";
import { UserPrivateFragment } from "./fragments";



export const CREATE_DEALER = gql`
  mutation createStore(
    $name: String!
    $address: String
    $city: String
    $state: String
    $postCode: String
    $licenseNumber: String!
  ) {
    createDealer(
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
  mutation editDealerProfile(
    $name: String
    $address: String
    $city: String
    $state: String
    $postCode: String
    $licenseNumber: String!
  ) {
    editDealerProfile(
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