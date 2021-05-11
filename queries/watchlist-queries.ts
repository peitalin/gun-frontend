import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

export const GET_WATCHLIST_CONNECTION = gql`
  query watchlistItemsConnection($query: ConnectionQuery!) {
    watchlistItemsConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        cursor
        node {
          addedAt
          product {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${ProductFragment}
`;
