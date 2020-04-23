import gql from "graphql-tag";
import { ImageFragment, StorePrivateFragment } from "./fragments";

export const CREATE_STORE = gql`
  mutation createStore(
    $name: String!
    $profileId: ID!
    $coverId: ID
    $bio: String
    $website: String
  ) {
    createStore(
      name: $name
      profileId: $profileId
      coverId: $coverId
      bio: $bio
      website: $website
    ) {
      store {
        ... on StorePrivate {
          ...StorePrivateFragment
        }
      }
    }
  }
  ${ImageFragment}
  ${StorePrivateFragment}
`;

export const EDIT_STORE = gql`
  mutation editStoreProfile(
    $name: String
    $profileId: ID
    $coverId: ID
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
        ...StorePrivateFragment
      }
    }
  }
  ${ImageFragment}
  ${StorePrivateFragment}
`;
