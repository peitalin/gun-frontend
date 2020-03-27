import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
// Redux
import { Dispatch, Store } from "redux";
import { Provider, batch, useDispatch } from "react-redux";
import { makeStore, GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Layout
import Layout from "layout";
// MUI
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppTheme } from 'layout/AppTheme';
// styles
import GlobalStyles from "layout/globalStyles";
// Next
import App from "next/app";
// Redux
import withRedux from "next-redux-wrapper";
// Apollo Graphql
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import withApollo from 'utils/apollo';
// queries
import { GET_USER } from "queries/user-queries";
// css
import "../public/App.css";
// import "react-datepicker/dist/react-datepicker.css";
// Typings
import { UserPrivate, ProductCategory } from 'typings/gqlTypes';
import { serverApolloClient } from "utils/apollo";
// Payment Clients
import { Auth0Provider } from "layout/Auth0";
import Router from "next/router";


declare global {
  interface Window {
    App: any
  }
}

interface AppProps {
  apollo: ApolloClient<any>;
  store: Store<GrandReduxState>;
}
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>
  store: Store<GrandReduxState>;
}

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  Router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};




class MyApp extends App<AppProps> {

  static async getInitialProps(initialProps) {

    const { Component } = initialProps;
    const { ctx }: { ctx: Context } = initialProps;

    // console.log('MyApp req headers:\n', option(ctx).req.headers.cookie());
    // const cookie = option(ctx).req.headers.cookie();

    // if (cookie && /efc-auth/.exec(cookie)) {
    //   try {

    //     userResponse = await serverApolloClient(ctx).query<QueryData>({
    //       query: GET_USER,
    //     });

    //     console.log("initial GetUser response:", userResponse)
    //     if (option(userResponse).data.user.cart()) {
    //       dispatch(Actions.reduxLogin.SET_USER(userResponse.data.user));
    //     }
    //     if (option(userResponse).data.user.store()) {
    //       dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(userResponse.data.user.store.id));
    //     }
    //     if (option(userResponse).data.user()) {
    //       dispatch(Actions.reduxLogin.SET_USER(userResponse.data.user));
    //     }
    //   } catch(e) {
    //     console.log("MyApp -> GetUser err:", e)
    //   }
    // }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps: pageProps,
    };
  }

  state = {
    dataProvider: null,
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentWillUnmount () {
  }

  render() {

    const {
      Component,
      pageProps,
      store,
      apollo,
      router,
    } = this.props;

    return (
      <Provider store={store}>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={AppTheme}>
            <CssBaseline />
            <GlobalStyles/>
            <Auth0Provider
              domain={"gunbrokers.au.auth0.com"}
              client_id={"yVGw33SMWWUtMknTvOntd3xwP6DtOACm"}
              redirect_uri={
                process.browser
                  ? window.location.origin
                  : null
              }
              onRedirectCallback={onRedirectCallback}
            >
              <Layout>
                <Component {...pageProps} key={router.route} />
              </Layout>
            </Auth0Provider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}


interface QueryData {
  user: UserPrivate;
}

export default withRedux(makeStore)(
  withApollo(MyApp)
);