import React from 'react';
import Head from 'next/head';


const Header: React.FC<{}> = (props) => (
  <Head>
    <title>gunmarketplace.com.au</title>
    <link rel='icon' href='/favicon.ico' />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="icon"
        href="https://storage.googleapis.com/electric-files/static/favicon.ico/favicon.ico"/>
    <link rel="apple-touch-icon" sizes="180x180"
        href="https://storage.googleapis.com/electric-files/static/favicon.ico/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32"
        href="https://storage.googleapis.com/electric-files/static/favicon.ico/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16"
        href="https://storage.googleapis.com/electric-files/static/favicon.ico/favicon-16x16.png"/>
    <link rel="mask-icon"
        href="https://storage.googleapis.com/electric-files/static/favicon.ico/safari-pinned-tab.svg" color="#5bbad5"/>
    <link rel="manifest,"
        href="https://storage.googleapis.com/electric-files/static/manifest.json"/>
    {/* <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Playfair+Display"/> */}
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Barlow"/>

    <script src="https://apis.google.com/js/platform.js" async defer></script>


    {/* https://gunmarketplace.com.au */}
    <meta name="google-signin-client_id"
      content="628767016907-66h6rtfiae0jt8uojc87hf6ns1npj3uj.apps.googleusercontent.com"
    />

    {
      process.browser &&
      <script dangerouslySetInnerHTML={{ __html: getGoogleLoginScript() }}/>
    }

    {
      !process.browser &&
      <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
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

