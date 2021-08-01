import { gql } from "@apollo/client";
import {
  ProductFragment,
  SavedSearchFragment,
} from "./fragments";
import {
  ExternalProductsFragment,
} from "./news-items-subscriptions";


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
  ) {
    getSavedSearchHitsByUser(
      limit: $limit
      offset: $offset
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
            ...ProductFragment
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
  ${ProductFragment}
  ${ExternalProductsFragment}
`;



