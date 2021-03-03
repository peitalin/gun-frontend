import { gql } from "@apollo/client";
import { ProductFragment } from "./fragments";


export const SEARCH = gql`
  query search($searchTerm: String!, $pageNumber: Int!) {
    search(
      searchTerm: $searchTerm,
      query: { pageNumber: $pageNumber }
    ) {
      totalCount
      edges {
        node {
          ...on ProductPublic {
            ...ProductFragment
          }
          ...on ProductPrivate {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${ProductFragment}
`;


export const SEARCH_ALL_PRODUCTS = gql`
  query search(
    $searchTerm: String!
    $query: ConnectionOffsetQuery
  ) {
    search(
      searchTerm: $searchTerm,
      query: $query
    ) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
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
