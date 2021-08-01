import gql from "graphql-tag";

import {
  ImageFragment
} from "./fragments";
import { enableExperimentalFragmentVariables } from 'graphql-tag'
enableExperimentalFragmentVariables()




export const ExternalProductSnapshotsFragment = gql`
  fragment ExternalProductSnapshotsFragment on external_product_snapshots {
    id
    externalProductId
    createdAt
    caliber
    make
    model
    price
    advertised
    action
    condition
    serialNumber
    phoneNumber
    licenseNumber
    transferringDealer
    description
    adType
    state
    soldText
    isSold
    previewItems {
      id
      imageId
      position
      youTubeEmbedLink
      variantSnapshotId
      image {
        ...ImageFragment
      }
    }
  }
  ${ImageFragment}
`;


export const ExternalProductsFragment = gql`
  fragment ExternalProductsFragment on external_products {
    id
    createdAt
    updatedAt
    sourceSite
    sourceSiteUrl
    sourceSiteId
    currentExternalProductSnapshotId
    currentExternalProductSnapshot {
      ...ExternalProductSnapshotsFragment
    }
  }
  ${ExternalProductSnapshotsFragment}
`;


export const NewsItemFragment = gql`
  fragment NewsItemFragment on NewsItem {
    id
    createdAt
    updatedAt
    productId
    product {
      id
    }
    externalProductId
    externalProduct {
      ...ExternalProductsFragment
    }
    sourceSite
    isSuspended
    isDeleted
    score
    rankScore # returns null for real-time subscriptions
    # returns a Float value from searchIndex when ranking by "hot"
    yourVote {
      id
      score
      userId
      newsItemId
    }
    # votes {
    #   id
    #   score
    #   userId
    #   newsItemId
    # }
  }
  ${ExternalProductsFragment}
`;



export const SUBSCRIBE_NEWS_ITEMS_SORT_BY_NEW = gql`
  subscription {
    newsItemsSortByNewConnection {
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

