import gql from "graphql-tag";
import { PayoutFragment } from "./payouts-fragments";

export const CREATE_PAYOUTS = gql`
  mutation createPayouts($month: Int!, $year: Int!) {
    createPayouts(month: $month, year: $year) {
      ...PayoutFragment
      payoutItems {
        id
        orderItemId
        amount
        paymentProcessingFee
        payoutStatus
        transaction {
          id
          orderId
          taxes
          subtotal
          paymentProcessingFee
        }
      }
      # payoutItemsConnection(query: $query) {
      #   pageInfo {
      #     isLastPage
      #     totalPages
      #   }
      #   totalCount
      #   totalAmount
      #   edges {
      #     cursor
      #     node {
      #       id
      #       orderItemId
      #       amount
      #       paymentProcessingFee
      #       payoutStatus
      #       transaction {
      #         id
      #         orderId
      #         taxes
      #         subtotal
      #         paymentProcessingFee
      #       }
      #     }
      #   }
      # }
    }
  }
  ${PayoutFragment}
`;

export const APPROVE_PAYOUTS = gql`
  mutation approvePayouts($payoutIds: [String!]!) {
    approvePayouts(payoutIds: $payoutIds) {
      approvedPayouts {
        ...PayoutFragment
        payoutItems {
          id
          payoutStatus
        }
        # payoutItemsConnection(
        #   query: {
        #     cursor: null
        #     count: 5
        #     sortAscending: false
        #     pageBackwards: false
        #   }
        # ) {
        #   edges {
        #     cursor
        #     node {
        #       id
        #       payoutStatus
        #     }
        #   }
        # }
      }
      payoutsAlreadyApproved {
        ...PayoutFragment
        payoutItems {
          id
          payoutStatus
        }
        # payoutItemsConnection(
        #   query: {
        #     cursor: null
        #     count: 5
        #     sortAscending: false
        #     pageBackwards: false
        #   }
        # ) {
        #   edges {
        #     cursor
        #     node {
        #       id
        #       payoutStatus
        #     }
        #   }
        # }
      }
    }
  }
  ${PayoutFragment}
`;
