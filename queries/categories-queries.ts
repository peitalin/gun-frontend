import gql from "graphql-tag";

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    getProductCategories {
      id
      name
      createdAt
      updatedAt
      categoryGroup
    }
  }
`;
