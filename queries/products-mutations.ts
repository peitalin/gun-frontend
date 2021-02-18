import gql from "graphql-tag";
import { ImageFragment } from "./fragments";

export const CREATE_PRODUCT = gql`
  mutation createProduct($productCreateInput: ProductCreateInput) {
    createProduct(productCreateInput: $productCreateInput) {
      ... on ProductMutationResponse {
        product {
          id
          isSuspended
          isPublished
          isDeleted
          isExcludedFromRecommendations
          isExcludedFromSearch
          tags
          updatedAt
          category {
            id
            name
            categoryGroup
          }
          currentSnapshot {
            id
            createdAt
            title
            description
            condition
            make
            model
            ammoType
            actionType
            caliber
            serialNumber
            location
            dealer {
              id
              name
              address
              state
              postCode
              licenseNumber
            }
          }
          featuredVariant {
            variantId
            variantName
            variantDescription
            isDefault
            previewItems {
              id
              youTubeEmbedLink
              image {
                ...ImageFragment
              }
            }
          }
        }
      }
    }
  }
  ${ImageFragment}
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($productEditInput: ProductEditInput) {
    editProduct(productEditInput: $productEditInput) {
      product {
        id
        isSuspended
        isPublished
        isDeleted
        isExcludedFromRecommendations
        isExcludedFromSearch
        tags
        # category {
        #   id
        #   name
        #   categoryGroup
        # }
        currentSnapshot {
          title
          description
          condition
          make
          model
          ammoType
          actionType
          caliber
          serialNumber
          location
          dealer {
            id
            name
            address
            state
            postCode
            licenseNumber
          }
        }
        featuredVariant {
          variantId
          variantName
          variantDescription
          isDefault
          previewItems {
            id
            youTubeEmbedLink
            image {
              ...ImageFragment
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  }
  ${ImageFragment}
`;
