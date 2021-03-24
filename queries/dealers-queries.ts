import gql from "graphql-tag";
import { DealerFragment } from "./fragments";

export const GET_ALL_DEALERS = gql`
  query getAllDealers {
    getAllDealers {
      ...DealerFragment
    }
  }
  ${DealerFragment}
`;


export const SEARCH_DEALER_AS_ADMIN = gql`
  query searchDealerAsAdmin($dealerIdOrLicenseNumber: String!) {
    searchDealerAsAdmin(dealerIdOrLicenseNumber: $dealerIdOrLicenseNumber) {
      ...DealerFragment
    }
  }
  ${DealerFragment}
`;
