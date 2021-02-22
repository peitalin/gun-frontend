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


export const ProductDetailsFragment = gql`
  fragment ProductDetailsFragment on products {
    id
    createdAt
    updatedAt
    currentSnapshotId
    categoryId
    isPublished
    isSuspended
    isDeleted
    isExcludedFromSearch
    isExcludedFromRecommendations
    soldOutStatus
    storeId
    store {
      id
      createdAt
      name
      website
      user {
        id
        email
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
    dealer {
      id
      name
      address
      state
      postCode
      licenseNumber
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


export const ProductsFragment = gql`
  fragment ProductsFragment on products {
    ...ProductDetailsFragment
    currentSnapshotId
    currentSnapshot {
      ...ProductSnapshotsFragment
    }
    featuredVariant: productVariants(
      limit: 1
      where: { isDefault: {_eq: true }}
      order_by: { createdAt: desc }
    ) {
      ...ProductVariantsFragment
    }
    # productVariants(
    #   where: {productId: {_in: $productIds }}
    # ) {
    #   ...ProductVariantsFragment
    # }
  }
  ${ProductDetailsFragment}
  ${ProductSnapshotsFragment}
  ${ProductVariantsFragment}
`;


export const StoresFragment = gql`
  fragment StoresFragment on stores {
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

    productsForSaleConnection: products(
      where: {
        isPublished: {_eq: true },
        isDeleted: {_eq: false },
        isSuspended: {_eq: false}
      }
    ) {
      ...ProductsFragment
    }

    dashboardPublishedProductsConnection: products(
      where: {
        isPublished: {_eq: true }
      }
    ) {
      ...ProductsFragment
    }

    dashboardUnpublishedProductsConnection: products(
      where: {
        isPublished: {_eq: false }
      }
    ) {
      ...ProductsFragment
    }
  }
  ${ImageFragment}
  ${ProductsFragment}
`;


export const UsersFragment = gql`
  fragment UsersFragment on users {
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
    payoutSplitId
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


export const OrdersFragment = gql`
  fragment OrdersFragment on orders {
    id
    createdAt
    updatedAt
    bidId
    bid {
      id
      bidStatus
      createdAt
      updatedAt
      acceptedPrice
      offerPrice
    }
    total
    currency
    buyerId
    buyer {
      id
      firstName
      lastName
      email
    }
    sellerId
    seller {
      id
      name
      website
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
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
    currentSnapshot {
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
      dealerApproverId
      dealerApprover {
        id
        firstName
        lastName
        email
      }
      form10Image {
        ...ImageFragment
      }
      transaction {
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
      }
    }
    orderSnapshots {
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
      dealerApproverId
      dealerApprover {
        id
        firstName
        lastName
        email
      }
      form10Image {
        ...ImageFragment
      }
    }
    productId
    product {
      ...ProductsFragment
    }
    payoutItems {
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
    paymentIntentId
  }
  ${ProductsFragment}
  ${ImageFragment}
`;


export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on product_variants {
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
      image {
        ...ImageFragment
      }
      youTubeEmbedLink
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
      ...ProductVariantFragment
    }
    store {
      id
      name
      user {
        license {
          id
          licenseNumber
          licenseCategory
          licenseExpiry
          licenseState
          # verified
        }
      }
    }
    category {
      id
      name
      categoryGroup
    }
  }
  ${ProductVariantFragment}
  ${ProductSnapshotsFragment}
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
    # dashboardPublishedProductsConnection {
    #   edges {
    #     node {
    #       ...ProductFragment
    #     }
    #   }
    #   totalCount
    #   pageInfo {
    #     isLastPage
    #     endCursor
    #   }
    # }
    # dashboardUnpublishedProductsConnection {
    #   edges {
    #     node {
    #       ...ProductFragment
    #     }
    #   }
    #   totalCount
    #   pageInfo {
    #     isLastPage
    #     endCursor
    #   }
    # }
    # productsForSaleConnection {
    #   edges {
    #     node {
    #       ...ProductFragment
    #     }
    #   }
    #   totalCount
    #   pageInfo {
    #     isLastPage
    #     endCursor
    #   }
    # }
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
    store {
      ...StorePrivateFragment
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

export const RefundFragment = gql`
  fragment RefundFragment on refunds {
    id
    transactionId
    orderId
    createdAt
    reason
    reasonDetails
    receiptNumber
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
      ...RefundFragment
    }
  }
  ${RefundFragment}
`;
