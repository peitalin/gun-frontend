const {resolve} = require('path');
const path = require('path');
const fs = require('fs');
// CSS
const withCSS = require('@zeit/next-css')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// environment
const dev = process.env.NODE_ENV !== 'production'
const nextRuntimeDotenv = require('next-runtime-dotenv')
require("dotenv").config();
// offline first
const withOffline = require('next-offline')

const withConfig = nextRuntimeDotenv({
  // path: '.env',
  public: [],
  server: []
})


module.exports =
  withConfig(
  withOffline(
  withCSS({

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config

      config.resolve.alias['components'] = path.join(__dirname, 'components')
      config.resolve.alias['pageComponents'] = path.join(__dirname, 'pageComponents')
      config.resolve.alias['pages'] = path.join(__dirname, 'pages')
      config.resolve.alias['layout'] = path.join(__dirname, 'layout')
      config.resolve.alias['reduxStore'] = path.join(__dirname, 'reduxStore')
      config.resolve.alias['queries'] = path.join(__dirname, 'queries')
      config.resolve.alias['typings'] = path.join(__dirname, 'typings')
      config.resolve.alias['utils'] = path.join(__dirname, 'utils')

      // WORKBOX docs
      // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack#adding_runtime_caching

      config.plugins.push(
        // optimize CSS
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        })
      )
      // https://able.bio/drenther/building-a-progressive-web-app-with-nextjs-part-ii--98ojk46#web-app-manifest

      return config
    },

    webpackDevMiddleware: config => {
      // Perform customizations to webpack dev middleware config
      // Important: return the modified config
      return config
    },

    // disbable x-powered-by next header on requests
    poweredByHeader: false,

    // next-offline options
    // dontAutoRegisterSw: true,
    // generateInDevMode: true,

    env: {
      // (this is defined at BUILD-time through vercel's process.env)
      // Vercel: set environment variables in the dashboard
      GATEWAY_GRAPHQL_URL: process.env.GATEWAY_GRAPHQL_URL,
      SERVER_GATEWAY_GRAPHQL_URL: process.env.SERVER_GATEWAY_GRAPHQL_URL,
      GATEWAY_GRAPHQL_WS_URL: process.env.GATEWAY_GRAPHQL_WS_URL,
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    }

  })))
