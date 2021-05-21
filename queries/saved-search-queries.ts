import { gql } from "@apollo/client";
import { ProductFragment, SavedSearchFragment } from "./fragments";


export const GET_SAVED_SEARCHES_BY_USER = gql`
  query getSavedSearchesByUser(
    $limit: Int
    $offset: Int
  ) {
    getSavedSearchesByUser(
      limit: $limit
      offset: $offset
    ) {
      nodes {
        ...SavedSearchFragment
      }
      aggregate {
        count
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
      id
      createdAt
      productTitle
      seen
      userId
      user {
        id
        firstName
        lastName
        email
      }
      savedSearchId
      savedSearch {
        ...SavedSearchFragment
      }
    }
  }
  ${SavedSearchFragment}
`;



