import gql from "graphql-tag";
import { ImageFragmentStore, StorePrivateFragment } from "./fragments";

export const CREATE_STORE = gql`
  mutation (
    $userId: String!
    $storeId: String!
    $name: String!
    $profileId: String!
    $coverId: String!
    $bio: String
    $website: String
  ) {

    update_users(
      where: {id: {_eq: $userId }},
      _set: {storeId: $storeId }
    ) {
      affected_rows
    }

    insert_stores_one(object: {
      id: $storeId,
      userId: $userId,
      name: $name,
      profileId: $profileId,
      coverId: $coverId,
      bio: $bio,
      website: $website,
    }) {
      id
      bio
      website
      name
      userId
      user {
        id
      }
      cover {
        ...ImageFragmentStore
      }
      profile {
        imageId
        original {
          parentId
          variantId
          widthInPixels
          heightInPixels
          sizeInBytes
          url
        }
        variants {
          parentId
          variantId
          mimeType
          widthInPixels
          heightInPixels
          url
        }
        createdAt
        tags
        description
      }

    }
  }
  ${ImageFragmentStore}
`;




export const EDIT_STORE = gql`
  mutation editStoreProfile(
    $userId: String!
    $storeId: String!
    $name: String
    $profileId: String
    $coverId: String
    $website: String
    $bio: String
  ) {
    editStoreProfile(
      userId: $userId,
      storeId: $storeId,
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
  ${ImageFragmentStore}
  ${StorePrivateFragment}
`;
