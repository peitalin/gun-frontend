import gql from "graphql-tag";

import {
  ImageFragment,
  ProductFragment,
  NewsItemFragment,
} from "./fragments";
import { enableExperimentalFragmentVariables } from 'graphql-tag'
enableExperimentalFragmentVariables()





export const SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW = gql`
  subscription($limit: Int) {
    newsItemsSortByNewConnection(
      limit: $limit
    ) {
      edges {
        node {
          ...NewsItemFragment
        }
      }
      pageInfo {
        isLastPage
        totalPages
      }
      totalCount
    }
  }
  ${NewsItemFragment}
`;

