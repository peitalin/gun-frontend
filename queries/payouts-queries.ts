import gql from "graphql-tag";
import { PayoutItemFragment, TransactionFragment } from "./payouts-fragments";


export const PayoutItemFragment2 = gql`
fragment PayoutItemFragment2 on PayoutItem {
  id
  txnId
  storeId
  payeeType
  amount
  paymentProcessingFee
  createdAt
  currency
  payoutStatus
  payoutId
  orderItemId
  orderItem {
    id
    orderId
    product {
      title
      store {
        id
        name
        website
      }
    }
  }
  transaction {
    id
    orderId
    taxes
    subtotal
    paymentProcessingFee
  }
}
`;


export const GET_PAYOUTS_IN_PERIOD_ADMIN = gql`
query getPayoutsInPeriodAdmin(
  $month: Int!
  $year: Int!
  $query: ConnectionQuery!
) {
  getPayoutsInPeriodAdmin(month: $month, year: $year, query: $query) {
    totalCount
    totalAmount
    pageInfo {
      endCursor
      totalPages
      isLastPage
    }
    edges {
      cursor
      node {
        id
        createdAt
        storeId
        payeeType
        amount
        payoutDate
        # payoutEmail
        payoutStatus
        startPeriod
        endPeriod
        approvedByAdmins {
          id
          email
          firstName
        }
        payoutItems {
          ...PayoutItemFragment2
        }
      }
    }
  }
}
${PayoutItemFragment2}
`;
