import gql from "graphql-tag";
import { UserPrivateFragment, StorePrivateFragment } from "./fragments";

export const SIGN_UP_USING_EMAIL = gql`
  mutation signUpUsingEmail(
    $email: String!
    $password: String!
    # $username: String
    # $firstName: String
    # $lastName: String
    # $licenseNumber: String!
    # $licenseExpiry: Date!
    # $licenseCategory: String
    # $licenseState: String
    # $phoneNumber: String!
    # $countryCode: String!
  ) {
    signUpUsingEmail(
      email: $email
      password: $password
      # username: $username
      # firstName: $firstName
      # lastName: $lastName
      # licenseNumber: $licenseNumber
      # licenseExpiry: $licenseExpiry
      # licenseCategory: $licenseCategory
      # licenseState: $licenseState
      # phoneNumber: $phoneNumber
      # countryCode: $countryCode
    ) {
      user {
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;

// # userId: $userId,
// NOTE: userID is extracted from the auth-cookie automatically server-side
// It is attached automatically if you are logged in.
export const UPDATE_USER = gql`
  mutation editUserProfile(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $payoutMethodId: String
    $editUserPhoneNumberInput: EditUserPhoneNumberInput!
  ) {
    editUserProfile(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      payoutMethodId: $payoutMethodId
      editUserPhoneNumberInput: $editUserPhoneNumberInput
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ... on UserMutationResponse {
        user {
          id
          email
        }
      }
    }
  }
`;

export const SET_PAYOUT_METHOD = gql`
  mutation setPayoutMethod(
    $payoutType: String
    $bsb: String
    $accountNumber: String
    $accountName: String
  ) {
    setPayoutMethod(
      payoutType: $payoutType
      bsb: $bsb
      accountNumber: $accountNumber
      accountName: $accountName
    ) {
      ... on UserMutationResponse {
        user {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const LOGOUT = gql`
  mutation logOut {
    logOut {
      ... on BlankMutationResponse {
        success
      }
    }
  }
`;

export const CONFIRM_RESET_PASSWORD = gql`
  mutation confirmResetPassword(
    $email: String!
    $expiresAt: Date!
    $resetId: String!
    $newPassword: String!
  ) {
    confirmResetPassword(
      email: $email
      expiresAt: $expiresAt
      resetId: $resetId
      newPassword: $newPassword
    ) {
      email
      resetId
      expiresAt
    }
  }
`;



// # userId: $userId,
// NOTE: userID is extracted from the auth-cookie automatically server-side
// It is attached automatically if you are logged in.
export const ADD_USER_LICENSE = gql`
  mutation addUserLicense(
    $firstName: String!
    $lastName: String!
    $licenseNumber: String!
    $licenseExpiry: Date!
    $licenseCategory: String
    $licenseState: String
  ) {
    addUserLicense(
      firstName: $firstName
      lastName: $lastName
      licenseNumber: $licenseNumber
      licenseExpiry: $licenseExpiry
      licenseCategory: $licenseCategory
      licenseState: $licenseState
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;



export const EDIT_USER_LICENSE = gql`
  mutation editUserLicense(
    $licenseNumber: String!
    $licenseExpiry: Date!
    $licenseCategory: String
    $licenseState: String
  ) {
    editUserLicense(
      licenseNumber: $licenseNumber
      licenseExpiry: $licenseExpiry
      licenseCategory: $licenseCategory
      licenseState: $licenseState
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;


export const DELETE_USER_LICENSE = gql`
  mutation deleteUserLicense(
    $licenseId: String!
  ) {
    deleteUserLicense(
      licenseId: $licenseId
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;


export const SET_DEFAULT_LICENSE_ID = gql`
  mutation setDefaultLicenseId(
    $licenseId: String!
  ) {
    setDefaultLicenseId(
      licenseId: $licenseId
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;
