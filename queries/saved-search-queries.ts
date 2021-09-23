import { gql } from "@apollo/client";
import {
  ProductFragment,
  ProductLiteFragment,
  ExternalProductsFragment,
  SavedSearchFragment,
} from "./fragments";


export const GET_SAVED_SEARCHES_BY_USER = gql`
  query getSavedSearchesByUser(
    $limit: Int
    $offset: Int
  ) {
    getSavedSearchesByUser(
      limit: $limit
      offset: $offset
    ) {
      totalCount
      edges {
        node {
          ...SavedSearchFragment
        }
      }
    }
  }
  ${SavedSearchFragment}
`;


export const GET_SAVED_SEARCH_HITS_BY_USER = gql`
  query getSavedSearchHitsByUser(
    $limit: Int
    $offset: Int
    $unseenOnly: Boolean
  ) {
    getSavedSearchHitsByUser(
      limit: $limit
      offset: $offset
      unseenOnly: $unseenOnly
    ) {
      totalCount
      edges {
        node {
          id
          createdAt
          productTitle
          seen
          userId
          savedSearchId
          savedSearch {
            ...SavedSearchFragment
          }
          productId
          product {
            ...ProductLiteFragment
          }
          externalProductId
          externalProduct {
            ...ExternalProductsFragment
          }
        }
      }
    }
  }
  ${SavedSearchFragment}
  ${ProductLiteFragment}
  ${ExternalProductsFragment}
`;



