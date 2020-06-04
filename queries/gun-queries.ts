import gql from "graphql-tag";
import { ProductFragment } from "queries/fragments";




export const GET_PRODUCTS = gql`
  query productsAllConnection($query: ConnectionOffsetQuery) {
    productsAllConnection(query: $query) {
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

