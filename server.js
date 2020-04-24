const { parse } = require("url");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
console.log("NODE_ENV: ", process.env.NODE_ENV);

// Caching SSR
const cacheableResponse = require("cacheable-response");
// Next
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();
// local only
const port = parseInt(process.env.PORT, 10) || 6660;

// Server
const express = require("express");
//// Http1.1
const http = require("http");
/// Https
const https = require("https");
//// Http2 not well supported on express.js
// const { createServer, createSecureServer } = require('http2');
const apolloClient = require("apollo-client");
const apolloLink = require("apollo-link");
const apolloLinkHttp = require("apollo-link-http");
const apolloLinkError = require("apollo-link-error");
const apolloCache = require("apollo-cache-inmemory");
const fetch = require("isomorphic-unfetch");
const gql = require("graphql-tag");

const aClient = new apolloClient.ApolloClient({
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
    new apolloLinkHttp.HttpLink({
      uri: process.env.SERVER_GATEWAY_GRAPHQL_URL,
      fetch: fetch,
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false })
      },
      headers: {
        "content-type": "application/json"
      },
      // Don't add all req headers, will request itself instead of gateway.
      // https://github.com/apollographql/apollo-client/issues/4193
      credentials: "include"
    })
  ]),
  // hydrates apollo cache with initialState created in server
  cache: new apolloCache.InMemoryCache({
    // fragmentMatcher, // fragments
  }),
  ssrMode: false
});

// SSR Cache
const cacheManager = cacheableResponse({
  ttl: 1000 * 10, // 10 seconds
  get: async ({ req, res }) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    try {
      return {
        data: await app.renderToHTML(req, res, req.path, query)
      };
    } catch (e) {
      return {
        data: "error: " + e
      };
    }
  },
  send: ({ data, res }) => {
    res.send(data);
  }
});

app.prepare().then(() => {
  const expressServer = express();
  let server = undefined;
  let isHttps = false;

  if (dev) {
    // enable local HTTPS for secure cookies,
    try {
      keyFile = fs.readFileSync('./configs/certs/localhost-key.pem')
      certFile = fs.readFileSync('./configs/certs/localhost-cert.pem')
      server = https.createServer(
        { key: keyFile, cert: certFile },
        expressServer
      );
      isHttps = true;
    } catch (e) {
      console.log(e);
      console.log("proceeding with http server instead of https.");
      server = http.createServer(expressServer);
      isHttps = false;
    }
  } else {
    // disable HTTPS for production, envoy provides it
    // doesn work behind envoy with https
    server = http.createServer(expressServer);
    isHttps = false;
  }

  // Some specific requests will always have uncached responses
  setupUncachedHandlers(expressServer);

  // Some requests require dynamic lookup and redirection
  setupDynamicLinks(expressServer);

  // Serve cached responses
  expressServer.get("*", (req, res) => {
    if (req.query.noCache) {
      res.setHeader("X-Cache-Status", "DISABLED");
      requestHandler(req, res);
    } else {
      cacheManager({ req, res });
    }
  });

  // Start server
  server.listen(port, err => {
    if (err) throw err;
    console.log(
      `SSR front-end app ready on ${
        isHttps ? "https" : "http"
      }://0.0.0.0:${port}`
    );
  });
});

const setupUncachedHandlers = expressServer => {
  // Serving next data directly without the cache
  expressServer.get("/_next/*", (req, res) => {
    requestHandler(req, res);
  });
  // Serving static images directly without the cache
  expressServer.get("/img/*", (req, res) => {
    requestHandler(req, res);
  });
  // Serving service workers directly without the cache
  expressServer.get("/service-worker.js", (req, res) => {
    requestHandler(req, res);
  });
  // Apple Pay
  expressServer.get(
    "/.well-known/apple-developer-merchantid-domain-association",
    (req, res) => {
      requestHandler(req, res);
    }
  );
  // Serving static images directly without the cache
  expressServer.get("/public/*", (req, res) => {
    requestHandler(req, res);
  });
  // Serving static images directly without the cache
  expressServer.get("/static/*", (req, res) => {
    requestHandler(req, res);
  });
};

const setupDynamicLinks = expressServer => {
  // Serve Mitch Lally
  expressServer.get("/s/mitchlally", (req, res) => {
    res.redirect("/stores/store_59b0ac0f-069d-4fd6-848f-66454642b866");
  });
  expressServer.get("/p/*", async (req, res) => {
    const slug = req.url.substring(req.url.lastIndexOf("/") + 1);
    console.log("slug: ", slug)
    const lookup = await aClient.query({
      query: gql`{
          lookupProductLinkSlug(slug: "${slug}") {
            ownerId
            auto
            manual
          }
        }
      `,
      fetchPolicy: "network-only" // don't use cache
    });
    console.log("lookup: ", lookup)
    const latestSlugs = lookup.data && lookup.data.lookupProductLinkSlug;

    // Handle the requested URL (don't redirect) if the slug is current, or not found at all
    if (
      !latestSlugs ||
      slug === latestSlugs.manual ||
      slug === latestSlugs.auto
    ) {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }

    // Otherwise redirect to a newer link, favoring the manually reserved link
    else {
      res.redirect(`/p/${latestSlugs.manual || latestSlugs.auto}`);
    }
  });
  expressServer.get("/s/*", async (req, res) => {
    const slug = req.url.substring(req.url.lastIndexOf("/") + 1);
    const lookup = await aClient.query({
      query: gql`{
          lookupStoreLinkSlug(slug: "${slug}") {
            ownerId
            auto
            manual
          }
        }
      `,
      fetchPolicy: "network-only" // don't use cache
    });
    const latestSlugs = lookup.data && lookup.data.lookupStoreLinkSlug;

    // Handle the requested URL (don't redirect) if the slug is current, or not found at all
    if (
      !latestSlugs ||
      slug === latestSlugs.manual ||
      slug === latestSlugs.auto
    ) {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }

    // Otherwise redirect to a newer link, favoring the manually reserved link
    else {
      res.redirect(`/s/${latestSlugs.manual || latestSlugs.auto}`);
    }
  });
};

const requestHandler = (req, res) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // handle GET request to /service-worker.js
  if (pathname === "/service-worker.js") {
    console.log("service worker! assemble!");
    const filePath = path.join(__dirname, ".next", pathname);
    app.serveStatic(req, res, filePath);
  } else if (pathname.startsWith("/.well-known")) {
    // for apple pay
    const filePath = path.join(__dirname, "public", pathname);
    app.serveStatic(req, res, filePath);
  } else if (pathname.startsWith("/public")) {
    const filePath = path.join(__dirname, pathname);
    // console.log("public!", filePath)
    app.serveStatic(req, res, filePath);
  } else if (pathname === "/download/:productId") {
    app.render(req, res, "/download", req.params);
  } else if (pathname === "/stores/:storeId") {
    app.render(req, res, "/stores", req.params);
  } else if (pathname === "/checkout/success-login/:orderId") {
    app.render(req, res, "/checkout/success-login", req.params);
  } else if (pathname === "/checkout/success-create-account/:orderId") {
    app.render(req, res, "/checkout/success-create-account", req.params);
  } else if (pathname === "/categories/:categoryIdOrName") {
    app.render(req, res, "/categories", req.params);
  } else {
    handle(req, res, parsedUrl);
  }
};
