import gql from "graphql-tag";
import { ProductFragment } from "./fragments"

export const CREATE_COLLECTION = gql`
  mutation createCollection(
    $name: String!
    $privateCollection: Boolean
  ) {
    createCollection(
      name: $name
      privateCollection: $privateCollection
    ) {
      id
      createdAt
      updatedAt
      name
      private
      userId
      itemsConnection {
        totalCount
        edges {
          node {
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
    }
  }
  ${ProductFragment}
`;


export const DELETE_COLLECTION = gql`
  mutation deleteCollection(
    $collectionId: String!
  ) {
    deleteCollection(
      collectionId: $collectionId
    ) {
      success
      status
    }
  }
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
