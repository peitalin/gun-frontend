import gql from "graphql-tag";
import { ImageFragment, StorePrivateFragment } from "./fragments";


export const HasuraStoreFragment = gql`
  fragment HasuraStoreFragment on stores {
    id
    name
    createdAt
    updatedAt
    website
    bio
    userId
    user {
      id
    }
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
    productsForSaleConnection {
      id
      currentSnapshot {
        id
        serialNumber
        title
      }
    }
  }
  ${ImageFragment}
`;

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
      ...HasuraStoreFragment
    }
  }
  ${HasuraStoreFragment}
`;




export const EDIT_STORE = gql`
mutation($storeId: String) {
  update_stores(
    where: { id: {_eq: $storeId}},
    _set: {
      bio: "h2i"
    }
  ) {
    returning {
      ...HasuraStoreFragment
    }
  }
}
${HasuraStoreFragment}
`;
