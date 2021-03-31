
import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Store } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
// components
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const Stores: NextPage<ReactProps> = (props) => {

  return (
    <ErrorBounds className={props.classes.root}>
      Stores
    </ErrorBounds>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

Stores.getInitialProps = async (ctx: Context) => {
  return {
    classes: undefined
  }
}


export default withStyles(styles)(Stores);






