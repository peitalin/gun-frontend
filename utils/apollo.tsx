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

// Switches between unfetch & node-fetch for client & server.
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo';
import { DocumentNode } from "graphql"
import https from "https";
import { oc as option } from "ts-optchain";


/////////// Environment Variables in .env

// let GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"
// let SERVER_GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"
// let GATEWAY_GRAPHQL_WS_URL = "ws://api.gunmarketplace.com.au/v1/graphql"

// // let GATEWAY_GRAPHQL_URL = "https://0.0.0.0:443/v1/graphql"
// let GATEWAY_GRAPHQL_URL = "https://0.0.0.0/gateway/graphql"
// let GATEWAY_GRAPHQL_WS_URL = "wss://0.0.0.0:443/v1/graphql"
// // let GATEWAY_GRAPHQL_WS_URL = "ws://0.0.0.0:7070/v1/graphql"
// let SERVER_GATEWAY_GRAPHQL_URL = "https://0.0.0.0/gateway/graphql"


const URI = process.env.GATEWAY_GRAPHQL_URL;
const SERVER_URI = process.env.SERVER_GATEWAY_GRAPHQL_URL;
const WS_URI = process.env.GATEWAY_GRAPHQL_WS_URL

if (process.env.NODE_ENV === "development") {
  console.log("Graphql URI: ", URI)
  console.log("Graphql Websocket URI: ", WS_URI)
  console.log("Graphql SERVER_URI: ", SERVER_URI)
  console.log("NODE_ENV: ", process.env.NODE_ENV)
}

import { NextPageContext } from 'next';



const onErrorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message:
        ${message},
        Location: ${locations},
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
  ctx,
}: { httpLink: HttpLink, useWebsockets: boolean, ctx: NextPageContext }) => {

  if (!useWebsockets) {
    // if server-side (ssr), return normal httpLink
    return httpLink
  }
  // splits requests based on operation type:
  // - subscriptions => websockets
  // - queries/mutations => http
  // https://www.apollographql.com/docs/react/data/subscriptions/

  // client-side only, errors if you instantiate wsLink on the server.
  // https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
  const wsLink = new WebSocketLink({
    uri: WS_URI,
    options: {
      reconnect: true,
      connectionParams: () => ({
        headers: {
          // "x-hasura-admin-secret": "",
          "content-type": "application/json",
          cookie: option(ctx).req.headers.cookie(),
        },
      }),
    }
  })

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




// SSR Apollo. Function to return a new instance of ApolloClient
// with every request.
// For Client side
export default withApollo(
  ({ ctx, headers, initialState }) => {

    // let authCookie = ctx.req.headers["set-cookie"] || [ctx.req.headers["cookie"]];
    // get the authentication token from local storage if it exists
    let token = undefined

    return new ApolloClient({
      link: ApolloLink.from([
        onErrorHandler,
        splitQueryOrSubscriptions({
          useWebsockets: !!process.browser,
          ctx: ctx,
          httpLink:
            new HttpLink({
              uri: URI,
              fetch: fetch,
              fetchOptions: {
                agent: new https.Agent({ rejectUnauthorized: false })
              },
              headers: {
                'content-type': 'application/json',
                // "x-hasura-admin-secret": "hescomingrightforus",
                cookie: option(ctx).req.headers.cookie(),
                // authorization: token ? `Bearer ${token}` : "",
                ...headers,
              },
              credentials: 'include',
            }),
        })
      ]),

      ssrMode: true,

      cache: new InMemoryCache(cacheOptions),

    })
  }
)






///////////////////////////////////////////
///// For Server side only (within docker)
///////////////////////////////////////////

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
export const serverApolloClient = (ctx) => {

  return new ApolloClient({
    link: ApolloLink.from([
      onErrorHandler,
      new HttpLink({
        uri: SERVER_URI,
        fetch: fetch,
        fetchOptions: {
          agent: new https.Agent({ rejectUnauthorized: false })
        },
        headers: {
          'content-type': 'application/json',
          "x-hasura-admin-secret": "hescomingrightforus",
          cookie: option(ctx).req.headers.cookie()
        },
        // Don't add all req headers, will request itself instead of gateway.
        // https://github.com/apollographql/apollo-client/issues/4193
        credentials: 'include',
      })
    ]),

    ssrMode: true,

    cache: new InMemoryCache(cacheOptions),

    defaultOptions: defaultOptions,

  })
}

const cacheOptions = {
  addTypename: true,
  possibleTypes: {
    User: ["UserPrivate", "UserPublic", "UserWithRole"],
    Product: ["ProductPublic", "ProductPrivate", "ProductDownload"],
    Store: ["StorePublic", "StorePrivate"],
  },
  typePolicies: {

    ProductPrivate: {
      keyFields: ["id"],
      fields: {
        chosenVariant: {
          merge: (existing, incoming, opts) => {
            // return opts.mergeObjects(existing, incoming)
            return incoming
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
        relevantDiscounts: {
          merge: (existing, incoming, opts) => {
            // do not merge discounts
            // they refer to bought/unbought products
            // and thus should not be merged
            return incoming
          }
        },
      },
    },

    ProductDownload: {
      keyFields: ["id"],
      fields: {
        chosenVariant: {
          merge: (existing, incoming, opts) => {
            // return opts.mergeObjects(existing, incoming)
            return incoming
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
        relevantDiscounts: {
          merge: (existing, incoming, opts) => {
            // do not merge discounts
            // they refer to bought/unbought products
            // and thus should not be merged
            return incoming
          }
        },
      },
    },

    ProductPublic: {
      keyFields: ["id"],
      fields: {
        chosenVariant: {
          merge: (existing, incoming, opts) => {
            // return opts.mergeObjects(existing, incoming)
            return incoming
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
        relevantDiscounts: {
          merge: (existing, incoming, opts) => {
            // do not merge discounts
            // they refer to bought/unbought products
            // and thus should not be merged
            return incoming
          }
        },
      },
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
    Store: {
      keyFields: ["id"],
      fields: {
        dashboardPublishedProductsConnection: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
        dashboardUnpublishedProductsConnection: {
          merge: (existing, incoming, opts) => {
            return opts.mergeObjects(existing, incoming)
          }
        },
      },
    },

    orders: {
      keyFields: ["id"],
    },
    order_snapshots: {
      keyFields: ["id"],
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

let _authCookie: string | undefined = undefined;

export const constructCookie = (): string => {
  let cookie = "";
  if (_authCookie) {
    cookie = `efc-auth=${_authCookie}`;
  }
  console.log("cookie going out:",cookie)
  return cookie;
};


export const storeToken = (token: string): void => {
  _authCookie = token;
};