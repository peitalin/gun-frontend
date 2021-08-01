import gql from "graphql-tag";

import {
  ImageFragment
} from "./fragments";
import {
  ExternalProductSnapshotsFragment,
  ExternalProductsFragment,
  NewsItemFragment,
} from "./news-items-subscriptions";
import { enableExperimentalFragmentVariables } from 'graphql-tag'
enableExperimentalFragmentVariables()






export const UPVOTE_NEWS_ITEM = gql`
  mutation(
    $newsItemId: String!
  ) {
    upvoteNewsItem(
      newsItemId: $newsItemId
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


export const DOWNVOTE_NEWS_ITEM = gql`
  mutation(
    $newsItemId: String!
  ) {
    downvoteNewsItem(
      newsItemId: $newsItemId
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


export const UNVOTE_NEWS_ITEM = gql`
  mutation(
    $newsItemId: String!
  ) {
    unvoteNewsItem(
      newsItemId: $newsItemId
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


