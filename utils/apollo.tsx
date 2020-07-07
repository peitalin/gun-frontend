import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
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
// ENV variables
import getConfig from 'next/config'
const {
  // Available both client and server side
  publicRuntimeConfig: {
    // GATEWAY_GRAPHQL_URL,
    // GATEWAY_GRAPHQL_WS_URL,
    // SERVER_GATEWAY_GRAPHQL_URL,
    // NODE_ENV
  },
  // Only available server side
  serverRuntimeConfig: { IN_DOCKER },
} = getConfig()

// let GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"
// let SERVER_GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"

let GATEWAY_GRAPHQL_URL = "https://0.0.0.0:443/v1/graphql"
let GATEWAY_GRAPHQL_WS_URL = "wss://0.0.0.0:443/v1/graphql"
// let GATEWAY_GRAPHQL_WS_URL = "ws://0.0.0.0:7070/v1/graphql"
let SERVER_GATEWAY_GRAPHQL_URL = "https://0.0.0.0:443/v1/graphql"


let NODE_ENV = "develop"

const URI = GATEWAY_GRAPHQL_URL;
const SERVER_URI = SERVER_GATEWAY_GRAPHQL_URL;

if (NODE_ENV === "develop") {
  console.log("Graphql URI: ", URI)
  console.log("Graphql Websocket URI: ", GATEWAY_GRAPHQL_WS_URL)
  console.log("Graphql SERVER_URI: ", SERVER_URI)
  console.log("NODE_ENV: ", NODE_ENV)
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
    uri: GATEWAY_GRAPHQL_WS_URL,
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

      getDataFromTree: 'ssr'
      // Should the apollo store be hydrated before the first render?,
      // allowed values are always, never or ssr (don't hydrate on client side navigation)
      // Don't use always:
      // https://github.com/mui-org/material-ui/issues/15798
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

  })
}

const cacheOptions = {
  addTypename: true,
  possibleTypes: {
    User: ["UserPrivate", "UserPublic", "UserWithRole"],
    Product: ["ProductPublic", "ProductPrivate"],
    Store: ["StorePublic", "StorePrivate"],
  },
  typePolicies: {
    Product: {
      // Interpretation: Products objects are normalized, but they're all
      // the same logical object, because their identity does not depend on
      // any of their fields (other than __typename).
      keyFields: ["id"],
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
  }
}