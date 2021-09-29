import gql from "graphql-tag";
import {
  NewsItemFragment,
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


export const SWAP_IMAGES_FOR_CLAIM = gql`
  mutation swapImagesForClaim(
    $claimId: String!
    $previewItems: [ProductPreviewItemInput!]!
  ) {
    generateClaimProductRefId(
      newsItemId: $newsItemId
      previewItems: $previewItems
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


