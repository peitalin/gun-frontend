const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const fs = require('fs')

//// Http1.1
const http = require('http')
/// Https
const https = require('https');
const port = parseInt(process.env.PORT, 10) || 2040
//// Http2 not well support on express.js
// const { createServer, createSecureServer } = require('http2');


app.prepare().then(() => {

  if (dev) {

    const httpsOptions = {
      key: fs.readFileSync('./configs/certs/localhost-key.pem'),
      cert: fs.readFileSync('./configs/certs/localhost-cert.pem')
    };
    // enable local HTTPS for secure cookies,
    https.createServer(httpsOptions, (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        app.render(req, res, '/a', query)
      } else {
        handle(req, res, parsedUrl)
      }

    })
    .listen(port, err => {
      if (err) throw err
      console.log(`SSR front-end app ready on https://0.0.0.0:${port}`)
    })

  } else {

    // disable HTTPS for production, netlify provides it
    http.createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        app.render(req, res, '/a', query)
      } else {
        handle(req, res, parsedUrl)
      }

    })
    .listen(port, err => {
      if (err) throw err
      console.log(`SSR front-end app ready on http://0.0.0.0:${port}`)
    })

  }
})