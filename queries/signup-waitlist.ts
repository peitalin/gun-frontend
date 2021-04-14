import gql from "graphql-tag";


export const SIGNUP_TO_WAITLIST = gql`
  mutation signupToWaitlist(
    $email: String!
  ) {
    signupToWaitlist(email: $email) {
      id
      email
      createdAt
    }
  }
`;

export const GET_SIGNUP_WAITLIST = gql`
  mutation getSignupWaitlist(
    $limit: Int!
  ) {
    getSignupWaitlist(limit: $limit) {
      id
      email
      createdAt
    }
  }
`;