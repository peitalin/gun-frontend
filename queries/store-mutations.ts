import gql from "graphql-tag";
import { StorePrivateFragment } from "./fragments";



export const CREATE_STORE = gql`
  mutation createStore(
    $name: String!
    $profileId: String
    $coverId: String
    $bio: String
    $website: String
  ) {
    createStore(
      name: $name,
      profileId: $profileId,
      coverId: $coverId
      bio: $bio
      website: $website,
    ) {
      store {
        ... on StorePrivate {
          ...StorePrivateFragment
        }
      }
    }
  }
  ${StorePrivateFragment}
`;


export const EDIT_STORE = gql`
  mutation editStoreProfile(
    $name: String
    $profileId: String
    $coverId: String
    $website: String
    $bio: String
  ) {
    editStoreProfile(
      name: $name
      profileId: $profileId
      coverId: $coverId
      website: $website
      bio: $bio
    ) {
      store {
        ... on StorePrivate {
          ...StorePrivateFragment
        }
      }
    }
  }
  ${StorePrivateFragment}
`;