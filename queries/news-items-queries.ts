import gql from "graphql-tag";
import {
  ExternalProductSnapshotsFragment,
  ExternalProductsFragment,
  NewsItemFragment,
} from "./fragments";



export const GET_NEWS_ITEM_BY_ID = gql`
  query($newsItemId: String!) {
    getNewsItemById(newsItemId: $newsItemId) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


export const SEARCH_NEWS_ITEMS_CONNECTION = gql`
  query(
    $query: ConnectionQuery
    $searchTerm: String
    $sortByDate: Boolean
    $productType: String
    $categorySlugs: [String]
    $dealerStates: [String]
    $calibers: [String]
    $actionTypes: [String]
  ) {
    getNewsItemsSearchConnection(
      query: $query
      searchTerm: $searchTerm
      sortByDate: $sortByDate
      productType: $productType
      categorySlugs: $categorySlugs
      dealerStates: $dealerStates
      calibers: $calibers
      actionTypes: $actionTypes
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
    $productType: ProductType
  ) {
    getHotNewsItemsToday(
      query: $query
      productType: $productType
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
    $sortByDate: Boolean
    $productType: ProductType
  ) {
    getHotNewsItemsYesterday(
      query: $query
      sortByDate: $sortByDate
      productType: $productType
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
    $sortByDate: Boolean
    $productType: ProductType
  ) {
    getHotNewsItemsThisWeek(
      query: $query
      sortByDate: $sortByDate
      productType: $productType
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
    $sortByDate: Boolean
    $productType: ProductType
  ) {
    getHotNewsItemsLastWeek(
      query: $query
      sortByDate: $sortByDate
      productType: $productType
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










