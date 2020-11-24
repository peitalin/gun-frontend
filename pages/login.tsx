import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import Login from "layout/Login";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const LoginPage: NextPage<ReactProps> = (props) => {

  const { classes } = props;

  const {
    query
  } = props;

  return (
    <div className={classes.root}>
      <MetaHeadersPage
        title="Log In - Gunmarketplace.com.au"
        ogTitle="Log In - Gunmarketplace.com.au"
        description={`
          Log in or create an account for free.
        `}
        ogDescription={`
          Log in or create an account for free.
        `}
      />
      <div className={classes.maxWidth}>
        <Login
          redirectOnComplete={"/"}
          initialTabIndex={0} // set initial tab to login page
          asFormLayout={true} // form, not modal
        />
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  query: any;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

LoginPage.getInitialProps = async (ctx: Context) => {
  return {
    query: ctx.query as any,
    classes: undefined,
  };
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    height: 'calc(100vh - 124px)',
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export default withStyles(styles)( LoginPage );



