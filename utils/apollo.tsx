import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
// Switches between unfetch & node-fetch for client & server.
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo';
import { setContext } from 'apollo-link-context';
import https from "https";
import { oc as option } from "ts-optchain";

// // ENV variables
// import getConfig from 'next/config'
// const {
//   // Available both client and server side
//   publicRuntimeConfig: {
//     GATEWAY_GRAPHQL_URL,
//     SERVER_GATEWAY_GRAPHQL_URL,
//     NODE_ENV
//   },
//   // Only available server side
//   serverRuntimeConfig: {
//     IN_DOCKER,
//   },
// } = getConfig()

let GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"
let SERVER_GATEWAY_GRAPHQL_URL = "https://api.gunmarketplace.com.au/v1/graphql"
let NODE_ENV = "develop"

const URI = GATEWAY_GRAPHQL_URL;
const SERVER_URI = SERVER_GATEWAY_GRAPHQL_URL;

if (NODE_ENV === "develop") {
  console.log("Graphql URI: ", URI)
  console.log("Graphql SERVER_URI: ", SERVER_URI)
  console.log("NODE_ENV: ", NODE_ENV)
}


// Fragments Schema
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'typings/gqlIntrospection';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});






// SSR Apollo. Function to return a new instance of ApolloClient
// with every request.
// For Client side
export default withApollo(
  ({ ctx, headers, initialState }) => {

    // let authCookie = ctx.req.headers["set-cookie"] || [ctx.req.headers["cookie"]];
    // get the authentication token from local storage if it exists
    let token = undefined
    if (process.browser) {
      let token = localStorage.getItem('auth0:id_token');
    }

    return new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message:
                ${message},
                Location: ${locations},
                Path: ${path}`,
              ),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
          uri: URI,
          fetch: fetch,
          fetchOptions: {
            agent: new https.Agent({ rejectUnauthorized: false })
          },
          headers: {
            'content-type': 'application/json',
            "x-hasura-admin-secret": "hescomingrightforus",
            cookie: option(ctx).req.headers.cookie(),
            authorization: token ? `Bearer ${token}` : "",
            ...headers,
          },
          credentials: 'include',
        }),
      ]),
      // hydrates apollo cache with initialState created in server
      cache: new InMemoryCache({
        fragmentMatcher, // fragments
        dataIdFromObject: (object: any) => {
          switch (object.__typename) {

            // case 'UserPrivate': return object.id; // use `id` as the primary key

            // case 'ProductPublic': {
            //   if (!option(object).chosenVariant()) {
            //     const pType = "_LISTING"
            //     return object.id + pType;
            //   } else {
            //     // const pType = "_CART_ORDER"
            //     return object._id;
            //   }
            // }

            // case 'ProductPrivate': {
            //   if (!option(object).chosenVariant()) {
            //     const pType = "_LISTING"
            //     return object.id + pType;
            //   } else {
            //     // const pType = "_CART_ORDER"
            //     return object._id;
            //   }
            // }

            // case 'OrderItem': return object.id; // use `id` as the primary key
            // case 'ProductPrivate': return object.id; // use `id` as the primary key

            // case 'CartItem': return object.id; // use `id` as the primary key
            // case 'Cart': return object.id; // use `id` as the primary key

            // case 'ProductVariant': return object.variantId; // use `variantId` as the priamry key
            // case 'ProductVariant': {
            //   if (option(object).files()) {
            //     const pType = "_DOWNLOAD"
            //     return object.variantId + pType;
            //   } else {
            //     return object.variantId;
            //   }
            // }
            // case 'ProductVariant': return object._id; // disable variantId cache key
            // MyDownloads/Checkout will request a ProductVariant with different shape than
            // RecommendedProducts. The cache will reset to MyDownload's version,
            // RecommendedProducts won't render.
            // chosenVariant => null for RecommendedProducts
            // featuredVariants => null for MyDownloads/Checkout

            // case 'StorePublic': return object.id + "_STORE_PUBLIC";
            // postfix _STORE_PUBLIC as the primary key
            // case 'StorePrivate': return object._id + "_STORE_PRIVATE";
            // postfix _STORE_PRIVATE as the primary key

            // default: return defaultDataIdFromObject(object);
            // this somehow breaks carts + gallery loading together
            default: return object.id;
            // fallback to default for all other types
          }
        }
      }).restore(initialState || {}),
      ssrMode: true,
    })
  },
  {
    getDataFromTree: 'ssr'
    // Should the apollo store be hydrated before the first render?,
    // allowed values are always, never or ssr (don't hydrate on client side navigation)
    // Don't use always:
    // https://github.com/mui-org/material-ui/issues/15798
  }
)






///////////////////////////////////////////
///// For Server side only (within docker)
///////////////////////////////////////////

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
export const serverApolloClient = (ctx) => {

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message:
              ${message},
              Location: ${locations},
              Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
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
    // hydrates apollo cache with initialState created in server
    cache: new InMemoryCache({
      fragmentMatcher, // fragments
    }),
    ssrMode: true,
  })
}