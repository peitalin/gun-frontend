import gql from "graphql-tag";
import {
  ProductFragment,
  OrderFragment,
  PaymentMethodFragment
} from "./fragments";

export const GET_DOWNLOADS = gql`
  query getDownloads($query: ConnectionQuery) {
    user {
      id
      ... on UserPrivate {
        downloadsConnection(query: $query) {
          totalCount
          pageInfo {
            isLastPage
            endCursor
          }
          edges {
            cursor
            node {
              product {
                ...ProductFragment
              }
              order {
                ...OrderFragment
                currentSnapshot {
                  transaction {
                    id
                    createdAt
                    subtotal
                    paymentProcessingFee
                    taxes
                    paymentProcessor
                    customerId
                    currency
                    paymentMethodId
                    paymentMethod {
                      ... on PaymentMethod {
                        ...PaymentMethodFragment
                      }
                    }
                    paymentIntentId
                    chargeId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${ProductFragment}
  ${OrderFragment}
  ${PaymentMethodFragment}
`;
