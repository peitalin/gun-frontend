import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

export const GET_PROMOTED_LIST = gql`
  query(
    $promotedListId: String!
    $limit: Int
    $offset: Int
  ) {
    promotedList(
      promotedListId: $promotedListId
      limit: $limit
      offset: $offset
    ) {
      id
      createdAt
      updatedAt
      numberOfSlots
      categoryFilterSlug
      cardsPerRow
      promotedListItemsConnection {
        pageInfo {
          isLastPage
        }
        totalCount
        edges {
          node {
            id
            createdAt
            promotedListId
            productId
            product {
              ...ProductFragment
            }
            ownerId
            reservePrice
            isAvailableForPurchase
            expiresAt
            position
          }
        }
      }
    }
  }
  ${ProductFragment}
`;