import auth0 from 'auth0-js';
import Router from "next/router";

export const GRAPHQL_URL = 'http://209.97.162.7/v1/graphql';
export const authClientId = "yVGw33SMWWUtMknTvOntd3xwP6DtOACm";
export const authDomain = "gunbrokers.au.auth0.com";
export const AUTH_CONFIG = {
  domain: authDomain,
  clientId: authClientId,
  callbackUrl: 'https://0.0.0.0:2040'
};


export default class Auth implements AuthInterface {

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    console.log("handling auth.....")
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        Router.replace('/')
      } else if (err) {
        Router.replace('/');
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession = (authResult: auth0.Auth0DecodedHash) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('auth0:access_token', authResult.accessToken);
    localStorage.setItem('auth0:id_token', authResult.idToken);
    localStorage.setItem('auth0:expires_at', expiresAt);
    localStorage.setItem('auth0:id_token:sub', authResult.idTokenPayload.sub)
    // navigate to the home route
    Router.replace('/');
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('auth0:access_token');
    localStorage.removeItem('auth0:id_token');
    localStorage.removeItem('auth0:expires_at');
    localStorage.removeItem('auth0:id_token:sub');
    // navigate to the home route
    Router.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('auth0:expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export interface AuthInterface {
  handleAuthentication(): void;
  setSession(authResult: auth0.Auth0DecodedHash): void;
  logout(): void;
  login(): void;
  isAuthenticated(): boolean;
}