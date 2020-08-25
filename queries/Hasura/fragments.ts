
import gql from 'graphql-tag';


export const ImagesFragment = gql`
  fragment ImagesFragment on image_parents {
    id
    createdAt
    originalVariantId
    tags
    description
    original {
      id
      parentId
      mimeType
      widthInPixels
      heightInPixels
      sizeInBytes
      url
    }
    variants {
      id
      parentId
      mimeType
      widthInPixels
      heightInPixels
      sizeInBytes
      url
    }
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
        ...ImagesFragment
      }
    }
  }
  ${ImagesFragment}
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
      ...ImagesFragment
    }
    profile {
      ...ImagesFragment
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
  ${ImagesFragment}
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
        ...ImagesFragment
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
        ...ImagesFragment
      }
    }
    productId
    product {
      ...ProductsFragment
    }

  }
  ${ProductsFragment}
  ${ImagesFragment}
`;


export const OrderOrderSnapshotsFragment = gql`
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
        ...ImagesFragment
      }
    }
    orderSnapshots(
      where: $whereOrderSnapshots
    ) {
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
        ...ImagesFragment
      }
    }
    productId
    product {
      ...ProductsFragment
    }

  }
  ${ProductsFragment}
  ${ImagesFragment}
`;