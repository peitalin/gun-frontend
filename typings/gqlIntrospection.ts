
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
        "name": "Connection",
        "possibleTypes": [
          {
            "name": "CuratedListItemsConnection"
          },
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
            "name": "FollowingStoresConnection"
          },
          {
            "name": "WishlistItemsConnection"
          },
          {
            "name": "ProductsSoldPeriodSummaryConnection"
          },
          {
            "name": "StoreSalesInPeriodConnection"
          },
          {
            "name": "TransactionsConnection"
          },
          {
            "name": "CuratedListsConnection"
          },
          {
            "name": "StoresConnection"
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
            "name": "CuratedListItemsEdge"
          },
          {
            "name": "ProductSalesEdge"
          },
          {
            "name": "FollowingStoresEdge"
          },
          {
            "name": "PayoutEdge"
          },
          {
            "name": "WishlistItemsEdge"
          },
          {
            "name": "ProductsSoldPeriodSummaryEdge"
          },
          {
            "name": "PayoutItemsEdge"
          },
          {
            "name": "StoreSalesEdge"
          },
          {
            "name": "TransactionsEdge"
          },
          {
            "name": "CuratedListsEdge"
          },
          {
            "name": "StoresEdge"
          },
          {
            "name": "DownloadsEdge"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Product",
        "possibleTypes": [
          {
            "name": "ProductPrivate"
          },
          {
            "name": "ProductPublic"
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
        "name": "User",
        "possibleTypes": [
          {
            "name": "UserWithRole"
          },
          {
            "name": "UserPublic"
          },
          {
            "name": "UserPrivate"
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
        "kind": "INTERFACE",
        "name": "PageBasedConnection",
        "possibleTypes": [
          {
            "name": "SearchResultsConnection"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "SearchResultItem",
        "possibleTypes": [
          {
            "name": "ProductPrivate"
          },
          {
            "name": "ProductPublic"
          }
        ]
      }
    ]
  }
};
      export default result;
    