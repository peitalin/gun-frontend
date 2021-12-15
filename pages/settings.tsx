import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// SSR disable
import dynamic from "next/dynamic";
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



const SettingsPageSSR: NextPage<ReactProps> = (props) => {

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
          <div className={classes.rootSSR}>
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
}




const styles = (theme: Theme) => createStyles({
  rootSSR: {
    display: 'flex',
    justifyContent: "center",
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( SettingsPageSSR );



