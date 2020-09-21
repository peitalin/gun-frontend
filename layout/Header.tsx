import React from 'react';
import Head from 'next/head';


const Header: React.FC<{}> = (props) => (
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

    {/* load server-side and client side
      needsto be loaded server-side to when Paypal button attempts to render, the
      script tag is already present
    */}

    {
      process.browser &&
      // <script type="text/javascript" src="https://api.quickstream.westpac.com.au/rest/v1/quickstream-api-1.0.min.js"></script>
      <script type="text/javascript" src="https://api.quickstream.support.qvalent.com/rest/v1/quickstream-api-1.0.min.js"></script>
    }

  </Head>
)

export const getGoogleLoginScript = (): string => {
  return `
    function onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    }

    function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }

    function onFailure(error) {
      console.log(error);
    }

    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
  `;
};

export default Header;

