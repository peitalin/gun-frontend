import gql from "graphql-tag";

export const GET_CALIBERS = gql`
  query getCalibers {
    getCalibers {
      id
      name
      group
    }
  }
`;



export const INITIATE_CALIBERS = gql`
  mutation initiateCalibers {
    initiateCalibers {
      id
      name
      group
    }
  }
`;