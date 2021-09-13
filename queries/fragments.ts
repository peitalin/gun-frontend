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
      defaultLicenseId
      defaultLicense {
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
        defaultLicenseId
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
    userId
    createdAt
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
    isSoldElsewhere
    allowBids
    storeId
    soldOutStatus
    listingType
    currentSnapshot {
      ...ProductSnapshotsFragment
    }

    featuredVariant {
      ...ProductVariantsFragment
    }
    store {
      id
      name
      isSuspended
      userId
      user {
        id
        defaultLicense {
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
    ... on ProductPrivate {
      uniqueProductViews {
        aggregate {
          count
        }
      }
    }
    sellerLicenseId
    sellerLicense {
      ...UserLicenseFragment
    }
  }
  ${UserLicenseFragment}
  ${ProductVariantsFragment}
  ${ProductSnapshotsFragment}
`;

export const ProductLiteFragment = gql`
  fragment ProductLiteFragment on Product {
    id
    createdAt
    updatedAt
    isPublished
    isSuspended
    isDeleted
    isSoldElsewhere
    storeId
    soldOutStatus
    currentSnapshot {
      ...ProductSnapshotsFragment
    }
    featuredVariant {
      ...ProductVariantsFragment
    }
    # store {
    #   id
    #   name
    #   isSuspended
    #   userId
    #   user {
    #     id
    #     defaultLicense {
    #       ...UserLicenseFragment
    #     }
    #   }
    # }
    category {
      id
      name
      slug
      categoryGroup
    }
    # ... on ProductPrivate {
    #   uniqueProductViews {
    #     aggregate {
    #       count
    #     }
    #   }
    # }
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
      id
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
      defaultLicense {
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
    disposalTimeHrs
    approvalTimeHrs
  }
  ${ImageFragment}
  ${ProductFileFragment}
`;


export const OrdersDashboardFragment = gql`
  fragment OrdersDashboardFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    bid {
      ...BidFragment
    }
    total
    internationalFee
    currency
    buyerId
    buyer {
      id
      defaultLicense {
        ...UserLicenseFragment
      }
      # # Only viewable by dealers
      # ...on UserWithMobileNumber {
      #   firstName
      #   lastName
      #   email
      #   phoneNumber {
      #     id
      #     areaCode
      #     countryCode
      #     number
      #   }
      # }
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
    buyerLicense {
      ...UserLicenseFragment
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
          defaultLicense {
            ...UserLicenseFragment
          }
          # orderMetrics {
          #   id
          #   # itemsBought
          #   # totalSpend
          #   itemsSold
          #   totalSales
          #   avgDisposalTimeHrs
          #   # avgApprovalTimeHrs
          # }
        }
        # # Only viewable by dealers
        # ...on UserWithMobileNumber {
        #   firstName
        #   lastName
        #   email
        #   defaultLicense {
        #     ...UserLicenseFragment
        #   }
        #   phoneNumber {
        #     id
        #     areaCode
        #     countryCode
        #     number
        #   }
        # }
        # Only viewable by admin or if user is the seller
        ...on UserPrivate {
          firstName
          lastName
          email
          defaultLicense {
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
      # transaction {
      #   ...TransactionFragment
      # }
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
      isSoldElsewhere
      storeId
      soldOutStatus
      sellerLicenseId
      sellerLicense {
        ...UserLicenseFragment
      }
      currentSnapshot {
        ...ProductSnapshotsFragment
      }
      featuredVariant {
        ...ProductVariantsFragment
      }
      # category {
      #   id
      #   name
      #   slug
      #   categoryGroup
      # }
      # store {
      #   id
      #   name
      #   userId
      #   user {
      #     id
      #   }
      # }
    }
    paymentIntentId
  }
  ${OrderSnapshotFragment}
  ${UserLicenseFragment}
  ${BidFragment}
  ${ProductSnapshotsFragment}
  ${ProductVariantsFragment}
`;
  // ${TransactionFragment}
  // ${PayoutItemFragment}



export const OrdersGovFragment = gql`
  fragment OrdersGovFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    bid {
      ...BidFragment
    }
    total
    internationalFee
    currency
    buyerId
    buyer {
      id
      defaultLicense {
        ...UserLicenseFragment
      }
      # Only viewable by dealers
      ...on UserWithMobileNumber {
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
    buyerLicense {
      ...UserLicenseFragment
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
        # ...on UserPublic {
        #   defaultLicense {
        #     ...UserLicenseFragment
        #   }
        #   # orderMetrics {
        #   #   id
        #   #   # itemsBought
        #   #   # totalSpend
        #   #   itemsSold
        #   #   totalSales
        #   #   avgDisposalTimeHrs
        #   #   # avgApprovalTimeHrs
        #   # }
        # }
        # Only viewable by dealers
        ...on UserWithMobileNumber {
          firstName
          lastName
          email
          defaultLicense {
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
          defaultLicense {
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
      # transaction {
      #   ...TransactionFragment
      # }
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
      isSoldElsewhere
      storeId
      soldOutStatus
      sellerLicenseId
      sellerLicense {
        ...UserLicenseFragment
      }
      currentSnapshot {
        ...ProductSnapshotsFragment
      }
      featuredVariant {
        ...ProductVariantsFragment
      }
    }
    # payoutItems {
    #   ...PayoutItemFragment
    # }
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
  ${UserLicenseFragment}
  ${BidFragment}
`;
  // ${TransactionFragment}
  // ${PayoutItemFragment}
  // ${ProductSnapshotsFragment}
  // ${ProductVariantsFragment}


export const OrdersGovCancelledFragment = gql`
  fragment OrdersGovCancelledFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    total
    internationalFee
    currency
    buyerId
    buyerLicense {
      ...UserLicenseFragment
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
        # Only viewable by dealers
        ...on UserWithMobileNumber {
          firstName
          lastName
          email
          defaultLicense {
            ...UserLicenseFragment
          }
          # phoneNumber {
          #   id
          #   areaCode
          #   countryCode
          #   number
          # }
        }
        # Only viewable by admin or if user is the seller
        ...on UserPrivate {
          firstName
          lastName
          email
          defaultLicense {
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
          # phoneNumber {
          #   id
          #   areaCode
          #   countryCode
          #   number
          # }
        }
      }
    }
    currentSnapshot {
      ...OrderSnapshotFragment
    }
    orderSnapshots {
      ...OrderSnapshotFragment
    }
    productId
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
  ${UserLicenseFragment}
`;
  // ${BidFragment}
  // ${ProductSnapshotsFragment}
  // ${ProductVariantsFragment}


export const StorePublicFragment = gql`
  fragment StorePublicFragment on Store {
    id
    createdAt
    updatedAt
    name
    bio
    website
    userId
    user {
      id
      ...on UserPublic {
        defaultLicense {
          ...UserLicenseFragment
        }
        licenses {
          ...UserLicenseFragment
        }
        orderMetrics {
          id
          # itemsBought
          # totalSpend
          itemsSold
          totalSales
          avgDisposalTimeHrs
          # avgApprovalTimeHrs
        }
      }
      ...on UserWithMobileNumber {
        defaultLicense {
          ...UserLicenseFragment
        }
        licenses {
          ...UserLicenseFragment
        }
        phoneNumber {
          id
          areaCode
          countryCode
          number
        }
        orderMetrics {
          id
          # itemsBought
          # totalSpend
          itemsSold
          totalSales
          avgDisposalTimeHrs
          # avgApprovalTimeHrs
        }
      }
      ...on UserPrivate {
        defaultLicense {
          ...UserLicenseFragment
        }
        licenses {
          ...UserLicenseFragment
        }
        phoneNumber {
          id
          areaCode
          countryCode
          number
        }
        orderMetrics {
          id
          itemsBought
          totalSpend
          itemsSold
          totalSales
          avgDisposalTimeHrs
          avgApprovalTimeHrs
        }
      }
    }
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
    defaultLicenseId
    defaultLicense {
      ...UserLicenseFragment
    }
    licenses {
      ...UserLicenseFragment
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
    # watchListItemsConnection(query: {}) {
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
  ${UserLicenseFragment}
`;
// # ${ProductFragment}
// ${OrderFragment}
// ${PaymentMethodFragment}


export const SavedSearchFragment = gql`
  fragment SavedSearchFragment on saved_searches {
    id
    userId
    searchTerm
    categorySlug
    dealerState
    createdAt
    make
    model
    caliber
    matchesNeeded
  }
`;


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
    categoryId
    category {
      id
      slug
      name
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
      ...ProductFragment
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
  ${ProductFragment}
`;



export const CollectionItemsFragment = gql`
  fragment CollectionItemsFragment on CollectionItem {
    id
    createdAt
    userId
    productId
    product {
      ...ProductFragment
    }
    externalProductId
    externalProduct {
      ...ExternalProductsFragment
    }
  }
  ${ProductFragment}
  ${ExternalProductsFragment}
`;

export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    createdAt
    updatedAt
    name
    private
    userId
    itemsConnection {
      totalCount
      edges {
        node {
          ...CollectionItemsFragment
        }
      }
    }
  }
  ${CollectionItemsFragment}
`;
