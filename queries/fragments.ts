import gql from "graphql-tag";

export const StockLevelFragment = gql`
  fragment StockLevelFragment on StockLevel {
    quantityAvailable
    restockedAt
    quantityRestocked
  }
`;

export const StockLimitConditionFragment = gql`
  fragment StockLimitConditionFragment on DiscountStockLimitCondition {
    stockLevel {
      ...StockLevelFragment
    }
    supplyExhaustionRule
  }
  ${StockLevelFragment}
`;

export const TimeConditionFragment = gql`
  fragment TimeConditionFragment on DiscountTimeCondition {
    start
    end
    timeExpiryRule
  }
`;

export const DiscountFragment = gql`
  fragment DiscountFragment on Discount {
    id
    createdAt
    scope
    modifier
    isAutomatic
    promoCode
    valueFixed
    valueDollarsOff
    valuePercentageOff
    isDisabled
    timeCondition {
      ...TimeConditionFragment
    }
    productScopeInfo {
      variantSnapshotId
      stockLimitCondition {
        ...StockLimitConditionFragment
      }
    }
    storeScopeInfo {
      storeId
      productId
      variantId
      minimumSpend
      minimumQuantity
    }
    platformScopeInfo {
      isApplicableToAnyProduct
    }
  }
  ${StockLimitConditionFragment}
  ${TimeConditionFragment}
`;

export const PriceDetailsFragment = gql`
  fragment PriceDetailsFragment on PriceDetails {
    basePrice
    actualPrice
    discountBreakdown {
      fixedPriceDiscount {
        ...DiscountFragment
      }
      dollarsOffDiscounts {
        ...DiscountFragment
      }
      percentOffDiscount {
        ...DiscountFragment
      }
      fixedPriceComponent
      dollarsOffComponent
      percentOffComponent
      promoCodeComponent
    }
  }
  ${DiscountFragment}
`;

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
    }
    variants {
      id
      mimeType
      sizeInBytes
      widthInPixels
      heightInPixels
    }
    createdAt
    tags
    description
  }
`;

export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariant {
    variantId
    variantSnapshotId
    createdAt
    variantName
    variantDescription
    isDefault
    price
    priceWas
    priceDetails {
      ...PriceDetailsFragment
    }
    relevantDiscounts {
      ...DiscountFragment
    }
    files {
      id
      fileName
      createdAt
      mimeType
      sizeInBytes
    }
    previewItems {
      id
      image {
        ...ImageFragment
      }
      youTubeEmbedLink
    }
    isSoldOut
    baseStockLevel {
      ...StockLevelFragment
    }
    currentStockLevel {
      ...StockLevelFragment
    }
    specialDeal {
      discountedPrice
      timeCondition {
        ...TimeConditionFragment
      }
      stockLimitCondition {
        ...StockLimitConditionFragment
      }
    }
  }
  ${ImageFragment}
  ${PriceDetailsFragment}
  ${DiscountFragment}
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
    isExcludedFromAutomaticLists
    name
    tagline
    description
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
    variantsLabel
    isQuantityEnabled
    quantityLabel
  }
  ${ProductVariantFragment}
`;

export const CartFragment = gql`
  fragment CartFragment on Cart {
    id
    userId
    updatedAt
    items {
      id
      createdAt
      cartId
      storeId
      priceDetails {
        ...PriceDetailsFragment
      }
      product {
        ...ProductFragment
      }
      purchasableStatus
      quantity
    }
    relevantPromoCodes {
      ...DiscountFragment
    }
    subtotal
    automaticSavings
    promoCodeSavings
    taxes
    paymentProcessingFee
    total
  }
  ${ProductFragment}
  ${DiscountFragment}
  ${PriceDetailsFragment}
`;

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
    createdAt
    updatedAt
    userId
    items {
      id
      orderId
      orderStatus
      createdAt
      updatedAt
      priceDetails {
        ...PriceDetailsFragment
      }
      product {
        id
        name
        tagline
        store {
          id
          name
          website
        }
        chosenVariant {
          ...ProductVariantFragment
        }
      }
      quantity
    }
    currentSnapshot {
      transaction {
        id
        createdAt
        subtotal
        paymentProcessingFee
        taxes
        paymentProcessor
        customerId
        currency
        paymentMethodId
        paymentIntentId
        chargeId
      }
      id
      orderStatus
      subtotal
      automaticSavings
      promoCodeSavings
      paymentProcessingFee
      taxes
      total
      paymentProcessor
    }
    attachedPromoCodes {
      ...DiscountFragment
    }
  }
  ${PriceDetailsFragment}
  ${ProductVariantFragment}
  ${DiscountFragment}
`;

export const ProductSalesFragment = gql`
  fragment ProductSalesFragment on ProductSale {
    orderItem {
      id
      orderId
      product {
        id
        name
        tagline
        chosenVariant {
          variantId
          variantSnapshotId
          variantName
          variantDescription
        }
      }
      orderStatus
      createdAt
      priceDetails {
        ...PriceDetailsFragment
      }
    }
    user {
      firstName
      lastName
      email
    }
  }
  ${PriceDetailsFragment}
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
  ${DiscountFragment}
`;

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
    dashboardPublishedProductsConnection {
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
    dashboardUnpublishedProductsConnection {
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
    promoCodeDiscounts(query: { count: 20 }) {
      edges {
        node {
          ...DiscountFragment
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
  ${DiscountFragment}
`;

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
    isSuspended
    firstName
    lastName
    email
    stripeCustomerId
    paypalCustomerId
    emailVerified
    userRole
    # store {
    #   ...StorePrivateFragment
    # }
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
    wishlistItemsConnection(query: {}) {
      edges {
        node {
          addedAt
          product {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${ProductFragment}
`;
// ${StorePrivateFragment}
// ${CartFragment}
// ${OrderFragment}
// ${PaymentMethodFragment}
