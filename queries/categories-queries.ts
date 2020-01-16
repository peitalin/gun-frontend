import gql from "graphql-tag";

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    categories {
      id
      name
      createdAt
      updatedAt
      categoryGroup
    }
  }
`;
