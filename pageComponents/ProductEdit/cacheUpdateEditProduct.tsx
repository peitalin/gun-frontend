
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


export const cacheUpdateEditProduct = <T extends {}>({
  cache,
  editProduct,
}: {
  cache: ApolloCache<T>,
  editProduct: { product: Product },
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

    let newEdges = existingData.dashboardProductsConnection.edges.map(edge => {
      if (editProduct.product.id !== edge.node.id) {
        return edge
      } else {
        console.log(`found product ${edge.node.id}!, replacing`)
        return {
          __typename: "ProductsEdge",
          node: {
            __typename: "ProductPrivate",
            ...editProduct.product,
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

    cache.modify({
      fields: {
        dashboardProductsConnection(existingConnection: ProductsConnection) {
          console.log("cache.modify: ", existingConnection)
          return {
            ...existingConnection,
            edges: newEdges
          }
        }
      }
    });
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

}