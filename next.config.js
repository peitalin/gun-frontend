const {resolve} = require('path');
const path = require('path');
const fs = require('fs');
const withCSS = require('@zeit/next-css')
const nextRuntimeDotenv = require('next-runtime-dotenv')
require("dotenv").config();

const withConfig = nextRuntimeDotenv({
  // path: '.env',
  public: [
    'GATEWAY_GRAPHQL_URL',
    'NODE_ENV',
    'EFC_ENV',
    'REACT_APP_FRENZY_URL',
    'SERVER_GATEWAY_GRAPHQL_URL',
  ],
  server: [
  ]
})

module.exports = withConfig(
  withCSS({

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // config.resolve.alias['~'] = path.join(__dirname)
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['pageComponents'] = path.join(__dirname, 'pageComponents')
    config.resolve.alias['pages'] = path.join(__dirname, 'pages')
    config.resolve.alias['layout'] = path.join(__dirname, 'layout')
    config.resolve.alias['reduxStore'] = path.join(__dirname, 'reduxStore')
    config.resolve.alias['queries'] = path.join(__dirname, 'queries')
    config.resolve.alias['typings'] = path.join(__dirname, 'typings')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')

    // config.plugins.push(
    //   new require('webpack').IgnorePlugin(/faker/)
    // )
    // https://arunoda.me/blog/ssr-and-server-only-modules

    return config
  },

  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },

  // disbable x-powered-by next header on requests
  poweredByHeader: false,

  env: {
    // (this is dynamically defined through process.env + nextRuntimeDotenv above)
  }

})
)
