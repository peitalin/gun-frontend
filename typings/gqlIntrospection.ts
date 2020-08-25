
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "User",
        "possibleTypes": [
          {
            "name": "UserPrivate"
          },
          {
            "name": "UserPublic"
          },
          {
            "name": "UserWithRole"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Product",
        "possibleTypes": [
          {
            "name": "ProductPublic"
          },
          {
            "name": "ProductPrivate"
          },
          {
            "name": "ProductDownload"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Store",
        "possibleTypes": [
          {
            "name": "StorePrivate"
          },
          {
            "name": "StorePublic"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Connection",
        "possibleTypes": [
          {
            "name": "ProductsConnection"
          },
          {
            "name": "OrdersConnection"
          },
          {
            "name": "StoreSalesHistoryConnection"
          },
          {
            "name": "ProductsSoldPeriodSummaryConnection"
          },
          {
            "name": "WishlistItemsConnection"
          },
          {
            "name": "FollowingStoresConnection"
          },
          {
            "name": "StoresConnection"
          },
          {
            "name": "TransactionsConnection"
          },
          {
            "name": "StoreSalesInPeriodConnection"
          },
          {
            "name": "CuratedListsConnection"
          },
          {
            "name": "CuratedListItemsConnection"
          },
          {
            "name": "DownloadsConnection"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Edge",
        "possibleTypes": [
          {
            "name": "ProductSalesEdge"
          },
          {
            "name": "PayoutEdge"
          },
          {
            "name": "ProductsSoldPeriodSummaryEdge"
          },
          {
            "name": "WishlistItemsEdge"
          },
          {
            "name": "FollowingStoresEdge"
          },
          {
            "name": "StoresEdge"
          },
          {
            "name": "PayoutItemsEdge"
          },
          {
            "name": "TransactionsEdge"
          },
          {
            "name": "StoreSalesEdge"
          },
          {
            "name": "CuratedListsEdge"
          },
          {
            "name": "CuratedListItemsEdge"
          },
          {
            "name": "DownloadsEdge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ConnectionWithMetrics",
        "possibleTypes": [
          {
            "name": "PayoutsConnection"
          },
          {
            "name": "PayoutItemsConnection"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PageBasedConnectionWithMetrics",
        "possibleTypes": [
          {
            "name": "PayoutItemsPagedConnection"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PageBasedConnectionEdge",
        "possibleTypes": [
          {
            "name": "PayoutItemsPagedEdge"
          },
          {
            "name": "SearchResultsEdge"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResultItem",
        "possibleTypes": [
          {
            "name": "ProductPublic"
          },
          {
            "name": "ProductPrivate"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PageBasedConnection",
        "possibleTypes": [
          {
            "name": "SearchResultsConnection"
          }
        ]
      }
    ]
  }
};
      export default result;
    