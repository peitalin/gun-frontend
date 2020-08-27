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
    storeId
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
    boreDiameter
    serialNumber
    location
    dealer
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
    isSoldOut
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
    productVariants {
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
    stripeCustomerId
    sellerReferredById
    payoutMethod {
      id
      payeeId
      payoutType
      payoutEmail
      payoutProcessor
      payoutProcessorId
      createdAt
      updatedAt
    }
    payoutMethodId
    payoutSplitId
    isDeleted
    isSuspended
    lastSeen
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
      firstName
      lastName
      email
    }
    currentSnapshot {
      id
      orderStatus
      createdAt
      adminApprover {
        id
        firstName
        lastName
        email
      }
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
    orderSnapshots {
      id
      orderStatus
      createdAt
      adminApprover {
        id
        firstName
        lastName
        email
      }
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
    isSoldOut
  }
  ${ImageFragment}
`;

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    updatedAt
    tags
    isPublished
    isSuspended
    isDeleted
    isExcludedFromRecommendations

    currentSnapshot {
      title
      createdAt
      description
      condition
      make
      model
      ammoType
      actionType
      boreDiameter
      serialNumber
      location
      dealer
    }

    currentVariants {
      ...ProductVariantFragment
    }
    featuredVariant {
      ...ProductVariantFragment
    }
    chosenVariant {
      ...ProductVariantFragment
    }
    store {
      id
      name
    }
    category {
      id
      name
      categoryGroup
    }
  }
  ${ProductVariantFragment}
`;


export const StorePublicFragment = gql`
  fragment StorePublicFragment on Store {
    id
    createdAt
    updatedAt
    name
    bio
    website
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
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
  // ${ProductFragment}

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
    # address {
    #   line1
    #   line2
    #   city
    #   state
    #   postalCode
    #   country
    #   town
    # }
  }
`;

export const UserPrivateFragment = gql`
  fragment UserPrivateFragment on UserPrivate {
    id
    firstName
    lastName
    email
    stripeCustomerId
    emailVerified
    userRole
    isSuspended
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
      payoutEmail
      payoutProcessor
      payoutProcessorId
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
