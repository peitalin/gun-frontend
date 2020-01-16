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
          isExcludedFromAutomaticLists
          tags
          category {
            id
            name
            categoryGroup
          }
          name
          tagline
          description
          currentVariants {
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
            files {
              id
              fileName
              mimeType
              sizeInBytes
              createdAt
            }
          }
          createdAt
          updatedAt
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
        isExcludedFromAutomaticLists
        tags
        category {
          id
          name
          categoryGroup
        }
        name
        tagline
        description
        currentVariants {
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
          files {
            id
            fileName
            mimeType
            sizeInBytes
            createdAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
  ${ImageFragment}
`;

const mockEditProduct = {
  productId: "prod_9e59bf83-152b-410f-bd69-7396d5ae3548",
  categoryId: "pcategory_4f7a6675-0838-470a-aaa5-071ceb58560d",
  name: "A portrait of a happy family",
  tagline: "All happy families are like...",
  description: "Every unhappy family is unhappy in its own way",
  currentVariants: [
    {
      variantName: "black",
      variantDescription: "black beast",
      price: 4555,
      priceWas: 5555,
      fileIds: ["file_1119829sdfasdf"],
      previewItems: [
        {
          imageId: "image_fake_31671644-50a9-496b-bcb8-84e17f514fe2",
          youTubeEmbedLink: "https://www.youtube.com/watch?v=yPYZpwSpKmA"
        },
        {
          imageId: "image_fake_124f7a89-95ad-4558-9427-c2679bdb18c3",
          youTubeEmbedLink: "https://www.youtube.com/watch?v=yPYZpwSpKmA"
        }
      ]
    }
  ],
  tags: ["Photoshop", "Portraits", "digital art"],
  isPublished: true
};

export const mockProductInput = {
  storeId: "store_333k1029-01239",
  categoryId: "pcategory_4f7a6675-0838-470a-aaa5-071ceb58560d",
  name: "A portrait of a perfect family",
  tagline: "Modern Family",
  description: "Just a nice picture of a family.",
  currentVariants: [
    {
      price: 5555,
      priceWas: 6666,
      variantName: "blue variant",
      variantDescription: "a blue one",
      previewItems: [
        {
          imageId: "image_fake_124f7a89-95ad-4558-9427-c2679bdb18c3",
          youTubeEmbedLink: "https://www.youtube.com/watch?v=yPYZpwSpKmA"
        }
      ],
      fileIds: ["file_1119829sdfasdf"]
    }
  ],
  tags: ["Photoshop", "Portraits", "digital art"],
  isPublished: true
};
