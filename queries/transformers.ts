// Graphql Hasura
import gql from 'graphql-tag';
import {
  Connection,
  ProductsConnection,
  Product,
  ProductVariant,
  ProductPreviewItem,
  ProductsBoolExp,
  ProductsOrderBy,
  Order,
  OrdersConnection,
  OrderBy,
  Image,
  ImageVariant,
  StorePrivate,
  UserPrivate,
  Role,
  OrderSnapshot,
} from "typings/gqlTypes";
import {
  Product_Preview_Items,
  Products,
  Product_Variants,
  Image_Parents,
  Image_Variants,
  Stores,
  Users,
  Orders,
} from "typings/gqlTypes";


interface ProductsAggregateField {
  count: number
  min?: Products | Product;
  max?: Products | Product;
}

export const convertHasuraProduct = (p: Products): Product => {

  let variants = p.product_variants.map(v => convertHasuraProductVariant(v))
  let featuredVariant = variants.find(v => v.isDefault);
  // console.log("featuredVariant.previewItems", featuredVariant.previewItems)
  let product = {
    ...p.currentSnapshot,
    ...p,
    currentSnapshot: null,
    title: p.currentSnapshot.title,
    id: p.id, // override currentSnapshot.id
    createdAt: p.createdAt, // override currentSnapshot.createdAt
    snapshotId: p.currentSnapshot.id,
    featuredVariant: featuredVariant ? featuredVariant : variants[0],
    chosenVariant: featuredVariant ? featuredVariant : variants[0],
    currentVariants: variants,
  }
  // resolver.ts: category, store
  return product as any
}

export const convertHasuraProductVariant = (p: Product_Variants): ProductVariant => {
  return {
    ...p,
    __typename: "ProductVariant",
    previewItems: p.previewItems.map(p => {
      return {
        ...p,
        id: p.id,
        image: convertHasuraImage(p.image),
        __typename: "ProductPreviewItem"
      }
    })
  }
}

export const formHasuraConnection = (
  products: Products[],
  aggregate: ProductsAggregateField,
  resultsPerPage: number,
): ProductsConnection => {
  if (products && aggregate) {
    return {
      edges: products.map(p => ({ node: convertHasuraProduct(p) })),
      totalCount: aggregate.count,
      pageInfo: {
        isLastPage: false,
        totalPages: Math.ceil(aggregate.count / resultsPerPage)
      },
    }
  } else {
    return {
      edges: [],
      totalCount: 0,
      pageInfo: {
        isLastPage: false,
        totalPages: 0,
      },
    }
  }
}

export const formConnection = (
  products: Product[],
  // aggregate: ProductsAggregateField,
  totalCount?: number,
  resultsPerPage?: number,
): ProductsConnection => {
  if (products) {
    return {
      edges: products.map(p => ({ node: p })),
      totalCount: totalCount ? totalCount : null,
      pageInfo: {
        isLastPage: false,
        totalPages: (totalCount && resultsPerPage)
          ? Math.ceil(totalCount / resultsPerPage)
          : null
      },
    }
  } else {
    return {
      edges: [],
      totalCount: null,
      pageInfo: {
        isLastPage: false,
        totalPages: null,
      },
    }
  }
}


export const convertHasuraImage = (image: Image_Parents): Image => {
  if (!image) {
    return null
  }
  return {
    ...image,
    original: {
      ...image.original,
      url: image.original.url,
      __typename: "ImageVariant",
    },
    variants: image.variants.map(v => {
      return {
        ...v,
        url: v.url,
        __typename: "ImageVariant",
      }
    }),
    __typename: "Image",
  }
}

export const convertHasuraUser = (u: Users): UserPrivate => {
  if (!u || !u.id) {
    return null
  }
  return {
    ...u,
    store: convertHasuraStore(u.store as any),
    userRole: convertHasuraUserRole(u.userRole),
    payoutMethod: {
      ...u.payoutMethod,
      userId: u.id,
      __typename: "PayoutMethod",
    },
    __typename: 'UserPrivate',
  }
}

const convertHasuraUserRole = (r: string): Role => {
  if (r === "PLATFORM_ADMIN") {
    return Role.PLATFORM_ADMIN
  }
  if (r === "USER") {
    return Role.USER
  }
  if (r === "SYSTEM") {
    return Role.SYSTEM
  } else {
    return Role.ANON
  }
}


export type StoreHasuraExtended = Stores & {
  productsForSaleConnection?: Products[]
  dashboardPublishedProductsConnection?: Products[]
  dashboardUnpublishedProductsConnection?: Products[]
}

export const convertHasuraStore = (
  s: StoreHasuraExtended,
  productsForSaleCount?: number,
  publishedProductsCount?: number,
  unpublishedProductsCount?: number,
): StorePrivate => {

  if (!s) {
    return null
  }

  return {
    ...s,
    user: {
      ...s.user,
      __typename: "UserPrivate",
    } as any,
    cover: convertHasuraImage(s.cover),
    profile: convertHasuraImage(s.profile),
    productsForSaleConnection: formConnection(
      s.productsForSaleConnection.map(p => convertHasuraProduct(p)),
      productsForSaleCount,
      10,
    ),
    dashboardPublishedProductsConnection:
      s.dashboardPublishedProductsConnection.map(p => convertHasuraProduct(p)),
    dashboardUnpublishedProductsConnection:
      s.dashboardUnpublishedProductsConnection.map(p => convertHasuraProduct(p)),
    // dashboardPublishedProductsConnection: formConnection(
    //   s.dashboardPublishedProductsConnection.map(p => convertHasuraProduct(p)),
    //   publishedProductsCount,
    //   10
    // ),
    // dashboardUnpublishedProductsConnection: formConnection(
    //   s.dashboardUnpublishedProductsConnection.map(p => convertHasuraProduct(p)),
    //   unpublishedProductsCount,
    //   10
    // ),
    __typename: "StorePrivate",
    analytics: null as any,
  };
}



export const convertHasuraOrder = (
  o: Orders,
): Order => {
  return {
    ...o,
    __typename: "Order",
    bid: (o.bid && o.bid.id)
      ? { ...o.bid, __typename: "Bid" }
      : undefined,
    orderSnapshots: (o.orderSnapshots && o.orderSnapshots.length > 0)
      ? o.orderSnapshots.map(s => {
          // console.log('s.form10Image: ', s.form10Image)
          // console.log('s: ', s)
          // console.log('s.adminApprover: ', s.adminApprover)
          return {
            ...s,
            __typename: "OrderSnapshot",
            orderStatus: s.orderStatus as any,
            form10Image: s.form10Image
              ? convertHasuraImage(s.form10Image)
              : null,
          }
        })
      : [],
    currentSnapshot: {
      ...o.currentSnapshot,
      __typename: "OrderSnapshot",
      orderStatus: o.currentSnapshot.orderStatus as any,
      form10Image: convertHasuraImage(o.currentSnapshot.form10Image),
    },
    product: convertHasuraProduct(o.product)
  }
}

export const formConnectionOrders = (
  orders: Orders[],
  totalCount?: number,
  resultsPerPage?: number,
): OrdersConnection => {
  if (orders) {
    return {
      edges: orders.map(o => ({ node: convertHasuraOrder(o) })),
      totalCount: totalCount ? totalCount : null,
      pageInfo: {
        isLastPage: false,
        totalPages: (totalCount && resultsPerPage)
          ? Math.ceil(totalCount / resultsPerPage)
          : null
      },
    }
  } else {
    return {
      edges: [],
      totalCount: null,
      pageInfo: {
        isLastPage: false,
        totalPages: null,
      },
    }
  }
}














