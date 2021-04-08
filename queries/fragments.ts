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


export const ProductFileFragment = gql`
  fragment ProductFileFragment on product_files {
    id
    fileName
    createdAt
    mimeType
    sizeInBytes
  }
`;


export const DealerFragment = gql`
  fragment DealerFragment on Dealer {
    id
    name
    address
    state
    postCode
    licenseNumber
    city
    createdAt
    user {
      id
      licenseId
      license {
        id
        licenseNumber
        licenseExpiry
        licenseState
        licenseCategory
        verified
      }
      ...on UserPrivate {
        firstName
        lastName
        email
        userRole
        phoneNumberId
        phoneNumber {
          id
          countryCode
          number
          areaCode
        }
      }
    }
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
    magazineCapacity
    barrelLength
    dealer {
      id
      name
      address
      city
      state
      postCode
      licenseNumber
      createdAt
      user {
        id
        firstName
        lastName
        email
        userRole
        licenseId
        phoneNumberId
        phoneNumber {
          countryCode
          number
        }
      }
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


export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    createdAt
    updatedAt
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
          ...UserLicenseFragment
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
  ${UserLicenseFragment}
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
      ...UserLicenseFragment
    }
  }
  ${StoresFragment}
  ${UserLicenseFragment}
`;



export const BidFragment = gql`
  fragment BidFragment on Bid {
    id
    productId
    productSnapshotId
    variantId
    offerPrice
    acceptedPrice
    orderId
    bidStatus
    createdAt
    updatedAt
  }
`;

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    chatRoomId
    createdAt
    sender {
      id
      ...on UserPrivate {
        firstName
        lastName
        email
      }
      license {
        ...UserLicenseFragment
      }
    }
    content
    # previewItem {
    #   id
    # }
    bid {
      ...BidFragment
    }
  }
  ${UserLicenseFragment}
  ${BidFragment}
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
    form10File {
      ...ProductFileFragment
    }
  }
  ${ImageFragment}
  ${ProductFileFragment}
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
      # Only viewable by dealers
      ...on UserForDealers {
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
      userId
      user {
        id
        ...on UserPublic {
          license {
            ...UserLicenseFragment
          }
        }
        # Only viewable by dealers
        ...on UserForDealers {
          firstName
          lastName
          email
          license {
            ...UserLicenseFragment
          }
          phoneNumber {
            id
            areaCode
            countryCode
            number
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
      category {
        id
        name
        slug
        categoryGroup
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
    ...on OrderDealer {
      paymentIntent {
        id
        amount
        # amountCapturable
        # amountReceived
        # captureMethod
        createdAt
        currency
        liveMode
        status
      }
    }
    #### Stripe rate limits us if we spam them
    # ...on OrderAdmin {
    #   paymentIntent {
    #     id
    #     amount
    #     amountCapturable
    #     amountReceived
    #     captureMethod
    #     createdAt
    #     currency
    #     liveMode
    #     status
    #   }
    # }
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
