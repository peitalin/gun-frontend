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
const port = parseInt(process.env.PORT, 10) || 9000;

// Server
const express = require("express");
//// Http1.1
const http = require("http");
/// Https
const https = require("https");
//// Http2 not well supported on express.js
// const { createServer, createSecureServer } = require('http2');
const gql = require("graphql-tag");
const serverApolloClient = require("./serverApollo");

// SSR Cache
const cacheManager = cacheableResponse({
  ttl: 1000 * 10, // 10 seconds
  get: async ({ req, res }) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    try {
      return {
        data: await app.renderToHTML(req, res, req.path, query),
      };
    } catch (e) {
      return {
        data: "error: " + e,
      };
    }
  },
  send: ({ data, res }) => {
    res.send(data);
  },
});

app.prepare().then(() => {
  const expressServer = express();
  let server = undefined;
  let isHttps = false;

  if (dev) {
    // enable local HTTPS for secure cookies,
    try {
      keyFile = fs.readFileSync(
        "../efc-configs/keys/local/mkcert/localhost.privkey.pem"
      );
      certFile = fs.readFileSync(
        "../efc-configs/keys/local/mkcert/localhost.fullchain.pem"
      );
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
  // setupDynamicLinks(expressServer);

  // Serve cached responses
  expressServer.get("*", async (req, res) => {
    // await processAffiliateClickIfApplicable(req, res);
    if (req.query.noCache) {
      res.setHeader("X-Cache-Status", "DISABLED");
      requestHandler(req, res);
    } else {
      cacheManager({ req, res });
    }
  });

  // Start server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `SSR front-end app ready on ${
        isHttps ? "https" : "http"
      }://0.0.0.0:${port}`
    );
  });
});

const setupUncachedHandlers = (expressServer) => {
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

// const setupDynamicLinks = (expressServer) => {
//   // Serve Mitch Lally
//   expressServer.get("/s/mitchlally", async (req, res) => {
//     await processAffiliateClickIfApplicable(req, res);
//     res.redirect("/s/store_59b0ac0f-069d-4fd6-848f-66454642b866");
//   });

//   // Serve Products
//   expressServer.get("/p/*", async (req, res) => {
//     await processAffiliateClickIfApplicable(req, res);
//     const parsedUrl = parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     const productIdOrSlug = pathname.substring(pathname.lastIndexOf("/") + 1);
//     console.log("incoming url: ", req.url);
//     console.log("incoming productIdOrSlug: ", productIdOrSlug);
//     const lookup = await serverApolloClient.query({
//       query: gql`{
//           lookupProductLinkSlug(slug: "${productIdOrSlug}") {
//             ownerId
//             auto
//             manual
//           }
//         }
//       `,
//       fetchPolicy: "network-only", // don't use cache
//     });
//     const latestSlugs = lookup.data && lookup.data.lookupProductLinkSlug;
//     console.log("latestSlugs: ", latestSlugs);
//     console.log("\n");

//     if (!latestSlugs) {
//       // if no slug, it's just a normal productID.
//       let newQuery = {
//         productId: productIdOrSlug, // productId
//         slug: "",
//       };
//       handle(req, res, {
//         ...parsedUrl,
//         query: newQuery,
//       });
//     } else if (
//       productIdOrSlug === latestSlugs.manual ||
//       productIdOrSlug === latestSlugs.auto
//     ) {
//       // if slug exists, and is most current, embed new ProductID (ownerId)
//       // and send to getInitialProps
//       console.log("handling parsedUrl with slugs....");
//       const parsedUrl = parse(req.url, true);
//       let newQuery = {
//         productId: latestSlugs.ownerId,
//         slug: latestSlugs.manual || latestSlugs.auto,
//       };
//       console.log("remap query: ", newQuery);
//       handle(req, res, {
//         ...parsedUrl,
//         query: newQuery,
//       });
//     } else {
//       // Otherwise redirect to a newer slug-link, favoring the manually reserved link
//       let newSlug = latestSlugs.manual || latestSlugs.auto;
//       res.redirect(`/p/${newSlug}`);
//     }
//   });

//   // Serve Stores
//   expressServer.get("/s/*", async (req, res) => {
//     await processAffiliateClickIfApplicable(req, res);
//     const parsedUrl = parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     const storeIdOrSlug = pathname.substring(pathname.lastIndexOf("/") + 1);
//     console.log("incoming url: ", req.url);
//     console.log("incoming storeIdOrSlug: ", storeIdOrSlug);
//     const lookup = await serverApolloClient.query({
//       query: gql`{
//           lookupStoreLinkSlug(slug: "${storeIdOrSlug}") {
//             ownerId
//             auto
//             manual
//           }
//         }
//       `,
//       fetchPolicy: "network-only", // don't use cache
//     });
//     const latestSlugs = lookup.data && lookup.data.lookupStoreLinkSlug;

//     if (!latestSlugs) {
//       // if no slug, it's just a normal storeId.
//       let newQuery = {
//         storeId: storeIdOrSlug, // storeId
//         slug: "",
//       };
//       handle(req, res, {
//         ...parsedUrl,
//         query: newQuery,
//       });
//     } else if (
//       storeIdOrSlug === latestSlugs.manual ||
//       storeIdOrSlug === latestSlugs.auto
//     ) {
//       // if slug exists, and is most current, embed new StoreId (ownerId)
//       // and send to getInitialProps
//       console.log("handling parsedUrl with slugs....");
//       const parsedUrl = parse(req.url, true);
//       let newQuery = {
//         productId: latestSlugs.ownerId,
//         slug: latestSlugs.manual || latestSlugs.auto,
//       };
//       console.log("remap query: ", newQuery);
//       handle(req, res, {
//         ...parsedUrl,
//         query: newQuery,
//       });
//     } else {
//       // Otherwise redirect to a newer slug-link, favoring the manually reserved link
//       let newSlug = latestSlugs.manual || latestSlugs.auto;
//       res.redirect(`/s/${newSlug}`);
//     }
//   });

//   // Handle old links by redirecting
//   expressServer.get("/download/:productId", async (req, res) => {
//     await processAffiliateClickIfApplicable(req, res);
//     const parsedUrl = parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     const productId = pathname.substring(pathname.lastIndexOf("/") + 1);
//     res.redirect(`/p/${productId}`);
//   });
//   expressServer.get("/stores/:storeId", async (req, res) => {
//     await processAffiliateClickIfApplicable(req, res);
//     const parsedUrl = parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     const storeId = pathname.substring(pathname.lastIndexOf("/") + 1);
//     res.redirect(`/s/${storeId}`);
//   });
// };

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
  } else if (pathname.startsWith("/data")) {
    const filePath = path.join(__dirname, pathname);
    console.log("data!", filePath)
    app.serveStatic(req, res, filePath);
  } else {
    handle(req, res, parsedUrl);
  }
};

const processAffiliateClickIfApplicable = async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // We're looking for "ref" as a query string parameter
  if (query.ref) {
    const affiliateId = query.ref;

    // Tell the gateway about the click, and expect a set-cookie header in response if valid
    // We just want to pass it on to browser so it hangs around for future requests
    try {
      const clickRecordResult = await serverApolloClient.mutate({
        mutation: gql`mutation recordAffiliateLinkClick {
        recordAffiliateLinkClick(affiliateId: "${affiliateId}", path: "${pathname}") {
          success
        }
      }
      `,
      });
      const setCookieHeader = clickRecordResult.context.setCookie;
      res.set("set-cookie", setCookieHeader);
    } catch (error) {
      // (ignore)
    }
  }
};
