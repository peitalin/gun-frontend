
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
            "name": "DownloadsConnection"
          },
          {
            "name": "DiscountsConnection"
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
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Edge",
        "possibleTypes": [
          {
            "name": "ProductsEdge"
          },
          {
            "name": "OrdersEdge"
          },
          {
            "name": "DownloadsEdge"
          },
          {
            "name": "DiscountsEdge"
          },
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
        "name": "PageBasedConnection",
        "possibleTypes": [
          {
            "name": "SearchResultsConnection"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PageBasedConnectionEdge",
        "possibleTypes": [
          {
            "name": "SearchResultsEdge"
          },
          {
            "name": "PayoutItemsPagedEdge"
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
        "name": "PageBasedConnectionWithMetrics",
        "possibleTypes": [
          {
            "name": "PayoutItemsPagedConnection"
          }
        ]
      }
    ]
  }
};
      export default result;
    