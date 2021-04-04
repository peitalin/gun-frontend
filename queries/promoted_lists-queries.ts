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

export const ADD_PRODUCT_TO_PROMOTED_LIST = gql`
  mutation(
    $promotedListItemId: String!
    $promotedListId: String!
    $productId: String!
    $ownerId: String
  ) {
    addProductToPromotedList(
      promotedListItemId: $promotedListItemId
      promotedListId: $promotedListId
      productId: $productId
      ownerId: $ownerId
    ) {
      promotedListItem {
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
  ${ProductFragment}
`;


export const REMOVE_PRODUCT_FROM_PROMOTED_LIST = gql`
  mutation(
    $promotedListItemId: String!
    $promotedListId: String!
  ) {
    removeProductFromPromotedList(
      promotedListItemId: $promotedListItemId
      promotedListId: $promotedListId
    ) {
      promotedList {
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
  }
  ${ProductFragment}
`;