import React from "react";
import { NextPage, NextPageContext } from 'next';
import { NextComponentType } from "next"
import { AppContext, AppInitialProps, AppProps } from "next/app";

// Redux
import { Dispatch, Store } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { makeStore, GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Redux SSR Next
import withRedux from "next-redux-wrapper";
// Layout
import Layout from "layout";
// MUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { createAppTheme, Colors, Gradients, notifyStyles } from 'layout/AppTheme';
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { ThemeOptions } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
// Next
import App from "next/app";
// Apollo Graphql
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { useWsRenewableApolloClient } from "utils/apollo";
// css
// all css must be imported here
import "../public/App.css";
import "components/DropzoneUploader/styles.css";

import { SnackbarProvider, ProviderContext } from 'notistack';
import IconButtonCancel from "components/IconButtonCancel";

import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)


declare global {
  interface Window {
    App: any;
    analytics: any;
    ClassicEditor: any
    chatwootSDK: {
      run({ websiteToken, baseUrl }: {
        websiteToken: string,
        baseUrl: string,
      }): any
    },
    chatwootSettings: {
      hideMessageBubble?: boolean,
      position?: 'left' | 'right', // This can be left or right
      locale?: 'en', // Language to be set
      type?: 'standard' | 'expanded_bubble', // [standard, expanded_bubble]
      launcherTitle?: string // for expanded_bubble
    }
    __forceSmoothScrollPolyfill__: boolean
  }
}




const MainApp: NextComponentType<AppContext, AppInitialProps, AppProps & AppHOCProps> = (props) => {

  const {
    Component,
    pageProps,
    store,
    router,
    classes, // from notifyStyles
  } = props;

  // add action to all snackbars
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
      (notistackRef.current as ProviderContext).closeSnackbar(key);
  }
  // console.log("pageProps: ", pageProps)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  })

  let state = store.getState()
  let userId = state.reduxLogin.user?.id
  // console.log("MainApp userId: ", userId)
  // console.log("_app pageProps: ", pageProps)

  // This client has hooks that force websockets to reconnect after auth
  //
  // userId is initially undefined, instantiates fresh Apollo client the first time
  // on login, userId exists and websocket is re-instantiated with a new http connection
  // that has gun-auth credentials
  let apollo = useWsRenewableApolloClient(userId)


  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <ThemeProviderDarkMode initialDarkModeSSR={pageProps?.initialDarkModeSSR}>
          <SnackbarProvider
          // @ts-ignore
            ref={notistackRef}
            autoHideDuration={4000}
            preventDuplicate
            hideIconVariant
            classes={{
              variantSuccess: classes.variantSuccess,
              variantError: classes.variantError,
              variantInfo: classes.variantInfo,
              variantWarning: classes.variantWarning,
              // containerRoot: classes.containerRoot,
            }}
            action={(key) => {
              return (
                <IconButtonCancel
                  onClick={onClickDismiss(key)}
                  dark={true} // light colored close icon
                />
              )
            }}
            // dense
            maxSnack={4}
          >
            <CssBaseline />
            <Layout>
              <Component {...pageProps} key={router.route} />
            </Layout>
          </SnackbarProvider>
        </ThemeProviderDarkMode>
      </ApolloProvider>
    </Provider>
  );
}


const ThemeProviderDarkMode = ({ initialDarkModeSSR, children }) => {

  let darkModeRedux = useSelector<GrandReduxState, "dark"|"light">(s => {
    return s.reduxLogin.darkMode
  })
  let dispatch = useDispatch()

  React.useEffect(() => {

    let localStorageDarkMode: "dark" | "light" = undefined;
    if (process.browser && !!window) {
      localStorageDarkMode = window?.localStorage?.getItem('gmDarkMode') as any;
    }
    // console.log("localStorageDarkMode: ", localStorageDarkMode)

    if (localStorageDarkMode !== undefined) {
      // first check if browser has dark mode preferences initially
      if (localStorageDarkMode === "dark") {
        dispatch(Actions.reduxLogin.SET_DARK_MODE())
      } else {
        dispatch(Actions.reduxLogin.SET_LIGHT_MODE())
      }
    } else {
      // then let operating system decide, e.g. dark mode in MacOs
      let osDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
      if (osDarkMode) {
        dispatch(Actions.reduxLogin.SET_DARK_MODE())
      } else {
        dispatch(Actions.reduxLogin.SET_LIGHT_MODE())
      }
    }
  }, [darkModeRedux])



  // console.log("localStorageDarkMode: ", localStorageDarkMode)
  React.useEffect(() => {
    if (initialDarkModeSSR === 'dark') {
      dispatch(Actions.reduxLogin.SET_DARK_MODE())
      //// remove dark=true query param after setting initial dark mode
      // let urlPath = router.asPath.split('?')[0]
      // router.push(
      //   `${router.pathname}`,
      //   `${urlPath}`,
      //   { shallow: true }
      // )
    }
    if (initialDarkModeSSR === 'light') {
      dispatch(Actions.reduxLogin.SET_LIGHT_MODE())
    }
  }, [])

  let darkModeTheme: PaletteOptions = {
    type: darkModeRedux ?? initialDarkModeSSR
  };
  // darkModeRedux is initially undefined on server-side
  // so initialDarkModeSSR (determined by ?dark=1) will make the app render
  // in dark mode on server-side initially
  // Then client-side, darkModeRedux takes over dark mode toggle

  // console.log("darkModeRedux: ", darkModeRedux)
  // console.log("initialDarkModeSSR: ", initialDarkModeSSR)
  // console.log("darkModeTheme: ", darkModeTheme)

  let appTheme: ThemeOptions = createAppTheme(darkModeRedux);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...appTheme,
        palette: {
          ...appTheme.palette,
          ...darkModeTheme
        }
      }),

    [darkModeRedux],
  );
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )

}


interface AppHOCProps extends WithStyles<typeof notifyStyles> {
  store: Store<GrandReduxState>;
}


MainApp.getInitialProps = async (appContext) => {

    const appProps = await App.getInitialProps(appContext)
    // console.log("appProps: ", appProps)
    let ctx = appContext.ctx;

    let darkMode = (ctx.query?.dark === "true" || ctx.query?.dark === "1")
      ? "dark"
      : (ctx.query?.light === "true" || ctx.query?.light === "1")
        ? "light"
        : undefined
      // when undefined, localStorage determines darkmode

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        initialDarkModeSSR: darkMode,
      },
    }
}

export default
withStyles(notifyStyles)(
  withRedux(makeStore)(
    MainApp
  )
);