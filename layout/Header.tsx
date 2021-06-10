import React from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga'


const Header: React.FC<ReactProps> = (props) => {

  const {
    showChatwoot = true
  } = props;

  React.useEffect(() => {
    if (ReactGA) {
      if (process.env.NODE_ENV === "production") {
        ReactGA.initialize('G-B2F178EQFD')
      }
      if (process.env.NODE_ENV === "development") {
        ReactGA.initialize('G-80ZCFGLGYY')
      }
    }
  })

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

      <link href='/roobert/Roobert-Light.otf'
        rel='stylesheet'
        type='text'/>
      <link href='/roobert/Roobert-Regular.otf'
        rel='stylesheet'
        type='text/css'/>
      <link href='/roobert/Roobert-Medium.otf'
        rel='stylesheet'
        type='text/css'/>
      <link href='/roobert/Roobert-SemiBold.otf'
        rel='stylesheet'
        type='text/css'/>
      <link href='/roobert/Roobert-Bold.otf'
        rel='stylesheet'
        type='text/css'/>
      <link href='/roobert/Roobert-Heavy.otf'
        rel='stylesheet'
        type='text/css'/>

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

    </Head>
  )
}

interface ReactProps {
  showChatwoot: boolean;
}


export default Header;

