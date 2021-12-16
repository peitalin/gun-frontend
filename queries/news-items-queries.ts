import gql from "graphql-tag";
import {
  ExternalProductSnapshotsFragment,
  ExternalProductsFragment,
  NewsItemFragment,
  NewsItemFullFragment,
} from "./fragments";



export const GET_NEWS_ITEM_BY_ID = gql`
  query($newsItemId: String!) {
    getNewsItemById(newsItemId: $newsItemId) {
      ...NewsItemFullFragment
    }
  }
  ${NewsItemFullFragment}
`;


export const SEARCH_NEWS_ITEMS_CONNECTION = gql`
  query(
    $query: ConnectionQuery
    $searchTerm: String
    $sortBy: SortByNewsItems
    $productType: ProductType
    $categorySlugs: [String]
    $dealerStates: [String]
    $calibers: [String]
    $actionTypes: [String]
    $conditions: [String]
  ) {
    getNewsItemsSearchConnection(
      query: $query
      searchTerm: $searchTerm
      sortBy: $sortBy
      productType: $productType
      categorySlugs: $categorySlugs
      dealerStates: $dealerStates
      calibers: $calibers
      actionTypes: $actionTypes
      conditions: $conditions
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;


export const GET_HOT_NEWS_ITEMS_TODAY = gql`
  query(
    $query: ConnectionQuery,
    $sortBy: SortByNewsItems
  ) {
    getHotNewsItemsToday(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;




export const GET_HOT_NEWS_ITEMS_YESTERDAY = gql`
  query(
    $query: ConnectionQuery
    $sortBy: SortByNewsItems
  ) {
    getHotNewsItemsYesterday(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;


export const GET_HOT_NEWS_ITEMS_THIS_WEEK = gql`
  query(
    $query: ConnectionQuery
    $sortBy: SortByNewsItems
  ) {
    getHotNewsItemsThisWeek(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;



export const GET_HOT_NEWS_ITEMS_LAST_WEEK = gql`
  query(
    $query: ConnectionQuery
    $sortBy: SortByNewsItems
  ) {
    getHotNewsItemsLastWeek(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;








///////////////// MISC ITEMS


export const GET_HOT_MISC_ITEMS_THIS_WEEK = gql`
  query(
    $query: ConnectionQuery
    $sortBy: SortByNewsItems
  ) {
    getHotMiscItemsThisWeek(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;


export const GET_HOT_MISC_ITEMS_LAST_WEEK = gql`
  query(
    $query: ConnectionQuery
    $sortBy: SortByNewsItems
  ) {
    getHotMiscItemsLastWeek(
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;


// export const GET_NEWS_ITEM_BY_CLAIM_ID = gql`
//   query($claimId: String!) {
//     getNewsItemByClaimId(claimId: $claimId) {
//       ...NewsItemFragment
//     }
//   }
//   ${NewsItemFragment}
// `;
