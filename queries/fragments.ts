import gql from "graphql-tag";


export const ImageFragment = gql`
  fragment ImageFragment on Image {
    id
    original {
      id
      url
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


export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariant {
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
    createdAt
    updatedAt
    tags
    isPublished
    isSuspended
    isDeleted
    isExcludedFromRecommendations

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


// export const OrderFragment = gql`
//   fragment OrderFragment on Order {
//     id
//     createdAt
//     updatedAt
//     userId
//     items {
//       id
//       orderId
//       orderStatus
//       createdAt
//       updatedAt
//       priceDetails {
//         ...PriceDetailsFragment
//       }
//       product {
//         id
//         name
//         tagline
//         store {
//           id
//           name
//           website
//         }
//         chosenVariant {
//           ...ProductVariantFragment
//         }
//       }
//       quantity
//     }
//     currentSnapshot {
//       transaction {
//         id
//         createdAt
//         subtotal
//         paymentProcessingFee
//         taxes
//         paymentProcessor
//         customerId
//         currency
//         paymentMethodId
//         paymentIntentId
//         chargeId
//       }
//       id
//       orderStatus
//       subtotal
//       automaticSavings
//       promoCodeSavings
//       paymentProcessingFee
//       taxes
//       total
//       paymentProcessor
//     }
//     attachedPromoCodes {
//       ...DiscountFragment
//     }
//   }
//   ${PriceDetailsFragment}
//   ${ProductVariantFragment}
//   ${DiscountFragment}
// `;

// export const ProductSalesFragment = gql`
//   fragment ProductSalesFragment on ProductSale {
//     orderItem {
//       id
//       orderId
//       product {
//         id
//         name
//         tagline
//         chosenVariant {
//           variantId
//           variantSnapshotId
//           variantName
//           variantDescription
//         }
//       }
//       orderStatus
//       createdAt
//       priceDetails {
//         ...PriceDetailsFragment
//       }
//     }
//     user {
//       firstName
//       lastName
//       email
//     }
//   }
//   ${PriceDetailsFragment}
// `;

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
    productsForSaleConnection {
      id
      serialNumber
      title
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
    cover {
      ...ImageFragment
    }
    profile {
      ...ImageFragment
    }
    productsForSaleConnection {
      id
      serialNumber
      title
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
    # promoCodeDiscounts(query: { count: 20 }) {
    #   edges {
    #     node {
    #       ...DiscountFragment
    #     }
    #   }
    # }
  }
  ${ImageFragment}
`;
  // ${DiscountFragment}

export const PaymentMethodFragment = gql`
  fragment PaymentMethodFragment on PaymentMethod {
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
    # cart {
    #   ...CartFragment
    # }
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
// ${CartFragment}
// ${OrderFragment}
// ${PaymentMethodFragment}
