import gql from "graphql-tag";
import { ImageFragment } from "./fragments";

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
      createdAt
      updatedAt
      categoryGroup
      slug
      blurb
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


export const INITIATE_CATEGORIES = gql`
  mutation initiateCategories {
    initiateCategories {
      id
      name
      createdAt
      updatedAt
      categoryGroup
      slug
      thumbImageId
      bannerImageId
      blurb
    }
  }
`;
