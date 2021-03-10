import gql from "graphql-tag";


export const ImageFragment = gql`
  fragment ImageFragment on image_parents {
    id
    original {
      id
      mimeType
      heightInPixels
      widthInPixels
      sizeInBytes
      url
    }
    variants {
      id
      mimeType
      sizeInBytes
      widthInPixels
      heightInPixels
      url
    }
    createdAt
    tags
    description
  }
`;




export const ProductSnapshotsFragment = gql`
  fragment ProductSnapshotsFragment on product_snapshots {
    id
    createdAt
    productId
    title
    description
    condition
    make
    model
    ammoType
    actionType
    caliber
    serialNumber
    location
    dealer {
      id
      name
      address
      city
      state
      postCode
      licenseNumber
      createdAt
    }
  }
`;

export const ProductVariantsFragment = gql`
  fragment ProductVariantsFragment on product_variants {
    variantSnapshotId
    variantId
    snapshotId
    productId
    storeId
    createdAt
    variantName
    variantDescription
    isDefault
    position
    price
    priceWas
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


export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    createdAt
    updatedAt
    tags
    isPublished
    isSuspended
    isDeleted
    isExcludedFromRecommendations
    storeId
    soldOutStatus

    currentSnapshot {
      ...ProductSnapshotsFragment
    }

    featuredVariant {
      ...ProductVariantsFragment
    }
    store {
      id
      name
      user {
        id
        license {
          id
          licenseNumber
          licenseCategory
          licenseExpiry
          licenseState
          verified
        }
      }
    }
    category {
      id
      name
      slug
      categoryGroup
    }
  }
  ${ProductVariantsFragment}
  ${ProductSnapshotsFragment}
`;



export const StoresFragment = gql`
  fragment StoresFragment on Store {
    id
    createdAt
    name
    bio
    website
    user {
      ... on UserPublic {
        id
      }
    }
    coverId
    profileId
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`;


export const UsersFragment = gql`
  fragment UsersFragment on UserPrivate {
    store {
      ...StoresFragment
    }
    id
    email
    username
    userRole
    createdAt
    updatedAt
    firstName
    lastName
    emailVerified
    storeId
    payoutMethod {
      id
      storeId
      createdAt
      updatedAt
      payoutType
      bsb
      accountNumber
      accountName
    }
    payoutMethodId
    isDeleted
    isSuspended
    lastSeen
    licenseId
    license {
      id
      licenseNumber
      licenseExpiry
      licenseCategory
      licenseState
      verified
    }
  }
  ${StoresFragment}
`;



export const UserLicenseFragment = gql`
  fragment UserLicenseFragment on user_licenses {
    id
    licenseNumber
    licenseCategory
    licenseExpiry
    licenseState
    verified
  }
`;

export const BidFragment = gql`
  fragment BidFragment on bids {
    id
    bidStatus
    createdAt
    updatedAt
    acceptedPrice
    offerPrice
  }
`;

export const TransactionFragment = gql`
  fragment TransactionFragment on transactions {
    id
    total
    createdAt
    currency
    receiptNumber
    customerId
    orderId
    paymentProcessor
    paymentMethodId
    paymentIntentId
    refundId
    refund {
      id
      transactionId
      orderId
      createdAt
      reason
      reasonDetails
      receiptNumber
    }
  }
`;

export const PayoutItemFragment = gql`
  fragment PayoutItemFragment on payout_items {
    id
    storeId
    payeeType
    amount
    paymentProcessingFee
    createdAt
    payoutStatus
    currency
    orderId
    txnId
    payoutId
    taxes
  }
`;

export const OrderSnapshotFragment = gql`
  fragment OrderSnapshotFragment on OrderSnapshot {
    id
    orderStatus
    createdAt
    adminApproverId
    adminApprover {
      id
      firstName
      lastName
      email
    }
    form10Image {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`;


export const OrdersFragment = gql`
  fragment OrdersFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    bid {
      ...BidFragment
    }
    total
    currency
    buyerId
    buyer {
      id
      license {
        ...UserLicenseFragment
      }
      # Only viewable by admin or if user is the buyer
      ...on UserPrivate {
        firstName
        lastName
        email
        phoneNumber {
          id
          areaCode
          countryCode
          number
        }
      }
    }
    sellerStoreId
    sellerStore {
      id
      name
      website
      createdAt
      updatedAt
      user {
        id
        ...on UserPublic {
          license {
            ...UserLicenseFragment
          }
        }
        # Only viewable by admin or if user is the seller
        ...on UserPrivate {
          firstName
          lastName
          email
          license {
            ...UserLicenseFragment
          }
          payoutMethod {
            id
            createdAt
            updatedAt
            payoutType
            bsb
            accountNumber
            accountName
          }
          phoneNumber {
            id
            areaCode
            countryCode
            number
          }
        }
      }
    }
    currentSnapshot {
      ...OrderSnapshotFragment
      transaction {
        ...TransactionFragment
      }
    }
    orderSnapshots {
      ...OrderSnapshotFragment
    }
    productId
    product {
      id
      createdAt
      updatedAt
      tags
      isPublished
      isSuspended
      isDeleted
      isExcludedFromRecommendations
      storeId
      soldOutStatus
      currentSnapshot {
        ...ProductSnapshotsFragment
      }
      featuredVariant {
        ...ProductVariantsFragment
      }
      store {
        id
        name
        userId
        user {
          id
        }
      }
    }
    payoutItems {
      ...PayoutItemFragment
    }
    paymentIntentId
    ...on OrderAdmin {
      paymentIntent
    }
  }
  ${OrderSnapshotFragment}
  ${ImageFragment}
  ${PayoutItemFragment}
  ${TransactionFragment}
  ${UserLicenseFragment}
  ${BidFragment}
  ${ProductSnapshotsFragment}
  ${ProductVariantsFragment}
`;






export const StorePublicFragment = gql`
  fragment StorePublicFragment on Store {
    id
    createdAt
    updatedAt
    name
    bio
    website
    userId
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
    productsForSaleConnection {
      edges {
        node {
          ...ProductFragment
        }
      }
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
`;


export const StorePrivateFragment = gql`
  fragment StorePrivateFragment on StorePrivate {
    id
    name
    createdAt
    updatedAt
    website
    bio
    coverId
    profileId
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`;

export const PaymentMethodFragment = gql`
  fragment PaymentMethodFragment on payment_methods {
    id
    userId
    createdAt
    updatedAt
    customerId
    paymentProcessor
    paymentMethodTypes
    last4
    expMonth
    expYear
    email
    name
    details
  }
`;

export const UserPrivateFragment = gql`
  fragment UserPrivateFragment on UserPrivate {
    id
    firstName
    lastName
    email
    emailVerified
    userRole
    isSuspended
    license {
      id
      licenseNumber
      licenseCategory
      licenseExpiry
      licenseState
      verified
    }
    phoneNumber {
      id
      areaCode
      countryCode
      number
    }
    storeId
    store {
      ...StorePrivateFragment
    }
    dealerId
    dealer {
      id
      name
      address
      state
      city
      postCode
      licenseNumber
      createdAt
    }
    # orderHistoryConnection {
    #   totalCount
    #   edges {
    #     node {
    #       ...OrderFragment
    #     }
    #   }
    # }
    # paymentMethods {
    #   ...on PaymentMethod {
    #     ...PaymentMethodFragment
    #   }
    # }
    # defaultPaymentMethod {
    #   ...on PaymentMethod {
    #     ...PaymentMethodFragment
    #   }
    # }
    payoutMethod {
      id
      payoutType
      bsb
      accountNumber
      accountName
    }
    # wishlistItemsConnection(query: {}) {
    #   edges {
    #     node {
    #       addedAt
    #       product {
    #         ...ProductFragment
    #       }
    #     }
    #   }
    # }
  }
  ${StorePrivateFragment}
`;
// # ${ProductFragment}
// ${OrderFragment}
// ${PaymentMethodFragment}
