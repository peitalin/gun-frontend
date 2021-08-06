import gql from "graphql-tag";

import {
  ImageFragment
} from "./fragments";
import {
  ExternalProductSnapshotsFragment,
  ExternalProductsFragment,
  NewsItemFragment,
} from "./fragments";
import { enableExperimentalFragmentVariables } from 'graphql-tag'
enableExperimentalFragmentVariables()


// Admin
export const SUSPEND_UNSUSPEND_NEWS_ITEM = gql`
  mutation(
    $newsItemId: String!
    $isSuspended: String!
  ) {
    suspendUnsuspendNewsItem(
      newsItemId: $newsItemId
      isSuspended: $isSuspended
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;




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


