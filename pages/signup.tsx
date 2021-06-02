import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient, useApolloClient } from "@apollo/client";
import { UserPrivate } from "typings/gqlTypes";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useSelector } from "react-redux";
import Login from "layout/Login";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";



const SignupPage: NextPage<ReactProps> = (props) => {

  const {
    classes,
    query,
  } = props;

  return (
    <div className={classes.root}>
      <MetaHeadersPage
        title="Sign Up - gunmarketplace.com.au"
        ogTitle="Sign Up - gunmarketplace.com.au"
        description={`
          Create an account for free.
        `}
        ogDescription={`
          Create an account for free.
        `}
      />
      <div className={classes.maxWidth}>
        <Login
          redirectOnComplete={"/"}
          redirectDelay={500}
          initialTabIndex={1} // set initial tab to login page
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

SignupPage.getInitialProps = async (ctx: Context) => {
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
    minHeight: 'calc(100vh - 124px)',
    height: '100%',
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export default withStyles(styles)( SignupPage );



