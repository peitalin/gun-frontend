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


export const NEWS_ITEMS_SORT_BY_HOT_CONNECTION = gql`
  query($query: ConnectionQuery) {
    newsItemsSortByHotConnection(query: $query) {
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
  query($query: ConnectionQuery) {
    getHotNewsItemsToday(query: $query) {
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
  ) {
    getHotNewsItemsYesterday(
      query: $query
      sortByDate: $sortByDate
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
  ) {
    getHotNewsItemsThisWeek(
      query: $query
      sortByDate: $sortByDate
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
  ) {
    getHotNewsItemsLastWeek(
      query: $query
      sortByDate: $sortByDate
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










