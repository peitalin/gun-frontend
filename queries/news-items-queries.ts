import gql from "graphql-tag";
import {
  ExternalProductSnapshotsFragment,
  ExternalProductsFragment,
  NewsItemFragment,
} from "./news-items-subscriptions";

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

