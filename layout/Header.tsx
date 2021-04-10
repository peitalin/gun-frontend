import React from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga'


const Header: React.FC<ReactProps> = (props) => {

  const {
    showZendeskChat = true
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

  return (
    <Head>
      <title>Gunmarketplace.com.au</title>
      <link rel='icon' href='/favicon.ico' />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="icon"
          href="/public/favicons/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180"
          href="/public/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32"
          href="/public/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16"
          href="/public/favicon.ico/favicon-16x16.png"/>


      {/* Manifest.json defined and generated in next.config.js */}
      <link rel="manifest" href="/public/manifest.json"/>
      {/* <link rel="manifest" href="/manifest.json"/> */}

      {/* {
        // enable on fileworks.net && relay.shop
        process.env.NODE_ENV === "production" &&
        showZendeskChat &&
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key="> </script>
      } */}

    </Head>
  )
}

interface ReactProps {
  showZendeskChat: boolean;
}


export default Header;

