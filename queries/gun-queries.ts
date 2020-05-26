import gql from "graphql-tag";
import { HasuraImageFragment } from "queries/fragments";

export const GET_PRODUCTS = gql`
query {
  products {
    id
    storeId
    isDeleted
    isPublished
    isSuspended
    isExcludedFromSearch
    isExcludedFromRecommendations
    categoryId
    createdAt
    updatedAt
    currentSnapshot {
      id
      createdAt
      productId
      title
      description
      condition
      make
      model
      ammoType
      actionType
      boreDiameter
      serialNumber
      location
      dealer
      currentVariants {
        variantSnapshotId
        variantId
        variantName
        variantDescription
        position
        isDefault
        price
        priceWas
        previewItems {
          id
          imageId
          position
          youtubeEmbedLink
          variantSnapshotId
          image {
            ...HasuraImageFragment
          }
        }
        # preview_items_aggregate {
        #   aggregate {
        #     count
        #   }
        # }
      }
    }
  }
}
${HasuraImageFragment}
`;

