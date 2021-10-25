import gql from "graphql-tag";
import {
  NewsItemFragment,
  NewsItemFullFragment,
  UserPrivateFragment,
  ImageFragment,
} from "./fragments";




export const GENERATE_CLAIM_PRODUCT_REF_ID = gql`
  mutation generateClaimProductRefId(
    $newsItemId: String!
  ) {
    generateClaimProductRefId(
      newsItemId: $newsItemId
    ) {
      claimId
      claimLink
      newsItemId
    }
  }
`;


export const SWAP_IMAGES_FOR_EXTERNAL_PRODUCT = gql`
  mutation swapImagesForExternalProduct(
    $claimId: String!
    $newPreviewItems: [ProductPreviewItemInput!]!
  ) {
    swapImagesForExternalProduct(
      claimId: $claimId
      newPreviewItems: $newPreviewItems
    ) {
      ...NewsItemFullFragment
    }
  }
  ${NewsItemFullFragment}
`;



export const GET_NEWS_ITEM_BY_CLAIM_ID = gql`
  query($claimId: String!) {
    getNewsItemByClaimId(claimId: $claimId) {
      ...NewsItemFullFragment
    }
  }
  ${NewsItemFullFragment}
`;


export const SIGN_UP_AND_CLAIM_ITEM = gql`
  mutation signUpAndClaimItem(
    $claimId: String!
    $email: String!
    $password: String!
    # phone args
    $phoneNumber: String
    $countryCode: String
    # license args
    $firstName: String!
    $lastName: String!
    $licenseNumber: String!
    $licenseExpiry: Date!
    $licenseCategory: String!
    $licenseState: String!
    $dealerId: String
    $newPreviewItems: [ProductPreviewItemInput!]!
  ) {
    signUpAndClaimItem(
      claimId: $claimId
      email: $email
      password: $password
      # phone args
      phoneNumber: $phoneNumber
      countryCode: $countryCode
      # license args
      firstName: $firstName
      lastName: $lastName
      licenseNumber: $licenseNumber
      licenseExpiry: $licenseExpiry
      licenseCategory: $licenseCategory
      licenseState: $licenseState
      dealerId: $dealerId
      newPreviewItems: $newPreviewItems
    ) {
      claimId
      user {
        ...UserPrivateFragment
      }
      newsItem {
        ...NewsItemFullFragment
      }
    }
  }
  ${UserPrivateFragment}
  ${NewsItemFullFragment}
`;

export const LOG_IN_AND_CLAIM_ITEM = gql`
  mutation logInAndClaimItem(
    $claimId: String!
    $email: String!
    $password: String!
    $dealerId: String
    $newPreviewItems: [ProductPreviewItemInput!]!
  ) {
    logInAndClaimItem(
      claimId: $claimId
      email: $email
      password: $password
      dealerId: $dealerId
      newPreviewItems: $newPreviewItems
    ) {
      claimId
      user {
        ...UserPrivateFragment
      }
      newsItem {
        ...NewsItemFullFragment
      }
    }
  }
  ${UserPrivateFragment}
  ${NewsItemFullFragment}
`;

