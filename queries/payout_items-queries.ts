import gql from "graphql-tag";
import { TransactionFragment, PayoutItemFragment } from "./payouts-fragments";

export const GET_PAYOUT_ITEMS_IN_PERIOD_ADMIN_PAGED = gql`
  query getPayoutItemsInPeriodAdminPaged(
    $month: Int
    $year: Int
    $payoutStatus: PayoutStatus
    $query: PageBasedConnectionQuery!
  ) {
    getPayoutItemsInPeriodAdminPaged(
      month: $month
      year: $year
      payoutStatus: $payoutStatus
      query: $query
    ) {
      totalCount
      totalAmount
      totalFees
      pageInfo {
        pageNumber
        totalPages
        isLastPage
      }
      totalCount
      edges {
        node {
          ...PayoutItemFragment
        }
      }
    }
  }
  ${PayoutItemFragment}
`;

export const GET_TRANSACTIONS_IN_PERIOD_ADMIN = gql`
  query getTransactionsInPeriodAdmin(
    $month: Int
    $year: Int
    $query: ConnectionQuery!
  ) {
    getTransactionsInPeriodAdmin(month: $month, year: $year, query: $query) {
      totalCount
      totalAmount
      totalFees
      pageInfo {
        totalPages
        isLastPage
      }
      edges {
        node {
          ...TransactionFragment
        }
      }
    }
  }
  ${TransactionFragment}
`;
