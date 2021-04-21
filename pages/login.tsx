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



const LoginPage: NextPage<ReactProps> = (props) => {

  const {
    classes,
    query,
  } = props;

  const router = useRouter();
  const aClient = useApolloClient();

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  React.useEffect(() => {
    if (!user?.id) {
      // console.log("evicting ROOT_QUERY.user profile.")
      aClient.cache.evict({
        id: "ROOT_QUERY",
        fieldName: "user"
      })
      // console.log("CACHE: ", aClient.cache)
    }
  }, [user])

  let from = "/" + (router.query.from as string)

  return (
    <div className={classes.root}>
      <MetaHeadersPage
        title="Log In - gunmarketplace.com.au"
        ogTitle="Log In - gunmarketplace.com.au"
        description={`
          Log in or create an account for free.
        `}
        ogDescription={`
          Log in or create an account for free.
        `}
      />
      <div className={classes.maxWidth}>
        <Login
          redirectOnComplete={from ?? "/"}
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
    minHeight: 'calc(100vh - 124px)',
    height: '100%',
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export default withStyles(styles)( LoginPage );



