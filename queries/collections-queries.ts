import gql from "graphql-tag";
import { ProductFragment, CollectionItemsFragment } from "./fragments";


export const GET_COLLECTIONS_BY_USER_ID = gql`
  query getCollectionsByUserId($query: ConnectionQuery) {
    getCollectionsByUserId(query: $query) {
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
            ...CollectionItemsFragment
          }
        }
      }
    }
  }
  ${CollectionItemsFragment}
`;

export const GET_COLLECTION = gql`
  query getCollection(
    $collectionId: String!
    $query: ConnectionQuery
  ) {
    getCollection(
      collectionId: $collectionId
      query: $query
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
            ...CollectionItemsFragment
          }
        }
      }
    }
  }
  ${CollectionItemsFragment}
`;
