import gql from "graphql-tag";

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
        basePrice
        previewItems {
          id
          imageId
          position
          youtubeEmbedLink
          variantSnapshotId
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
`;

