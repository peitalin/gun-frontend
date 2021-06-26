import gql from "graphql-tag";
import { ProductFragment, CollectionFragment } from "./fragments"

export const CREATE_COLLECTION = gql`
  mutation createCollection(
    $name: String!
    $privateCollection: Boolean
  ) {
    createCollection(
      name: $name
      privateCollection: $privateCollection
    ) {
      ...CollectionFragment
    }
  }
  ${CollectionFragment}
`;


export const DELETE_COLLECTION = gql`
  mutation deleteCollection(
    $collectionId: String!
  ) {
    deleteCollection(
      collectionId: $collectionId
    ) {
      ...CollectionFragment
    }
  }
  ${CollectionFragment}
`;


export const EDIT_COLLECTION = gql`
  mutation editCollection(
    $collectionId: String!
    $name: String
    $privateCollection: Boolean
  ) {
    editCollection(
      collectionId: $collectionId
      name: $name
      privateCollection: $privateCollection
    ) {
      ...CollectionFragment
    }
  }
  ${CollectionFragment}
`;



export const ADD_PRODUCT_TO_COLLECTION = gql`
  mutation addProductToCollection(
    $productId: String!
    $userId: String!
    $collectionId: String!
  ) {
    addProductToCollection(
      productId: $productId,
      userId: $userId,
      collectionId: $collectionId
    ) {
      collectionId
      collectionItem {
        id
        createdAt
        userId
        productId
        product {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;


export const REMOVE_PRODUCT_FROM_COLLECTION = gql`
  mutation removeProductFromCollection(
    $collectionId: String!
    $collectionItemId: String!
  ) {
    removeProductFromCollection(
      collectionId: $collectionId,
      collectionItemId: $collectionItemId,
    ) {
      collectionId
      collectionItem {
        id
        createdAt
        userId
        productId
        product {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;
