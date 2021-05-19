import { gql } from "@apollo/client";
import { ProductFragment, SavedSearchFragment } from "./fragments";



export const SEARCH_ALL_PRODUCTS = gql`
  query search(
    $searchTerm: String!
    $query: ConnectionQuery
  ) {
    search(
      searchTerm: $searchTerm,
      query: $query
    ) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;


export const REINDEX_SEARCH_INDEX_ADMIN = gql`
  mutation reindexSearchIndex {
    reindexSearchIndex {
      success
    }
  }
`;


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


export const INSERT_SAVED_SEARCH = gql`
  mutation insertSavedSearch(
    $searchTerm: String!
    $categorySlug: String
    $caliber: String
    $dealerState: String
  ) {
    insertSavedSearch(
      searchTerm: $searchTerm
      categorySlug: $categorySlug
      caliber: $caliber
      dealerState: $dealerState
    ) {
      ...SavedSearchFragment
    }
  }
  ${SavedSearchFragment}
`;



export const DELETE_SAVED_SEARCH = gql`
  mutation deleteSavedSearch($savedSearchId: String!) {
    deleteSavedSearch(savedSearchId: $savedSearchId) {
      ...SavedSearchFragment
    }
  }
  ${SavedSearchFragment}
`;

