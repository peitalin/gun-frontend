import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// SSR disable
import dynamic from "next/dynamic";
import GetUser from "layout/GetUser";
// import MySettings from "layout/MySettingsModal";
const MySettings = dynamic(() => import("layout/MySettingsModal"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})


const SettingsPage: NextPage<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Settings"
        ogTitle="Settings"
      />
      <UserProfileWrapper>
      {({ data, loading, error }: UserProfileProps) => {
        return (
          <div className={classes.root}>
            <MySettings
              asModal={false}
            />
          </div>
        );
      }}
      </UserProfileWrapper>
    </>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  query: any;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

SettingsPage.getInitialProps = async (ctx: Context) => {
  return {
    query: ctx.query as any,
    classes: undefined,
  };
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: "center",
    padding: "2rem",
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export default withStyles(styles)( SettingsPage );



