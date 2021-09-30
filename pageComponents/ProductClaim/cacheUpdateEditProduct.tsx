
import {
  ProductsConnection,
  ProductsEdge,
  Product,
  ConnectionQuery,
} from "typings/gqlTypes";
import { ApolloCache, DocumentNode } from "@apollo/client";
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
import {
  initialDashboardVariables
} from "pageComponents/SellerDashboard/PublishedProductsList";


export const cacheUpdateDashboardProduct = <T extends {}>({
  cache,
  product,
}: {
  cache: ApolloCache<T>,
  product: Product,
}) => {

    // console.log("incomingProduct.id: ", editProduct?.product?.id)
    // console.log("incomingProduct.isPublished: ", editProduct?.product?.isPublished)

    // Fetch the cached dashboardProductsConnection item with associated variables
    // remember, variables need to match, or cache will not return the data
    const existingData: {
      dashboardProductsConnection: ProductsConnection
    } = cache.readQuery({
      query: DASHBOARD_PRODUCTS_CONNECTION,
      variables: initialDashboardVariables,
    });

    console.log("existingData: ", existingData)

    if (existingData?.dashboardProductsConnection) {
      let newEdges = existingData?.dashboardProductsConnection.edges.map(edge => {
        if (product.id !== edge.node.id) {
          return edge
        } else {
          console.log(`found product ${edge.node.id}!, replacing`)
          return {
            __typename: "ProductsEdge",
            node: {
              __typename: "ProductPrivate",
              ...product,
            },
          } as ProductsEdge
        }
      })

      // cache.evict({
      //   id: "ROOT_QUERY",
      //   fieldName: "dashboardProductsConnection"
      // })

      cache.writeQuery({
        query: DASHBOARD_PRODUCTS_CONNECTION,
        variables: initialDashboardVariables,
        data: {
          dashboardProductsConnection: {
            ...existingData.dashboardProductsConnection,
            edges: newEdges
          }
        },
      });

    }

}



export const cacheUpdateDeleteProduct = <T extends {}>({
  cache,
  deletedProductId, // product being deleted
}: {
  cache: ApolloCache<T>,
  deletedProductId: string,
}) => {

    // console.log("incomingProduct.id: ", editProduct?.product?.id)
    // console.log("incomingProduct.isPublished: ", editProduct?.product?.isPublished)

    // Fetch the cached dashboardProductsConnection item with associated variables
    // remember, variables need to match, or cache will not return the data
    const existingData: {
      dashboardProductsConnection: ProductsConnection
    } = cache.readQuery({
      query: DASHBOARD_PRODUCTS_CONNECTION,
      variables: initialDashboardVariables,
    });

    cache.writeQuery({
      query: DASHBOARD_PRODUCTS_CONNECTION,
      variables: initialDashboardVariables,
      data: {
        dashboardProductsConnection: {
          ...existingData.dashboardProductsConnection,
          edges: existingData.dashboardProductsConnection.edges?.filter(
            edge => edge.node.id !== deletedProductId
          ),
        }
      },
    });

    console.log("cache AFTER: ", cache)
}

