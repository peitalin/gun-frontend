import gql from "graphql-tag";
import { ImageFragment } from "./fragments";

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    getProductCategories {
      id
      name
      createdAt
      updatedAt
      categoryGroup
      slug
      thumbImageId
      bannerImageId
      thumbImage {
        ...ImageFragment
      }
      bannerImage {
        ...ImageFragment
      }
    }
  }
  ${ImageFragment}
`;
