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


export const SEARCH_DEALER_AS_ADMIN = gql`
  query {
    searchDealerAsAdmin($dealerIdOrLicenseNumber: String!) {
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
