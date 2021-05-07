import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

export const GET_PROMOTED_LIST = gql`
  query(
    $promotedListId: String!
    $limit: Int
    $offset: Int
  ) {
    getPromotedList(
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
      promotedSlotsConnection {
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
            isRandomFiller
          }
        }
      }
    }
  }
  ${ProductFragment}
`;

export const ADD_PRODUCT_TO_PROMOTED_LIST = gql`
  mutation(
    $promotedSlotId: String!
    $promotedListId: String!
    $productId: String!
    $ownerId: String
  ) {
    addProductToPromotedList(
      promotedSlotId: $promotedSlotId
      promotedListId: $promotedListId
      productId: $productId
      ownerId: $ownerId
    ) {
      promotedSlot {
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
        isRandomFiller
      }
    }
  }
  ${ProductFragment}
`;


export const REMOVE_PRODUCT_FROM_PROMOTED_LIST = gql`
  mutation(
    $promotedSlotId: String!
    $promotedListId: String!
  ) {
    removeProductFromPromotedList(
      promotedSlotId: $promotedSlotId
      promotedListId: $promotedListId
    ) {
      promotedList {
        id
        createdAt
        updatedAt
        numberOfSlots
        categoryFilterSlug
        cardsPerRow
        promotedSlotsConnection {
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
              isRandomFiller
            }
          }
        }
      }
    }
  }
  ${ProductFragment}
`;



export const GET_PROMOTED_SLOT = gql`
  query($promotedSlotId: String!) {
    getPromotedSlotById(
      promotedSlotId: $promotedSlotId
    ) {
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
  ${ProductFragment}
`;

export const GET_PROMOTED_SLOT_BY_PRODUCT_ID = gql`
  query(
    $productId: String!
    # $promotedListId: String # narrows down a unique slot if supplied
  ) {
    getPromotedSlotByProductId(
      productId: $productId
    ) {
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
  ${ProductFragment}
`;