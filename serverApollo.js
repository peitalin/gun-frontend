const https = require("https");
const apolloClient = require("apollo-client");
const apolloLink = require("apollo-link");
const apolloLinkHttp = require("apollo-link-http");
const apolloLinkError = require("apollo-link-error");
const apolloCache = require("apollo-cache-inmemory");
const fetch = require("isomorphic-unfetch");
const gql = require("graphql-tag");

// This afterware simply exposes set-cookie headers to the context of a query response
const setCookieAfterware = new apolloLink.ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();

    // NOTE: This is awkward but important because it's the only way
    // to get set-cookie as an array. Accessing it by context.response.headers.get("set-cookie")
    // will instead give you a single string, where multiple values have been concatenated with ", ".
    // Browsers can't parse multiple values in a single header entry, so we need them separated.
    const setCookie = context.response.headers.raw()["set-cookie"];

    response.context = {
      ...response.context,
      setCookie: setCookie,
    };
    return response;
  });
});

const serverApolloClient = new apolloClient.ApolloClient({
  link: apolloLink.ApolloLink.from([
    apolloLinkError.onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message:
            ${message},
            Location: ${locations},
            Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    setCookieAfterware,
    new apolloLinkHttp.HttpLink({
      uri: process.env.SERVER_GATEWAY_GRAPHQL_URL,
      fetch: fetch,
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
      headers: {
        "content-type": "application/json",
        // cookie: option(ctx).req.headers.cookie()
      },
      // Don't add all req headers, will request itself instead of gateway.
      // https://github.com/apollographql/apollo-client/issues/4193
      credentials: "include",
    }),
  ]),
  // hydrates apollo cache with initialState created in server
  cache: new apolloCache.InMemoryCache({
    // fragmentMatcher, // fragments
  }),
  ssrMode: false,
});

module.exports = serverApolloClient;
