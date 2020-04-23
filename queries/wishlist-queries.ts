import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

export const GET_WISHLIST_CONNECTION = gql`
  query wishlistItemsConnection($query: ConnectionQuery!) {
    wishlistItemsConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
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
