import React from 'react';
import Head from 'next/head';
// import { getAnalyticsHeadScript } from 'utils/analytics'


const Header: React.FC<ReactProps> = (props) => {

  const {
    showChatwoot = true
  } = props;

  React.useEffect(() => {
    if (process.browser && !!window) {
      window.chatwootSettings = {
        hideMessageBubble: false,
        position: 'right', // This can be left or right
        locale: 'en', // Language to be set
        type: 'standard', // [standard, expanded_bubble]
      }
    }
  }, [])


  return (
    <Head>
      <title>Gun Marketplace Australia - gunmarketplace.com.au</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="icon"
          href="/favicons/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180"
          href="/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32"
          href="/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16"
          href="/favicons/favicon-16x16.png"/>

      {/* Manifest.json defined and generated in next.config.js */}
      <link rel="manifest" href="/public/manifest.json"/>

      <meta name="google-site-verification" content="Rqtqx5V07R9Ps4Ey9VBivC7y8zrRE5U5yWE8a2zba8k" />

      {/* <script>
        {`
          (function(d,t) {
            var BASE_URL=\"https://app.chatwoot.com\";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+\"/packs/js/sdk.js\";
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: \"2SKqt7sF9HKnCGZv9fRm24iS\",
                baseUrl: BASE_URL
              })
            }
          })(document,\"script\");
        `}
      </script> */}

      {/* Google Analytics 4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-B2F178EQFD"></script>
      <script
        async
        dangerouslySetInnerHTML={{
          __html:
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B2F178EQFD');`
        }}
      />

      {/* Google Analytics Classic */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-194292344-1">
      </script>
      <script
        async
        dangerouslySetInnerHTML={{
          __html:
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-194292344-1');`
        }}
      />
    </Head>
  )
}

interface ReactProps {
  showChatwoot: boolean;
}


export default Header;

