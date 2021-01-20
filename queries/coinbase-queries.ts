import gql from "graphql-tag";

export const GET_COINBASE_EXCHANGE_RATES = gql`
  query {
    getCoinbaseExchangeRates {
      currency
      rates
    }
  }
`;
