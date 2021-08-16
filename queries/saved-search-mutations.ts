import { gql } from "@apollo/client";
import { ProductFragment, SavedSearchFragment } from "./fragments";
import {
  ExternalProductsFragment,
} from "./fragments";



export const INSERT_SAVED_SEARCH = gql`
  mutation insertSavedSearch(
    $categorySlug: String
    $dealerState: String
    $make: String
    $model: String
    $caliber: String
  ) {
    insertSavedSearch(
      categorySlug: $categorySlug
      dealerState: $dealerState
      make: $make
      model: $model
      caliber: $caliber
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
      externalProductId
      externalProduct {
        ...ExternalProductsFragment
      }
    }
  }
  ${SavedSearchFragment}
  ${ProductFragment}
  ${ExternalProductsFragment}
`;


