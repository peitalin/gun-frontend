import gql from "graphql-tag";

export const GET_ALL_DEALERS = gql`
  query getAllDealers {
    getAllDealers {
      id
      name
      address
      city
      state
      postCode
      licenseNumber
    }
  }
`;
