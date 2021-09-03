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
    $isSuspended: Boolean!
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


// Admin
export const RESCRAPE_EXTERNAL_PRODUCT = gql`
  mutation(
    $sourceSiteId: String!
    $sourceSite: ScraperSourceSite!
  ) {
    rescrapeExternalProduct(
      sourceSiteId: $sourceSiteId
      sourceSite: $sourceSite
    ) {
      id
      link
      title
    }
  }
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



// Admin
export const EDIT_EXTERNAL_PRODUCT = gql`
  mutation(
    $externalProductId: String!
    $externalProductCreateInput: ExternalProductCreateInput!
  ) {
    editExternalProduct(
      externalProductId: $externalProductId
      externalProductCreateInput: $externalProductCreateInput
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;


// Admin
export const SET_NEWS_ITEM_CATEGORY = gql`
  mutation(
    $newsItemId: String!
    $categoryId: String!
  ) {
    setNewsItemCategory(
      newsItemId: $newsItemId
      categoryId: $categoryId
    ) {
      ...NewsItemFragment
    }
  }
  ${NewsItemFragment}
`;