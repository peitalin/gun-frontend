import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
  DefaultOptions,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

import * as React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";

// Switches between unfetch & node-fetch for client & server.
import fetch from 'isomorphic-unfetch'
import { DocumentNode } from "graphql"
import https from "https";

// /////////// Environment Variables in .env
const URI = process.env.GATEWAY_GRAPHQL_URL;
const SERVER_URI = process.env.SERVER_GATEWAY_GRAPHQL_URL;
const WS_URI = process.env.GATEWAY_GRAPHQL_WS_URL;
const NODE_ENV = process.env.NODE_ENV;

import {
  NewsItemsConnection,
} from "typings/gqlTypes"

if (process.env.NODE_ENV === "development") {
  console.log("Graphql URI: ", URI)
  console.log("Graphql Websocket URI: ", WS_URI)
  console.log("Graphql SERVER_URI: ", SERVER_URI)
  console.log("NODE_ENV: ", process.env.NODE_ENV)
}



const onErrorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message:
        ${message},
        Location: ${JSON.stringify(locations)},
        Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${JSON.stringify(networkError)}`);
  }
})



const splitQueryOrSubscriptions = ({
  httpLink,
  useWebsockets,
  wsLink,
}: { httpLink: HttpLink, useWebsockets: boolean, wsLink: WebSocketLink }) => {

  if (!useWebsockets) {
    // if server-side (ssr), return normal httpLink
    return httpLink
  }
  // client-side only, errors if you instantiate wsLink on the server.
  // https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024

  // splits requests based on operation type:
  // - subscriptions => websockets
  // - queries/mutations => http
  // https://www.apollographql.com/docs/react/data/subscriptions/
  const isSubscriptionQuery = ({ query }: { query: DocumentNode }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  }

  return split(
    isSubscriptionQuery, // if subscription query, divert to wsLink
    wsLink,
    httpLink
  )
}


const cacheOptions = {
  addTypename: true,
  possibleTypes: {
    User: ["UserPrivate", "UserPublic", "UserWithMobileNumber", "BasicUser"],
    Product: ["ProductPublic", "ProductClassifiedAd", "ProductPrivate"],
    Store: ["StorePublic", "StoreClassifiedAd", "StorePrivate"],
    Order: ["OrderPublic", "OrderDealer", "OrderAdmin"],
  },
  typePolicies: {

    Query: {
      fields: {
        getHotNewsItemsToday: {
          // Don't cache separate results based on any of this field's arguments.
          // keyArgs: false as any, // ignore variables, cache everything under same connection

          keyArgs: ["sortByDate"] as any, // separate HOT and NEW connections when merging connections
          // merge the incoming list items with the existing list items.
          merge(existing: NewsItemsConnection, incoming: NewsItemsConnection) {
            let mergedEdges = [
              ...(existing?.edges ?? []),
              ...(incoming?.edges ?? []),
            ]
            return {
              ...incoming,
              edges: mergedEdges
            }
          },
        },
        getHotNewsItemsYesterday: {
          // keyArgs: false as any, // ignore variables, cache everything under same connection
          keyArgs: ["sortByDate"] as any, // separate HOT and NEW connections when merging connections
          merge(existing: NewsItemsConnection, incoming: NewsItemsConnection) {
            let mergedEdges = [
              ...(existing?.edges ?? []),
              ...(incoming?.edges ?? []),
            ]
            return {
              ...incoming,
              edges: mergedEdges
            }
          },
        },
        getHotNewsItemsThisWeek: {
          // keyArgs: false as any, // ignore variables, cache everything under same connection
          keyArgs: ["sortByDate"] as any, // separate HOT and NEW connections when merging connections
          merge(existing: NewsItemsConnection, incoming: NewsItemsConnection) {
            let mergedEdges = [
              ...(existing?.edges ?? []),
              ...(incoming?.edges ?? []),
            ]
            return {
              ...incoming,
              edges: mergedEdges
            }
          },
        },
        getHotNewsItemsLastWeek: {
          // keyArgs: false as any, // ignore variables, cache everything under same connection
          keyArgs: ["sortByDate"] as any, // separate HOT and NEW connections when merging connections
          merge(existing: NewsItemsConnection, incoming: NewsItemsConnection) {
            let mergedEdges = [
              ...(existing?.edges ?? []),
              ...(incoming?.edges ?? []),
            ]
            return {
              ...incoming,
              edges: mergedEdges
            }
          },
        },
      }
    },

    ProductPrivate: {
      keyFields: ["id"],
      fields: {
        store: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
        featuredVariant: {
          merge: (existing, incoming, opts) => {
            // return opts.mergeObjects(existing, incoming)
            return incoming
          }
        },
        currentVariants: {
          merge: (existing, incoming, opts) => {
            // do not merge variants
            return incoming
          }
        },
      },
    },

    ProductPublic: {
      keyFields: ["id"],
      fields: {
        store: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
        featuredVariant: {
          merge: (existing, incoming, opts) => {
            // return opts.mergeObjects(existing, incoming)
            return incoming
          }
        },
        currentVariants: {
          merge: (existing, incoming, opts) => {
            // do not merge variants
            return incoming
          }
        },
      },
    },

    NewsItem: {
      keyFields: ["id", "rankScore"],
      // rankScore to prevent "hot" and "new" newItems from overridding each other
    },

    // merging cache objects:
    // https://github.com/apollographql/apollo-client/issues/6370
    User: {
      keyFields: ["id"],
      fields: {
        store: {
          merge: (existing, incoming, opts) =>
            opts.mergeObjects(existing, incoming),
        },
      }
    },

    UserPrivate: {
      keyFields: ["id"],
      fields: {
        buyerOrdersConnection: {
          merge: (existing, incoming, opts) =>
            opts.mergeObjects(existing, incoming),
        },
        sellerOrdersConnection: {
          merge: (existing, incoming, opts) =>
            opts.mergeObjects(existing, incoming),
        },
        sellerOrdersActionItemsConnection: {
          merge: (existing, incoming, opts) =>
            opts.mergeObjects(existing, incoming),
        },
        store: {
          merge: (existing, incoming, opts) =>
            opts.mergeObjects(existing, incoming),
        },
      }
    },

    Store: {
      keyFields: ["id"],
      fields: {
        productsForSaleConnection: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
        dashboardProductsConnection: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
      },
    },

    Order: {
      keyFields: ["id"],
      fields: {
        currentSnapshot: {
          merge: (existing, incoming, opts) => {
            return incoming
          }
        }
      }
    },

  }
}

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const wsLinkOptions = {
  uri: WS_URI,
  options: {
    reconnect: true,
    connectionParams: () => ({
      headers: {
        // "x-hasura-admin-secret": "",
        "content-type": "application/json",
      },
    }),
  }
}

const httpLinkOptions = {
  uri: URI ,
  fetch: fetch,
  fetchOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },
  headers: {
    'content-type': 'application/json',
  },
  credentials: 'include',
}


const aClient = new ApolloClient({
  link: ApolloLink.from([
    onErrorHandler,
    splitQueryOrSubscriptions({
      useWebsockets: !!process.browser,
      wsLink: !!process.browser
        ? new WebSocketLink(wsLinkOptions)
        : undefined,
      httpLink: new HttpLink(httpLinkOptions),
    })
  ]),

  ssrMode: true,

  cache: new InMemoryCache(cacheOptions),
  // cache: new InMemoryCache(),
})




export const useWsRenewableApolloClient = (userId: string) => {

  const subscriptionClient = React.useRef<SubscriptionClient>(null);

  React.useEffect(() => {
    console.log("hook detected userId:" , userId)
    if (userId) {
      if (subscriptionClient.current) {
        subscriptionClient.current.close();
      }
      subscriptionClient.current = new SubscriptionClient(
        WS_URI,
        {
          reconnect: true,
          connectionParams: () => ({
            headers: {
              userId: userId,
              // "x-hasura-admin-secret": "",
              "content-type": "application/json",
            },
          }),
        }
      );
    }
  }, [userId]);

  const splitLink = React.useMemo(() => {
    const httpLink = new HttpLink(httpLinkOptions);

    if (userId && subscriptionClient.current) {
      const websocketLink = new WebSocketLink(subscriptionClient.current);

      return splitQueryOrSubscriptions({
        useWebsockets: !!process.browser,
        wsLink: websocketLink,
        httpLink: httpLink,
      })
    }
    // return httpLink;
    return splitQueryOrSubscriptions({
      useWebsockets: !!process.browser,
      wsLink: !!process.browser
        ? new WebSocketLink(wsLinkOptions)
        : undefined,
      httpLink: httpLink,
    })
  }, [userId]);

  React.useEffect(() => {
    aClient.setLink(splitLink);
  }, [splitLink]);

  return aClient;
}





///////////////////////////////////////////
///// For Server side only (within docker)
///////////////////////////////////////////

export const serverApolloClient = (ctx?: any) => {
  return new ApolloClient({
    link: ApolloLink.from([
      onErrorHandler,
      splitQueryOrSubscriptions({
        useWebsockets: false, // server has no websocket
        wsLink: undefined,
        httpLink:
          new HttpLink({
            uri: URI,
            fetch: fetch,
            fetchOptions: {
              agent: new https.Agent({ rejectUnauthorized: false })
            },
            headers: {
              'content-type': 'application/json',
              cookie: ctx?.req?.headers?.cookie,
              // authorization: token ? `Bearer ${token}` : "",
            },
            credentials: 'include',
          }),
      })
    ]),

    ssrMode: true,

    cache: new InMemoryCache(cacheOptions),

    defaultOptions: defaultOptions,
  })
}