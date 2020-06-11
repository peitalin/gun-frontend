import gql from "graphql-tag";
import { ProductFragment } from "queries/fragments";




export const GET_ALL_PRODUCTS = gql`
  query productsAllConnection(
    $searchTerm: String!
    $query: ConnectionOffsetQuery
  ) {
    productsAllConnection(
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

