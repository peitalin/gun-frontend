import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import { Colors } from "layout/AppTheme";
import gql from 'graphql-tag'
import { useApolloClient, ApolloClient } from "@apollo/client";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import CollectionsPage from "pageComponents/Collections/CollectionsPage";

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const CollectionsSSR: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Collections"
        robots="noindex"
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            // <div className={classes.polka} ></div>
            <CollectionsPage />
          )
        }}
      </UserProfileWrapper>
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  contentContainerPublicPage: {
    position: "relative",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  // polka: {
  //   height: '100vh',
  //   width: '100%',
  //   backgroundColor: '#ECEFF4',
  //   backgroundImage: `
  //     url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='4' cy='4' r='2'/%3E%3Ccircle cx='14' cy='14' r='2'/%3E%3C/g%3E%3C/svg%3E")
  //   `,
  // },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};


export default withStyles(styles)( CollectionsSSR );






