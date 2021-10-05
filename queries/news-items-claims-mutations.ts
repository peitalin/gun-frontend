import gql from "graphql-tag";
import {
  NewsItemFragment,
  UserPrivateFragment,
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
    $previewItems: [ProductPreviewItemInput!]!
  ) {
    swapImagesForExternalProduct(
      claimId: $claimId
      previewItems: $previewItems
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;



export const GET_NEWS_ITEM_BY_CLAIM_ID = gql`
  query($claimId: String!) {
    getNewsItemByClaimId(claimId: $claimId) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


export const SIGN_UP_AND_CLAIM_ITEM = gql`
  mutation signUpAndClaimItem(
    $claimId: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $licenseNumber: String!
    $licenseExpiry: Date!
    $licenseCategory: String!
    $licenseState: String!
  ) {
    signUpAndClaimItem(
      claimId: $claimId
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      licenseNumber: $licenseNumber
      licenseExpiry: $licenseExpiry
      licenseCategory: $licenseCategory
      licenseState: $licenseState
    ) {
      claim {
        claimId
        claimLink
        newsItemId
      }
      user {
        ...UserPrivateFragment
      }
      newsItem {
        ...NewsItemFragment
      }
    }
  }
  ${UserPrivateFragment}
  ${NewsItemFragment}
`;

export const LOG_IN_AND_CLAIM_ITEM = gql`
  mutation logInAndClaimItem(
    $claimId: String!
    $email: String!
    $password: String!
  ) {
    logInAndClaimItem(
      claimId: $claimId
      email: $email
      password: $password
    ) {
      claim {
        claimId
        claimLink
        newsItemId
      }
      user {
        ...UserPrivateFragment
      }
      newsItem {
        ...NewsItemFragment
      }
    }
  }
  ${UserPrivateFragment}
  ${NewsItemFragment}
`;
