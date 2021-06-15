import React from "react";
// Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { makeStore, GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// SSR
import { NextPage, NextPageContext } from 'next';
import { createAppTheme, Colors, Gradients, notifyStyles } from 'layout/AppTheme';
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { ThemeOptions } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
// Apollo Graphql
import { ApolloProvider, ApolloClient } from '@apollo/client';





const ThemeProviderDarkMode: NextPage<ReactProps> = (props) => {

  let darkMode = useSelector<GrandReduxState, "dark"|"light">(s => {
    return s.reduxLogin.darkMode
  })
  let dispatch = useDispatch()
  let router = useRouter()


  React.useEffect(() => {

    // do this only once per page load
    let localStorageDarkMode: "dark" | "light" = undefined;
    if (process.browser && !!window) {
      localStorageDarkMode = window?.localStorage?.getItem('gmDarkMode') as any;
    }

    if (props.initialDarkMode === "dark") {
      dispatch(Actions.reduxLogin.SET_DARK_MODE())
    } if (router?.query?.dark === 'true' || router?.query?.dark === '1') {
      dispatch(Actions.reduxLogin.SET_DARK_MODE())
    } else if (router?.query?.dark === 'false' || router?.query?.dark === '0') {
      dispatch(Actions.reduxLogin.SET_LIGHT_MODE())
    } else if (localStorageDarkMode !== undefined) {
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
  }, [])

  let darkModeTheme: PaletteOptions = {
    type: props?.initialDarkMode ?? darkMode,
  }
  // // console.log("darkMode: ", darkMode)
  // console.log("darkModeTheme: ", darkModeTheme)

  let appTheme: ThemeOptions = createAppTheme(darkMode);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...appTheme,
        palette: {
          ...appTheme.palette,
          ...darkModeTheme
        }
      }),

    [darkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )

}


interface ReactProps {
  initialDarkMode: "dark" | "light"
}
interface QueryData {
}
interface QueryVar {
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}


// ThemeProviderDarkMode.getInitialProps = async (ctx: Context) => {

//   const darkMode = (
//     ctx.query.dark === "true" || ctx.query.dark === "1"
//   ) ? "dark" : "light"

//   console.log('getInitialProps ThemeProviderDarkMode: DARKMODE:', darkMode);
//   return {
//     initialDarkMode: darkMode,
//   };
// }



export default ThemeProviderDarkMode;