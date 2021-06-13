const {resolve} = require('path');
const path = require('path');
const fs = require('fs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


// environment
const dev = process.env.NODE_ENV !== 'production'
require("dotenv").config();


module.exports =
  // withBundleAnalyzer(
  {

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

      return config
    },

    webpackDevMiddleware: config => {
      // Perform customizations to webpack dev middleware config
      // Important: return the modified config
      return config
    },

    future: {
      // webpack 5
      // https://github.com/vercel/next.js/issues/21679
      webpack5: true,
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
    },

    publicRuntimeConfig: {
    },

    images: {
      domains: [
        "img.gunmarketplace.com.au",
        "img.youtube.com",
        "i.vimeocdn.com",
      ],
    },
  }
  // )