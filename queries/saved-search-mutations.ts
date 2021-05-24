import { gql } from "@apollo/client";
import { ProductFragment, SavedSearchFragment } from "./fragments";



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


export const MARK_SAVED_SEARCH_HITS_AS_SEEN = gql`
  mutation markSavedSearchHitsAsSeen(
    $savedSearchHitsIds: [String!]!
  ) {
    markSavedSearchHitsAsSeen(
      savedSearchHitsIds: $savedSearchHitsIds
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
      productId
      product {
        ...ProductFragment
      }
      savedSearchId
      savedSearch {
        ...SavedSearchFragment
      }
    }
  }
  ${SavedSearchFragment}
  ${ProductFragment}
`;


